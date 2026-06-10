"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

const KEY = "mv-intro-shown";

/**
 * A brief, once-per-session branded intro reveal. Skipped for users who prefer
 * reduced motion or have already seen it this session.
 */
export default function IntroReveal() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let seen = false;
    try { seen = !!sessionStorage.getItem(KEY); } catch { /* ignore */ }
    if (reduce || seen) return;
    setShow(true);
    try { sessionStorage.setItem(KEY, "1"); } catch { /* ignore */ }
    const t = setTimeout(() => setShow(false), 1500);
    return () => clearTimeout(t);
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-0 z-[200] flex items-center justify-center"
          style={{ background: "radial-gradient(circle at 50% 45%, #14182a 0%, #0a0c14 70%)" }}
        >
          <motion.div
            className="absolute w-[420px] h-[420px] rounded-full pointer-events-none"
            style={{ background: "radial-gradient(circle, rgba(255,209,0,0.22) 0%, transparent 70%)" }}
            initial={{ scale: 0.6, opacity: 0 }}
            animate={{ scale: 1.2, opacity: 1 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
          />
          <div className="relative flex flex-col items-center">
            <motion.div
              initial={{ scale: 0.7, opacity: 0, y: 10 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="relative w-20 h-20"
            >
              <Image src="/images/logo.webp" alt="Maxvolt Energy" fill className="object-contain" priority />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35, duration: 0.6 }}
              className="mt-5 text-white/80 text-[11px] font-bold tracking-[0.35em] uppercase"
            >
              Energizing the Future
            </motion.div>
            {/* charge bar */}
            <div className="mt-5 h-[3px] w-40 rounded-full bg-white/10 overflow-hidden">
              <motion.div
                className="h-full rounded-full"
                style={{ background: "linear-gradient(90deg,#FFD100,#D97706)" }}
                initial={{ width: "0%" }}
                animate={{ width: "100%" }}
                transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
