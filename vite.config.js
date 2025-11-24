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
    // THIS IS THE KEY TO FIX 404 ON REFRESH
    historyApiFallback: true,
  },
  preview: {
    port: 5173,
    host: true,
  },
});
