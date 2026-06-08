"use client";

import { useRef, useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { ArrowRight, CheckCircle2, Download, MessageCircle, Battery, Zap, Shield, ArrowLeft,
  Bike, Truck, Sun, Home, Building2, Cctv, Router, Smartphone, HeartPulse, Wrench, Lightbulb, BatteryCharging, Boxes, type LucideIcon } from "lucide-react";
import { PRODUCTS, SITE_CONFIG } from "@/lib/constants";
import { downloadCatalogue, CATALOGUES } from "@/lib/download";
import Reveal, { RevealStagger, RevealItem } from "@/components/ui/Reveal";

function appIcon(label: string): LucideIcon {
  const l = label.toLowerCase();
  if (/scooter|bike|two-?wheeler|motorcycle/.test(l)) return Bike;
  if (/rickshaw|auto|cargo|three-?wheeler|loader/.test(l)) return Truck;
  if (/cycle|bicycle|fitness/.test(l)) return Bike;
  if (/solar|rooftop|off-?grid/.test(l)) return Sun;
  if (/inverter|home|backup|residential|commute|leisure/.test(l)) return Home;
  if (/grid|utility|industrial|commercial/.test(l)) return Building2;
  if (/lantern|light|lamp|street|outdoor|emergency|flashlight|torch/.test(l)) return Lightbulb;
  if (/cctv|surveillance|camera/.test(l)) return Cctv;
  if (/router|iot|smart|ups/.test(l)) return Router;
  if (/power bank|wearable|gadget|electronic|toy|device/.test(l)) return Smartphone;
  if (/medical|ecg|bp|ultrasound|health|hospital/.test(l)) return HeartPulse;
  if (/tool|power tool|drill|mechanical/.test(l)) return Wrench;
  if (/storage|portable power|power unit|ess/.test(l)) return BatteryCharging;
  if (/oem|custom|pack|industrial/.test(l)) return Boxes;
  return Battery;
}

interface SpecRow {
  label: string;
  value: string;
}

interface SpecTable {
  headers: string[];
  rows: string[][];
}

interface ProductPageTemplateProps {
  product: {
    id: string;
    name: string;
    description: string;
    longDescription: string;
    overview?: string[];
    color: string;
    category: string;
    image?: string;
    appImage?: string;
    galleryImages?: string[];
    features: string[];
    benefits: { title: string; description: string }[];
    specTable?: SpecTable;
    quickSpecs?: SpecRow[];
    applications?: string[];
    certifications?: string[];
  };
}

// Rotating key-feature headlines that come and go near the product image.
function FeatureHeadlines({ features, color }: { features: string[]; color: string }) {
  const items = features.slice(0, 3);
  const [idx, setIdx] = useState(0);
  useEffect(() => {
    if (items.length === 0) return;
    const t = setInterval(() => setIdx((i) => (i + 1) % items.length), 2600);
    return () => clearInterval(t);
  }, [items.length]);
  if (items.length === 0) return null;

  // Three anchor positions around the image
  const positions = [
    "top-2 -left-4 md:-left-10",
    "top-1/2 -right-4 md:-right-12 -translate-y-1/2",
    "bottom-4 -left-2 md:-left-8",
  ];

  return (
    <div className="pointer-events-none absolute inset-0 z-20">
      <AnimatePresence mode="wait">
        <motion.div
          key={idx}
          initial={{ opacity: 0, y: 14, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -14, scale: 0.9 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className={`absolute ${positions[idx % positions.length]} max-w-[12rem]`}
        >
          <div
            className="flex items-center gap-2 px-4 py-2.5 rounded-full bg-white/90 backdrop-blur-md shadow-lg"
            style={{ border: `1px solid ${color}35` }}
          >
            <span className="w-2 h-2 rounded-full shrink-0" style={{ backgroundColor: color, boxShadow: `0 0 8px ${color}` }} />
            <span className="text-[#15171c] text-xs font-bold leading-tight">{items[idx]}</span>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

export default function ProductPageTemplate({ product }: ProductPageTemplateProps) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  const relatedProducts = PRODUCTS.filter(p => p.id !== product.id).slice(0, 3);

  return (
    <>
      {/* Hero */}
      <section className="relative pt-32 pb-20 overflow-hidden bg-white">
        <div className="absolute inset-0 grid-pattern opacity-25" />
        <div
          className="absolute top-1/2 right-1/4 w-96 h-96 rounded-full blur-[120px] opacity-10 pointer-events-none"
          style={{ background: product.color }}
        />
        <div className="container-custom relative z-10">
          <Link href="/products" className="inline-flex items-center gap-2 text-[#71717a] hover:text-[#15171c] text-sm mb-8 transition-colors">
            <ArrowLeft size={14} />
            All Products
          </Link>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7 }}
            >
              <span
                className="inline-block text-[10px] font-semibold tracking-[0.2em] uppercase px-3 py-1.5 rounded-full border mb-5"
                style={{ color: product.color, borderColor: `${product.color}30`, backgroundColor: `${product.color}08` }}
              >
                {product.category}
              </span>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-[#15171c] leading-tight tracking-tight mb-5">
                {product.name}
              </h1>
              <p className="text-[#52525b] text-lg leading-relaxed mb-8">
                {product.longDescription}
              </p>

              {/* Quick specs */}
              {product.quickSpecs && (
                <div className="grid grid-cols-2 gap-3 mb-8">
                  {product.quickSpecs.map((spec) => (
                    <div key={spec.label} className="p-3.5 rounded-xl bg-black/[0.03] border border-black/6">
                      <div className="text-[#8a8a93] text-[10px] font-medium uppercase tracking-wide mb-1">{spec.label}</div>
                      <div className="text-[#15171c] text-sm font-bold">{spec.value}</div>
                    </div>
                  ))}
                </div>
              )}

              <div className="flex flex-wrap gap-4">
                <a
                  href={`https://wa.me/${SITE_CONFIG.whatsapp.replace("+", "")}?text=Hi, I'm interested in ${product.name}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-sm transition-all active:scale-95"
                  style={{ backgroundColor: product.color, color: "#000" }}
                >
                  <MessageCircle size={15} />
                  Enquire Now
                </a>
                <button
                  type="button"
                  onClick={() => downloadCatalogue(
                    /solar|energy storage/i.test(product.category) ? CATALOGUES.solar : CATALOGUES.ev,
                    PRODUCTS.map((p) => ({ name: p.name, description: p.description, specs: p.specs })),
                  )}
                  className="flex items-center gap-2 px-6 py-3 rounded-xl border border-black/8 hover:border-white/20 text-[#3f3f46] hover:text-[#15171c] text-sm font-medium transition-all active:scale-95"
                >
                  <Download size={15} />
                  Download Catalogue
                </button>
              </div>
            </motion.div>

            {/* Visual */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="flex items-center justify-center"
            >
              <div className="relative w-[22rem] h-[22rem] md:w-96 md:h-96">
                {/* Animated key-feature headlines near the image */}
                <FeatureHeadlines features={product.features} color={product.color} />
                {/* Rotating rings */}
                <motion.div
                  className="absolute inset-0 rounded-full"
                  style={{ border: `1px solid ${product.color}20` }}
                  animate={{ rotate: 360 }}
                  transition={{ duration: 22, repeat: Infinity, ease: "linear" }}
                >
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 rounded-full" style={{ backgroundColor: product.color, boxShadow: `0 0 8px ${product.color}` }} />
                </motion.div>
                <motion.div
                  className="absolute inset-10 rounded-full"
                  style={{ border: `1px solid ${product.color}15` }}
                  animate={{ rotate: -360 }}
                  transition={{ duration: 16, repeat: Infinity, ease: "linear" }}
                >
                  <div className="absolute bottom-0 right-0 w-1.5 h-1.5 rounded-full" style={{ backgroundColor: product.color, opacity: 0.6 }} />
                </motion.div>

                {/* Core - real product image */}
                <div className="absolute inset-16 rounded-2xl overflow-hidden flex items-center justify-center"
                  style={{ background: `radial-gradient(circle, ${product.color}10 0%, transparent 70%)` }}>
                  {product.image ? (
                    <motion.div
                      animate={{ y: [-6, 6, -6] }}
                      transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                      className="relative w-44 h-44 md:w-52 md:h-52"
                    >
                      <Image
                        src={product.image}
                        alt={product.name}
                        fill
                        className="object-contain drop-shadow-2xl"
                        sizes="208px"
                      />
                      {/* Glow under image */}
                      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-24 h-4 rounded-full blur-xl opacity-60" style={{ backgroundColor: product.color }} />
                    </motion.div>
                  ) : (
                    <motion.div
                      animate={{ scale: [1, 1.05, 1] }}
                      transition={{ duration: 3, repeat: Infinity }}
                      className="w-20 h-32 rounded-2xl border-2 relative overflow-hidden"
                      style={{ borderColor: `${product.color}60`, backgroundColor: `${product.color}08` }}
                    >
                      <motion.div
                        className="absolute bottom-0 left-0 right-0 rounded-2xl"
                        animate={{ height: ["20%", "85%", "20%"] }}
                        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                        style={{ background: `linear-gradient(to top, ${product.color}40, ${product.color}10)` }}
                      />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <Zap size={22} style={{ color: product.color }} fill={product.color} />
                      </div>
                    </motion.div>
                  )}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Overview */}
      {product.overview && product.overview.length > 0 && (
        <section className="section-padding bg-white pt-0">
          <Reveal className="container-custom max-w-4xl">
            <h2 className="text-3xl font-bold text-[#15171c] mb-6">
              Overview
            </h2>
            <div className="space-y-4">
              {product.overview.map((p, i) => (
                <p key={i} className="text-[#52525b] text-base leading-relaxed">{p}</p>
              ))}
            </div>
          </Reveal>
        </section>
      )}

      {/* In real-world use — application image */}
      {product.appImage && (
        <section className="section-padding bg-white pt-0">
          <Reveal className="container-custom">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center rounded-3xl overflow-hidden p-8 md:p-10"
              style={{ background: `linear-gradient(135deg, ${product.color}0c 0%, transparent 70%)`, border: `1px solid ${product.color}1f` }}>
              <div className="relative h-64 md:h-80 flex items-center justify-center">
                <div className="absolute inset-0 rounded-full blur-[90px] opacity-30 pointer-events-none" style={{ background: product.color }} />
                <motion.div
                  initial={{ opacity: 0, scale: 0.92 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                  className="relative w-full h-full"
                >
                  <Image src={product.appImage} alt={`${product.name} in real-world use`} fill className="object-contain drop-shadow-2xl" sizes="(max-width:1024px) 90vw, 520px" />
                </motion.div>
              </div>
              <div>
                <span className="inline-block text-[10px] font-bold tracking-[0.2em] uppercase px-3 py-1.5 rounded-full mb-4"
                  style={{ color: product.color, border: `1px solid ${product.color}30`, backgroundColor: `${product.color}10` }}>
                  In Real-World Use
                </span>
                <h2 className="text-3xl font-black text-[#15171c] mb-4 leading-tight">Built for the way India <span style={{ color: product.color }}>actually rides &amp; powers</span></h2>
                <p className="text-[#52525b] text-sm leading-relaxed mb-6">
                  Engineered, tested and field-proven for everyday duty cycles — the Maxvolt {product.name} delivers
                  dependable range, fast turnaround and a long service life across real operating conditions.
                </p>
                <div className="flex flex-wrap gap-3">
                  <Link href="/find-dealer" className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-sm transition-all" style={{ backgroundColor: product.color, color: "#000" }}>
                    Find a Dealer <ArrowRight size={14} />
                  </Link>
                  <a href={`https://wa.me/${SITE_CONFIG.whatsapp.replace("+", "")}?text=Hi, I'm interested in ${product.name}`} target="_blank" rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border border-black/10 text-[#3f3f46] hover:text-[#15171c] text-sm font-medium transition-all">
                    <MessageCircle size={14} /> Enquire
                  </a>
                </div>
              </div>
            </div>
          </Reveal>
        </section>
      )}

      {/* Features & Benefits */}
      <section ref={ref} className="section-padding bg-[#f7f7f5]">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Features */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl font-bold text-[#15171c] mb-8">
                Key <span style={{ color: product.color }}>Features</span>
              </h2>
              <ul className="space-y-3">
                {product.features.map((feature, i) => (
                  <motion.li
                    key={i}
                    initial={{ opacity: 0, x: -15 }}
                    animate={inView ? { opacity: 1, x: 0 } : {}}
                    transition={{ delay: i * 0.07 }}
                    className="flex items-start gap-3 text-[#52525b] text-sm leading-relaxed"
                  >
                    <CheckCircle2 size={15} style={{ color: product.color, opacity: 0.7 }} className="mt-0.5 shrink-0" />
                    {feature}
                  </motion.li>
                ))}
              </ul>
            </motion.div>

            {/* Benefits */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.15 }}
            >
              <h2 className="text-3xl font-bold text-[#15171c] mb-8">
                Why Choose <span style={{ color: product.color }}>Maxvolt</span>
              </h2>
              <div className="space-y-4">
                {product.benefits.map((benefit, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 15 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: 0.15 + i * 0.07 }}
                    className="p-5 rounded-xl frosted-card border border-black/6"
                  >
                    <div className="text-[#15171c] font-semibold text-sm mb-1">{benefit.title}</div>
                    <div className="text-[#5f6470] text-xs leading-relaxed">{benefit.description}</div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Specifications Table */}
      {product.specTable && (
        <section className="section-padding bg-white">
          <div className="container-custom">
            <h2 className="text-3xl font-bold text-[#15171c] mb-10">Technical Specifications</h2>
            <div className="overflow-x-auto rounded-2xl border border-black/6">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-black/6 bg-black/[0.03]">
                    {product.specTable.headers.map((h) => (
                      <th key={h} className="px-5 py-4 text-left text-[#52525b] font-semibold text-xs uppercase tracking-wider">
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {product.specTable.rows.map((row, i) => (
                    <tr key={i} className={`border-b border-black/5 ${i % 2 === 0 ? "bg-black/[0.015]" : ""} hover:bg-black/[0.03] transition-colors`}>
                      {row.map((cell, j) => (
                        <td key={j} className={`px-5 py-4 ${j === 0 ? "text-[#15171c] font-semibold" : "text-[#52525b]"}`}>
                          {cell}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>
      )}

      {/* Applications & Certifications */}
      <section className="section-padding bg-[#f7f7f5]">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {product.applications && (
              <div>
                <h3 className="text-2xl font-bold text-[#15171c] mb-6">Applications</h3>
                <RevealStagger className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {product.applications.map((app) => {
                    const Icon = appIcon(app);
                    return (
                      <RevealItem key={app} className="card-rise group p-4 rounded-xl bg-white border border-black/8 hover:border-[#FFD100]/40 flex flex-col items-start gap-3">
                        <div className="w-10 h-10 rounded-xl flex items-center justify-center transition-transform group-hover:scale-110" style={{ backgroundColor: `${product.color}14`, border: `1px solid ${product.color}30` }}>
                          <Icon size={18} style={{ color: product.color }} />
                        </div>
                        <span className="text-[#15171c] font-semibold text-xs leading-snug">{app}</span>
                      </RevealItem>
                    );
                  })}
                </RevealStagger>
              </div>
            )}
            {product.certifications && (
              <div>
                <h3 className="text-2xl font-bold text-[#15171c] mb-6">Certifications</h3>
                <div className="space-y-3">
                  {product.certifications.map((cert) => (
                    <div key={cert} className="flex items-center gap-3 text-[#52525b] text-sm">
                      <Shield size={14} className="text-[#D97706]" />
                      {cert}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Inquiry Form CTA */}
      <section className="py-20 bg-white">
        <div className="container-custom">
          <div
            className="p-10 md:p-14 rounded-3xl text-center"
            style={{
              background: `linear-gradient(135deg, ${product.color}08 0%, transparent 100%)`,
              border: `1px solid ${product.color}15`,
            }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-[#15171c] mb-4">
              Interested in {product.name}?
            </h2>
            <p className="text-[#5f6470] mb-8 max-w-md mx-auto text-sm">
              Contact our sales team for pricing, bulk orders, OEM partnerships, or technical queries.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <a
                href={`https://wa.me/${SITE_CONFIG.whatsapp.replace("+", "")}?text=Hi, I'm interested in ${product.name}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-7 py-3.5 rounded-xl font-bold text-sm transition-all hover:shadow-[0_0_30px_rgba(255,209,0,0.4)]"
                style={{ backgroundColor: product.color, color: "#000" }}
              >
                <MessageCircle size={15} />
                WhatsApp Enquiry
              </a>
              <Link
                href="/contact-us"
                className="flex items-center gap-2 px-7 py-3.5 rounded-xl border border-black/8 text-[#3f3f46] hover:text-[#15171c] text-sm font-medium transition-all"
              >
                Send Inquiry
                <ArrowRight size={14} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Product image gallery */}
      {product.galleryImages && product.galleryImages.length > 0 && (
        <section className="py-16 bg-[#f7f7f5]">
          <div className="container-custom">
            <h2 className="text-2xl font-bold text-[#15171c] mb-8">Product Gallery</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {product.galleryImages.map((img, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="group relative h-48 rounded-2xl overflow-hidden bg-[#f7f7f5] border border-black/6 hover:border-black/8 transition-all"
                >
                  <motion.div
                    className="absolute inset-0"
                    whileHover={{ scale: 1.06 }}
                    transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <Image src={img} alt={`${product.name} ${i + 1}`} fill className="object-cover object-center" sizes="400px" />
                  </motion.div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Related Products */}
      <section className="py-16 bg-[#f7f7f5]">
        <div className="container-custom">
          <h2 className="text-2xl font-bold text-[#15171c] mb-8">Related Products</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {relatedProducts.map((related) => (
              <Link key={related.id} href={related.href} className="group block">
                <div className="p-6 rounded-2xl frosted-card border border-black/6 hover:border-black/8 transition-all group-hover:-translate-y-1">
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center mb-4"
                    style={{ backgroundColor: `${related.color}12`, border: `1px solid ${related.color}25` }}
                  >
                    <Battery size={18} style={{ color: related.color }} />
                  </div>
                  <div className="text-[#15171c] font-bold mb-2">{related.name}</div>
                  <div className="text-[#5f6470] text-xs mb-4 line-clamp-2">{related.description}</div>
                  <div className="flex items-center gap-1 text-xs font-semibold" style={{ color: related.color }}>
                    View Details <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
