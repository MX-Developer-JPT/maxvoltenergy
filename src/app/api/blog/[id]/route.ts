import { NextRequest, NextResponse } from "next/server";
import { update, remove } from "@/lib/blog-store.server";
import { verifySession, SESSION_COOKIE } from "@/lib/auth";

async function authed(req: NextRequest) {
  return verifySession(req.cookies.get(SESSION_COOKIE)?.value);
}

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  if (!(await authed(req))) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { id } = await params;
  const body = await req.json();
  const posts = update(id, body);
  return NextResponse.json({ ok: true, posts });
}

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  if (!(await authed(req))) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { id } = await params;
  const posts = remove(id);
  return NextResponse.json({ ok: true, posts });
}
