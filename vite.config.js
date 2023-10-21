import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: true,
    strictPort: true,
    port: 8000,
    //get rid of CORS error
    proxy:{
      "/api":{
        target:'https://trb-pho0.onrender.com/',
        // target:'http://localhost:5000',
        changeOrigin:true,
        secure:true
      }
    }
  }
})
