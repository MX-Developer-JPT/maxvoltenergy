import { NextRequest, NextResponse } from "next/server";
import { create, readAll, readPublished } from "@/lib/blog-store.server";
import { verifySession, SESSION_COOKIE } from "@/lib/auth";

// GET: public → published posts. Admin (with valid session) → all posts.
export async function GET(req: NextRequest) {
  const isAdmin = await verifySession(req.cookies.get(SESSION_COOKIE)?.value);
  return NextResponse.json({ posts: isAdmin ? readAll() : readPublished() });
}

// POST: create (admin only)
export async function POST(req: NextRequest) {
  if (!(await verifySession(req.cookies.get(SESSION_COOKIE)?.value))) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const body = await req.json();
  if (!body.title) return NextResponse.json({ error: "Title required" }, { status: 400 });
  const post = create(body);
  return NextResponse.json({ ok: true, post });
}
