// @ts-check
import { defineConfig } from "astro/config";
import starlight from "@astrojs/starlight";
import mermaid from "astro-mermaid";
import sitemap from "@astrojs/sitemap";

// The site is served from a project Pages subpath, and this base is applied by
// both the config below and the link rewrite plugin.
const base = "/nylon-docs";

/**
 * Starlight applies `base` to its own navigation, but root-absolute links
 * written in content markdown (e.g. `/guides/obfuscation/`) are emitted as-is,
 * so every cross-page link would 404 under the subpath. Prefix them here.
 */
function rehypeBasePath() {
  const walk = (node) => {
    if (node.type === "element" && node.tagName === "a") {
      const href = node.properties?.href;
      if (
        typeof href === "string" &&
        href.startsWith("/") &&
        !href.startsWith("//") &&
        href !== base &&
        !href.startsWith(`${base}/`)
      ) {
        node.properties.href = `${base}${href}`;
      }
    }
    if (Array.isArray(node.children)) {
      node.children.forEach(walk);
    }
  };
  return (tree) => walk(tree);
}

// https://astro.build/config
export default defineConfig({
  site: "https://arsolitt.github.io",
  base,
  markdown: {
    rehypePlugins: [rehypeBasePath],
  },
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
