"use client";

import { useState, useMemo, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { Search as SearchIcon, ArrowRight } from "lucide-react";
import { searchSite } from "@/lib/search-index";

export default function SearchContent() {
  const params = useSearchParams();
  const router = useRouter();
  const initial = params.get("q") ?? "";
  const [q, setQ] = useState(initial);

  // Keep the input in sync if the user navigates with a new ?q.
  useEffect(() => {
    setQ(params.get("q") ?? "");
  }, [params]);

  const results = useMemo(() => searchSite(q), [q]);
  const grouped = useMemo(() => {
    const map = new Map<string, typeof results>();
    for (const r of results) {
      if (!map.has(r.g)) map.set(r.g, []);
      map.get(r.g)!.push(r);
    }
    return Array.from(map.entries());
  }, [results]);

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const next = q.trim();
    router.replace(next ? `/search?q=${encodeURIComponent(next)}` : "/search");
  };

  return (
    <div className="container-custom pt-32 pb-24 min-h-screen">
      <div className="max-w-3xl mx-auto">
        <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FFD100]/15 text-[#92600A] text-xs font-semibold tracking-wide uppercase mb-4">
          Search
        </span>
        <h1 className="text-3xl sm:text-4xl font-bold text-[#15171c] mb-6">
          Search <span className="gradient-text">Maxvolt</span>
        </h1>

        <form onSubmit={onSubmit} className="relative mb-10">
          <SearchIcon size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#a1a1aa]" />
          <input
            autoFocus
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search products, solutions, dealers by state…"
            aria-label="Search the Maxvolt website"
            className="w-full pl-12 pr-4 py-4 rounded-2xl bg-white border border-black/10 text-[#15171c] text-base outline-none focus:border-[#FFD100] focus:ring-2 focus:ring-[#FFD100]/30 transition-all placeholder:text-[#a1a1aa] shadow-sm"
          />
        </form>

        <p className="text-sm text-[#71717a] mb-6">
          {q.trim()
            ? `${results.length} result${results.length === 1 ? "" : "s"} for “${q.trim()}”`
            : "Popular destinations"}
        </p>

        {results.length === 0 ? (
          <div className="py-16 text-center">
            <p className="text-[#52525b] text-lg mb-2">No matches for “{q.trim()}”.</p>
            <p className="text-[#a1a1aa] text-sm">
              Try a product type (e.g. “e-rickshaw”), an application (“solar”), or a state name.
            </p>
          </div>
        ) : (
          <div className="space-y-8">
            {grouped.map(([group, items]) => (
              <div key={group}>
                <h2 className="text-xs font-bold uppercase tracking-wide text-[#a1a1aa] mb-3">{group}</h2>
                <div className="space-y-2">
                  {items.map((r, i) => (
                    <motion.div
                      key={r.h}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.25, delay: Math.min(i * 0.02, 0.2) }}
                    >
                      <Link
                        href={r.h}
                        className="group flex items-start gap-4 p-4 rounded-xl bg-white border border-black/8 hover:border-[#FFD100]/60 hover:shadow-[0_6px_24px_rgba(0,0,0,0.06)] transition-all"
                      >
                        <div className="flex-1 min-w-0">
                          <span className="block text-[#15171c] font-semibold group-hover:text-[#D97706] transition-colors">
                            {r.t}
                          </span>
                          {r.d && <span className="block text-sm text-[#71717a] mt-0.5 line-clamp-2">{r.d}</span>}
                          <span className="block text-xs text-[#a1a1aa] mt-1 truncate">{r.h}</span>
                        </div>
                        <ArrowRight size={18} className="text-[#a1a1aa] group-hover:text-[#D97706] group-hover:translate-x-1 transition-all shrink-0 mt-1" />
                      </Link>
                    </motion.div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
