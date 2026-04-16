/**
 * GSAP + ScrollTrigger wiring for sticky stack elastic intros (`HomepageStackScroll`).
 * Keeps animation constants and trigger setup out of the React island.
 */

import {
  HOMEPAGE_STACK_INTRO_CARD_SELECTOR,
  HOMEPAGE_STACK_PANEL_SELECTOR,
  HOMEPAGE_STACK_ROLE,
} from "@/lib/homepage-stack";

/** Return type of `gsap.context` — avoids importing non-exported types from `gsap/gsap-core`. */
export type HomepageStackGsapContext = { revert: (config?: object) => void };

const INTRO_START = "top bottom-=10%";

/** When triggers mount below the fold, `onEnter` may not fire; match this threshold. */
export function getStackIntroViewportEnterY(): number {
  return window.innerHeight * 0.9;
}

export function getStackMountSignature(gate: HTMLElement): string {
  const p = gate.querySelectorAll(HOMEPAGE_STACK_PANEL_SELECTOR).length;
  const c = gate.querySelectorAll(HOMEPAGE_STACK_INTRO_CARD_SELECTOR).length;
  return `${p}:${c}`;
}

export function queryStackIntroPanels(gate: HTMLElement): HTMLElement[] {
  return Array.from(gate.querySelectorAll<HTMLElement>(HOMEPAGE_STACK_PANEL_SELECTOR));
}

export function queryStackIntroCards(gate: HTMLElement): HTMLElement[] {
  return Array.from(gate.querySelectorAll<HTMLElement>(HOMEPAGE_STACK_INTRO_CARD_SELECTOR));
}

export function attachStackIntroScrollTrigger(
  gsap: typeof import("gsap").default,
  ScrollTrigger: typeof import("gsap/ScrollTrigger").ScrollTrigger,
  el: HTMLElement,
  playIntroByEl: Map<HTMLElement, () => void>,
): void {
  const playIntro = () => {
    if (el.dataset.stackIntroPlayed === "1") return;
    el.dataset.stackIntroPlayed = "1";

    gsap.fromTo(
      el,
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

  playIntroByEl.set(el, playIntro);

  ScrollTrigger.create({
    trigger: el,
    start: INTRO_START,
    onEnter: playIntro,
    onLeaveBack: () => {
      el.dataset.stackIntroPlayed = "";
    },
  });
}

/** Run intros for elements already overlapping the viewport band (see `getStackIntroViewportEnterY`). */
export function playStackIntrosIfAlreadyEntered(
  elements: readonly HTMLElement[],
  playIntroByEl: Map<HTMLElement, () => void>,
  viewportEnterY: number,
): void {
  for (const el of elements) {
    const bounds = el.getBoundingClientRect();
    if (bounds.top < viewportEnterY && bounds.bottom > 0) {
      playIntroByEl.get(el)?.();
    }
  }
}

/** Same as `playStackIntrosIfAlreadyEntered`, but skips the sticky hero panel. */
export function playNonHeroPanelStackIntrosIfInViewport(
  panels: readonly HTMLElement[],
  playIntroByEl: Map<HTMLElement, () => void>,
  viewportEnterY: number,
): void {
  for (const panel of panels) {
    if (panel.dataset.homepageStackPanel === HOMEPAGE_STACK_ROLE.hero) continue;
    const bounds = panel.getBoundingClientRect();
    if (bounds.top < viewportEnterY && bounds.bottom > 0) {
      playIntroByEl.get(panel)?.();
    }
  }
}

export function forEachNonHeroPanel(
  panels: readonly HTMLElement[],
  fn: (panel: HTMLElement) => void,
): void {
  for (const panel of panels) {
    const role = panel.dataset.homepageStackPanel;
    if (role === HOMEPAGE_STACK_ROLE.hero) continue;
    fn(panel);
  }
}
