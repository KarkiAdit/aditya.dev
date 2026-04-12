import type { Metadata } from "next";
import { Fragment } from "react";

import { Hero } from "@/components/homepage/Hero";
import { HumbleBackgroundSection } from "@/components/homepage/HumbleBackgroundSection";
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
  const sections = [
    <Hero
      key="hero"
      videoSrc={publicAssets.hero.video}
      portraitSrc={publicAssets.hero.portrait}
      portraitAlt={`${siteConfig.author} — portrait`}
    />,
    <HumbleBackgroundSection key="humble" />,
  ] as const;

  /* Homepage stack: flex `gap` + trailing `pb` so section spacing is not lost to margin collapse. */
  return (
    <div className="relative isolate flex w-full flex-col gap-14 sm:gap-16 md:gap-20 pb-14 sm:pb-16 md:pb-20">
      <Navbar variant="overlay" />
      {sections.map((section) => (
        <Fragment key={section.key}>{section}</Fragment>
      ))}
    </div>
  );
}
