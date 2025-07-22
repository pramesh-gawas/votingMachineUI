import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    port: process.env.PORT ? parseInt(process.env.PORT, 10) : 5173,
    host: true,
    allowedHosts: ['votingmachineui.onrender.com']
  },
  
});