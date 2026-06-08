"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import PageHero from "@/components/ui/PageHero";
import { FileText, BookOpen, ArrowLeft, TrendingUp } from "lucide-react";
import DownloadButton from "@/components/ui/DownloadButton";

const REPORTS = [
  {
    year: "FY 2024-25",
    title: "Maxvolt Annual Report FY 2024-25",
    description: "Latest annual report covering the NSE SME Emerge listing, ₹297+ Crore revenue and capacity expansion",
    highlights: ["NSE SME Listed", "₹297+ Cr Revenue", "25,000+ Packs/Month", "Pan-India Network"],
    color: "#D97706",
    file: "/assets/docs/policy/annual-report-fy2024-25-nnd.pdf",
  },
  {
    year: "FY 2023-24",
    title: "Maxvolt Annual Report FY 2023-24",
    description: "Report covering AIS 156 certification achievement and production scale-up to 2,200-2,500 units/month",
    highlights: ["AIS 156 Certified", "Eco-Series Launch", "Pan-India Dealers", "Production Scale-Up"],
    color: "#D97706",
    file: "/assets/docs/policy/annual-report-2023-24-ium.pdf",
  },
  {
    year: "FY 2022-23",
    title: "Maxvolt Annual Report FY 2022-23",
    description: "Report covering R&D center establishment and production doubling to 50 batteries/day",
    highlights: ["R&D Center Established", "32 Retail Dealers", "4 OEM Partners", "Production Doubled"],
    color: "#D97706",
    file: "/assets/docs/policy/annual-report-2022-23-zhq.pdf",
  },
  {
    year: "FY 2021-22",
    title: "Maxvolt Annual Report FY 2021-22",
    description: "Report covering early growth, distributor expansion, and service network build-out",
    highlights: ["22 Distributors", "7 Service Centers", "4 OEM Suppliers", "Capacity Growth"],
    color: "#D97706",
    file: "/assets/docs/policy/annual-report-2021-22-kyd.pdf",
  },
];

const FINANCIALS: { label: string; file: string }[] = [
  { label: "Financials 2024-25", file: "/assets/docs/policy/financials-2024-25-hvs.pdf" },
  { label: "Re-Audited Financials 2023-24", file: "/assets/docs/policy/re-audited-financials-2023-24-hep.pdf" },
  { label: "LR Half Yearly Financials 30-09-2025", file: "/assets/docs/policy/lr-half-yearly-financials-30-09-2025-grz.pdf" },
  { label: "AOC FY 2023-24", file: "/assets/docs/policy/aoc-f-y-2023-24-zcf.pdf" },
  { label: "AOC 2 FY 2022-23", file: "/assets/docs/policy/aoc-2-f-y-22-23-hah.pdf" },
  { label: "AOC 2 FY 2021-22", file: "/assets/docs/policy/aoc-2-f-y-21-22-yov.pdf" },
  { label: "MGT-9 FY 2021-22", file: "/assets/docs/policy/mgt-9-f-y-21-22-gjr.pdf" },
  { label: "Proceedings of AGM & Scrutinizer Report FY 2024-25", file: "/assets/docs/policy/proceeding-of-agm-and-scrutinize-fy2024-25-xbk.pdf" },
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
            {REPORTS.map(({ year, title, description, highlights, color, file }, index) => (
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
                  <DownloadButton title={title} url={file} className="shrink-0" variant="button" />
                </div>
              </motion.div>
            ))}
          </div>

          {/* Financial statements */}
          <h2 className="text-2xl font-bold text-[#15171c] mt-14 mb-6">Financial Statements & Filings</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {FINANCIALS.map(({ label, file }) => (
              <div key={label} className="group flex items-center gap-4 p-4 rounded-xl frosted-card hover:border-[#D97706]/20 transition-all">
                <div className="w-10 h-10 rounded-xl bg-[#FFD100]/12 border border-[#D97706]/20 flex items-center justify-center shrink-0">
                  <FileText size={15} className="text-[#D97706]" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-[#15171c] text-sm font-medium truncate">{label}</div>
                  <div className="text-[#8a8a93] text-xs">PDF Document</div>
                </div>
                <DownloadButton title={label} url={file} />
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
