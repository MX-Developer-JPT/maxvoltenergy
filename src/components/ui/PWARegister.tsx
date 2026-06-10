"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Download, X } from "lucide-react";

interface BIPEvent extends Event { prompt: () => void; userChoice: Promise<{ outcome: string }> }

export default function PWARegister() {
  const [deferred, setDeferred] = useState<BIPEvent | null>(null);
  const [show, setShow] = useState(false);

  useEffect(() => {
    // Register the service worker (production only — avoids dev caching headaches).
    if ("serviceWorker" in navigator && process.env.NODE_ENV === "production") {
      const reg = () => navigator.serviceWorker.register("/sw.js").catch(() => {});
      if (document.readyState === "complete") reg();
      else window.addEventListener("load", reg, { once: true });
    }

    const onPrompt = (e: Event) => {
      e.preventDefault();
      try { if (sessionStorage.getItem("mv-pwa-dismissed")) return; } catch {}
      setDeferred(e as BIPEvent);
      setShow(true);
    };
    window.addEventListener("beforeinstallprompt", onPrompt);
    window.addEventListener("appinstalled", () => setShow(false));
    return () => window.removeEventListener("beforeinstallprompt", onPrompt);
  }, []);

  const install = async () => {
    if (!deferred) return;
    deferred.prompt();
    try { await deferred.userChoice; } catch {}
    setShow(false); setDeferred(null);
  };
  const dismiss = () => {
    setShow(false);
    try { sessionStorage.setItem("mv-pwa-dismissed", "1"); } catch {}
  };

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 24 }}
          className="fixed bottom-5 left-1/2 -translate-x-1/2 z-[115] flex items-center gap-3 pl-4 pr-2 py-2.5 rounded-full bg-white border border-black/10 shadow-xl"
        >
          <Download size={16} className="text-[#D97706] shrink-0" />
          <span className="text-[#15171c] text-sm font-medium">Install the Maxvolt app</span>
          <button onClick={install} className="px-3.5 py-1.5 rounded-full bg-[#FFD100] text-black text-xs font-bold hover:bg-[#FFA800] transition-all">Install</button>
          <button onClick={dismiss} aria-label="Dismiss" className="w-7 h-7 rounded-full flex items-center justify-center text-[#a1a1aa] hover:text-[#15171c]"><X size={14} /></button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
