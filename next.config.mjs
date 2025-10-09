/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "sugarspunrun.com",
      },
    ],
  },
};

export default nextConfig;
