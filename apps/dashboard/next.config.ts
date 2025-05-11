import { config } from '@repo/next-config';
import type { NextConfig } from 'next';
const nextConfig: NextConfig = {
  ...config,
  images: {
    remotePatterns: [{ hostname: 'uploadthing.com' }],
  },
  /* config options here */
};

export default nextConfig;
