# Astro migration plan

Date: 2026-08-23

## Outcome and constraints

Replace Next.js and Content Collections with a statically generated Astro site in one change. There is no fallback, feature flag, compatibility layer, or period in which both frameworks ship. The change is complete only when the externally observable site contract described below passes against the Next baseline through Wrangler.

The migration must:

- preserve every public URL, Cloudflare redirect/status behavior, sitemap entry and date policy, custom 404, rendered content, SEO values, styling, responsive layout, internal/external links, and interactive behavior as closely as practical;
- keep the source Markdown and MDX behavior, including GFM tables, external-link attributes, and the timetable's `ArrowRight` component;
- keep `pnpm dev`, production builds, local Cloudflare preview, and the deployment workflow working;
- keep TypeScript on major 6 and `packageManager` exactly `pnpm@11.7.0`;
- allow Astro's generated HTML structure, bundle names, and optimized image paths to differ; and
- remove Next.js, the current Content Collections pipeline, unused React code, and temporary migration tooling in the same change.

This is a migration plan only. It does not authorize implementation or deployment.

## Measured Next baseline

The baseline was captured from clean commit `03c5914` on 2026-08-23. The checked-out branch was `migrate-astro` (at the same commit as `main` and `origin/main`), despite the handoff saying the worktree would be on `main`.

### Build and output

`pnpm build` completed successfully with Next.js 16.2.10, generated 15 content documents in three collections, and prerendered 18 pages. The command ran with the pinned pnpm 11.7.0. The local runtime was Node 24.15.0 rather than the required Node 26 and emitted an engine warning, so implementation verification must be repeated under `.nvmrc`/Node 26 in CI or locally.

The public HTML routes are:

| Kind                | Canonical public paths                                                                                                                         |
| ------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------- |
| Fixed pages         | `/`, `/news`, `/programme-timetable`                                                                                                           |
| Group pages         | `/coffee-rhapsody`, `/dc4eb`, `/lala-land`, `/十方漫談`, `/午後的布村`, `/客座新潮流`, `/星期日早晨`, `/經典一刻`                              |
| News pages          | `/news/2015-10-28-chinese-new-year`, `/news/2021-02-03-yes-i-do`, `/news/2025-08-14-singing-contest`, `/news/2025-11-15-singing-contest-final` |
| Generated resources | `/sitemap.xml`, `/404.html`                                                                                                                    |

Next also emits `/_not-found.html` plus React Server Component `.txt` artifacts. These are framework artifacts, not public contracts. Astro should emit `404.html` from `src/pages/404.astro` and must not recreate `/_not-found.html`.

The export was approximately 51 MiB: 44 MiB of public assets, 6.2 MiB under `/_next`, and 490,659 bytes across the 17 emitted HTML files including both 404 variants. Size is diagnostic only; Astro output is not expected to be byte-identical.

### SEO and sitemap contract

The canonical site origin used by the application is `https://www.radio4ebchinese.org`. The current HTML does **not** emit `<link rel="canonical">`, Open Graph tags, or Twitter card tags; adding them would be an SEO enhancement and is outside parity scope.

| Surface                           | Observed contract                                                  |
| --------------------------------- | ------------------------------------------------------------------ |
| Root title                        | `昆士蘭華語廣播協會 \| Radio 4EB Chinese Group`                    |
| Page title                        | `<content title> \| 昆士蘭華語廣播協會 \| Radio 4EB Chinese Group` |
| Description on every page and 404 | `一個熟悉的聲音, 帶點感性, 絕對流行, Sharing the world with you.`  |
| Document language                 | `en`                                                               |
| Favicon                           | `/favicon-32x32.png`, `sizes="any"`                                |
| Sitemap origin                    | `https://www.radio4ebchinese.org`                                  |

The generated sitemap contains 14 URLs: the root, all eight groups, `/news`, and all four news articles. It intentionally omits `/programme-timetable`. Root, group, and news-index `lastmod` values are the build timestamp. News `lastmod` values come from the content date normalized to UTC. Preserve that set and date policy unless an explicit SEO change is approved; do not silently add the timetable merely because it is a public page. The current XML writes Chinese slugs as Unicode text.

### Content, links, assets, and presentation

