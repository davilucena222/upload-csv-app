/// <reference types="vitest" />
/// <reference types="vite/client" />

import { defineConfig } from 'vite'

export default defineConfig({
  test: {
    globals: true,
    environment: "jsdom",
    css: true,
    setupFiles: "./src/__tests__/setup.ts",
  }
})
