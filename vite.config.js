import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(),
    tailwindcss(),
  ],
  // server:{port:5174}
  server: {
    host: '0.0.0.0',
    port: process.env.PORT || 5174,
    strictPort: true,
    cors: true,  // Enable CORS
    // allowedHosts: ['prescripto-frontend-7-8coi.onrender.com'],
    proxy: {
      '/api': {
        target: 'https://prescripto-backend-3.onrender.com',  // Change this to your backend URL
        changeOrigin: true,
        secure: false,
      },
    },
  },
  preview: {
    host: '0.0.0.0',
    port: 5174,
  },
})





  
