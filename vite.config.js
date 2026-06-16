import { defineConfig } from 'vite'
import { resolve } from 'path'

// Base relative ('./') so the site works both at a domain root and on a
// GitHub Pages project subpath (e.g. user.github.io/repo/).
export default defineConfig({
  base: './',
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        cv: resolve(__dirname, 'cv.html'),
        projets: resolve(__dirname, 'projets.html'),
        jeu: resolve(__dirname, 'jeu.html'),
        contact: resolve(__dirname, 'contact.html'),
      },
    },
  },
  server: {
    watch: { usePolling: true },
  },
})
