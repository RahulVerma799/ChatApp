import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server:{
    proxy:{
     '/api': {
                target: 'https://chatapp-334f.onrender.com', // Backend URL
                changeOrigin: true, // Required for proxying to a different domain
                secure: true, // If using HTTPS
            },
    }
  }
})
