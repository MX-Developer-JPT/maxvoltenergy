"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Plus, Trash2, Pencil, Eye, EyeOff, X, Loader2, FileText, ExternalLink, Save,
} from "lucide-react";

interface BlogPost {
  id: string; title: string; slug: string; excerpt: string; content: string;
  category: string; author: string; coverImage?: string; published: boolean;
  createdAt: number; updatedAt: number;
}

const EMPTY = { title: "", category: "News", excerpt: "", content: "", author: "Maxvolt Energy", coverImage: "", published: true };
const CATEGORIES = ["News", "EV Industry", "Technology", "Product Guide", "Sustainability", "Safety & Compliance", "Solar Energy"];

export default function BlogManager() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<BlogPost | null>(null);
  const [form, setForm] = useState<typeof EMPTY>(EMPTY);
  const [showForm, setShowForm] = useState(false);
  const [saving, setSaving] = useState(false);

  const load = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/blog", { cache: "no-store" });
      if (!res.ok) throw new Error(`Request failed (${res.status})`);
      const data = await res.json();
      setPosts(data.posts || []);
    } catch {
      setPosts([]);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => { load(); }, []);

  const openNew = () => { setEditing(null); setForm(EMPTY); setShowForm(true); };
  const openEdit = (p: BlogPost) => {
    setEditing(p);
    setForm({ title: p.title, category: p.category, excerpt: p.excerpt, content: p.content, author: p.author, coverImage: p.coverImage || "", published: p.published });
    setShowForm(true);
  };

  const save = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    if (editing) {
      const res = await fetch(`/api/blog/${editing.id}`, { method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify(form) });
      const data = await res.json();
      if (data.posts) setPosts(data.posts);
    } else {
      const res = await fetch("/api/blog", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(form) });
      if (res.ok) await load();
    }
    setSaving(false);
    setShowForm(false);
  };

  const togglePublish = async (p: BlogPost) => {
    const res = await fetch(`/api/blog/${p.id}`, { method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ published: !p.published }) });
    const data = await res.json();
    if (data.posts) setPosts(data.posts);
  };

  const del = async (p: BlogPost) => {
    if (!confirm(`Delete "${p.title}"?`)) return;
    const res = await fetch(`/api/blog/${p.id}`, { method: "DELETE" });
    const data = await res.json();
    if (data.posts) setPosts(data.posts);
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-lg font-black text-[#15171c]">Blog Posts</h2>
          <p className="text-[#71717a] text-sm">Create, edit, publish and delete articles shown on the public blog.</p>
        </div>
        <button onClick={openNew} className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#FFD100] text-black font-bold text-sm hover:bg-[#FFA800] transition-all">
          <Plus size={15} /> New Post
        </button>
      </div>

      {loading ? (
        <div className="p-16 text-center"><Loader2 size={26} className="text-[#D97706] mx-auto animate-spin" /></div>
      ) : posts.length === 0 ? (
        <div className="p-12 rounded-2xl frosted-card text-center">
          <FileText size={30} className="text-[#a1a1aa] mx-auto mb-3" />
          <h3 className="text-[#15171c] font-bold mb-1">No posts yet</h3>
          <p className="text-[#71717a] text-sm mb-5">Publish your first article — it appears instantly on /blog.</p>
          <button onClick={openNew} className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#FFD100] text-black font-bold text-sm"><Plus size={14} /> New Post</button>
        </div>
      ) : (
        <div className="space-y-3">
          {posts.map((p) => (
            <div key={p.id} className="p-5 rounded-2xl frosted-card flex flex-col md:flex-row md:items-center gap-4">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap mb-1">
                  <span className="text-[#15171c] font-bold text-sm">{p.title}</span>
                  <span className="text-[10px] font-bold uppercase tracking-wide px-2 py-0.5 rounded-full bg-[#FFD100]/15 text-[#D97706] border border-[#D97706]/20">{p.category}</span>
                  <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${p.published ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-500"}`}>
                    {p.published ? "Published" : "Draft"}
                  </span>
                </div>
                <p className="text-[#52525b] text-sm line-clamp-1">{p.excerpt}</p>
                <div className="text-[#a1a1aa] text-xs mt-1">/{p.slug} · {new Date(p.createdAt).toLocaleDateString()}</div>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <a href={`/blog/${p.slug}`} target="_blank" rel="noopener noreferrer" title="View" className="w-9 h-9 rounded-lg border border-black/10 flex items-center justify-center text-[#71717a] hover:text-[#15171c]"><ExternalLink size={14} /></a>
                <button onClick={() => togglePublish(p)} title={p.published ? "Unpublish" : "Publish"} className="w-9 h-9 rounded-lg border border-black/10 flex items-center justify-center text-[#71717a] hover:text-[#D97706]">{p.published ? <Eye size={14} /> : <EyeOff size={14} />}</button>
                <button onClick={() => openEdit(p)} title="Edit" className="w-9 h-9 rounded-lg border border-black/10 flex items-center justify-center text-[#71717a] hover:text-[#2563eb]"><Pencil size={14} /></button>
                <button onClick={() => del(p)} title="Delete" className="w-9 h-9 rounded-lg border border-black/10 flex items-center justify-center text-[#a1a1aa] hover:text-red-600 hover:border-red-200"><Trash2 size={14} /></button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Editor modal */}
      <AnimatePresence>
        {showForm && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-[120] flex items-start justify-center bg-black/40 backdrop-blur-sm p-4 overflow-y-auto"
            onClick={() => setShowForm(false)}>
            <motion.form
              initial={{ scale: 0.96, y: 16 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.96, y: 16 }}
              onClick={(e) => e.stopPropagation()} onSubmit={save}
              className="bg-white rounded-2xl p-6 max-w-2xl w-full my-8 shadow-2xl max-h-[90vh] flex flex-col"
            >
              <div className="flex items-center justify-between mb-5 shrink-0">
                <h3 className="text-lg font-black text-[#15171c]">{editing ? "Edit Post" : "New Post"}</h3>
                <button type="button" onClick={() => setShowForm(false)} className="text-[#a1a1aa] hover:text-[#15171c]"><X size={18} /></button>
              </div>

              <div className="space-y-3 overflow-y-auto flex-1 pr-1 -mr-1">
                <Field label="Title *">
                  <input required value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} className={inputCls} placeholder="Article headline" />
                </Field>
                <div className="grid grid-cols-2 gap-3">
                  <Field label="Category">
                    <select value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} className={inputCls}>
                      {CATEGORIES.map((c) => <option key={c}>{c}</option>)}
                    </select>
                  </Field>
                  <Field label="Author">
                    <input value={form.author} onChange={(e) => setForm({ ...form, author: e.target.value })} className={inputCls} />
                  </Field>
                </div>
                <Field label="Cover image URL (optional)">
                  <input value={form.coverImage} onChange={(e) => setForm({ ...form, coverImage: e.target.value })} className={inputCls} placeholder="/images/blog/...webp or https://..." />
                </Field>
                <Field label="Excerpt (short summary)">
                  <textarea value={form.excerpt} onChange={(e) => setForm({ ...form, excerpt: e.target.value })} rows={2} className={inputCls} placeholder="One or two sentence summary shown on the blog list." />
                </Field>
                <Field label="Content">
                  <textarea value={form.content} onChange={(e) => setForm({ ...form, content: e.target.value })} rows={8} className={inputCls} placeholder="Full article text. Use blank lines to separate paragraphs." />
                </Field>
                <label className="flex items-center gap-2 text-sm text-[#15171c] font-medium cursor-pointer">
                  <input type="checkbox" checked={form.published} onChange={(e) => setForm({ ...form, published: e.target.checked })} className="accent-[#D97706] w-4 h-4" />
                  Publish immediately (visible on /blog)
                </label>
              </div>

              <div className="flex items-center justify-end gap-3 mt-6 shrink-0 border-t border-black/5 pt-4">
                <button type="button" onClick={() => setShowForm(false)} className="px-5 py-2.5 rounded-xl border border-black/10 text-[#52525b] text-sm font-medium">Cancel</button>
                <button type="submit" disabled={saving} className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#FFD100] text-black font-bold text-sm hover:bg-[#FFA800] disabled:opacity-60">
                  {saving ? <Loader2 size={14} className="animate-spin" /> : <Save size={14} />}
                  {editing ? "Save Changes" : "Publish Post"}
                </button>
              </div>
            </motion.form>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

const inputCls = "w-full px-3.5 py-2.5 rounded-xl bg-white border border-black/10 text-[#15171c] text-sm focus:outline-none focus:border-[#D97706]/50";

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="block text-[#52525b] text-xs font-semibold mb-1.5">{label}</label>
      {children}
    </div>
  );
}
