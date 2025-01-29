import js from '@eslint/js';
import { defineConfig } from 'eslint/config';

export const javascriptConfig = defineConfig([
  js.configs.recommended,
  {
    rules: {
      'no-alert': 'warn',
      'object-shorthand': 'warn',
      eqeqeq: 'warn',
      'no-param-reassign': 'warn',
      'prefer-template': 'warn',
      'no-nested-ternary': 'warn',
      'no-else-return': 'warn',
    },
  },
]);
