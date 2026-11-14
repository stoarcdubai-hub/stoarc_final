import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // TEMPORARY: placeholder photos (picsum.photos) load directly in the browser.
    // When STOARC's own photos are in /public/images, delete the "unoptimized" line
    // so Next.js resizes and compresses them automatically.
    unoptimized: true,
    formats: ["image/avif", "image/webp"],
    remotePatterns: [{ protocol: "https", hostname: "picsum.photos" }],
  },
};

export default nextConfig;