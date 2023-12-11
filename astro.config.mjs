import { defineConfig } from 'astro/config';

import mdx from "@astrojs/mdx";
import a11yEmoji from "@fec/remark-a11y-emoji";

// https://astro.build/config
export default defineConfig({
  integrations: [mdx()],
  markdown: {
    remarkPlugins: [
      a11yEmoji
    ],
    shikiConfig: {
      theme: "one-dark-pro"
    }
  }
});