"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight, Newspaper } from "lucide-react";
import PageHero from "@/components/ui/PageHero";
import { PRESS_CATEGORIES, type PressRelease } from "@/lib/press";

function fmtDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" });
}

const CAT_COLOR: Record<string, string> = {
  "Company News": "#FFD100",
  "Product & Technology": "#FFA800",
  Sustainability: "#16a34a",
  "Industry & Policy": "#7c3aed",
  Financial: "#FF8C00",
  CSR: "#ec4899",
};

export default function PressListContent({ items }: { items: PressRelease[] }) {
  const [active, setActive] = useState<string>("All");
  const filtered = active === "All" ? items : items.filter((i) => i.category === active);
  const featured = filtered[0];
  const rest = filtered.slice(1);

  return (
    <>
      <PageHero image="/images/press/union-budget-2026-gst-reforms-infrastructure.webp"
        badge="Newsroom"
        title={<>Press Releases &amp; <span className="gradient-text">Company News</span></>}
        description="Official announcements, product launches, financial milestones and industry commentary from Maxvolt Energy Industries Limited."
      />

      <section className="section-padding bg-[#f7f7f5]">
        <div className="container-custom">
          {/* Category filter */}
          <div className="flex flex-wrap gap-2 mb-8">
            {["All", ...PRESS_CATEGORIES].map((c) => (
              <button
                key={c}
                onClick={() => setActive(c)}
                className="px-4 py-2 rounded-full text-xs font-semibold transition-all border"
                style={
                  active === c
                    ? { backgroundColor: "#FFD100", color: "#000", borderColor: "#FFD100" }
                    : { backgroundColor: "transparent", color: "#52525b", borderColor: "rgba(0,0,0,0.1)" }
                }
              >
                {c}
              </button>
            ))}
          </div>

          {/* Featured */}
          {featured && (
            <Link href={`/press-release/${featured.slug}`} className="block mb-8 group">
              <div className="rounded-2xl overflow-hidden border border-[#FFD100]/15 bg-white hover:border-[#FFD100]/30 transition-all md:flex">
                <div className="relative md:w-1/2 h-60 md:h-auto">
                  <Image src={featured.image} alt={featured.title} fill className="object-cover" sizes="600px" />
                </div>
                <div className="p-8 md:w-1/2">
                  <div className="flex items-center gap-3 mb-3">
                    <span
                      className="text-[10px] font-bold tracking-[0.15em] uppercase px-2.5 py-1 rounded-full"
                      style={{ color: CAT_COLOR[featured.category], backgroundColor: `${CAT_COLOR[featured.category]}14` }}
                    >
                      {featured.category}
                    </span>
                    <span className="text-[#8a8a93] text-xs">{fmtDate(featured.date)}</span>
                  </div>
                  <h2 className="text-2xl md:text-3xl font-black text-[#15171c] mb-3 leading-tight group-hover:text-[#D97706] transition-colors">{featured.title}</h2>
                  <p className="text-[#52525b] text-sm leading-relaxed mb-5 line-clamp-3">{featured.excerpt}</p>
                  <span className="inline-flex items-center gap-1 text-[#D97706] font-semibold text-sm">Read Full Story <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" /></span>
                </div>
              </div>
            </Link>
          )}

          {/* Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {rest.map((p, i) => (
              <motion.div
                key={p.slug}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: (i % 3) * 0.08 }}
              >
                <Link href={`/press-release/${p.slug}`} className="group block rounded-2xl frosted-card border border-black/6 hover:border-[#FFD100]/20 hover:-translate-y-1 transition-all overflow-hidden h-full">
                  <div className="relative h-44 overflow-hidden">
                    <Image src={p.image} alt={p.title} fill className="object-cover group-hover:scale-105 transition-transform duration-500" sizes="400px" />
                  </div>
                  <div className="p-6">
                    <div className="flex items-center gap-2 mb-3">
                      <span
                        className="text-[9px] font-bold tracking-[0.12em] uppercase px-2 py-0.5 rounded-full"
                        style={{ color: CAT_COLOR[p.category], backgroundColor: `${CAT_COLOR[p.category]}14` }}
                      >
                        {p.category}
                      </span>
                      <span className="text-[#8a8a93] text-[11px]">{fmtDate(p.date)}</span>
                    </div>
                    <h3 className="text-[#15171c] font-bold text-base leading-tight mb-3 group-hover:text-[#D97706] transition-colors line-clamp-3">{p.title}</h3>
                    <p className="text-[#5f6470] text-sm leading-relaxed line-clamp-3">{p.excerpt}</p>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>

          {/* Press inquiries */}
          <div className="mt-12 p-8 rounded-2xl border border-black/6 bg-white text-center">
            <Newspaper size={32} className="text-[#D97706] mx-auto mb-4" />
            <h3 className="text-[#15171c] font-bold text-xl mb-2">Media &amp; Press Inquiries</h3>
            <p className="text-[#5f6470] text-sm mb-4">For interviews, press kits, or company information, reach our communications team.</p>
            <a href="mailto:info@maxvolt-one.co.in" className="text-[#D97706] font-semibold text-sm hover:underline">info@maxvolt-one.co.in</a>
          </div>
        </div>
      </section>
    </>
  );
}
