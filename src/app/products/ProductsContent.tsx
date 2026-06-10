"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import PageHero from "@/components/ui/PageHero";
import { PRODUCTS } from "@/lib/constants";
import { ArrowRight, Battery, Zap, Shield, CheckCircle2 } from "lucide-react";

function ProductCard({ product, index }: { product: typeof PRODUCTS[0]; index: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: (index % 3) * 0.1 }}
    >
      <Link href={product.href} className="group block h-full">
        <div className="relative h-full flex flex-col p-8 rounded-2xl bg-white border border-black/6 hover:border-black/8 transition-all duration-500 hover:shadow-[0_20px_60px_rgba(0,0,0,0.6)] hover:-translate-y-1 overflow-hidden">
          {/* Glow */}
          <div
            className="absolute top-0 right-0 w-48 h-48 rounded-full blur-[80px] opacity-0 group-hover:opacity-15 transition-opacity duration-500"
            style={{ background: product.color }}
          />

          {/* Header */}
          <div className="flex items-start justify-between mb-6">
            <div
              className="w-14 h-14 rounded-2xl flex items-center justify-center"
              style={{ backgroundColor: `${product.color}12`, border: `1px solid ${product.color}25` }}
            >
              <Battery size={24} style={{ color: product.color }} />
            </div>
            <span
              className="text-[10px] font-semibold tracking-[0.15em] uppercase px-3 py-1.5 rounded-full border"
              style={{ color: product.color, borderColor: `${product.color}30`, backgroundColor: `${product.color}08` }}
            >
              {product.category}
            </span>
          </div>

          {/* Name & Description */}
          <h3 className="text-[#15171c] font-bold text-xl mb-3 group-hover:text-[#15171c] transition-colors leading-tight">
            {product.name}
          </h3>
          <p className="text-[#5f6470] text-sm leading-relaxed mb-6 flex-1">
            {product.description}
          </p>

          {/* Specs grid */}
          <div className="grid grid-cols-2 gap-2 mb-6">
            {product.specs.map((spec) => (
              <div key={spec.label} className="bg-black/[0.03] rounded-xl p-3">
                <div className="text-[#8a8a93] text-[10px] font-medium uppercase tracking-wide mb-0.5">{spec.label}</div>
                <div className="text-[#15171c] text-xs font-bold">{spec.value}</div>
              </div>
            ))}
          </div>

          {/* Key features */}
          <div className="space-y-2 mb-6">
            {["Advanced BMS Protection", "AIS 156 Compliant", "Warranty Included"].map((feat) => (
              <div key={feat} className="flex items-center gap-2 text-xs text-[#71717a]">
                <CheckCircle2 size={12} style={{ color: product.color, opacity: 0.6 }} />
                {feat}
              </div>
            ))}
          </div>

          {/* CTA */}
          <div
            className="flex items-center gap-2 text-sm font-semibold"
            style={{ color: product.color }}
          >
            View Full Specifications
            <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
          </div>

          {/* Bottom line */}
          <div
            className="absolute bottom-0 left-0 h-[2px] w-0 group-hover:w-full transition-all duration-500"
            style={{ background: `linear-gradient(90deg, ${product.color}, transparent)` }}
          />
        </div>
      </Link>
    </motion.div>
  );
}

export default function ProductsContent() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <>
      <PageHero image="/images/category/products-ygb.webp"
        badge="Product Range"
        title={<>Advanced <span className="gradient-text">Lithium Battery</span> Solutions</>}
        description="Seven specialized product lines engineered for India's electric mobility revolution — from e-cycles to grid-scale energy storage systems."
      />

      {/* Key highlights */}
      <section className="py-12 bg-[#f7f7f5] border-b border-black/6">
        <div className="container-custom">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { Icon: Battery, label: "7 Product Lines", sub: "Complete portfolio" },
              { Icon: Shield, label: "AIS 156 Certified", sub: "Government approved" },
              { Icon: Zap, label: "LiFePO4 & NMC", sub: "Premium cell chemistry" },
              { Icon: CheckCircle2, label: "Advanced BMS", sub: "Smart protection" },
            ].map(({ Icon, label, sub }) => (
              <div key={label} className="flex items-center gap-3 p-4 rounded-xl bg-black/[0.02] border border-black/6">
                <div className="w-9 h-9 rounded-lg bg-[#FFD100]/10 border border-[#FFD100]/20 flex items-center justify-center shrink-0">
                  <Icon size={16} className="text-[#D97706]" />
                </div>
                <div>
                  <div className="text-[#15171c] text-sm font-bold">{label}</div>
                  <div className="text-[#71717a] text-xs">{sub}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Products grid */}
      <section ref={ref} className="section-padding bg-white">
        <div className="absolute inset-0 dot-pattern opacity-15 pointer-events-none" />
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {PRODUCTS.map((product, index) => (
              <ProductCard key={product.id} product={product} index={index} />
            ))}
          </div>

          {/* Custom solution CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="mt-10 p-10 rounded-2xl text-center"
            style={{
              background: "linear-gradient(135deg, rgba(255,209,0,0.05) 0%, rgba(255,168,0,0.03) 100%)",
              border: "1px solid rgba(255,209,0,0.1)",
            }}
          >
            <h3 className="text-2xl font-bold text-[#15171c] mb-3">
              Don&apos;t See What You Need?
            </h3>
            <p className="text-[#5f6470] text-sm mb-6 max-w-md mx-auto">
              We design custom lithium battery packs for any voltage, capacity, and form factor.
              Medical devices, industrial equipment, specialty EVs — we deliver.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                href="/products/customized-battery-solution"
                className="flex items-center gap-2 px-6 py-3 rounded-xl bg-[#FFD100] text-black font-bold text-sm hover:bg-[#FFD100]/90 transition-all"
              >
                Custom Solutions
                <ArrowRight size={14} />
              </Link>
              <Link
                href="/contact-us"
                className="flex items-center gap-2 px-6 py-3 rounded-xl border border-black/8 text-[#3f3f46] hover:text-[#15171c] text-sm font-medium transition-all"
              >
                Talk to Engineers
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
