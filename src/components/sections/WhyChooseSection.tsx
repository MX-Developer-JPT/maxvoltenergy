"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { motion, useInView, AnimatePresence, useScroll, useTransform, useSpring } from "framer-motion";
import { Zap, Shield, Globe, Users, FlaskConical, Award, ChevronRight } from "lucide-react";
import { ClipReveal, FadeUp } from "@/components/ui/AnimatedText";

const FEATURES = [
  { Icon: Zap, title: "Advanced Technology", description: "Continuous innovation delivering higher efficiency, faster charging, and smarter performance through LiFePO4 and graphene cell technology.", color: "#FFD100", stat: "50%", statLabel: "Faster Charging" },
  { Icon: Shield, title: "Unmatched Quality", description: "Multi-stage testing at every production milestone ensures durability, safety, and consistent performance.", color: "#FFA800", stat: "AIS 156", statLabel: "Certified" },
  { Icon: Globe, title: "Global Standards", description: "AIS 156 certified and compliant with international quality benchmarks — trusted for domestic and export markets.", color: "#FF8C00", stat: "100%", statLabel: "Compliant" },
  { Icon: Users, title: "Trusted Partnerships", description: "Strategic collaborations with 6+ OEM partners and 58+ retail dealers built on reliability and shared growth.", color: "#7c3aed", stat: "58+", statLabel: "Dealers" },
  { Icon: FlaskConical, title: "In-House R&D", description: "Dedicated research center driving next-generation battery chemistry including our graphene Eco-Series lineup.", color: "#f97316", stat: "Eco", statLabel: "Series" },
  { Icon: Award, title: "NSE Listed", description: "Listed on NSE SME Emerge with full regulatory compliance, transparent governance, and investor-grade reporting.", color: "#ec4899", stat: "NSE", statLabel: "Emerge" },
];

