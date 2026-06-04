"use client";

import { useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { ArrowRight, Zap, ChevronRight } from "lucide-react";
import { PRODUCTS } from "@/lib/constants";
import TiltCard from "@/components/ui/TiltCard";
import MagneticButton from "@/components/ui/MagneticButton";
import { FadeUp, ClipReveal, StaggerGroup, staggerItem } from "@/components/ui/AnimatedText";

function ProductCard({ product, index }: { product: typeof PRODUCTS[0]; index: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 60, rotateX: -8 }}
      animate={inView ? { opacity: 1, y: 0, rotateX: 0 } : {}}
      transition={{ duration: 0.7, delay: (index % 4) * 0.09, ease: [0.22, 1, 0.36, 1] }}
      style={{ perspective: 800 }}
    >
      <TiltCard maxTilt={7} glareOpacity={0.1} className="h-full">
        <Link href={product.href} className="group block h-full">
          <div
            className="relative h-full flex flex-col rounded-2xl overflow-hidden border border-black/6 transition-all duration-500"
            style={{ background: "linear-gradient(160deg, #ffffff 0%, #f7f7f5 100%)", boxShadow: "0 2px 12px rgba(0,0,0,0.05)" }}
            onMouseEnter={e => {
              (e.currentTarget as HTMLElement).style.border = `1px solid ${product.color}55`;
              (e.currentTarget as HTMLElement).style.boxShadow = `0 0 24px ${product.color}22, 0 16px 40px rgba(0,0,0,0.1)`;
            }}
            onMouseLeave={e => {
              (e.currentTarget as HTMLElement).style.border = "1px solid rgba(0,0,0,0.06)";
              (e.currentTarget as HTMLElement).style.boxShadow = "0 2px 12px rgba(0,0,0,0.05)";
            }}
          >
            {/* Image area */}
            <div className="relative h-52 overflow-hidden bg-white">
              {/* Glow behind image */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-30 transition-opacity duration-700 blur-2xl"
                style={{ background: `radial-gradient(circle at center, ${product.color} 0%, transparent 70%)` }}
              />
              <motion.div
                className="absolute inset-0"
                whileHover={{ scale: 1.08 }}
                transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              >
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-cover object-center"
                  sizes="(max-width: 640px) 90vw, (max-width: 1024px) 45vw, 22vw"
                />
              </motion.div>
              {/* Gradient fade bottom */}
              <div className="absolute bottom-0 inset-x-0 h-24 bg-gradient-to-t from-white to-transparent" />

              {/* Category chip */}
              <motion.div
                className="absolute top-3 left-3"
                initial={{ x: -20, opacity: 0 }}
                animate={inView ? { x: 0, opacity: 1 } : {}}
                transition={{ delay: 0.2 + (index % 4) * 0.09 }}
              >
                <span
                  className="text-[9px] font-bold tracking-[0.18em] uppercase px-2.5 py-1 rounded-full backdrop-blur-md"
                  style={{
                    color: product.color,
                    background: `${product.color}18`,
                    border: `1px solid ${product.color}35`,
                  }}
                >
                  {product.category}
                </span>
              </motion.div>

              {/* Arrow chip top-right */}
              <div className="absolute top-3 right-3 w-7 h-7 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300"
                style={{ background: `${product.color}25`, border: `1px solid ${product.color}40` }}>
                <ArrowRight size={11} style={{ color: product.color }} />
              </div>
            </div>

            {/* Content */}
            <div className="flex flex-col flex-1 p-5">
              <h3 className="text-[#15171c] font-bold text-sm mb-2 leading-snug group-hover:text-[#D97706] transition-colors duration-300">
                {product.name}
              </h3>
              <p className="text-[#71717a] text-xs leading-relaxed mb-4 flex-1 line-clamp-2">{product.description}</p>

              {/* Mini specs */}
              <div className="grid grid-cols-2 gap-1.5 mb-4">
                {product.specs.slice(0, 2).map((spec) => (
                  <div key={spec.label} className="rounded-lg p-2" style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.04)" }}>
                    <div className="text-[#a1a1aa] text-[9px] uppercase tracking-wide mb-0.5">{spec.label}</div>
                    <div className="text-[#27272a] text-[11px] font-bold">{spec.value}</div>
                  </div>
                ))}
              </div>

              {/* CTA link */}
              <div className="flex items-center gap-1.5 text-[11px] font-bold transition-all duration-200 group-hover:gap-2.5"
                style={{ color: product.color }}>
                View Details
                <ChevronRight size={11} className="group-hover:translate-x-1 transition-transform" />
              </div>
            </div>

            {/* Bottom glow line — animates in */}
            <motion.div
              className="absolute bottom-0 inset-x-0 h-[2px]"
              style={{ background: `linear-gradient(90deg, transparent, ${product.color}, transparent)` }}
              initial={{ scaleX: 0 }}
              animate={inView ? { scaleX: 1 } : {}}
              transition={{ duration: 0.8, delay: 0.3 + (index % 4) * 0.09 }}
            />
          </div>
        </Link>
      </TiltCard>
    </motion.div>
  );
}

