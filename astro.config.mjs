import mdx from "@astrojs/mdx";
import react from "@astrojs/react";
import sitemap from "@astrojs/sitemap";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "astro/config";

const site =
  typeof process.env.PUBLIC_SITE_URL === "string" && process.env.PUBLIC_SITE_URL.trim().length > 0
    ? process.env.PUBLIC_SITE_URL.replace(/\/$/, "")
    : "https://adityakarki.me";

export default defineConfig({
  site,
  integrations: [react(), mdx(), sitemap()],
  output: "static",
  vite: {
    plugins: [tailwindcss()],
  },
});
