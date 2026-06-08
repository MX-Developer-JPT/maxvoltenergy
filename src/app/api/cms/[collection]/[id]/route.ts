import { NextRequest, NextResponse } from "next/server";
import { update, remove } from "@/lib/cms.server";
import { CMS_COLLECTIONS } from "@/lib/cms-config";
import { verifySession, SESSION_COOKIE } from "@/lib/auth";

export const runtime = "nodejs";

function valid(collection: string) {
  return CMS_COLLECTIONS.includes(collection);
}

async function authed(req: NextRequest) {
  return verifySession(req.cookies.get(SESSION_COOKIE)?.value);
}

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ collection: string; id: string }> }) {
  const { collection, id } = await params;
  if (!valid(collection)) return NextResponse.json({ error: "Unknown collection" }, { status: 404 });
  if (!(await authed(req))) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const body = await req.json();
  const records = update(collection, id, body);
  return NextResponse.json({ ok: true, records });
}

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ collection: string; id: string }> }) {
  const { collection, id } = await params;
  if (!valid(collection)) return NextResponse.json({ error: "Unknown collection" }, { status: 404 });
  if (!(await authed(req))) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const records = remove(collection, id);
  return NextResponse.json({ ok: true, records });
}
