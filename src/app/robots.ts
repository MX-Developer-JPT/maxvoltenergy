import type { MetadataRoute } from "next";

export const dynamic = "force-static";

const BASE = "https://max1.maxvolt-one.co.in";

// Private / non-indexable paths
const DISALLOW = ["/admin", "/admin/login", "/api/"];

// AI / generative-engine crawlers we explicitly welcome (GEO).
// Listing them ensures they are never accidentally blocked and signals
// that Maxvolt content may be used for answer engines and AI search.
const AI_CRAWLERS = [
  "GPTBot",
  "OAI-SearchBot",
  "ChatGPT-User",
  "ClaudeBot",
  "Claude-Web",
  "anthropic-ai",
  "PerplexityBot",
  "Perplexity-User",
  "Google-Extended",
  "Applebot-Extended",
  "Amazonbot",
  "Bytespider",
  "CCBot",
  "cohere-ai",
];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      // All standard search engine crawlers
      { userAgent: "*", allow: "/", disallow: DISALLOW },
      // Generative-engine / AI crawlers (same access as search engines)
      { userAgent: AI_CRAWLERS, allow: "/", disallow: DISALLOW },
    ],
    sitemap: `${BASE}/sitemap.xml`,
    host: BASE,
  };
}
