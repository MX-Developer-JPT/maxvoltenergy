"use client";

import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { Star, Quote, ChevronLeft, ChevronRight } from "lucide-react";
import { TESTIMONIALS } from "@/lib/constants";
import { FadeUp } from "@/components/ui/AnimatedText";
import TiltCard from "@/components/ui/TiltCard";

export default function TestimonialsSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const [active, setActive] = useState(0);
  const [direction, setDirection] = useState(1);

  const next = () => { setDirection(1); setActive((a) => (a + 1) % TESTIMONIALS.length); };
  const prev = () => { setDirection(-1); setActive((a) => (a - 1 + TESTIMONIALS.length) % TESTIMONIALS.length); };

  return (
    <section ref={ref} className="section-padding relative overflow-hidden bg-[#f7f7f5]">
      {/* Background */}
      <div className="absolute inset-0 dot-pattern opacity-15" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] pointer-events-none"
        style={{ background: "radial-gradient(ellipse, rgba(255,209,0,0.04) 0%, transparent 70%)" }} />

      <div className="container-custom relative z-10">
        <FadeUp className="text-center mb-16">
          <span className="text-[#D97706] text-[11px] font-bold tracking-[0.25em] uppercase mb-4 block">Customer Stories</span>
          <h2 className="text-4xl md:text-5xl font-black text-[#15171c] mb-4">
            Trusted by <span className="gradient-text">EV Pioneers</span>
          </h2>
        </FadeUp>

        {/* Featured testimonial — big */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 mb-8">
          {/* Main */}
          <div className="lg:col-span-3">
            <div className="relative h-64 overflow-hidden">
              <AnimatePresence mode="wait" custom={direction}>
                <motion.div
                  key={active}
                  custom={direction}
                  initial={{ opacity: 0, x: direction * 60 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -direction * 60 }}
                  transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                  className="absolute inset-0"
                >
                  <TiltCard
                    className="h-full p-8 rounded-2xl frosted-card border border-black/6"
                    maxTilt={4}
                  >
                    {/* Quote icon */}
                    <motion.div
                      className="w-12 h-12 rounded-xl bg-[#FFD100]/10 border border-[#FFD100]/20 flex items-center justify-center mb-5"
                      animate={{ rotate: [0, 5, -5, 0] }}
                      transition={{ duration: 6, repeat: Infinity }}
                    >
                      <Quote size={20} className="text-[#D97706]" />
                    </motion.div>

                    {/* Stars */}
                    <div className="flex items-center gap-1 mb-4">
                      {Array.from({ length: TESTIMONIALS[active].rating }).map((_, i) => (
                        <motion.div
                          key={i}
                          initial={{ scale: 0, rotate: -30 }}
                          animate={{ scale: 1, rotate: 0 }}
                          transition={{ delay: i * 0.08, type: "spring" }}
                        >
                          <Star size={14} className="text-[#D97706] fill-[#FFD100]" />
                        </motion.div>
                      ))}
                    </div>

                    <p className="text-[#3f3f46] text-base leading-relaxed italic mb-5">
                      &ldquo;{TESTIMONIALS[active].content}&rdquo;
                    </p>

                    <div className="flex items-center gap-3 mt-auto">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#FFD100]/20 to-[#FFA800]/10 border border-[#FFD100]/20 flex items-center justify-center">
                        <span className="text-[#D97706] font-black text-sm">{TESTIMONIALS[active].name.charAt(0)}</span>
                      </div>
                      <div>
                        <div className="text-[#15171c] font-bold text-sm">{TESTIMONIALS[active].name}</div>
                        <div className="text-[#71717a] text-xs">{TESTIMONIALS[active].role}</div>
                      </div>
                    </div>
                  </TiltCard>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Controls */}
            <div className="flex items-center gap-4 mt-4">
              <button
                onClick={prev}
                className="w-10 h-10 rounded-full border border-black/8 hover:border-[#FFD100]/30 flex items-center justify-center text-[#5f6470] hover:text-[#D97706] transition-all"
              >
                <ChevronLeft size={16} />
              </button>
              <div className="flex gap-2 flex-1">
                {TESTIMONIALS.map((_, i) => (
                  <button key={i} onClick={() => { setDirection(i > active ? 1 : -1); setActive(i); }}>
                    <motion.div
                      className="h-1 rounded-full transition-all duration-400"
                      animate={{ width: i === active ? 28 : 8, backgroundColor: i === active ? "#FFD100" : "rgba(255,255,255,0.15)" }}
                    />
                  </button>
                ))}
              </div>
              <button
                onClick={next}
                className="w-10 h-10 rounded-full border border-black/8 hover:border-[#FFD100]/30 flex items-center justify-center text-[#5f6470] hover:text-[#D97706] transition-all"
              >
                <ChevronRight size={16} />
              </button>
            </div>
          </div>

          {/* Side: remaining cards stacked */}
          <div className="lg:col-span-2 flex flex-col gap-3">
            {TESTIMONIALS.filter((_, i) => i !== active).slice(0, 2).map((t, i) => (
              <motion.div
                key={t.name}
                initial={{ opacity: 0, x: 30 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: 0.2 + i * 0.12 }}
                onClick={() => { setDirection(1); setActive(TESTIMONIALS.indexOf(t)); }}
                className="group p-5 rounded-xl frosted-card border border-black/6 hover:border-[#FFD100]/15 cursor-pointer transition-all"
              >
                <div className="flex items-center gap-1 mb-2">
                  {Array.from({ length: t.rating }).map((_, si) => (
                    <Star key={si} size={10} className="text-[#D97706] fill-[#FFD100]" />
                  ))}
                </div>
                <p className="text-[#5f6470] text-xs leading-relaxed line-clamp-2 italic mb-3">&ldquo;{t.content}&rdquo;</p>
                <div className="text-[#52525b] text-xs font-bold">{t.name}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
