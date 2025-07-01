/// <reference types="vitest" />
/// <reference types="vite/client" />
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist'
  },
  test: {
    environment: 'jsdom', // Required for React DOM testing
    globals: true, // Enables describe, it, expect, vi without imports
    setupFiles: ['./tests/setup.ts'], // Path to setup file
  },
})
