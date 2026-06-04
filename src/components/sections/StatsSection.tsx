"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useInView } from "framer-motion";
import { FadeUp, StaggerGroup, staggerItem } from "@/components/ui/AnimatedText";
import TiltCard from "@/components/ui/TiltCard";

const STATS = [
  { prefix: "₹", value: 100, suffix: "+ Cr", label: "Annual Revenue", subLabel: "FY 2025", color: "#FFD100", arc: 85 },
  { prefix: "", value: 6000, suffix: "+", label: "Monthly Production", subLabel: "Battery Packs", color: "#FFA800", arc: 92 },
  { prefix: "", value: 58, suffix: "+", label: "Retail Dealers", subLabel: "Pan India", color: "#FF8C00", arc: 70 },
  { prefix: "", value: 6, suffix: "+", label: "OEM Partners", subLabel: "Manufacturing", color: "#7c3aed", arc: 60 },
  { prefix: "", value: 170, suffix: "+", label: "Team Members", subLabel: "Skilled Workforce", color: "#f97316", arc: 78 },
  { prefix: "", value: 22, suffix: "+", label: "States Covered", subLabel: "Nationwide", color: "#ec4899", arc: 65 },
];

function AnimatedCounter({ value, duration = 2000 }: { value: number; duration?: number }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });

  useEffect(() => {
    if (!inView) return;
    const start = Date.now();
    const end = start + duration;
    const update = () => {
      const now = Date.now();
      const progress = Math.min(1, (now - start) / duration);
      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * value));
      if (progress < 1) requestAnimationFrame(update);
      else setCount(value);
    };
    requestAnimationFrame(update);
  }, [inView, value, duration]);

  return <span ref={ref}>{count.toLocaleString()}</span>;
}

// SVG arc progress ring
function ArcRing({ color, percent, size = 80 }: { color: string; percent: number; size?: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  const r = (size - 8) / 2;
  const circ = 2 * Math.PI * r;
  const dash = (percent / 100) * circ;

  return (
    <div ref={ref} className="relative" style={{ width: size, height: size }}>
      {/* Track */}
      <svg width={size} height={size} className="absolute inset-0 -rotate-90">
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth={4} />
        <motion.circle
          cx={size / 2} cy={size / 2} r={r}
          fill="none"
          stroke={color}
          strokeWidth={4}
          strokeLinecap="round"
          strokeDasharray={circ}
          initial={{ strokeDashoffset: circ }}
          animate={inView ? { strokeDashoffset: circ - dash } : {}}
          transition={{ duration: 1.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          style={{ filter: `drop-shadow(0 0 6px ${color}80)` }}
        />
      </svg>
    </div>
  );
}

export default function StatsSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="relative py-28 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-white" />
      <div className="absolute inset-0 grid-pattern opacity-15" />
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-[#FFD100]/20 to-transparent" />
      <div className="absolute bottom-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-[#FFD100]/20 to-transparent" />

      {/* Big ambient glow */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <motion.div
          className="w-[600px] h-[300px] rounded-full"
          style={{ background: "radial-gradient(ellipse, rgba(255,209,0,0.04) 0%, transparent 70%)" }}
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 5, repeat: Infinity }}
        />
      </div>

      <div className="container-custom relative z-10">
        {/* Header */}
        <FadeUp className="text-center mb-16">
          <span className="text-[#D97706] text-xs font-bold tracking-[0.25em] uppercase mb-4 block">By The Numbers</span>
          <h2 className="text-4xl md:text-5xl font-black text-[#15171c] mb-4 leading-tight">
            India&apos;s Fastest-Growing{" "}
            <span className="gradient-text">EV Battery Company</span>
          </h2>
          <p className="text-[#5f6470] text-sm max-w-lg mx-auto">
            From a 15-battery/day startup in 2019 to a NSE-listed company powering India&apos;s electric future.
          </p>
        </FadeUp>

        {/* Stats grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {STATS.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 50, scale: 0.9 }}
              animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
              transition={{ duration: 0.65, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
            >
              <TiltCard
                className="h-full p-5 rounded-2xl frosted-card border border-black/6 hover:border-black/8 transition-colors text-center flex flex-col items-center gap-3"
                maxTilt={6}
              >
                {/* Arc ring */}
                <div className="relative flex items-center justify-center">
                  <ArcRing color={s.color} percent={s.arc} size={72} />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <motion.div
                      className="w-2 h-2 rounded-full"
                      style={{ backgroundColor: s.color }}
                      animate={{ scale: [1, 1.5, 1], opacity: [0.7, 1, 0.7] }}
                      transition={{ duration: 2, repeat: Infinity, delay: i * 0.3 }}
                    />
                  </div>
                </div>

                {/* Value */}
                <div className="tabular-nums font-black text-2xl leading-none" style={{ color: s.color }}>
                  <span className="text-base">{s.prefix}</span>
                  <AnimatedCounter value={s.value} duration={2000} />
                  <span className="text-lg">{s.suffix}</span>
                </div>

                {/* Labels */}
                <div>
                  <div className="text-[#15171c] text-xs font-bold">{s.label}</div>
                  <div className="text-[#71717a] text-[10px] mt-0.5">{s.subLabel}</div>
                </div>

                {/* Bottom glow line */}
                <motion.div
                  className="absolute bottom-0 left-1/4 right-1/4 h-[1px] rounded-full"
                  style={{ backgroundColor: s.color }}
                  animate={{ opacity: [0.3, 0.8, 0.3], scaleX: [0.5, 1, 0.5] }}
                  transition={{ duration: 3, repeat: Infinity, delay: i * 0.5 }}
                />
              </TiltCard>
            </motion.div>
          ))}
        </div>

        {/* Growth timeline bar */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.6 }}
          className="mt-12 p-6 rounded-2xl frosted-card border border-black/6"
        >
          <div className="flex items-center justify-between mb-4">
            <span className="text-[#52525b] text-xs font-medium uppercase tracking-wider">Growth Journey 2019 → 2025</span>
            <span className="text-[#D97706] text-xs font-bold">400x Scale-up</span>
          </div>
          <div className="flex items-center gap-2">
            {[
              { year: "2019", units: "15/day", pct: 5 },
              { year: "2020", units: "20/day", pct: 12 },
              { year: "2021", units: "30/day", pct: 22 },
              { year: "2022", units: "50/day", pct: 35 },
              { year: "2023", units: "80/day", pct: 52 },
              { year: "2024", units: "85/day", pct: 72 },
              { year: "2025", units: "200/day", pct: 100 },
            ].map((item, i) => (
              <div key={item.year} className="flex-1">
                <motion.div
                  className="rounded-t-sm relative overflow-hidden"
                  style={{ background: `linear-gradient(to top, #FFD100, #FFA800)` }}
                  initial={{ height: 0 }}
                  animate={inView ? { height: `${item.pct * 0.6}px` } : {}}
                  transition={{ duration: 1.2, delay: 0.6 + i * 0.08, ease: [0.22, 1, 0.36, 1] }}
                >
                  <motion.div
                    className="absolute inset-0"
                    animate={{ opacity: [0.5, 1, 0.5] }}
                    transition={{ duration: 2, repeat: Infinity, delay: i * 0.2 }}
                  />
                </motion.div>
                <div className="text-[#8a8a93] text-[8px] text-center mt-1.5">{item.year}</div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
