import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import markdownPlugin from "./vite-plugin-markdown.mjs";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [markdownPlugin(), react()],
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
