import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "t0mrrn6uzcxdc7gp.public.blob.vercel-storage.com",
        pathname: "/next-auth/**",
        port: "",
        search: "",
      },
    ],
  },
};

export default nextConfig;
