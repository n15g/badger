import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig(({ command }) => {
  return {
    base: command === 'build' ? '/badger' : '/',
    plugins: [react()],
    build: {
      chunkSizeWarningLimit: 2048
    }
  }
})
