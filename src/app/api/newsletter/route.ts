import { NextRequest, NextResponse } from "next/server";
import { create } from "@/lib/enquiry-store.server";

export const runtime = "nodejs";

// Public newsletter signup — lands in the admin enquiry inbox as type "newsletter".
export async function POST(req: NextRequest) {
  let body: { email?: string; source?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }
  const email = (body.email || "").trim();
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: "Please enter a valid email address." }, { status: 400 });
  }
  create({
    name: "Newsletter Subscriber",
    email,
    phone: "",
    subject: "Newsletter signup",
    message: "Subscribed to the Maxvolt Energy newsletter.",
    inquiryType: "newsletter",
    source: body.source || "/",
  });
  return NextResponse.json({ ok: true });
}
