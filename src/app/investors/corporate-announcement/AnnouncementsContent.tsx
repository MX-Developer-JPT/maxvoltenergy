"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import PageHero from "@/components/ui/PageHero";
import { FileText, ArrowLeft, Newspaper } from "lucide-react";
import DownloadButton from "@/components/ui/DownloadButton";

const ANNOUNCEMENTS = [
  { name: "Outcome of Board Meeting", type: "PDF", category: "Board Meeting" },
  { name: "Change in Company Secretary", type: "PDF", category: "Personnel" },
  { name: "PCS Certificate Regulation 163", type: "PDF", category: "Compliance" },
  { name: "Copy of Newspaper Publication", type: "PDF", category: "Newspaper" },
  { name: "Copy of Newspaper (Dec 2025)", type: "PDF", category: "Newspaper" },
  { name: "EGM Proceedings", type: "PDF", category: "EGM" },
  { name: "Voting Results and Scrutinizers Report", type: "PDF", category: "EGM" },
  { name: "Incorporation REG 30", type: "PDF", category: "Regulatory" },
  { name: "Final Notice Newspaper", type: "PDF", category: "Newspaper" },
  { name: "Combined VRSR", type: "PDF", category: "EGM" },
  { name: "Trading Window Closure", type: "PDF", category: "Compliance" },
  { name: "Corrigendum Expenditure Statement Final", type: "PDF", category: "Financial" },
  { name: "Board Meeting Intimation (12 May 2026)", type: "PDF", category: "Board Meeting" },
  { name: "Board Meeting Intimation Revised (12 May 2026)", type: "PDF", category: "Board Meeting" },
  { name: "Maxvolt Outcome of Board Meeting", type: "PDF", category: "Board Meeting" },
];

const CATEGORY_COLORS: Record<string, string> = {
  "Board Meeting": "#FFD100",
  "EGM": "#FFA800",
  "Compliance": "#FF8C00",
  "Regulatory": "#7c3aed",
  "Financial": "#f97316",
  "Personnel": "#ec4899",
  "Newspaper": "#6b7280",
};

export default function AnnouncementsContent() {
  const categories = [...new Set(ANNOUNCEMENTS.map(a => a.category))];

  return (
    <>
      <PageHero
        badge="Corporate Announcements"
        title={<>Regulatory <span className="gradient-text">Disclosures</span></>}
        description="Maxvolt Energy releases official corporate announcements only when information is clear, verified, and relevant to customers, partners, and investors — in full compliance with NSE SME Emerge regulations."
      >
        <Link href="/investors" className="inline-flex items-center gap-2 text-[#71717a] hover:text-[#15171c] text-sm transition-colors">
          <ArrowLeft size={13} />
          Back to Investors
        </Link>
      </PageHero>

      {/* Philosophy */}
      <section className="py-10 bg-[#f7f7f5] border-b border-black/6">
        <div className="container-custom">
          <div className="p-6 rounded-2xl bg-[#FFD100]/4 border border-[#FFD100]/10">
            <div className="flex items-start gap-4">
              <Newspaper size={20} className="text-[#D97706] shrink-0 mt-0.5" />
              <p className="text-[#52525b] text-sm leading-relaxed">
                We release information only when it is clear, verified, and relevant to our customers, partners, and investors.
                All announcements are filed with the National Stock Exchange and comply with SEBI (LODR) Regulations 2015.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* All announcements */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="flex flex-wrap gap-2 mb-8">
            <span className="text-[#5f6470] text-sm mr-2">Filter:</span>
            {categories.map((cat) => (
              <span
                key={cat}
                className="px-3 py-1 rounded-full text-xs font-medium border"
                style={{
                  color: CATEGORY_COLORS[cat] || "#fff",
                  borderColor: `${CATEGORY_COLORS[cat]}30`,
                  backgroundColor: `${CATEGORY_COLORS[cat]}08`,
                }}
              >
                {cat}
              </span>
            ))}
          </div>

          <div className="space-y-2">
            {ANNOUNCEMENTS.map(({ name, type, category }, index) => {
              const color = CATEGORY_COLORS[category] || "#fff";
              return (
                <motion.div
                  key={name}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.03 }}
                  className="group flex items-center gap-4 p-4 rounded-xl frosted-card border border-black/5 hover:border-black/8 transition-all cursor-pointer"
                >
                  <div
                    className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0"
                    style={{ backgroundColor: `${color}10`, border: `1px solid ${color}20` }}
                  >
                    <FileText size={14} style={{ color }} />
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="text-[#15171c] text-sm font-medium truncate">{name}</div>
                    <div className="text-[#71717a] text-xs">{type} Document</div>
                  </div>

                  <span
                    className="hidden md:block px-2.5 py-1 rounded-full text-[10px] font-semibold shrink-0"
                    style={{ color, backgroundColor: `${color}10`, border: `1px solid ${color}20` }}
                  >
                    {category}
                  </span>

                  <DownloadButton title={name} />
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}
