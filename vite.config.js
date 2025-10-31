import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [tailwindcss(), react()],
  base: "./", // ✅ Important: ensures assets load correctly after deploy
  build: {
    outDir: "dist", // ✅ Default build output folder
  },
  server: {
    port: 5173,
    open: true,
  },
});
