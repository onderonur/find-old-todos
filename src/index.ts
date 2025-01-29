import type { Todo } from './types';
import { doesPathExist } from './utils/fs';
import { isInsideGitRepository } from './utils/git';
import { logTodos } from './utils/logger';
import { spinner } from './utils/spinner';
import { findTodosInFolder } from './utils/todos';

const searchFolders = ['./'];

async function main() {
  spinner.start();

  if (!isInsideGitRepository()) {
    spinner.fail();
    console.error('🤷 Current directory is not a Git repository.');
    return;
  }

  const todos: Todo[] = [];

  for (const folder of searchFolders) {
    const doesExist = await doesPathExist(folder);
    if (!doesExist) continue;
    const todosInFolder = await findTodosInFolder(folder);
    todos.push(...todosInFolder);
  }

  spinner.succeed();

  logTodos(todos);
}

// eslint-disable-next-line @typescript-eslint/no-floating-promises, unicorn/prefer-top-level-await
main();
