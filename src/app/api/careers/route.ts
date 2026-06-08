import { NextRequest, NextResponse } from "next/server";
import { create, readAll, readPublished } from "@/lib/careers-store.server";
import { verifySession, SESSION_COOKIE } from "@/lib/auth";

export const runtime = "nodejs";

// GET: public → published openings. Admin (valid session) → all openings.
export async function GET(req: NextRequest) {
  const isAdmin = await verifySession(req.cookies.get(SESSION_COOKIE)?.value);
  return NextResponse.json({ jobs: isAdmin ? readAll() : readPublished() });
}

// POST: create (admin only)
export async function POST(req: NextRequest) {
  if (!(await verifySession(req.cookies.get(SESSION_COOKIE)?.value))) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const body = await req.json();
  if (!body.title) return NextResponse.json({ error: "Title required" }, { status: 400 });
  const job = create(body);
  return NextResponse.json({ ok: true, job });
}
