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
    // `src/transports/*.ts` is the single shared transport set for every SDK:
    // the public typed transports (`http`, `forge`) plus the `_`-prefixed
    // generic runtime they wrap (`_http`, `_forge`). All are listed so each
    // becomes a real, typed entry rather than an untyped hoisted chunk; only
    // the non-underscore ones get a public subpath (see `customExports`).
    entry: [
      "src/index.ts",
      "src/*/index.ts",
      "src/*/config.ts",
      "src/*/services/*.ts",
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
      // are exposed via per-SDK wildcards below, the shared transports via
      // explicit `./transports/<name>` subpaths, and the `_`-prefixed generic
      // runtime (`_http`, `_forge`) stays internal (no public subpath).
      exclude: ["**/services/**", "**/transports/**"],
      // The packer regenerates `exports` on every build, so these have to be
      // re-added here or they get stripped.
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
        }
        // Shared transports, used by every SDK, e.g.
        // `@narthia/jira-client/transports/http`. Only the public typed
        // transports get a subpath; the generic runtime they wrap (`_http`,
        // `_forge`) is imported internally and stays unexported.
        for (const transport of ["http", "forge"]) {
          exports[`./transports/${transport}`] = {
            types: `./dist/transports/${transport}.d.mts`,
            import: `./dist/transports/${transport}.mjs`,
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
        // The generator emits its generic runtime transports with a leading
        // underscore (`_http.ts`, `_forge.ts`) to mark them internal - the
        // public typed transports (`http.ts`, `forge.ts`) wrap them. That
        // underscore trips the kebab-case filename rule, so scope the exception
        // to these underscore-prefixed runtime files only.
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
