import type { MetadataRoute } from "next";

export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: "*", allow: "/", disallow: ["/admin"] },
    ],
    sitemap: "https://max1.maxvolt-one.co.in/sitemap.xml",
    host: "https://max1.maxvolt-one.co.in",
  };
}
