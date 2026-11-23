import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { viteSingleFile } from 'vite-plugin-singlefile'

// `--mode artifact` genera un único HTML autocontenido para vista previa en Claude.
// BASE_PATH permite servir el sitio bajo un subdirectorio (GitHub Pages).
export default defineConfig(({ mode }) => ({
  base: process.env.BASE_PATH ?? '/',
  plugins: [react(), tailwindcss(), mode === 'artifact' && viteSingleFile()],
  resolve: { alias: { '@': new URL('./src', import.meta.url).pathname } },
  build: mode === 'artifact' ? { outDir: 'dist-artifact' } : undefined,
}))
