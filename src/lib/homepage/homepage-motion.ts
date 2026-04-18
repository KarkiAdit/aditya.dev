import type { Transition } from "framer-motion";

/**
 * Homepage Framer Motion presets — keeps spring tuning in one place (polaroid captions, career UI, splash).
 */

/** Polaroid caption swap + career roadmap mobile panel — shared snappy spring. */
export const homepageOverlaySpringTransition: Transition = {
  type: "spring",
  stiffness: 420,
  damping: 33,
};

/** Entrance splash thesis + breath orb — slower, heavier spring. */
export const homeEntranceSplashSpringTransition: Transition = {
  type: "spring",
  stiffness: 240,
  damping: 30,
  mass: 0.9,
};
