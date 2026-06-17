import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    // Pin to 5173 so the dev origin always matches the Google "Authorized JavaScript
    // origin". Without strictPort, Vite silently moves to 5174 when 5173 is taken,
    // and Google then rejects sign-in from the unrecognised origin.
    port: 5173,
    strictPort: true,
    proxy: {
      '/api': 'http://localhost:4000',
    },
  },
});
