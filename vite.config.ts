import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';

export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      input: {
        popup: resolve(__dirname, 'src/popup/index.html'),
        background: resolve(__dirname, 'src/background/index.ts'),
        content: resolve(__dirname, 'src/content/index.ts')
      },
      output: {
        entryFileNames: 'dist/[name]/index.js',
        chunkFileNames: 'dist/[name]/[hash].js',
        assetFileNames: (assetInfo) => {
          // Keep original name for CSS files
          if (assetInfo.name && assetInfo.name.endsWith('.css')) {
            return 'dist/[name]/styles.css';
          }
          // Use hash for other assets
          return '[name]/assets/[hash][extname]';
        }
      }
    },
    outDir: 'dist',
    emptyOutDir: true,
  },
  
  server: {
    port: 5173,
    strictPort: true,
    hmr: {
      port: 5173
    }
  }
});