"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform, useSpring, MotionValue } from "framer-motion";

/**
 * Scroll-driven EXPLODED battery using the real MaxVolt part renders.
 * White studio backgrounds are knocked out with mix-blend multiply on the white
 * section. Parts nest at rest and separate (lid → BMS → cells → housing) on scroll.
 */
const blend: React.CSSProperties = { mixBlendMode: "multiply" };

interface Part {
  src: string; label: string; side: "left" | "right";
  // layout box (percent of stage)
  top: number; height: number; width: number;
  // explode offset (px) at full open
  offset: number;
}

const PARTS: Part[] = [
  { src: "/images/battery/lid.jpg",   label: "Protective Cover",  side: "right", top: 4,  height: 16, width: 64, offset: -150 },
  { src: "/images/battery/bms.jpg",   label: "Smart BMS",         side: "left",  top: 24, height: 22, width: 78, offset: -86 },
  { src: "/images/battery/cells.jpg", label: "Lithium Cell Pack", side: "right", top: 46, height: 24, width: 60, offset: -28 },
  { src: "/images/battery/case.jpg",  label: "Rugged Housing",    side: "left",  top: 64, height: 34, width: 70, offset: 14 },
];

function PartLayer({ part, p, openAt }: { part: Part; p: MotionValue<number>; openAt: number }) {
  const y = useTransform(p, [0.22, 0.7], [0, part.offset]);
  const labelOpacity = useTransform(p, [openAt - 0.05, openAt + 0.08], [0, 1]);
  const labelX = useTransform(p, [openAt - 0.05, openAt + 0.08], [part.side === "left" ? -14 : 14, 0]);

  return (
    <motion.div
      className="absolute left-1/2 -translate-x-1/2"
      style={{ top: `${part.top}%`, height: `${part.height}%`, width: `${part.width}%`, y }}
    >
      <Image src={part.src} alt={part.label} fill className="object-contain" style={blend} sizes="460px" />
      {/* connector dot on the part */}
      <motion.div
        style={{ opacity: labelOpacity }}
        className={`absolute top-1/2 -translate-y-1/2 flex items-center gap-1.5 ${part.side === "left" ? "left-0 -translate-x-[calc(100%+8px)] flex-row-reverse" : "right-0 translate-x-[calc(100%+8px)]"}`}
      >
        <motion.span style={{ x: labelX }} className="whitespace-nowrap text-[11px] font-bold text-[#15171c]">
          {part.label}
        </motion.span>
        <span className="w-1.5 h-1.5 rounded-full bg-[#D97706]" />
      </motion.div>
    </motion.div>
  );
}

export default function BatteryExploded() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const p = useSpring(scrollYProgress, { stiffness: 70, damping: 26, mass: 0.5 });
  const glow = useTransform(p, [0.3, 0.6], [0, 1]);

  return (
    <div ref={ref} className="relative w-full h-full">
      {/* soft brand glow that grows as it opens */}
      <motion.div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[75%] h-[75%] rounded-full blur-3xl pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(255,209,0,0.35) 0%, transparent 70%)", opacity: glow }}
      />
      {PARTS.map((part, i) => (
        <PartLayer key={part.src} part={part} p={p} openAt={0.3 + i * 0.06} />
      ))}
    </div>
  );
}
