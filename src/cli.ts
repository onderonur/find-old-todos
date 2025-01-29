#!/usr/bin/env node
import { isInsideGitRepository } from './utils/git';
import { logTodos } from './utils/logger';
import { spinner } from './utils/spinner';
import { findTodosInFolder } from './utils/todos';

async function main() {
  spinner.start();

  await new Promise<void>((resolve) => {
    setTimeout(() => {
      resolve();
    }, 5000);
  });

  if (!isInsideGitRepository()) {
    spinner.fail();
    console.error('🤷 Current directory is not a Git repository.');
    return;
  }

  const currentDirectory = process.cwd();

  const todos = await findTodosInFolder(currentDirectory);

  spinner.succeed();

  logTodos(todos);

  if (todos.length) {
    process.exit(1);
  }
}

await main();
