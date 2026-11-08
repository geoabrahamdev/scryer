import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// Base path matches the repo name for GitHub Pages.
// If you rename the repo, update this to match.
export default defineConfig({
  base: '/scryer/',
  plugins: [react(), tailwindcss()],
  build: {
    outDir: 'dist',
    sourcemap: true,
  },
})
