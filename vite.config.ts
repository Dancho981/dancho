import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: true,
    // Native file watching (fs.watch) fails on Windows network/mapped
    // drives (e.g. H:) with "UNKNOWN: watch". Polling works everywhere.
    watch: {
      usePolling: true,
      interval: 300,
    },
  },
})
