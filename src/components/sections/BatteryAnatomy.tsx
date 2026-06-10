"use client";

import { useRef, useEffect, useState } from "react";
import { motion, AnimatePresence, useScroll, useSpring, useTransform, useMotionValueEvent } from "framer-motion";
import { ShieldCheck, Cpu, BatteryCharging, Box } from "lucide-react";

const STEPS = [
  {
    n: "01", Icon: ShieldCheck, title: "Protective Cover", color: "#FFD100",
    desc: "A vented top cover with integrated cooling channels and an industrial high-current connector — engineered for safe, fast power delivery.",
    range: [0.0, 0.27] as const,
  },
  {
    n: "02", Icon: Cpu, title: "Smart BMS", color: "#FFA800",
    desc: "An intelligent Battery Management System watches every cell — balancing charge and guarding against overcharge, deep-discharge and thermal runaway.",
    range: [0.27, 0.5] as const,
  },
  {
    n: "03", Icon: BatteryCharging, title: "Lithium Cell Pack", color: "#FF8C00",
    desc: "Matched LiFePO4 / NMC cells in a rigid array deliver high energy density, 3,000+ cycles and stable output — right down to the last percent.",
    range: [0.5, 0.75] as const,
  },
  {
    n: "04", Icon: Box, title: "Rugged Housing", color: "#7c3aed",
    desc: "An impact-resistant casing seals it all against dust, vibration and water — built to endure India's roads, heat and monsoon.",
    range: [0.75, 1.0] as const,
  },
];

