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
  return (
    <main className="flex flex-1 flex-col items-center justify-center px-6 py-24 text-center">
      <h1 className="text-3xl font-semibold tracking-tight text-foreground">
        {siteConfig.author}
      </h1>
      <p className="mt-3 max-w-md text-lg leading-8 text-muted-foreground">
        Software Engineer, Writer, and Spiritual Thinker
      </p>
    </main>
  );
}
