"use client";

import { useEffect, useRef } from "react";

import { HOME_MAIN_GATE_ID } from "@/lib/home-entrance";
import {
  HOMEPAGE_STACK_PANEL_SELECTOR,
  HOMEPAGE_STACK_ROLE,
} from "@/lib/homepage-stack";

/** Return type of `gsap.context` — avoids importing non-exported types from `gsap/gsap-core`. */
type GsapContext = { revert: (config?: object) => void };

export function HomepageStackScroll() {
  const lastLenRef = useRef(0);
  const ctxRef = useRef<GsapContext | null>(null);
  const moRef = useRef<MutationObserver | null>(null);
  const loadListenerRef = useRef<(() => void) | null>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const gate = document.getElementById(HOME_MAIN_GATE_ID);
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

          const panels = Array.from(
            gate.querySelectorAll<HTMLElement>(HOMEPAGE_STACK_PANEL_SELECTOR),
          );
          if (panels.length === 0) return;

          lastLenRef.current = panels.length;

          ctxRef.current = gsap.context(() => {
            for (const panel of panels) {
              const role = panel.dataset.homepageStackPanel;
              if (role === HOMEPAGE_STACK_ROLE.hero) continue;

              const playIntro = () => {
                if (panel.dataset.stackIntroPlayed === "1") return;
                panel.dataset.stackIntroPlayed = "1";

                gsap.fromTo(
                  panel,
                  { yPercent: 11, scale: 0.93, transformOrigin: "50% 0%" },
                  {
                    yPercent: 0,
                    scale: 1,
                    duration: 1.05,
                    ease: "elastic.out(1, 0.5)",
                    overwrite: "auto",
                  },
                );
              };

              ScrollTrigger.create({
                trigger: panel,
                start: "top bottom-=10%",
                onEnter: playIntro,
                onLeaveBack: () => {
                  panel.dataset.stackIntroPlayed = "";
                },
              });
            }
          }, gate);

          ScrollTrigger.refresh();
        };

        mount();

        if (disposed) return;

        moRef.current?.disconnect();
        moRef.current = new MutationObserver(() => {
          const n = gate.querySelectorAll(HOMEPAGE_STACK_PANEL_SELECTOR).length;
          if (n !== lastLenRef.current) {
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
  }, []);

  return null;
}
