import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Server build (enables API routes + secure authentication + middleware).
  // NOTE: this requires Node hosting (Vercel / Render / GoDaddy VPS with Node),
  // not static shared hosting.
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
