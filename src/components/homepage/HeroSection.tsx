import type { ReactNode } from "react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  heroIntroLeadTypography,
  heroIntroMutedClauseInk,
  primaryCtaInteractiveClassName,
} from "@/lib/link-styles";
import { siteChromeGutters, siteChromeInner } from "@/lib/site-chrome";
import { cn } from "@/lib/utils";

const heroSectionViewportFrame =
  "relative isolate box-border h-[100vh] max-h-[100vh] w-screen max-w-[100vw] shrink-0 overflow-x-clip overflow-y-hidden";

const heroPortraitLane =
  "pointer-events-auto absolute inset-y-0 right-0 z-0 flex items-end justify-end max-md:hidden md:left-[40%]";

const heroPortraitImg =
  "h-full w-full max-w-full origin-bottom-right object-cover object-bottom object-right drop-shadow-md scale-[0.85]";

function HeroBodyChrome({ children }: { children: ReactNode }) {
  return (
    <div className={cn(siteChromeGutters, "w-full min-w-0")}>
      <div className={cn(siteChromeInner, "w-full min-w-0")}>{children}</div>
    </div>
  );
}

export type HeroSectionProps = {
  videoSrc?: string;
  posterSrc?: string;
  portraitSrc?: string;
  portraitAlt?: string;
  className?: string;
};

function HeroSectionVideoPlaceholder() {
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

function HeroSectionIntroCopy() {
  return (
    <div className="flex w-full flex-col gap-3 text-left max-md:items-stretch sm:gap-4 md:gap-6">
      <p className={cn("text-pretty max-md:block max-md:w-full max-md:min-w-0 max-md:self-stretch", heroIntroLeadTypography)}>
        <span className={heroIntroMutedClauseInk}>Humans, </span>
        <span className="text-primary">Aditya&apos;s here.</span>
        <span className={heroIntroMutedClauseInk}>
          {
            " My Yang flows as a Software Engineer, Yin as a Spiritual Thinker, bridging the two as a Writer."
          }
        </span>
      </p>
      <Button
        variant="default"
        size="lg"
        className={cn(
          primaryCtaInteractiveClassName,
          "h-auto min-h-9 w-fit max-w-full rounded-full px-4 py-2 text-sm font-semibold sm:min-h-10 sm:px-4 sm:py-2 sm:text-base",
          "mt-1 max-md:w-full max-md:max-w-none max-md:self-stretch max-md:min-w-0 max-md:shrink md:mt-2 md:w-fit md:min-h-11 md:px-5 md:py-2.5 md:text-lg lg:text-xl",
        )}
        asChild
      >
        <a href="/thoughts">{`Tao: think, build, repeat. Read more >`}</a>
      </Button>
    </div>
  );
}

export function HeroSection({ videoSrc, posterSrc, portraitSrc, portraitAlt = "", className }: HeroSectionProps) {
  return (
    <section
      aria-label="Hero section"
      className={cn(heroSectionViewportFrame, className)}
    >
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
          <div className="pointer-events-none absolute inset-0 z-[3] h-full min-h-0">
            <div className="relative h-full min-h-0 w-full">
              {portraitSrc ? (
                <>
                  <div className="pointer-events-none absolute inset-0 z-[1] flex min-h-0 items-center">
                    <HeroBodyChrome>
                      <div className="pointer-events-auto relative z-[2] max-h-[min(100%,calc(100%-1rem))] min-w-0 w-full overflow-y-auto md:max-w-[min(55vw,100%)]">
                        <HeroSectionIntroCopy />
                      </div>
                    </HeroBodyChrome>
                  </div>
                  <div className={heroPortraitLane}>
                    <img
                      src={portraitSrc}
                      alt={portraitAlt}
                      className={heroPortraitImg}
                      decoding="async"
                      fetchPriority="high"
                    />
                  </div>
                </>
              ) : (
                <div className="pointer-events-auto absolute inset-0 flex items-center justify-center pt-[var(--navbar-height)]">
                  <HeroBodyChrome>
                    <HeroSectionIntroCopy />
                  </HeroBodyChrome>
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
              <HeroSectionVideoPlaceholder />
            </div>
          </div>
        </>
      )}
    </section>
  );
}
