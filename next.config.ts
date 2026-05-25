import type { NextConfig } from "next";

const isProd = process.env.NODE_ENV === "production";
// Pages serve from https://<user>.github.io/purrmure/, so we need a base path.
const repoBasePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "/purrmure";

const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  basePath: isProd ? repoBasePath : "",
  assetPrefix: isProd ? `${repoBasePath}/` : "",
  devIndicators: false,
};

export default nextConfig;
