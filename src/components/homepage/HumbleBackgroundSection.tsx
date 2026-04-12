import { SophisticationReadMoreOverlay } from "@/components/homepage/SophisticationReadMoreOverlay";
import { headerMainNavBodyTypographyRoomy } from "@/lib/link-styles";
import { siteChromeGutters, siteChromeInner } from "@/lib/site-chrome";
import { cn } from "@/lib/utils";

const NOTION_BEYOND_I_HREF = "";

const ABOUT_CARD_BODY =
  "Sophistication makes it easy to outpace your roots, but true self-sufficiency isn't about isolation—it's about shared space. If the 'Self' is just a bundle of associations, why chase independence for its own sake?";

export type HumbleBackgroundSectionProps = {
  className?: string;
  backgroundImageSrc: string;
};

export function HumbleBackgroundSection({
  className,
  backgroundImageSrc,
}: HumbleBackgroundSectionProps) {
  const stripBodyTypography = cn(headerMainNavBodyTypographyRoomy, "text-balance text-pretty text-center");

  const paragraph = (
    <p
      id="about-description"
      className={cn(
        "relative z-0 min-h-0 w-full max-w-none text-center",
        stripBodyTypography,
        "text-background/80",
      )}
    >
      {ABOUT_CARD_BODY}
    </p>
  );

  const sophisticationStrip = (
    <div
      className={cn(
        "glass-lit absolute inset-x-0 bottom-0 z-[2] flex h-[20%] min-h-0 w-full items-center justify-center overflow-y-auto rounded-b-2xl rounded-t-xl px-2 py-2 [scrollbar-width:none] sm:px-3 sm:py-3 [&::-webkit-scrollbar]:hidden",
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
        <p className="text-xs font-semibold uppercase tracking-widest text-foreground-muted">About</p>
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
          <div className="absolute inset-0 z-0">
            <img
              src={backgroundImageSrc}
              alt=""
              className="h-full w-full object-cover object-center"
              decoding="async"
              loading="lazy"
              fetchPriority="low"
            />
          </div>
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
