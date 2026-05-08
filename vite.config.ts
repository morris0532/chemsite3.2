import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import markdownPlugin from "./vite-plugin-markdown.mjs";

/**
 * Custom plugin to defer CSS loading for better performance and to prevent FOUC
 * by using link[rel="preload"] + onload for non-critical styles.
 */
const asyncCssLoader = () => ({
  name: 'async-css-loader',
  transformIndexHtml(html) {
    // 1. Convert <link rel="stylesheet"> to <link rel="preload" as="style" onload="this.onload=null;this.rel='stylesheet'">
    // This allows CSS to download in parallel without blocking the initial HTML paint
    return html.replace(
      /<link rel="stylesheet" href="([^"]+)">/g,
      '<link rel="preload" href="$1" as="style" onload="this.onload=null;this.rel=\'stylesheet\'">'
    );
  },
});

export default defineConfig({
  base: "/",
  plugins: [
    markdownPlugin(),
    react(),
    // asyncCssLoader(), // Disabled to prevent FOUC: Returning to standard synchronous loading for stability
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  optimizeDeps: {
    include: ["gray-matter"],
  },
  preview: {
    allowedHosts: true,
  },
  build: {
    cssCodeSplit: true,
    rollupOptions: {
      output: {
        manualChunks: {
          "react-vendor": ["react", "react-dom", "react-router-dom"],
          "ui-vendor": [
            "@radix-ui/react-accordion",
            "@radix-ui/react-dialog",
            "@radix-ui/react-dropdown-menu",
            "@radix-ui/react-tabs"
          ],
          "icons": ["lucide-react"],
          "gallery-page": ["./src/pages/PackagingGallery.tsx"],
        },
      },
    },
    chunkSizeWarningLimit: 1000,
  },
});
