

# adityakarki.me

**Personal portfolio & writing — engineering, projects, and long-form thoughts.**

- [Site map](#site-map)
- [Stack](#stack)
- [Local development](#local-development)
- [Repository layout](#repository-layout)
- [Design system](#design-system)

## Site map


|              |                                                                                                                                 |
| ------------ | ------------------------------------------------------------------------------------------------------------------------------- |
| **Home**     | Stack hero, entrance splash, books / about, memory-lane polaroids, experience roadmap (stack scroll + motion on large screens). |
| **Projects** | Best-picks dashboard from MDX, project “niche” cards, tech chips, docs & setup, optional GitHub live snapshot.                  |
| **Thoughts** | Genre filter, featured hero per genre, MDX posts in `content/blog/`.                                                            |
| **Legal**    | Privacy & terms — domain text follows `PUBLIC_SITE_URL` / `siteUrl()`.                                                          |


Social links live in the **footer** (env-configured), not a separate contact page.

## Stack


| Layer       | Details                                                                                    |
| ----------- | ------------------------------------------------------------------------------------------ |
| **App**     | Astro **6** · static output · MDX via `@astrojs/mdx`                                       |
| **UI**      | React **19** islands · shadcn-style primitives (`src/components/ui/`)                      |
| **CSS**     | Tailwind **v4** · `@tailwindcss/vite` · tokens in `src/styles/theme.css` (`@theme inline`) |
| **Motion**  | Framer Motion · GSAP (homepage stack & career scene)                                       |
| **Content** | `astro:content` · `content.config.ts` · `content/blog` · `content/projects`                |
| **Ship**    | Cloudflare Pages → `dist/` · set `**PUBLIC_SITE_URL`** for canonical URLs & sitemap        |


## Local development

```bash
npm install
npm run dev      # http://localhost:4321
npm run build
npm run preview  # production build locally; add -- --host to share on LAN
```

Configure a `**.env**` for local builds (see `**src/env.d.ts**`): `PUBLIC_SITE_URL`, `PUBLIC_GITHUB_LOGIN`, optional `GITHUB_TOKEN`, social URLs, etc. Mirror the same vars in **Cloudflare → Environment variables** for production.

## Repository layout

```
content/blog/          # Thoughts (MDX)
content/projects/      # Project panels (MDX)
public/                # Static assets, images
src/
  components/          # homepage · thoughts · projects · layout · ui
  layouts/
  lib/                 # metadata, navigation, GitHub fetch, stack helpers
  pages/               # routes (index, projects, thoughts, [slug], legal)
  styles/              # globals.css, theme.css
astro.config.mjs
content.config.ts
```

Content is **only** wired through Astro’s content layer (no Next.js / Velite / monorepo packages).

## Design system


| Token        | Implementation                                                                                                                                                         |
| ------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Type**     | **Manrope** — UI & headings. **Source Serif 4** — editorial serif (e.g. MDX blockquotes).                                                                              |
| **Color**    | **OKLCH** in `theme.css`: warm cream **background**, orange **heading** / **primary**, muted neutral body, glass **card** surfaces, dedicated **nav rail** icon steps. |
| **Tailwind** | Semantic colors mapped with `--color-`* from CSS variables.                                                                                                            |
| **Layout**   | Glass **left rail** (`--sidebar-width`); main column inset on `lg+`, full width under the rail on small screens.                                                       |
| **Depth**    | Homepage **frosted stack** panels + **fixed radial** body wash (`globals.css`) for a single cohesive “canvas”.                                                         |
| **Spacing**  | Shared rhythm in `src/lib/site-page-layout.ts` and related layout tokens.                                                                                              |


