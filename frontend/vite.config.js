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
    host: '0.0.0.0', // Use IPv4 address
    port: 3000 // Optional: specify your port number
  }

  // optimizeDeps: {
  //   include: ['react-map-gl']
  // }

})


