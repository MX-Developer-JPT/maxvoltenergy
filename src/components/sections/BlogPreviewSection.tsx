"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import { ArrowRight, Calendar } from "lucide-react";

const POSTS = [
  {
    title: "Rising Fuel Prices Accelerate India's EV Shift",
    excerpt: "West Asia tensions and rising petroleum costs are fast-tracking India's transition to electric vehicles — positioning MaxVolt at the forefront.",
    image: "/images/blog/rising-fuel-prices-and-west-asia-tensions-accelerate-ev-shift-strengthening-demand-for-maxvolt-solu-ael.webp",
    date: "June 2025",
    category: "EV Industry",
    color: "#FFD100",
  },
  {
    title: "MaxVolt ReEarth: Lithium Battery Recycling Research Published Internationally",
    excerpt: "MaxVolt ReEarth's breakthrough research on advanced lithium-ion battery recycling technologies gains international recognition.",
    image: "/images/blog/maxvolt-reearth-publishes-study-on-advanced-lithium-ion-battery-recycling-technologies-nnx.webp",
    date: "May 2025",
    category: "Sustainability",
    color: "#FFA800",
  },
  {
    title: "EV Adoption Strengthening Demand for MaxVolt Solutions",
    excerpt: "India's expanding EV ecosystem is driving unprecedented demand for domestic lithium battery manufacturers like MaxVolt Energy.",
    image: "/images/blog/fuel-price-hikes-and-west-asia-tensions-accelerate-ev-adoption-boosting-demand-for-maxvolt-energy-s-xmk.webp",
    date: "April 2025",
    category: "Market",
    color: "#FF8C00",
  },
];

export default function BlogPreviewSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="section-padding relative overflow-hidden bg-[#f7f7f5]">
      <div className="absolute inset-0 dot-pattern opacity-15" />

      <div className="container-custom relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="flex items-end justify-between mb-12 gap-6"
        >
          <div>
            <span className="text-[#D97706] text-xs font-semibold tracking-[0.2em] uppercase mb-3 block">Latest News</span>
            <h2 className="text-4xl font-bold text-[#15171c]">
              Insights & <span className="gradient-text">Updates</span>
            </h2>
          </div>
          <Link href="/blog" className="hidden md:flex items-center gap-2 text-[#D97706] text-sm font-semibold hover:gap-3 transition-all">
            All Articles <ArrowRight size={14} />
          </Link>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {POSTS.map(({ title, excerpt, image, date, category, color }, i) => (
            <motion.div
              key={title}
              initial={{ opacity: 0, y: 36 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
            >
              <Link href="/blog" className="group block h-full">
                <div className="h-full rounded-2xl bg-white border border-black/6 hover:border-black/8 overflow-hidden transition-all hover:-translate-y-1 hover:shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
                  {/* Image */}
                  <div className="relative h-48 overflow-hidden">
                    <motion.div
                      className="absolute inset-0"
                      whileHover={{ scale: 1.06 }}
                      transition={{ duration: 0.6 }}
                    >
                      <Image
                        src={image}
                        alt={title}
                        fill
                        className="object-cover"
                        sizes="400px"
                      />
                    </motion.div>
                    <div className="absolute inset-0 bg-gradient-to-t from-white via-white/20 to-transparent" />
                    <div className="absolute top-3 left-3">
                      <span className="text-[10px] font-bold tracking-[0.15em] uppercase px-2.5 py-1 rounded-full backdrop-blur-sm" style={{ color, backgroundColor: `${color}20`, border: `1px solid ${color}30` }}>
                        {category}
                      </span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-5">
                    <div className="flex items-center gap-2 text-[#8a8a93] text-xs mb-3">
                      <Calendar size={11} />
                      {date}
                    </div>
                    <h3 className="text-[#15171c] font-bold text-base leading-tight mb-2 group-hover:text-[#D97706] transition-colors line-clamp-2">
                      {title}
                    </h3>
                    <p className="text-[#5f6470] text-xs leading-relaxed line-clamp-3 mb-4">{excerpt}</p>
                    <div className="flex items-center gap-1 text-xs font-semibold" style={{ color }}>
                      Read More <ArrowRight size={11} className="group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        <div className="mt-6 text-center md:hidden">
          <Link href="/blog" className="inline-flex items-center gap-2 text-[#D97706] text-sm font-semibold">
            All Articles <ArrowRight size={14} />
          </Link>
        </div>
      </div>
    </section>
  );
}
