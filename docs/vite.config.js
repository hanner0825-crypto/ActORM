import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/ActORM/',
  build: {
    outDir: '.', // Genera los archivos en la raíz de docs
    emptyOutDir: false,
  },
})