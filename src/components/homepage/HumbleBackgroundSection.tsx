import Image from "next/image";

import { SophisticationReadMoreOverlay } from "@/components/homepage/SophisticationReadMoreOverlay";
import { headerMainNavBodyTypographyRoomy } from "@/lib/link-styles";
import { publicAssets } from "@/lib/public-assets";
import { siteChromeGutters, siteChromeInner } from "@/lib/site-chrome";
import { cn } from "@/lib/utils";

/** Paste your Notion URL when ready; until then “Read more” still shows on hover (button, no navigation). */
const NOTION_BEYOND_I_HREF = "";

const ABOUT_CARD_BODY =
  "Sophistication makes it easy to outpace your roots, but true self-sufficiency isn't about isolation—it's about shared space. If the 'Self' is just a bundle of associations, why chase independence for its own sake?";

/**
 * Second homepage band: **About** label + heading sit on the normal canvas; the sophistication
 * paragraph sits in a **bottom glass strip** (20% height, **full image width**) on the 16:9 still + wash.
 */
export function HumbleBackgroundSection({ className }: { className?: string }) {
  const backgroundSrc = publicAssets.about.backgroundImage;

  /** Slightly larger than header nav (`headerMainNavBodyTypographyRoomy`) for the full-width strip. */
  const stripBodyTypography = cn(headerMainNavBodyTypographyRoomy, "text-balance text-pretty text-center");

  const paragraph = (
    <p
      id="about-description"
      className={cn("relative z-0 min-h-0 w-full max-w-none text-center", stripBodyTypography)}
    >
      {ABOUT_CARD_BODY}
    </p>
  );

  const sophisticationStrip = (
    <div
      className={cn(
        "glass-lit absolute inset-x-0 bottom-0 z-[2] flex h-[20%] min-h-0 w-full items-center justify-center overflow-y-auto rounded-b-2xl rounded-t-xl px-2 py-2 sm:px-3 sm:py-3",
      )}
    >
      {paragraph}
    </div>
  );

  return (
    <section
      className={cn(
        "w-full scroll-mt-[var(--navbar-height)] pt-6 sm:pt-8 md:pt-10",
        className,
      )}
      aria-labelledby="about-heading"
      aria-describedby="about-description"
    >
      <div className={cn(siteChromeGutters, siteChromeInner)}>
        <p className="text-xs font-semibold uppercase tracking-widest text-foreground-muted">
          About
        </p>
        <h2
          id="about-heading"
          className="heading-gradient mt-3 max-w-4xl text-balance text-3xl font-extrabold tracking-tighter sm:mt-4 sm:text-4xl md:text-5xl"
        >
          Beyond the I Association
        </h2>

        <div
          className={cn(
            "group relative mt-8 aspect-video w-full overflow-hidden rounded-2xl ring-1 ring-border/25 sm:mt-10 md:mt-12",
          )}
        >
          <Image
            src={backgroundSrc}
            alt=""
            fill
            className="z-0 object-cover object-center"
            sizes="(max-width: 768px) 100vw, min(896px, 92vw)"
            priority={false}
          />
          <div className="hero-canvas-overlay z-[1]" aria-hidden />
          <div
            className="pointer-events-none absolute inset-0 z-[1] bg-black/45"
            aria-hidden
          />
          {sophisticationStrip}
          <SophisticationReadMoreOverlay notionHref={NOTION_BEYOND_I_HREF} />
        </div>
      </div>
    </section>
  );
}
