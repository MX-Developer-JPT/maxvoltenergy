import { NextRequest, NextResponse } from "next/server";
import { update, remove } from "@/lib/blog-store.server";
import { verifySession, SESSION_COOKIE } from "@/lib/auth";
import { pingIndexNow } from "@/lib/indexnow";

async function authed(req: NextRequest) {
  return verifySession(req.cookies.get(SESSION_COOKIE)?.value);
}

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  if (!(await authed(req))) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { id } = await params;
  const body = await req.json();
  const posts = update(id, body);
  // Re-notify IndexNow when an edited post is live.
  const edited = posts.find((p) => p.id === id);
  if (edited?.published) {
    void pingIndexNow([`/blog/${edited.slug}`, "/blog", "/sitemap.xml"]);
  }
  return NextResponse.json({ ok: true, posts });
}

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  if (!(await authed(req))) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { id } = await params;
  const posts = remove(id);
  return NextResponse.json({ ok: true, posts });
}
