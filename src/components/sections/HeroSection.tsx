"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  motion, useScroll, useTransform, AnimatePresence,
} from "framer-motion";
import { ArrowRight, ChevronDown, Shield, Award, Zap, Play } from "lucide-react";
import MagneticButton from "@/components/ui/MagneticButton";

// Product showcase items — each shows a different battery
const PRODUCTS = [
  {
    label: "E-Rickshaw",
    tag: "51V · LiFePO4",
    image: "/images/product/e-rickshaw-lithium-battery-ohn.webp",
    spec: "100Ah · Fast Charge",
    color: "#D97706",
    head1: "Driving India's",
    head2: "E-Rickshaw Fleet",
    sub: "Fast-charging 51V lithium packs that end battery drain and maximize every driver's daily earnings.",
  },
  {
    label: "E-Scooter",
    tag: "48V–74V · NMC",
    image: "/images/product/e-scooter-bike-lithium-battery-mpu.webp",
    spec: "Up to 40Ah · Lightweight",
    color: "#D97706",
    head1: "Powering Every",
    head2: "Electric Ride",
    sub: "Lightweight, high-density 48V–74V batteries engineered for modern e-scooters and bikes.",
  },
  {
    label: "Energy Storage",
    tag: "51.2V · LiFePO4",
    image: "/images/product/lithium-battery-energy-storage-solutions-tjf.webp",
    spec: "300Ah · Grid-Ready",
    color: "#D97706",
    head1: "Storing Clean",
    head2: "Energy at Scale",
    sub: "Grid-ready lithium energy storage for homes, businesses, and renewable integration.",
  },
  {
    label: "Custom",
    tag: "Application-Specific",
    image: "/images/product/customized-battery-solution-jkz.webp",
    spec: "Any Voltage · Any Form",
    color: "#D97706",
    head1: "Custom Packs for",
    head2: "Any Application",
    sub: "Tailor-made lithium packs for medical devices, power banks, CCTV, router backup UPS, power tools, flashlights, toys and more.",
  },
];

const STATS = [
  { value: "₹100Cr+", label: "Revenue" },
  { value: "6,000+", label: "Units/Month" },
  { value: "58+", label: "Dealers" },
  { value: "NSE", label: "Listed" },
];

// Floating particles
function Particles() {
  const particles = Array.from({ length: 35 }, (_, i) => ({
    id: i,
    x: Math.random() * 100, y: Math.random() * 100,
    size: Math.random() * 2 + 0.5,
    dur: Math.random() * 10 + 5,
    delay: Math.random() * 5,
    tx: (Math.random() - 0.5) * 70,
    ty: (Math.random() - 0.5) * 70,
  }));

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full bg-[#FFD100]"
          style={{ left: `${p.x}%`, top: `${p.y}%`, width: p.size, height: p.size }}
          animate={{ x: [0, p.tx, 0], y: [0, p.ty, 0], opacity: [0.15, 0.6, 0.15] }}
          transition={{ duration: p.dur, delay: p.delay, repeat: Infinity, ease: "easeInOut" }}
        />
      ))}
    </div>
  );
}

