import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    proxy: {
      "/api": "http://localhost:3000", // Redirige /api a tu backend
      "/static": "http://localhost:3000", // También redirige imágenes u otros archivos estáticos si los usas
    },
  },
});
