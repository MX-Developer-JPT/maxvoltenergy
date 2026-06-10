import { NextResponse } from "next/server";
import { DEALERS } from "@/lib/dealers";

export const runtime = "nodejs";
export const dynamic = "force-static"; // directory is static data — served from the edge/CDN

// Serves the dealer directory as JSON so the ~120KB array stays out of the
// initial /find-dealer client bundle (loaded after first paint).
export async function GET() {
  return NextResponse.json(
    { dealers: DEALERS },
    { headers: { "Cache-Control": "public, max-age=3600, s-maxage=86400, stale-while-revalidate=604800" } }
  );
}
