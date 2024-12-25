import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@enums': '/src/constants/enums.js',
      '@components': '/src/components'
    }
  }
})
