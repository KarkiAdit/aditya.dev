import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  heroIntroLeadMutedClauseProfileTypography,
  heroIntroLeadTypography,
  heroIntroMutedClauseInk,
  primaryCtaInteractiveClassName,
} from "@/lib/link-styles";
import { siteChromeGutters, siteChromeInner } from "@/lib/site-chrome";
import { cn } from "@/lib/utils";

const heroSectionViewportFrame =
  "relative isolate box-border aspect-video min-h-[65vh] w-screen max-w-[100vw] shrink-0 overflow-x-clip overflow-y-hidden";

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

type HeroSectionIntroCopyProps = {
  className?: string;
  /** `section` uses tighter vertical spacing for reuse beside imagery (no hero-only rhythm). */
  variant?: "hero" | "section";
};

function HeroSectionIntroCopy({ className, variant = "hero" }: HeroSectionIntroCopyProps) {
  const isHero = variant === "hero";

  return (
    <div
      className={cn(
        "flex w-full flex-col text-left",
        isHero ? "gap-3 max-md:items-stretch sm:gap-4 md:gap-6" : "gap-3 items-stretch",
        className,
      )}
    >
      {isHero ? (
        <p className={cn("text-pretty max-md:block max-md:w-full max-md:min-w-0 max-md:self-stretch", heroIntroLeadTypography)}>
          <span className={heroIntroMutedClauseInk}>Humans, </span>
          <span className="text-primary">Aditya&apos;s here.</span>
          <span className={heroIntroMutedClauseInk}>
            {
              " My Yang flows as a Software Engineer, Yin as a Spiritual Thinker, bridging the two as a Writer."
            }
          </span>
        </p>
      ) : (
        <p
          className={cn(
            "m-0 block w-full min-w-0 max-w-none self-stretch p-0 text-pretty",
            heroIntroLeadMutedClauseProfileTypography,
          )}
        >
          If the &apos;Self&apos;—the Atman—is just a mixed-tape of old associations, then why keep spinning your
          wheels chasing a ghost of independence?
        </p>
      )}
      <Button
        variant="default"
        size="lg"
        className={cn(
          primaryCtaInteractiveClassName,
          "h-auto min-h-9 w-fit max-w-full rounded-full px-4 py-2 text-sm font-semibold sm:min-h-10 sm:px-4 sm:py-2 sm:text-base",
          isHero &&
            "mt-1 max-md:w-full max-md:max-w-none max-md:self-stretch max-md:min-w-0 max-md:shrink md:mt-2 md:w-fit md:min-h-11 md:px-5 md:py-2.5 md:text-lg lg:text-xl",
          !isHero && "mt-1 w-full max-w-none self-stretch min-w-0 shrink",
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
                  <div
                    className={cn(
                      "pointer-events-auto absolute top-1/2 z-[1] flex w-full min-w-0 -translate-y-1/2 flex-col justify-center",
                      "max-md:inset-x-0 max-md:max-w-none max-md:translate-x-0",
                      "max-w-full md:left-[40%] md:w-[60%] md:-translate-x-1/2",
                      "max-h-[min(100%,calc(100%-1rem))] overflow-y-auto",
                    )}
                  >
                    <div className={cn(siteChromeGutters, "w-full max-md:max-w-none")}>
                      <HeroSectionIntroCopy />
                    </div>
                  </div>
                  <div className="pointer-events-auto absolute bottom-0 left-0 z-0 flex min-h-[80%] w-full items-end justify-end p-0 max-md:hidden md:inset-y-0 md:left-1/2 md:right-0 md:h-auto md:w-auto">
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
                  <div className={cn(siteChromeGutters, "w-full")}>
                    <div className={cn(siteChromeInner, "w-full")}>
                      <HeroSectionIntroCopy />
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
              <HeroSectionVideoPlaceholder />
            </div>
          </div>
        </>
      )}
    </section>
  );
}
