import { defineConfig } from 'vite';        // ← これが必要！
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  preview: {
    allowedHosts: ['sangenkei-20250714.onrender.com'], // ← 追加した設定もそのままでOK
  },
});
