// TODO: ESLint shows warning here. Will fix later.
// eslint-disable-next-line import/no-unresolved
import { parse } from '@typescript-eslint/typescript-estree';
import fs from 'node:fs/promises';
import path from 'node:path';
import { isPathIgnoredByGit } from './git';

const JSX_ALLOWED_FILE_EXTENSIONS = ['.js', '.jsx', '.cjs', '.mjs', '.tsx'];

const NON_JSX_ALLOWED_FILE_EXTENSIONS = ['.ts'];

export const SUPPORTED_FILE_EXTENSIONS = [
  ...JSX_ALLOWED_FILE_EXTENSIONS,
  ...NON_JSX_ALLOWED_FILE_EXTENSIONS,
];

function isPathIgnored(targetPath: string) {
  const pathParts = targetPath.split(path.sep);

  if (
    pathParts.some(
      (part) =>
        // Normally, `node_modules` should be ignored by git by adding it in `.gitignore`.
        // But we also check it here to prevent searching its heavily nested file structure
        // in case of it is not added to `.gitignore` etc.
        part === 'node_modules' || part === '.git',
    )
  ) {
    return true;
  }

  return isPathIgnoredByGit(targetPath);
}

export async function getAllFilePaths(folderPath: string) {
  const filePaths: string[] = [];

  if (isPathIgnored(folderPath)) {
    return filePaths;
  }

  const items = await fs.readdir(folderPath);

  for (const item of items) {
    const itemPath = path.join(folderPath, item);
    const stats = await fs.stat(itemPath);

    if (stats.isDirectory()) {
      const nestedFilePaths = await getAllFilePaths(itemPath);
      filePaths.push(...nestedFilePaths);
      continue;
    }

    if (!stats.isFile()) continue;

    const fileExtension = path.extname(itemPath);

    if (!SUPPORTED_FILE_EXTENSIONS.includes(fileExtension)) continue;

    if (isPathIgnored(itemPath)) continue;

    filePaths.push(itemPath);
  }

  return filePaths;
}

export async function getFileAST(filePath: string) {
  const fileContent = await fs.readFile(filePath, 'utf8');
  const fileExtension = path.extname(filePath);

  try {
    const ast = parse(fileContent, {
      loc: true,
      comment: true,
      jsx: JSX_ALLOWED_FILE_EXTENSIONS.includes(fileExtension),
    });

    return ast;
  } catch (error) {
    console.error(`Failed to parse file: ${filePath}`, error);
  }
}
