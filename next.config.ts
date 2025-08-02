import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: true,
  images: {
      remotePatterns: [
          {
              protocol: 'https',
              hostname: 'raw.githubusercontent.com',
              pathname: '/**',
          },
      ],
  },
};

export default nextConfig;
