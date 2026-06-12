import type { MetadataRoute } from "next";

export const dynamic = "force-static";

const BASE = "https://site.maxvolt-one.co.in";

// Only genuinely non-content routes are blocked: the auth-gated admin portal
// and the JSON API. Every public page is fully crawlable and indexable.
const DISALLOW = ["/admin", "/admin/login", "/api/"];

// Generative-engine / AI crawlers we explicitly welcome (GEO).
const AI_CRAWLERS = [
  "GPTBot", "OAI-SearchBot", "ChatGPT-User",
  "ClaudeBot", "Claude-Web", "anthropic-ai",
  "PerplexityBot", "Perplexity-User",
  "Google-Extended", "Applebot-Extended",
  "Amazonbot", "Bytespider", "CCBot", "cohere-ai",
];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      // All standard search-engine crawlers (Googlebot, Bingbot, etc.)
      { userAgent: "*", allow: "/", disallow: DISALLOW },
      // AI / answer-engine crawlers — same full access
      { userAgent: AI_CRAWLERS, allow: "/", disallow: DISALLOW },
    ],
    sitemap: `${BASE}/sitemap.xml`,
  };
}
