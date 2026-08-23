## Getting Started

Run the development server:

```bash
nvm use
corepack enable
pnpm install
pnpm dev
```

Open [http://localhost:4321](http://localhost:4321) with your browser to see the result.

## Contents

Content is stored in Astro content collections under `src/content` as `.md` and
`.mdx` files.

## Deployment

The site is exported as static HTML and deployed to Cloudflare Static Assets
with Wrangler. There is no user Worker entrypoint, so requests are served
directly from the exported `out/` directory.

### Local Cloudflare preview

```bash
pnpm cf:preview
```

This builds the Astro site and starts a local Cloudflare static-assets preview.

### Manual deployment

Authenticate Wrangler with `pnpm wrangler login`, then run:

```bash
pnpm cf:deploy
```

The first deployment uses the generated `workers.dev` URL. Verify that URL
before attaching `www.radio4ebchinese.org` as a Cloudflare Custom Domain. Keep
the apex-domain redirect to `https://www.radio4ebchinese.org` when moving DNS.

### GitHub Actions deployment

Pushes to `main` run [`.github/workflows/deploy-cloudflare.yml`](.github/workflows/deploy-cloudflare.yml).
The workflow can also be started manually from GitHub Actions.

Configure these secrets in the repository's `production` environment:

- `CLOUDFLARE_ACCOUNT_ID`: the target Cloudflare account ID
- `CLOUDFLARE_API_TOKEN`: a token scoped to that account with Workers edit
  access

Do not commit Cloudflare credentials or local `.dev.vars` files.
