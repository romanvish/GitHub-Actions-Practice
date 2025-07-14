// vitest.config.ts
import { defineConfig } from 'vitest/config'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [vue()],
  test: {
    globals: true,
    environment: 'jsdom',
    // setupFiles: './vitest.setup.js',
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
      include: ['src/**/*.{js,ts,vue}'],
      // exclude: [
      //   'node_modules',
      //   'dist',
      //   'src/main.js', // Exclude main entry point
      //   'src/**/*.spec.js', // Exclude test files
      //   'src/**/*.test.js', // Exclude test files
      // ],
    }
  },
})
