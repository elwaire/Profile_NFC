/// <reference types="vitest" />
/// <reference types="vite/client" />
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from "path"
import tsconfigPaths from 'vite-tsconfig-paths';

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react(), tsconfigPaths()],
     // @ts-ignore
    test: {
      globals: true,
      environment: 'jsdom',
      setupFiles: './src/core/tests/setup.ts',
    },
    resolve: {
        alias: {
          "~": path.resolve(__dirname, "./src"),
        },
      },
});
