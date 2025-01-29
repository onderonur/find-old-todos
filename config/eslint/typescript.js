import { defineConfig } from 'eslint/config';
import tseslint from 'typescript-eslint';

export const typescriptConfig = defineConfig([
  tseslint.configs.strictTypeChecked,
  // https://typescript-eslint.io/getting-started/typed-linting/
  {
    languageOptions: {
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
  },
  {
    rules: {
      '@typescript-eslint/prefer-destructuring': 'warn',
      '@typescript-eslint/consistent-type-imports': 'warn',
      '@typescript-eslint/no-misused-promises': [
        'warn',
        { checksVoidReturn: false },
      ],
      '@typescript-eslint/restrict-template-expressions': [
        'warn',
        { allowNumber: true },
      ],
    },
  },
  // https://typescript-eslint.io/getting-started/typed-linting/#how-can-i-disable-type-aware-linting-for-a-subset-of-files
  {
    files: ['**/*.{js,jsx,mjs,cjs}'],
    ...tseslint.configs.disableTypeChecked,
  },
]);
