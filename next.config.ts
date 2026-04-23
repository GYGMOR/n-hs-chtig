import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  // If your repo name is NOT username.github.io, you need to set the base path
  // basePath: '/n-hs-chtig', 
};

export default nextConfig;
