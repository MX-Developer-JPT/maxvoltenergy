"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus } from "lucide-react";

export interface FaqItem { q: string; a: string }
export interface FaqGroup { category: string; items: FaqItem[] }

export default function FaqContent({ groups }: { groups: FaqGroup[] }) {
  const [open, setOpen] = useState<string | null>(null);

  return (
    <section className="section-padding bg-white">
      <div className="container-custom max-w-3xl">
        {groups.map((group) => (
          <div key={group.category} className="mb-12 last:mb-0">
            <h2 className="text-xs font-bold tracking-[0.22em] uppercase text-[#D97706] mb-5">{group.category}</h2>
            <div className="space-y-3">
              {group.items.map((item) => {
                const id = `${group.category}-${item.q}`;
                const isOpen = open === id;
                return (
                  <div key={id} className="rounded-2xl frosted-card border border-black/6 overflow-hidden">
                    <button
                      onClick={() => setOpen(isOpen ? null : id)}
                      className="w-full flex items-center justify-between gap-4 text-left px-5 py-4"
                    >
                      <span className="text-[#15171c] font-semibold text-sm md:text-base">{item.q}</span>
                      <motion.span animate={{ rotate: isOpen ? 45 : 0 }} transition={{ duration: 0.2 }} className="shrink-0 text-[#D97706]">
                        <Plus size={18} />
                      </motion.span>
                    </button>
                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
                          className="overflow-hidden"
                        >
                          <p className="px-5 pb-5 text-[#5f6470] text-sm leading-relaxed">{item.a}</p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
