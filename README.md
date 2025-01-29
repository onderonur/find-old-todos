# find-old-todos

**`find-old-todos`** is a CLI tool for JavaScript and TypeScript projects that searches for `TODO` comments older than a specified number of days.

## Installation & Usage

You can run the tool directly with your preferred package manager:

```
# Using npm
npx find-old-todos@latest --days 90

# Using Yarn
yarn dlx find-old-todos@latest --days 90

# Using pnpm
pnpm dlx find-old-todos@latest --days 90
```

## CLI Arguments

| Name     | Description                                     | Type   | Default |
| -------- | ----------------------------------------------- | ------ | ------- |
| `--days` | The age threshold (in days) to flag old `TODO`s | number | `30`    |
