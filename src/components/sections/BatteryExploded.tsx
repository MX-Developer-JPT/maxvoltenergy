"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";

/**
 * Scroll-driven EXPLODED battery, modelled entirely in CSS/SVG (no images, no
 * background). Three real parts stack into a full pack at rest and pull apart
 * as you scroll: BMS board lifts highest → cell stack pulls out → housing stays.
 * Scroll up re-nests everything.
 */
export default function BatteryExploded() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const p = useSpring(scrollYProgress, { stiffness: 70, damping: 24, mass: 0.5 });

  // Explosion offsets (px). At p≈0.25 closed → p≈0.7 fully open.
  const bmsY = useTransform(p, [0.25, 0.7], [0, -150]);
  const lidY = useTransform(p, [0.25, 0.7], [0, -96]);
  const cellsY = useTransform(p, [0.32, 0.72], [0, -34]);
  const caseY = useTransform(p, [0.25, 0.7], [0, 14]);
  const spread = useTransform(p, [0.25, 0.7], [0, 1]); // label/line reveal
  const glow = useTransform(p, [0.3, 0.6], [0, 1]);

  const cols = Array.from({ length: 11 });

  return (
    <div ref={ref} className="relative w-full h-full flex items-center justify-center select-none">
      <div className="relative" style={{ width: 280, height: 420 }}>

        {/* ambient energy glow when open */}
        <motion.div
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[260px] h-[260px] rounded-full blur-3xl pointer-events-none"
          style={{ background: "radial-gradient(circle, rgba(255,209,0,0.5) 0%, transparent 70%)", opacity: glow }}
        />

        {/* ───────── BMS board (top) ───────── */}
        <motion.div className="absolute left-1/2 -translate-x-1/2" style={{ top: 8, y: bmsY }}>
          {/* connector cable */}
          <div className="absolute -left-7 top-1.5 w-8 h-3 rounded-full bg-gradient-to-r from-[#cfcfcf] to-[#9a9a9a] shadow" />
          <div className="relative w-[210px] h-[34px] rounded-md bg-gradient-to-b from-[#1f7a3d] to-[#155c2d] shadow-[0_6px_14px_rgba(0,0,0,0.25)] border border-[#0d3d1e] overflow-hidden">
            {/* PCB traces */}
            <div className="absolute inset-0 opacity-30"
              style={{ backgroundImage: "linear-gradient(90deg, rgba(255,255,255,0.25) 1px, transparent 1px), linear-gradient(rgba(255,255,255,0.18) 1px, transparent 1px)", backgroundSize: "14px 8px" }} />
            {/* chips */}
            <div className="absolute top-2 left-4 w-7 h-4 rounded-sm bg-[#0c0c0c]" />
            <div className="absolute top-2 left-14 w-5 h-4 rounded-sm bg-[#0c0c0c]" />
            <div className="absolute top-2 right-5 w-9 h-4 rounded-sm bg-[#111]" />
            <div className="absolute bottom-1.5 left-6 w-2 h-2 rounded-full bg-[#FFD100]" />
            <div className="absolute bottom-1.5 left-16 w-2 h-2 rounded-full bg-[#e63946]" />
            <div className="absolute bottom-1.5 right-8 w-2 h-2 rounded-full bg-[#FFD100]" />
          </div>
          <motion.span
            className="absolute -right-2 top-1/2 -translate-y-1/2 translate-x-full whitespace-nowrap text-[10px] font-bold text-[#15171c]"
            style={{ opacity: spread }}
          >
            <span className="text-[#D97706]">●</span> Smart BMS
          </motion.span>
        </motion.div>

        {/* ───────── Top lid plate ───────── */}
        <motion.div className="absolute left-1/2 -translate-x-1/2" style={{ top: 52, y: lidY }}>
          <div className="w-[224px] h-3.5 rounded-md bg-gradient-to-b from-[#e9e9e6] to-[#bcbcb6] shadow-[0_5px_12px_rgba(0,0,0,0.2)] border border-[#a7a7a0]" />
        </motion.div>

        {/* ───────── Cell stack (middle) ───────── */}
        <motion.div className="absolute left-1/2 -translate-x-1/2" style={{ top: 92, y: cellsY }}>
          <div className="relative w-[226px] rounded-lg p-2 bg-gradient-to-b from-[#f3f3ef] to-[#e2e2dc] border border-[#cfcfc8] shadow-[0_8px_18px_rgba(0,0,0,0.15)]">
            {/* top bus bar */}
            <div className="h-1.5 rounded bg-gradient-to-r from-[#FFA800] to-[#FFD100] mb-1.5" />
            {/* cylinder cells */}
            <div className="flex justify-between gap-[3px]">
              {cols.map((_, i) => (
                <div key={i} className="relative w-[15px] h-[92px] rounded-[7px] overflow-hidden"
                  style={{ background: "linear-gradient(90deg, #2b6fb0 0%, #5aa9e6 45%, #8fd0ff 55%, #2b6fb0 100%)", boxShadow: "inset -1px 0 2px rgba(0,0,0,0.25)" }}>
                  {/* cell top cap */}
                  <div className="absolute top-0 inset-x-0 h-2 rounded-t-[7px] bg-gradient-to-b from-[#dff1ff] to-[#9fcdef]" />
                  {/* highlight */}
                  <div className="absolute top-2 left-[3px] w-[3px] h-[78px] rounded-full bg-white/40" />
                </div>
              ))}
            </div>
            {/* bottom bus bar */}
            <div className="h-1.5 rounded bg-gradient-to-r from-[#FFD100] to-[#FFA800] mt-1.5" />
          </div>
          <motion.span
            className="absolute -left-2 top-1/2 -translate-y-1/2 -translate-x-full whitespace-nowrap text-[10px] font-bold text-[#15171c]"
            style={{ opacity: spread }}
          >
            Lithium Cells <span className="text-[#D97706]">●</span>
          </motion.span>
        </motion.div>

        {/* ───────── Housing / case (bottom) ───────── */}
        <motion.div className="absolute left-1/2 -translate-x-1/2" style={{ top: 232, y: caseY }}>
          <div className="relative w-[240px] h-[150px] rounded-2xl bg-gradient-to-b from-[#e8e8e3] to-[#c4c4bd] border border-[#b3b3ac] shadow-[0_16px_30px_rgba(0,0,0,0.18)] overflow-hidden">
            {/* inner cavity lip */}
            <div className="absolute top-0 inset-x-3 h-3 rounded-b-lg bg-gradient-to-b from-[#9d9d96] to-transparent" />
            {/* yellow brand label */}
            <div className="absolute inset-x-0 bottom-0 h-[96px] bg-gradient-to-br from-[#FFD100] to-[#FFB800] flex flex-col justify-center px-4"
              style={{ clipPath: "polygon(0 18%, 100% 0, 100% 100%, 0 100%)" }}>
              <div className="flex items-center gap-2">
                <svg width="26" height="26" viewBox="0 0 64 64"><path d="M14 46 V20 L26 36 L38 20 V46" fill="none" stroke="#15171c" strokeWidth="6" strokeLinejoin="round" strokeLinecap="round"/></svg>
                <div className="leading-none">
                  <div className="text-[#15171c] font-black text-[13px]">MaxVolt Energy</div>
                  <div className="text-[#7a5b00] text-[8px] font-semibold tracking-wide">Energize the Future</div>
                </div>
              </div>
              <div className="mt-1.5 flex items-center gap-2 text-[8px] font-bold text-[#15171c]/70">
                <span className="px-1.5 py-0.5 rounded bg-black/10">AIS 156</span>
                <span className="px-1.5 py-0.5 rounded bg-black/10">CE</span>
                <span className="px-1.5 py-0.5 rounded bg-black/10">ISO</span>
              </div>
            </div>
          </div>
          <motion.span
            className="absolute -left-2 bottom-6 -translate-x-full whitespace-nowrap text-[10px] font-bold text-[#15171c]"
            style={{ opacity: spread }}
          >
            Rugged Housing <span className="text-[#D97706]">●</span>
          </motion.span>
        </motion.div>

        {/* connecting energy lines between parts when open */}
        <motion.div
          className="absolute left-1/2 -translate-x-1/2 pointer-events-none"
          style={{ top: 44, height: 200, width: 2, opacity: spread, background: "linear-gradient(to bottom, transparent, rgba(255,209,0,0.5), transparent)" }}
        />
      </div>
    </div>
  );
}
