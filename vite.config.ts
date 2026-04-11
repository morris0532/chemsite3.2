import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import markdownPlugin from "./vite-plugin-markdown.mjs";

// https://vitejs.dev/config/
export default defineConfig({
  base: "/",
  plugins: [
    markdownPlugin(),
    react(),
    {
      name: 'async-css-loader',
      transformIndexHtml(html) {
        const cssLinkRegex = /<link rel="stylesheet" crossorigin href="\/assets\/index-([a-zA-Z0-9]+)\.css">/;
        const match = html.match(cssLinkRegex);
        if (match) {
          const cssLinkTag = match[0];
          const cssHash = match[1];
          const preloadLink = `<link rel="preload" href="/assets/index-${cssHash}.css" as="style" onload="this.onload=null;this.rel='stylesheet'">`;
          const noscriptFallback = `<noscript><link rel="stylesheet" crossorigin href="/assets/index-${cssHash}.css"></noscript>`;
          return html.replace(cssLinkTag, `${preloadLink}\n    ${noscriptFallback}`);
        }
        return html;
      },
    },
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  optimizeDeps: {
    include: ['gray-matter'],
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          'react-vendor': ['react', 'react-dom', 'react-router-dom'],
          'ui-vendor': [
            '@radix-ui/react-accordion',
            '@radix-ui/react-dialog',
            '@radix-ui/react-dropdown-menu',
            '@radix-ui/react-tabs',
            'lucide-react'
          ],
          // Separate gallery chunk to ensure it's only loaded on demand
          'gallery-page': ['./src/pages/PackagingGallery.tsx'],
        },
      },
    },
    chunkSizeWarningLimit: 1000,
  },
});
