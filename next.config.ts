import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  devIndicators: false,
  output: "export",
  basePath: process.env.NODE_ENV === "production" ? "/pomodorro" : "",
  assetPrefix: process.env.NODE_ENV === "production" ? "/pomodorro/" : "",
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
