import path from "node:path";

import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "astro/zod";

const contentRoot = path.resolve(process.cwd(), "content");

const blog = defineCollection({
  loader: glob({ pattern: "**/*.mdx", base: path.join(contentRoot, "blog") }),
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    summary: z.string(),
    tags: z.array(z.string()).optional(),
  }),
});

const projects = defineCollection({
  loader: glob({ pattern: "**/*.mdx", base: path.join(contentRoot, "projects") }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    date: z.coerce.date(),
  }),
});

export const collections = { blog, projects };
