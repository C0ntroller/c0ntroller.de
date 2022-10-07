/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  images: {
    domains: ["openai-labs-public-images-prod.azureedge.net"]
  },
  i18n: {
    locales: ["en"],
    defaultLocale: "en",
  },
  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
    config.module.rules.push({
      test: /\.adoc$/i,
      loader: "raw-loader",
    });
    return config;
  },
};