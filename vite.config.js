import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"), // Enables @ = src
    },
  },
  server: {
    host: true,
    port: 5173,
    strictPort: true,
    cors: true,
    // Ensures all unknown routes serve index.html (SPA fix)
    historyApiFallback: true,
    fs: {
      allow: [".."],
    },
    middlewareMode: false,
  },
  preview: {
    port: 5173,
    host: true,
  },
});
