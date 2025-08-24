import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src/index.ts"],
  format: ["esm", "cjs"],
  dts: true,
  sourcemap: true,
  clean: true,
  treeshake: true,
  minify: false,
  external: ["react", "react-dom"],
  splitting: false,
  outExtension: (ctx) => ({
    js: ctx.format === "esm" ? ".mjs" : ".cjs"
  })
});
