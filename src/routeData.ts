import { defineRouteMiddleware } from "@astrojs/starlight/route-data";

// Keep in sync with `base` in astro.config.mjs.
const base = "/nylon-docs";

export const onRequest = defineRouteMiddleware((context) => {
  if (!context.locals.starlightRoute || !context.locals.starlightRoute.entry) {
    return;
  }
  const { entry } = context.locals.starlightRoute;

  // Hero action links are passed straight to the anchor by Starlight, so
  // root-absolute links from page frontmatter need the base path applied here.
  for (const action of entry.data.hero?.actions ?? []) {
    if (
      typeof action.link === "string" &&
      action.link.startsWith("/") &&
      !action.link.startsWith("//") &&
      action.link !== base &&
      !action.link.startsWith(`${base}/`)
    ) {
      action.link = `${base}${action.link}`;
    }
  }

  // The default path would be 'src/content/docs/page-slug.md'
  const repoPath = "https://github.com/Arsolitt/nylon/edit/main/docs/";

  context.locals.starlightRoute.editUrl = new URL(
    `${entry.filePath.replace("src/content/docs/", "")}`,
    repoPath,
  );
});
