import Link from "next/link";

import { Button } from "@/components/ui/button";
import { HeroEclipseOverlay } from "@/components/homepage/HeroEclipseOverlay";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { heroIntroLeadTypography, heroIntroMutedClauseInk } from "@/lib/link-styles";
import { siteChromeGutters, siteChromeInner } from "@/lib/site-chrome";
import { cn } from "@/lib/utils";

/**
 * Full viewport width; **16:9** (`aspect-video`) with at least **`65vh`** height.
 * On the home page the navbar is `absolute` in the same stacking context (`theme.css`).
 */
export const heroViewportFrame =
  "relative isolate box-border aspect-video min-h-[65vh] w-screen max-w-[100vw] shrink-0 overflow-x-clip overflow-y-hidden";

export type HeroProps = {
  /** Root-relative or absolute URL to a muted looping background video */
  videoSrc?: string;
  /** Optional still until the first frame decodes (see `publicAssets.hero` in `public-assets.ts`) */
  posterSrc?: string;
  /** Portrait on the right (~50% column), bottom-right anchored; intro is centered on x = 40% (10% left of the seam). */
  portraitSrc?: string;
  portraitAlt?: string;
  className?: string;
};

function HeroVideoPlaceholder() {
  return (
    <Card
      size="sm"
      className="glass-lit w-full max-w-md border-0 bg-card/45 text-card-foreground shadow-lg ring-1 ring-border/35 backdrop-blur-md"
    >
      <CardHeader className="gap-3">
        <CardTitle className="text-lg font-semibold text-primary">Hero video</CardTitle>
        <CardDescription className="text-sm text-foreground-muted">
          Add <span className="font-mono text-card-foreground">videoSrc</span> (see{" "}
          <span className="font-mono text-card-foreground">publicAssets.hero</span> in{" "}
          <span className="font-mono text-card-foreground">src/lib/public-assets.ts</span>).
        </CardDescription>
      </CardHeader>
    </Card>
  );
}

/** Lead line + CTA — fixed hero strapline + button. */
function HeroIntroCopy() {
  return (
    <div className="flex w-full flex-col gap-3 text-left sm:gap-4 md:gap-6">
      <p className={cn("text-pretty", heroIntroLeadTypography)}>
        <span className={heroIntroMutedClauseInk}>Humans, </span>
        <span className="text-primary">Aditya&apos;s here.</span>
        <span className={heroIntroMutedClauseInk}>
          {" My Yang flows as a Software Engineer, Yin as a Spiritual Thinker, bridging the two as a Writer."}
        </span>
      </p>
      <Button
        variant="default"
        size="lg"
        className="mt-1 h-auto min-h-9 w-fit max-w-full rounded-full px-4 py-2 text-sm font-semibold shadow-none transition-colors duration-200 hover:!bg-secondary hover:!text-secondary-foreground focus-visible:!bg-secondary focus-visible:!text-secondary-foreground active:!bg-secondary/80 active:!text-secondary-foreground sm:min-h-10 sm:px-4 sm:py-2 sm:text-base md:mt-2 md:min-h-11 md:px-5 md:py-2.5 md:text-lg lg:text-xl"
        asChild
      >
        <Link href="/thoughts">{`Tao: think, build, repeat. Read more >`}</Link>
      </Button>
    </div>
  );
}

/**
 * Full-bleed hero: `100vw` × **16:9** (min **65vh**); stack: **video** → **canvas wash** → **eclipse** → **copy + portrait**.
 */
export function Hero({ videoSrc, posterSrc, portraitSrc, portraitAlt = "", className }: HeroProps) {
  return (
    <section aria-label="Hero" className={cn(heroViewportFrame, className)}>
      {videoSrc ? (
        <>
          <video
            aria-hidden
            className="absolute inset-0 z-0 h-full w-full object-cover object-center"
            autoPlay
            loop
            muted
            playsInline
            preload="metadata"
            poster={posterSrc}
          >
            <source src={videoSrc} />
          </video>
          <div className="hero-canvas-overlay" aria-hidden />
          <HeroEclipseOverlay />
          <div className="pointer-events-none absolute inset-0 z-[3] h-full min-h-0">
            <div className="relative h-full min-h-0 w-full">
              {portraitSrc ? (
                <>
                  {/* Vertically centered in full hero (`top-1/2 -translate-y-1/2`); md: x at 40% = 10% left of portrait seam (50%). */}
                  <div
                    className={cn(
                      "pointer-events-auto absolute top-1/2 z-[1] flex w-[60%] min-w-0 max-w-full -translate-y-1/2 flex-col justify-center",
                      "max-md:left-1/2 max-md:-translate-x-1/2",
                      "md:left-[40%] md:-translate-x-1/2",
                      "max-h-[min(100%,calc(100%-1rem))] overflow-y-auto",
                    )}
                  >
                    <div className={cn(siteChromeGutters, "w-full")}>
                      <HeroIntroCopy />
                    </div>
                  </div>
                  {/* At least 80% of hero height: mobile `top-[20%]`; portrait bottom-right in its strip (`justify-end` + `object-right`). */}
                  <div className="pointer-events-auto absolute bottom-0 left-0 z-0 flex min-h-[80%] w-full items-end justify-end p-0 max-md:top-[20%] md:inset-y-0 md:left-1/2 md:right-0 md:h-auto md:w-auto">
                    {/* eslint-disable-next-line @next/next/no-img-element -- flush bottom-right; object-contain */}
                    <img
                      src={portraitSrc}
                      alt={portraitAlt}
                      className="h-full min-h-0 w-full max-w-full object-contain object-bottom object-right drop-shadow-md"
                      decoding="async"
                      fetchPriority="high"
                    />
                  </div>
                </>
              ) : (
                <div className="pointer-events-auto absolute inset-0 flex items-center justify-center pt-[var(--navbar-height)]">
                  <div className={cn(siteChromeGutters, "flex w-full justify-center")}>
                    <div className={cn(siteChromeInner, "flex justify-center")}>
                      <HeroIntroCopy />
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </>
      ) : (
        <>
          <div className="hero-canvas-overlay z-0" aria-hidden />
          <div className="pointer-events-none absolute inset-0 z-[1] flex flex-col items-center justify-center px-6 py-16 pt-[var(--navbar-height)]">
            <div className="pointer-events-auto w-full max-w-md">
              <HeroVideoPlaceholder />
            </div>
          </div>
        </>
      )}
    </section>
  );
}
