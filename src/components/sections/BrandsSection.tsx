"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useInView } from "framer-motion";

// All 44 brand partner / OEM logos (full set from maxvoltenergy.com)
const BRANDS = [
  "/images/brand/client-pwd.webp", "/images/brand/client-eav.webp",
  "/images/brand/-ami.webp", "/images/brand/-apy.webp", "/images/brand/-arz.webp",
  "/images/brand/-auo.webp", "/images/brand/-aur.webp", "/images/brand/-axl.webp",
  "/images/brand/-bfs.webp", "/images/brand/-ckk.webp", "/images/brand/-doh.webp",
  "/images/brand/-dps.webp", "/images/brand/-enx.webp", "/images/brand/-exa.webp",
  "/images/brand/-ftk.webp", "/images/brand/-ghi.webp", "/images/brand/-hpz.webp",
  "/images/brand/-icu.webp", "/images/brand/-iwc.webp", "/images/brand/-jfb.webp",
  "/images/brand/-kcp.webp", "/images/brand/-kfv.webp", "/images/brand/-kin.webp",
  "/images/brand/-kuz.webp", "/images/brand/-myc.webp", "/images/brand/-nmq.webp",
  "/images/brand/-nyl.webp", "/images/brand/-ocj.webp", "/images/brand/-oei.webp",
  "/images/brand/-ojz.webp", "/images/brand/-ols.webp", "/images/brand/-qtv.webp",
  "/images/brand/-rxh.webp", "/images/brand/-seo.webp", "/images/brand/-swi.webp",
  "/images/brand/-uqw.webp", "/images/brand/-vrh.webp", "/images/brand/-wgv.webp",
  "/images/brand/-xhe.webp", "/images/brand/-yjw.webp", "/images/brand/-ylh.webp",
  "/images/brand/-yvg.webp", "/images/brand/-zou.webp", "/images/brand/-zsc.webp",
];

// Split into two marquee rows; duplicate each for a seamless loop
const HALF = Math.ceil(BRANDS.length / 2);
const ROW1 = [...BRANDS.slice(0, HALF), ...BRANDS.slice(0, HALF)];
const ROW2 = [...BRANDS.slice(HALF), ...BRANDS.slice(HALF)];

export default function BrandsSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section ref={ref} className="py-20 relative overflow-hidden bg-[#f7f7f5]">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#FFD100]/10 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#FFD100]/10 to-transparent" />

      <div className="container-custom mb-10">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <span className="text-[#D97706] text-xs font-semibold tracking-[0.2em] uppercase mb-3 block">Trusted Partners</span>
          <h2 className="text-3xl font-bold text-[#15171c]">OEM & Dealer Network</h2>
        </motion.div>
      </div>

      {/* Marquee row 1 — left to right */}
      <div className="relative mb-3">
        {/* Fade edges */}
        <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />
        <motion.div
          className="flex gap-4 w-max"
          animate={{ x: ["0%", "-50%"] }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
        >
          {ROW1.map((src, i) => (
            <div
              key={i}
              className="flex-shrink-0 w-28 h-16 rounded-xl bg-black/[0.03] border border-black/6 flex items-center justify-center overflow-hidden p-3 hover:border-[#FFD100]/20 transition-colors"
            >
              <div className="relative w-full h-full">
                <Image
                  src={src}
                  alt={`Brand partner ${i}`}
                  fill
                  className="object-contain opacity-50 hover:opacity-80 transition-opacity grayscale hover:grayscale-0"
                  sizes="112px"
                />
              </div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Marquee row 2 — right to left */}
      <div className="relative">
        <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />
        <motion.div
          className="flex gap-4 w-max"
          animate={{ x: ["-50%", "0%"] }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
        >
          {ROW2.map((src, i) => (
            <div
              key={i}
              className="flex-shrink-0 w-28 h-16 rounded-xl bg-black/[0.03] border border-black/6 flex items-center justify-center overflow-hidden p-3"
            >
              <div className="relative w-full h-full">
                <Image
                  src={src}
                  alt={`Brand partner ${i}`}
                  fill
                  className="object-contain opacity-40 hover:opacity-70 transition-opacity grayscale hover:grayscale-0"
                  sizes="112px"
                />
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
