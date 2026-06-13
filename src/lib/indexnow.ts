// IndexNow — instantly notify Bing, Yandex, Seznam, Naver (and any future
// participating engine) when content is published or changed, instead of
// waiting for a crawl. Google does not consume IndexNow today, but a single
// ping fans out to all participating engines via the shared endpoint.
//
// Ownership is proven by hosting a key file at https://<host>/<key>.txt whose
// contents equal the key. That file lives in /public, so it deploys as a
// static asset at the site root automatically.

import { SITE_CONFIG } from "@/lib/constants";

/** Public, non-secret IndexNow key. Must match /public/<KEY>.txt verbatim. */
export const INDEXNOW_KEY =
  process.env.INDEXNOW_KEY || "6472bf2ee3414e15feedbe60c1bca2c8";

/** Bare host (no scheme) — IndexNow requires submitted URLs to share this host. */
function siteHost(): string {
  try {
    return new URL(SITE_CONFIG.url).host;
  } catch {
    return "site.maxvolt-one.co.in";
  }
}

/** Turn a path or absolute URL into an absolute URL on the canonical host. */
export function toAbsolute(pathOrUrl: string): string {
  if (/^https?:\/\//i.test(pathOrUrl)) return pathOrUrl;
  return `${SITE_CONFIG.url.replace(/\/$/, "")}/${pathOrUrl.replace(/^\//, "")}`;
}

/**
 * Submit one or more URLs to IndexNow. Fire-and-forget: never throws, so a
 * failed ping can never break a publish. Returns the engine's HTTP status
 * (or 0 on network error) for logging/inspection.
 */
export async function pingIndexNow(urls: string | string[]): Promise<number> {
  const list = (Array.isArray(urls) ? urls : [urls])
    .map(toAbsolute)
    .filter((u, i, a) => u && a.indexOf(u) === i); // de-dupe

  if (list.length === 0) return 0;

  const host = siteHost();
  const payload = {
    host,
    key: INDEXNOW_KEY,
    keyLocation: `https://${host}/${INDEXNOW_KEY}.txt`,
    urlList: list,
  };

  try {
    const res = await fetch("https://api.indexnow.org/indexnow", {
      method: "POST",
      headers: {
        "Content-Type": "application/json; charset=utf-8",
        Accept: "application/json",
      },
      body: JSON.stringify(payload),
    });
    return res.status; // 200/202 = accepted, 403 = key mismatch, 422 = host mismatch
  } catch {
    return 0;
  }
}
