import type { NextConfig } from "next";

// Premium security posture. CSP is intentionally permissive enough to never
// break the maps iframe, video, inline styles/scripts (Next bootstrap), or
// Clearbit logos — while still hardening the site for ranking/trust.
const csp = [
  "default-src 'self'",
  "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://va.vercel-scripts.com",
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob: https:",
  "font-src 'self' data:",
  "media-src 'self' blob:",
  "connect-src 'self' https://va.vercel-scripts.com https://vitals.vercel-insights.com",
  "frame-src 'self' https://*.google.com https://maps.google.com",
  "worker-src 'self'",
  "manifest-src 'self'",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "frame-ancestors 'self'",
  "upgrade-insecure-requests",
].join("; ");

const securityHeaders = [
  { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=(self), browsing-topics=()" },
  { key: "X-DNS-Prefetch-Control", value: "on" },
  { key: "Content-Security-Policy", value: csp },
];

const nextConfig: NextConfig = {
  // Server build (enables API routes + secure authentication + middleware).
  images: {
    // On-demand AVIF/WebP optimization + responsive srcset (huge LCP win).
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      { protocol: "https", hostname: "logo.clearbit.com" },
    ],
  },
  async headers() {
    return [
      { source: "/:path*", headers: securityHeaders },
      // Long-cache the immutable, fingerprinted media assets.
      { source: "/video/:path*", headers: [{ key: "Cache-Control", value: "public, max-age=31536000, immutable" }] },
      { source: "/asset/:path*", headers: [{ key: "Cache-Control", value: "public, max-age=31536000, immutable" }] },
    ];
  },
  // Preserve SEO equity from the legacy maxvoltenergy.com URL structure.
  async redirects() {
    return [
      { source: "/home", destination: "/", permanent: true },
      { source: "/index.html", destination: "/", permanent: true },
      { source: "/customer-support", destination: "/support", permanent: true },
      { source: "/sign-in", destination: "/contact-us", permanent: true },
      { source: "/sign-up", destination: "/contact-us", permanent: true },
      { source: "/careers", destination: "/career", permanent: true },
      { source: "/e-shop", destination: "/shop", permanent: true },
      { source: "/blogs", destination: "/blog", permanent: true },
      { source: "/blogs/:slug", destination: "/blog/:slug", permanent: true },
      { source: "/privacy", destination: "/privacy-policy", permanent: true },
      { source: "/terms", destination: "/terms-and-conditions", permanent: true },
      { source: "/manufacturers/:slug", destination: "/products/:slug", permanent: true },
      { source: "/manufacturers", destination: "/products", permanent: true },
      { source: "/press", destination: "/press-release", permanent: true },
    ];
  },
};

export default nextConfig;
