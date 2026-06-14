import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig(({ command }) => ({
  // En GitHub Pages la app vive en /rickAndMorty/. En dev se sirve en la raíz.
  base: command === 'build' ? '/rickAndMorty/' : '/',
  plugins: [react(), tailwindcss()],
  server: {
    // En desarrollo redirigimos al API real para evitar problemas de CORS.
    proxy: {
      '/graphql': {
        target: 'https://rickandmortyapi.com',
        changeOrigin: true,
      },
      '/api': {
        target: 'https://rickandmortyapi.com',
        changeOrigin: true,
      },
    },
  },
}))
