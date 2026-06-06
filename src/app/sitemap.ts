import type { MetadataRoute } from "next";
import { PRODUCTS } from "@/lib/constants";
import { SHOP_CATEGORIES, SKUS } from "@/lib/shop";

export const dynamic = "force-static";

const BASE = "https://max1.maxvolt-one.co.in";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticRoutes = [
    "", "/about-us", "/about-us/certificates", "/products", "/portfolio", "/solutions",
    "/battery-calculator", "/find-dealer", "/become-a-dealer", "/our-presence", "/contact-us",
    "/support", "/media", "/blog", "/faq", "/gallery", "/career", "/recycle",
    "/solutions/electric-vehicles", "/solutions/solar-storage",
    "/solutions/portable-lighting", "/solutions/consumer-electronics",
    "/investors", "/investors/earnings-call", "/investors/management",
    "/investors/corporate-governance", "/investors/corporate-announcement",
    "/investors/shareholding-pattern", "/investors/annual-reports",
    "/investors/csr", "/investors/policies-notices",
    "/investors/initial-public-offering", "/investors/investors-presentation",
    "/investors/financial", "/investors/notices", "/investors/material-contract",
    "/investors/material-document", "/investors/investors-contact",
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

  const shopRoutes = [
    { url: `${BASE}/shop`, lastModified: now, changeFrequency: "weekly" as const, priority: 0.8 },
    ...SHOP_CATEGORIES.map((c) => ({ url: `${BASE}/shop/${c.key}`, lastModified: now, changeFrequency: "weekly" as const, priority: 0.7 })),
    ...SKUS.map((s) => ({ url: `${BASE}/shop/${s.category}/${s.slug}`, lastModified: now, changeFrequency: "monthly" as const, priority: 0.6 })),
  ];

  return [...staticRoutes, ...productRoutes, ...shopRoutes];
}
