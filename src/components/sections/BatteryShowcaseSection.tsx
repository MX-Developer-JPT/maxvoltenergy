"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useSpring, MotionValue } from "framer-motion";
import { Cpu, BatteryCharging, ShieldCheck, Thermometer } from "lucide-react";

const IMG = "/images/battery-pack.png"; // the uploaded MaxVolt pack render

const FEATURES = [
  { Icon: Cpu, title: "Smart BMS", desc: "Intelligent battery management constantly monitors voltage & current.", side: "left", at: 0.18 },
  { Icon: BatteryCharging, title: "Quick Charge Ready", desc: "High-density lithium cells engineered for rapid, safe charging.", side: "right", at: 0.30 },
  { Icon: ShieldCheck, title: "Multi-Layer Safety", desc: "Overcharge, overheat and short-circuit protection built in.", side: "left", at: 0.50 },
  { Icon: Thermometer, title: "Temperature Control", desc: "Active thermal management keeps every cell in its optimal range.", side: "right", at: 0.66 },
];

export default function BatteryShowcaseSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  // Smooth the scroll value for buttery motion
  const p = useSpring(scrollYProgress, { stiffness: 80, damping: 24, mass: 0.4 });

  // Lid + cell stack lift (opens on scroll down, closes on scroll up)
  const lidY = useTransform(p, [0, 0.7], ["0%", "-46%"]);
  const lidRotate = useTransform(p, [0, 0.7], [0, -3]);
  const lidScale = useTransform(p, [0, 0.7], [1, 1.04]);

  // Inner glow + energy reveal between the layers
  const gapOpacity = useTransform(p, [0.05, 0.4], [0, 1]);
  const gapScaleY = useTransform(p, [0.05, 0.7], [0.2, 1]);

  // Base settles slightly
  const baseY = useTransform(p, [0, 0.7], ["0%", "4%"]);

  // Headline state
  const headOpen = useTransform(p, [0.15, 0.45], [0, 1]);

  return (
    <section ref={sectionRef} className="relative bg-white" style={{ height: "230vh" }}>
      {/* Sticky stage */}
      <div className="sticky top-0 h-screen overflow-hidden flex items-center">
        {/* Background */}
        <div className="absolute inset-0 grid-pattern opacity-[0.18]" />
        <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-[#FFD100]/30 to-transparent" />
        <motion.div
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[680px] h-[680px] rounded-full pointer-events-none"
          style={{ background: "radial-gradient(circle, rgba(255,209,0,0.10) 0%, transparent 65%)", opacity: gapOpacity }}
        />

        <div className="container-custom relative z-10 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">

            {/* ── Left: copy ── */}
            <div className="order-2 lg:order-1 text-center lg:text-left">
              <span className="text-[#D97706] text-[11px] font-bold tracking-[0.25em] uppercase mb-4 block">
                Inside The Cell
              </span>
              <h2 className="text-4xl md:text-5xl font-black text-[#15171c] leading-tight mb-5">
                Engineered to the{" "}
                <span className="gradient-text">Last Cell</span>
              </h2>
              <p className="text-[#5f6470] text-base leading-relaxed mb-6 max-w-md mx-auto lg:mx-0">
                Scroll to open the pack. Every MaxVolt battery layers premium lithium cells,
                an intelligent BMS, and multi-stage safety into one rugged, AIS&nbsp;156-certified module.
              </p>
              <motion.div
                style={{ opacity: headOpen }}
                className="inline-flex items-center gap-2 text-[#D97706] text-sm font-bold"
              >
                <span className="w-8 h-px bg-[#D97706]" /> Cutaway view active
              </motion.div>
            </div>

            {/* ── Right: animated battery ── */}
            <div className="order-1 lg:order-2 relative h-[60vh] md:h-[68vh] flex items-center justify-center">
              <div className="relative w-full max-w-[440px] h-full">

                {/* Energy core revealed between layers */}
                <motion.div
                  className="absolute left-1/2 -translate-x-1/2 rounded-full blur-2xl"
                  style={{
                    bottom: "34%",
                    width: "70%",
                    height: "26%",
                    background: "radial-gradient(ellipse, rgba(255,209,0,0.55) 0%, rgba(217,119,6,0.25) 45%, transparent 70%)",
                    opacity: gapOpacity,
                    scaleY: gapScaleY,
                    transformOrigin: "bottom",
                  }}
                />

                {/* BASE layer — bottom of the image (gray labelled box), stays put */}
                <motion.div
                  className="absolute inset-0"
                  style={{ y: baseY, clipPath: "inset(54% 0 0 0)" }}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={IMG} alt="MaxVolt battery pack base" className="w-full h-full object-contain" draggable={false} />
                </motion.div>

                {/* LID layer — top of the image (lid + board + cells), lifts up */}
                <motion.div
                  className="absolute inset-0"
                  style={{
                    y: lidY,
                    rotate: lidRotate,
                    scale: lidScale,
                    clipPath: "inset(0 0 46% 0)",
                    transformOrigin: "center bottom",
                    filter: "drop-shadow(0 24px 40px rgba(0,0,0,0.22))",
                  }}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={IMG} alt="MaxVolt battery pack internals" className="w-full h-full object-contain" draggable={false} />
                </motion.div>

                {/* Feature callouts */}
                {FEATURES.map((f, i) => (
                  <Callout key={i} f={f} index={i} p={p} />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Scroll hint */}
        <motion.div
          style={{ opacity: useTransform(p, [0, 0.12], [1, 0]) }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        >
          <span className="text-[#a1a1aa] text-[10px] tracking-[0.3em] uppercase font-medium">Scroll to open</span>
          <motion.div animate={{ y: [0, 8, 0] }} transition={{ duration: 1.4, repeat: Infinity }}>
            <div className="w-5 h-8 rounded-full border-2 border-[#a1a1aa] flex items-start justify-center p-1">
              <div className="w-1 h-1.5 rounded-full bg-[#D97706]" />
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

function Callout({
  f, index, p,
}: {
  f: { Icon: typeof Cpu; title: string; desc: string; side: string; at: number };
  index: number;
  p: MotionValue<number>;
}) {
  const op = useTransform(p, [f.at - 0.06, f.at + 0.04], [0, 1]);
  const x = useTransform(p, [f.at - 0.06, f.at + 0.04], [f.side === "left" ? -24 : 24, 0]);
  return (
    <motion.div
      style={{ opacity: op, x, top: `${18 + index * 20}%` }}
      className={`hidden md:flex absolute items-center gap-2.5 ${f.side === "left" ? "left-[-12%] flex-row" : "right-[-12%] flex-row-reverse text-right"}`}
    >
      <div className="w-9 h-9 rounded-xl bg-white border border-[#D97706]/25 shadow-md flex items-center justify-center shrink-0">
        <f.Icon size={16} className="text-[#D97706]" />
      </div>
      <div className="max-w-[150px]">
        <div className="text-[#15171c] text-xs font-bold leading-tight">{f.title}</div>
        <div className="text-[#71717a] text-[10px] leading-snug mt-0.5">{f.desc}</div>
      </div>
    </motion.div>
  );
}
