import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/',  // Ensures assets are looked up from the correct path
  build: {
    outDir: 'dist',  // Specifies build output directory
    assetsDir: 'assets',  // Where the assets will be output
    sourcemap: true  // Helps with debugging
  },
  server: {
    port: 3000,
    open: true
  }
})