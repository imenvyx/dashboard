import type { NextConfig } from "next";

import path from "path";

const nextConfig: NextConfig = {
  /* config options here */
  webpack: (config) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      "@components": path.resolve(__dirname, "src/components"),
      "@lib": path.resolve(__dirname, "src/lib"),
    };
    return config;
  },
};

export default nextConfig;
