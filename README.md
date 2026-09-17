# Nylon Docs

[![Built with Starlight](https://astro.badg.es/v2/built-with-starlight/tiny.svg)](https://starlight.astro.build)

This repository is a shell for the Nylon documentation site.

## Content Source

The documentation content is maintained in the [`Arsolitt/nylon`](https://github.com/Arsolitt/nylon) repository. During deployment, a GitHub Action pulls the `docs/` folder from that repository and injects it into this shell.

## Getting Started

To work on the site locally, clone the [`nylon`](https://github.com/Arsolitt/nylon) repository and symlink its `docs` directory:

```bash
# Clone the content repo (e.g., as a sibling)
git clone https://github.com/Arsolitt/nylon ../nylon

# Symlink the docs folder
ln -s ../nylon/docs src/content/docs

npm install
npm run dev
```
