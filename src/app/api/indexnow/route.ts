import { NextRequest, NextResponse } from "next/server";
import { verifySession, SESSION_COOKIE } from "@/lib/auth";
import { pingIndexNow } from "@/lib/indexnow";
import sitemap from "@/app/sitemap";

export const dynamic = "force-dynamic";

// Authorize either via a logged-in admin session, or a shared secret
// (so an external scheduler / build hook can trigger a full resubmit).
async function authorize(req: NextRequest): Promise<boolean> {
  if (await verifySession(req.cookies.get(SESSION_COOKIE)?.value)) return true;
  const secret = process.env.INDEXNOW_TRIGGER_SECRET;
  if (!secret) return false;
  const provided =
    req.headers.get("x-indexnow-secret") ||
    new URL(req.url).searchParams.get("secret");
  return provided === secret;
}

/** Collect every public URL from the generated sitemap. */
function allSiteUrls(): string[] {
  try {
    return sitemap().map((e) => e.url);
  } catch {
    return [];
  }
}

// POST { urls: string[] }  → submit specific URLs
// POST { all: true }       → submit the entire sitemap
export async function POST(req: NextRequest) {
  if (!(await authorize(req))) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  let body: { urls?: string[]; all?: boolean } = {};
  try { body = await req.json(); } catch { /* allow empty body */ }

  const urls = body.all ? allSiteUrls() : body.urls ?? [];
  if (urls.length === 0) {
    return NextResponse.json({ error: "No URLs to submit" }, { status: 400 });
  }

  const status = await pingIndexNow(urls);
  return NextResponse.json({ ok: status >= 200 && status < 300, submitted: urls.length, status });
}

// GET ?all=1&secret=...  → convenience trigger for schedulers / cron
export async function GET(req: NextRequest) {
  if (!(await authorize(req))) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const urls = allSiteUrls();
  const status = await pingIndexNow(urls);
  return NextResponse.json({ ok: status >= 200 && status < 300, submitted: urls.length, status });
}
