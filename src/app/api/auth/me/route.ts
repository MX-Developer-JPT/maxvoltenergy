import { NextRequest, NextResponse } from "next/server";
import { getSession, SESSION_COOKIE } from "@/lib/auth";
import { hasCustomPassword, lastPasswordChange } from "@/lib/credentials.server";

export const runtime = "nodejs";

// Returns the current admin session identity + password posture.
export async function GET(req: NextRequest) {
  const session = await getSession(req.cookies.get(SESSION_COOKIE)?.value);
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  return NextResponse.json({
    username: session.username,
    role: session.role,
    customPassword: hasCustomPassword(),
    lastPasswordChange: lastPasswordChange(),
  });
}
