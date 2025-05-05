const config = {
  '*': 'prettier --write --ignore-unknown',
  '*.{js,jsx,mjs,cjs,ts,tsx}': 'eslint --max-warnings 0 --fix',
};

export default config;
