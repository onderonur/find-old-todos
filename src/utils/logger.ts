import picocolors from 'picocolors';
import type { Todo } from '../types';
import { args } from './args';
import { dayjs } from './dayjs';

export function logTodos(todos: Todo[]) {
  if (!todos.length) {
    console.log(
      picocolors.greenBright(
        `🎉 No TODO comments found (older than ${args.days} days).`,
      ),
    );
    return;
  }

  console.log(
    picocolors.underline(
      picocolors.yellowBright(`TODO comments (older than ${args.days} days):`),
    ),
  );

  const now = dayjs();
  let content = '';

  let maxDateLength = 0;
  const contentLengthLimit = 40;
  let maxContentLength = 0;

  const formattedTodos = todos.map((todo) => {
    const committedAt = dayjs(todo.committedAt);

    const formattedTodo = {
      date: `${committedAt.format('YYYY-MM-DD')} (${committedAt.from(now, true)})`,
      linePath: `${todo.filePath}:${todo.lineNumber}`,
      content:
        todo.lineContent.length > contentLengthLimit
          ? `${todo.lineContent.slice(0, contentLengthLimit - 3)}...`
          : todo.lineContent,
    };

    if (formattedTodo.date.length > maxDateLength) {
      maxDateLength = formattedTodo.date.length;
    }

    if (formattedTodo.content.length > maxContentLength) {
      maxContentLength = formattedTodo.content.length;
    }

    return formattedTodo;
  });

  formattedTodos.forEach((todo, i) => {
    content += '- ';
    content += picocolors.yellowBright(todo.date.padEnd(maxDateLength + 1));
    content += picocolors.greenBright(
      todo.content.padEnd(maxContentLength + 1),
    );
    content += picocolors.blueBright(todo.linePath);

    const isLastTodo = i === formattedTodos.length - 1;
    if (!isLastTodo) {
      content += '\n';
    }
  });

  console.log(content);
}
