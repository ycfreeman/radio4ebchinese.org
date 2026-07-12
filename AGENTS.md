# Repository Agent Instructions

## Dependency updates

- Keep TypeScript on major version 6 because the project uses Next.js. Do not upgrade `typescript` to version 7 unless Next.js compatibility is explicitly reviewed and approved.
- Keep the package manager pinned to exactly `pnpm@11.7.0` because the GitHub Actions workflows depend on that version. Do not upgrade pnpm unless the workflows are updated and verified at the same time.
