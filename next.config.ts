import type { NextConfig } from "next";
import { initOpenNextCloudflareForDev } from "@opennextjs/cloudflare";

// 1. Initialize OpenNext for the local development environment
if (process.env.NODE_ENV === "development") {
  initOpenNextCloudflareForDev();
}

const nextConfig: NextConfig = {
  turbopack: {
    rules: {
      '*.inline.svg': {
        loaders: [
          {
            loader: '@svgr/webpack',
            options: {
              exportType: "default",
              typescript: true,
            }
          }
        ],
        as: "*.ts",
      },
    },
  },
};

export default nextConfig;
