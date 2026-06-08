"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Plus, Trash2, Pencil, Eye, EyeOff, X, Loader2, Briefcase, ExternalLink, Save, MapPin,
} from "lucide-react";

interface JobOpening {
  id: string; title: string; department: string; location: string; type: string;
  experience?: string; description?: string; color: string; published: boolean;
  createdAt: number; updatedAt: number;
}

const EMPTY = {
  title: "", department: "Engineering", location: "Ghaziabad, UP",
  type: "Full Time", experience: "", description: "", color: "#6d5dfc", published: true,
};
const DEPARTMENTS = ["Engineering", "R&D", "Sales", "Operations", "Business Development", "Quality", "Marketing", "Finance", "HR", "General"];
const TYPES = ["Full Time", "Part Time", "Contract", "Internship"];
const COLORS = ["#6d5dfc", "#8b5cf6", "#38bdf8", "#f59e0b", "#f97316", "#ec4899", "#22c55e", "#ef4444"];

export default function CareersManager() {
  const [jobs, setJobs] = useState<JobOpening[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<JobOpening | null>(null);
  const [form, setForm] = useState<typeof EMPTY>(EMPTY);
  const [showForm, setShowForm] = useState(false);
  const [saving, setSaving] = useState(false);

  const load = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/careers", { cache: "no-store" });
      if (!res.ok) throw new Error(`Request failed (${res.status})`);
      const data = await res.json();
      setJobs(data.jobs || []);
    } catch {
      setJobs([]);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => { load(); }, []);

  const openNew = () => { setEditing(null); setForm(EMPTY); setShowForm(true); };
  const openEdit = (j: JobOpening) => {
    setEditing(j);
    setForm({
      title: j.title, department: j.department, location: j.location, type: j.type,
      experience: j.experience || "", description: j.description || "", color: j.color, published: j.published,
    });
    setShowForm(true);
  };

  const save = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    if (editing) {
      const res = await fetch(`/api/careers/${editing.id}`, { method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify(form) });
      const data = await res.json();
      if (data.jobs) setJobs(data.jobs);
    } else {
      const res = await fetch("/api/careers", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(form) });
      if (res.ok) await load();
    }
    setSaving(false);
    setShowForm(false);
  };

  const togglePublish = async (j: JobOpening) => {
    const res = await fetch(`/api/careers/${j.id}`, { method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ published: !j.published }) });
    const data = await res.json();
    if (data.jobs) setJobs(data.jobs);
  };

  const del = async (j: JobOpening) => {
    if (!confirm(`Delete the "${j.title}" opening?`)) return;
    const res = await fetch(`/api/careers/${j.id}`, { method: "DELETE" });
    const data = await res.json();
    if (data.jobs) setJobs(data.jobs);
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-black" style={{ color: "var(--a-text)" }}>Manage Careers</h1>
          <p className="text-sm mt-0.5" style={{ color: "var(--a-text-dim)" }}>Roles published here appear instantly on the public /career page.</p>
        </div>
        <button onClick={openNew} className="admin-btn-primary"><Plus size={15} /> Add New Opening</button>
      </div>

      {loading ? (
        <div className="p-16 text-center"><Loader2 size={26} className="mx-auto animate-spin" style={{ color: "var(--a-primary)" }} /></div>
      ) : jobs.length === 0 ? (
        <div className="admin-card p-12 text-center">
          <Briefcase size={30} className="mx-auto mb-3" style={{ color: "var(--a-text-mute)" }} />
          <h3 className="font-bold mb-1" style={{ color: "var(--a-text)" }}>No custom openings yet</h3>
          <p className="text-sm mb-5" style={{ color: "var(--a-text-dim)" }}>The default roles still show on /career. Add one to publish a new opening.</p>
          <button onClick={openNew} className="admin-btn-primary mx-auto"><Plus size={14} /> Add New Opening</button>
        </div>
      ) : (
        <div className="space-y-3">
          {jobs.map((j) => (
            <div key={j.id} className="admin-card p-5 flex flex-col md:flex-row md:items-center gap-4">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0" style={{ backgroundColor: `${j.color}1f`, border: `1px solid ${j.color}40` }}>
                <Briefcase size={16} style={{ color: j.color }} />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap mb-1">
                  <span className="font-bold text-sm" style={{ color: "var(--a-text)" }}>{j.title}</span>
                  <span className="text-[10px] font-bold uppercase tracking-wide px-2 py-0.5 rounded-full" style={{ background: "rgba(109,93,252,0.15)", color: "var(--a-primary-2)", border: "1px solid rgba(109,93,252,0.3)" }}>{j.department}</span>
                  <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full" style={j.published ? { background: "rgba(34,197,94,0.15)", color: "var(--a-green)" } : { background: "var(--a-off)", color: "var(--a-text-mute)" }}>
                    {j.published ? "Published" : "Draft"}
                  </span>
                </div>
                <div className="flex items-center gap-3 flex-wrap text-xs" style={{ color: "var(--a-text-dim)" }}>
                  <span className="flex items-center gap-1"><MapPin size={11} /> {j.location}</span>
                  <span>{j.type}</span>
                  {j.experience && <span>· {j.experience}</span>}
                </div>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <button onClick={() => togglePublish(j)} title={j.published ? "Unpublish" : "Publish"} className="w-9 h-9 rounded-lg flex items-center justify-center" style={{ border: "1px solid var(--a-border)", color: "var(--a-primary-2)" }}>{j.published ? <Eye size={14} /> : <EyeOff size={14} />}</button>
                <button onClick={() => openEdit(j)} title="Edit" className="w-9 h-9 rounded-lg flex items-center justify-center" style={{ border: "1px solid var(--a-border)", color: "var(--a-amber)" }}><Pencil size={14} /></button>
                <button onClick={() => del(j)} title="Delete" className="w-9 h-9 rounded-lg flex items-center justify-center" style={{ border: "1px solid var(--a-border)", color: "var(--a-red)" }}><Trash2 size={14} /></button>
              </div>
            </div>
          ))}
        </div>
      )}

      <a href="/career" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-xs font-semibold mt-5 hover:underline" style={{ color: "var(--a-link)" }}>
        View public careers page <ExternalLink size={12} />
      </a>

      {/* Editor modal */}
      <AnimatePresence>
        {showForm && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-[120] flex items-start justify-center bg-black/55 backdrop-blur-sm p-4 overflow-y-auto"
            onClick={() => setShowForm(false)}>
            <motion.form
              initial={{ scale: 0.96, y: 16 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.96, y: 16 }}
              onClick={(e) => e.stopPropagation()} onSubmit={save}
              className="admin-card my-8 w-full max-w-2xl p-6 max-h-[90vh] flex flex-col"
            >
              <div className="flex items-center justify-between mb-5 shrink-0">
                <h3 className="text-lg font-black" style={{ color: "var(--a-text)" }}>{editing ? "Edit Opening" : "New Opening"}</h3>
                <button type="button" onClick={() => setShowForm(false)} style={{ color: "var(--a-text-mute)" }}><X size={18} /></button>
              </div>

              <div className="space-y-3 overflow-y-auto admin-scroll flex-1 pr-1 -mr-1">
                <Field label="Job title *">
                  <input required value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} className="admin-input" placeholder="e.g. Battery Design Engineer" />
                </Field>
                <div className="grid grid-cols-2 gap-3">
                  <Field label="Department">
                    <select value={form.department} onChange={(e) => setForm({ ...form, department: e.target.value })} className="admin-input">
                      {DEPARTMENTS.map((c) => <option key={c}>{c}</option>)}
                    </select>
                  </Field>
                  <Field label="Employment type">
                    <select value={form.type} onChange={(e) => setForm({ ...form, type: e.target.value })} className="admin-input">
                      {TYPES.map((c) => <option key={c}>{c}</option>)}
                    </select>
                  </Field>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <Field label="Location">
                    <input value={form.location} onChange={(e) => setForm({ ...form, location: e.target.value })} className="admin-input" placeholder="Ghaziabad, UP" />
                  </Field>
                  <Field label="Experience">
                    <input value={form.experience} onChange={(e) => setForm({ ...form, experience: e.target.value })} className="admin-input" placeholder="e.g. 3-6 years" />
                  </Field>
                </div>
                <Field label="Description">
                  <textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} rows={4} className="admin-input resize-y" placeholder="What the role involves and what you're looking for." />
                </Field>
                <Field label="Accent colour">
                  <div className="flex items-center gap-2 flex-wrap">
                    {COLORS.map((c) => (
                      <button key={c} type="button" onClick={() => setForm({ ...form, color: c })}
                        className="w-7 h-7 rounded-lg transition-transform hover:scale-110"
                        style={{ background: c, outline: form.color === c ? "2px solid var(--a-text)" : "1px solid var(--a-border)", outlineOffset: 2 }}
                        aria-label={`Colour ${c}`} />
                    ))}
                  </div>
                </Field>
                <label className="flex items-center gap-3 cursor-pointer">
                  <div className="admin-toggle" data-on={form.published} onClick={() => setForm({ ...form, published: !form.published })} role="switch" aria-checked={form.published} />
                  <span className="text-sm font-medium" style={{ color: "var(--a-text)" }}>Publish immediately (visible on /career)</span>
                </label>
              </div>

              <div className="flex items-center justify-end gap-3 mt-6 shrink-0 pt-4" style={{ borderTop: "1px solid var(--a-border)" }}>
                <button type="button" onClick={() => setShowForm(false)} className="admin-btn-ghost">Cancel</button>
                <button type="submit" disabled={saving} className="admin-btn-primary disabled:opacity-60">
                  {saving ? <Loader2 size={14} className="animate-spin" /> : <Save size={14} />}
                  {editing ? "Save Changes" : "Publish Opening"}
                </button>
              </div>
            </motion.form>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="block text-xs font-semibold mb-1.5" style={{ color: "var(--a-text-dim)" }}>{label}</label>
      {children}
    </div>
  );
}
