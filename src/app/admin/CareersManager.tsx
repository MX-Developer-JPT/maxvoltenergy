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
  type: "Full Time", experience: "", description: "", color: "#FFD100", published: true,
};
const DEPARTMENTS = ["Engineering", "R&D", "Sales", "Operations", "Business Development", "Quality", "Marketing", "Finance", "HR", "General"];
const TYPES = ["Full Time", "Part Time", "Contract", "Internship"];
const COLORS = ["#FFD100", "#FFA800", "#FF8C00", "#7c3aed", "#f97316", "#ec4899", "#2563eb", "#16a34a"];

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
          <h2 className="text-xl font-black text-[#15171c]">Careers &amp; Job Openings</h2>
          <p className="text-[#71717a] text-sm mt-0.5">Roles published here appear instantly on the public /career page.</p>
        </div>
        <button onClick={openNew} className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#FFD100] text-black font-bold text-sm hover:bg-[#FFA800] transition-all">
          <Plus size={15} /> New Opening
        </button>
      </div>

      {loading ? (
        <div className="p-16 text-center"><Loader2 size={26} className="text-[#D97706] mx-auto animate-spin" /></div>
      ) : jobs.length === 0 ? (
        <div className="p-12 rounded-2xl frosted-card text-center">
          <Briefcase size={30} className="text-[#a1a1aa] mx-auto mb-3" />
          <h3 className="text-[#15171c] font-bold mb-1">No custom openings yet</h3>
          <p className="text-[#71717a] text-sm mb-5">The default roles still show on /career. Add one to publish a new opening.</p>
          <button onClick={openNew} className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#FFD100] text-black font-bold text-sm"><Plus size={14} /> New Opening</button>
        </div>
      ) : (
        <div className="space-y-3">
          {jobs.map((j) => (
            <div key={j.id} className="p-5 rounded-2xl frosted-card flex flex-col md:flex-row md:items-center gap-4">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0" style={{ backgroundColor: `${j.color}14`, border: `1px solid ${j.color}33` }}>
                <Briefcase size={16} style={{ color: j.color }} />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap mb-1">
                  <span className="text-[#15171c] font-bold text-sm">{j.title}</span>
                  <span className="text-[10px] font-bold uppercase tracking-wide px-2 py-0.5 rounded-full bg-[#FFD100]/15 text-[#D97706] border border-[#D97706]/20">{j.department}</span>
                  <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${j.published ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-500"}`}>
                    {j.published ? "Published" : "Draft"}
                  </span>
                </div>
                <div className="flex items-center gap-3 flex-wrap text-[#71717a] text-xs">
                  <span className="flex items-center gap-1"><MapPin size={11} /> {j.location}</span>
                  <span>{j.type}</span>
                  {j.experience && <span>· {j.experience}</span>}
                </div>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <button onClick={() => togglePublish(j)} title={j.published ? "Unpublish" : "Publish"} className="w-9 h-9 rounded-lg border border-black/10 flex items-center justify-center text-[#71717a] hover:text-[#D97706]">{j.published ? <Eye size={14} /> : <EyeOff size={14} />}</button>
                <button onClick={() => openEdit(j)} title="Edit" className="w-9 h-9 rounded-lg border border-black/10 flex items-center justify-center text-[#71717a] hover:text-[#2563eb]"><Pencil size={14} /></button>
                <button onClick={() => del(j)} title="Delete" className="w-9 h-9 rounded-lg border border-black/10 flex items-center justify-center text-[#a1a1aa] hover:text-red-600 hover:border-red-200"><Trash2 size={14} /></button>
              </div>
            </div>
          ))}
        </div>
      )}

      <a href="/career" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-[#D97706] text-xs font-semibold mt-5 hover:underline">
        View public careers page <ExternalLink size={12} />
      </a>

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
                <h3 className="text-lg font-black text-[#15171c]">{editing ? "Edit Opening" : "New Opening"}</h3>
                <button type="button" onClick={() => setShowForm(false)} className="text-[#a1a1aa] hover:text-[#15171c]"><X size={18} /></button>
              </div>

              <div className="space-y-3 overflow-y-auto flex-1 pr-1 -mr-1">
                <Field label="Job title *">
                  <input required value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} className={inputCls} placeholder="e.g. Battery Design Engineer" />
                </Field>
                <div className="grid grid-cols-2 gap-3">
                  <Field label="Department">
                    <select value={form.department} onChange={(e) => setForm({ ...form, department: e.target.value })} className={inputCls}>
                      {DEPARTMENTS.map((c) => <option key={c}>{c}</option>)}
                    </select>
                  </Field>
                  <Field label="Employment type">
                    <select value={form.type} onChange={(e) => setForm({ ...form, type: e.target.value })} className={inputCls}>
                      {TYPES.map((c) => <option key={c}>{c}</option>)}
                    </select>
                  </Field>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <Field label="Location">
                    <input value={form.location} onChange={(e) => setForm({ ...form, location: e.target.value })} className={inputCls} placeholder="Ghaziabad, UP" />
                  </Field>
                  <Field label="Experience">
                    <input value={form.experience} onChange={(e) => setForm({ ...form, experience: e.target.value })} className={inputCls} placeholder="e.g. 3-6 years" />
                  </Field>
                </div>
                <Field label="Description">
                  <textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} rows={4} className={inputCls} placeholder="What the role involves and what you're looking for." />
                </Field>
                <Field label="Accent colour">
                  <div className="flex items-center gap-2 flex-wrap">
                    {COLORS.map((c) => (
                      <button key={c} type="button" onClick={() => setForm({ ...form, color: c })}
                        className="w-7 h-7 rounded-lg transition-transform hover:scale-110"
                        style={{ background: c, outline: form.color === c ? "2px solid #15171c" : "1px solid rgba(0,0,0,0.1)", outlineOffset: 2 }}
                        aria-label={`Colour ${c}`} />
                    ))}
                  </div>
                </Field>
                <label className="flex items-center gap-2 text-sm text-[#15171c] font-medium cursor-pointer">
                  <input type="checkbox" checked={form.published} onChange={(e) => setForm({ ...form, published: e.target.checked })} className="accent-[#D97706] w-4 h-4" />
                  Publish immediately (visible on /career)
                </label>
              </div>

              <div className="flex items-center justify-end gap-3 mt-6 shrink-0 border-t border-black/5 pt-4">
                <button type="button" onClick={() => setShowForm(false)} className="px-5 py-2.5 rounded-xl border border-black/10 text-[#52525b] text-sm font-medium">Cancel</button>
                <button type="submit" disabled={saving} className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#FFD100] text-black font-bold text-sm hover:bg-[#FFA800] disabled:opacity-60">
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

const inputCls = "w-full px-3.5 py-2.5 rounded-xl bg-white border border-black/10 text-[#15171c] text-sm focus:outline-none focus:border-[#D97706]/50";

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="block text-[#52525b] text-xs font-semibold mb-1.5">{label}</label>
      {children}
    </div>
  );
}
