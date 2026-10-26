import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Build to plain files in out/, for GitHub Pages, which can't run a Next.js server
  output: "export",
  // Pages can't run Next's image optimiser either, so images are served as they are
  images: { unoptimized: true },
};

export default nextConfig;
