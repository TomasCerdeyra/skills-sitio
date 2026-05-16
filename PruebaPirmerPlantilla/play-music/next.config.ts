import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "picsum.photos" },
      // LoremFlickr: imágenes por keyword del rubro
      { protocol: "https", hostname: "loremflickr.com" },
      { protocol: "https", hostname: "live.staticflickr.com" },
      { protocol: "https", hostname: "*.staticflickr.com" },
    ],
  },
};

export default nextConfig;
