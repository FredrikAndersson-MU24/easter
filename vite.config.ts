import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: './', // För att ladda resurser relativt till index.html
  build: {
    outDir: "dist", // Output-dir för JavaScript
  },
});
