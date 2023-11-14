import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/ws': {
        target: 'http://ec2-54-221-52-14.compute-1.amazonaws.com:8080',
        ws: true,
      },
    },
    host: true,
    port: 8000,
  },
});
