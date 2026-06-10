"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Cookie } from "lucide-react";

const KEY = "mv-cookie-consent";

export default function CookieConsent() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    try { if (!localStorage.getItem(KEY)) setShow(true); } catch { /* ignore */ }
  }, []);

  const choose = (v: "accepted" | "declined") => {
    try { localStorage.setItem(KEY, v); } catch { /* ignore */ }
    setShow(false);
  };

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ y: 120, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 120, opacity: 0 }}
          transition={{ type: "spring", stiffness: 220, damping: 26 }}
          className="fixed bottom-4 inset-x-4 md:inset-x-0 md:mx-auto md:max-w-lg z-[125]"
          role="dialog"
          aria-label="Cookie notice"
        >
          <div className="frosted-card p-5 flex flex-col sm:flex-row sm:items-center gap-4">
            <div className="w-10 h-10 rounded-xl bg-[#FFD100]/15 border border-[#D97706]/25 flex items-center justify-center shrink-0">
              <Cookie size={18} className="text-[#D97706]" />
            </div>
            <p className="text-[#52525b] text-xs leading-relaxed flex-1">
              We use essential cookies and privacy-friendly analytics to make this site work and improve it.{" "}
              <Link href="/privacy-policy" className="text-[#D97706] font-semibold hover:underline">Privacy Policy</Link>.
            </p>
            <div className="flex items-center gap-2 shrink-0">
              <button onClick={() => choose("declined")} className="px-4 py-2 rounded-xl border border-black/10 text-[#52525b] text-xs font-semibold hover:text-[#15171c] hover:border-black/20 transition-all">
                Decline
              </button>
              <button onClick={() => choose("accepted")} className="px-4 py-2 rounded-xl bg-[#FFD100] text-black text-xs font-bold hover:bg-[#FFA800] transition-all">
                Accept
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
