import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Optimize images: enables WebP/AVIF conversion, modern formats served automatically
  images: {
    formats: ["image/avif", "image/webp"],
    deviceSizes: [360, 480, 640, 750, 828, 1080, 1200],
    imageSizes: [64, 128, 256, 300, 600],
    qualities: [85],
    minimumCacheTTL: 60 * 60 * 24 * 30, // 30 days
  },

  // Long-term caching headers for static assets
  async headers() {
    return [
      {
        source: "/(.*\\.(?:jpg|jpeg|png|gif|svg|ico|webp|avif|woff|woff2|ttf|otf|eot))",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
    ];
  },

  // Compiler options: remove console.log in production
  compiler: {
    removeConsole: process.env.NODE_ENV === "production" ? { exclude: ["error"] } : false,
  },
};

export default nextConfig;
