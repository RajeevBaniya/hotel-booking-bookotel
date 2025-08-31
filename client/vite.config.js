import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  // Dev proxy to avoid cross-origin issues when hitting Render from localhost
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:3001', // Use local backend for testing
        changeOrigin: true,
        secure: false,
      },
    },
  }
})
