// @ts-check
import { defineConfig } from "astro/config";
import starlight from "@astrojs/starlight";
import mermaid from "astro-mermaid";
import sitemap from "@astrojs/sitemap";

// https://astro.build/config
export default defineConfig({
  site: "https://arsolitt.github.io",
  base: "/nylon-docs",
  integrations: [
    mermaid({
      autoTheme: true,
    }),
    starlight({
      title: "nylon docs",
      routeMiddleware: "./src/routeData.ts",
      social: [
        {
          icon: "github",
          label: "GitHub",
          href: "https://github.com/Arsolitt/nylon",
        },
      ],
      sidebar: [
        {
          label: "Overview",
          link: "/",
        },
        {
          label: "Why Nylon?",
          link: "/why-nylon",
        },
        {
          label: "Guides",
          items: [{ autogenerate: { directory: "guides" } }],
        },
        {
          label: "Reference",
          items: [{ autogenerate: { directory: "reference" } }],
        },
      ],
      logo: {
        light: "./src/content/docs/assets/logo_light.svg",
        dark: "./src/content/docs/assets/logo_dark.svg",
      },
    }),
    sitemap(),
  ],
  vite: {
    server: {
      watch: {
        followSymlinks: true,
      },
    },
    resolve: {
      preserveSymlinks: true,
    },
  },
});
