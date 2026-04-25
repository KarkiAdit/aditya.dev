/**
 * Books highlighted in the Projects page Career section.
 * Add a matching raster under `src/assets/images/current-focus-books/{id}.jpg` (or .png)
 * to show an optimized cover; otherwise a typographic placeholder renders.
 *
 * `id` must match the image filename stem (e.g. `ai-engineering-book-cover.jpg`).
 */
export type CurrentFocusBook = {
  readonly id: string;
  readonly title: string;
  readonly author: string;
  readonly href: string;
};

export type CurrentFocusBookCard = CurrentFocusBook & {
  readonly cover: { readonly src: string; readonly width: number; readonly height: number } | null;
};

export const CURRENT_FOCUS_BOOKS: readonly CurrentFocusBook[] = [
  {
    id: "untethered-soul-book-cover",
    title: "The Untethered Soul",
    author: "Michael A. Singer",
    href: "https://www.amazon.com/Untethered-Soul-Journey-Beyond-Yourself/dp/1572245379",
  },
  {
    id: "steve-jobs-book-cover",
    title: "Steve Jobs",
    author: "Walter Isaacson",
    href: "https://a.co/d/0iZ46tVg",
  },
  {
    id: "the-third-door-book-cover",
    title: "The Third Door",
    author: "Alex Banayan",
    href: "https://a.co/d/0aKMtxb5",
  },
];
