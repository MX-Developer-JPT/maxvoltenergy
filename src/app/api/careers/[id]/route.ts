import { NextRequest, NextResponse } from "next/server";
import { update, remove } from "@/lib/careers-store.server";
import { verifySession, SESSION_COOKIE } from "@/lib/auth";

export const runtime = "nodejs";

async function authed(req: NextRequest) {
  return verifySession(req.cookies.get(SESSION_COOKIE)?.value);
}

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  if (!(await authed(req))) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { id } = await params;
  const body = await req.json();
  const jobs = update(id, body);
  return NextResponse.json({ ok: true, jobs });
}

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  if (!(await authed(req))) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { id } = await params;
  const jobs = remove(id);
  return NextResponse.json({ ok: true, jobs });
}
