import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  devIndicators: false,
  output: "export", // Enables static export
  basePath: process.env.NODE_ENV === "production" ? "/pomodorro" : "",
  assetPrefix: process.env.NODE_ENV === "production" ? "/pomodorro/" : ""
};

export default nextConfig;
