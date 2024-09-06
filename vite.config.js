import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: './', // Ensure paths are relative so Electron can load them correctly

  server: {
    host: '0.0.0.0', // Expose server on all network interfaces
    port: 5173,      // Set your desired port
    strictPort: true, // Ensure Vite uses the specified port
    cors: true, // Enable CORS to allow requests from different origins
  },
  build: {
    outDir: 'dist', // Ensure this matches your Electron build configuration
    rollupOptions: {
      // Customize Rollup options if needed
    },
  },
});
