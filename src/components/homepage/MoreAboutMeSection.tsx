"use client";

import { useCallback, useState, type CSSProperties, type ReactNode } from "react";
import { motion, useReducedMotion } from "framer-motion";

import { SophisticationReadMoreOverlay } from "@/components/homepage/SophisticationReadMoreOverlay";
import { Button } from "@/components/ui/button";
import { careerCreamControlStyle, careerCreamControlSurfaceDisabled } from "@/lib/career-roadmap";
import { memoryLaneNoteBodyTypography, primaryCtaInteractiveClassName } from "@/lib/link-styles";
import { siteChromeGutters, siteChromeInner } from "@/lib/site-chrome";
import { cn } from "@/lib/utils";

/** One URL per polaroid; order matches `MORE_ABOUT_ME_MEMORY_LABELS` and `noteBodies`. */
export type MoreAboutMeMemoryImages = readonly [
  string,
  string,
  string,
  string,
  string,
  string,
  string,
];

export type MoreAboutMeMemoryBodies = MoreAboutMeMemoryImages;

export type MoreAboutMeSectionProps = {
  noteImageSrcs: MoreAboutMeMemoryImages;
  notionHrefs: MoreAboutMeMemoryImages;
  noteBodies: MoreAboutMeMemoryBodies;
  className?: string;
};

const notionCtaLayoutClassName = cn(
  "mt-1 inline-flex h-auto min-h-9 w-full max-w-full min-w-0 shrink self-stretch items-center justify-center rounded-full px-4 py-2 text-sm font-semibold sm:w-fit sm:self-start sm:min-h-10 sm:px-4 sm:py-2 sm:text-base",
);

const notionCtaEnabledClassName = cn(notionCtaLayoutClassName, primaryCtaInteractiveClassName);

function ClipboardMeroInfoElement({
  noteIdx,
  notionHref,
  body,
  reduceMotion,
}: {
  noteIdx: number;
  notionHref: string;
  body: string;
  reduceMotion: boolean | null;
}) {
  const trimmed = notionHref.trim();
  const hasNotion = trimmed.length > 0;

  return (
    <div className="flex w-full flex-col gap-3 items-stretch">
      <motion.div
        key={noteIdx}
        className="w-full"
        initial={reduceMotion ? false : { opacity: 0.88, y: 5 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 420, damping: 34 }}
      >
        <p
          className={cn(
            "m-0 block w-full min-w-0 max-w-none self-stretch p-0 text-pretty text-left",
            memoryLaneNoteBodyTypography,
          )}
        >
          {body}
        </p>
      </motion.div>
      <div className="flex w-full justify-start">
        {hasNotion ? (
          <Button variant="default" size="lg" className={notionCtaEnabledClassName} asChild>
            <a href={trimmed} target="_blank" rel="noopener noreferrer">
              Read more on Notion →
            </a>
          </Button>
        ) : (
          <button
            type="button"
            disabled
            className={cn(notionCtaLayoutClassName, "min-h-10 sm:min-h-10", careerCreamControlSurfaceDisabled)}
            style={careerCreamControlStyle as CSSProperties}
          >
            Notion page coming soon
          </button>
        )}
      </div>
    </div>
  );
}

const MORE_ABOUT_ME_MEMORY_LABELS = [
  "Hometown",
  "Margins",
  "Miles",
  "Reps",
  "Stillness",
  "Avenue",
  "Fog bank",
] as const;

type ClipboardMemoriesElementProps = {
  noteIdx: number;
  noteImageSrcs: MoreAboutMeMemoryImages;
  notionHrefs: MoreAboutMeMemoryImages;
  reduceMotion: boolean | null;
  onGoNext: () => void;
  onGoPrev: () => void;
  onKeyDown: (e: { key: string; preventDefault: () => void }) => void;
  deckAriaLabel: string;
};

function ClipboardMemoriesElement({
  noteIdx,
  noteImageSrcs,
  notionHrefs,
  reduceMotion,
  onGoNext,
  onGoPrev,
  onKeyDown,
  deckAriaLabel,
}: ClipboardMemoriesElementProps) {
  return (
    <div className="relative w-full min-w-0">
      <div
        className={cn(
          "relative z-[1] pt-0 outline-none",
          "focus-visible:rounded-lg focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
        )}
        role="region"
        tabIndex={0}
        aria-label={deckAriaLabel}
        onKeyDown={onKeyDown}
      >
        <motion.div
          key={noteIdx}
          className="mx-auto w-full max-w-[min(24rem,min(92vw,100%))] cursor-grab touch-pan-y pb-2 active:cursor-grabbing md:mx-0 md:max-w-[min(28rem,44vw)]"
          drag={reduceMotion ? false : "x"}
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={0.78}
          onDragEnd={(_, info) => {
            if (reduceMotion) return;
            const t = 56;
            const v = info.velocity.x;
            if (info.offset.x < -t || v < -380) {
              onGoNext();
            } else if (info.offset.x > t || v > 380) {
              onGoPrev();
            }
          }}
          initial={reduceMotion ? false : { opacity: 0.92, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: "spring", stiffness: 420, damping: 32 }}
        >
          <ClipboardMemoriesPolaroidCard
            imageSrc={noteImageSrcs[noteIdx]}
            notionHref={notionHrefs[noteIdx]}
            label={MORE_ABOUT_ME_MEMORY_LABELS[noteIdx]}
          />
        </motion.div>
        <p className="pt-1 text-center text-xs font-semibold text-foreground-muted md:text-left">
          Swipe the photo left or right for another memory.
        </p>
      </div>
    </div>
  );
}

