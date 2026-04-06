# aditya.dev

Personal portfolio site: Next.js, MDX content via Velite, and a light, typography-forward UI.

## Stack

- [Next.js 16](https://nextjs.org) (App Router, React Server Components)
- [TypeScript](https://www.typescriptlang.org) (strict)
- [Tailwind CSS v4](https://tailwindcss.com)
- [shadcn/ui](https://ui.shadcn.com) (Radix, Luma preset)
- [Velite](https://velite.js.org) for blog and project MDX
- [Framer Motion](https://www.framer.com/motion/) for motion
- Typography: [Manrope](https://fonts.google.com/specimen/Manrope) via `next/font`

## Prerequisites

- Node.js 20+ (recommended)

## Scripts

| Command        | Description                                      |
| -------------- | ------------------------------------------------ |
| `npm run dev`  | Velite in watch mode + Next dev (Turbopack)      |
| `npm run build`| Velite build, then production Next build         |
| `npm run start`| Production server (after `build`)               |
| `npm run lint` | ESLint                                           |

## Environment

For correct canonical URLs and Open Graph `metadataBase` in production, set:

```bash
NEXT_PUBLIC_SITE_URL=https://aditya.dev
```

On Vercel, `VERCEL_URL` is used as a fallback when this is unset.

## Project layout

| Path                 | Role                                      |
| -------------------- | ----------------------------------------- |
| `src/app/`           | Routes, layout, global styles             |
| `src/components/`    | UI, layout, sections, blog, projects      |
| `src/lib/`           | Utilities, shared metadata                |
| `content/blog/`      | Blog MDX                                  |
| `content/projects/`  | Project MDX                                 |
| `.velite/`           | Generated types and data (gitignored)     |

Content is imported from the Velite output, for example: `import { posts, projects } from ".velite"`.

## Deploy

The app is intended for [Vercel](https://vercel.com). Connect the repo, set `NEXT_PUBLIC_SITE_URL` to your live domain, and deploy.
