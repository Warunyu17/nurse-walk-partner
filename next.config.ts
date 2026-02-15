import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  // Mark mongoose as external to prevent bundling issues in serverless
  serverExternalPackages: ['mongoose'],
};

export default nextConfig;
