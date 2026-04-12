import type { Metadata } from "next";

import { Hero } from "@/components/homepage/Hero";
import { Navbar } from "@/components/layout/Navbar";
import { publicAssets } from "@/lib/public-assets";
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
    <div className="relative isolate w-full">
      <Navbar variant="overlay" />
      <Hero
        videoSrc={publicAssets.hero.video}
        portraitSrc={publicAssets.hero.portrait}
        portraitAlt={`${siteConfig.author} — portrait`}
      />
    </div>
  );
}
