import fs from "fs";
import os from "os";
import path from "path";

export interface JobOpening {
  id: string;
  title: string;
  department: string;
  location: string;
  type: string;          // Full Time | Part Time | Contract | Internship
  experience?: string;   // e.g. "2-4 years"
  description?: string;
  color: string;         // accent hex for the card icon
  published: boolean;
  createdAt: number;
  updatedAt: number;
}

// Resolve a writable location. On serverless/read-only hosts the project dir
// may not be writable, so fall back to the OS temp dir.
function resolveFile(): string {
  const primaryDir = path.join(process.cwd(), "data");
  try {
    if (!fs.existsSync(primaryDir)) fs.mkdirSync(primaryDir, { recursive: true });
    fs.accessSync(primaryDir, fs.constants.W_OK);
    return path.join(primaryDir, "careers.json");
  } catch {
    const tmpDir = path.join(os.tmpdir(), "maxvolt-data");
    try { if (!fs.existsSync(tmpDir)) fs.mkdirSync(tmpDir, { recursive: true }); } catch {}
    return path.join(tmpDir, "careers.json");
  }
}

const FILE = resolveFile();

function ensure() {
  if (!fs.existsSync(FILE)) {
    try { fs.writeFileSync(FILE, "[]", "utf-8"); } catch {}
  }
}

export function readAll(): JobOpening[] {
  ensure();
  try { return JSON.parse(fs.readFileSync(FILE, "utf-8")); } catch { return []; }
}

export function readPublished(): JobOpening[] {
  return readAll().filter((j) => j.published).sort((a, b) => b.createdAt - a.createdAt);
}

function writeAll(list: JobOpening[]) {
  ensure();
  try { fs.writeFileSync(FILE, JSON.stringify(list, null, 2), "utf-8"); } catch {}
}

const PALETTE = ["#FFD100", "#FFA800", "#FF8C00", "#7c3aed", "#f97316", "#ec4899", "#2563eb", "#16a34a"];

export function create(data: Partial<JobOpening>): JobOpening {
  const now = Date.now();
  const all = readAll();
  const job: JobOpening = {
    id: `JOB-${now.toString(36).toUpperCase()}`,
    title: data.title || "Untitled Role",
    department: data.department || "General",
    location: data.location || "Ghaziabad, UP",
    type: data.type || "Full Time",
    experience: data.experience || "",
    description: data.description || "",
    color: data.color || PALETTE[all.length % PALETTE.length],
    published: data.published ?? true,
    createdAt: now,
    updatedAt: now,
  };
  all.unshift(job);
  writeAll(all);
  return job;
}

export function update(id: string, data: Partial<JobOpening>): JobOpening[] {
  const all = readAll().map((j) =>
    j.id === id ? { ...j, ...data, id: j.id, updatedAt: Date.now() } : j
  );
  writeAll(all);
  return all;
}

export function remove(id: string): JobOpening[] {
  const all = readAll().filter((j) => j.id !== id);
  writeAll(all);
  return all;
}
