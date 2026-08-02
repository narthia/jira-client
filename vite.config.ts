import { oxfmtConfig, oxlintConfig } from "@narthia/toolkit/oxc-config";
import { defineConfig } from "vite-plus";

export default defineConfig({
  staged: {
    // Allow non-lintable staged files such as README.md and package.json.
    "*": "vp check --fix --no-error-on-unmatched-pattern",
  },
  pack: {
    // Emit each service as its own module so consumers can deep-import a
    // single service and tree-shake the rest away.
    // `src/*/config.ts` gives each SDK a public `config` subpath, so deep-import
    // users can build a context with that SDK's own auth shape.
    // `src/*/transports/*.ts` is each SDK's typed transport (e.g. the `http`
    // that takes that SDK's `{ email, apiToken }` auth) - the public transport
    // subpath, exposed via the per-SDK wildcard below. `src/transports/*.ts` is
    // the shared runtime transport (`_http`), listed so it becomes a real,
    // typed entry rather than an untyped hoisted chunk; it stays internal (the
    // typed per-SDK transports import it) and gets no public subpath.
    entry: [
      "src/index.ts",
      "src/*/index.ts",
      "src/*/config.ts",
      "src/*/services/*.ts",
      "src/*/transports/*.ts",
      "src/transports/*.ts",
    ],
    // Mirror the source tree in dist. Without this, types shared between a
    // module's index and its services get hoisted into hash-named chunks at
    // the dist root (185 of them). Bundle output is byte-identical either way.
    unbundle: true,
    deps: {
      neverBundle: ["oxfmt", "oxlint"],
      dts: {
        neverBundle: ["oxfmt", "oxlint"],
      },
    },
    exports: {
      // Don't emit one explicit export per service or transport file; services
      // are exposed via per-SDK wildcards below, the typed per-SDK transports
      // via per-SDK `transports/*` wildcards, and the shared `transports/_http`
      // runtime stays internal (no public subpath).
      exclude: ["**/services/**", "**/transports/**"],
      // The packer regenerates `exports` on every build, so wildcard subpaths
      // have to be re-added here or they get stripped.
      customExports(exports) {
        for (const mod of [
          "jira-platform-v2",
          "jira-platform-v3",
          "jira-service-desk",
          "jira-software",
        ]) {
          exports[`./${mod}/services/*`] = {
            types: `./dist/${mod}/services/*.d.mts`,
            import: `./dist/${mod}/services/*.mjs`,
          };
          // Each SDK's typed transports, e.g.
          // `@narthia/jira-client/jira-platform-v3/transports/http`.
          exports[`./${mod}/transports/*`] = {
            types: `./dist/${mod}/transports/*.d.mts`,
            import: `./dist/${mod}/transports/*.mjs`,
          };
        }
        return exports;
      },
    },
  },
  lint: {
    ...oxlintConfig,
    overrides: [
      {
        // The generator emits its shared runtime transport as `_http.ts`; the
        // leading underscore marks the file internal (the typed per-SDK
        // transports import it) but trips the kebab-case filename rule. Scope
        // the exception to these underscore-prefixed runtime files only.
        files: ["src/transports/_*.ts"],
        rules: {
          "check-file/filename-naming-convention": "off",
        },
      },
    ],
  },
  fmt: {
    ...oxfmtConfig,
  },
});
