"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import PageHero from "@/components/ui/PageHero";
import { FileText, ArrowLeft } from "lucide-react";
import DownloadButton from "@/components/ui/DownloadButton";

interface Props {
  badge: string;
  title: React.ReactNode;
  description: string;
  docs: string[];
  note?: string;
  intro?: React.ReactNode;
}

export default function InvestorDocPage({ badge, title, description, docs, note, intro }: Props) {
  return (
    <>
      <PageHero badge={badge} title={title} description={description}>
        <Link href="/investors" className="inline-flex items-center gap-2 text-[#71717a] hover:text-[#15171c] text-sm transition-colors">
          <ArrowLeft size={13} /> Back to Investors
        </Link>
      </PageHero>

      <section className="section-padding bg-[#f7f7f5]">
        <div className="container-custom">
          {intro && <div className="mb-8">{intro}</div>}

          {docs.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {docs.map((name, i) => (
                <motion.div
                  key={name}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: Math.min(i * 0.04, 0.3) }}
                  className="group flex items-center gap-4 p-4 rounded-xl frosted-card hover:border-[#D97706]/20 transition-all"
                >
                  <div className="w-10 h-10 rounded-xl bg-[#FFD100]/12 border border-[#D97706]/20 flex items-center justify-center shrink-0">
                    <FileText size={15} className="text-[#D97706]" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-[#15171c] text-sm font-medium">{name}</div>
                    <div className="text-[#8a8a93] text-xs">PDF Document</div>
                  </div>
                  <DownloadButton title={name} />
                </motion.div>
              ))}
            </div>
          )}

          {note && (
            <div className="mt-10 p-5 rounded-xl border border-black/6 bg-black/[0.02] text-xs text-[#71717a]">
              {note}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
