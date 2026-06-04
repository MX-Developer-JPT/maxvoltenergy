"use client";

import { useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { ArrowRight, MessageCircle, Phone, Zap, ChevronRight } from "lucide-react";
import { SITE_CONFIG } from "@/lib/constants";
import MagneticButton from "@/components/ui/MagneticButton";
import { FadeUp } from "@/components/ui/AnimatedText";

const LINKS = [
  { label: "Dealer Partnership", href: "/contact-us#dealer" },
  { label: "Investor Relations", href: "/investors" },
  { label: "Product Catalogue", href: "/products" },
  { label: "OEM Inquiry", href: "/contact-us" },
  { label: "Service Support", href: "/support" },
];

export default function CTASection() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const bgY = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);

  return (
    <section ref={ref} className="relative py-0 overflow-hidden">
      {/* Full-bleed background image with parallax */}
      <div className="absolute inset-0 z-0">
        <motion.div style={{ y: bgY }} className="absolute inset-[-10%]">
          <Image
            src="/images/banner/banner-ygm.webp"
            alt="MaxVolt CTA"
            fill
            className="object-cover object-center"
            sizes="100vw"
          />
        </motion.div>
        <div className="absolute inset-0 bg-gradient-to-b from-white/92 via-white/85 to-white/95" />
        <div className="absolute inset-0 bg-gradient-to-r from-white/80 via-white/60 to-white/80" />
      </div>

      {/* Grid overlay */}
      <div className="absolute inset-0 grid-pattern opacity-20 z-[1]" />

      <div className="container-custom relative z-10 py-28">
        <div className="max-w-3xl mx-auto text-center">

          {/* Icon */}
          <FadeUp>
            <motion.div
              className="w-20 h-20 rounded-2xl bg-[#FFD100]/15 border border-[#FFD100]/25 flex items-center justify-center mx-auto mb-8"
              animate={{
                boxShadow: ["0 0 20px rgba(255,209,0,0.2)", "0 0 50px rgba(255,209,0,0.5)", "0 0 20px rgba(255,209,0,0.2)"],
                rotate: [0, 3, -3, 0],
              }}
              transition={{ duration: 4, repeat: Infinity }}
            >
              <Zap size={34} className="text-[#D97706]" fill="#FFD100" />
            </motion.div>
          </FadeUp>

          {/* Headline */}
          <div className="overflow-hidden mb-2">
            <motion.h2
              className="text-4xl md:text-5xl lg:text-6xl font-black text-[#15171c] leading-tight"
              initial={{ y: "100%" }}
              animate={inView ? { y: 0 } : {}}
              transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
            >
              Ready to Power Your
            </motion.h2>
          </div>
          <div className="overflow-hidden mb-8">
            <motion.h2
              className="text-4xl md:text-5xl lg:text-6xl font-black gradient-text leading-tight"
              initial={{ y: "100%" }}
              animate={inView ? { y: 0 } : {}}
              transition={{ duration: 0.85, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            >
              Electric Journey?
            </motion.h2>
          </div>

          <FadeUp delay={0.3}>
            <p className="text-[#52525b] text-lg leading-relaxed mb-10 max-w-xl mx-auto">
              Connect with our team for personalized battery solutions, bulk pricing, dealer partnerships, or investor inquiries.
            </p>
          </FadeUp>

          {/* CTA buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.45 }}
            className="flex flex-wrap items-center justify-center gap-4 mb-10"
          >
            <MagneticButton strength={0.25}>
              <Link
                href="/contact-us"
                className="group relative flex items-center gap-2 px-9 py-4 rounded-xl bg-[#FFD100] text-black font-black text-sm overflow-hidden"
                style={{ boxShadow: "0 0 40px rgba(255,209,0,0.45)" }}
              >
                <motion.span
                  className="absolute inset-0 -skew-x-12 bg-black/[0.02]0"
                  initial={{ x: "-110%" }}
                  whileHover={{ x: "110%" }}
                  transition={{ duration: 0.6 }}
                />
                <span className="relative">Get In Touch</span>
                <ArrowRight size={15} className="relative group-hover:translate-x-1 transition-transform" />
              </Link>
            </MagneticButton>

            <MagneticButton strength={0.2}>
              <a
                href={`https://wa.me/${SITE_CONFIG.whatsapp.replace("+", "")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-9 py-4 rounded-xl border border-black/10 hover:border-[#FFD100]/40 text-[#3f3f46] hover:text-[#15171c] font-medium text-sm transition-all backdrop-blur-sm hover:bg-[#FFD100]/5"
              >
                <MessageCircle size={15} />
                WhatsApp
              </a>
            </MagneticButton>

            <a
              href={`tel:${SITE_CONFIG.phone}`}
              className="flex items-center gap-2 px-6 py-4 text-sm font-medium text-[#71717a] hover:text-[#3f3f46] transition-colors"
            >
              <Phone size={14} />
              {SITE_CONFIG.phone}
            </a>
          </motion.div>

          {/* Quick links */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ delay: 0.65 }}
            className="flex flex-wrap items-center justify-center gap-4"
          >
            {LINKS.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="group flex items-center gap-1 text-xs text-[#71717a] hover:text-[#D97706] transition-colors"
              >
                <ChevronRight size={10} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                {link.label}
              </Link>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Top/bottom energy lines */}
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-[#FFD100]/25 to-transparent" />
      <div className="absolute bottom-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-[#FFD100]/25 to-transparent" />
    </section>
  );
}
