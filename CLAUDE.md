# Project: aditya.dev — Personal Portfolio

## Stack & Architecture
- **Framework:** Astro 6 (Static Build).
- **Deployment:** Optimized for Cloudflare Pages (`npm run build`).
- **Styling:** Tailwind CSS v4, shadcn/ui (Radix).
- **Motion:** Framer Motion (entrance splash, Experience, More About Me micro-interactions); GSAP + ScrollTrigger (`HomepageStackScroll`) for sticky stack panel intros on `/`.
- **TypeScript:** Strict mode (no `any`).

## Design Philosophy
- **Unified Color Palette:** Every token shares the warm hue range (20-80 in oklch), ensuring visual harmony where nothing feels foreign.
- **Hierarchy via Lightness & Chroma:** Variation is achieved solely through lightness and chroma rather than competing hue families, maintaining a coherent visual language.
- **Frame-based UI:** Cards act as frames rather than distinct surfaces, allowing them to blend seamlessly into the background.
- **Material & Atmosphere:** A "Frosted White Glass" aesthetic applied to a soft gradient canvas creates an airy, clean, Apple-inspired interface where light bleeds through blurs.
- **Vibe Coding Integration:** Codebase reflects a fluid, intuitive development process, balancing rapid AI-assisted iteration with structural engineering excellence.
- **Ethical HCI:** Interface design prioritizes transparent communication and respectful interaction, exploring the human-computer boundary.

## Project Structure
- `/src/pages/` — File-based routing (e.g., `index.astro`, `thoughts/[slug].astro`).
- `/src/layouts/` — Base layouts using `<slot />`.
- `/src/components/` — Feature folders (`homepage/`, `thoughts/`, `projects/`, `layout/`, `icons/`, `ui/`) plus shared pieces.
- `/src/components/additional/` — Cross-cutting `.astro`: `SEO`, `DataDashboard` (hub shell for thoughts/projects), `PlaceholderPageSection` (legal stubs).
- `/src/components/homepage/` — Index stack (`HomepageStackSections`, `HomepageStackScroll`, `StackHeroBanner`), `ExperienceSection`, `MoreAboutMeSection`, entrance splash, knowledge/polaroid blocks, overlays.
- `/src/lib/` — Shared utilities (`cn`, `metadata`, `navigation`, `site-chrome`, `site-page-layout`, GitHub helpers, etc.).
- `/src/lib/homepage/` — Homepage-only modules: stack layout hooks (`homepage-stack`, `homepage-stack-scroll`), entrance gate (`home-entrance`), hero banner assets (`hero-stack-banner`), polaroid surfaces (`polaroid-card`), motion presets (`homepage-motion`).
- `/src/styles/` — Global CSS (`theme.css`, `globals.css`).
- `/content/blog/` — MDX blog posts; hero images under `/public/blog/` (see `coverImage` paths).
- `/content/projects/` — MDX project metadata; rasters under `/public/projects/` (see `projects-public-images.ts`).
- `/public/icons/` — Favicons and apple touch icon (linked from `BaseLayout.astro`).
- `/src/content.config.ts` — Zod schemas linking to `/content/`.

## Content Layer
- **Storage:** `/content/` (MDX files managed via Git).
- **Definition:** Defined in `/src/content.config.ts` using Astro **Content Collections**.
- **Transformation:** Files are processed at build time via `glob` loaders; `zod` schemas strictly enforce frontmatter types.
- **Access:** Use `getCollection` or `getEntry` from `astro:content`.

## Coding Conventions
- **The Island Rule:** Default to `.astro` for structure. Use React (`.tsx`) + `client:*` directives only for interactive components.
- **Utility:** Use `cn()` from `src/lib/utils.ts`.
- **Strict Typing:** No `any`. Strict TypeScript mode.
- **Primitives:** Do not edit `src/components/ui/` in place; use shadcn CLI.
- **Data Fetching:** Component script `---` fences only. No `getServerSideProps` or RSC patterns.
- **Assets:** Use `astro:assets` for optimized images. Large hero media stays in `public/`.
- **Environment:** Use `PUBLIC_*` variables. Metadata helpers in `src/lib/metadata.ts` must handle `CF_PAGES_URL` fallback.

## Do Not
- Do not use `app/` router or Next.js patterns.
- Do not install new packages without explicit consultation.
- Do not add database-backed content.
- Do not modify shadcn primitives directly.