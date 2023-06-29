import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const productionMinify = mode === "production";

  return {
    plugins: [react()],
    server: {
      port: 3002,
    },
    envDir: "./env",
    build: {
      // Resuelve el problema de build testnet-production (testnet online)
      minify: productionMinify,
    },
  };
});