export default function BatteryAnatomy() {
  const ref = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const targetT = useRef(0);
  const [active, setActive] = useState(0);

  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const p = useSpring(scrollYProgress, { stiffness: 90, damping: 30, mass: 0.4 });
  const glow = useTransform(p, [0.1, 0.7], [0.2, 1]);
  const railScaleY = useTransform(p, [0, 1], [0.04, 1]);

  useMotionValueEvent(p, "change", (v) => {
    targetT.current = Math.min(1, Math.max(0, (v - 0.04) / 0.92));
    const idx = STEPS.findIndex((s) => v >= s.range[0] && v < s.range[1]);
    setActive(idx === -1 ? (v >= 0.75 ? 3 : 0) : idx);
  });

  useEffect(() => {
    const vid = videoRef.current;
    if (!vid) return;
    const prime = () => { vid.play().then(() => vid.pause()).catch(() => {}); };
    if (vid.readyState >= 1) prime();
    else vid.addEventListener("loadedmetadata", prime, { once: true });

    let raf = 0;
    let cur = 0;
    const tick = () => {
      if (vid.duration) {
        const want = targetT.current * vid.duration;
        cur += (want - cur) * 0.15;
        if (Math.abs(want - cur) < 0.004) cur = want;
        if (Math.abs(vid.currentTime - cur) > 0.01) {
          try { vid.currentTime = cur; } catch { /* not seekable yet */ }
        }
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  const StepRow = ({ s, i }: { s: (typeof STEPS)[number]; i: number }) => {
    const on = i === active;
    return (
      <div
        className="flex items-center gap-3 rounded-xl px-3 py-2.5 transition-all duration-300"
        style={{
          background: on ? "#fff" : "transparent",
          border: `1px solid ${on ? s.color + "55" : "transparent"}`,
          boxShadow: on ? "0 12px 30px -16px rgba(16,18,23,0.28)" : "none",
          opacity: on ? 1 : 0.45,
        }}
      >
        <div className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0 transition-all"
          style={{ background: on ? `${s.color}1f` : "rgba(0,0,0,0.04)", border: `1px solid ${on ? s.color + "55" : "rgba(0,0,0,0.07)"}` }}>
          <s.Icon size={17} style={{ color: on ? s.color : "#a1a1aa" }} />
        </div>
        <span className="text-[11px] font-black tabular-nums shrink-0" style={{ color: on ? s.color : "#c4c4cc" }}>{s.n}</span>
        <h3 className="font-black text-[#15171c] text-sm md:text-base">{s.title}</h3>
      </div>
    );
  };

  return (
    <section ref={ref} className="relative bg-white" style={{ height: "300vh" }}>
      <div className="sticky top-0 h-screen overflow-hidden flex flex-col">
        <div className="absolute inset-0 grid-pattern opacity-[0.12]" />
        <div className="hero-aurora absolute inset-0 pointer-events-none opacity-70" />

        {/* Heading — anchored at top, always visible */}
        <div className="container-custom relative z-10 shrink-0 text-center pt-[5.25rem] pb-2 md:pb-3">
          <span className="text-[#D97706] text-[10px] md:text-[11px] font-bold tracking-[0.28em] uppercase mb-1.5 block">
            Anatomy of a Maxvolt Pack
          </span>
          <h2 className="text-2xl md:text-4xl font-black text-[#15171c] leading-tight">
            Engineered <span className="gradient-text">to the cell</span>
          </h2>
        </div>

        {/* Stage — fills remaining height */}
        <div className="container-custom relative z-10 flex-1 min-h-0 pb-5">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-3 lg:gap-8 lg:items-center h-full">
            {/* Video */}
            <div className="lg:col-span-7 relative h-[34vh] lg:h-full min-h-0 flex items-center justify-center order-1">
              <motion.div
                aria-hidden
                className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[68%] h-[58%] rounded-full blur-3xl pointer-events-none"
                style={{ background: "radial-gradient(circle, rgba(255,209,0,0.45) 0%, transparent 70%)", opacity: glow }}
              />
              <video
                ref={videoRef}
                muted
                playsInline
                preload="auto"
                poster="/video/battery-explode-poster.webp"
                className="relative z-10 w-full h-full object-contain select-none pointer-events-none"
                style={{ filter: "drop-shadow(0 24px 30px rgba(16,18,23,0.20))" }}
              >
                <source src="/video/battery-explode.webm" type="video/webm" />
                <source src="/video/battery-explode.mp4" type="video/mp4" />
              </video>
            </div>

            {/* Desktop stepper — constant height (compact rows + fixed caption) */}
            <div className="hidden lg:block lg:col-span-5 order-2">
              <div className="relative pl-6">
                <div className="absolute left-0 top-1 bottom-1 w-[3px] rounded-full bg-black/8 overflow-hidden">
                  <motion.div className="w-full origin-top rounded-full" style={{ scaleY: railScaleY, background: "linear-gradient(180deg,#FFD100,#D97706)" }} />
                </div>
                <div className="flex flex-col gap-2">
                  {STEPS.map((s, i) => <StepRow key={s.n} s={s} i={i} />)}
                </div>
                {/* fixed-height caption — never reflows the layout */}
                <div className="mt-3 min-h-[5rem]">
                  <AnimatePresence mode="wait">
                    <motion.p
                      key={active}
                      initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }}
                      transition={{ duration: 0.3 }}
                      className="text-[#52525b] text-sm leading-relaxed"
                    >
                      {STEPS[active].desc}
                    </motion.p>
                  </AnimatePresence>
                </div>
              </div>
            </div>

            {/* Mobile — active callout + pips */}
            <div className="lg:hidden order-2">
              <AnimatePresence mode="wait">
                <motion.div
                  key={active}
                  initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                  className="rounded-2xl p-4 frosted-card"
                  style={{ border: `1px solid ${STEPS[active].color}40` }}
                >
                  <div className="flex items-center gap-3 mb-1.5">
                    <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: `${STEPS[active].color}1f`, border: `1px solid ${STEPS[active].color}55` }}>
                      {(() => { const I = STEPS[active].Icon; return <I size={15} style={{ color: STEPS[active].color }} />; })()}
                    </div>
                    <span className="text-[11px] font-black tabular-nums" style={{ color: STEPS[active].color }}>{STEPS[active].n}</span>
                    <h3 className="font-black text-[#15171c] text-sm">{STEPS[active].title}</h3>
                  </div>
                  <p className="text-[#52525b] text-xs leading-relaxed">{STEPS[active].desc}</p>
                </motion.div>
              </AnimatePresence>
              <div className="flex justify-center gap-2 mt-3">
                {STEPS.map((s, i) => (
                  <span key={s.n} className="h-1.5 rounded-full transition-all duration-300" style={{ width: i === active ? 22 : 6, background: i === active ? s.color : "rgba(0,0,0,0.15)" }} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
