// tsup.config.ts
import { defineConfig } from 'tsup';

export default defineConfig(() => ({
  entry: ['src/cli.ts'],
  outDir: 'dist',
  format: ['esm'],
  // Clean output directory before each build
  clean: true,
}));
