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
});
