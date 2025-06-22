import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  server: {
    proxy: {
      '/api': 'https://chat-application-socket-io-r7sq.onrender.com'
    }
  },
  plugins: [react()],
});