export default function ProductsSection() {
  const headerRef = useRef(null);
  const inView = useInView(headerRef, { once: true, margin: "-80px" });

  // Parallax on section label
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start end", "end start"] });
  const labelY = useTransform(scrollYProgress, [0, 1], ["-20px", "20px"]);

  return (
    <section ref={sectionRef} className="section-padding relative overflow-hidden bg-[#f7f7f5]">
      {/* Background */}
      <div className="absolute inset-0 dot-pattern opacity-15" />
      {/* Big diagonal accent line */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute w-[2px] h-[140%] top-[-20%] left-[40%]"
          style={{
            background: "linear-gradient(to bottom, transparent 0%, rgba(255,209,0,0.05) 40%, rgba(255,209,0,0.08) 60%, transparent 100%)",
            rotate: 20,
          }}
        />
      </div>

      <div className="container-custom relative z-10">
        {/* Section header */}
        <div ref={headerRef} className="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-6">
          <div>
            <motion.div
              style={{ y: labelY }}
              className="flex items-center gap-2 mb-4"
            >
              <motion.div
                className="w-1 h-7 rounded-full bg-[#FFD100]"
                animate={{ scaleY: [1, 1.4, 1] }}
                transition={{ duration: 2.5, repeat: Infinity }}
              />
              <span className="text-[#D97706] text-[11px] font-bold tracking-[0.25em] uppercase">Our Product Range</span>
            </motion.div>

            {/* Headline with clip-path reveal */}
            <div className="overflow-hidden">
              <motion.h2
                className="text-4xl md:text-5xl font-black text-[#15171c] leading-tight"
                initial={{ y: "100%" }}
                animate={inView ? { y: 0 } : {}}
                transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
              >
                Advanced Lithium
              </motion.h2>
            </div>
            <div className="overflow-hidden">
              <motion.h2
                className="text-4xl md:text-5xl font-black leading-tight gradient-text"
                initial={{ y: "100%" }}
                animate={inView ? { y: 0 } : {}}
                transition={{ duration: 0.9, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
              >
                Battery Solutions
              </motion.h2>
            </div>
          </div>

          <FadeUp delay={0.3} className="max-w-xs">
            <p className="text-[#5f6470] text-sm leading-relaxed mb-5">
              Seven specialized product lines engineered for India&apos;s electric future — from e-cycles to grid-scale storage.
            </p>
            <MagneticButton strength={0.2}>
              <Link
                href="/products"
                className="inline-flex items-center gap-2 text-[#D97706] text-sm font-bold border-b border-[#FFD100]/30 pb-0.5 hover:border-[#FFD100] transition-colors"
              >
                View All Products
                <ArrowRight size={13} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </MagneticButton>
          </FadeUp>
        </div>

        {/* Desktop grid */}
        <div className="hidden sm:grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {PRODUCTS.map((product, index) => (
            <ProductCard key={product.id} product={product} index={index} />
          ))}
        </div>

        {/* Mobile horizontal scroll */}
        <div className="sm:hidden flex gap-4 overflow-x-auto no-scrollbar pb-4 -mx-6 px-6">
          {PRODUCTS.map((product, index) => (
            <div key={product.id} className="flex-shrink-0 w-64">
              <ProductCard product={product} index={index} />
            </div>
          ))}
        </div>

        {/* Bottom CTA banner */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.5 }}
          className="mt-10 p-8 rounded-2xl relative overflow-hidden"
          style={{
            background: "linear-gradient(135deg, rgba(255,209,0,0.07) 0%, rgba(255,168,0,0.03) 50%, rgba(255,140,0,0.05) 100%)",
            border: "1px solid rgba(255,209,0,0.12)",
          }}
        >
          {/* Animated background beam */}
          <motion.div
            className="absolute inset-0 opacity-20"
            style={{ background: "linear-gradient(90deg, transparent 0%, rgba(255,209,0,0.3) 50%, transparent 100%)", backgroundSize: "200% 100%" }}
            animate={{ backgroundPosition: ["-100% 0", "300% 0"] }}
            transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
          />
          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <motion.div
                className="w-12 h-12 rounded-xl bg-[#FFD100]/15 border border-[#FFD100]/25 flex items-center justify-center"
                animate={{ rotate: [0, 5, -5, 0] }}
                transition={{ duration: 4, repeat: Infinity }}
              >
                <Zap size={22} className="text-[#D97706]" fill="#FFD100" />
              </motion.div>
              <div>
                <div className="text-[#15171c] font-bold text-lg">Need a Customized Solution?</div>
                <div className="text-[#5f6470] text-sm">Medical, industrial, specialty EV — we design it.</div>
              </div>
            </div>
            <MagneticButton strength={0.3}>
              <Link
                href="/products/customized-battery-solution"
                className="flex items-center gap-2 px-6 py-3 rounded-xl bg-[#FFD100] text-black font-bold text-sm hover:bg-[#FFD100]/90 transition-all"
                style={{ boxShadow: "0 0 24px rgba(255,209,0,0.3)" }}
              >
                Explore Custom
                <ArrowRight size={13} />
              </Link>
            </MagneticButton>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
