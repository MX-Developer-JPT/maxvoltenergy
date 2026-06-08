import { NextRequest, NextResponse } from "next/server";
import { create, readAll, readEnabled } from "@/lib/cms.server";
import { CMS_COLLECTIONS } from "@/lib/cms-config";
import { verifySession, SESSION_COOKIE } from "@/lib/auth";

export const runtime = "nodejs";

function valid(collection: string) {
  return CMS_COLLECTIONS.includes(collection);
}

// GET: public → enabled records. Admin (valid session) → all records.
export async function GET(req: NextRequest, { params }: { params: Promise<{ collection: string }> }) {
  const { collection } = await params;
  if (!valid(collection)) return NextResponse.json({ error: "Unknown collection" }, { status: 404 });
  const isAdmin = await verifySession(req.cookies.get(SESSION_COOKIE)?.value);
  return NextResponse.json({ records: isAdmin ? readAll(collection) : readEnabled(collection) });
}

// POST: create (admin only)
export async function POST(req: NextRequest, { params }: { params: Promise<{ collection: string }> }) {
  const { collection } = await params;
  if (!valid(collection)) return NextResponse.json({ error: "Unknown collection" }, { status: 404 });
  if (!(await verifySession(req.cookies.get(SESSION_COOKIE)?.value))) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const body = await req.json();
  const record = create(collection, body);
  return NextResponse.json({ ok: true, record, records: readAll(collection) });
}
