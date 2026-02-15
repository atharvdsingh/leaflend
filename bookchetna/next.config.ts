import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // domains: ['res.cloudinary.com'],
    remotePatterns:[{
      protocol:'https',
      hostname:'res.cloudinary.com',
      pathname:'/**'
    }]
    
  },
  webpack: (config) => {
    config.watchOptions = {
      poll: 1000,
      aggregateTimeout: 300,
    }
    return config
  },
  output: "standalone",
  /* config options here */
};

export default nextConfig;
