"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import PageHero from "@/components/ui/PageHero";
import TiltCard from "@/components/ui/TiltCard";
import { FadeUp, ClipReveal, StaggerGroup, staggerItem } from "@/components/ui/AnimatedText";
import { LEADERSHIP, TIMELINE, SITE_CONFIG } from "@/lib/constants";
import { CheckCircle2, Target, Eye, Lightbulb, ArrowRight, Users, Zap, Factory, MapPin, ExternalLink, Recycle } from "lucide-react";

function MissionVision() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} id="mission" className="section-padding relative bg-[#f7f7f5]">
      <div className="absolute inset-0 dot-pattern opacity-20" />
      <div className="container-custom relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              Icon: Target,
              label: "Our Mission",
              color: "#FFD100",
              text: "To deliver strong, reliable, and safe lithium battery packs that meet global standards while supporting electric vehicles, energy storage, and medical device sectors. We prioritize efficiency, advancement, and long-term reliability.",
            },
            {
              Icon: Eye,
              label: "Our Vision",
              color: "#FFA800",
              text: "To advance clean and dependable energy globally by developing lithium battery systems that reduce carbon emissions, power modern transportation, and integrate renewable energy with the grid.",
            },
            {
              Icon: Lightbulb,
              label: "Our Approach",
              color: "#FF8C00",
              text: "We follow a five-step consultative strategy: understanding unique needs, guiding appropriate product selection, ensuring cost-effectiveness, enhancing productivity, and driving business profitability.",
            },
          ].map(({ Icon, label, color, text }, i) => (
            <motion.div
              key={label}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.12 }}
              className="group p-8 rounded-2xl frosted-card border border-black/6 hover:border-black/8 transition-all hover:-translate-y-1"
            >
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center mb-6"
                style={{ backgroundColor: `${color}12`, border: `1px solid ${color}25` }}
              >
                <Icon size={22} style={{ color }} />
              </div>
              <h3 className="text-[#15171c] font-bold text-xl mb-4">{label}</h3>
              <p className="text-[#52525b] text-sm leading-relaxed">{text}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function AboutStory() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="section-padding relative bg-white">
      <div className="absolute inset-0 grid-pattern opacity-15" />
      <div className="container-custom relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7 }}
          >
            <span className="text-[#D97706] text-xs font-semibold tracking-[0.2em] uppercase mb-4 block">Our Story</span>
            <h2 className="text-4xl md:text-5xl font-bold text-[#15171c] mb-6 leading-tight">
              From a 15-Battery Lab to{" "}
              <span className="gradient-text">₹297+ Crore Listed Company</span>
            </h2>
            <p className="text-[#52525b] text-base leading-relaxed mb-6">
              Maxvolt Energy Industries Limited was established in 2019 with a simple but powerful vision —
              to manufacture world-class lithium battery packs in India for India&apos;s electric future.
            </p>
            <p className="text-[#52525b] text-base leading-relaxed mb-6">
              Starting from a 15-battery-per-day facility in Ghaziabad, we grew rapidly through relentless
              innovation, rigorous quality control, and strategic partnerships with OEM manufacturers and
              retail dealers across the country.
            </p>
            <p className="text-[#52525b] text-base leading-relaxed mb-8">
              In 2025, we achieved a landmark milestone — listing on the NSE SME Emerge platform — and
              have since scaled to revenue exceeding ₹297 Crore, a 350-member team, and monthly
              production capacity of 25,000+ battery packs.
            </p>

            <div className="grid grid-cols-2 gap-4 mb-8">
              {[
                { label: "Founded", value: "2019" },
                { label: "Location", value: "Ghaziabad, UP" },
                { label: "Listing", value: "NSE SME Emerge" },
                { label: "Certification", value: "AIS 156" },
              ].map(({ label, value }) => (
                <div key={label} className="p-4 rounded-xl bg-black/[0.03] border border-black/6">
                  <div className="text-[#71717a] text-xs font-medium uppercase tracking-wider mb-1">{label}</div>
                  <div className="text-[#15171c] font-bold">{value}</div>
                </div>
              ))}
            </div>

            <Link
              href="/investors"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#FFD100] text-black font-bold text-sm hover:bg-[#FFD100]/90 transition-all"
            >
              Investor Relations
              <ArrowRight size={14} />
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="relative"
          >
            {/* About image */}
            <div className="relative h-52 rounded-2xl overflow-hidden mb-4 border border-black/6">
              <Image
                src="/images/category/about-us-eej.webp"
                alt="Maxvolt Energy Facility"
                fill
                className="object-cover object-center"
                sizes="600px"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            </div>
            {/* Achievement cards */}
            <div className="grid grid-cols-2 gap-4">
              {[
                { value: "₹297+ Cr", label: "Revenue", color: "#FFD100" },
                { value: "25,000+", label: "Units/Month", color: "#FFA800" },
                { value: "950+", label: "Dealer Network", color: "#FF8C00" },
                { value: "350+", label: "Team Members", color: "#7c3aed" },
              ].map(({ value, label, color }) => (
                <div
                  key={label}
                  className="p-6 rounded-2xl frosted-card border border-black/6 text-center"
                  style={{ borderColor: `${color}15` }}
                >
                  <div className="text-3xl font-black mb-1" style={{ color }}>{value}</div>
                  <div className="text-[#5f6470] text-xs font-medium">{label}</div>
                </div>
              ))}
            </div>

            {/* Central glow */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="w-32 h-32 bg-[#FFD100]/10 rounded-full blur-[40px]" />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function LeadershipSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} id="team" className="section-padding relative bg-[#f7f7f5]">
      <div className="absolute inset-0 dot-pattern opacity-20" />
      <div className="container-custom relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <span className="text-[#D97706] text-xs font-semibold tracking-[0.2em] uppercase mb-4 block">Board of Directors</span>
          <h2 className="text-4xl md:text-5xl font-bold text-[#15171c] mb-4">
            Leadership <span className="gradient-text">Team</span>
          </h2>
          <p className="text-[#5f6470] max-w-lg mx-auto text-sm">
            Seasoned professionals driving Maxvolt&apos;s mission to power India&apos;s electric revolution.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {LEADERSHIP.map((person, index) => (
            <motion.div
              key={person.name}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.08 }}
              className="group p-7 rounded-2xl frosted-card border border-black/6 hover:border-[#FFD100]/15 transition-all hover:-translate-y-1 hover:shadow-[0_16px_40px_rgba(0,0,0,0.4)]"
            >
              {/* Avatar */}
              <div className="w-16 h-16 rounded-2xl overflow-hidden bg-gradient-to-br from-[#FFD100]/20 to-[#FFA800]/10 border border-[#FFD100]/20 flex items-center justify-center mb-5 relative">
                {person.image ? (
                  <Image src={person.image} alt={person.name} fill className="object-cover object-top" sizes="64px" />
                ) : (
                  <span className="text-[#D97706] font-black text-2xl">
                    {person.name.split(" ").map(n => n[0]).join("").slice(0, 2)}
                  </span>
                )}
              </div>

              <div className="text-[#15171c] font-bold text-lg mb-1">{person.name}</div>
              <div className="text-[#D97706] text-xs font-semibold mb-1">{person.role}</div>
              <div className="text-[#71717a] text-xs mb-4">{person.designation}</div>

              <div className="space-y-2 text-sm">
                <div className="flex items-start gap-2">
                  <Users size={12} className="text-[#a1a1aa] mt-0.5 shrink-0" />
                  <span className="text-[#5f6470]">{person.experience} experience</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle2 size={12} className="text-[#D97706]/40 mt-0.5 shrink-0" />
                  <span className="text-[#5f6470] text-xs leading-relaxed">{person.focus}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Company Secretary */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="mt-6 p-6 rounded-2xl frosted-card border border-black/6 flex items-center gap-5"
        >
          <div className="w-12 h-12 rounded-xl bg-[#7c3aed]/15 border border-[#7c3aed]/25 flex items-center justify-center">
            <Zap size={18} className="text-[#7c3aed]" />
          </div>
          <div>
            <div className="text-[#15171c] font-bold">Ms. Amisha Swain</div>
            <div className="text-[#7c3aed] text-xs font-semibold">Company Secretary & Compliance Officer</div>
          </div>
          <div className="ml-auto text-[#71717a] text-sm hidden md:block">
            <div>+91 98188 89835</div>
            <div>bhuvneshwar@maxvoltenergy.com</div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function KeyStrengths() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  const strengths = [
    "Advanced lithium battery technology with continuous innovation",
    "Multi-stage quality testing and rigorous production controls",
    "AIS 156 government safety certification",
    "In-house R&D center driving next-gen lithium battery development",
    "Pan-India presence across 22+ states",
    "107 OEM partnerships with leading EV manufacturers",
    "Listed on NSE SME Emerge platform",
    "Maxvolt ReEarth recycling subsidiary for sustainable operations",
  ];

  return (
    <section ref={ref} className="section-padding relative bg-[#f7f7f5]">
      <div className="container-custom relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <span className="text-[#D97706] text-xs font-semibold tracking-[0.2em] uppercase mb-4 block">Core Strengths</span>
            <h2 className="text-4xl font-bold text-[#15171c] mb-6">
              What Sets Us <span className="gradient-text">Apart</span>
            </h2>
            <ul className="space-y-3">
              {strengths.map((s, i) => (
                <motion.li
                  key={s}
                  initial={{ opacity: 0, x: -20 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: i * 0.06 }}
                  className="flex items-start gap-3 text-[#52525b] text-sm"
                >
                  <CheckCircle2 size={16} className="text-[#D97706] shrink-0 mt-0.5" />
                  {s}
                </motion.li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <span className="text-[#D97706] text-xs font-semibold tracking-[0.2em] uppercase mb-4 block">Contact Information</span>
            <h2 className="text-4xl font-bold text-[#15171c] mb-6">
              Get in <span className="gradient-text">Touch</span>
            </h2>
            <div className="space-y-4">
              <div className="p-5 rounded-xl frosted-card border border-black/6">
                <div className="text-[#71717a] text-xs font-medium uppercase tracking-wider mb-2">Manufacturing Plant</div>
                <div className="text-[#3f3f46]">{SITE_CONFIG.addresses.ghaziabad}</div>
              </div>
              <div className="p-5 rounded-xl frosted-card border border-black/6">
                <div className="text-[#71717a] text-xs font-medium uppercase tracking-wider mb-2">Corporate Office</div>
                <div className="text-[#3f3f46]">{SITE_CONFIG.addresses.delhi}</div>
              </div>
              <div className="p-5 rounded-xl frosted-card border border-black/6">
                <div className="text-[#71717a] text-xs font-medium uppercase tracking-wider mb-2">Contact</div>
                <div className="text-[#3f3f46]">{SITE_CONFIG.phone}</div>
                <div className="text-[#3f3f46]">{SITE_CONFIG.email}</div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function CompanyOverview() {
  const STATS = [
    { v: "2", l: "Manufacturing Plants" },
    { v: "2.2 GWh", l: "Annual Capacity" },
    { v: "950+", l: "Dealers" },
    { v: "107", l: "OEM Partners" },
    { v: "25,000+", l: "Batteries / Month" },
    { v: "1100+", l: "Pincodes Served" },
    { v: "350+", l: "Employees" },
    { v: "10", l: "Warehouses" },
  ];
  return (
    <section className="section-padding bg-white">
      <div className="container-custom">
        <FadeUp className="text-center mb-12">
          <span className="text-[#D97706] text-[11px] font-bold tracking-[0.25em] uppercase mb-3 block">Company Overview</span>
          <h2 className="text-3xl md:text-4xl font-black text-[#15171c]">Nationwide Scale, <span className="gradient-text">Industry Leadership</span></h2>
        </FadeUp>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          {STATS.map((s) => (
            <div key={s.l} className="text-center p-5 rounded-2xl frosted-card border border-black/6">
              <div className="text-2xl md:text-3xl font-black gradient-text">{s.v}</div>
              <div className="text-[#71717a] text-[11px] mt-1 uppercase tracking-wide">{s.l}</div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {[
            { src: "/images/overview/capacity-growth.png", alt: "Maxvolt record-breaking production capacity growth" },
            { src: "/images/overview/pan-india-presence.png", alt: "Maxvolt pan-India presence and distribution network" },
          ].map((img) => (
            <div key={img.src} className="relative w-full rounded-2xl overflow-hidden border border-black/8" style={{ aspectRatio: "1200/500" }}>
              <Image src={img.src} alt={img.alt} fill className="object-contain" sizes="(max-width:1024px) 100vw, 600px" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ManufacturingSection() {
  return (
    <section className="section-padding bg-[#f7f7f5]">
      <div className="container-custom">
        <FadeUp className="text-center mb-12">
          <span className="text-[#D97706] text-[11px] font-bold tracking-[0.25em] uppercase mb-3 block">Infrastructure</span>
          <h2 className="text-3xl md:text-4xl font-black text-[#15171c]">World-Class <span className="gradient-text">Manufacturing &amp; Recycling</span></h2>
          <p className="text-[#52525b] text-sm max-w-xl mx-auto mt-3">
            From our expanded Duhai production facility to the upcoming ReEarth recycling plant — Maxvolt is building an end-to-end battery ecosystem.
          </p>
        </FadeUp>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Duhai Plant */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55 }}
            className="p-8 rounded-2xl frosted-card border border-black/6"
          >
            <div className="w-12 h-12 rounded-2xl bg-[#FFD100]/12 border border-[#FFD100]/25 flex items-center justify-center mb-5">
              <Factory size={22} className="text-[#D97706]" />
            </div>
            <h3 className="text-[#15171c] font-bold text-xl mb-3">Duhai Manufacturing Plant</h3>
            <p className="text-[#5f6470] text-sm leading-relaxed mb-6">
              Our 55,000 sq ft advanced manufacturing facility in Duhai, Ghaziabad is built for the next phase of India&apos;s EV growth. The plant features AIS 156-compliant testing bays, automated cell-to-pack assembly lines, a dedicated R&amp;D lab, and stringent quality inspection systems — enabling a 3× increase in production capacity vs. our earlier facility, supporting 25,000+ battery packs per month.
            </p>
            <div className="grid grid-cols-2 gap-3 mb-6">
              {[
                { v: "55,000 sq ft", l: "Plant Area" },
                { v: "25,000+/mo", l: "Pack Capacity" },
                { v: "3×", l: "Capacity vs. Previous" },
                { v: "AIS 156", l: "Certified Testing" },
              ].map((s) => (
                <div key={s.l} className="p-3 rounded-xl bg-[#FFD100]/5 border border-[#FFD100]/10 text-center">
                  <div className="text-sm font-black gradient-text">{s.v}</div>
                  <div className="text-[#71717a] text-[10px] mt-0.5 uppercase tracking-wide">{s.l}</div>
                </div>
              ))}
            </div>
            <a
              href={SITE_CONFIG.maps.plant}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-[#D97706] text-xs font-semibold hover:underline"
            >
              <MapPin size={12} /> {SITE_CONFIG.addresses.plant} <ExternalLink size={10} />
            </a>
          </motion.div>

          {/* ReEarth */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, delay: 0.12 }}
            className="p-8 rounded-2xl frosted-card border border-black/6"
          >
            <div className="w-12 h-12 rounded-2xl bg-[#4ade80]/12 border border-[#4ade80]/25 flex items-center justify-center mb-5">
              <Recycle size={22} className="text-[#16a34a]" />
            </div>
            <h3 className="text-[#15171c] font-bold text-xl mb-3">Maxvolt ReEarth — Battery Recycling</h3>
            <p className="text-[#5f6470] text-sm leading-relaxed mb-6">
              ReEarth is Maxvolt&apos;s dedicated battery recycling subsidiary. Its upcoming Aligarh, UP plant will handle 7,800 MT/year of spent lithium-ion batteries — recovering critical materials such as lithium, cobalt, nickel, and manganese through advanced hydrometallurgical and pyrometallurgical processes, and returning them to India&apos;s battery supply chain. Phase 1 launches January 2026.
            </p>
            <div className="grid grid-cols-2 gap-3 mb-6">
              {[
                { v: "7,800 MT/yr", l: "Recycling Capacity" },
                { v: "Li·Co·Ni·Mn", l: "Materials Recovered" },
                { v: "LFP·NMC·NCA·LCO", l: "Chemistries" },
                { v: "Jan 2026", l: "Phase 1 Launch" },
              ].map((s) => (
                <div key={s.l} className="p-3 rounded-xl bg-[#4ade80]/5 border border-[#4ade80]/10 text-center">
                  <div className="text-sm font-black text-[#16a34a]">{s.v}</div>
                  <div className="text-[#71717a] text-[10px] mt-0.5 uppercase tracking-wide">{s.l}</div>
                </div>
              ))}
            </div>
            <a
              href="https://maxvoltreearth.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-[#16a34a] text-xs font-semibold hover:underline"
            >
              Visit maxvoltreearth.com <ExternalLink size={10} />
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export default function AboutContent() {
  return (
    <>
      <PageHero
        badge="About Maxvolt Energy"
        title={<>India&apos;s Premier <span className="gradient-text">Lithium Battery</span> Manufacturer</>}
        description="Founded in 2019, Maxvolt Energy Industries Limited has grown from a 15-battery-per-day startup to a NSE-listed company with ₹297+ Crore revenue and 350+ team members powering India's electric revolution."
      />
      <MissionVision />
      <AboutStory />
      <CompanyOverview />
      <ManufacturingSection />
      <LeadershipSection />
      <KeyStrengths />
    </>
  );
}
