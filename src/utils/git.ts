import { execSync } from 'node:child_process';
import { args } from './args';

export function isInsideGitRepository() {
  try {
    execSync('git rev-parse --is-inside-work-tree', { stdio: 'ignore' });
    return true;
  } catch {
    return false;
  }
}

export function getGitBlameInfo({
  filePath,
  lineNumber,
}: {
  filePath: string;
  lineNumber: number;
}) {
  try {
    const blameOutput = execSync(
      `git blame -L ${lineNumber},${lineNumber} --line-porcelain ${filePath}`,
      {
        encoding: 'utf8',
        // To ignore errors but keep the output
        stdio: ['ignore', 'pipe', 'ignore'],
      },
    );

    const dateMatch = blameOutput.match(/^author-time (\d+)/m);

    if (!dateMatch?.[1]) return null;

    // Convert to milliseconds
    const timestamp = Number.parseInt(dateMatch[1], 10) * 1000;

    return { committedAt: new Date(timestamp) };
  } catch {
    return null;
  }
}

const daysInMilliseconds = args.days * 24 * 60 * 60 * 1000;

export function isOldCommit(commitDate: Date) {
  return Date.now() - commitDate.getTime() > daysInMilliseconds;
}

export function isPathIgnoredByGit(targetPath: string) {
  try {
    execSync(`git check-ignore ${targetPath}`, { stdio: 'ignore' });
    return true;
  } catch {
    return false;
  }
}
