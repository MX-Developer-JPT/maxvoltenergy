"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";

/**
 * Scroll-driven EXPLODED battery using the REAL MaxVolt part renders.
 * Save these 4 images (white studio background is fine — we use mix-blend
 * multiply so the white disappears on the white section):
 *   /images/battery/case.jpg   — silver MaxVolt housing (with yellow label)
 *   /images/battery/cells.jpg  — blue lithium cell pack
 *   /images/battery/bms.jpg    — green BMS controller board
 *   /images/battery/lid.jpg    — black top cover plate
 *
 * At rest the parts nest into a full pack. Scroll down →
 * lid lifts off → BMS board lifts → cell pack pulls up → housing settles.
 */
const blend: React.CSSProperties = { mixBlendMode: "multiply" };

export default function BatteryExploded() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const p = useSpring(scrollYProgress, { stiffness: 70, damping: 24, mass: 0.5 });

  const lidY = useTransform(p, [0.22, 0.68], [0, -200]);
  const bmsY = useTransform(p, [0.26, 0.7], [0, -120]);
  const cellsY = useTransform(p, [0.34, 0.72], [0, -30]);
  const caseY = useTransform(p, [0.22, 0.7], [0, 18]);
  const labels = useTransform(p, [0.3, 0.6], [0, 1]);
  const glow = useTransform(p, [0.3, 0.6], [0, 1]);

  return (
    <div ref={ref} className="relative w-full h-full">
      {/* energy glow that appears as parts separate */}
      <motion.div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[70%] h-[60%] rounded-full blur-3xl pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(255,209,0,0.45) 0%, transparent 70%)", opacity: glow }}
      />

      {/* Housing / case — bottom */}
      <motion.div className="absolute inset-x-0 bottom-0 h-[46%]" style={{ y: caseY }}>
        <Image src="/images/battery/case.jpg" alt="MaxVolt battery housing" fill className="object-contain" style={blend} sizes="500px" />
        <motion.span style={{ opacity: labels }} className="absolute left-0 top-1/2 -translate-x-full -translate-y-1/2 whitespace-nowrap text-[11px] font-bold text-[#15171c] pr-2">
          Rugged Housing <span className="text-[#D97706]">●</span>
        </motion.span>
      </motion.div>

      {/* Cell pack — lower middle (sits inside case) */}
      <motion.div className="absolute inset-x-0 top-[42%] h-[32%]" style={{ y: cellsY }}>
        <Image src="/images/battery/cells.jpg" alt="MaxVolt lithium cell pack" fill className="object-contain" style={blend} sizes="500px" />
        <motion.span style={{ opacity: labels }} className="absolute right-0 top-1/2 translate-x-full -translate-y-1/2 whitespace-nowrap text-[11px] font-bold text-[#15171c] pl-2">
          <span className="text-[#D97706]">●</span> Lithium Cell Pack
        </motion.span>
      </motion.div>

      {/* BMS board — upper middle (mounts under the lid) */}
      <motion.div className="absolute inset-x-0 top-[20%] h-[26%]" style={{ y: bmsY }}>
        <Image src="/images/battery/bms.jpg" alt="MaxVolt BMS controller" fill className="object-contain" style={blend} sizes="500px" />
        <motion.span style={{ opacity: labels }} className="absolute left-0 top-1/2 -translate-x-full -translate-y-1/2 whitespace-nowrap text-[11px] font-bold text-[#15171c] pr-2">
          Smart BMS <span className="text-[#D97706]">●</span>
        </motion.span>
      </motion.div>

      {/* Lid / cover — top */}
      <motion.div className="absolute inset-x-0 top-0 h-[22%]" style={{ y: lidY }}>
        <Image src="/images/battery/lid.jpg" alt="MaxVolt top cover" fill className="object-contain" style={blend} sizes="500px" />
        <motion.span style={{ opacity: labels }} className="absolute right-0 top-1/2 translate-x-full -translate-y-1/2 whitespace-nowrap text-[11px] font-bold text-[#15171c] pl-2">
          <span className="text-[#D97706]">●</span> Protective Cover
        </motion.span>
      </motion.div>

      {/* connecting energy line */}
      <motion.div
        className="absolute left-1/2 top-[10%] -translate-x-1/2 w-0.5 h-[70%] pointer-events-none"
        style={{ opacity: labels, background: "linear-gradient(to bottom, transparent, rgba(255,209,0,0.5), transparent)" }}
      />
    </div>
  );
}
