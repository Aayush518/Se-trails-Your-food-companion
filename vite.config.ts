import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
  // Add base URL configuration
  base: '/',
  // Add server configuration for SPA fallback
  server: {
    middleware: [
      {
        name: 'spa-fallback',
        enforce: 'pre',
        apply: 'serve',
        handle: (req, res, next) => {
          next();
        },
      },
    ],
  },
});