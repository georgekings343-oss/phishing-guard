import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"), // <-- this enables @ = src
    },
  },
  server: {
    host: true,
    port: 5173,
    strictPort: true,
    cors: true,
  },
  preview: {
    port: 5173,
    host: true,
  },
});
