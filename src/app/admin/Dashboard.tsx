"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  Inbox, FileText, Briefcase, TrendingUp, ArrowRight, ExternalLink,
  Circle, Clock, CheckCircle2, Mail, Megaphone, Database,
} from "lucide-react";

interface Enquiry { id: string; name: string; email: string; inquiryType: string; status: "new" | "contacted" | "closed"; createdAt: number; }
interface Post { id: string; title: string; slug: string; published: boolean; createdAt: number; }
interface Job { id: string; title: string; published: boolean; }

export default function Dashboard({ onNavigate }: { onNavigate: (key: string) => void }) {
  const [enquiries, setEnquiries] = useState<Enquiry[]>([]);
  const [posts, setPosts] = useState<Post[]>([]);
  const [jobs, setJobs] = useState<Job[]>([]);
  const [products, setProducts] = useState<number>(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const [e, b, c, p] = await Promise.all([
          fetch("/api/enquiries", { cache: "no-store" }).then((r) => (r.ok ? r.json() : { enquiries: [] })),
          fetch("/api/blog", { cache: "no-store" }).then((r) => (r.ok ? r.json() : { posts: [] })),
          fetch("/api/careers", { cache: "no-store" }).then((r) => (r.ok ? r.json() : { jobs: [] })),
          fetch("/api/cms/products", { cache: "no-store" }).then((r) => (r.ok ? r.json() : { records: [] })),
        ]);
        setEnquiries(e.enquiries || []);
        setPosts(b.posts || []);
        setJobs(c.jobs || []);
        setProducts((p.records || []).length);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const newCount = enquiries.filter((e) => e.status === "new").length;
  const contacted = enquiries.filter((e) => e.status === "contacted").length;
  const closed = enquiries.filter((e) => e.status === "closed").length;
  const publishedPosts = posts.filter((p) => p.published).length;
  const draftPosts = posts.length - publishedPosts;
  const publishedJobs = jobs.filter((j) => j.published).length;

  const recentEnq = [...enquiries].sort((a, b) => b.createdAt - a.createdAt).slice(0, 5);
  const recentPosts = [...posts].sort((a, b) => b.createdAt - a.createdAt).slice(0, 5);

  const kpis = [
    { label: "Total Enquiries", value: enquiries.length, sub: `${newCount} new`, Icon: Inbox, color: "#6d5dfc", tab: "enquiries" },
    { label: "Products", value: products, sub: "catalogue items", Icon: Database, color: "#22c55e", tab: "products" },
    { label: "Blog Posts", value: posts.length, sub: `${publishedPosts} live · ${draftPosts} draft`, Icon: FileText, color: "#38bdf8", tab: "blogs" },
    { label: "Job Openings", value: jobs.length, sub: `${publishedJobs} published`, Icon: Briefcase, color: "#f59e0b", tab: "careers" },
  ];

  const STATUS_META = {
    new: { color: "#f59e0b", Icon: Circle },
    contacted: { color: "#38bdf8", Icon: Clock },
    closed: { color: "#22c55e", Icon: CheckCircle2 },
  } as const;

  const quickLinks = [
    { label: "Homepage", href: "/" },
    { label: "Blog", href: "/blog" },
    { label: "Careers", href: "/career" },
    { label: "Press Room", href: "/press-release" },
    { label: "Contact", href: "/contact-us" },
    { label: "Shop", href: "/shop" },
  ];

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-black" style={{ color: "var(--a-text)" }}>Dashboard</h1>
        <p className="text-sm mt-0.5" style={{ color: "var(--a-text-dim)" }}>A live overview of everything happening across the site.</p>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-5">
        {kpis.map((k, i) => (
          <motion.button
            key={k.label}
            initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.04 }}
            onClick={() => onNavigate(k.tab)}
            className="admin-card p-5 text-left transition-all hover:-translate-y-0.5"
          >
            <div className="flex items-center justify-between mb-3">
              <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: `${k.color}1f`, border: `1px solid ${k.color}40` }}>
                <k.Icon size={16} style={{ color: k.color }} />
              </div>
              <ArrowRight size={14} style={{ color: "var(--a-text-mute)" }} />
            </div>
            <div className="text-3xl font-black tabular-nums" style={{ color: "var(--a-text)" }}>{loading ? "—" : k.value}</div>
            <div className="text-xs font-semibold mt-1" style={{ color: "var(--a-text)" }}>{k.label}</div>
            <div className="text-[11px] mt-0.5" style={{ color: "var(--a-text-mute)" }}>{k.sub}</div>
          </motion.button>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {/* Recent enquiries */}
        <div className="admin-card p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold flex items-center gap-2" style={{ color: "var(--a-text)" }}><Inbox size={15} style={{ color: "var(--a-primary-2)" }} /> Recent Enquiries</h3>
            <button onClick={() => onNavigate("enquiries")} className="text-xs font-semibold hover:underline" style={{ color: "var(--a-link)" }}>View all</button>
          </div>
          {recentEnq.length === 0 ? (
            <p className="text-sm py-6 text-center" style={{ color: "var(--a-text-mute)" }}>No enquiries yet.</p>
          ) : (
            <div className="space-y-2.5">
              {recentEnq.map((e) => {
                const m = STATUS_META[e.status];
                return (
                  <div key={e.id} className="flex items-center gap-3 p-3 rounded-xl" style={{ background: "var(--a-card-2)", border: "1px solid var(--a-border)" }}>
                    <m.Icon size={11} style={{ color: m.color }} className="shrink-0" />
                    <div className="min-w-0 flex-1">
                      <div className="text-sm font-semibold truncate" style={{ color: "var(--a-text)" }}>{e.name}</div>
                      <div className="text-[11px] flex items-center gap-1.5 truncate" style={{ color: "var(--a-text-mute)" }}><Mail size={10} /> {e.email}</div>
                    </div>
                    <span className="text-[10px] font-bold uppercase tracking-wide px-2 py-0.5 rounded-full shrink-0" style={{ background: "rgba(109,93,252,0.15)", color: "var(--a-primary-2)", border: "1px solid rgba(109,93,252,0.3)" }}>{e.inquiryType}</span>
                    <span className="text-[10px] shrink-0" style={{ color: "var(--a-text-mute)" }}>{new Date(e.createdAt).toLocaleDateString()}</span>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Recent posts */}
        <div className="admin-card p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold flex items-center gap-2" style={{ color: "var(--a-text)" }}><FileText size={15} style={{ color: "var(--a-link)" }} /> Recent Posts</h3>
            <button onClick={() => onNavigate("blogs")} className="text-xs font-semibold hover:underline" style={{ color: "var(--a-link)" }}>Manage</button>
          </div>
          {recentPosts.length === 0 ? (
            <p className="text-sm py-6 text-center" style={{ color: "var(--a-text-mute)" }}>No posts yet.</p>
          ) : (
            <div className="space-y-2.5">
              {recentPosts.map((p) => (
                <a key={p.id} href={`/blog/${p.slug}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 p-3 rounded-xl transition-all" style={{ background: "var(--a-card-2)", border: "1px solid var(--a-border)" }}>
                  <div className="min-w-0 flex-1">
                    <div className="text-sm font-semibold truncate" style={{ color: "var(--a-text)" }}>{p.title}</div>
                    <div className="text-[11px]" style={{ color: "var(--a-text-mute)" }}>{new Date(p.createdAt).toLocaleDateString()}</div>
                  </div>
                  <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full shrink-0" style={p.published ? { background: "rgba(34,197,94,0.15)", color: "var(--a-green)" } : { background: "var(--a-off)", color: "var(--a-text-mute)" }}>{p.published ? "Live" : "Draft"}</span>
                  <ExternalLink size={12} className="shrink-0" style={{ color: "var(--a-text-mute)" }} />
                </a>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Quick links */}
      <div className="admin-card p-6 mt-5">
        <h3 className="font-bold flex items-center gap-2 mb-4" style={{ color: "var(--a-text)" }}><Megaphone size={15} style={{ color: "var(--a-primary-2)" }} /> Jump to Public Pages</h3>
        <div className="flex flex-wrap gap-2.5">
          {quickLinks.map((l) => (
            <a key={l.href} href={l.href} target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-sm font-medium transition-all"
              style={{ background: "var(--a-card-2)", border: "1px solid var(--a-border)", color: "var(--a-text-dim)" }}>
              {l.label} <ExternalLink size={12} style={{ color: "var(--a-text-mute)" }} />
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
