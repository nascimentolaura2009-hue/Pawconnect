import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
  server: {
    port: 5173,
    proxy: {
      '/auth': 'http://localhost:5000',
      '/pets': 'http://localhost:5000',
      '/usuarios': 'http://localhost:5000',
      '/api': 'http://localhost:5000',
    }
  }
})
