import { NextRequest, NextResponse } from "next/server";
import { create, readAll } from "@/lib/enquiry-store.server";
import { verifySession, SESSION_COOKIE } from "@/lib/auth";

// Public: submit an enquiry
export async function POST(req: NextRequest) {
  let body: Record<string, string>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }
  if (!body.name || !body.email || !body.message) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
  }
  const enquiry = create({
    name: body.name,
    email: body.email,
    phone: body.phone || "",
    subject: body.subject || "",
    message: body.message,
    inquiryType: body.inquiryType || "general",
    source: body.source || "/",
  });
  return NextResponse.json({ ok: true, id: enquiry.id });
}

// Protected: list all enquiries (admin only)
export async function GET(req: NextRequest) {
  const token = req.cookies.get(SESSION_COOKIE)?.value;
  if (!(await verifySession(token))) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  return NextResponse.json({ enquiries: readAll() });
}
