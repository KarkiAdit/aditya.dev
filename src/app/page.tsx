import type { Metadata } from "next";

import { siteConfig } from "@/lib/metadata";

export function generateMetadata(): Metadata {
  return {
    title: siteConfig.title,
    description: siteConfig.description,
    alternates: {
      canonical: "/",
    },
    openGraph: {
      url: "/",
      title: siteConfig.title,
      description: siteConfig.description,
    },
  };
}

export default function Home() {
  return null;
}
