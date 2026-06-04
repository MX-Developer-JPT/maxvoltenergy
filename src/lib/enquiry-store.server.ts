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

const DATA_DIR = path.join(process.cwd(), "data");
const FILE = path.join(DATA_DIR, "enquiries.json");

function ensure() {
  if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR, { recursive: true });
  if (!fs.existsSync(FILE)) fs.writeFileSync(FILE, "[]", "utf-8");
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
  fs.writeFileSync(FILE, JSON.stringify(list, null, 2), "utf-8");
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
