import { SignJWT, jwtVerify } from "jose";

const secret = new TextEncoder().encode(
  process.env.AUTH_SECRET || "dev-only-insecure-secret-change-me-please-32chars"
);

export const SESSION_COOKIE = "maxvolt_session";

export async function createSession(username: string): Promise<string> {
  return await new SignJWT({ username, role: "admin" })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("8h")
    .sign(secret);
}

export async function verifySession(token: string | undefined): Promise<boolean> {
  if (!token) return false;
  try {
    await jwtVerify(token, secret);
    return true;
  } catch {
    return false;
  }
}

/** Returns the decoded session payload (username/role) or null. Edge-safe. */
export async function getSession(
  token: string | undefined
): Promise<{ username: string; role: string } | null> {
  if (!token) return null;
  try {
    const { payload } = await jwtVerify(token, secret);
    return { username: String(payload.username || ""), role: String(payload.role || "admin") };
  } catch {
    return null;
  }
}
