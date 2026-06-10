"use client";

import { useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, useInView } from "framer-motion";
import { ArrowRight, CheckCircle2, MessageCircle } from "lucide-react";
import PageHero from "@/components/ui/PageHero";
import { PRODUCTS, SITE_CONFIG } from "@/lib/constants";

// Extra portfolio detail keyed by product id
const DETAIL: Record<string, { tagline: string; chemistry: string; highlights: string[]; applications: string[] }> = {
  "e-cycle-lithium-battery": {
    tagline: "Lightweight range for electric bicycles",
    chemistry: "Li-Ion / NMC",
    highlights: ["Extended single-charge range", "Soft & hard pack options", "Smart BMS protection", "Fast charging support"],
    applications: ["Electric bicycles", "Pedal-assist e-cycles", "Last-mile delivery cycles"],
  },
  "e-scooter-bike-lithium-battery": {
    tagline: "High-density power for two-wheelers",
    chemistry: "NMC / Li-Ion",
    highlights: ["48V–74V configurations", "Up to 40Ah capacity", "Lightweight, compact form", "Thermal-stable cells"],
    applications: ["Electric scooters", "Electric motorcycles", "Two-wheeler OEMs"],
  },
  "e-rickshaw-lithium-battery": {
    tagline: "Maximize every driver's daily earnings",
    chemistry: "LiFePO4 / LFP",
    highlights: ["51V high-capacity packs", "86Ah–100Ah range", "Rugged metal casing", "Long cycle life"],
    applications: ["E-rickshaws", "E-autos", "Three-wheeler cargo"],
  },
  "lithium-battery-energy-storage-solutions": {
    tagline: "Scalable storage for homes & grids",
    chemistry: "LiFePO4",
    highlights: ["12.8V–51.2V range", "100Ah–300Ah capacity", "Grid & hybrid ready", "Deep-cycle performance"],
    applications: ["Residential ESS", "Commercial backup", "Grid integration"],
  },
  "lithium-battery-for-solar-application": {
    tagline: "Maximize your solar investment",
    chemistry: "LiFePO4",
    highlights: [">95% round-trip efficiency", "3,000+ cycle life", "Mobile-app monitoring", "All solar systems"],
    applications: ["Rooftop solar storage", "Off-grid solar", "Solar + inverter hybrid"],
  },
  "customized-battery-solution": {
    tagline: "Engineered for any application",
    chemistry: "Application-specific",
    highlights: ["Any voltage / form factor", "Advanced smart BMS", "Medical-grade options", "Rapid prototyping"],
    applications: ["Medical (ECG, ultrasound, BP)", "Power banks & gadgets", "CCTV, router UPS, tools"],
  },
};

function ProductBlock({ product, index }: { product: (typeof PRODUCTS)[number]; index: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const detail = DETAIL[product.id];
  const reversed = index % 2 === 1;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="py-14 border-b border-black/6 last:border-0"
    >
      <div className={`grid grid-cols-1 lg:grid-cols-2 gap-10 items-center ${reversed ? "lg:[&>*:first-child]:order-2" : ""}`}>
        {/* Image */}
        <div className="relative">
          <div
            className="img-zoom relative h-72 md:h-80 rounded-3xl overflow-hidden flex items-center justify-center"
            style={{ background: `radial-gradient(circle at 50% 40%, ${product.color}14 0%, transparent 70%)` }}
          >
            <div className="relative w-56 h-56 md:w-64 md:h-64">
              <Image src={product.image} alt={product.name} fill className="object-contain drop-shadow-2xl" sizes="320px" />
            </div>
            <span
              className="absolute top-5 left-5 px-3 py-1.5 rounded-full text-[10px] font-black tracking-[0.15em] uppercase"
              style={{ backgroundColor: `${product.color}18`, border: `1px solid ${product.color}40`, color: product.color }}
            >
              {product.category}
            </span>
          </div>
        </div>

        {/* Detail */}
        <div>
          <h2 className="text-3xl md:text-4xl font-black text-[#15171c] mb-2 leading-tight">{product.name}</h2>
          {detail && <p className="text-[#D97706] font-semibold text-sm mb-4">{detail.tagline}</p>}
          <p className="text-[#52525b] text-sm leading-relaxed mb-5">{product.description}</p>

          {/* Specs */}
          <div className="grid grid-cols-2 gap-2.5 mb-5">
            {product.specs.map((s) => (
              <div key={s.label} className="p-3 rounded-xl bg-black/[0.03] border border-black/6">
                <div className="text-[#8a8a93] text-[10px] uppercase tracking-wide">{s.label}</div>
                <div className="text-[#15171c] font-bold text-sm">{s.value}</div>
              </div>
            ))}
          </div>

          {detail && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-1.5 mb-6">
              {detail.highlights.map((h) => (
                <div key={h} className="flex items-center gap-2 text-[#52525b] text-xs">
                  <CheckCircle2 size={13} style={{ color: product.color }} className="shrink-0" /> {h}
                </div>
              ))}
            </div>
          )}

          {detail && (
            <div className="flex flex-wrap gap-2 mb-6">
              {detail.applications.map((a) => (
                <span key={a} className="text-[11px] font-medium px-2.5 py-1 rounded-full bg-[#FFD100]/10 text-[#7a5b00] border border-[#FFD100]/25">{a}</span>
              ))}
            </div>
          )}

          <div className="flex flex-wrap gap-3">
            <Link href={product.href} className="group flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#FFD100] text-black font-bold text-sm hover:bg-[#FFA800] transition-all">
              Full Details <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link href="/contact-us" className="flex items-center gap-2 px-5 py-2.5 rounded-xl border border-black/10 text-[#3f3f46] hover:text-[#15171c] hover:border-[#FFD100]/40 text-sm font-medium transition-all">
              Enquire
            </Link>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function PortfolioContent() {
  return (
    <>
      <PageHero image="/images/category/products-ygb.webp"
        badge="Product Portfolio"
        title={<>The Complete <span className="gradient-text">Maxvolt Range</span></>}
        description="Every lithium battery solution we build — from electric mobility to solar storage and fully customized application-specific packs. Explore detailed specifications, chemistries and use cases."
      />

      <section className="section-padding bg-white pt-10">
        <div className="container-custom">
          {PRODUCTS.map((p, i) => (
            <ProductBlock key={p.id} product={p} index={i} />
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-[#0b0b0d] relative overflow-hidden">
        <div className="absolute inset-0 grid-pattern opacity-[0.07]" />
        <div className="container-custom relative z-10 text-center">
          <h2 className="text-3xl md:text-4xl font-black text-white mb-3">Don&apos;t see your <span className="gradient-text">exact requirement?</span></h2>
          <p className="text-white/60 text-sm max-w-lg mx-auto mb-7">
            Our in-house R&D team builds fully customized lithium packs for any voltage, capacity and application.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link href="/contact-us?type=custom" className="px-7 py-3.5 rounded-xl bg-[#FFD100] text-black font-black text-sm hover:bg-[#FFA800] transition-all">
              Request a Custom Pack
            </Link>
            <a
              href={`https://wa.me/${SITE_CONFIG.whatsapp.replace("+", "")}?text=Hi, I'd like to discuss a Maxvolt battery for my application.`}
              target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-2 px-7 py-3.5 rounded-xl border border-white/15 text-white/80 hover:text-white text-sm font-medium transition-all"
            >
              <MessageCircle size={15} /> WhatsApp
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
