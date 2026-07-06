import type { NextConfig } from "next";
import { initOpenNextCloudflareForDev } from "@opennextjs/cloudflare";
import createMDX from "@next/mdx";

// 1. Initialize OpenNext for the local development environment
if (process.env.NODE_ENV === "development") {
  initOpenNextCloudflareForDev();
}

const withMDX = createMDX({
});

const nextConfig: NextConfig = {
  pageExtensions: ['js', 'jsx', 'md', 'mdx', 'ts', 'tsx'],
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

export default withMDX(nextConfig);
