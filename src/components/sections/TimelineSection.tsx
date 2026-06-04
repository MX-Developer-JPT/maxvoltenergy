"use client";

import { useRef } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { TIMELINE } from "@/lib/constants";
import { CheckCircle2, ArrowRight } from "lucide-react";
import { FadeUp, ClipReveal } from "@/components/ui/AnimatedText";

function TimelineCard({ item, index }: { item: typeof TIMELINE[0]; index: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const isEven = index % 2 === 0;

  const YEAR_COLORS = ["#FFD100", "#FFA800", "#FF8C00", "#7c3aed", "#f97316", "#ec4899", "#FFD100"];
  const color = YEAR_COLORS[index % YEAR_COLORS.length];

  return (
    <div
      ref={ref}
      className={`relative flex items-start gap-6 md:gap-8 ${isEven ? "md:flex-row" : "md:flex-row-reverse"} flex-row`}
    >
      {/* Content side */}
      <motion.div
        className={`flex-1 ml-12 md:ml-0 ${isEven ? "md:pr-12" : "md:pl-12"}`}
        initial={{ opacity: 0, x: isEven ? -50 : 50 }}
        animate={inView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
      >
        <div
          className="p-6 rounded-2xl relative overflow-hidden group cursor-default"
          style={{
            background: "linear-gradient(135deg, #ffffff 0%, #f7f7f5 100%)",
            border: "1px solid rgba(0,0,0,0.06)",
            boxShadow: "0 2px 14px rgba(0,0,0,0.05)",
          }}
        >
          {/* Hover glow */}
          <motion.div
            className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
            style={{ background: `radial-gradient(circle at 30% 30%, ${color}08 0%, transparent 70%)` }}
          />

          {/* Year tag */}
          <div className="flex items-center gap-3 mb-4">
            <span
              className="text-xs font-black px-3 py-1 rounded-lg"
              style={{ color, background: `${color}15`, border: `1px solid ${color}30` }}
            >
              {item.year}
            </span>
            <span className="text-[#15171c] font-bold text-lg">{item.title}</span>
          </div>

          {/* Events */}
          <ul className="space-y-2">
            {item.events.map((event, ei) => (
              <motion.li
                key={event}
                className="flex items-start gap-2 text-[#52525b] text-sm"
                initial={{ opacity: 0, x: -15 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: 0.2 + ei * 0.07, duration: 0.5 }}
              >
                <CheckCircle2 size={13} className="shrink-0 mt-0.5" style={{ color: `${color}80` }} />
                {event}
              </motion.li>
            ))}
          </ul>

          {/* Bottom color line */}
          <motion.div
            className="absolute bottom-0 left-0 h-[2px] rounded-full"
            style={{ background: `linear-gradient(90deg, ${color}, transparent)` }}
            initial={{ width: 0 }}
            animate={inView ? { width: "60%" } : {}}
            transition={{ duration: 0.9, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
          />
        </div>
      </motion.div>

      {/* Center node */}
      <div className="absolute left-4 md:left-1/2 -translate-x-1/2 z-10">
        <motion.div
          className="relative"
          initial={{ scale: 0, opacity: 0 }}
          animate={inView ? { scale: 1, opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.15, type: "spring", stiffness: 200 }}
        >
          {/* Pulsing ring */}
          <motion.div
            className="absolute inset-0 rounded-full"
            style={{ border: `1px solid ${color}40` }}
            animate={{ scale: [1, 1.8], opacity: [0.6, 0] }}
            transition={{ duration: 1.8, repeat: Infinity }}
          />
          <div
            className="w-9 h-9 rounded-full flex items-center justify-center"
            style={{ background: "#ffffff", border: `2px solid ${color}60` }}
          >
            <div className="w-3 h-3 rounded-full" style={{ backgroundColor: color, boxShadow: `0 0 8px ${color}` }} />
          </div>
        </motion.div>
      </div>

      {/* Empty side for desktop alternating layout */}
      <div className="hidden md:block flex-1" />
    </div>
  );
}

export default function TimelineSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  // Scroll-driven vertical line growth
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start 80%", "end 20%"] });
  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section ref={containerRef} className="section-padding relative overflow-hidden bg-white">
      <div className="absolute inset-0 dot-pattern opacity-15" />
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-[#FFD100]/15 to-transparent" />
      <div className="absolute bottom-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-[#FFD100]/15 to-transparent" />

      <div className="container-custom relative z-10">
        {/* Header */}
        <FadeUp className="text-center mb-20">
          <span className="text-[#D97706] text-[11px] font-bold tracking-[0.25em] uppercase mb-4 block">Company Journey</span>
          <h2 className="text-4xl md:text-5xl font-black text-[#15171c] mb-4">
            From Prototype to{" "}
            <span className="gradient-text">Public Listing</span>
          </h2>
          <p className="text-[#5f6470] text-sm max-w-lg mx-auto">
            Six years of relentless innovation, strategic growth, and a commitment to powering India&apos;s electric future.
          </p>
        </FadeUp>

        {/* Timeline */}
        <div ref={ref} className="relative">
          {/* Scroll-animated center line */}
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px -translate-x-px bg-black/[0.04]">
            <motion.div
              className="w-full origin-top"
              style={{
                height: lineHeight,
                background: "linear-gradient(to bottom, #FFD100, #FFA800, #FF8C00, #7c3aed)",
                filter: "blur(0.5px)",
              }}
            />
          </div>

          <div className="space-y-12">
            {TIMELINE.map((item, index) => (
              <TimelineCard key={item.year} item={item} index={index} />
            ))}
          </div>
        </div>

        {/* End node */}
        <motion.div
          className="flex flex-col items-center mt-12 gap-4"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 1.2 }}
        >
          <div className="w-12 h-12 rounded-full bg-[#FFD100]/15 border border-[#FFD100]/30 flex items-center justify-center">
            <motion.div
              className="w-5 h-5 rounded-full bg-[#FFD100]"
              animate={{ scale: [1, 1.3, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </div>
          <span className="text-[#52525b] text-sm font-medium">And the journey continues…</span>
          <a href="/about-us" className="flex items-center gap-1.5 text-[#D97706] text-sm font-bold hover:gap-3 transition-all">
            Full Story <ArrowRight size={13} />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
