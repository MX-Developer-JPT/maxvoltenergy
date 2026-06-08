import fs from "fs";
import os from "os";
import path from "path";
import { CMS_SEEDS, type SeedRecord } from "@/lib/cms-seeds";
import { CMS_COLLECTIONS } from "@/lib/cms-config";

export interface CmsRecord {
  id: string;
  order: number;
  enabled: boolean;
  createdAt: number;
  updatedAt: number;
  [key: string]: unknown;
}

// Resolve a writable directory for the CMS data files.
function resolveDir(): string {
  const primaryDir = path.join(process.cwd(), "data", "cms");
  try {
    fs.mkdirSync(primaryDir, { recursive: true });
    fs.accessSync(primaryDir, fs.constants.W_OK);
    return primaryDir;
  } catch {
    const tmpDir = path.join(os.tmpdir(), "maxvolt-data", "cms");
    try { fs.mkdirSync(tmpDir, { recursive: true }); } catch {}
    return tmpDir;
  }
}

const DIR = resolveDir();

function fileFor(collection: string): string {
  return path.join(DIR, `${collection}.json`);
}

function isValid(collection: string): boolean {
  return CMS_COLLECTIONS.includes(collection);
}

function genId(collection: string): string {
  const prefix = collection.replace(/[^a-z]/gi, "").slice(0, 4).toUpperCase() || "CMS";
  return `${prefix}-${Date.now().toString(36).toUpperCase()}-${Math.random().toString(36).slice(2, 5).toUpperCase()}`;
}

function seedFor(collection: string): CmsRecord[] {
  const seeds: SeedRecord[] = CMS_SEEDS[collection] || [];
  const now = Date.now();
  return seeds.map((s, i) => ({
    id: `SEED-${collection}-${i + 1}`,
    order: typeof s.order === "number" ? s.order : i + 1,
    enabled: s.enabled ?? true,
    createdAt: now - (seeds.length - i) * 1000,
    updatedAt: now,
    ...s,
  }));
}

function writeAll(collection: string, list: CmsRecord[]) {
  try { fs.writeFileSync(fileFor(collection), JSON.stringify(list, null, 2), "utf-8"); } catch {}
}

/** Read all records for a collection, seeding the file on first access. */
export function readAll(collection: string): CmsRecord[] {
  if (!isValid(collection)) return [];
  const file = fileFor(collection);
  if (!fs.existsSync(file)) {
    const seeded = seedFor(collection);
    writeAll(collection, seeded);
    return sortRecords(seeded);
  }
  try {
    return sortRecords(JSON.parse(fs.readFileSync(file, "utf-8")));
  } catch {
    return [];
  }
}

export function readEnabled(collection: string): CmsRecord[] {
  return readAll(collection).filter((r) => r.enabled);
}

function sortRecords(list: CmsRecord[]): CmsRecord[] {
  return [...list].sort((a, b) => (a.order ?? 0) - (b.order ?? 0) || b.createdAt - a.createdAt);
}

export function create(collection: string, data: Record<string, unknown>): CmsRecord | null {
  if (!isValid(collection)) return null;
  const all = readAll(collection);
  const now = Date.now();
  const maxOrder = all.reduce((m, r) => Math.max(m, r.order ?? 0), 0);
  const record: CmsRecord = {
    ...data,
    id: genId(collection),
    order: typeof data.order === "number" ? data.order : maxOrder + 1,
    enabled: data.enabled === undefined ? true : Boolean(data.enabled),
    createdAt: now,
    updatedAt: now,
  };
  all.push(record);
  writeAll(collection, all);
  return record;
}

export function update(collection: string, id: string, patch: Record<string, unknown>): CmsRecord[] {
  if (!isValid(collection)) return [];
  // Never allow these to be overwritten from the client payload.
  const { id: _i, createdAt: _c, ...safe } = patch;
  const all = readAll(collection).map((r) =>
    r.id === id ? { ...r, ...safe, id: r.id, createdAt: r.createdAt, updatedAt: Date.now() } : r
  );
  writeAll(collection, all);
  return sortRecords(all);
}

export function remove(collection: string, id: string): CmsRecord[] {
  if (!isValid(collection)) return [];
  const all = readAll(collection).filter((r) => r.id !== id);
  writeAll(collection, all);
  return sortRecords(all);
}
