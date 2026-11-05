import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/ActORM/',
  build: {
    outDir: '.', // Compila directamente en la carpeta docs
    emptyOutDir: false,
  },
})