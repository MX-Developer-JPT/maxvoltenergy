"use client";

import { useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, useInView } from "framer-motion";
import {
  ToyBrick, HeartPulse, Wrench, Smartphone, BatteryCharging,
  Flashlight, Router, Cctv, ArrowRight, MessageCircle,
} from "lucide-react";
import { SITE_CONFIG } from "@/lib/constants";

const USE_CASES = [
  { Icon: ToyBrick, label: "Toys & Hobby", desc: "RC cars, drones & smart toys" },
  { Icon: HeartPulse, label: "Medical Devices", desc: "Ultrasound, ECG, BP monitors" },
  { Icon: Wrench, label: "Mechanical Tools", desc: "Cordless power tools" },
  { Icon: Smartphone, label: "Electronic Gadgets", desc: "Consumer & IoT devices" },
  { Icon: BatteryCharging, label: "Power Banks", desc: "Portable charging packs" },
  { Icon: Flashlight, label: "Flashlights", desc: "Torches & portable lighting" },
  { Icon: Router, label: "Router Backup UPS", desc: "Wi-Fi & networking backup" },
  { Icon: Cctv, label: "CCTV & Surveillance", desc: "Security camera backup" },
];

export default function CustomBatterySection() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="section-padding relative overflow-hidden bg-[#0b0b0d] section-dark">
      <div className="absolute inset-0 grid-pattern opacity-[0.07]" />
      <div className="absolute top-1/3 left-1/4 w-[600px] h-[600px] rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(255,209,0,0.08) 0%, transparent 60%)" }} />

      <div className="container-custom relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left: copy + image */}
          <div>
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              className="text-[#FFD100] text-[11px] font-bold tracking-[0.25em] uppercase mb-4 block"
            >
              Customized Battery Solutions
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.05 }}
              className="text-4xl md:text-5xl font-black text-white mb-5 leading-tight"
            >
              One Battery Maker.<br /><span className="gradient-text">Endless Applications.</span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.1 }}
              className="text-white/60 text-sm md:text-base leading-relaxed mb-6 max-w-lg"
            >
              Beyond electric vehicles, Maxvolt engineers fully customizable lithium battery
              packs for virtually any device. Tell us your voltage, capacity, form factor and
              discharge needs — our in-house R&D team designs a pack built precisely for your
              use case.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.15 }}
              className="relative h-56 rounded-2xl overflow-hidden mb-8 border border-white/10"
            >
              <Image
                src="/images/product/customized-battery-solution-jkz.webp"
                alt="Maxvolt Customized Battery Solutions"
                fill
                className="object-cover"
                sizes="600px"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0b0b0d] via-transparent to-transparent" />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.2 }}
              className="flex flex-wrap gap-4"
            >
              <Link
                href="/contact-us?type=custom"
                className="group flex items-center gap-2 px-7 py-3.5 rounded-xl bg-[#FFD100] text-black font-black text-sm hover:bg-[#FFA800] transition-all"
                style={{ boxShadow: "0 0 30px rgba(255,209,0,0.25)" }}
              >
                Enquire for a Custom Pack
                <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform" />
              </Link>
              <a
                href={`https://wa.me/${SITE_CONFIG.whatsapp.replace("+", "")}?text=Hi, I need a customized Maxvolt battery pack for my application.`}
                target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-2 px-7 py-3.5 rounded-xl border border-white/15 text-white/80 hover:text-white hover:border-[#FFD100]/40 text-sm font-medium transition-all"
              >
                <MessageCircle size={15} /> WhatsApp Us
              </a>
            </motion.div>
          </div>

          {/* Right: use case grid */}
          <div className="grid grid-cols-2 gap-3">
            {USE_CASES.map(({ Icon, label, desc }, i) => (
              <motion.div
                key={label}
                initial={{ opacity: 0, y: 24 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.1 + i * 0.05, ease: [0.22, 1, 0.36, 1] }}
                whileHover={{ y: -4 }}
                className="p-5 rounded-2xl bg-white/[0.03] border border-white/8 hover:border-[#FFD100]/30 transition-colors"
              >
                <div className="w-11 h-11 rounded-xl bg-[#FFD100]/10 border border-[#FFD100]/20 flex items-center justify-center mb-3">
                  <Icon size={18} className="text-[#FFD100]" />
                </div>
                <div className="text-white font-bold text-sm mb-0.5">{label}</div>
                <div className="text-white/45 text-xs leading-snug">{desc}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
