# Repository Agent Instructions

## Dependency updates

- Keep TypeScript on major version 6. Do not upgrade `typescript` to version 7 unless compatibility is explicitly reviewed and approved.
- Keep the package manager pinned to exactly `pnpm@12.14.0` because the GitHub Actions workflows depend on that version. pnpm 12 needs `pnpm/action-setup@v6.1.0` or later; the floating `v6` tag points at an older release. Do not upgrade pnpm unless the workflows are updated and verified at the same time. The pin lives in both `package.json` `packageManager` and `mise.toml`; change them together.
- The Node major is pinned in `.nvmrc` (read by CI through `setup-node`), `mise.toml` (local) and `package.json` `engines`; change all 3 together.

## Monthly package audit

Run a package audit once per calendar month. At the start of a session, check for this month's audit with `gh issue list --search "Package audit: YYYY-MM in:title" --state all`. If none exists, tell the user the audit is due before other work.

The audit is a GitHub issue titled `Package audit: YYYY-MM` that reports findings only; upgrades land in separate PRs. It covers:

- outdated npm packages, with breaking-change notes from each package's release notes for major bumps
- `pnpm audit` vulnerabilities
- every GitHub Actions `uses:` ref in `.github/workflows/` against its latest release, including whether a floating major tag such as `@v6` still points at an older release (`git ls-remote --tags`), and the Node runtime each action declares
- the Node and pnpm toolchain pins, including whether the TypeScript and pnpm pins above can now be lifted, tested on a scratch copy of the repo
- unused dependencies
