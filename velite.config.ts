import { defineConfig, defineCollection, s } from "velite"

const posts = defineCollection({
  name: "Post",
  pattern: "blog/*.mdx",
  schema: s.object({
    title:   s.string(),
    date:    s.isodate(),
    summary: s.string(),
    tags:    s.array(s.string()).optional(),
    slug:    s.path(),
  }),
})

const projects = defineCollection({
  name: "Project",
  pattern: "projects/*.mdx",
  schema: s.object({
    title:       s.string(),
    description: s.string(),
    date:        s.isodate(),
    slug:        s.path(),
  }),
})

export default defineConfig({
  root: "content",
  collections: { posts, projects },
})