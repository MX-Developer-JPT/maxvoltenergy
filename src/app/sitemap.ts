import type { MetadataRoute } from "next";
import { PRODUCTS } from "@/lib/constants";

export const dynamic = "force-static";

const BASE = "https://max1.maxvolt-one.co.in";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticRoutes = [
    "", "/about-us", "/about-us/certificates", "/products", "/portfolio", "/solutions",
    "/battery-calculator", "/find-dealer", "/become-a-dealer", "/our-presence", "/contact-us",
    "/support", "/media", "/blog", "/faq", "/gallery", "/career", "/recycle",
    "/investors", "/investors/earnings-call", "/investors/management",
    "/investors/corporate-governance", "/investors/corporate-announcement",
    "/investors/shareholding-pattern", "/investors/annual-reports",
    "/investors/csr", "/investors/policies-notices",
    "/privacy-policy", "/terms-and-conditions",
  ].map((path) => ({
    url: `${BASE}${path}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: path === "" ? 1 : 0.7,
  }));

  const productRoutes = PRODUCTS.map((p) => ({
    url: `${BASE}${p.href}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  return [...staticRoutes, ...productRoutes];
}
