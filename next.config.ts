import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  /* config options here */
  typescript: {
    ignoreBuildErrors: false, // Changed to false for better type safety
  },
  eslint: {
    ignoreDuringBuilds: false, // Changed to false for better code quality
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'placehold.co',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'picsum.photos',
      },
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
      },
      {
        protocol: 'https',
        hostname: 'hleduroom.com',
      },
      {
        protocol: 'https',
        hostname: 'www.thehiteshsir.com',
      },
      {
        protocol: 'https',
        hostname: 'thehiteshsir.com',
      }
    ],
    formats: ['image/webp', 'image/avif'],
  },
  // Added for better performance and deployment reliability
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
  experimental: {
    optimizeCss: true,
  },
  // Output configuration for Vercel
  output: process.env.NODE_ENV === 'production' ? 'standalone' : undefined,
  // Enable React strict mode for better development
  reactStrictMode: true,
  // Better logging for debugging
  logging: {
    fetches: {
      fullUrl: true,
    },
  },
};

export default nextConfig;