- All global navigation and footer group links come from the group collection. Preserve collection order unless a deliberate ordering rule is introduced.
- Home and news cards use `allNews.toReversed()`; preserve the current source-derived reverse order and the Luxon output `LLLL dd, yyyy` (for example, `August 14, 2025`). Do not replace it with locale-sensitive defaults without a text comparison.
- The public asset namespace is `/assets/*` plus `/favicon-32x32.png`. Source references are root-relative. Every emitted internal `href`, `src`, and gallery full-size image target must resolve after migration.
- External content links currently open in a new tab and receive `rel="noopener noreferrer"` through `ContentRenderer`. Preserve both attributes. The header listen-live link and timetable link have the same contract.
- The responsive desktop navigation, DaisyUI hover dropdown, checkbox-driven mobile drawer, footer, hero overlays, news cards, prose/table styling, and image grids are part of visual parity.
- Gallery thumbnails link to their original image and use `[data-fancybox="gallery"]`. Fancybox is bound per gallery container with `Carousel.infinite: false`; opening, navigation, closing, keyboard controls, and focus behavior are parity requirements.
- `next/font/google` currently self-hosts Noto Sans SC and Noto Sans Mono and exposes `--font-noto-sans-sc` and `--font-noto-sans-mono`, which Tailwind maps to `font-sans` and `font-mono`. Preserve those variables, `display: swap`, effective weights/subsets, and fallback behavior.

### Wrangler URL and header contract

The measured `wrangler dev` configuration serves `out` with `html_handling: "auto-trailing-slash"` and `not_found_handling: "404-page"`:

| Request shape                                     | Observed result                         |
| ------------------------------------------------- | --------------------------------------- |
| `/`, `/news`, a news article, encoded `/十方漫談` | `200`                                   |
| `/index.html`                                     | `307` to `/`                            |
| `/news/`, `/news.html`                            | `307` to `/news`                        |
| Article path with `/` or `.html`                  | `307` to the extensionless article path |
| Encoded Chinese group path with `/` or `.html`    | `307` to the encoded extensionless path |
| `/missing`, `/missing/`, `/missing.html`          | `404`, custom 404 body, no redirect     |
| `/sitemap.xml`                                    | `200`                                   |
| `/404.html`                                       | `307` to `/404`                         |

No repository redirect rules were found. The production apex-to-`www` redirect described in the README is external Cloudflare/DNS configuration and must remain in place, but it cannot be verified from this worktree.

`public/_headers` currently gives `/_next/static/*` `Cache-Control: public,max-age=31536000,immutable`. The Astro build must change only the matcher to `/_astro/*` and verify the header against a real emitted asset. Wrangler parsed one valid header rule in the baseline.

Browser automation was unavailable during this planning pass. The implementation must therefore capture desktop and mobile screenshots and exercise the navigation, drawer, timetable link, and Fancybox interactions before replacing Next; curl/status checks alone are insufficient.

## Target architecture and mapping

Use Astro-native components and scripts throughout. This site has no interaction that justifies retaining React: the drawer/dropdown are CSS/HTML and Fancybox has a native browser API. Avoid `@astrojs/react`, React islands, and hydration unless implementation proves an observable behavior cannot otherwise be preserved.

