import { defineConfig, fontProviders } from "astro/config";
import { unified } from '@astrojs/markdown-remark';
import icon from "astro-icon";
import mdx from "@astrojs/mdx";
import remarkMath from "remark-math";
import rehypeMathjax from "rehype-mathjax"
import rehypeCallouts from "rehype-callouts";
import mermaid from "astro-mermaid";

export default defineConfig({
  fonts: [{
    provider: fontProviders.fontsource(),
    name: "Cascadia Code",
    cssVariable: "--font-cascadia-code",
    fallbacks: ["monospace"],
  }],
  integrations: [
    mermaid({
      theme: "dark",
      autoTheme: false,
      mermaidConfig: {
        flowchart: {curve:"linear"},
        startOnLoad: false,
        logLevel: "error",
        securityLevel: "strict",
      }
    }),
    icon(),
    mdx()
  ],
  markdown: {
    processor: unified({
      remarkPlugins: [remarkMath],
      rehypePlugins: [rehypeMathjax, [rehypeCallouts, { theme: "obsidian" }]],
    }),
    shikiConfig: {
        theme: "one-dark-pro",
    },
    syntaxHighlight: {
      type: "shiki",
      excludeLangs: ["mermaid", "math"],
    },
  }
});