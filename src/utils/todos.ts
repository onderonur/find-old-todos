import path from 'node:path';
import type { Todo } from '../types';
import { getAllFilePaths, getFileAST, SUPPORTED_FILE_EXTENSIONS } from './fs';
import { getGitBlameInfo, isOldCommit } from './git';
import { spinner } from './spinner';

async function findFileComments(filePath: string) {
  const ast = await getFileAST(filePath);
  return ast?.comments ?? [];
}

async function findTodosInFile(filePath: string) {
  const fileExtension = path.extname(filePath);

  if (!SUPPORTED_FILE_EXTENSIONS.includes(fileExtension)) return [];

  const comments = await findFileComments(filePath);

  const todos: Todo[] = [];

  for (const comment of comments) {
    const lineContent = comment.value.trim();

    if (!lineContent.toUpperCase().startsWith('TODO')) continue;

    const lineNumber = comment.loc.start.line;

    if (!lineNumber) continue;

    const gitInfo = getGitBlameInfo({ filePath, lineNumber });

    const committedAt = gitInfo?.committedAt;

    if (!committedAt || !isOldCommit(committedAt)) continue;

    todos.push({
      filePath,
      lineNumber,
      lineContent,
      committedAt,
    });
  }

  return todos;
}

export async function findTodosInFolder(folderPath: string) {
  const filePaths = await getAllFilePaths(folderPath);

  let searchFileCount = 0;

  const todos: Todo[] = [];

  for (const filePath of filePaths) {
    const todosInFile = await findTodosInFile(filePath);
    searchFileCount++;
    spinner.text = `Searched files: ${searchFileCount}/${filePaths.length}`;
    todos.push(...todosInFile);
  }

  return todos;
}
