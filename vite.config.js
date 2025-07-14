// vite.config.js
export default defineConfig({
  plugins: [react()],
  preview: {
    allowedHosts: ['sangenkei-20250714.onrender.com'], // ← これを追記
  }
});

