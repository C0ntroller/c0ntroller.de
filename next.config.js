/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  images: {
    domains: ["openai-labs-public-images-prod.azureedge.net"]
  },
  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
    config.module.rules.push({
      test: /\.adoc$/i,
      loader: "raw-loader",
    });
    return config;
  },
};