/**
 * Shared Tailwind class list for MDX article bodies (blog posts, project extended notes).
 * Keeps typography aligned across `/thoughts/[slug]` and `/projects` MDX.
 */
export const mdxArticleBodyClass = [
  "thought-mdx thought-mdx-medium min-w-0 w-full max-w-none space-y-6 sm:space-y-7",
  "text-[1.125rem] font-normal leading-[1.65] tracking-[0.01em] text-foreground sm:text-[1.1875rem] sm:leading-[1.62]",
  "[&_a]:font-sans [&_a]:font-medium [&_a]:text-primary [&_a]:underline [&_a]:decoration-primary/45 [&_a]:underline-offset-2 [&_a]:transition-colors hover:[&_a]:text-primary/75",
  "[&_blockquote]:my-8 [&_blockquote]:border-l-2 [&_blockquote]:border-border [&_blockquote]:bg-transparent [&_blockquote]:py-1 [&_blockquote]:pl-5 [&_blockquote]:pr-2 [&_blockquote]:font-serif [&_blockquote]:text-[1.05rem] [&_blockquote]:italic [&_blockquote]:leading-relaxed [&_blockquote]:text-foreground-muted",
  "[&_code]:rounded-sm [&_code]:border [&_code]:border-border [&_code]:bg-secondary [&_code]:px-1.5 [&_code]:py-0.5 [&_code]:font-mono [&_code]:text-[0.88em] [&_code]:font-medium [&_code]:text-foreground",
  "[&_h2]:mt-12 [&_h2]:mb-3 [&_h2]:scroll-mt-28 [&_h2]:border-0 [&_h2]:pb-0 [&_h2]:font-sans [&_h2]:text-[1.5rem] [&_h2]:font-semibold [&_h2]:leading-snug [&_h2]:tracking-tight [&_h2]:text-heading sm:[&_h2]:mt-14 sm:[&_h2]:text-[1.625rem]",
  "[&_h3]:mt-9 [&_h3]:mb-2 [&_h3]:font-sans [&_h3]:text-xl [&_h3]:font-semibold [&_h3]:leading-snug [&_h3]:text-heading",
  "[&_h4]:mt-8 [&_h4]:mb-2 [&_h4]:font-sans [&_h4]:text-lg [&_h4]:font-semibold [&_h4]:leading-snug [&_h4]:text-heading",
  "[&_h5]:mt-6 [&_h5]:mb-2 [&_h5]:font-sans [&_h5]:text-base [&_h5]:font-semibold [&_h5]:text-heading",
  "[&_h6]:mt-6 [&_h6]:mb-1 [&_h6]:font-sans [&_h6]:text-base [&_h6]:font-medium [&_h6]:text-heading",
  "[&_hr]:my-10 [&_hr]:h-px [&_hr]:w-full [&_hr]:border-0 [&_hr]:bg-border",
  "[&_li]:marker:text-foreground-muted [&_li]:pl-1",
  "[&_ol]:list-decimal [&_ol]:space-y-2.5 [&_ol]:pl-6",
  "[&_p]:text-pretty",
  "[&_pre]:my-6 [&_pre]:overflow-x-auto [&_pre]:rounded-md [&_pre]:border [&_pre]:border-border [&_pre]:bg-secondary [&_pre]:p-4 [&_pre]:font-mono [&_pre]:text-sm [&_pre]:text-foreground",
  "[&_strong]:font-semibold [&_strong]:text-foreground",
  "[&_ul]:list-disc [&_ul]:space-y-2.5 [&_ul]:pl-6",
] as const;
