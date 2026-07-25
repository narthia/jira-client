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
    // `src/transport/*.ts` is listed so each transport becomes a real entry
    // with its own `.d.mts`; otherwise it ships in dist as an untyped,
    // unreachable file. The public subpath comes from the wildcard below.
    entry: [
      "src/index.ts",
      "src/*/index.ts",
      "src/*/config.ts",
      "src/*/services/*.ts",
      "src/transport/*.ts",
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
      // Don't emit one explicit export per service or transport file; both are
      // exposed via single wildcard subpaths below instead.
      exclude: ["**/services/**", "transport/*"],
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
        }
        // Plural subpath, singular dist dir: `src/transport/` is generated, and
        // `unbundle` mirrors it into dist. Any transport added later is covered
        // without touching this config.
        exports["./transports/*"] = {
          types: "./dist/transport/*.d.mts",
          import: "./dist/transport/*.mjs",
        };
        return exports;
      },
    },
  },
  lint: {
    ...oxlintConfig,
  },
  fmt: {
    ...oxfmtConfig,
  },
});
