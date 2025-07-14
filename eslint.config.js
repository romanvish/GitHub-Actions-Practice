import eslint from '@eslint/js';
import eslintConfigPrettier from 'eslint-config-prettier';
import eslintPluginVue from 'eslint-plugin-vue';
import globals from 'globals';
// import typescriptEslint from '@typescript-eslint/eslint-plugin';
// import tsParser from '@typescript-eslint/parser';

export default [
  // Global ignores
  {
    ignores: ['*.d.ts', '**/dist/*', '**/node_modules/*'],
  },
  // ESLint recommended rules
  eslint.configs.recommended,
  // TypeScript-ESLint recommended rules
  // ...typescriptEslint.configs.recommended,
  // Vue recommended rules (flat config)
  ...eslintPluginVue.configs['flat/recommended'],
  // Prettier rules to disable conflicting ESLint rules
  eslintConfigPrettier,
  // Custom configuration
  {
    files: ['**/*.{js,ts,vue}'],
    languageOptions: {
      sourceType: 'module',
      globals: {
        ...globals.browser,
      },
      // parser: tsParser, // Use TypeScript parser for .ts and .vue files
      // parserOptions: {
      //   ecmaVersion: 'latest',
      //   sourceType: 'module',
      //   project: './tsconfig.json', // Required for TypeScript type-aware linting
      // },
    },
    // plugins: {
    //   'typescript-eslint': typescriptEslint,
    // },
    rules: {
      'no-unused-vars': 'warn', // Warn about unused variables
      'vue/no-unused-vars': 'warn',
      'vue/require-v-for-key': 'warn',
      'vue/multi-word-component-names': 'warn',
      'vue/no-v-html': 'warn',// not "off" // Allow v-html for specific use cases
      'vue/return-in-computed-property': 'warn', // Ensure computed properties return a value
      'vue/valid-v-for': 'warn', // Ensure v-for directives are valid
      // Add more custom rules here
    },
  },
];