import fs from "fs";
import path from "path";

export type EnquiryStatus = "new" | "contacted" | "closed";

export interface Enquiry {
  id: string;
  name: string;
  email: string;
  phone?: string;
  subject?: string;
  message: string;
  inquiryType: string;
  source: string;
  status: EnquiryStatus;
  createdAt: number;
}

import os from "os";

// Resolve a writable location. On serverless/read-only hosts the project dir
// may not be writable, so fall back to the OS temp dir.
function resolveFile(): string {
  const primaryDir = path.join(process.cwd(), "data");
  try {
    if (!fs.existsSync(primaryDir)) fs.mkdirSync(primaryDir, { recursive: true });
    fs.accessSync(primaryDir, fs.constants.W_OK);
    return path.join(primaryDir, "enquiries.json");
  } catch {
    const tmpDir = path.join(os.tmpdir(), "maxvolt-data");
    try { if (!fs.existsSync(tmpDir)) fs.mkdirSync(tmpDir, { recursive: true }); } catch {}
    return path.join(tmpDir, "enquiries.json");
  }
}

const FILE = resolveFile();

function ensure() {
  if (!fs.existsSync(FILE)) {
    try { fs.writeFileSync(FILE, "[]", "utf-8"); } catch {}
  }
}

export function readAll(): Enquiry[] {
  ensure();
  try {
    return JSON.parse(fs.readFileSync(FILE, "utf-8"));
  } catch {
    return [];
  }
}

function writeAll(list: Enquiry[]) {
  ensure();
  try { fs.writeFileSync(FILE, JSON.stringify(list, null, 2), "utf-8"); } catch {}
}

export function create(data: Omit<Enquiry, "id" | "status" | "createdAt">): Enquiry {
  const enquiry: Enquiry = {
    ...data,
    id: `ENQ-${Date.now().toString(36).toUpperCase()}`,
    status: "new",
    createdAt: Date.now(),
  };
  const all = readAll();
  all.unshift(enquiry);
  writeAll(all);
  return enquiry;
}

export function update(id: string, status: EnquiryStatus): Enquiry[] {
  const all = readAll().map((e) => (e.id === id ? { ...e, status } : e));
  writeAll(all);
  return all;
}

export function remove(id: string): Enquiry[] {
  const all = readAll().filter((e) => e.id !== id);
  writeAll(all);
  return all;
}
