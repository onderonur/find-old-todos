import ora from 'ora';
import { args } from './args';

export const spinner = ora(
  `Searching for TODOs older than ${args.days} days...`,
);
