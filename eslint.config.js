import eslintPluginAstro from "eslint-plugin-astro";
import globals from "globals";
import tseslint from "typescript-eslint";

export default tseslint.config(
  ...tseslint.configs.recommended,
  ...eslintPluginAstro.configs.recommended,
  {
    languageOptions: {
      globals: { ...globals.browser },
    },
  },
  {
    ignores: [
      "node_modules/**",
      "dist/**",
      ".astro/**",
      ".next/**",
      "**/*.config.mjs",
      "**/*.d.ts",
    ],
  },
);
