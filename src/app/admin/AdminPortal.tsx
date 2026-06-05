"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  LogOut, Search, Download, Trash2, Mail, Phone, Inbox,
  CheckCircle2, Clock, Circle, Loader2, RefreshCw, FileText,
} from "lucide-react";
import BlogManager from "./BlogManager";

type EnquiryStatus = "new" | "contacted" | "closed";
interface Enquiry {
  id: string; name: string; email: string; phone?: string; subject?: string;
  message: string; inquiryType: string; source: string; status: EnquiryStatus; createdAt: number;
}

const STATUS_META: Record<EnquiryStatus, { label: string; color: string; Icon: typeof Circle }> = {
  new: { label: "New", color: "#D97706", Icon: Circle },
  contacted: { label: "Contacted", color: "#2563eb", Icon: Clock },
  closed: { label: "Closed", color: "#16a34a", Icon: CheckCircle2 },
};

function toCSV(list: Enquiry[]): string {
  const headers = ["ID", "Date", "Name", "Email", "Phone", "Type", "Subject", "Message", "Source", "Status"];
  const rows = list.map((e) => [
    e.id, new Date(e.createdAt).toLocaleString(), e.name, e.email, e.phone || "",
    e.inquiryType, e.subject || "", `"${e.message.replace(/"/g, '""')}"`, e.source, e.status,
  ]);
  return [headers.join(","), ...rows.map((r) => r.join(","))].join("\n");
}

