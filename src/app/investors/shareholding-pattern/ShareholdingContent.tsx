"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import PageHero from "@/components/ui/PageHero";
import { FileText, BarChart3, ArrowLeft } from "lucide-react";
import DownloadButton from "@/components/ui/DownloadButton";
import { investorDocs } from "@/lib/investor-docs";

const SH_FILES = investorDocs("shareholding-pattern");

const DOCUMENTS = [
  {
    name: "List of Shareholders as on 31-03-2024",
    date: "March 31, 2024",
    type: "PDF",
    description: "Most recent shareholding pattern filed with regulatory authorities",
    color: "#FFD100",
  },
  {
    name: "List of Shareholders as on 31st March 2023",
    date: "March 31, 2023",
    type: "PDF",
    description: "Prior year shareholding pattern for comparison",
    color: "#FFA800",
  },
  {
    name: "List of Shareholders as on 31.03.2022",
    date: "March 31, 2022",
    type: "PDF",
    description: "Historical shareholding record",
    color: "#FF8C00",
  },
];

const SHAREHOLDER_CATEGORIES = [
  { category: "Promoter & Promoter Group", description: "Founding promoters and promoter group holdings" },
  { category: "Institutional Investors", description: "Mutual funds, banks, insurance companies, FIIs" },
  { category: "Non-Institutional / Public", description: "Individual shareholders and other investors" },
];

export default function ShareholdingContent() {
  return (
    <>
      <PageHero
        badge="Shareholding Pattern"
        title={<>Ownership <span className="gradient-text">Transparency</span></>}
        description="Maxvolt Energy's shareholding structure includes promoter holdings, institutional investors, and public shareholders — with regular updates ensuring full transparency for all stakeholders."
      >
        <Link href="/investors" className="inline-flex items-center gap-2 text-[#71717a] hover:text-[#15171c] text-sm transition-colors">
          <ArrowLeft size={13} />
          Back to Investors
        </Link>
      </PageHero>

      {/* Shareholder categories */}
      <section className="py-16 bg-[#f7f7f5]">
        <div className="container-custom">
          <h2 className="text-3xl font-bold text-[#15171c] mb-8">Shareholder Categories</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-12">
            {SHAREHOLDER_CATEGORIES.map(({ category, description }, i) => {
              const colors = ["#FFD100", "#FFA800", "#FF8C00"];
              const color = colors[i];
              return (
                <motion.div
                  key={category}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="p-6 rounded-2xl frosted-card border border-black/6"
                >
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-4" style={{ backgroundColor: `${color}12`, border: `1px solid ${color}25` }}>
                    <BarChart3 size={18} style={{ color }} />
                  </div>
                  <h3 className="text-[#15171c] font-bold mb-2">{category}</h3>
                  <p className="text-[#5f6470] text-sm">{description}</p>
                </motion.div>
              );
            })}
          </div>

          <div className="p-5 rounded-xl bg-[#FFD100]/4 border border-[#FFD100]/10 text-sm text-[#52525b]">
            For detailed shareholding percentages and individual shareholder lists, please download the official
            documents below as filed with NSE India.
          </div>
        </div>
      </section>

      {/* Documents */}
      <section className="py-16 bg-white">
        <div className="container-custom">
          <h2 className="text-3xl font-bold text-[#15171c] mb-8">Shareholding Documents</h2>
          <div className="space-y-4">
            {DOCUMENTS.map(({ name, date, type, description, color }, index) => (
              <motion.div
                key={name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group flex flex-col md:flex-row md:items-center gap-5 p-6 rounded-2xl frosted-card border border-black/6 hover:border-black/8 transition-all cursor-pointer"
              >
                <div className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0" style={{ backgroundColor: `${color}12`, border: `1px solid ${color}25` }}>
                  <FileText size={20} style={{ color }} />
                </div>
                <div className="flex-1">
                  <h3 className="text-[#15171c] font-bold text-lg mb-1">{name}</h3>
                  <p className="text-[#5f6470] text-sm mb-1">{description}</p>
                  <span className="text-[#8a8a93] text-xs">Filed: {date} · {type} Format</span>
                </div>
                <DownloadButton title={name} url={SH_FILES[index]?.file} variant="button" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
