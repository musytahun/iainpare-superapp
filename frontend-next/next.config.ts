import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "picsum.photos",
      },
    ],
  },
  eslint: {
    ignoreDuringBuilds: true, // 🔥 lewati error lint di build Vercel
  },
  typescript: {
    ignoreBuildErrors: true, // 🔥 lewati error TypeScript di build Vercel
  },
};


export default nextConfig;