| Current seam                                            | Astro target                                     | Notes                                                                                                                                                                                                                                                 |
| ------------------------------------------------------- | ------------------------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `next.config.ts`                                        | `astro.config.mjs`                               | Set `site`, `output: "static"`, `outDir: "./out"`, MDX integration, Tailwind Vite plugin, and GFM. Choose file-format output only after Wrangler parity tests confirm the measured redirect contract.                                                 |
| `content-collections.ts`                                | `src/content.config.ts`                          | Define `news`, `groups`, and `pages` with `astro:content`, `glob()` loaders covering `**/*.{md,mdx}`, and equivalent Zod schemas/defaults. Preserve frontmatter `slug` as the route authority; do not rely on filename-derived IDs for Chinese paths. |
| `src/app/layout.tsx`                                    | `src/layouts/BaseLayout.astro`                   | Own document metadata, font variables, global CSS, header, generated group navigation, footer, mobile drawer, and current-year rendering.                                                                                                             |
| `src/app/page.tsx`                                      | `src/pages/index.astro`                          | Load the `index` page and reversed news entries; compose the hero, rendered content, and cards.                                                                                                                                                       |
| `src/app/news/page.tsx`                                 | `src/pages/news/index.astro`                     | Load the `news` page and preserve title/hero/cards.                                                                                                                                                                                                   |
| `src/app/news/[slug]/page.tsx`                          | `src/pages/news/[slug].astro`                    | Use `getStaticPaths()` from news frontmatter slugs, pass the entry as props, render content/gallery, and preserve date text.                                                                                                                          |
| `src/app/[slug]/page.tsx`                               | `src/pages/[slug].astro`                         | Use `getStaticPaths()` from group frontmatter slugs, including all five Chinese slugs.                                                                                                                                                                |
| `src/app/programme-timetable/page.tsx`                  | `src/pages/programme-timetable.astro`            | Render the MDX entry with its `ArrowRight` component map.                                                                                                                                                                                             |
| `src/app/sitemap.ts`                                    | `src/pages/sitemap.xml.ts`                       | Generate the exact current 14-URL set and `lastmod` policy. A custom endpoint is simpler and safer than adopting an integration that changes inclusion/date behavior.                                                                                 |
| `src/app/not-found.tsx`                                 | `src/pages/404.astro`                            | Preserve visible 404 copy/link and shared metadata; emit only `404.html`.                                                                                                                                                                             |
| `HeroWithImage.tsx`, `NewsCard.tsx`, `ImageGallery.tsx` | `.astro` components                              | Use native `<img>` initially because current images are public root-relative assets and byte-identical image paths are not required. If Astro image optimization is chosen, compare dimensions, crop, loading, and layout shift.                      |
| `Fancybox.tsx`                                          | `Fancybox.astro` or gallery-local script         | Import Fancybox CSS and bind each container in a small module script with `Carousel.infinite: false`; handle multiple containers without a global `querySelector` assumption.                                                                         |
| `ContentRenderer.tsx`/`safe-mdx`                        | Astro content `render()`                         | Render collection entries directly and map `a` plus named MDX components through `<Content components={...} />`. Remove only after representative Markdown and MDX output passes comparison.                                                          |
| `lucide-react` icons                                    | Astro/native SVG icons                           | Preserve the Play, Menu, and ArrowRight SVG appearance without retaining React solely for three static icons; share ArrowRight where it is used twice.                                                                                                |
| `globals.css`/PostCSS                                   | Astro-loaded global CSS plus `@tailwindcss/vite` | Retain Tailwind 4, typography, DaisyUI pastel theme tokens, nested prose image rule, and all current utility classes. Remove PostCSS config if Vite fully replaces it.                                                                                |

### Markdown and MDX decision

Use Astro's native collection rendering and `@astrojs/mdx`; remove `safe-mdx` after parity is demonstrated. Configure GFM once through Astro (`markdown.gfm: true`, or `gfm: true` on a custom unified processor). Astro's processor already installs `remark-gfm`; do not add a direct `remark-gfm` dependency.

The migration must test rather than assume equivalence:

1. Render at least one plain Markdown page, one news entry with links/images, one group with a gallery, and `programme-timetable.mdx` in both builds.
2. Compare headings, paragraphs, raw HTML, escaped characters, table structure/alignment, external-link target/rel attributes, image references, and visible text.
3. Supply `ArrowRight` to `<Content components={{ ArrowRight }}>` using an Astro/native SVG component and verify the timetable button's DOM, styles, icon, and outbound link.
4. Implement the current content-link policy as an Astro component mapping for `a`. Confirm that relative/root links are not forced into new tabs and protocol-relative/HTTP(S) links are.
5. Only then delete `ContentRenderer.tsx`, `safe-mdx`, and its parsing path.

### Fonts, dates, styling, and client behavior

- Prefer Astro's Fonts API with a Fontsource/local provider if the pinned Astro release exposes it as stable. Otherwise import `@fontsource-variable/noto-sans-sc` and `@fontsource-variable/noto-sans-mono` in the base layout. Both approaches self-host; choose one, not both. Preserve the existing CSS variable names and compare computed `font-family`, loaded weights, Chinese glyph coverage, layout wrapping, and `font-display: swap` on representative pages.
- Luxon is unnecessary if `Intl.DateTimeFormat` can reproduce the four observed English month/day/year strings under Node 26 and the browser-independent static build. Use an explicit locale and UTC/time-zone policy, verify all four outputs, then remove Luxon and `@types/luxon`. Retain Luxon only if the native formatter cannot reproduce them exactly.
- Keep Tailwind 4, `@tailwindcss/typography`, and DaisyUI. Move Tailwind from the PostCSS plugin to `@tailwindcss/vite`, retain the CSS theme verbatim, and run the real build so class extraction covers `.astro` and MDX sources.
- Implement Fancybox as a small Astro module script, not an island. Bind relative to every rendered gallery container, preserve the non-infinite carousel option, and avoid closing unrelated galleries during page lifecycle.
- Use native links and images. Preserve `target`, `rel`, `alt`, intrinsic dimensions/aspect ratios, object-fit behavior, and hero/card/gallery classes. Generated asset/image filenames may change.

