// Node-only credential verification with an optional file-backed password
// override. Kept SEPARATE from auth.ts because auth.ts is imported by the
// Edge middleware (which cannot use `fs` / `crypto`). Only Node API routes
// import this module.

import fs from "fs";
import os from "os";
import path from "path";
import crypto from "crypto";

interface AdminCredential {
  username: string;
  salt: string; // hex
  hash: string; // hex (PBKDF2-SHA512)
  updatedAt: number;
}

function resolveFile(): string {
  const primaryDir = path.join(process.cwd(), "data");
  try {
    if (!fs.existsSync(primaryDir)) fs.mkdirSync(primaryDir, { recursive: true });
    fs.accessSync(primaryDir, fs.constants.W_OK);
    return path.join(primaryDir, "admin.json");
  } catch {
    const tmpDir = path.join(os.tmpdir(), "maxvolt-data");
    try { if (!fs.existsSync(tmpDir)) fs.mkdirSync(tmpDir, { recursive: true }); } catch {}
    return path.join(tmpDir, "admin.json");
  }
}

const FILE = resolveFile();

function readOverride(): AdminCredential | null {
  try {
    if (!fs.existsSync(FILE)) return null;
    return JSON.parse(fs.readFileSync(FILE, "utf-8"));
  } catch {
    return null;
  }
}

function writeOverride(cred: AdminCredential) {
  fs.writeFileSync(FILE, JSON.stringify(cred, null, 2), "utf-8");
}

function hashPassword(password: string, salt: string): string {
  return crypto.pbkdf2Sync(password, salt, 120_000, 64, "sha512").toString("hex");
}

/** Constant-time string compare. */
function safeEqual(a: string, b: string): boolean {
  const ba = Buffer.from(a);
  const bb = Buffer.from(b);
  if (ba.length !== bb.length) return false;
  return crypto.timingSafeEqual(ba, bb);
}

export function getAdminUsername(): string {
  const override = readOverride();
  if (override?.username) return override.username;
  return process.env.ADMIN_USERNAME || "admin";
}

/** True if a password has been rotated through the portal (vs. env default). */
export function hasCustomPassword(): boolean {
  return readOverride() !== null;
}

export function lastPasswordChange(): number | null {
  return readOverride()?.updatedAt ?? null;
}

/** Verify a username/password against the override (if set) or env defaults. */
export function verifyCredentials(username: string, password: string): boolean {
  const override = readOverride();
  if (override) {
    if (!safeEqual(username, override.username)) return false;
    const candidate = hashPassword(password, override.salt);
    return safeEqual(candidate, override.hash);
  }
  const u = process.env.ADMIN_USERNAME || "admin";
  const p = process.env.ADMIN_PASSWORD || "Maxvolt@2025!";
  return safeEqual(username, u) && safeEqual(password, p);
}

/**
 * Rotate the admin password. Verifies `currentPassword` first.
 * Returns an error string on failure, or null on success.
 */
export function changePassword(
  currentPassword: string,
  newPassword: string,
  username?: string,
): string | null {
  const user = username || getAdminUsername();
  if (!verifyCredentials(user, currentPassword)) {
    return "Current password is incorrect.";
  }
  if (!newPassword || newPassword.length < 8) {
    return "New password must be at least 8 characters.";
  }
  const salt = crypto.randomBytes(16).toString("hex");
  const hash = hashPassword(newPassword, salt);
  try {
    writeOverride({ username: user, salt, hash, updatedAt: Date.now() });
  } catch {
    return "Could not persist the new password on this host.";
  }
  return null;
}
