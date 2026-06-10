"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight, MessageCircle, Check, Plus } from "lucide-react";
import PageHero from "@/components/ui/PageHero";
import { PRODUCTS, SITE_CONFIG } from "@/lib/constants";

export default function CompareContent() {
  const [selected, setSelected] = useState<string[]>(PRODUCTS.slice(0, 3).map((p) => p.id));

  const toggle = (id: string) =>
    setSelected((s) => (s.includes(id) ? s.filter((x) => x !== id) : s.length < 4 ? [...s, id] : s));

  const chosen = PRODUCTS.filter((p) => selected.includes(p.id));

  // Union of all spec labels across the chosen products, in first-seen order.
  const rows = useMemo(() => {
    const labels: string[] = [];
    chosen.forEach((p) => p.specs.forEach((s) => { if (!labels.includes(s.label)) labels.push(s.label); }));
    return labels;
  }, [chosen]);

  const valueFor = (id: string, label: string) =>
    PRODUCTS.find((p) => p.id === id)?.specs.find((s) => s.label === label)?.value || "—";

  return (
    <>
      <PageHero
        image="/images/category/products-ygb.webp"
        badge="Compare"
        title={<>Compare the <span className="gradient-text">Maxvolt Range</span></>}
        description="Put our lithium battery solutions side by side — chemistry, voltage, capacity and use case — and find the perfect fit. Select up to four to compare."
      />

      <section className="section-padding bg-[#f7f7f5]">
        <div className="container-custom">
          {/* product picker */}
          <div className="flex flex-wrap gap-2.5 mb-8">
            {PRODUCTS.map((p) => {
              const on = selected.includes(p.id);
              return (
                <button
                  key={p.id}
                  onClick={() => toggle(p.id)}
                  className="flex items-center gap-2 px-3.5 py-2 rounded-xl text-sm font-semibold transition-all border"
                  style={on
                    ? { background: `${p.color}14`, borderColor: `${p.color}55`, color: "#15171c" }
                    : { background: "#fff", borderColor: "rgba(0,0,0,0.08)", color: "#71717a" }}
                >
                  <span className="w-4 h-4 rounded-md flex items-center justify-center" style={{ background: on ? p.color : "transparent", border: on ? "none" : "1px solid rgba(0,0,0,0.2)" }}>
                    {on ? <Check size={11} className="text-black" /> : <Plus size={11} className="text-[#a1a1aa]" />}
                  </span>
                  {p.shortName || p.name}
                </button>
              );
            })}
          </div>

          {chosen.length === 0 ? (
            <div className="p-12 rounded-2xl frosted-card text-center text-[#71717a]">Select at least one product to compare.</div>
          ) : (
            <motion.div layout className="overflow-x-auto rounded-2xl border border-black/8 bg-white custom-scrollbar">
              <table className="w-full text-sm" style={{ minWidth: 120 + chosen.length * 220 }}>
                <thead>
                  <tr className="border-b border-black/8">
                    <th className="sticky left-0 bg-white z-10 p-4 text-left align-bottom w-[120px]">
                      <span className="text-[10px] uppercase tracking-wide text-[#a1a1aa] font-bold">Attribute</span>
                    </th>
                    {chosen.map((p) => (
                      <th key={p.id} className="p-4 align-top text-center" style={{ minWidth: 200 }}>
                        <div className="img-zoom relative h-28 mb-3 rounded-xl overflow-hidden flex items-center justify-center"
                          style={{ background: `radial-gradient(circle at 50% 40%, ${p.color}14 0%, transparent 70%)` }}>
                          <Image src={p.image} alt={p.name} width={120} height={120} className="object-contain h-24 w-auto" />
                        </div>
                        <div className="text-[#15171c] font-black text-sm leading-tight">{p.name}</div>
                        <span className="inline-block text-[9px] font-bold uppercase tracking-wide mt-1 px-2 py-0.5 rounded-full" style={{ color: p.color, background: `${p.color}12`, border: `1px solid ${p.color}30` }}>{p.category}</span>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {rows.map((label, i) => (
                    <tr key={label} className={i % 2 ? "bg-black/[0.015]" : ""}>
                      <td className="sticky left-0 z-10 p-4 font-semibold text-[#52525b] text-xs" style={{ background: i % 2 ? "#fafafa" : "#fff" }}>{label}</td>
                      {chosen.map((p) => (
                        <td key={p.id} className="p-4 text-center text-[#15171c] font-medium">{valueFor(p.id, label)}</td>
                      ))}
                    </tr>
                  ))}
                  {/* description row */}
                  <tr className="border-t border-black/8">
                    <td className="sticky left-0 bg-white z-10 p-4 font-semibold text-[#52525b] text-xs">Best for</td>
                    {chosen.map((p) => (
                      <td key={p.id} className="p-4 text-center text-[#5f6470] text-xs leading-relaxed">{p.description}</td>
                    ))}
                  </tr>
                  {/* actions row */}
                  <tr className="border-t border-black/8">
                    <td className="sticky left-0 bg-white z-10 p-4"></td>
                    {chosen.map((p) => (
                      <td key={p.id} className="p-4">
                        <div className="flex flex-col gap-2">
                          <Link href={p.href} className="flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg text-xs font-bold text-black" style={{ background: p.color }}>
                            View <ArrowRight size={12} />
                          </Link>
                          <a href={`https://wa.me/${SITE_CONFIG.whatsapp.replace("+", "")}?text=Hi, I'm interested in the ${p.name}`} target="_blank" rel="noopener noreferrer"
                            className="flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg text-xs font-medium border border-black/10 text-[#3f3f46] hover:text-[#15171c]">
                            <MessageCircle size={12} /> Enquire
                          </a>
                        </div>
                      </td>
                    ))}
                  </tr>
                </tbody>
              </table>
            </motion.div>
          )}

          <p className="text-[#a1a1aa] text-xs mt-5">All Maxvolt EV batteries are AIS 156 certified with a smart BMS. Need a custom configuration? <Link href="/contact-us?type=custom" className="text-[#D97706] font-semibold hover:underline">Talk to our engineers →</Link></p>
        </div>
      </section>
    </>
  );
}
