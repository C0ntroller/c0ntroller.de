import { defineConfig, fontProviders } from "astro/config";
import { satteri } from '@astrojs/markdown-satteri';
import icon from "astro-icon";
import mdx from "@astrojs/mdx";
import satteriCallouts from "satteri-callouts"
import { satteriKatex } from "satteri-katex";
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
    processor: satteri({
      features: {
        math: true,
        rawHtml: true,
        smartPunctuation: true,
      },
      mdastPlugins: [satteriKatex()],
      hastPlugins: [satteriCallouts({theme: "obsidian"})],
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