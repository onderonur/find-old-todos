import onlyWarn from 'eslint-plugin-only-warn';
import { defineConfig } from 'eslint/config';
import globals from 'globals';
import { importConfig } from './config/eslint/import.js';
import { javascriptConfig } from './config/eslint/javascript.js';
import { prettierConfig } from './config/eslint/prettier.js';
import { typescriptConfig } from './config/eslint/typescript.js';
import { unicornConfig } from './config/eslint/unicorn.js';

export default defineConfig([
  {
    files: ['**/*.{js,jsx,mjs,cjs,ts}'],
    languageOptions: { globals: globals.node },
  },
  {
    plugins: { onlyWarn },
  },
  {
    ignores: ['src/example-files', 'dist'],
  },
  javascriptConfig,
  typescriptConfig,
  importConfig,
  unicornConfig,
  prettierConfig,
]);