export default function WhyChooseSection() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const [active, setActive] = useState(0);

  // Scroll-driven battery "open" — lid lifts as the section scrolls through view
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const p = useSpring(scrollYProgress, { stiffness: 80, damping: 26, mass: 0.4 });
  const lidY = useTransform(p, [0.15, 0.7], ["0%", "-42%"]);
  const lidScale = useTransform(p, [0.15, 0.7], [1, 1.03]);
  const lidRotate = useTransform(p, [0.15, 0.7], [0, -2.5]);
  const coreOpacity = useTransform(p, [0.2, 0.5], [0, 1]);
  const coreScaleY = useTransform(p, [0.2, 0.7], [0.2, 1]);

  return (
    <section ref={ref} className="section-padding relative overflow-hidden bg-white">
      <div className="absolute inset-0 grid-pattern opacity-15" />

      <div className="container-custom relative z-10">
        {/* Header */}
        <FadeUp className="text-center mb-16">
          <span className="text-[#D97706] text-[11px] font-bold tracking-[0.25em] uppercase mb-4 block">Why MaxVolt</span>
          <h2 className="text-4xl md:text-5xl font-black text-[#15171c] mb-4">
            Built for the <span className="gradient-text">EV Revolution</span>
          </h2>
          <p className="text-[#5f6470] text-sm max-w-lg mx-auto">
            Six core strengths that make MaxVolt the preferred partner for electric mobility across India.
          </p>
        </FadeUp>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          {/* Left: Scroll-driven battery + active feature card */}
          <div className="relative">
            {/* Animated battery — opens on scroll down, closes on scroll up */}
            <div>
              <div className="relative h-80 md:h-[30rem] rounded-2xl overflow-hidden bg-gradient-to-b from-[#fafafa] to-[#f0f0ea] border border-black/6">
                <div className="absolute inset-0 grid-pattern opacity-[0.15]" />

                {/* glowing energy core revealed between the layers */}
                <motion.div
                  className="absolute left-1/2 -translate-x-1/2 rounded-full blur-2xl pointer-events-none"
                  style={{
                    bottom: "36%", width: "62%", height: "24%",
                    background: "radial-gradient(ellipse, rgba(255,209,0,0.6) 0%, rgba(217,119,6,0.25) 45%, transparent 70%)",
                    opacity: coreOpacity, scaleY: coreScaleY, transformOrigin: "bottom",
                  }}
                />

                {/* battery base (bottom of image) — stays */}
                <div className="absolute inset-0" style={{ clipPath: "inset(54% 0 0 0)" }}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src="/images/battery-pack.png" alt="MaxVolt battery pack base" className="w-full h-full object-contain" draggable={false} />
                </div>

                {/* battery lid + cells (top of image) — lifts up on scroll */}
                <motion.div
                  className="absolute inset-0"
                  style={{
                    y: lidY, scale: lidScale, rotate: lidRotate,
                    clipPath: "inset(0 0 46% 0)",
                    transformOrigin: "center bottom",
                    filter: "drop-shadow(0 20px 32px rgba(0,0,0,0.2))",
                  }}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src="/images/battery-pack.png" alt="MaxVolt battery internals" className="w-full h-full object-contain" draggable={false} />
                </motion.div>

                {/* Floating active stat */}
                <AnimatePresence mode="wait">
                  <motion.div
                    key={active}
                    initial={{ opacity: 0, y: 20, scale: 0.9 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -10, scale: 0.95 }}
                    transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                    className="absolute bottom-5 left-5 right-5"
                  >
                    <div
                      className="frosted-card p-4 rounded-xl border"
                      style={{ borderColor: `${FEATURES[active].color}30` }}
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className="w-10 h-10 rounded-xl flex items-center justify-center"
                          style={{ background: `${FEATURES[active].color}15`, border: `1px solid ${FEATURES[active].color}30` }}
                        >
                          {(() => { const Icon = FEATURES[active].Icon; return <Icon size={18} style={{ color: FEATURES[active].color }} />; })()}
                        </div>
                        <div className="flex-1">
                          <div className="text-[#15171c] font-bold text-sm">{FEATURES[active].title}</div>
                          <div className="text-[#5f6470] text-xs mt-0.5 line-clamp-1">{FEATURES[active].description}</div>
                        </div>
                        <div className="text-right">
                          <div className="font-black text-lg leading-none" style={{ color: FEATURES[active].color }}>{FEATURES[active].stat}</div>
                          <div className="text-[#71717a] text-[9px]">{FEATURES[active].statLabel}</div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>

            {/* Secondary image */}
            <ClipReveal direction="right" delay={0.3}>
              <div className="relative h-40 rounded-2xl overflow-hidden mt-4">
                <Image
                  src="/images/category/why-choose-us-wrn.webp"
                  alt="Why Choose MaxVolt"
                  fill
                  className="object-cover"
                  sizes="600px"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/30 to-transparent" />
                <div className="absolute inset-0 flex items-center px-6">
                  <div>
                    <div className="text-white font-bold text-lg mb-1">Trusted by 58+ Dealers</div>
                    <div className="text-white/80 text-sm">Pan India presence across 22+ states</div>
                  </div>
                </div>
              </div>
            </ClipReveal>
          </div>

          {/* Right: Features list */}
          <div className="space-y-2">
            {FEATURES.map(({ Icon, title, description, color, stat, statLabel }, i) => (
              <motion.button
                key={title}
                initial={{ opacity: 0, x: 40 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.6, delay: i * 0.07, ease: [0.22, 1, 0.36, 1] }}
                onClick={() => setActive(i)}
                className="w-full text-left group"
              >
                <motion.div
                  className="flex items-start gap-4 p-4 rounded-xl transition-all duration-300 relative overflow-hidden"
                  animate={{
                    backgroundColor: active === i ? `${color}08` : "rgba(255,255,255,0.01)",
                    borderColor: active === i ? `${color}30` : "rgba(255,255,255,0.05)",
                  }}
                  style={{ border: "1px solid" }}
                >
                  {/* Active left bar */}
                  <motion.div
                    className="absolute left-0 top-0 bottom-0 w-[2px] rounded-full"
                    style={{ backgroundColor: color }}
                    animate={{ scaleY: active === i ? 1 : 0, opacity: active === i ? 1 : 0 }}
                    transition={{ duration: 0.3 }}
                  />

                  <div
                    className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0 transition-all duration-300"
                    style={{
                      background: active === i ? `${color}20` : `${color}08`,
                      border: `1px solid ${active === i ? color + "40" : color + "15"}`,
                    }}
                  >
                    <Icon size={16} style={{ color }} />
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="text-[#15171c] font-bold text-sm mb-0.5 flex items-center gap-2">
                      {title}
                      <ChevronRight
                        size={12}
                        className="opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all"
                        style={{ color }}
                      />
                    </div>
                    <AnimatePresence>
                      {active === i && (
                        <motion.p
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3 }}
                          className="text-[#5f6470] text-xs leading-relaxed overflow-hidden"
                        >
                          {description}
                        </motion.p>
                      )}
                    </AnimatePresence>
                  </div>

                  <div className="text-right shrink-0">
                    <div className="font-black text-sm" style={{ color }}>{stat}</div>
                    <div className="text-[#8a8a93] text-[9px]">{statLabel}</div>
                  </div>
                </motion.div>
              </motion.button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
