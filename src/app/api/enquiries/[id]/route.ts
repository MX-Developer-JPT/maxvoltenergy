import { NextRequest, NextResponse } from "next/server";
import { update, remove, EnquiryStatus } from "@/lib/enquiry-store.server";
import { verifySession, SESSION_COOKIE } from "@/lib/auth";

async function authed(req: NextRequest) {
  return verifySession(req.cookies.get(SESSION_COOKIE)?.value);
}

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  if (!(await authed(req))) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { id } = await params;
  const { status } = await req.json();
  const list = update(id, status as EnquiryStatus);
  return NextResponse.json({ ok: true, enquiries: list });
}

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  if (!(await authed(req))) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { id } = await params;
  const list = remove(id);
  return NextResponse.json({ ok: true, enquiries: list });
}
