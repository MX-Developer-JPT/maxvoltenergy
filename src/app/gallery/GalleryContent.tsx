"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import PageHero from "@/components/ui/PageHero";
import { X, ZoomIn } from "lucide-react";

const GALLERY_ITEMS = [
  // Facility / operations
  { src: "/images/gallery/-zxk.webp", alt: "Maxvolt Facility", category: "Facility" },
  { src: "/images/gallery/-xgo.webp", alt: "Maxvolt Operations", category: "Facility" },
  { src: "/images/gallery/-crj.webp", alt: "Maxvolt Team", category: "Team" },
  { src: "/images/gallery/-pve.webp", alt: "Maxvolt Manufacturing", category: "Manufacturing" },
  { src: "/images/gallery/-okz.webp", alt: "Maxvolt Workplace", category: "Facility" },
  // Products
  { src: "/images/product/e-rickshaw-lithium-battery-ohn.webp", alt: "E-Rickshaw Battery", category: "Products" },
  { src: "/images/product/e-scooter-bike-lithium-battery-mpu.webp", alt: "E-Scooter Battery", category: "Products" },
  { src: "/images/product/e-cycle-lithium-battery-txc.webp", alt: "E-Cycle Battery", category: "Products" },
  { src: "/images/product/lithium-battery-energy-storage-solutions-tjf.webp", alt: "Energy Storage", category: "Products" },
  { src: "/images/product/lithium-battery-for-solar-application-zhs.webp", alt: "Solar Battery", category: "Products" },
  { src: "/images/product/customized-battery-solution-jkz.webp", alt: "Custom Battery", category: "Products" },
  // Individual product shots
  { src: "/images/product/51-2v-100ah-e-rickshaw-battery-roc.webp", alt: "51.2V 100Ah Battery", category: "Products" },
  { src: "/images/product/e-scooter-battery-48v-29ah-kac.webp", alt: "48V 29Ah Scooter Battery", category: "Products" },
  { src: "/images/product/e-scooter-battery-74v-40ah-qrg.webp", alt: "74V 40Ah Scooter Battery", category: "Products" },
  { src: "/images/product/12-8v-100ah-inverter-battery-xgc.webp", alt: "12.8V 100Ah Inverter Battery", category: "Products" },
  // Team
  { src: "/images/our-team/vishal-gupta-oxh.webp", alt: "Vishal Gupta - CTO", category: "Team" },
  { src: "/images/our-team/bhuvneshwar-pal-singh-sxx.webp", alt: "Bhuvneshwar Pal Singh - MD & CFO", category: "Team" },
  { src: "/images/our-team/satendra-shukla-shc.webp", alt: "Satendra Shukla - CBO", category: "Team" },
  { src: "/images/our-team/sachin-gupta-lau.webp", alt: "Sachin Gupta - COO", category: "Team" },
  { src: "/images/our-team/mukesh-gupta-cva.webp", alt: "Mukesh Gupta - CMO", category: "Team" },
  // Category visuals
  { src: "/images/category/powered-with-new-gen-technology-enj.webp", alt: "New Gen Technology", category: "Technology" },
  { src: "/images/category/why-choose-us-wrn.webp", alt: "Why Choose Maxvolt", category: "Technology" },
  { src: "/images/category/about-us-eej.webp", alt: "About Maxvolt", category: "Facility" },
];

const CATEGORIES = ["All", ...Array.from(new Set(GALLERY_ITEMS.map(g => g.category)))];

export default function GalleryContent() {
  const [active, setActive] = useState("All");
  const [lightbox, setLightbox] = useState<{ src: string; alt: string } | null>(null);

  const filtered = active === "All" ? GALLERY_ITEMS : GALLERY_ITEMS.filter(g => g.category === active);

  return (
    <>
      <PageHero
        badge="Gallery"
        title={<>Inside <span className="gradient-text">Maxvolt</span></>}
        description="A window into our manufacturing facility, products, team, and the culture powering India's lithium battery revolution."
      />

      <section className="section-padding bg-[#f7f7f5]">
        <div className="container-custom">
          {/* Category filter */}
          <div className="flex flex-wrap gap-2 mb-10">
            {CATEGORIES.map((cat) => (
              <motion.button
                key={cat}
                onClick={() => setActive(cat)}
                whileTap={{ scale: 0.95 }}
                className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                  active === cat
                    ? "bg-[#FFD100] text-black"
                    : "bg-black/[0.03] border border-black/8 text-[#52525b] hover:text-[#15171c] hover:bg-white/8"
                }`}
              >
                {cat}
              </motion.button>
            ))}
          </div>

          {/* Masonry-style grid */}
          <motion.div layout className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
            <AnimatePresence>
              {filtered.map((item, i) => (
                <motion.div
                  key={item.src}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.4, delay: i * 0.03, ease: [0.22, 1, 0.36, 1] }}
                  className={`group relative rounded-2xl overflow-hidden bg-[#f7f7f5] border border-black/6 cursor-pointer ${
                    i % 5 === 0 ? "row-span-2 h-80" : "h-40"
                  }`}
                  onClick={() => setLightbox(item)}
                >
                  <motion.div
                    className="absolute inset-0"
                    whileHover={{ scale: 1.06 }}
                    transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <Image
                      src={item.src}
                      alt={item.alt}
                      fill
                      className="object-cover object-center"
                      sizes="(max-width: 768px) 50vw, 25vw"
                    />
                  </motion.div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="absolute bottom-3 left-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-between">
                    <span className="text-white text-xs font-medium truncate">{item.alt}</span>
                    <ZoomIn size={14} className="text-white/70 shrink-0 ml-2" />
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      {/* Lightbox */}
      <AnimatePresence>
        {lightbox && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-xl p-4"
            onClick={() => setLightbox(null)}
          >
            <motion.div
              initial={{ scale: 0.85, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.85, opacity: 0 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="relative max-w-4xl w-full max-h-[85vh] rounded-2xl overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative w-full h-[70vh]">
                <Image src={lightbox.src} alt={lightbox.alt} fill className="object-contain" sizes="90vw" />
              </div>
              <button
                onClick={() => setLightbox(null)}
                className="absolute top-4 right-4 w-10 h-10 rounded-full bg-black/60 border border-black/8 flex items-center justify-center text-[#3f3f46] hover:text-[#15171c] transition-colors"
              >
                <X size={18} />
              </button>
              <div className="absolute bottom-4 left-4">
                <span className="text-[#52525b] text-sm">{lightbox.alt}</span>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
