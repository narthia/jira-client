import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src/index.ts"],
  format: ["cjs", "esm"],
  dts: true,
  splitting: false,
  sourcemap: false,
  clean: true,
  treeshake: true,
  minify: true,
  external: ["@forge/api"], // Peer dependency - exclude from bundle
  noExternal: [],
  target: "node18",
  platform: "node",
  outDir: "dist",
  onSuccess: "tsc --emitDeclarationOnly --declaration"
});
