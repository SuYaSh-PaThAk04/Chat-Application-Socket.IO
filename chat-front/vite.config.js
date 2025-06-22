import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
     server: {
  proxy: {
    '/api': 'https://chat-application-socket-io-r7sq.onrender.com'
  }
},
  plugins: [react()],
})
