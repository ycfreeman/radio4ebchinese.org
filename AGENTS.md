# Repository Agent Instructions

## Dependency updates

- Keep TypeScript on major version 6. Do not upgrade `typescript` to version 7 unless compatibility is explicitly reviewed and approved.
- Keep the package manager pinned to exactly `pnpm@12.14.0` because the GitHub Actions workflows depend on that version. pnpm 12 needs `pnpm/action-setup@v6.1.0` or later; the floating `v6` tag points at an older release. Do not upgrade pnpm unless the workflows are updated and verified at the same time.
