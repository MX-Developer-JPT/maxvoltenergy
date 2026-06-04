"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { ReactNode, useRef } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

interface PageHeroProps {
  badge?: string;
  title: ReactNode;
  description?: string;
  className?: string;
  children?: ReactNode;
  image?: string;
}

export default function PageHero({ badge, title, description, className, children, image }: PageHeroProps) {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  // Particle dots for background
  const dots = Array.from({ length: 20 }, (_, i) => ({
    id: i, x: Math.random() * 100, y: Math.random() * 100,
    size: Math.random() * 2 + 0.5, dur: Math.random() * 6 + 4, delay: Math.random() * 3,
  }));

  return (
    <section ref={ref} className={cn("relative pt-32 pb-24 overflow-hidden", className)}>
      {/* Background */}
      <div className="absolute inset-0 bg-white" />
      <div className="absolute inset-0 grid-pattern opacity-25" />

      {/* Optional bg image */}
      {image && (
        <motion.div style={{ y: bgY }} className="absolute inset-[-10%] z-0">
          <Image src={image} alt="" fill className="object-cover opacity-20" sizes="100vw" />
          <div className="absolute inset-0 bg-white/80" />
        </motion.div>
      )}

      {/* Floating particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-[1]">
        {dots.map((d) => (
          <motion.div
            key={d.id}
            className="absolute rounded-full bg-[#FFD100]"
            style={{ left: `${d.x}%`, top: `${d.y}%`, width: d.size, height: d.size }}
            animate={{ y: [-8, 8, -8], opacity: [0.2, 0.6, 0.2] }}
            transition={{ duration: d.dur, delay: d.delay, repeat: Infinity, ease: "easeInOut" }}
          />
        ))}
      </div>

      {/* Left + top ambient glows */}
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-[#FFD100]/25 to-transparent z-[2]" />
      <motion.div
        className="absolute top-1/2 left-[20%] w-80 h-80 rounded-full pointer-events-none z-[1]"
        style={{ background: "radial-gradient(circle, rgba(255,209,0,0.06) 0%, transparent 70%)" }}
        animate={{ scale: [1, 1.15, 1] }}
        transition={{ duration: 5, repeat: Infinity }}
      />

      <motion.div style={{ opacity }} className="container-custom relative z-10">
        {badge && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-volt mb-7 border border-[#FFD100]/15"
          >
            <motion.div
              className="w-1.5 h-1.5 rounded-full bg-[#FFD100]"
              animate={{ scale: [1, 1.6, 1] }}
              transition={{ duration: 1.4, repeat: Infinity }}
            />
            <span className="text-[#D97706] text-[11px] font-bold tracking-[0.18em] uppercase">{badge}</span>
          </motion.div>
        )}

        {/* Title — word-by-word stagger */}
        <div className="text-4xl md:text-5xl lg:text-6xl font-black text-[#15171c] leading-tight tracking-tight mb-5">
          {typeof title === "string" ? (
            <div className="overflow-hidden">
              <motion.div
                initial={{ y: "100%" }}
                animate={{ y: 0 }}
                transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
              >
                {title}
              </motion.div>
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.85, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            >
              {title}
            </motion.div>
          )}
        </div>

        {description && (
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.28, ease: [0.22, 1, 0.36, 1] }}
            className="text-[#5f6470] text-lg max-w-2xl leading-relaxed"
          >
            {description}
          </motion.p>
        )}

        {children && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.42, ease: [0.22, 1, 0.36, 1] }}
            className="mt-7"
          >
            {children}
          </motion.div>
        )}
      </motion.div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 inset-x-0 h-16 bg-gradient-to-t from-white to-transparent z-[2]" />
    </section>
  );
}
