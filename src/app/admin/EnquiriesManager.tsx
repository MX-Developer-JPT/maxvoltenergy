"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search, Download, Trash2, Mail, Phone, Inbox,
  CheckCircle2, Clock, Circle, Loader2, RefreshCw,
} from "lucide-react";

type EnquiryStatus = "new" | "contacted" | "closed";
export interface Enquiry {
  id: string; name: string; email: string; phone?: string; subject?: string;
  message: string; inquiryType: string; source: string; status: EnquiryStatus; createdAt: number;
}

const STATUS_META: Record<EnquiryStatus, { label: string; color: string; Icon: typeof Circle }> = {
  new: { label: "New", color: "#f59e0b", Icon: Circle },
  contacted: { label: "Contacted", color: "#38bdf8", Icon: Clock },
  closed: { label: "Closed", color: "#22c55e", Icon: CheckCircle2 },
};

function toCSV(list: Enquiry[]): string {
  const headers = ["ID", "Date", "Name", "Email", "Phone", "Type", "Subject", "Message", "Source", "Status"];
  const rows = list.map((e) => [
    e.id, new Date(e.createdAt).toLocaleString(), e.name, e.email, e.phone || "",
    e.inquiryType, e.subject || "", `"${e.message.replace(/"/g, '""')}"`, e.source, e.status,
  ]);
  return [headers.join(","), ...rows.map((r) => r.join(","))].join("\n");
}

