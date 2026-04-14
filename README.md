# aditya.dev

Personal portfolio: Astro 6, React for shadcn, Tailwind v4, and MDX in **`content/`**.

## Stack

- [Astro 6](https://astro.build) (static `dist/` output)
- [React 19](https://react.dev) + [shadcn/ui](https://ui.shadcn.com) (Radix Luma)
- [Tailwind CSS v4](https://tailwindcss.com) via `@tailwindcss/vite`
- [Astro Content Collections](https://docs.astro.build/en/guides/content-collections/) + `@astrojs/mdx`

## Scripts

| Command           | Description                 |
| ----------------- | --------------------------- |
| `npm run dev`     | Astro dev server            |
| `npm run build`   | Production build → `dist/` |
| `npm run preview` | Preview the production build |
| `npm run lint`    | ESLint                      |

## Cloudflare Pages

1. Connect this repository in the Cloudflare dashboard.
2. **Build command:** `npm run build`
3. **Build output directory:** `dist`
4. **Root directory:** `/` (repository root)
5. **Environment variables (production):** set `PUBLIC_SITE_URL` to your live site URL (e.g. `https://adityakarki.com.np`) for canonical URLs and the sitemap.

Preview deployments use **`CF_PAGES_URL`** automatically when `PUBLIC_SITE_URL` is not set (`src/lib/metadata.ts`).

Optional social link overrides: `PUBLIC_SOCIAL_X`, `PUBLIC_SOCIAL_LINKEDIN`, `PUBLIC_SOCIAL_MEDIUM`.

## Layout

| Path                    | Role                                                                 |
| ----------------------- | -------------------------------------------------------------------- |
| `src/pages/`            | Routes                                                               |
| `src/layouts/`        | Shell + shared layout                                                |
| `src/components/`     | UI                                                                   |
| `src/content.config.ts` | Content collections → `content/blog`, `content/projects`          |
| `public/`               | Static files (e.g. hero **video**); optimized stills in `src/assets/` |

SEO meta: `src/components/SEO.astro` (used from `BaseLayout.astro`). Pass `ogImage` from a page when you have an absolute preview URL (`src/pages/index.astro`).

## Prerequisites

- Node.js 20+
