"use client";

import { type ReactNode } from "react";
import { motion, useReducedMotion } from "framer-motion";

import { SophisticationReadMoreOverlay } from "@/components/homepage/SophisticationReadMoreOverlay";
import { homepageOverlaySpringTransition } from "@/lib/homepage/homepage-motion";
import {
  MEMORY_LANE_HOMEPAGE_POLAROID_COUNT,
  type MemoryLaneSevenStrings,
} from "@/lib/homepage/memory-lane-content";
import {
  polaroidCardArticleRootClassName,
  polaroidCardCoverImageHoverClassName,
  polaroidCardCoverImageSizes,
  polaroidCardFrameShellClassName,
  polaroidCardGridClassName,
  polaroidCardImageBottomGradientClassName,
  polaroidCardImageDarkScrimClassName,
  polaroidCardImageOverlaySlotClassName,
  polaroidCardImageWellClassName,
  polaroidCardPinClassName,
} from "@/lib/homepage/polaroid-card";
import { polaroidOverlayCaptionElementClassName } from "@/lib/link-styles";
import {
  pageStackSectionInnerTopPaddingClass,
  pageStackSectionIntroToBodyFlexGapClass,
} from "@/lib/site-page-layout";
import { siteChromeGutters, siteChromeInnerFullWidth } from "@/lib/site-chrome";
import { cn } from "@/lib/utils";

/** Compatibility alias — same tuple as {@link MemoryLaneSevenStrings}. */
export type MoreAboutMeMemoryImages = MemoryLaneSevenStrings;
export type MoreAboutMeMemoryBodies = MemoryLaneSevenStrings;

export type MoreAboutMeSectionProps = {
  noteImageSrcs: MemoryLaneSevenStrings;
  notionHrefs: MemoryLaneSevenStrings;
  noteBodies: MemoryLaneSevenStrings;
  className?: string;
};

function MemoryLanePolaroidCaption({ body, reduceMotion }: { body: string; reduceMotion: boolean | null }) {
  return (
    <div className="flex w-fit max-w-full flex-col items-center gap-2">
      <motion.div
        key={body}
        className="w-fit min-w-0 max-w-full"
        initial={reduceMotion ? false : { opacity: 0.88, y: 5 }}
        animate={{ opacity: 1, y: 0 }}
        transition={homepageOverlaySpringTransition}
      >
        <p className={polaroidOverlayCaptionElementClassName}>{body}</p>
      </motion.div>
    </div>
  );
}

function ClipboardMemoriesPolaroidFrame({ className, children }: { className?: string; children: ReactNode }) {
  return (
    <div className={cn(polaroidCardFrameShellClassName, className)}>
      <div className={polaroidCardPinClassName} aria-hidden />
      {children}
    </div>
  );
}

function ClipboardMemoriesPolaroidCard({
  imageSrc,
  notionHref,
  memoryCaption,
  reduceMotion,
}: {
  imageSrc: string;
  notionHref: string;
  memoryCaption: string;
  reduceMotion: boolean | null;
}) {
  return (
    <article className={polaroidCardArticleRootClassName}>
      <ClipboardMemoriesPolaroidFrame className="h-full w-full">
        <div className={polaroidCardImageWellClassName}>
          <img
            src={imageSrc}
            alt=""
            className={polaroidCardCoverImageHoverClassName}
            sizes={polaroidCardCoverImageSizes}
            decoding="async"
            loading="lazy"
            fetchPriority="low"
          />
          <div className={polaroidCardImageDarkScrimClassName} aria-hidden />
          <div className={polaroidCardImageBottomGradientClassName} aria-hidden />
          <div className={polaroidCardImageOverlaySlotClassName}>
            <MemoryLanePolaroidCaption body={memoryCaption} reduceMotion={reduceMotion} />
          </div>
          <SophisticationReadMoreOverlay notionHref={notionHref} pillSize="compact" />
        </div>
      </ClipboardMemoriesPolaroidFrame>
    </article>
  );
}

export function MoreAboutMeSection({ noteImageSrcs, notionHrefs, noteBodies, className }: MoreAboutMeSectionProps) {
  const reduceMotion = useReducedMotion();
  const cards = Array.from({ length: MEMORY_LANE_HOMEPAGE_POLAROID_COUNT }, (_, i) => ({
    imageSrc: noteImageSrcs[i],
    notionHref: notionHrefs[i],
    body: noteBodies[i],
  }));

  return (
    <div
      id="more-about-me"
      role="region"
      className={cn(
        "w-full scroll-mt-8 bg-transparent pb-0 pt-0",
        className,
      )}
      aria-labelledby="more-about-me-eyebrow more-about-me-heading"
    >
      <div className="relative w-full">
        <div className={cn(siteChromeGutters)}>
          <div
            className={cn(
              siteChromeInnerFullWidth,
              "flex flex-col",
              pageStackSectionIntroToBodyFlexGapClass,
              pageStackSectionInnerTopPaddingClass,
            )}
          >
            <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p
                  id="more-about-me-eyebrow"
                  className="text-xs font-semibold uppercase tracking-widest text-foreground-muted"
                >
                  More About Me
                </p>
                <h2
                  id="more-about-me-heading"
                  className="heading-gradient mt-2 text-balance text-3xl font-extrabold tracking-tighter sm:text-4xl md:text-5xl"
                >
                  Down the Memory Lane
                </h2>
              </div>
            </div>

            <div
              className={cn(
                "relative isolate z-[2] flex w-full max-w-none flex-col items-center justify-start gap-10 overflow-hidden rounded-xl pb-8 pt-3",
                "md:flex-row md:items-stretch md:justify-between md:gap-8 md:pb-10 md:pt-4 lg:gap-10 xl:gap-12",
              )}
            >
              <div className={polaroidCardGridClassName}>
                {cards.map((card) => (
                  <div key={card.imageSrc} className="relative min-w-0">
                    <ClipboardMemoriesPolaroidCard
                      imageSrc={card.imageSrc}
                      notionHref={card.notionHref}
                      memoryCaption={card.body}
                      reduceMotion={reduceMotion}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
