import { execFileSync } from "node:child_process";
/**
 * Spec-sync pipeline.
 *
 * Fetches the four upstream Atlassian OpenAPI specs, decides whether anything
 * changed, and (when it did) regenerates the SDK, derives a semver bump by
 * diffing our own public API surface, and writes a changeset. The `spec-sync`
 * job in `.github/workflows/publish.yml` drives the release from there.
 *
 * Why the bump is derived from our surface and not from upstream: the specs'
 * `info.version` is a build snapshot (`1001.0.0-SNAPSHOT-<sha>`), useless for
 * semver. So we compare the set of exported names across every published
 * subpath against a committed baseline (`api-surface.txt`).
 *
 * Modes:
 *   (default)          detect -> regenerate -> diff -> changeset -> update state
 *   --dry-run          same, but write nothing (report only)
 *   --write-baseline   bootstrap: write locks.json + api-surface.txt, no diff
 *
 * Run with Node >= 23 (native TypeScript stripping): `node spec-sync/sync.ts`.
 */
import { createHash } from "node:crypto";
import { appendFileSync, existsSync, readdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import ts from "typescript";
import {
  JIRA_PLATFORM_V2_URL,
  JIRA_PLATFORM_V3_URL,
  JIRA_SERVICE_DESK_URL,
  JIRA_SOFTWARE_URL,
} from "../jira-rest-api-urls.ts";

const REPO_ROOT = dirname(dirname(fileURLToPath(import.meta.url)));
const LOCKS_PATH = join(REPO_ROOT, "spec-sync", "locks.json");
const SURFACE_PATH = join(REPO_ROOT, "spec-sync", "api-surface.txt");
const PKG_PATH = join(REPO_ROOT, "package.json");

/** SDK key -> upstream spec URL. Keys match the `src/<key>` directory names. */
const SPECS: Record<string, string> = {
  "jira-platform-v2": JIRA_PLATFORM_V2_URL,
  "jira-platform-v3": JIRA_PLATFORM_V3_URL,
  "jira-service-desk": JIRA_SERVICE_DESK_URL,
  "jira-software": JIRA_SOFTWARE_URL,
};

/** A spec is rejected if its path count drops more than this fraction below the lock. */
const PATH_COUNT_TOLERANCE = 0.2;
/** Absolute floor: a healthy spec always has well over this many paths. */
const PATH_COUNT_FLOOR = 20;

interface LockEntry {
  url: string;
  sha256: string;
  pathCount: number;
  infoVersion: string | null;
}
type Locks = Record<string, LockEntry>;

type Bump = "major" | "minor" | "patch";

interface FetchedSpec {
  key: string;
  text: string;
  sha256: string;
  pathCount: number;
  infoVersion: string | null;
}

// ---------------------------------------------------------------------------
// Fetch + validate
// ---------------------------------------------------------------------------

async function fetchSpec(key: string, url: string): Promise<FetchedSpec> {
  let lastError: unknown;
  for (let attempt = 1; attempt <= 4; attempt++) {
    try {
      const res = await fetch(url);
      if (res.status !== 200) throw new Error(`HTTP ${res.status}`);
      const text = await res.text();
      const json = JSON.parse(text) as {
        openapi?: string;
        swagger?: string;
        paths?: Record<string, unknown>;
        info?: { version?: string };
      };
      if (!json.openapi && !json.swagger) {
        throw new Error("missing openapi/swagger field");
      }
      return {
        key,
        text,
        sha256: createHash("sha256").update(text).digest("hex"),
        pathCount: Object.keys(json.paths ?? {}).length,
        infoVersion: json.info?.version ?? null,
      };
    } catch (error) {
      lastError = error;
      if (attempt < 4) await sleep(attempt * 1000);
    }
  }
  throw new Error(`Failed to fetch ${key} after 4 attempts: ${String(lastError)}`);
}

/** Reject a spec that parsed but looks truncated or gutted, so we never publish a hollow SDK. */
function assertHealthy(spec: FetchedSpec, prior: LockEntry | undefined): void {
  if (spec.pathCount < PATH_COUNT_FLOOR) {
    throw new Error(`${spec.key}: only ${spec.pathCount} paths, below floor ${PATH_COUNT_FLOOR}`);
  }
  if (prior && spec.pathCount < prior.pathCount * (1 - PATH_COUNT_TOLERANCE)) {
    throw new Error(
      `${spec.key}: path count dropped ${prior.pathCount} -> ${spec.pathCount} ` +
        `(> ${PATH_COUNT_TOLERANCE * 100}% shrink); refusing as likely truncated`
    );
  }
}

// ---------------------------------------------------------------------------
// API surface extraction (from src/, driven by the exports map)
// ---------------------------------------------------------------------------

/** Map a `./dist/...(.mjs)` export target back to its `src/...(.ts)` source file. */
function srcPathFromDist(distPath: string): string {
  return distPath.replace(/^\.\/dist\//, "src/").replace(/\.mjs$/, ".ts");
}

/** Every published module as `{ subpath, file }`, expanding wildcard subpaths. */
function enumerateModules(): { subpath: string; file: string }[] {
  const pkg = JSON.parse(readFileSync(PKG_PATH, "utf8")) as {
    exports: Record<string, string | { import?: string; types?: string }>;
  };
  const modules: { subpath: string; file: string }[] = [];

  for (const [subpath, value] of Object.entries(pkg.exports)) {
    if (subpath === "./package.json") continue;
    const target = typeof value === "string" ? value : (value.import ?? value.types ?? "");
    if (!target) continue;

    if (subpath.includes("*")) {
      const src = srcPathFromDist(target); // e.g. src/jira-platform-v3/services/*.ts
      const dir = join(REPO_ROOT, dirname(src));
      for (const entry of readdirSync(dir)) {
        if (!entry.endsWith(".ts")) continue;
        const base = entry.replace(/\.ts$/, "");
        modules.push({ subpath: subpath.replace("*", base), file: join(dir, entry) });
      }
    } else {
      modules.push({ subpath, file: join(REPO_ROOT, srcPathFromDist(target)) });
    }
  }
  return modules;
}

/** Sorted `<subpath>#<exportName>` lines for the whole public surface. */
function extractSurface(): string[] {
  const modules = enumerateModules();
  const parsed = ts.parseJsonConfigFileContent(
    ts.readConfigFile(join(REPO_ROOT, "tsconfig.json"), (p) => ts.sys.readFile(p)).config,
    ts.sys,
    REPO_ROOT
  );
  const program = ts.createProgram(
    modules.map((m) => m.file),
    { ...parsed.options, noEmit: true }
  );
  const checker = program.getTypeChecker();

  const lines: string[] = [];
  for (const { subpath, file } of modules) {
    const source = program.getSourceFile(file);
    if (!source) throw new Error(`Source file not found in program: ${file}`);
    const symbol = checker.getSymbolAtLocation(source);
    if (!symbol) continue; // module with no exports
    for (const exp of checker.getExportsOfModule(symbol)) {
      lines.push(`${subpath}#${exp.getName()}`);
    }
  }
  return [...new Set(lines)].sort();
}

// ---------------------------------------------------------------------------
// Diff + changeset
// ---------------------------------------------------------------------------

interface SurfaceDiff {
  bump: Bump;
  added: string[];
  removed: string[];
  changedSdks: string[];
}

function diffSurface(baseline: string[], current: string[]): SurfaceDiff {
  const base = new Set(baseline);
  const curr = new Set(current);
  const added = current.filter((l) => !base.has(l));
  const removed = baseline.filter((l) => !curr.has(l));
  const bump: Bump = removed.length > 0 ? "major" : added.length > 0 ? "minor" : "patch";

  const sdks = new Set<string>();
  for (const line of [...added, ...removed]) {
    const subpath = line.split("#")[0] ?? "";
    const seg = subpath.replace(/^\.\/?/, "").split("/")[0];
    if (seg) sdks.add(seg);
  }
  return { bump, added, removed, changedSdks: [...sdks].sort() };
}

function changesetBody(diff: SurfaceDiff, changedSpecKeys: string[]): string {
  const scope =
    diff.changedSdks.length > 0 ? diff.changedSdks.join(", ") : changedSpecKeys.join(", ");
  const lines: string[] = [];

  if (diff.bump === "patch") {
    lines.push(`Synced with upstream Atlassian OpenAPI specs (${scope}).`);
    lines.push("");
    lines.push(
      "No public API changes - regenerated from updated spec content (descriptions, docs, or non-surface details)."
    );
  } else {
    lines.push(`Synced ${scope} with upstream Atlassian OpenAPI specs.`);
    lines.push("");
    if (diff.added.length > 0) lines.push(`- Added ${diff.added.length} export(s).`);
    if (diff.removed.length > 0) lines.push(`- Removed ${diff.removed.length} export(s).`);
    const sample = (label: string, items: string[]) => {
      if (items.length === 0) return;
      lines.push("");
      lines.push(`${label}:`);
      for (const item of items.slice(0, 20)) lines.push(`- \`${item}\``);
      if (items.length > 20) lines.push(`- …and ${items.length - 20} more.`);
    };
    sample("Removed", diff.removed);
    sample("Added", diff.added);
  }
  return lines.join("\n");
}

function writeChangeset(diff: SurfaceDiff, changedSpecKeys: string[], stamp: string): string {
  const digest = createHash("sha256")
    .update(diff.added.concat(diff.removed).join("\n"))
    .digest("hex");
  const name = `spec-sync-${stamp}-${digest.slice(0, 7)}.md`;
  const path = join(REPO_ROOT, ".changeset", name);
  const content =
    `---\n"@narthia/jira-client": ${diff.bump}\n---\n\n` +
    `${changesetBody(diff, changedSpecKeys)}\n`;
  writeFileSync(path, content, "utf8");
  return name;
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function readLocks(): Locks {
  try {
    return JSON.parse(readFileSync(LOCKS_PATH, "utf8")) as Locks;
  } catch {
    return {};
  }
}

function locksFromSpecs(specs: FetchedSpec[]): Locks {
  const locks: Locks = {};
  for (const spec of specs) {
    locks[spec.key] = {
      url: SPECS[spec.key]!,
      sha256: spec.sha256,
      pathCount: spec.pathCount,
      infoVersion: spec.infoVersion,
    };
  }
  return locks;
}

function run(command: string, args: string[]): void {
  // Resolve the local binary directly rather than relying on PATH, so this works
  // in a plain local shell (where node_modules/.bin is not on PATH) as well as
  // on CI (where setup-vp puts `vp` on PATH anyway).
  const local = join(REPO_ROOT, "node_modules", ".bin", command);
  const bin = existsSync(local) ? local : command;
  execFileSync(bin, args, { cwd: REPO_ROOT, stdio: "inherit" });
}

/**
 * True if regeneration actually changed the tracked `src/` tree.
 *
 * Change detection keys off the spec hash, but a spec can change in a way the
 * generator ignores (e.g. a field it drops), leaving `src/` identical. Then
 * there is nothing to release - only the lock to advance. Uses git; if git is
 * unavailable or this is not a repo, assume changed, so a real change is never
 * skipped.
 */
function generatedOutputChanged(): boolean {
  try {
    const out = execFileSync("git", ["status", "--porcelain", "--", "src"], {
      cwd: REPO_ROOT,
      encoding: "utf8",
    });
    return out.trim().length > 0;
  } catch {
    return true;
  }
}

/** Emit results to GITHUB_OUTPUT when present, and always as a JSON line to stdout. */
function emit(result: Record<string, string>): void {
  // GITHUB_OUTPUT is the only channel Actions gives for step outputs; reading it
  // here is intended. The library-oriented no-process-env rule does not apply.
  // oxlint-disable-next-line no-process-env
  const file = process.env["GITHUB_OUTPUT"];
  if (file) {
    for (const [key, value] of Object.entries(result)) appendFileSync(file, `${key}=${value}\n`);
  }
  process.stdout.write(`${JSON.stringify(result)}\n`);
}

function today(): string {
  return new Date().toISOString().slice(0, 10);
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------

async function main(): Promise<number> {
  const argv = new Set(process.argv.slice(2));
  const dryRun = argv.has("--dry-run");
  const writeBaseline = argv.has("--write-baseline");

  const specs = await Promise.all(Object.entries(SPECS).map(([key, url]) => fetchSpec(key, url)));
  const locks = readLocks();
  for (const spec of specs) assertHealthy(spec, locks[spec.key]);

  const advanceLocks = (): void => {
    writeFileSync(LOCKS_PATH, `${JSON.stringify(locksFromSpecs(specs), null, 2)}\n`, "utf8");
  };

  if (writeBaseline) {
    advanceLocks();
    writeFileSync(SURFACE_PATH, `${extractSurface().join("\n")}\n`, "utf8");
    emit({ action: "baseline" });
    return 0;
  }

  const changedSpecKeys = specs
    .filter((spec) => locks[spec.key]?.sha256 !== spec.sha256)
    .map((spec) => spec.key);

  // action tells the workflow what to do: none | lock | release | major.
  if (changedSpecKeys.length === 0) {
    emit({ action: "none" });
    return 0;
  }

  // Regenerate from the new specs (clean: "generated" prunes deleted endpoints),
  // then normalize formatting so the surface diff and any commit are clean.
  run("vp", ["run", "generate"]);
  run("vp", ["run", "check:fix"]);

  // A spec can change in a way that leaves generated output identical (e.g. a
  // field the generator ignores). Then there is nothing to release - just record
  // the new hash so the same change is not re-detected on every future run.
  if (!generatedOutputChanged()) {
    if (!dryRun) advanceLocks();
    emit({ action: "lock", changedSpecs: changedSpecKeys.join(","), dryRun: String(dryRun) });
    return 0;
  }

  const baseline = readFileSync(SURFACE_PATH, "utf8").split("\n").filter(Boolean);
  const current = extractSurface();
  const diff = diffSurface(baseline, current);
  const action = diff.bump === "major" ? "major" : "release";

  const result: Record<string, string> = {
    action,
    bump: diff.bump,
    changedSpecs: changedSpecKeys.join(","),
    changedSdks: diff.changedSdks.join(","),
    added: String(diff.added.length),
    removed: String(diff.removed.length),
  };

  if (dryRun) {
    emit({ ...result, dryRun: "true" });
    return 0;
  }

  const changeset = writeChangeset(diff, changedSpecKeys, today());

  // Advance the lock + surface baseline only for non-major bumps. A major is
  // gated for human review; leaving the lock stale keeps it re-detected until
  // the review lands, instead of being silently forgotten.
  if (diff.bump !== "major") {
    advanceLocks();
    writeFileSync(SURFACE_PATH, `${current.join("\n")}\n`, "utf8");
  }

  emit({ ...result, changeset });
  return 0;
}

main().then(
  (code) => {
    process.exitCode = code;
  },
  (error: unknown) => {
    process.stderr.write(
      `${error instanceof Error ? (error.stack ?? error.message) : String(error)}\n`
    );
    process.exitCode = 1;
  }
);
