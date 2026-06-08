import { NextRequest, NextResponse } from "next/server";
import { createSession, SESSION_COOKIE } from "@/lib/auth";
import { verifyCredentials, getAdminUsername } from "@/lib/credentials.server";

export const runtime = "nodejs";

export async function POST(req: NextRequest) {
  let body: { username?: string; password?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }

  const { username = "", password = "" } = body;

  // small delay to slow brute-force
  await new Promise((r) => setTimeout(r, 400));

  if (!verifyCredentials(username, password)) {
    return NextResponse.json({ error: "Invalid username or password" }, { status: 401 });
  }

  const token = await createSession(getAdminUsername());
  const res = NextResponse.json({ ok: true });
  res.cookies.set(SESSION_COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 8, // 8h
  });
  return res;
}