export default function AdminPortal() {
  const router = useRouter();
  const [tab, setTab] = useState<"enquiries" | "blog">("enquiries");
  const [enquiries, setEnquiries] = useState<Enquiry[]>([]);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState<EnquiryStatus | "all">("all");

  const load = async () => {
    setLoading(true);
    const res = await fetch("/api/enquiries");
    if (res.status === 401) { router.replace("/admin/login"); return; }
    const data = await res.json();
    setEnquiries(data.enquiries || []);
    setLoading(false);
  };

  useEffect(() => { load(); /* eslint-disable-next-line */ }, []);

  const logout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    router.replace("/admin/login");
    router.refresh();
  };

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
    <div className="min-h-screen bg-[#f7f7f5] pt-24 pb-16">
      <div className="container-custom">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          <div>
            <h1 className="text-2xl font-black text-[#15171c]">MaxVolt Admin Portal</h1>
            <p className="text-[#71717a] text-sm mt-1">Secure dashboard · manage enquiries and blog content.</p>
          </div>
          <div className="flex items-center gap-3">
            {tab === "enquiries" && (
              <>
                <button onClick={load} className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-black/10 text-[#52525b] hover:text-[#15171c] text-sm font-medium transition-all">
                  <RefreshCw size={14} /> Refresh
                </button>
                <button onClick={exportCSV} className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#FFD100] text-black font-bold text-sm hover:bg-[#FFA800] transition-all">
                  <Download size={14} /> Export CSV
                </button>
              </>
            )}
            <button onClick={logout} className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-black/10 text-[#52525b] hover:text-[#15171c] text-sm font-medium transition-all">
              <LogOut size={14} /> Sign Out
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex items-center gap-2 mb-7 p-1 rounded-xl bg-white border border-black/8 w-fit">
          {([
            { id: "enquiries" as const, label: "Enquiries", Icon: Inbox },
            { id: "blog" as const, label: "Blog", Icon: FileText },
          ]).map(({ id, label, Icon }) => (
            <button
              key={id}
              onClick={() => setTab(id)}
              className={`flex items-center gap-2 px-5 py-2 rounded-lg text-sm font-bold transition-all ${tab === id ? "bg-[#FFD100] text-black" : "text-[#71717a] hover:text-[#15171c]"}`}
            >
              <Icon size={15} /> {label}
            </button>
          ))}
        </div>

        {tab === "blog" ? <BlogManager /> : <>

        {/* Stat tiles */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
          {([
            { key: "all" as const, label: "Total", value: counts.all, color: "#15171c" },
            { key: "new" as const, label: "New", value: counts.new, color: "#D97706" },
            { key: "contacted" as const, label: "Contacted", value: counts.contacted, color: "#2563eb" },
            { key: "closed" as const, label: "Closed", value: counts.closed, color: "#16a34a" },
          ]).map((t) => (
            <button
              key={t.key}
              onClick={() => setFilter(t.key)}
              className="p-4 rounded-2xl text-left transition-all"
              style={filter === t.key
                ? { background: "#fff", border: `2px solid ${t.color}`, boxShadow: "0 4px 16px rgba(0,0,0,0.06)" }
                : { background: "#fff", border: "1px solid rgba(0,0,0,0.07)" }}
            >
              <div className="text-2xl font-black tabular-nums" style={{ color: t.color }}>{t.value}</div>
              <div className="text-[#71717a] text-xs font-medium">{t.label}</div>
            </button>
          ))}
        </div>

        <div className="relative mb-5">
          <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#a1a1aa]" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by name, email, or message…"
            className="w-full pl-11 pr-4 py-3 rounded-xl bg-white border border-black/8 text-[#15171c] text-sm placeholder:text-[#a1a1aa] focus:outline-none focus:border-[#D97706]/50"
          />
        </div>

        {loading ? (
          <div className="p-16 text-center">
            <Loader2 size={28} className="text-[#D97706] mx-auto animate-spin" />
            <p className="text-[#71717a] text-sm mt-3">Loading enquiries…</p>
          </div>
        ) : filtered.length === 0 ? (
          <div className="p-12 rounded-2xl frosted-card text-center">
            <Inbox size={32} className="text-[#a1a1aa] mx-auto mb-3" />
            <h3 className="text-[#15171c] font-bold mb-1">No enquiries {filter !== "all" ? `(${filter})` : "yet"}</h3>
            <p className="text-[#71717a] text-sm">Enquiries from the contact form and calculator will appear here in real time.</p>
          </div>
        ) : (
          <div className="space-y-3">
            <AnimatePresence mode="popLayout">
              {filtered.map((e) => {
                const meta = STATUS_META[e.status];
                return (
                  <motion.div layout key={e.id}
                    initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, scale: 0.97 }}
                    className="p-5 rounded-2xl frosted-card">
                    <div className="flex flex-col md:flex-row md:items-start gap-4">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 flex-wrap mb-1.5">
                          <span className="text-[#15171c] font-bold text-sm">{e.name}</span>
                          <span className="text-[10px] font-bold uppercase tracking-wide px-2 py-0.5 rounded-full bg-[#FFD100]/15 text-[#D97706] border border-[#D97706]/20">{e.inquiryType}</span>
                          <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold flex items-center gap-1" style={{ color: meta.color, background: `${meta.color}12`, border: `1px solid ${meta.color}25` }}>
                            <meta.Icon size={9} /> {meta.label}
                          </span>
                        </div>
                        {e.subject && <div className="text-[#3f3f46] text-sm font-medium mb-1">{e.subject}</div>}
                        <p className="text-[#52525b] text-sm leading-relaxed mb-2">{e.message}</p>
                        <div className="flex items-center gap-4 flex-wrap text-xs">
                          <a href={`mailto:${e.email}`} className="flex items-center gap-1.5 text-[#D97706] font-medium hover:underline"><Mail size={11} /> {e.email}</a>
                          {e.phone && <a href={`tel:${e.phone}`} className="flex items-center gap-1.5 text-[#52525b] hover:text-[#15171c]"><Phone size={11} /> {e.phone}</a>}
                          <span className="text-[#a1a1aa]">{e.source}</span>
                          <span className="text-[#a1a1aa]">{new Date(e.createdAt).toLocaleString()}</span>
                          <span className="text-[#a1a1aa] font-mono">{e.id}</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 shrink-0">
                        <select
                          value={e.status}
                          onChange={(ev) => setStatus(e.id, ev.target.value as EnquiryStatus)}
                          className="px-3 py-2 rounded-lg bg-white border border-black/10 text-[#15171c] text-xs font-medium focus:outline-none focus:border-[#D97706]/50 cursor-pointer"
                        >
                          <option value="new">New</option>
                          <option value="contacted">Contacted</option>
                          <option value="closed">Closed</option>
                        </select>
                        <button onClick={() => remove(e.id)} className="w-9 h-9 rounded-lg border border-black/10 flex items-center justify-center text-[#a1a1aa] hover:text-red-600 hover:border-red-200 transition-all">
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

        <p className="text-[#a1a1aa] text-[11px] mt-8 leading-relaxed max-w-2xl">
          Authenticated via encrypted httpOnly session cookie. Enquiries are stored server-side and
          visible to all signed-in team members in real time.
        </p>
        </>}
      </div>
    </div>
  );
}