export default function EnquiriesManager() {
  const router = useRouter();
  const [enquiries, setEnquiries] = useState<Enquiry[]>([]);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState<EnquiryStatus | "all">("all");

  const load = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/enquiries", { cache: "no-store" });
      if (res.status === 401) { router.replace("/admin/login"); return; }
      if (!res.ok) throw new Error(`Request failed (${res.status})`);
      const data = await res.json();
      setEnquiries(data.enquiries || []);
    } catch {
      setEnquiries([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { load(); /* eslint-disable-next-line */ }, []);

  const setStatus = async (id: string, status: EnquiryStatus) => {
    const res = await fetch(`/api/enquiries/${id}`, {
      method: "PATCH", headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    });
    const data = await res.json();
    if (data.enquiries) setEnquiries(data.enquiries);
  };

  const remove = async (id: string) => {
    if (!confirm("Delete this enquiry permanently?")) return;
    const res = await fetch(`/api/enquiries/${id}`, { method: "DELETE" });
    const data = await res.json();
    if (data.enquiries) setEnquiries(data.enquiries);
  };

  const exportCSV = () => {
    const blob = new Blob([toCSV(filtered)], { type: "text/csv" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = `maxvolt-enquiries-${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
  };

  const filtered = useMemo(() => enquiries.filter((e) => {
    const matchStatus = filter === "all" || e.status === filter;
    const q = query.toLowerCase().trim();
    const matchQuery = !q || e.name.toLowerCase().includes(q) || e.email.toLowerCase().includes(q) || e.message.toLowerCase().includes(q);
    return matchStatus && matchQuery;
  }), [enquiries, filter, query]);

  const counts = useMemo(() => ({
    all: enquiries.length,
    new: enquiries.filter((e) => e.status === "new").length,
    contacted: enquiries.filter((e) => e.status === "contacted").length,
    closed: enquiries.filter((e) => e.status === "closed").length,
  }), [enquiries]);

  return (
    <div>
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-black" style={{ color: "var(--a-text)" }}>Enquiries &amp; Leads</h1>
          <p className="text-sm mt-0.5" style={{ color: "var(--a-text-dim)" }}>Every contact-form and partnership lead, in real time.</p>
        </div>
        <div className="flex items-center gap-3">
          <button onClick={load} className="admin-btn-ghost"><RefreshCw size={14} /> Refresh</button>
          <button onClick={exportCSV} className="admin-btn-primary"><Download size={14} /> Export CSV</button>
        </div>
      </div>

      {/* Stat tiles */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
        {([
          { key: "all" as const, label: "Total", value: counts.all, color: "var(--a-text)" },
          { key: "new" as const, label: "New", value: counts.new, color: "#f59e0b" },
          { key: "contacted" as const, label: "Contacted", value: counts.contacted, color: "#38bdf8" },
          { key: "closed" as const, label: "Closed", value: counts.closed, color: "#22c55e" },
        ]).map((t) => (
          <button key={t.key} onClick={() => setFilter(t.key)} className="admin-card p-4 text-left transition-all"
            style={filter === t.key ? { borderColor: "var(--a-primary)", boxShadow: "0 0 0 1px var(--a-primary)" } : undefined}>
            <div className="text-2xl font-black tabular-nums" style={{ color: t.color }}>{t.value}</div>
            <div className="text-xs font-medium" style={{ color: "var(--a-text-dim)" }}>{t.label}</div>
          </button>
        ))}
      </div>

      <div className="relative mb-5">
        <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2" style={{ color: "var(--a-text-mute)" }} />
        <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search by name, email, or message…" className="admin-input pl-11" />
      </div>

      {loading ? (
        <div className="p-16 text-center">
          <Loader2 size={28} className="mx-auto animate-spin" style={{ color: "var(--a-primary)" }} />
          <p className="text-sm mt-3" style={{ color: "var(--a-text-dim)" }}>Loading enquiries…</p>
        </div>
      ) : filtered.length === 0 ? (
        <div className="admin-card p-12 text-center">
          <Inbox size={32} className="mx-auto mb-3" style={{ color: "var(--a-text-mute)" }} />
          <h3 className="font-bold mb-1" style={{ color: "var(--a-text)" }}>No enquiries {filter !== "all" ? `(${filter})` : "yet"}</h3>
          <p className="text-sm" style={{ color: "var(--a-text-dim)" }}>Enquiries from the contact form and calculator will appear here in real time.</p>
        </div>
      ) : (
        <div className="space-y-3">
          <AnimatePresence mode="popLayout">
            {filtered.map((e) => {
              const meta = STATUS_META[e.status];
              return (
                <motion.div layout key={e.id}
                  initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, scale: 0.97 }}
                  className="admin-card p-5">
                  <div className="flex flex-col md:flex-row md:items-start gap-4">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap mb-1.5">
                        <span className="font-bold text-sm" style={{ color: "var(--a-text)" }}>{e.name}</span>
                        <span className="text-[10px] font-bold uppercase tracking-wide px-2 py-0.5 rounded-full" style={{ background: "rgba(109,93,252,0.15)", color: "var(--a-primary-2)", border: "1px solid rgba(109,93,252,0.3)" }}>{e.inquiryType}</span>
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold flex items-center gap-1" style={{ color: meta.color, background: `${meta.color}1f`, border: `1px solid ${meta.color}40` }}>
                          <meta.Icon size={9} /> {meta.label}
                        </span>
                      </div>
                      {e.subject && <div className="text-sm font-medium mb-1" style={{ color: "var(--a-text)" }}>{e.subject}</div>}
                      <p className="text-sm leading-relaxed mb-2" style={{ color: "var(--a-text-dim)" }}>{e.message}</p>
                      <div className="flex items-center gap-4 flex-wrap text-xs">
                        <a href={`mailto:${e.email}`} className="flex items-center gap-1.5 font-medium hover:underline" style={{ color: "var(--a-link)" }}><Mail size={11} /> {e.email}</a>
                        {e.phone && <a href={`tel:${e.phone}`} className="flex items-center gap-1.5" style={{ color: "var(--a-text-dim)" }}><Phone size={11} /> {e.phone}</a>}
                        <span style={{ color: "var(--a-text-mute)" }}>{e.source}</span>
                        <span style={{ color: "var(--a-text-mute)" }}>{new Date(e.createdAt).toLocaleString()}</span>
                        <span className="font-mono" style={{ color: "var(--a-text-mute)" }}>{e.id}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      <select value={e.status} onChange={(ev) => setStatus(e.id, ev.target.value as EnquiryStatus)} className="admin-input w-auto py-2 cursor-pointer">
                        <option value="new">New</option>
                        <option value="contacted">Contacted</option>
                        <option value="closed">Closed</option>
                      </select>
                      <button onClick={() => remove(e.id)} className="w-9 h-9 rounded-lg flex items-center justify-center transition-all" style={{ border: "1px solid var(--a-border)", color: "var(--a-red)" }}>
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
      )}
    </div>
  );
}
