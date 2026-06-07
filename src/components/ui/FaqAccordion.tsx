"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus } from "lucide-react";

export interface FaqAccordionItem {
  q: string;
  a: string;
}

export default function FaqAccordion({ items }: { items: FaqAccordionItem[] }) {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <div className="space-y-3">
      {items.map((item, i) => {
        const isOpen = open === i;
        return (
          <div key={item.q} className="rounded-2xl frosted-card border border-black/6 overflow-hidden">
            <button
              onClick={() => setOpen(isOpen ? null : i)}
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
  );
}
