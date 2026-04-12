export const publicAssets = {
  hero: {
    video: "/videos/hero.MOV",
  },
} as const satisfies {
  hero: { video: string };
};
