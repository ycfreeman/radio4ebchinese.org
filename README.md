## Getting Started

Run the development server:

```bash
nvm use
corepack enable
pnpm install
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Contents

Content is driven by this lib - https://github.com/sdorra/content-collections

basically a bunch of `.md`/`.mdx` files in different folders

## Deployment

The site is built for Cloudflare Workers with
[`@opennextjs/cloudflare`](https://opennext.js.org/cloudflare/) and deployed
with Wrangler.

### Local Cloudflare preview

```bash
pnpm cf:preview
```

This builds the Next.js app, converts it to a Cloudflare Worker, and starts a
local Workers runtime.

### Manual deployment

Authenticate Wrangler with `pnpm wrangler login`, then run:

```bash
pnpm cf:deploy
```

The first deployment uses the generated `workers.dev` URL. Verify that URL
before attaching `www.radio4ebchinese.org` as a Cloudflare Worker Custom
Domain. Keep the apex-domain redirect to `https://www.radio4ebchinese.org`
when moving DNS from Vercel.

### GitHub Actions deployment

Pushes to `main` run [`.github/workflows/deploy-cloudflare.yml`](.github/workflows/deploy-cloudflare.yml).
The workflow can also be started manually from GitHub Actions.

Configure these secrets in the repository's `production` environment:

- `CLOUDFLARE_ACCOUNT_ID`: the target Cloudflare account ID
- `CLOUDFLARE_API_TOKEN`: a token scoped to that account with Workers edit
  access

Do not commit Cloudflare credentials or local `.dev.vars` files.
