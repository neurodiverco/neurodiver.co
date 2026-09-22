import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "path";

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
  resolve: {
    alias: {
      "@": path.resolve(import.meta.dirname, "./src"),
    },
  },
  server: {
    // When Nest mounts Vite (VITE_MIDDLEWARE_MODE), /api is handled by Nest on the same port.
    proxy: process.env.VITE_MIDDLEWARE_MODE
      ? undefined
      : {
          "/api": {
            target: "http://localhost:3000",
            changeOrigin: true,
          },
        },
  },
});