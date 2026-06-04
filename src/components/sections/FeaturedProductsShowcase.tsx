"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { ArrowRight, Zap, Battery } from "lucide-react";
import { PRODUCTS } from "@/lib/constants";

const FEATURED = PRODUCTS.slice(0, 4); // E-Cycle, E-Scooter, E-Rickshaw, ESS

export default function FeaturedProductsShowcase() {
  const [hovered, setHovered] = useState<number | null>(null);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section ref={ref} className="py-24 relative overflow-hidden bg-[#f7f7f5]">
      <div className="absolute inset-0 grid-pattern opacity-20" />

      <div className="container-custom relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-[#D97706] text-[11px] font-bold tracking-[0.25em] uppercase mb-4 block">
            Flagship Products
          </span>
          <h2 className="text-4xl md:text-5xl font-black text-[#15171c]">
            Engineered for <span className="gradient-text">Performance</span>
          </h2>
        </motion.div>

        {/* Featured row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {FEATURED.map((product, i) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 50 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.65, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered(null)}
            >
              <Link href={product.href} className="group block">
                <div
                  className="relative rounded-2xl overflow-hidden transition-all duration-500 h-72 md:h-80"
                  style={{
                    background: hovered === i
                      ? `linear-gradient(160deg, ${product.color}14 0%, #ffffff 100%)`
                      : "linear-gradient(160deg, #ffffff 0%, #f7f7f5 100%)",
                    border: `1px solid ${hovered === i ? product.color + "55" : "rgba(0,0,0,0.06)"}`,
                    boxShadow: hovered === i ? `0 0 30px ${product.color}22, 0 16px 44px rgba(0,0,0,0.1)` : "0 2px 12px rgba(0,0,0,0.05)",
                    transform: hovered === i ? "translateY(-8px)" : "translateY(0)",
                  }}
                >
                  {/* Category tag */}
                  <div className="absolute top-3 left-3 z-10">
                    <span
                      className="text-[9px] font-bold tracking-[0.15em] uppercase px-2.5 py-1 rounded-full backdrop-blur-sm"
                      style={{
                        color: product.color,
                        background: `${product.color}15`,
                        border: `1px solid ${product.color}30`,
                      }}
                    >
                      {product.category}
                    </span>
                  </div>

                  {/* Product image — zooms and lifts on hover */}
                  <div className="absolute inset-0 flex items-center justify-center pt-8 pb-16">
                    <motion.div
                      animate={{
                        scale: hovered === i ? 1.1 : 1,
                        y: hovered === i ? -8 : 0,
                      }}
                      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                      className="relative w-40 h-40 md:w-48 md:h-48"
                    >
                      <Image
                        src={product.image}
                        alt={product.name}
                        fill
                        className="object-contain drop-shadow-2xl"
                        sizes="200px"
                      />
                      {/* Glow under image on hover */}
                      <AnimatePresence>
                        {hovered === i && (
                          <motion.div
                            initial={{ opacity: 0, scale: 0.5 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.5 }}
                            className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-32 h-6 rounded-full blur-2xl"
                            style={{ backgroundColor: product.color }}
                          />
                        )}
                      </AnimatePresence>
                    </motion.div>
                  </div>

                  {/* Bottom info */}
                  <div className="absolute bottom-0 inset-x-0 p-4 bg-gradient-to-t from-white via-white/90 to-transparent">
                    <div className="text-[#15171c] font-bold text-sm mb-1 truncate">{product.name}</div>
                    <div className="flex items-center justify-between">
                      <span className="text-[#71717a] text-xs">{product.specs[0].value}</span>
                      <motion.div
                        animate={{ x: hovered === i ? 0 : 4, opacity: hovered === i ? 1 : 0 }}
                        transition={{ duration: 0.25 }}
                        className="flex items-center gap-1 text-xs font-bold"
                        style={{ color: product.color }}
                      >
                        View <ArrowRight size={10} />
                      </motion.div>
                    </div>
                  </div>

                  {/* Scan-line effect on hover */}
                  <AnimatePresence>
                    {hovered === i && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="absolute inset-0 pointer-events-none"
                        style={{
                          background: `linear-gradient(180deg, transparent 0%, ${product.color}06 50%, transparent 100%)`,
                          backgroundSize: "100% 8px",
                        }}
                      />
                    )}
                  </AnimatePresence>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.6 }}
          className="mt-10 text-center"
        >
          <Link
            href="/products"
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl bg-[#FFD100] text-black font-black text-sm hover:bg-[#FFA800] hover:shadow-[0_0_30px_rgba(255,209,0,0.4)] transition-all"
          >
            <Battery size={16} />
            View All 7 Products
            <ArrowRight size={14} />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
