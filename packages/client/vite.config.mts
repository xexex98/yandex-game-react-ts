import react from '@vitejs/plugin-react';
import dotenv from 'dotenv';
import { defineConfig } from 'vite';

dotenv.config();

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    port: Number(process.env.CLIENT_PORT) || 3000,
  },
  define: {
    __REDIRECT_URI__: String(process.env.REDIRECT_URI),
    __SERVER_PORT__: process.env.SERVER_PORT,
  },
  plugins: [react()],
});
