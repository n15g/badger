import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import legacy from '@vitejs/plugin-legacy'

// https://vite.dev/config/
export default defineConfig({
  base: '/badger',
  plugins: [react(), legacy({
    targets: ['defaults', 'not IE 11'],
    polyfills: ['es.array.to-sorted'],
    modernPolyfills: ['es.array.to-sorted'],
  })],
  build: {
    chunkSizeWarningLimit: 2048
  }
})
