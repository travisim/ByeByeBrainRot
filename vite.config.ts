import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      input: {
        popup: 'src/popup/index.html',
        background: 'src/background/index.ts',
        content: 'src/content/index.ts'
      },
      output: {
        entryFileNames: 'dist/[name]/index.js',
        chunkFileNames: 'dist/[name]/[hash].js',
        assetFileNames: 'dist/[name]/[hash][extname]'
      }
    },
    outDir: 'dist',
    emptyOutDir: true,
  },
  server: {
    open: '/src/popup/index.html'
  }
});
