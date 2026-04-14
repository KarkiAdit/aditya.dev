export const publicAssets = {
  hero: {
    video: "/videos/hero-video.mov",
  },
} as const satisfies {
  hero: { video: string };
};