// Animated product showcase card (right side)
function ProductShowcase({ active, setActive }: { active: number; setActive: (i: number) => void }) {
  const product = PRODUCTS[active];

  return (
    <div className="relative w-full h-full flex items-center justify-center">
      {/* Rotating glow rings */}
      <motion.div
        className="absolute w-[500px] h-[500px] rounded-full"
        style={{ border: "1px solid rgba(255,209,0,0.12)" }}
        animate={{ rotate: 360 }}
        transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
      >
        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2.5 h-2.5 rounded-full bg-[#FFD100]"
          style={{ boxShadow: "0 0 10px #FFD100" }} />
      </motion.div>
      <motion.div
        className="absolute w-[390px] h-[390px] rounded-full"
        style={{ border: "1px solid rgba(255,209,0,0.08)" }}
        animate={{ rotate: -360 }}
        transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
      >
        <div className="absolute bottom-0 right-0 w-2 h-2 rounded-full bg-[#FFA800]"
          style={{ boxShadow: "0 0 8px #FFA800" }} />
      </motion.div>

      {/* Ambient glow */}
      <motion.div
        className="absolute w-72 h-72 rounded-full"
        style={{ background: `radial-gradient(circle, ${product.color}18 0%, transparent 70%)` }}
        animate={{ scale: [1, 1.12, 1] }}
        transition={{ duration: 3, repeat: Infinity }}
        key={active + "glow"}
      />

      {/* Product image */}
      <AnimatePresence mode="wait">
        <motion.div
          key={active}
          initial={{ opacity: 0, scale: 0.85, y: 30, rotateY: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0, rotateY: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: -20, rotateY: -20 }}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          className="relative z-10 flex flex-col items-center"
          style={{ perspective: 800 }}
        >
          {/* Floating image */}
          <motion.div
            animate={{ y: [-8, 8, -8] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="relative w-72 h-72 md:w-[26rem] md:h-[26rem]"
          >
            <Image
              src={product.image}
              alt={product.label}
              fill
              className="object-contain drop-shadow-2xl"
              sizes="420px"
              priority
            />
            {/* Shadow/reflection */}
            <div
              className="absolute -bottom-6 left-1/2 -translate-x-1/2 w-40 h-6 rounded-full blur-2xl opacity-50"
              style={{ backgroundColor: product.color }}
            />
          </motion.div>

          {/* Label chip below image */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mt-8 flex flex-col items-center gap-1"
          >
            <div
              className="px-5 py-2 rounded-full text-xs font-black tracking-[0.15em] uppercase"
              style={{
                backgroundColor: `${product.color}18`,
                border: `1px solid ${product.color}40`,
                color: product.color,
              }}
            >
              {product.label} Battery
            </div>
            <div className="text-[#71717a] text-xs font-medium">{product.tag} · {product.spec}</div>
          </motion.div>
        </motion.div>
      </AnimatePresence>

      {/* Product selector dots */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 flex gap-2">
        {PRODUCTS.map((p, i) => (
          <button key={i} onClick={() => setActive(i)}>
            <motion.div
              className="h-1.5 rounded-full transition-all duration-500"
              animate={{
                width: i === active ? 24 : 6,
                backgroundColor: i === active ? product.color : "rgba(0,0,0,0.18)",
              }}
            />
          </button>
        ))}
      </div>
    </div>
  );
}

export default function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start start", "end start"] });
  const contentY = useTransform(scrollYProgress, [0, 1], ["0%", "12%"]);
  const imageY = useTransform(scrollYProgress, [0, 1], ["0%", "18%"]);
  const fadeOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  const [active, setActive] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setActive((a) => (a + 1) % PRODUCTS.length), 4000);
    return () => clearInterval(t);
  }, []);

  const product = PRODUCTS[active];
  const words1 = product.head1.split(" ");
  const words2 = product.head2.split(" ");

  return (
    <section ref={sectionRef} className="relative min-h-screen flex items-center overflow-hidden bg-white">

      {/* Pure black background */}
      <div className="absolute inset-0 bg-white" />

      {/* Grid + particles */}
      <div className="absolute inset-0 grid-pattern opacity-30" />
      <Particles />

      {/* Radial gradient — centre-left */}
      <motion.div
        className="absolute top-1/2 left-[15%] w-[700px] h-[700px] -translate-y-1/2 rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(255,209,0,0.04) 0%, transparent 60%)" }}
        animate={{ scale: [1, 1.08, 1] }}
        transition={{ duration: 7, repeat: Infinity }}
      />

      {/* ─── Main two-column layout ─── */}
      <div className="container-custom relative z-10 pt-24 pb-16 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-4 items-center min-h-[80vh]">

          {/* LEFT — text */}
          <motion.div style={{ y: contentY, opacity: fadeOpacity }} className="flex flex-col">

            {/* Live badge */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-volt mb-8 self-start"
              style={{ border: "1px solid rgba(255,209,0,0.2)" }}
            >
              <motion.div
                className="w-2 h-2 rounded-full bg-[#FFD100]"
                animate={{ scale: [1, 1.6, 1], opacity: [1, 0.3, 1] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              />
              <span className="text-[#D97706] text-[11px] font-bold tracking-[0.18em] uppercase">
                NSE SME Emerge · ₹100+ Cr Revenue
              </span>
            </motion.div>

            {/* Headline — changes with active product */}
            <div className="mb-1.5 min-h-[2.2em]">
              <AnimatePresence mode="wait">
                <motion.h1 key={active} className="my-0">
                  <div className="flex flex-wrap gap-x-5 overflow-hidden">
                    {words1.map((w, i) => (
                      <div key={i} className="overflow-hidden">
                        <motion.span
                          className="block text-5xl md:text-6xl xl:text-[5.25rem] font-black text-[#15171c] leading-[1.03] tracking-tight"
                          initial={{ y: "110%" }}
                          animate={{ y: 0 }}
                          exit={{ y: "-110%" }}
                          transition={{ duration: 0.6, delay: i * 0.06, ease: [0.22, 1, 0.36, 1] }}
                        >
                          {w}
                        </motion.span>
                      </div>
                    ))}
                  </div>
                  <div className="flex flex-wrap gap-x-5 overflow-hidden">
                    {words2.map((w, i) => (
                      <div key={i} className="overflow-hidden">
                        <motion.span
                          className="block text-5xl md:text-6xl xl:text-[5.25rem] font-black leading-[1.03] tracking-tight gradient-text"
                          initial={{ y: "110%" }}
                          animate={{ y: 0 }}
                          exit={{ y: "-110%" }}
                          transition={{ duration: 0.6, delay: 0.12 + i * 0.06, ease: [0.22, 1, 0.36, 1] }}
                        >
                          {w}
                        </motion.span>
                      </div>
                    ))}
                  </div>
                </motion.h1>
              </AnimatePresence>
            </div>

            {/* Subheadline — changes with active product */}
            <AnimatePresence mode="wait">
              <motion.p
                key={active}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                className="text-[#52525b] text-lg leading-relaxed mt-5 mb-9 max-w-md min-h-[3.5em]"
              >
                {product.sub}
              </motion.p>
            </AnimatePresence>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, delay: 0.82, ease: [0.22, 1, 0.36, 1] }}
              className="flex flex-wrap items-center gap-4 mb-10"
            >
              <MagneticButton strength={0.3}>
                <Link
                  href="/products"
                  className="group relative flex items-center gap-2.5 px-8 py-4 rounded-xl bg-[#FFD100] text-black font-black text-sm overflow-hidden"
                  style={{ boxShadow: "0 0 30px rgba(255,209,0,0.35)" }}
                >
                  <motion.span
                    className="absolute inset-0 -skew-x-12 bg-black/[0.02]5"
                    initial={{ x: "-110%" }}
                    whileHover={{ x: "110%" }}
                    transition={{ duration: 0.55 }}
                  />
                  <span className="relative">Explore Products</span>
                  <ArrowRight size={15} className="relative group-hover:translate-x-1 transition-transform" />
                </Link>
              </MagneticButton>

              <MagneticButton strength={0.2}>
                <Link
                  href="/contact-us"
                  className="group flex items-center gap-2 px-8 py-4 rounded-xl border border-black/10 hover:border-[#FFD100]/40 text-[#3f3f46] hover:text-[#15171c] text-sm font-medium transition-all"
                >
                  Get a Quote
                </Link>
              </MagneticButton>
            </motion.div>

            {/* Trust badges */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 1.0 }}
              className="flex flex-wrap items-center gap-5"
            >
              {[
                { Icon: Shield, label: "AIS 156 Certified" },
                { Icon: Award, label: "NSE Listed" },
                { Icon: Zap, label: "6000+ Units/Month" },
              ].map(({ Icon, label }) => (
                <motion.div key={label} className="flex items-center gap-2 text-[#71717a]" whileHover={{ color: "#FFD100", x: 2 }}>
                  <Icon size={13} className="text-[#D97706]" />
                  <span className="text-xs font-medium">{label}</span>
                </motion.div>
              ))}
            </motion.div>

            {/* Stat row */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.15, duration: 0.6 }}
              className="mt-10 grid grid-cols-4 gap-3 max-w-sm"
            >
              {STATS.map((s, i) => (
                <motion.div
                  key={s.label}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.2 + i * 0.08 }}
                  className="flex flex-col items-center p-3 rounded-xl"
                  style={{
                    background: "rgba(255,209,0,0.05)",
                    border: "1px solid rgba(255,209,0,0.12)",
                  }}
                >
                  <span className="text-[#D97706] font-black text-sm leading-none">{s.value}</span>
                  <span className="text-[#71717a] text-[9px] mt-1 uppercase tracking-wide">{s.label}</span>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* RIGHT — Product showcase */}
          <motion.div
            style={{ y: imageY, opacity: fadeOpacity }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.4 }}
            className="relative h-[560px] md:h-[660px] flex items-center justify-center"
          >
            <ProductShowcase active={active} setActive={setActive} />
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-10"
      >
        <span className="text-[#a1a1aa] text-[9px] tracking-[0.3em] uppercase font-medium">Scroll</span>
        <div className="w-px h-8 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/10" />
          <motion.div
            className="absolute top-0 w-full bg-[#D97706]"
            animate={{ y: ["-100%", "200%"] }}
            transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut" }}
            style={{ height: "40%" }}
          />
        </div>
      </motion.div>

      {/* Bottom accent line */}
      <div className="absolute bottom-0 inset-x-0 h-px">
        <motion.div
          className="h-full"
          style={{ background: "linear-gradient(90deg, transparent, #FFD100 40%, #FFA800 60%, transparent)" }}
          animate={{ opacity: [0.3, 0.8, 0.3] }}
          transition={{ duration: 3, repeat: Infinity }}
        />
      </div>
    </section>
  );
}
