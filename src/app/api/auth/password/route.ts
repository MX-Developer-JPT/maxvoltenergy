import { NextRequest, NextResponse } from "next/server";
import { getSession, SESSION_COOKIE } from "@/lib/auth";
import { changePassword } from "@/lib/credentials.server";

export const runtime = "nodejs";

// Rotate the admin password. Requires a valid session and the current password.
export async function POST(req: NextRequest) {
  const session = await getSession(req.cookies.get(SESSION_COOKIE)?.value);
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  let body: { currentPassword?: string; newPassword?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }

  const error = changePassword(
    body.currentPassword || "",
    body.newPassword || "",
    session.username || undefined,
  );
  if (error) return NextResponse.json({ error }, { status: 400 });
  return NextResponse.json({ ok: true });
}
