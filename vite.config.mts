import { defineConfig } from "vite";
import { fileURLToPath } from "url";
import fg from 'fast-glob';
import path from "path";
import UnoCSS from "unocss/vite";

export default defineConfig({
  plugins: [
    UnoCSS(),
    {
      name: "watch-templates",
      async buildStart() {
        const files = await fg(["./templates/**/*.html"]);
        for (const file of files) {
          this.addWatchFile(file);
        }
      },
    },
  ],
  build: {
    outDir: fileURLToPath(new URL("./templates/assets/dist", import.meta.url)),
    emptyOutDir: true,
    minify: 'terser',
    cssMinify: 'lightningcss',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
      },
    },
    rollupOptions: {
      output: {
        manualChunks: undefined,
        compact: true,
      },
      treeshake: {
        moduleSideEffects: false,
      },
    },
    lib: {
      entry: path.resolve(__dirname, "src/main.ts"),
      name: "main",
      fileName: "main",
      formats: ["iife"],
    },
    reportCompressedSize: true,
  },
});