## Local development, CI, and deployment

Update scripts without changing their outcomes:

| Command/workflow         | Astro outcome                                                                                                                                                                                                                                                  |
| ------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `pnpm dev`               | Start Astro's development server and render every route/content type, including Chinese slugs and timetable MDX.                                                                                                                                               |
| `pnpm build`             | Run `astro check` and `astro build`; fail on type/content/render errors and emit `out`.                                                                                                                                                                        |
| `pnpm start`             | Decide explicitly whether to preserve its current meaning (`wrangler dev`) or align it with the reference's Astro dev server. Prefer leaving it as Wrangler preview because `pnpm dev` already owns framework development and changing `start` is unnecessary. |
| `pnpm cf:build`          | Delegate to `pnpm build` rather than duplicate the Astro command.                                                                                                                                                                                              |
| `pnpm cf:preview`        | Build, then run `wrangler dev` against `out`.                                                                                                                                                                                                                  |
| `pnpm cf:deploy`         | Build, then run `wrangler deploy` with the existing Cloudflare credentials.                                                                                                                                                                                    |
| `pnpm lint`              | Keep Oxc linting, remove the Next plugin/rules, and verify the resulting configuration actually checks supported Astro/TS/JS files.                                                                                                                            |
| `pnpm fmt` / `fmt:check` | Keep Oxfmt and include `.astro`, Markdown, MDX, JSON, CSS, TS, and JS files. Format only touched files during implementation.                                                                                                                                  |

Keep all current deployment workflow outcomes as separate gates: frozen install, lint, format check, build, and Wrangler deploy. Do not collapse lint/format into an implicit build step. Retain `.nvmrc` at Node 26, `pnpm/action-setup`, `actions/setup-node` caching, production environment/secrets, concurrency behavior, and the exact `pnpm@11.7.0` package-manager pin. Keep TypeScript on major 6 after Next is removed because that is an explicit repository constraint, not merely a Next constraint.

Keep `wrangler.jsonc`'s worker name, compatibility date, `out` directory, `auto-trailing-slash`, and `404-page` settings unchanged unless measured parity proves a build-format adjustment is required. Update README setup/deployment wording from Next export to Astro static build without changing the operational commands.

## One-change implementation and verification sequence

The work should remain one reviewable branch and one production cutover. Intermediate commits are acceptable for review, but the merge result must never contain both deployable frameworks.

1. **Capture the baseline.** Under Node 26, build Next and save a temporary machine-readable contract containing public route/status/redirect results, titles/descriptions/language/favicon, sitemap URLs/dates, visible main text, internal `href`/`src`/`srcset` targets, selected DOM structure, asset/header checks, and screenshots. Exercise desktop/mobile navigation and each gallery behavior. Include encoded and decoded Chinese request inputs.
2. **Install the minimum Astro toolchain.** Add pinned Astro, `@astrojs/mdx`, `@astrojs/check`, `@tailwindcss/vite`, and the selected self-hosted font packages/provider. Do not add `@astrojs/react` unless a failed native implementation establishes a need. Do not add `remark-gfm`.
3. **Define configuration and content.** Add `astro.config.mjs`, `src/content.config.ts`, environment typings if required, and the shared content access/sorting needed by two or more routes. Preserve source content files and frontmatter; avoid a second compatibility model.
4. **Port the shared shell and presentational components.** Build the base layout, global navigation/footer, hero, cards, image gallery/Fancybox script, static icons, fonts, and existing CSS/theme in Astro.
5. **Port all routes in one pass.** Implement fixed pages, group/news `getStaticPaths()`, timetable MDX component mapping, exact sitemap endpoint, and `404.astro`. Ensure Chinese `params` use the frontmatter slug and are encoded only by URL generation/request handling, not pre-encoded in content data.
6. **Adapt tooling and Cloudflare.** Change package scripts, TypeScript/Oxc configuration, README, workflow implementation, and `public/_headers` to `/_astro/*`. Keep `out` and Wrangler routing settings.
7. **Run static parity checks.** Build both outputs and compare the baseline contract. Investigate every missing/extra route, broken internal target, changed title/description/sitemap date, content mismatch, or missing asset. HTML and image bundle paths may differ.
8. **Run Wrangler parity checks.** Test all canonical routes plus `/`, `.html`, trailing-slash, missing, sitemap, 404, and encoded/decoded Chinese variants. Assert status and `Location`, custom 404 body, immutable `/_astro` caching, and normal asset content types.
9. **Run browser parity checks.** At representative desktop and mobile widths compare home, news, one Latin group, one Chinese group, timetable, one news article, and 404 screenshots. Exercise header/footer links, hover dropdown, drawer open/close, external links, every gallery's open/next/previous/keyboard/close behavior, and verify no console or network errors.
10. **Run all normal gates.** `pnpm install --frozen-lockfile`, `pnpm lint`, `pnpm fmt:check`, `pnpm build`, `pnpm dev` smoke tests, `pnpm cf:preview`, and a non-production Wrangler deployment/preview URL when available. Confirm Node 26, TypeScript 6, and pnpm 11.7.0.
11. **Delete obsolete and temporary artifacts before merge.** Remove `src/app/**`, superseded `.tsx` components, `next.config.ts`, `next-env.d.ts`, `content-collections.ts`, generated `.content-collections` assumptions, Next/Content Collections/safe-mdx/React/Luxon dependencies that are no longer used, Next-specific Oxc rules, PostCSS configuration if unused, `/_next` header rules, stale ignore entries, and all baseline snapshots/comparison scripts/planning scratch files. Rebuild from a clean checkout and rerun the normal gates after deletion.
12. **Cut over once.** Review the complete diff, deploy the Astro-only output, repeat the route/SEO/interaction smoke checks against the deployed URL, and retain the existing apex-to-`www` Cloudflare redirect. There is no runtime rollback path in the code; operational rollback is a normal redeploy/revert of the prior commit if required.

