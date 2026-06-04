"use client";

import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { X, MessageCircle } from "lucide-react";
import { SITE_CONFIG } from "@/lib/constants";

export default function FloatingWhatsApp() {
  const [open, setOpen] = useState(false);

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
      {/* Popup */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 16, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.9 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="frosted-card rounded-2xl p-5 w-72 border border-black/8"
          >
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-full bg-[#25D366]/20 border border-[#25D366]/30 flex items-center justify-center">
                <MessageCircle size={18} className="text-[#25D366]" />
              </div>
              <div>
                <div className="text-[#15171c] font-bold text-sm">MaxVolt Energy</div>
                <div className="text-[#5f6470] text-xs">Typically replies in minutes</div>
              </div>
              <button onClick={() => setOpen(false)} className="ml-auto text-[#71717a] hover:text-[#15171c] transition-colors">
                <X size={14} />
              </button>
            </div>
            <p className="text-[#52525b] text-xs mb-4 leading-relaxed bg-black/[0.03] rounded-xl p-3">
              👋 Hi! How can we help you today? Ask about products, pricing, dealer partnerships, or technical support.
            </p>
            <a
              href={`https://wa.me/${SITE_CONFIG.whatsapp.replace("+", "")}?text=Hi MaxVolt, I'd like to know more about your batteries.`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl bg-[#25D366] text-[#15171c] text-sm font-bold hover:bg-[#25D366]/90 transition-all"
            >
              <MessageCircle size={15} />
              Start Chat
            </a>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main button */}
      <motion.button
        onClick={() => setOpen(!open)}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.95 }}
        className="relative w-14 h-14 rounded-full bg-[#25D366] shadow-lg flex items-center justify-center overflow-hidden"
        style={{ boxShadow: "0 4px 24px rgba(37, 211, 102, 0.4)" }}
      >
        {/* Pulse ring */}
        <motion.div
          className="absolute inset-0 rounded-full bg-[#25D366]"
          animate={{ scale: [1, 1.4], opacity: [0.4, 0] }}
          transition={{ duration: 1.8, repeat: Infinity }}
        />
        <AnimatePresence mode="wait">
          {open ? (
            <motion.div key="x" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.2 }}>
              <X size={22} className="text-[#15171c]" />
            </motion.div>
          ) : (
            <motion.div key="wp" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.2 }}>
              <Image src="/images/whats-app.webp" alt="WhatsApp" width={28} height={28} className="object-contain" />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>
    </div>
  );
}
