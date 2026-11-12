import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Placeholder photo host. Remove once all photos live in /public/images.
    remotePatterns: [{ protocol: "https", hostname: "picsum.photos" }],
  },
};

export default nextConfig;