"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import PageHero from "@/components/ui/PageHero";
import { FileText, BookOpen, ArrowLeft, TrendingUp } from "lucide-react";
import DownloadButton from "@/components/ui/DownloadButton";

const REPORTS = [
  {
    year: "FY 2023-24",
    title: "Maxvolt Annual Report FY 2023-24",
    description: "Report covering AIS 156 certification achievement and production scale-up to 2,200-2,500 units/month",
    highlights: ["AIS 156 Certified", "Eco-Series Launch", "58+ Dealers", "Production Scale-Up"],
    color: "#D97706",
  },
  {
    year: "FY 2022-23",
    title: "Maxvolt Annual Report FY 2022-23",
    description: "Report covering R&D center establishment and production doubling to 50 batteries/day",
    highlights: ["R&D Center Established", "32 Retail Dealers", "4 OEM Partners", "Production Doubled"],
    color: "#D97706",
  },
  {
    year: "FY 2021-22",
    title: "Maxvolt Annual Report FY 2021-22",
    description: "Report covering early growth, distributor expansion, and service network build-out",
    highlights: ["22 Distributors", "7 Service Centers", "4 OEM Suppliers", "Capacity Growth"],
    color: "#D97706",
  },
];

const FINANCIALS = [
  "Financials 2024-25",
  "Re-Audited Financials 2023-24",
  "LR Half Yearly Financials 30.09.2025",
  "AOC F.Y. 2023-24",
  "AOC 2 F.Y. 22-23",
  "AOC 2 F.Y. 21-22",
  "MGT-9 F.Y. 21-22",
];

export default function AnnualReportsContent() {
  return (
    <>
      <PageHero
        badge="Annual Reports"
        title={<>Full <span className="gradient-text">Financial Transparency</span></>}
        description="Maxvolt Energy's annual reports provide comprehensive coverage of financial performance, operational achievements, R&D progress, and strategic outlook for shareholders and stakeholders."
      >
        <Link href="/investors" className="inline-flex items-center gap-2 text-[#71717a] hover:text-[#15171c] text-sm transition-colors">
          <ArrowLeft size={13} />
          Back to Investors
        </Link>
      </PageHero>

      <section className="section-padding bg-[#f7f7f5]">
        <div className="container-custom">
          <div className="space-y-6">
            {REPORTS.map(({ year, title, description, highlights, color }, index) => (
              <motion.div
                key={year}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="p-7 rounded-2xl frosted-card border border-black/6 hover:border-black/8 transition-all"
              >
                <div className="flex flex-col md:flex-row md:items-center gap-6">
                  <div className="w-16 h-16 rounded-2xl flex items-center justify-center shrink-0" style={{ backgroundColor: `${color}12`, border: `1px solid ${color}25` }}>
                    <BookOpen size={24} style={{ color }} />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="px-3 py-1 rounded-lg text-xs font-bold" style={{ color, backgroundColor: `${color}15`, border: `1px solid ${color}25` }}>{year}</span>
                    </div>
                    <h3 className="text-[#15171c] font-bold text-xl mb-2">{title}</h3>
                    <p className="text-[#5f6470] text-sm mb-4">{description}</p>
                    <div className="flex flex-wrap gap-2">
                      {highlights.map((h) => (
                        <span key={h} className="flex items-center gap-1.5 text-xs text-[#5f6470]">
                          <TrendingUp size={11} style={{ color }} />
                          {h}
                        </span>
                      ))}
                    </div>
                  </div>
                  <DownloadButton title={title} className="shrink-0" variant="button" />
                </div>
              </motion.div>
            ))}
          </div>

          {/* Financial statements */}
          <h2 className="text-2xl font-bold text-[#15171c] mt-14 mb-6">Financial Statements & Filings</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {FINANCIALS.map((name) => (
              <div key={name} className="group flex items-center gap-4 p-4 rounded-xl frosted-card hover:border-[#D97706]/20 transition-all">
                <div className="w-10 h-10 rounded-xl bg-[#FFD100]/12 border border-[#D97706]/20 flex items-center justify-center shrink-0">
                  <FileText size={15} className="text-[#D97706]" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-[#15171c] text-sm font-medium truncate">{name}</div>
                  <div className="text-[#8a8a93] text-xs">PDF Document</div>
                </div>
                <DownloadButton title={name} />
              </div>
            ))}
          </div>

          <div className="mt-10 p-5 rounded-xl border border-black/6 bg-black/[0.02] text-xs text-[#71717a]">
            Annual reports contain the Directors&apos; Report, Auditors&apos; Report, financial statements, and
            management discussion & analysis in compliance with Companies Act 2013.
          </div>
        </div>
      </section>
    </>
  );
}
