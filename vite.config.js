import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [
    react({
      include: '**/*.{js,jsx,ts,tsx}', // <-- allow JSX in .js files
    }),
  ],
  server: {
    host: '0.0.0.0',
    port: Number(process.env.VITE_PORT) || 5173,
    proxy: {
      '/api': {
        target: 'http://localhost:5001', // Backend
        changeOrigin: true,
        secure: false,
      },
      '/proxy-pf-signin': {
        target: 'http://localhost:5001',
        changeOrigin: true,
        secure: false,
      },
      '/proxy-manifest': {
        target: 'http://localhost:5001',
        changeOrigin: true,
        secure: false,
      },
    },
  },
  resolve: {
    alias: {
      '@': '/src',
    },
  },
});
