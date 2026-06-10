"use client";

import { useRef, useEffect } from "react";
import { motion, useScroll, useSpring, useTransform, useMotionValueEvent } from "framer-motion";

/**
 * Scroll-driven battery DISSECTION — a real Maxvolt pack that takes itself apart
 * as you scroll. Driven by a frame-accurate, scroll-scrubbed video (background
 * keyed out to full transparency). currentTime is eased toward the scroll target
 * on a rAF loop so the scrub stays buttery regardless of seek latency.
 */
export default function BatteryExploded() {
  const ref = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const targetT = useRef(0);

  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const p = useSpring(scrollYProgress, { stiffness: 80, damping: 28, mass: 0.4 });
  const glow = useTransform(p, [0.2, 0.65], [0.15, 1]);

  // Map the section's scroll pass [0.12 → 0.9] to the full clip [0 → 1].
  useMotionValueEvent(p, "change", (v) => {
    targetT.current = Math.min(1, Math.max(0, (v - 0.12) / 0.78));
  });

  useEffect(() => {
    const vid = videoRef.current;
    if (!vid) return;
    // Prime the decoder (esp. iOS/Safari) so seeking renders frames.
    const prime = () => { vid.play().then(() => vid.pause()).catch(() => {}); };
    if (vid.readyState >= 1) prime();
    else vid.addEventListener("loadedmetadata", prime, { once: true });

    let raf = 0;
    let cur = 0;
    const tick = () => {
      if (vid.duration) {
        const want = targetT.current * vid.duration;
        cur += (want - cur) * 0.15;            // ease toward target
        if (Math.abs(want - cur) < 0.004) cur = want;
        if (Math.abs(vid.currentTime - cur) > 0.01) {
          try { vid.currentTime = cur; } catch { /* seek not ready */ }
        }
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <div ref={ref} className="relative w-full h-full flex items-center justify-center">
      {/* brand glow that swells as the pack opens */}
      <motion.div
        aria-hidden
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[78%] h-[70%] rounded-full blur-3xl pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(255,209,0,0.40) 0%, transparent 70%)", opacity: glow }}
      />
      <video
        ref={videoRef}
        muted
        playsInline
        preload="auto"
        poster="/video/battery-explode-poster.webp"
        className="relative z-10 w-full h-full object-contain select-none pointer-events-none"
        // a faint contact shadow grounds the floating battery
        style={{ filter: "drop-shadow(0 26px 30px rgba(16,18,23,0.18))" }}
      >
        <source src="/video/battery-explode.webm" type="video/webm" />
        <source src="/video/battery-explode.mp4" type="video/mp4" />
      </video>
    </div>
  );
}
