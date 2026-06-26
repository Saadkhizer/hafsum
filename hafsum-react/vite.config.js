import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    // Pinned to 5175 (5173 is used by the Decora Interiors site). strictPort keeps us
    // here instead of silently sliding to the next free port. NOTE: for Google sign-in
    // to work, add "http://localhost:5175" to the Authorized JavaScript origins in the
    // Google Cloud Console — otherwise use the dev-login / guest "Continue to order".
    port: 5175,
    strictPort: true,
    proxy: {
      '/api': 'http://localhost:4000',
    },
  },
});
