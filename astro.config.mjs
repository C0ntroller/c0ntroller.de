import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";
import a11yEmoji from "@fec/remark-a11y-emoji";
import wasmPack from 'vite-plugin-wasm-pack';
import icon from "astro-icon";

// https://astro.build/config
export default defineConfig({
  prefetch: {
    prefetchAll: true
  },
  integrations: [mdx(), icon()],
  markdown: {
    remarkPlugins: [a11yEmoji],
    shikiConfig: {
      theme: "one-dark-pro"
    }
  },
  // Copy wasm-terminal to the build directory
  vite: {
    plugins: [wasmPack([], ['@c0ntroller/wasm-terminal'])]
  }
});