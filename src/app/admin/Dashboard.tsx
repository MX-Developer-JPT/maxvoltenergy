"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  Inbox, FileText, Briefcase, TrendingUp, ArrowRight, ExternalLink,
  Circle, Clock, CheckCircle2, Mail, Megaphone,
} from "lucide-react";
import type { AdminTab } from "./AdminPortal";

interface Enquiry { id: string; name: string; email: string; inquiryType: string; status: "new" | "contacted" | "closed"; createdAt: number; }
interface Post { id: string; title: string; slug: string; published: boolean; createdAt: number; }
interface Job { id: string; title: string; published: boolean; }

export default function Dashboard({ onNavigate }: { onNavigate: (tab: AdminTab) => void }) {
  const [enquiries, setEnquiries] = useState<Enquiry[]>([]);
  const [posts, setPosts] = useState<Post[]>([]);
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const [e, b, c] = await Promise.all([
          fetch("/api/enquiries", { cache: "no-store" }).then((r) => (r.ok ? r.json() : { enquiries: [] })),
          fetch("/api/blog", { cache: "no-store" }).then((r) => (r.ok ? r.json() : { posts: [] })),
          fetch("/api/careers", { cache: "no-store" }).then((r) => (r.ok ? r.json() : { jobs: [] })),
        ]);
        setEnquiries(e.enquiries || []);
        setPosts(b.posts || []);
        setJobs(c.jobs || []);
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
    { label: "Total Enquiries", value: enquiries.length, sub: `${newCount} new`, Icon: Inbox, color: "#D97706", tab: "enquiries" as AdminTab },
    { label: "Blog Posts", value: posts.length, sub: `${publishedPosts} live · ${draftPosts} draft`, Icon: FileText, color: "#2563eb", tab: "blog" as AdminTab },
    { label: "Job Openings", value: jobs.length, sub: `${publishedJobs} published`, Icon: Briefcase, color: "#7c3aed", tab: "careers" as AdminTab },
    { label: "Lead Conversion", value: enquiries.length ? `${Math.round((closed / enquiries.length) * 100)}%` : "—", sub: `${contacted} in progress`, Icon: TrendingUp, color: "#16a34a", tab: "enquiries" as AdminTab },
  ];

  const STATUS_META = {
    new: { color: "#D97706", Icon: Circle },
    contacted: { color: "#2563eb", Icon: Clock },
    closed: { color: "#16a34a", Icon: CheckCircle2 },
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
        <h2 className="text-xl font-black text-[#15171c]">Dashboard</h2>
        <p className="text-[#71717a] text-sm mt-0.5">A live overview of everything happening across the site.</p>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
        {kpis.map((k, i) => (
          <motion.button
            key={k.label}
            initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.04 }}
            onClick={() => onNavigate(k.tab)}
            className="p-5 rounded-2xl bg-white border border-black/7 text-left hover:border-[#FFD100]/40 hover:-translate-y-0.5 transition-all"
          >
            <div className="flex items-center justify-between mb-3">
              <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: `${k.color}14`, border: `1px solid ${k.color}30` }}>
                <k.Icon size={16} style={{ color: k.color }} />
              </div>
              <ArrowRight size={14} className="text-[#c4c4cc]" />
            </div>
            <div className="text-3xl font-black tabular-nums text-[#15171c]">{loading ? "—" : k.value}</div>
            <div className="text-[#15171c] text-xs font-semibold mt-1">{k.label}</div>
            <div className="text-[#a1a1aa] text-[11px] mt-0.5">{k.sub}</div>
          </motion.button>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {/* Recent enquiries */}
        <div className="p-6 rounded-2xl frosted-card">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-[#15171c] font-bold flex items-center gap-2"><Inbox size={15} className="text-[#D97706]" /> Recent Enquiries</h3>
            <button onClick={() => onNavigate("enquiries")} className="text-[#D97706] text-xs font-semibold hover:underline">View all</button>
          </div>
          {recentEnq.length === 0 ? (
            <p className="text-[#a1a1aa] text-sm py-6 text-center">No enquiries yet.</p>
          ) : (
            <div className="space-y-2.5">
              {recentEnq.map((e) => {
                const m = STATUS_META[e.status];
                return (
                  <div key={e.id} className="flex items-center gap-3 p-3 rounded-xl bg-black/[0.02] border border-black/5">
                    <m.Icon size={11} style={{ color: m.color }} className="shrink-0" />
                    <div className="min-w-0 flex-1">
                      <div className="text-[#15171c] text-sm font-semibold truncate">{e.name}</div>
                      <div className="text-[#a1a1aa] text-[11px] flex items-center gap-1.5 truncate"><Mail size={10} /> {e.email}</div>
                    </div>
                    <span className="text-[10px] font-bold uppercase tracking-wide px-2 py-0.5 rounded-full bg-[#FFD100]/15 text-[#D97706] border border-[#D97706]/20 shrink-0">{e.inquiryType}</span>
                    <span className="text-[#c4c4cc] text-[10px] shrink-0">{new Date(e.createdAt).toLocaleDateString()}</span>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Recent posts */}
        <div className="p-6 rounded-2xl frosted-card">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-[#15171c] font-bold flex items-center gap-2"><FileText size={15} className="text-[#2563eb]" /> Recent Posts</h3>
            <button onClick={() => onNavigate("blog")} className="text-[#D97706] text-xs font-semibold hover:underline">Manage</button>
          </div>
          {recentPosts.length === 0 ? (
            <p className="text-[#a1a1aa] text-sm py-6 text-center">No posts yet.</p>
          ) : (
            <div className="space-y-2.5">
              {recentPosts.map((p) => (
                <a key={p.id} href={`/blog/${p.slug}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 p-3 rounded-xl bg-black/[0.02] border border-black/5 hover:border-[#FFD100]/30 transition-all group">
                  <div className="min-w-0 flex-1">
                    <div className="text-[#15171c] text-sm font-semibold truncate group-hover:text-[#D97706] transition-colors">{p.title}</div>
                    <div className="text-[#a1a1aa] text-[11px]">{new Date(p.createdAt).toLocaleDateString()}</div>
                  </div>
                  <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full shrink-0 ${p.published ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-500"}`}>{p.published ? "Live" : "Draft"}</span>
                  <ExternalLink size={12} className="text-[#c4c4cc] shrink-0" />
                </a>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Quick links */}
      <div className="mt-5 p-6 rounded-2xl frosted-card">
        <h3 className="text-[#15171c] font-bold flex items-center gap-2 mb-4"><Megaphone size={15} className="text-[#D97706]" /> Jump to Public Pages</h3>
        <div className="flex flex-wrap gap-2.5">
          {quickLinks.map((l) => (
            <a key={l.href} href={l.href} target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-black/[0.03] border border-black/8 text-[#3f3f46] hover:text-[#15171c] hover:border-[#FFD100]/40 text-sm font-medium transition-all">
              {l.label} <ExternalLink size={12} className="text-[#a1a1aa]" />
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