Temporary parity tooling should follow the ycfreeman.com precedent: it exists only while validating the migration and is removed once the Astro output passes. Do not leave a permanent snapshot or migration verifier unless the project adopts it as an ongoing regression check for a separately justified need.

## Definition of done

The migration is done when all of the following are true:

- every canonical route listed above returns the expected content and `200` through Wrangler, including all Chinese slugs in encoded and decoded test forms;
- slash and `.html` variants produce the same `307` destinations, missing variants produce the custom `404` body/status, `/sitemap.xml` matches the 14-entry URL/date policy, and no unexpected redirect appears;
- titles, description, `lang`, favicon, headings, prose, tables, dates, link attributes, images, navigation/footer items, and visible content match the baseline semantically;
- desktop/mobile layout, Noto font variables and rendering, Tailwind/DaisyUI styling, drawer/dropdown behavior, and Fancybox interactions are visibly equivalent and accessible;
- all internal links and assets resolve, external links retain their target/rel behavior, `/_astro/*` is cached immutably, and there are no browser console/network errors;
- `pnpm dev`, frozen install, lint, formatting, `pnpm build`, Wrangler preview, and the existing deployment workflow all succeed on Node 26 with TypeScript 6 and pnpm 11.7.0;
- the deployed static assets still use the existing Cloudflare worker/domain behavior, including the externally managed apex-to-`www` redirect; and
- the repository contains Astro only: no Next.js, migration compatibility layer, `safe-mdx`, unused React runtime, `/_not-found.html` generator, or temporary migration artifacts remain.

Parity means equivalent externally observable behavior, not byte-identical HTML, identical hydration payloads, or identical generated image/bundle paths.

## Primary references

- [ycfreeman.com PR #42](https://github.com/ycfreeman/ycfreeman.com/pull/42), especially migration commit [`9e78b17`](https://github.com/ycfreeman/ycfreeman.com/commit/9e78b172837ff2494de4b354c8131dc253a7c311), cleanup commit [`6569ca1`](https://github.com/ycfreeman/ycfreeman.com/commit/6569ca1d6e01144444493411f4a3e404c5b02781), and GFM/404 cleanup commit [`8045f14`](https://github.com/ycfreeman/ycfreeman.com/commit/8045f14d85b3b1932f0a3fb21587a5085cdb18ba)
- [Astro content collections](https://docs.astro.build/en/guides/content-collections/), [MDX integration and component mapping](https://docs.astro.build/en/guides/integrations-guide/mdx/), [static `getStaticPaths()`](https://docs.astro.build/en/reference/routing-reference/#getstaticpaths), [custom 404](https://docs.astro.build/en/basics/astro-pages/#custom-404-error-page), [Markdown GFM](https://docs.astro.build/en/reference/configuration-reference/#markdowngfm), [build format](https://docs.astro.build/en/reference/configuration-reference/#buildformat), and [fonts](https://docs.astro.build/en/guides/fonts/)
- [Cloudflare static-site assets and custom 404s](https://developers.cloudflare.com/workers/static-assets/routing/static-site-generation/) and [Wrangler asset configuration](https://developers.cloudflare.com/workers/wrangler/configuration/#assets)
