import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com", pathname: "/**" },
      { protocol: "https", hostname: "res.cloudinary.com", pathname: "/**" },
      { protocol: "https", hostname: "pub-57b44696f3e243acb6e5fdb88145606e.r2.dev", pathname: "/**" }
    ]
  },
  devIndicators: false,
  async rewrites() {
    const backendUrl = process.env.NEXT_BACKEND_URL || "http://localhost:5000";

    return [
      {
        source: "/api/v1/:path*",
        destination: `${backendUrl}/api/v1/:path*`,
      },
    ];
  },
};

export default nextConfig;