import type { MetadataRoute } from "next";
import { PRODUCTS } from "@/lib/constants";
import { SHOP_CATEGORIES, SKUS } from "@/lib/shop";
import { SOLUTIONS } from "@/lib/solutions";
import { PRESS_RELEASES } from "@/lib/press";
import { LOCATIONS } from "@/lib/locations";
import { SEED_POSTS } from "@/lib/blog-seed";
import { readPublished } from "@/lib/blog-store.server";

export const dynamic = "force-static";

const BASE = "https://site.maxvolt-one.co.in";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  // Every public, indexable top-level page (admin + api are intentionally excluded).
  const staticRoutes = [
    "",
    "/about-us", "/about-us/certificates",
    "/products", "/portfolio", "/shop", "/solutions",
    "/battery-calculator", "/find-dealer", "/become-a-dealer", "/our-presence",
    "/contact-us", "/support", "/media", "/press-release", "/blog",
    "/faq", "/gallery", "/career", "/recycle", "/sitemap-page",
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
    changeFrequency: "weekly" as const,
    priority: path === "" ? 1 : 0.8,
  }));

  const productRoutes = PRODUCTS.map((p) => ({
    url: `${BASE}${p.href}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  const solutionRoutes = SOLUTIONS.map((s) => ({
    url: `${BASE}/solutions/${s.slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  const shopRoutes = [
    ...SHOP_CATEGORIES.map((c) => ({ url: `${BASE}/shop/${c.key}`, lastModified: now, changeFrequency: "weekly" as const, priority: 0.7 })),
    ...SKUS.map((s) => ({ url: `${BASE}/shop/${s.category}/${s.slug}`, lastModified: now, changeFrequency: "monthly" as const, priority: 0.6 })),
  ];

  const pressRoutes = PRESS_RELEASES.map((p) => ({
    url: `${BASE}/press-release/${p.slug}`,
    lastModified: new Date(p.date),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  // Blog: published (admin) + curated seed posts, deduped by slug.
  let published: { slug: string; createdAt: number }[] = [];
  try { published = readPublished(); } catch { published = []; }
  const seen = new Set(published.map((p) => p.slug));
  const blogPosts = [...published, ...SEED_POSTS.filter((p) => !seen.has(p.slug))];
  const blogRoutes = blogPosts.map((p) => ({
    url: `${BASE}/blog/${p.slug}`,
    lastModified: p.createdAt ? new Date(p.createdAt) : now,
    changeFrequency: "monthly" as const,
    priority: 0.5,
  }));

  const locationRoutes = LOCATIONS.map((l) => ({
    url: `${BASE}/${l.slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.5,
  }));

  return [
    ...staticRoutes,
    ...productRoutes,
    ...solutionRoutes,
    ...shopRoutes,
    ...pressRoutes,
    ...blogRoutes,
    ...locationRoutes,
  ];
}
