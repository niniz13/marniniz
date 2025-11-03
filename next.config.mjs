import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./src/i18n/request.js");

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
      },
      {
        protocol: "https",
        hostname: "images.immediate.co.uk",
      },
      {
        protocol: "https",
        hostname: "svgrepo.com",
      },
    ],
  },
};

export default withNextIntl(nextConfig);
