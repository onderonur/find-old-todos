import eslintConfigPrettier from 'eslint-config-prettier';
import { defineConfig } from 'eslint/config';

export const prettierConfig = defineConfig([
  eslintConfigPrettier,
  {
    rules: {
      curly: ['warn', 'multi-line'],
    },
  },
]);
