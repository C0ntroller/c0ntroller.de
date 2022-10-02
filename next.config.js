/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  images: {
    domains: ["openai-labs-public-images-prod.azureedge.net"]
  },
  i18n: {
    locales: ["en"],
    defaultLocale: "en",
  }
};