"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import PageHero from "@/components/ui/PageHero";
import { INDIA_CITIES, INDIA_STATES } from "@/lib/constants";
import { MapPin, Users, Wrench, Building2, ArrowRight } from "lucide-react";

const REGIONS = [
  {
    name: "Northern India",
    key: "North" as keyof typeof INDIA_CITIES,
    color: "#FFD100",
    states: ["Uttar Pradesh", "Delhi", "Haryana", "Punjab", "Himachal Pradesh", "Uttarakhand", "Rajasthan"],
    highlight: "HQ in Ghaziabad",
  },
  {
    name: "Western India",
    key: "West" as keyof typeof INDIA_CITIES,
    color: "#FFA800",
    states: ["Maharashtra", "Gujarat", "Madhya Pradesh", "Goa", "Rajasthan"],
    highlight: "Strong dealer network",
  },
  {
    name: "Southern India",
    key: "South" as keyof typeof INDIA_CITIES,
    color: "#FF8C00",
    states: ["Karnataka", "Tamil Nadu", "Telangana", "Andhra Pradesh", "Kerala"],
    highlight: "First OEM supply from Hyderabad",
  },
  {
    name: "Eastern India",
    key: "East" as keyof typeof INDIA_CITIES,
    color: "#7c3aed",
    states: ["West Bengal", "Bihar", "Jharkhand", "Odisha", "Assam"],
    highlight: "Rapidly expanding presence",
  },
];

export default function PresenceContent() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const [activeRegion, setActiveRegion] = useState<string | null>(null);

  return (
    <>
      <PageHero
        badge="Our Presence"
        title={<>Pan India <span className="gradient-text">Network</span></>}
        description="Maxvolt Energy operates across 22+ states and 150+ cities — with retail dealers, authorized service centers, and OEM partners spanning the entire Indian subcontinent."
      />

      {/* Stats */}
      <section className="py-12 bg-[#f7f7f5] border-b border-black/6">
        <div className="container-custom">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { value: "22+", label: "States", Icon: MapPin, color: "#FFD100" },
              { value: "150+", label: "Cities", Icon: Building2, color: "#FFA800" },
              { value: "58+", label: "Retail Dealers", Icon: Users, color: "#FF8C00" },
              { value: "6+", label: "Service Centers", Icon: Wrench, color: "#7c3aed" },
            ].map(({ value, label, Icon, color }) => (
              <div key={label} className="flex items-center gap-3 p-5 rounded-xl frosted-card border border-black/6 text-center">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0" style={{ backgroundColor: `${color}12`, border: `1px solid ${color}20` }}>
                  <Icon size={16} style={{ color }} />
                </div>
                <div>
                  <div className="text-2xl font-black" style={{ color }}>{value}</div>
                  <div className="text-[#5f6470] text-xs">{label}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Regions */}
      <section ref={ref} className="section-padding bg-white">
        <div className="absolute inset-0 dot-pattern opacity-15 pointer-events-none" />
        <div className="container-custom relative z-10">
          <h2 className="text-3xl font-bold text-[#15171c] mb-10">Regional Presence</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-12">
            {REGIONS.map(({ name, key, color, states, highlight }, index) => (
              <motion.div
                key={name}
                initial={{ opacity: 0, y: 25 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: index * 0.1 }}
                className="group p-6 rounded-2xl frosted-card border border-black/6 hover:border-black/8 transition-all cursor-pointer"
                onMouseEnter={() => setActiveRegion(name)}
                onMouseLeave={() => setActiveRegion(null)}
              >
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <span className="text-xs font-semibold px-2.5 py-1 rounded-full mb-2 inline-block" style={{ color, backgroundColor: `${color}10`, border: `1px solid ${color}25` }}>
                      {highlight}
                    </span>
                    <h3 className="text-[#15171c] font-bold text-xl">{name}</h3>
                  </div>
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ backgroundColor: `${color}12`, border: `1px solid ${color}20` }}>
                    <MapPin size={16} style={{ color }} />
                  </div>
                </div>

                {/* Cities */}
                <div className="mb-4">
                  <div className="text-[#71717a] text-xs font-medium uppercase tracking-wider mb-2">Key Cities</div>
                  <div className="flex flex-wrap gap-2">
                    {INDIA_CITIES[key].map((city) => (
                      <span key={city} className="px-2.5 py-1 rounded-lg text-xs text-[#52525b] border border-black/6 bg-black/[0.03]">
                        {city}
                      </span>
                    ))}
                  </div>
                </div>

                {/* States */}
                <div>
                  <div className="text-[#71717a] text-xs font-medium uppercase tracking-wider mb-2">States Covered</div>
                  <div className="flex flex-wrap gap-1">
                    {states.map((state) => (
                      <span key={state} className="text-[#71717a] text-xs">
                        {state}
                        {states.indexOf(state) < states.length - 1 ? " ·" : ""}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* All states */}
          <div>
            <h3 className="text-xl font-bold text-[#15171c] mb-5">All States We Serve</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
              {INDIA_STATES.map((state, i) => (
                <motion.div
                  key={state}
                  initial={{ opacity: 0 }}
                  animate={inView ? { opacity: 1 } : {}}
                  transition={{ delay: 0.4 + i * 0.02 }}
                  className="flex items-center gap-2 p-3 rounded-lg bg-black/[0.02] border border-black/5 hover:border-[#FFD100]/15 hover:bg-[#FFD100]/3 transition-all"
                >
                  <div className="w-1.5 h-1.5 rounded-full bg-[#FFD100]/50 shrink-0" />
                  <span className="text-[#52525b] text-xs">{state}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Become dealer */}
      <section className="py-16 bg-[#f7f7f5]">
        <div className="container-custom text-center">
          <h2 className="text-3xl font-bold text-[#15171c] mb-4">
            Expand the Network
          </h2>
          <p className="text-[#5f6470] text-sm mb-8 max-w-md mx-auto">
            We&apos;re actively seeking dealers and distributors in cities across India.
            Join Maxvolt&apos;s growing network and power the EV revolution in your region.
          </p>
          <a
            href="/contact-us#dealer"
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl bg-[#FFD100] text-black font-bold text-sm hover:bg-[#FFD100]/90 transition-all"
          >
            Become a Dealer
            <ArrowRight size={14} />
          </a>
        </div>
      </section>
    </>
  );
}
