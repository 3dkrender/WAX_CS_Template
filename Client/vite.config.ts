/// <reference types="vitest" />
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tsconfigPaths from 'vite-tsconfig-paths';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const productionMinify = mode === "production";

  return {
    plugins: [react(), tsconfigPaths()],
    server: {
      port: 3002,
    },
    envDir: "./env",
    build: {
      // Resuelve el problema de build testnet-production (testnet online)
      minify: productionMinify,
    },
    test: {
      globals: true,
      environment: 'jsdom',
      setupFiles: './src/test/setup.ts',
      css: true,
    },
  };
});
