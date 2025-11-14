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
    ignoreDuringBuilds: true, // lewati error lint di build Vercel
  },

  typescript: {
    ignoreBuildErrors: true, // lewati error TypeScript di build Vercel
  },

  compiler: {
    removeConsole: process.env.NODE_ENV === "production", // HAPUS console.log DI PRODUCTION
  },

  turbo: {
    loaders: {
      removeConsole: process.env.NODE_ENV === "production", // HAPUS console.log DI PRODUCTION
    },
  },
};


export default nextConfig;