function ClipboardMemoriesPolaroidFrame({ className, children }: { className?: string; children: ReactNode }) {
  return (
    <div
      className={cn(
        "relative min-w-0 rounded-[3px] px-2 pb-2.5 pt-2 shadow-md sm:px-2.5 sm:pb-3 sm:pt-2.5 md:px-3 md:pb-3.5 md:pt-3",
        "bg-[oklch(0.97_0.018_52)] ring-1 ring-inset ring-foreground/10",
        className,
      )}
    >
      <div
        className="mx-auto mb-1.5 size-2.5 shrink-0 rounded-full border border-foreground/15 bg-background/40 shadow-[inset_0_1px_0_oklch(1_0_0/0.45)] sm:mb-2 sm:size-3"
        aria-hidden
      />
      {children}
    </div>
  );
}

function ClipboardMemoriesPolaroidCard({
  imageSrc,
  notionHref,
  label,
}: {
  imageSrc: string;
  notionHref: string;
  label: string;
}) {
  return (
    <article className="group relative min-w-0 w-full max-w-[min(24rem,min(92vw,100%))] origin-top md:max-w-[min(28rem,44vw)]">
      <ClipboardMemoriesPolaroidFrame className="h-full w-full">
        <div className="relative w-full overflow-hidden rounded-[1px] bg-muted/35 ring-1 ring-inset ring-foreground/5 sm:rounded-sm">
          <img
            src={imageSrc}
            alt=""
            className="aspect-[4/5] min-h-[min(52dvh,420px)] w-full object-cover object-center sm:min-h-[460px] md:min-h-[500px]"
            sizes="(max-width: 640px) 92vw, (max-width: 1024px) 44vw, 448px"
            decoding="async"
            loading="lazy"
            fetchPriority="low"
          />
          <div
            className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-transparent"
            aria-hidden
          />
          <div className="pointer-events-none absolute bottom-2 left-2 z-[2] rounded-full bg-background/90 px-2.5 py-1 text-[0.7rem] font-semibold tracking-wide text-primary shadow-sm ring-1 ring-border/25 sm:bottom-2.5 sm:left-2.5 sm:px-3 sm:text-xs md:text-[0.8125rem]">
            {label}
          </div>
          <SophisticationReadMoreOverlay notionHref={notionHref} pillSize="compact" />
        </div>
      </ClipboardMemoriesPolaroidFrame>
    </article>
  );
}

export function MoreAboutMeSection({ noteImageSrcs, notionHrefs, noteBodies, className }: MoreAboutMeSectionProps) {
  const reduceMotion = useReducedMotion();
  const noteCount = MORE_ABOUT_ME_MEMORY_LABELS.length;
  const [noteIdx, setNoteIdx] = useState(0);

  const goNextNote = useCallback(() => {
    setNoteIdx((i) => (i + 1) % noteCount);
  }, [noteCount]);

  const goPrevNote = useCallback(() => {
    setNoteIdx((i) => (i - 1 + noteCount) % noteCount);
  }, [noteCount]);

  const onNotesKeyDown = useCallback(
    (e: { key: string; preventDefault: () => void }) => {
      if (e.key === "ArrowRight" || e.key === " " || e.key === "Enter") {
        e.preventDefault();
        goNextNote();
      }
      if (e.key === "ArrowLeft") {
        e.preventDefault();
        goPrevNote();
      }
    },
    [goNextNote, goPrevNote],
  );

  return (
    <section
      id="more-about-me"
      className={cn(
        "w-full scroll-mt-[var(--navbar-height)] pb-0 pt-8 md:pt-12 lg:pt-14",
        className,
      )}
      aria-labelledby="more-about-me-eyebrow more-about-me-heading"
    >
      <p className="sr-only" aria-live="polite">
        {`Memory note ${MORE_ABOUT_ME_MEMORY_LABELS[noteIdx]}. Swipe the photo left or right to change the note.`}
      </p>
      <div className="relative w-full">
        <div className={cn(siteChromeGutters)}>
          <div className={cn(siteChromeInner, "flex flex-col gap-4 md:gap-5")}>
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
              <div className="flex w-full min-w-0 shrink-0 flex-col items-center justify-start py-0 md:min-h-0 md:max-w-[min(28rem,48%)] md:items-stretch md:flex-none md:basis-auto md:py-0 lg:max-w-[min(30rem,46%)]">
                <ClipboardMemoriesElement
                  noteIdx={noteIdx}
                  noteImageSrcs={noteImageSrcs}
                  notionHrefs={notionHrefs}
                  reduceMotion={reduceMotion}
                  onGoNext={goNextNote}
                  onGoPrev={goPrevNote}
                  onKeyDown={onNotesKeyDown}
                  deckAriaLabel={`Polaroid for ${MORE_ABOUT_ME_MEMORY_LABELS[noteIdx]}. Swipe the photo left or right, or use arrow keys when this area is focused.`}
                />
              </div>

              <div className="flex w-full min-w-0 max-w-none shrink-0 flex-col items-stretch justify-start self-stretch py-0 text-left md:min-h-0 md:min-w-0 md:justify-center md:py-0 md:flex-1 md:basis-0">
                <div className="w-full max-w-none md:shrink-0">
                  <ClipboardMeroInfoElement
                    noteIdx={noteIdx}
                    notionHref={notionHrefs[noteIdx]}
                    body={noteBodies[noteIdx]}
                    reduceMotion={reduceMotion}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
