## Getting Started

Install [mise](https://mise.jdx.dev) and [activate it in your shell](https://mise.jdx.dev/getting-started.html#activate-mise) so the pinned Node and pnpm are on `PATH`. Then run the development server:

```bash
mise install
pnpm install
pnpm dev
```

Open [http://localhost:4321](http://localhost:4321) with your browser to see the result.

## Contents

Content is stored in Astro content collections under `src/content` as `.md` and
`.mdx` files.

## Deployment

The site is exported as static HTML and deployed to Cloudflare Workers static
assets with [SST](https://sst.dev), configured in [`sst.config.ts`](sst.config.ts).
SST stores its state in Cloudflare R2.

### Local preview

```bash
pnpm build
pnpm start
```

### Manual deployment

Set `CLOUDFLARE_API_TOKEN` and `CLOUDFLARE_DEFAULT_ACCOUNT_ID`, then run:

```bash
pnpm cf:deploy
```

Only the `production` stage attaches `www.radio4ebchinese.org` as a Cloudflare
Custom Domain and redirects the apex `radio4ebchinese.org` to it. Other stages,
such as `pnpm sst deploy --stage test`, are served from their generated
`workers.dev` URL.

### GitHub Actions deployment

Pushes to `main` run [`.github/workflows/deploy-cloudflare.yml`](.github/workflows/deploy-cloudflare.yml).
The workflow can also be started manually from GitHub Actions.

Configure these secrets in the repository's `production` environment:

- `CLOUDFLARE_ACCOUNT_ID`: the target Cloudflare account ID
- `CLOUDFLARE_API_TOKEN`: a token scoped to that account, created from the
  **Edit Cloudflare Workers** template plus _Zone - DNS - Edit_ and
  _Zone - Single Redirect - Edit_ for the `radio4ebchinese.org` zone

Do not commit Cloudflare credentials.
