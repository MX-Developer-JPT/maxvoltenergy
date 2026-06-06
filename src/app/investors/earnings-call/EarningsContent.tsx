"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";
import PageHero from "@/components/ui/PageHero";
import { FileText, Mic, ArrowLeft, Play, Calendar } from "lucide-react";
import DownloadButton from "@/components/ui/DownloadButton";

const EARNINGS_DOCUMENTS = [
  {
    period: "FY 2025",
    year: "2025",
    color: "#FFD100",
    documents: [
      { name: "Investors Presentation FY 25", type: "PDF", icon: FileText },
      { name: "Earnings Call Audio FY 2025", type: "MP3", icon: Mic },
      { name: "Earnings Call Transcript H2 FY25", type: "PDF", icon: FileText },
    ],
  },
  {
    period: "FY 2026 (H1)",
    year: "H1 2026",
    color: "#FFA800",
    documents: [
      { name: "Investors Presentation H1 FY 26", type: "PDF", icon: FileText },
      { name: "Earnings Call Transcript H1 FY26", type: "PDF", icon: FileText },
      { name: "Earnings Call Audio H1 FY26", type: "MP3", icon: Mic },
    ],
  },
  {
    period: "FY 2026 (Full Year)",
    year: "FY 2026",
    color: "#FF8C00",
    documents: [
      { name: "Earnings Call Audio FY26", type: "MP3", icon: Mic },
      { name: "Earning Call Transcript H2 FY26", type: "PDF", icon: FileText },
    ],
  },
];

export default function EarningsContent() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <>
      <PageHero
        badge="Earnings Call"
        title={<>Financial Progress.<br /><span className="gradient-text">Operational Growth.</span></>}
        description="Our earnings calls provide a clear view of Maxvolt Energy's financial performance, production output, demand across electric mobility and energy storage sectors, R&D progress, and market conditions."
      >
        <Link href="/investors" className="inline-flex items-center gap-2 text-[#71717a] hover:text-[#15171c] text-sm transition-colors">
          <ArrowLeft size={13} />
          Back to Investors
        </Link>
      </PageHero>

      {/* Earnings overview */}
      <section className="py-16 bg-[#f7f7f5]">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            {[
              { label: "Revenue FY25", value: "₹100+ Cr", sub: "Annual Revenue Milestone", color: "#FFD100" },
              { label: "Monthly Capacity", value: "6,000+", sub: "Battery Packs / Month", color: "#FFA800" },
              { label: "Growth", value: "NSE Listed", sub: "SME Emerge Platform", color: "#FF8C00" },
            ].map(({ label, value, sub, color }) => (
              <div key={label} className="p-6 rounded-2xl frosted-card border border-black/6 text-center">
                <div className="text-3xl font-black mb-1" style={{ color }}>{value}</div>
                <div className="text-[#15171c] font-bold text-sm mb-1">{label}</div>
                <div className="text-[#71717a] text-xs">{sub}</div>
              </div>
            ))}
          </div>

          <div className="p-6 rounded-2xl bg-[#FFD100]/5 border border-[#FFD100]/10 mb-12">
            <p className="text-[#52525b] text-sm leading-relaxed">
              Our earnings calls discuss revenue performance, production output, demand trends across electric mobility,
              energy storage, and medical sectors, along with R&D efforts and prevailing market conditions.
              All materials are released only when clear, verified, and relevant to our customers, partners, and investors.
            </p>
          </div>
        </div>
      </section>

      {/* Documents */}
      <section ref={ref} className="section-padding bg-white">
        <div className="container-custom">
          <h2 className="text-3xl font-bold text-[#15171c] mb-10">Earnings Materials</h2>

          <div className="space-y-8">
            {EARNINGS_DOCUMENTS.map(({ period, year, color, documents }, groupIndex) => (
              <motion.div
                key={period}
                initial={{ opacity: 0, y: 25 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: groupIndex * 0.1 }}
              >
                <div className="flex items-center gap-3 mb-5">
                  <div
                    className="px-3 py-1.5 rounded-lg text-xs font-bold"
                    style={{ backgroundColor: `${color}15`, color, border: `1px solid ${color}25` }}
                  >
                    {year}
                  </div>
                  <h3 className="text-[#15171c] font-bold text-xl">{period}</h3>
                  <div className="flex-1 h-px bg-black/[0.04]" />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {documents.map(({ name, type, icon: Icon }, docIndex) => (
                    <motion.div
                      key={name}
                      initial={{ opacity: 0, y: 15 }}
                      animate={inView ? { opacity: 1, y: 0 } : {}}
                      transition={{ delay: groupIndex * 0.1 + docIndex * 0.06 }}
                      className="group flex items-center gap-4 p-5 rounded-xl frosted-card border border-black/6 hover:border-black/8 transition-all cursor-pointer"
                    >
                      <div
                        className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0"
                        style={{ backgroundColor: `${color}12`, border: `1px solid ${color}25` }}
                      >
                        {type === "MP3" ? (
                          <Play size={16} style={{ color }} />
                        ) : (
                          <FileText size={16} style={{ color }} />
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-[#15171c] text-sm font-semibold truncate">{name}</div>
                        <div className="text-[#71717a] text-xs mt-0.5">{type} Document</div>
                      </div>
                      <DownloadButton title={name} />
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>

          <div className="mt-10 p-6 rounded-2xl border border-black/6 bg-black/[0.02] text-sm text-[#5f6470] leading-relaxed">
            <p>
              All documents are available to registered shareholders and the investing public in accordance with
              NSE SME Emerge disclosure requirements. For specific queries, contact our Compliance Officer at{" "}
              <a href="mailto:info@maxvoltenergy.com" className="text-[#D97706] hover:underline">
                info@maxvoltenergy.com
              </a>
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
