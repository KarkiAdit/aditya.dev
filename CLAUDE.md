# Project: aditya.dev — Personal Portfolio

## Stack
- Next.js 16 App Router (SSR, server components by default)
- TypeScript (strict mode)
- Tailwind CSS v4
- shadcn/ui (Radix, Luma preset)
- Velite for MDX content (blogs + projects)
- Framer Motion for animations
- Vercel for deployment

## Design Philosophy
- **Unified Color Palette:** Every token shares the warm hue range (20-80 in oklch), ensuring visual harmony where nothing feels foreign.
- **Hierarchy via Lightness & Chroma:** Variation is achieved solely through lightness and chroma rather than competing hue families, maintaining a coherent visual language.
- **Frame-based UI:** Cards act as frames rather than distinct surfaces, allowing them to blend seamlessly into the background.
- **Material & Atmosphere:** A "Frosted White Glass" aesthetic applied to a soft gradient canvas creates an airy, clean, Apple-inspired interface where light bleeds through blurs.

## Project structure
- `src/app/` — App Router pages (`/`, `/thoughts`, `/projects`)
- `src/components/ui/` — shadcn primitives, never modify directly
- `src/components/layout/` — Navbar, Footer
- `src/components/homepage/` — Hero, Background, Career Roadmap, Life Philosophy
- `src/components/thoughts/` — Blog index, Spiritual thoughts sections
- `src/components/projects/` — Project dashboard, GitHub API integration, Skill visualization
- `src/lib/` — Utilities, fonts, metadata helpers
- `src/hooks/` — Custom React hooks
- `src/types/` — Global TypeScript types
- `src/styles/` — Global CSS styles and typography
- `content/blog/` — MDX blog posts (General + Spiritual)
- `content/projects/` — MDX project metadata

## Content
- Blog/Spiritual posts live in `content/blog/*.mdx` (Use frontmatter `category: 'spiritual' | 'blog'` to differentiate)
- Projects data logic lives in `content/projects/*.mdx` or fetched via GitHub API
- Velite processes MDX and outputs typed collections to `.velite/`
- Import content using: `import { posts, projects } from ".velite"`

## Coding conventions
- Always use server components unless interactivity requires `"use client"`
- Use `clsx` and `tailwind-merge` via the `cn()` utility in `src/lib/utils.ts`
- All new components go in the appropriate `src/components/` subfolder
- Keep pages thin — logic and UI live in components, not in `app/` files
- Use TypeScript strictly, no `any` types
- Prefer named exports for components, default export only for pages

## Styling
- Tailwind utility classes only, no inline styles, no CSS modules
- Follow the existing shadcn/ui component patterns
- Animations via Framer Motion, not CSS keyframes
- Light theme only for MVP

## SEO
- Every page must export a `generateMetadata()` function
- Use the shared metadata config from `src/lib/metadata.ts`
- Images served from GCS via Cloudflare CDN at `cdn.yoursite.com`

## Do not
- Do not install new npm packages without asking first
- Do not modify files inside `src/components/ui/` directly
- Do not use `any` in TypeScript
- Do not add database dependencies — content is file-based via Velite
- Do not use the `pages/` router, everything is App Router