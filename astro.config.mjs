import { defineConfig, fontProviders } from 'astro/config';
import icon from 'astro-icon';
import mdx from '@astrojs/mdx';
//import { remarkModifiedTime } from './src/remark-modified-time.mjs';
import remarkMath from "remark-math";
import rehypeMathjax from "rehype-mathjax"
import rehypeCallouts from "rehype-callouts";
// @ts-ignore
import { remarkKroki } from "remark-kroki";

export default defineConfig({
  fonts: [{
    provider: fontProviders.fontsource(),
    name: "Cascadia Code",
    cssVariable: "--font-cascadia-code",
    fallbacks: ["monospace"],
  }],
  integrations: [icon(), mdx()],
  markdown: {
    remarkPlugins: [
//      remarkModifiedTime,
      remarkMath, [
        remarkKroki, { 
          alias: ["mermaid", "tikz"],
          server: process.env.KROKI_SERVER || "https://kroki.io",
          target: "mdx3",
          output: "inline-svg"
      }
    ]],
    rehypePlugins: [rehypeMathjax, [rehypeCallouts, { theme: "obsidian" }]],
    shikiConfig: {
        theme: "one-dark-pro",
    },
    syntaxHighlight: {
      type: 'shiki',
      excludeLangs: ['mermaid', 'math'],
    },
  }
});