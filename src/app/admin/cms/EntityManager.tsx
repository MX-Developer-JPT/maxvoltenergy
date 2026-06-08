"use client";

import { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Plus, Pencil, Trash2, X, Loader2, Check, Search, Save, ExternalLink, ImageOff,
} from "lucide-react";
import { CMS_ENTITIES, type CmsColumn, type CmsField } from "@/lib/cms-config";

type Rec = Record<string, unknown> & { id: string; order: number; enabled: boolean };

export default function EntityManager({ collection }: { collection: string }) {
  const entity = CMS_ENTITIES[collection];
  const [records, setRecords] = useState<Rec[]>([]);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState<Rec | null>(null);
  const [form, setForm] = useState<Record<string, unknown>>({});
  const [saving, setSaving] = useState(false);
  const [orderDraft, setOrderDraft] = useState<Record<string, number>>({});

  const load = async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/cms/${collection}`, { cache: "no-store" });
      const data = await res.json();
      setRecords(data.records || []);
    } catch {
      setRecords([]);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => { load(); /* eslint-disable-next-line */ }, [collection]);

  const patch = async (id: string, body: Record<string, unknown>) => {
    const res = await fetch(`/api/cms/${collection}/${id}`, {
      method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify(body),
    });
    const data = await res.json();
    if (data.records) setRecords(data.records);
  };

  const del = async (r: Rec) => {
    const name = String(r[entity.titleKey] ?? "this item");
    if (!confirm(`Delete "${name}"? This cannot be undone.`)) return;
    const res = await fetch(`/api/cms/${collection}/${r.id}`, { method: "DELETE" });
    const data = await res.json();
    if (data.records) setRecords(data.records);
  };

  const openNew = () => {
    setEditing(null);
    const init: Record<string, unknown> = {};
    entity.fields.forEach((f) => {
      init[f.key] = f.type === "toggle" ? (f.key === "enabled" || f.key === "indexFollow") : f.type === "number" ? (records.length + 1) : "";
    });
    setForm(init);
    setShowForm(true);
  };
  const openEdit = (r: Rec) => {
    setEditing(r);
    const init: Record<string, unknown> = {};
    entity.fields.forEach((f) => { init[f.key] = r[f.key] ?? (f.type === "toggle" ? false : ""); });
    setForm(init);
    setShowForm(true);
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      if (editing) {
        await patch(editing.id, form);
      } else {
        const res = await fetch(`/api/cms/${collection}`, {
          method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(form),
        });
        const data = await res.json();
        if (data.records) setRecords(data.records);
      }
      setShowForm(false);
    } finally {
      setSaving(false);
    }
  };

  const filtered = useMemo(() => {
    const q = query.toLowerCase().trim();
    if (!q) return records;
    return records.filter((r) =>
      entity.columns.some((c) => String(r[c.key] ?? "").toLowerCase().includes(q)) ||
      String(r[entity.titleKey] ?? "").toLowerCase().includes(q)
    );
  }, [records, query, entity]);

  if (!entity) return <div className="text-[var(--a-text-dim)]">Unknown collection.</div>;

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between gap-4 mb-6 flex-wrap">
        <div>
          <h1 className="text-2xl font-black" style={{ color: "var(--a-text)" }}>{entity.label}</h1>
          <p className="text-sm mt-0.5" style={{ color: "var(--a-text-dim)" }}>
            {records.length} {records.length === 1 ? "entry" : "entries"} · changes save instantly.
          </p>
        </div>
        <button onClick={openNew} className="admin-btn-primary">
          <Plus size={16} /> Add New {entity.singular}
        </button>
      </div>

      {/* Search */}
      {records.length > 6 && (
        <div className="relative mb-4 max-w-sm">
          <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2" style={{ color: "var(--a-text-mute)" }} />
          <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder={`Search ${entity.label.replace("Manage ", "").toLowerCase()}…`} className="admin-input pl-10" />
        </div>
      )}

      {/* Table */}
      <div className="admin-card overflow-hidden">
        <div className="overflow-x-auto admin-scroll">
          <table className="w-full text-sm" style={{ minWidth: 720 }}>
            <thead>
              <tr style={{ borderBottom: "1px solid var(--a-border)" }}>
                <Th>#</Th>
                {entity.columns.map((c) => <Th key={c.key}>{c.label}</Th>)}
                <Th className="text-right pr-6">Actions</Th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr><td colSpan={entity.columns.length + 2} className="py-16 text-center">
                  <Loader2 size={26} className="animate-spin mx-auto" style={{ color: "var(--a-primary)" }} />
                </td></tr>
              ) : filtered.length === 0 ? (
                <tr><td colSpan={entity.columns.length + 2} className="py-14 text-center" style={{ color: "var(--a-text-mute)" }}>
                  No entries yet. Click “Add New {entity.singular}”.
                </td></tr>
              ) : (
                <AnimatePresence initial={false}>
                  {filtered.map((r, i) => (
                    <motion.tr key={r.id} layout
                      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                      style={{ borderBottom: "1px solid var(--a-border)", background: i % 2 ? "var(--a-row-alt)" : "transparent" }}>
                      <Td className="tabular-nums" style={{ color: "var(--a-text-mute)" }}>{i + 1}</Td>
                      {entity.columns.map((c) => (
                        <Td key={c.key}>
                          <Cell col={c} row={r}
                            onToggle={(val) => patch(r.id, { [c.key]: val })}
                            orderDraft={orderDraft[r.id]}
                            onOrderInput={(v) => setOrderDraft((d) => ({ ...d, [r.id]: v }))}
                            onOrderCommit={() => {
                              const v = orderDraft[r.id];
                              if (typeof v === "number" && v !== r.order) patch(r.id, { order: v });
                            }}
                          />
                        </Td>
                      ))}
                      <Td className="text-right pr-5">
                        <div className="inline-flex items-center gap-1.5">
                          <button onClick={() => openEdit(r)} title="Edit"
                            className="w-8 h-8 rounded-lg flex items-center justify-center transition-colors"
                            style={{ border: "1px solid var(--a-border)", color: "var(--a-amber)" }}>
                            <Pencil size={14} />
                          </button>
                          <button onClick={() => del(r)} title="Delete"
                            className="w-8 h-8 rounded-lg flex items-center justify-center transition-colors"
                            style={{ border: "1px solid var(--a-border)", color: "var(--a-red)" }}>
                            <Trash2 size={14} />
                          </button>
                        </div>
                      </Td>
                    </motion.tr>
                  ))}
                </AnimatePresence>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Editor modal */}
      <AnimatePresence>
        {showForm && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-[120] flex items-start justify-center bg-black/55 backdrop-blur-sm p-4 overflow-y-auto"
            onClick={() => setShowForm(false)}>
            <motion.form
              initial={{ scale: 0.96, y: 16 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.96, y: 16 }}
              onClick={(e) => e.stopPropagation()} onSubmit={submit}
              className="admin-card my-8 w-full max-w-2xl p-6 max-h-[90vh] flex flex-col"
              style={{ background: "var(--a-card)" }}
            >
              <div className="flex items-center justify-between mb-5 shrink-0">
                <h3 className="text-lg font-black" style={{ color: "var(--a-text)" }}>
                  {editing ? `Edit ${entity.singular}` : `Add New ${entity.singular}`}
                </h3>
                <button type="button" onClick={() => setShowForm(false)} style={{ color: "var(--a-text-mute)" }}><X size={18} /></button>
              </div>

              <div className="grid grid-cols-2 gap-3 overflow-y-auto admin-scroll flex-1 pr-1 -mr-1">
                {entity.fields.map((f) => (
                  <div key={f.key} className={f.full || f.type === "textarea" ? "col-span-2" : "col-span-2 sm:col-span-1"}>
                    <FieldInput field={f} value={form[f.key]} onChange={(v) => setForm((s) => ({ ...s, [f.key]: v }))} />
                  </div>
                ))}
              </div>

              <div className="flex items-center justify-end gap-3 mt-6 shrink-0 pt-4" style={{ borderTop: "1px solid var(--a-border)" }}>
                <button type="button" onClick={() => setShowForm(false)} className="admin-btn-ghost">Cancel</button>
                <button type="submit" disabled={saving} className="admin-btn-primary disabled:opacity-60">
                  {saving ? <Loader2 size={15} className="animate-spin" /> : <Save size={15} />}
                  {editing ? "Save Changes" : `Add ${entity.singular}`}
                </button>
              </div>
            </motion.form>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ---------- table cell renderer ---------- */
function Cell({ col, row, onToggle, orderDraft, onOrderInput, onOrderCommit }: {
  col: CmsColumn; row: Rec; onToggle: (v: boolean) => void;
  orderDraft?: number; onOrderInput: (v: number) => void; onOrderCommit: () => void;
}) {
  const value = row[col.key];

  switch (col.type) {
    case "toggle":
      return (
        <div className="admin-toggle" data-on={Boolean(value)} role="switch" aria-checked={Boolean(value)}
          onClick={() => onToggle(!value)} />
      );
    case "order":
      return (
        <input
          type="number"
          value={orderDraft ?? (typeof value === "number" ? value : 0)}
          onChange={(e) => onOrderInput(Number(e.target.value))}
          onBlur={onOrderCommit}
          onKeyDown={(e) => { if (e.key === "Enter") (e.target as HTMLInputElement).blur(); }}
          className="admin-input w-16 px-2 py-1.5 text-center"
        />
      );
    case "meta": {
      const has = Boolean(row[col.metaSource || "metaTitle"]);
      return has
        ? <span className="inline-flex w-5 h-5 rounded-full items-center justify-center" style={{ background: "rgba(34,197,94,0.15)", color: "var(--a-green)" }}><Check size={12} /></span>
        : <span className="inline-flex w-5 h-5 rounded-full items-center justify-center" style={{ background: "rgba(239,68,68,0.15)", color: "var(--a-red)" }}><X size={12} /></span>;
    }
    case "date":
      return <span style={{ color: "var(--a-green)" }}>{value ? new Date(String(value)).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" }) : "—"}</span>;
    case "badge":
      return value ? <span className="px-2 py-0.5 rounded-full text-xs font-semibold" style={{ background: "var(--a-card-2)", border: "1px solid var(--a-border)", color: "var(--a-text-dim)" }}>{String(value)}</span> : <span style={{ color: "var(--a-text-mute)" }}>—</span>;
    case "image":
      return value
        ? <img src={String(value)} alt="" className="w-12 h-12 rounded-lg object-cover" style={{ border: "1px solid var(--a-border)", background: "#fff" }} />
        : <span className="inline-flex w-12 h-12 rounded-lg items-center justify-center" style={{ border: "1px dashed var(--a-border)", color: "var(--a-text-mute)" }}><ImageOff size={16} /></span>;
    case "link": {
      const href = col.linkBase ? `${col.linkBase}/${value}` : String(value || "");
      if (!value) return <span style={{ color: "var(--a-text-mute)" }}>—</span>;
      return (
        <a href={href} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 hover:underline break-all" style={{ color: "var(--a-link)" }}>
          {String(value)} <ExternalLink size={11} className="shrink-0" />
        </a>
      );
    }
    default:
      return <span style={{ color: "var(--a-text)" }} className="font-medium">{value ? String(value) : <span style={{ color: "var(--a-text-mute)" }}>—</span>}</span>;
  }
}

/* ---------- form field renderer ---------- */
function FieldInput({ field, value, onChange }: { field: CmsField; value: unknown; onChange: (v: unknown) => void }) {
  if (field.type === "toggle") {
    return (
      <label className="flex items-center gap-3 cursor-pointer py-1.5">
        <div className="admin-toggle" data-on={Boolean(value)} onClick={() => onChange(!value)} role="switch" aria-checked={Boolean(value)} />
        <span className="text-sm font-medium" style={{ color: "var(--a-text)" }}>{field.label}</span>
      </label>
    );
  }
  return (
    <div>
      <label className="block text-xs font-semibold mb-1.5" style={{ color: "var(--a-text-dim)" }}>
        {field.label}{field.required && <span style={{ color: "var(--a-red)" }}> *</span>}
      </label>
      {field.type === "textarea" ? (
        <textarea rows={3} required={field.required} value={String(value ?? "")} placeholder={field.placeholder}
          onChange={(e) => onChange(e.target.value)} className="admin-input resize-y" />
      ) : field.type === "select" ? (
        <select value={String(value ?? "")} onChange={(e) => onChange(e.target.value)} className="admin-input">
          {field.options?.map((o) => <option key={o} value={o}>{o}</option>)}
        </select>
      ) : (
        <input
          type={field.type === "number" ? "number" : field.type === "date" ? "date" : "text"}
          required={field.required}
          value={field.type === "date" && value ? String(value).slice(0, 10) : (value as string | number) ?? ""}
          placeholder={field.placeholder}
          onChange={(e) => onChange(field.type === "number" ? Number(e.target.value) : e.target.value)}
          className="admin-input"
        />
      )}
      {field.help && <p className="text-[11px] mt-1" style={{ color: "var(--a-text-mute)" }}>{field.help}</p>}
    </div>
  );
}

function Th({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <th className={`text-left font-bold text-xs uppercase tracking-wide px-5 py-3.5 ${className}`} style={{ color: "var(--a-text-dim)" }}>{children}</th>;
}
function Td({ children, className = "", style }: { children: React.ReactNode; className?: string; style?: React.CSSProperties }) {
  return <td className={`px-5 py-3.5 ${className}`} style={style}>{children}</td>;
}
