/**
 * Viewport gutters — extra padding on very wide displays so edges don’t feel razor-thin.
 */
export const siteChromeGutters =
  "w-full px-4 sm:px-6 lg:px-10 xl:px-12 2xl:px-16 min-[2000px]:px-20 min-[3000px]:px-24";

/**
 * Inner chrome: capped width on laptops / normal desktops; from ~2000px up, no max-width so
 * navbar/footer stretch between the gutters (brand left, links right — not a narrow centered column).
 */
export const siteChromeInner =
  "mx-auto w-full max-w-5xl lg:max-w-6xl xl:max-w-7xl 2xl:max-w-[90rem] min-[2000px]:max-w-none";
