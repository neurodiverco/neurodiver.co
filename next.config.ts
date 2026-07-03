import type { NextConfig } from "next";

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
