import importPlugin from 'eslint-plugin-import';
import { defineConfig } from 'eslint/config';

// https://github.com/import-js/eslint-plugin-import?tab=readme-ov-file#config---flat-with-config-in-typescript-eslint
export const importConfig = defineConfig([
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      importPlugin.flatConfigs.recommended,
      importPlugin.flatConfigs.typescript,
    ],
    rules: {
      'import/first': 'warn',
      'import/newline-after-import': 'warn',
    },
  },
]);
