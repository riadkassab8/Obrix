import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { visualizer } from "rollup-plugin-visualizer";
import path from "path";
import type { Plugin } from "vite";

const mimeFixPlugin: Plugin = {
  name: 'mime-fix',
  configureServer(server) {
    server.middlewares.use((req, res, next) => {
      if (req.url?.endsWith('.js') || req.url?.endsWith('.mjs') || req.url?.endsWith('.ts') || req.url?.endsWith('.tsx')) {
        res.setHeader('Content-Type', 'application/javascript');
      }
      next();
    });
  }
};

export default defineConfig({
  base: "/",
  build: {
    outDir: "dist",
    assetsDir: "assets",
    sourcemap: false,
    rollupOptions: {
      output: {
        manualChunks: undefined,
      },
    },
  },
  plugins: [react(), tailwindcss(), mimeFixPlugin, visualizer({ open: process.env.NODE_ENV !== "production", gzipSize: true })],
  resolve: {
    alias: {
      "@": path.resolve(import.meta.dirname, "src"),
      "@assets": path.resolve(import.meta.dirname, "attached_assets")
    },
    dedupe: ["react", "react-dom"]
  },
  server: {
    port: 5173,
    host: "0.0.0.0"
  },
  preview: {
    port: 4173,
    host: "0.0.0.0"
  }
});
