"use client";

import { useState, useEffect, useMemo, useRef, useCallback } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Search, CornerDownLeft, ArrowUp, ArrowDown, X } from "lucide-react";
import { PRODUCTS } from "@/lib/constants";
import { SOLUTIONS } from "@/lib/solutions";
import { SHOP_CATEGORIES } from "@/lib/shop";
import { STATE_LOCATIONS } from "@/lib/locations";

interface Entry { t: string; h: string; g: string }

const CORE: Entry[] = [
  { t: "Home", h: "/", g: "Pages" },
  { t: "About Us", h: "/about-us", g: "Pages" },
  { t: "Certificates", h: "/about-us/certificates", g: "Pages" },
  { t: "All Products", h: "/products", g: "Pages" },
  { t: "Product Portfolio", h: "/portfolio", g: "Pages" },
  { t: "Shop All Batteries", h: "/shop", g: "Pages" },
  { t: "Solutions", h: "/solutions", g: "Pages" },
  { t: "Find a Dealer", h: "/find-dealer", g: "Pages" },
  { t: "Become a Dealer", h: "/become-a-dealer", g: "Pages" },
  { t: "Our Presence", h: "/our-presence", g: "Pages" },
  { t: "Battery Calculator", h: "/battery-calculator", g: "Tools" },
  { t: "Blog", h: "/blog", g: "Pages" },
  { t: "Press Releases", h: "/press-release", g: "Pages" },
  { t: "Media Coverage", h: "/media", g: "Pages" },
  { t: "Gallery", h: "/gallery", g: "Pages" },
  { t: "Careers", h: "/career", g: "Pages" },
  { t: "Recycle · Maxvolt ReEarth", h: "/recycle", g: "Pages" },
  { t: "Support", h: "/support", g: "Pages" },
  { t: "FAQ", h: "/faq", g: "Pages" },
  { t: "Contact Us", h: "/contact-us", g: "Pages" },
  { t: "Investors", h: "/investors", g: "Investors" },
  { t: "Earnings Call", h: "/investors/earnings-call", g: "Investors" },
  { t: "Annual Reports", h: "/investors/annual-reports", g: "Investors" },
  { t: "Corporate Governance", h: "/investors/corporate-governance", g: "Investors" },
  { t: "Shareholding Pattern", h: "/investors/shareholding-pattern", g: "Investors" },
  { t: "CSR", h: "/investors/csr", g: "Investors" },
];

const INDEX: Entry[] = [
  ...CORE,
  ...PRODUCTS.map((p) => ({ t: p.name, h: p.href, g: "Products" })),
  ...SOLUTIONS.map((s) => ({ t: s.title, h: `/solutions/${s.slug}`, g: "Solutions" })),
  ...SHOP_CATEGORIES.map((c) => ({ t: c.name, h: `/shop/${c.key}`, g: "Shop" })),
  ...STATE_LOCATIONS.map((l) => ({ t: `${l.name} — dealers & batteries`, h: `/${l.slug}`, g: "Locations" })),
];

export default function CommandPalette() {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [q, setQ] = useState("");
  const [sel, setSel] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  const results = useMemo(() => {
    const s = q.toLowerCase().trim();
    if (!s) return INDEX.filter((e) => e.g === "Pages" || e.g === "Products" || e.g === "Tools").slice(0, 8);
    return INDEX.filter((e) => e.t.toLowerCase().includes(s) || e.h.toLowerCase().includes(s)).slice(0, 24);
  }, [q]);

  useEffect(() => { setSel(0); }, [q]);

  const close = useCallback(() => { setOpen(false); setQ(""); }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((o) => !o);
      } else if (e.key === "Escape") {
        setOpen(false);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 40);
  }, [open]);

  const go = (h: string) => { close(); router.push(h); };

  const onListKey = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") { e.preventDefault(); setSel((s) => Math.min(s + 1, results.length - 1)); }
    else if (e.key === "ArrowUp") { e.preventDefault(); setSel((s) => Math.max(s - 1, 0)); }
    else if (e.key === "Enter" && results[sel]) { e.preventDefault(); go(results[sel].h); }
  };

  return (
    <>
      {/* Trigger pill (bottom-left, balances the WhatsApp button) */}
      <button
        onClick={() => setOpen(true)}
        aria-label="Search the site (Ctrl or Cmd + K)"
        className="fixed bottom-5 left-5 z-[110] hidden md:flex items-center gap-2 pl-3.5 pr-2.5 py-2.5 rounded-full bg-white/90 backdrop-blur border border-black/10 shadow-lg text-[#52525b] text-sm font-medium hover:border-[#FFD100]/50 hover:text-[#15171c] transition-all"
      >
        <Search size={15} className="text-[#D97706]" />
        Search
        <kbd className="ml-1 px-1.5 py-0.5 rounded-md bg-black/[0.05] border border-black/10 text-[10px] font-bold text-[#71717a]">⌘K</kbd>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-[130] flex items-start justify-center bg-black/40 backdrop-blur-sm p-4 pt-[12vh]"
            onClick={close}
          >
            <motion.div
              initial={{ opacity: 0, y: -16, scale: 0.98 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: -16, scale: 0.98 }}
              transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
              onClick={(e) => e.stopPropagation()} onKeyDown={onListKey}
              className="w-full max-w-xl rounded-2xl bg-white shadow-2xl border border-black/8 overflow-hidden"
            >
              <div className="flex items-center gap-3 px-4 border-b border-black/6">
                <Search size={18} className="text-[#a1a1aa] shrink-0" />
                <input
                  ref={inputRef}
                  value={q}
                  onChange={(e) => setQ(e.target.value)}
                  placeholder="Search products, pages, dealers by state…"
                  className="flex-1 py-4 text-[#15171c] text-base outline-none placeholder:text-[#a1a1aa] bg-transparent"
                />
                <button onClick={close} className="text-[#a1a1aa] hover:text-[#15171c] shrink-0"><X size={16} /></button>
              </div>

              <div ref={listRef} className="max-h-[52vh] overflow-y-auto custom-scrollbar py-2">
                {results.length === 0 ? (
                  <div className="px-4 py-10 text-center text-[#a1a1aa] text-sm">No matches for “{q}”.</div>
                ) : (
                  results.map((r, i) => (
                    <button
                      key={r.h + i}
                      onMouseEnter={() => setSel(i)}
                      onClick={() => go(r.h)}
                      className="w-full flex items-center gap-3 px-4 py-2.5 text-left transition-colors"
                      style={{ background: i === sel ? "rgba(255,209,0,0.12)" : "transparent" }}
                    >
                      <span className="text-[#15171c] text-sm font-medium flex-1 truncate">{r.t}</span>
                      <span className="text-[10px] font-bold uppercase tracking-wide px-2 py-0.5 rounded-full bg-black/[0.04] text-[#71717a] border border-black/6 shrink-0">{r.g}</span>
                      {i === sel && <CornerDownLeft size={13} className="text-[#D97706] shrink-0" />}
                    </button>
                  ))
                )}
              </div>

              <div className="flex items-center gap-4 px-4 py-2.5 border-t border-black/6 text-[10px] text-[#a1a1aa]">
                <span className="flex items-center gap-1"><ArrowUp size={11} /><ArrowDown size={11} /> navigate</span>
                <span className="flex items-center gap-1"><CornerDownLeft size={11} /> open</span>
                <span className="flex items-center gap-1"><kbd className="px-1 rounded bg-black/[0.05] border border-black/10">esc</kbd> close</span>
                <span className="ml-auto">{results.length} result{results.length === 1 ? "" : "s"}</span>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
