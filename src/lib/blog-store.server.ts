import fs from "fs";
import path from "path";

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;        // plain text / simple markdown-ish
  category: string;
  author: string;
  coverImage?: string;    // URL or /images path
  published: boolean;
  createdAt: number;
  updatedAt: number;
}

const DATA_DIR = path.join(process.cwd(), "data");
const FILE = path.join(DATA_DIR, "blog.json");

function ensure() {
  if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR, { recursive: true });
  if (!fs.existsSync(FILE)) fs.writeFileSync(FILE, "[]", "utf-8");
}

export function readAll(): BlogPost[] {
  ensure();
  try { return JSON.parse(fs.readFileSync(FILE, "utf-8")); } catch { return []; }
}

export function readPublished(): BlogPost[] {
  return readAll().filter((p) => p.published).sort((a, b) => b.createdAt - a.createdAt);
}

export function getBySlug(slug: string): BlogPost | undefined {
  return readAll().find((p) => p.slug === slug);
}

function writeAll(list: BlogPost[]) {
  ensure();
  fs.writeFileSync(FILE, JSON.stringify(list, null, 2), "utf-8");
}

function slugify(s: string) {
  return s.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "").slice(0, 80);
}

export function create(data: Partial<BlogPost>): BlogPost {
  const now = Date.now();
  const all = readAll();
  let slug = slugify(data.title || "post");
  if (all.some((p) => p.slug === slug)) slug = `${slug}-${now.toString(36).slice(-4)}`;
  const post: BlogPost = {
    id: `BLOG-${now.toString(36).toUpperCase()}`,
    title: data.title || "Untitled",
    slug,
    excerpt: data.excerpt || "",
    content: data.content || "",
    category: data.category || "News",
    author: data.author || "MaxVolt Energy",
    coverImage: data.coverImage || "",
    published: data.published ?? true,
    createdAt: now,
    updatedAt: now,
  };
  all.unshift(post);
  writeAll(all);
  return post;
}

export function update(id: string, data: Partial<BlogPost>): BlogPost[] {
  const all = readAll().map((p) =>
    p.id === id ? { ...p, ...data, id: p.id, slug: p.slug, updatedAt: Date.now() } : p
  );
  writeAll(all);
  return all;
}

export function remove(id: string): BlogPost[] {
  const all = readAll().filter((p) => p.id !== id);
  writeAll(all);
  return all;
}
