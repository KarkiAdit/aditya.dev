"use client";

import { useCallback, useEffect, useLayoutEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

import { Button } from "@/components/ui/button";
import {
  hasHomeEntranceDismissedToday,
  HOME_MAIN_GATE_ID,
  lockDocumentScroll,
  releaseHomeEntranceGate,
  setHomeEntranceDismissedUntilEndOfLocalDay,
} from "@/lib/home-entrance";
import { primaryCtaInteractiveClassName } from "@/lib/link-styles";
import { cn } from "@/lib/utils";

const THESIS_LEAD =
  "If the 'Self'—the Atman—is just a mixed-tape of old associations,";
const THESIS_TAIL = "then why keep spinning your wheels chasing a ghost of independence?";

function MeditationBreath() {
  const reduceMotion = useReducedMotion();

  if (reduceMotion) {
    return (
      <div
        className="relative mx-auto flex size-40 shrink-0 items-center justify-center md:size-48"
        aria-hidden
      >
        <div className="size-[70%] rounded-full border border-primary/40 bg-primary/10" />
        <div className="absolute size-[36%] rounded-full bg-primary/22 ring-1 ring-primary/38" />
      </div>
    );
  }

  const rings = [
    { insetClass: "inset-0", borderClass: "border-primary/28", duration: 5.2, delay: 0 },
    { insetClass: "inset-[12%]", borderClass: "border-primary/36", duration: 4.4, delay: 0.35 },
    { insetClass: "inset-[24%]", borderClass: "border-primary/44", duration: 3.8, delay: 0.7 },
  ] as const;

  return (
    <div
      className="relative mx-auto flex size-44 shrink-0 items-center justify-center md:size-52"
      aria-hidden
    >
      {rings.map((ring) => (
        <motion.div
          key={ring.insetClass}
          className={cn(
            "pointer-events-none absolute rounded-full border bg-primary/5 shadow-inner shadow-primary/18",
            ring.insetClass,
            ring.borderClass,
          )}
          animate={{
            scale: [1, 1.085, 1],
            opacity: [0.44, 0.76, 0.44],
          }}
          transition={{
            duration: ring.duration,
            repeat: Infinity,
            ease: "easeInOut",
            delay: ring.delay,
          }}
        />
      ))}
      <motion.div
        className="relative z-[1] size-[28%] rounded-full bg-gradient-to-br from-primary/42 via-primary/20 to-primary/10 shadow-inner ring-1 ring-inset ring-primary/48"
        animate={{
          scale: [1, 1.07, 1],
          opacity: [0.92, 1, 0.92],
        }}
        transition={{
          duration: 3.6,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
    </div>
  );
}

export function HomeEntranceSplash() {
  const [splashOpen, setSplashOpen] = useState(() => !hasHomeEntranceDismissedToday());
  const [entranceComplete, setEntranceComplete] = useState(() => hasHomeEntranceDismissedToday());
  const reduceMotion = useReducedMotion();

  const scrollLocked = !entranceComplete;

  useLayoutEffect(() => {
    if (!scrollLocked) return;
    return lockDocumentScroll();
  }, [scrollLocked]);

  useLayoutEffect(() => {
    if (entranceComplete) return;
    document.documentElement.setAttribute("data-home-entrance", "");
    const gate = document.getElementById(HOME_MAIN_GATE_ID);
    if (gate) gate.inert = true;
  }, [entranceComplete]);

  const close = useCallback(() => {
    setSplashOpen(false);
  }, []);

  useEffect(() => {
    if (!splashOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [splashOpen, close]);

  const handleExitComplete = useCallback(() => {
    setHomeEntranceDismissedUntilEndOfLocalDay();
    releaseHomeEntranceGate();
    setEntranceComplete(true);
  }, []);

  return (
    <AnimatePresence onExitComplete={handleExitComplete}>
      {splashOpen ? (
        <motion.div
          key="home-entrance-splash"
          role="dialog"
          aria-modal="true"
          aria-labelledby="home-entrance-thesis"
          className={cn(
            "fixed inset-0 z-[100] flex flex-col items-center justify-center overflow-hidden px-5 py-12",
            "bg-background/94 backdrop-blur-md supports-[backdrop-filter]:bg-background/78",
          )}
          initial={reduceMotion ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.42, ease: [0.22, 1, 0.36, 1] } }}
        >
          <motion.div
            className="flex w-full max-w-3xl flex-col items-center gap-8 text-center md:max-w-4xl md:gap-10"
            initial={reduceMotion ? false : { opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: "spring", stiffness: 240, damping: 30, mass: 0.9 }}
          >
            <p
              id="home-entrance-thesis"
              className={cn(
                "m-0 max-w-none text-pretty text-xl font-bold leading-snug tracking-tight sm:text-2xl sm:leading-snug md:text-3xl md:leading-snug lg:text-4xl lg:leading-tight",
              )}
            >
              <span className="heading-gradient">{THESIS_LEAD}</span>{" "}
              <span className="text-foreground-muted">{THESIS_TAIL}</span>
            </p>

            <MeditationBreath />

            <div className="flex w-full max-w-xs flex-col items-stretch gap-2 sm:max-w-sm">
              <Button
                type="button"
                variant="default"
                size="lg"
                className={cn(
                  primaryCtaInteractiveClassName,
                  "h-auto w-full min-h-10 rounded-full px-5 py-2.5 text-base font-semibold sm:min-h-11 sm:px-6 sm:text-lg md:text-xl",
                )}
                onClick={close}
                autoFocus
              >
                Enter the site
              </Button>
              <p className="text-center text-xs font-prominent-copy text-foreground-muted">
                Press Escape to continue
              </p>
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
