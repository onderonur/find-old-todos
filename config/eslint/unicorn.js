import eslintPluginUnicorn from 'eslint-plugin-unicorn';
import { defineConfig } from 'eslint/config';

export const unicornConfig = defineConfig([
  eslintPluginUnicorn.configs.recommended,
  // https://github.com/sindresorhus/eslint-plugin-unicorn/tree/main?tab=readme-ov-file#rules
  {
    rules: {
      'unicorn/prevent-abbreviations': 'off',
      'unicorn/no-null': 'off',
      'unicorn/prefer-module': 'off',
      'unicorn/explicit-length-check': 'off',
      'unicorn/prefer-ternary': 'off',
      'unicorn/no-array-for-each': 'off',
      'unicorn/prefer-export-from': 'off',
      'unicorn/prefer-global-this': 'off',
    },
  },
]);
