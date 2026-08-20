import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import legacy from '@vitejs/plugin-legacy'
import package_ from './package.json' with { type: 'json' }

// https://vite.dev/config/
export default defineConfig(() => {
  const buildInfo = {
    version: package_.version,
    builtAt: new Date().toISOString(),
  }

  return {
    base: '/badger',
    define: {
      __BADGER_BUILD__: JSON.stringify(buildInfo),
    },
    plugins: [react(), legacy({
      targets: ['defaults', 'not IE 11'],
      polyfills: ['es.array.to-sorted'],
      modernPolyfills: ['es.array.to-sorted'],
    })],
    build: {
      chunkSizeWarningLimit: 2048
    }
  }
})
