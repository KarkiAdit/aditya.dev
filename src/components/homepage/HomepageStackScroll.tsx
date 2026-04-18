"use client";

import { useEffect, useRef } from "react";

import { HOME_MAIN_GATE_ID } from "@/lib/homepage/home-entrance";
import {
  attachStackIntroScrollTrigger,
  forEachNonHeroPanel,
  getStackIntroViewportEnterY,
  getStackMountSignature,
  type HomepageStackGsapContext,
  playNonHeroPanelStackIntrosIfInViewport,
  playStackIntrosIfAlreadyEntered,
  queryStackIntroCards,
  queryStackIntroPanels,
} from "@/lib/homepage/homepage-stack-scroll";

type HomepageStackScrollProps = {
  /** Scope panel queries + GSAP context to this element (default: homepage main gate). */
  gateId?: string;
};

export function HomepageStackScroll({ gateId = HOME_MAIN_GATE_ID }: HomepageStackScrollProps) {
  const lastStackSigRef = useRef("");
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

          const panels = queryStackIntroPanels(gate);
          const introCards = queryStackIntroCards(gate);

          if (panels.length === 0 && introCards.length === 0) return;

          lastStackSigRef.current = getStackMountSignature(gate);

          const playIntroByEl = new Map<HTMLElement, () => void>();

          ctxRef.current = gsap.context(() => {
            forEachNonHeroPanel(panels, (panel) => {
              attachStackIntroScrollTrigger(gsap, ScrollTrigger, panel, playIntroByEl);
            });
            for (const card of introCards) {
              attachStackIntroScrollTrigger(gsap, ScrollTrigger, card, playIntroByEl);
            }
          }, gate);

          ScrollTrigger.refresh();

          const viewportEnterY = getStackIntroViewportEnterY();
          playNonHeroPanelStackIntrosIfInViewport(panels, playIntroByEl, viewportEnterY);
          playStackIntrosIfAlreadyEntered(introCards, playIntroByEl, viewportEnterY);
        };

        mount();

        if (disposed) return;

        moRef.current?.disconnect();
        moRef.current = new MutationObserver(() => {
          const sig = getStackMountSignature(gate);
          if (sig !== lastStackSigRef.current) {
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

  return null;
}
