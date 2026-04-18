"use client";

import { useEffect, useRef } from "react";

import {
  attachStackIntroScrollTrigger,
  getStackIntroViewportEnterY,
  playStackIntrosIfAlreadyEntered,
  type HomepageStackGsapContext,
} from "@/lib/homepage/homepage-stack-scroll";

export const THOUGHT_HUB_GATE_ID = "thoughts-hub-gate";

export const THOUGHT_STACK_INTRO_SELECTOR = "[data-thought-stack-intro]";

function getThoughtHubMountSignature(gate: HTMLElement): string {
  return String(gate.querySelectorAll(THOUGHT_STACK_INTRO_SELECTOR).length);
}

type ThoughtsHubScrollProps = {
  /** Defaults to {@link THOUGHT_HUB_GATE_ID}. */
  gateId?: string;
};

/**
 * GSAP elastic stack intros for the thoughts hub (featured blocks + feed rows), matching
 * `HomepageStackScroll` / `data-homepage-stack-intro-card` on `/` and `/projects`.
 */
export function ThoughtsHubScroll({ gateId = THOUGHT_HUB_GATE_ID }: ThoughtsHubScrollProps) {
  const lastSigRef = useRef("");
  const ctxRef = useRef<HomepageStackGsapContext | null>(null);
  const moRef = useRef<MutationObserver | null>(null);
  const loadListenerRef = useRef<(() => void) | null>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const gate = document.getElementById(gateId);
    if (!gate) return;

    let disposed = false;

    void Promise.all([import("gsap"), import("gsap/ScrollTrigger")]).then(
      ([{ default: gsap }, { ScrollTrigger }]) => {
        if (disposed) return;

        gsap.registerPlugin(ScrollTrigger);

        const onLoad = () => {
          ScrollTrigger.refresh();
        };
        loadListenerRef.current = onLoad;
        window.addEventListener("load", onLoad);

        const mount = () => {
          if (disposed) return;
          ctxRef.current?.revert();
          ctxRef.current = null;

          const introEls = Array.from(gate.querySelectorAll<HTMLElement>(THOUGHT_STACK_INTRO_SELECTOR));
          if (introEls.length === 0) return;

          lastSigRef.current = getThoughtHubMountSignature(gate);

          const playIntroByEl = new Map<HTMLElement, () => void>();

          ctxRef.current = gsap.context(() => {
            for (const el of introEls) {
              attachStackIntroScrollTrigger(gsap, ScrollTrigger, el, playIntroByEl);
            }
          }, gate);

          ScrollTrigger.refresh();

          const viewportEnterY = getStackIntroViewportEnterY();
          playStackIntrosIfAlreadyEntered(introEls, playIntroByEl, viewportEnterY);
        };

        mount();

        if (disposed) return;

        moRef.current?.disconnect();
        moRef.current = new MutationObserver(() => {
          const sig = getThoughtHubMountSignature(gate);
          if (sig !== lastSigRef.current) {
            mount();
          }
        });
        moRef.current.observe(gate, { childList: true, subtree: true });
      },
    );

    return () => {
      disposed = true;
      const loadFn = loadListenerRef.current;
      if (loadFn) {
        window.removeEventListener("load", loadFn);
        loadListenerRef.current = null;
      }
      moRef.current?.disconnect();
      moRef.current = null;
      ctxRef.current?.revert();
      ctxRef.current = null;
    };
  }, [gateId]);

  useEffect(() => {
    const refresh = () => {
      void import("gsap/ScrollTrigger").then(({ ScrollTrigger }) => {
        ScrollTrigger.refresh();
      });
    };
    window.addEventListener("thoughts-hub-scroll-refresh", refresh);
    return () => window.removeEventListener("thoughts-hub-scroll-refresh", refresh);
  }, []);

  return null;
}
