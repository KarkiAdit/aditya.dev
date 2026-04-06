# Project: aditya.dev — Personal Portfolio

## Stack
- Next.js 16 App Router (SSR, server components by default)
- TypeScript (strict mode)
- Tailwind CSS v4
- shadcn/ui (Radix, Luma preset)
- Velite for MDX content (blogs + projects)
- Framer Motion for animations
- Vercel for deployment

## Project structure
- `src/app/` — App Router pages and layouts
- `src/components/ui/` — shadcn primitives, never modify directly
- `src/components/layout/` — Navbar, Footer
- `src/components/sections/` — Homepage sections (Hero, About, etc.)
- `src/components/blog/` — Blog-specific components
- `src/components/projects/` — Project-specific components
- `src/components/career/` — Timeline, Contact
- `src/lib/` — Utilities, fonts, metadata helpers
- `src/hooks/` — Custom React hooks
- `src/types/` — Global TypeScript types
- `src/styles/` - Global CSS styles and typography
- `content/blog/` — MDX blog posts
- `content/projects/` — MDX project pages

## Content
- Blog posts live in `content/blog/*.mdx`
- Projects live in `content/projects/*.mdx`
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