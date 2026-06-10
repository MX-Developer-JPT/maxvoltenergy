import type { MetadataRoute } from "next";
import fs from "fs";
import path from "path";
import { PRODUCTS } from "@/lib/constants";
import { SHOP_CATEGORIES, SKUS } from "@/lib/shop";
import { SOLUTIONS } from "@/lib/solutions";
import { PRESS_RELEASES } from "@/lib/press";
import { LOCATIONS } from "@/lib/locations";
import { SEED_POSTS } from "@/lib/blog-seed";
import { readPublished } from "@/lib/blog-store.server";

export const dynamic = "force-static";

const BASE = "https://site.maxvolt-one.co.in";

// Folders that must never appear in the public sitemap.
const EXCLUDE_TOP = new Set(["admin", "api"]);

/**
 * Auto-discover every static (non-dynamic) page route by walking the app
 * directory for `page.tsx|jsx|mdx` files. Guarantees the sitemap can never
 * silently miss an SEO page when new pages are added. Dynamic ([param]) routes
 * are handled separately by the data-driven generators below.
 */
function discoverStaticRoutes(): string[] {
  const appDir = path.join(process.cwd(), "src", "app");
  const routes = new Set<string>();

  const walk = (dir: string, segments: string[]) => {
    let entries: fs.Dirent[];
    try { entries = fs.readdirSync(dir, { withFileTypes: true }); } catch { return; }

    // Is this directory itself a page?
    const hasPage = entries.some((e) => e.isFile() && /^page\.(tsx|jsx|mdx)$/.test(e.name));
    if (hasPage) routes.add("/" + segments.join("/"));

    for (const e of entries) {
      if (!e.isDirectory()) continue;
      const name = e.name;
      // Skip dynamic segments, route groups, parallel/private folders, and excluded trees.
      if (name.startsWith("[") || name.startsWith("(") || name.startsWith("@") || name.startsWith("_")) continue;
      if (segments.length === 0 && EXCLUDE_TOP.has(name)) continue;
      walk(path.join(dir, name), [...segments, name]);
    }
  };

  walk(appDir, []);
  // normalize root
  const out = Array.from(routes).map((r) => (r === "/" ? "" : r));
  return out;
}

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  // ── Static pages — auto-discovered, merged with an explicit safety list ──
  const explicitStatic = [
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
  ];

  const allStatic = Array.from(new Set([...explicitStatic, ...discoverStaticRoutes()]));
  const staticRoutes = allStatic.map((p) => {
    const depth = p === "" ? 0 : p.split("/").filter(Boolean).length;
    return {
      url: `${BASE}${p}`,
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: p === "" ? 1 : depth <= 1 ? 0.8 : 0.7,
    };
  });

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

  // Merge everything and de-duplicate by URL (first occurrence wins).
  const all = [
    ...staticRoutes,
    ...productRoutes,
    ...solutionRoutes,
    ...shopRoutes,
    ...pressRoutes,
    ...blogRoutes,
    ...locationRoutes,
  ];
  const byUrl = new Map<string, (typeof all)[number]>();
  for (const entry of all) if (!byUrl.has(entry.url)) byUrl.set(entry.url, entry);
  return Array.from(byUrl.values());
}
