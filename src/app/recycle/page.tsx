import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import PageHero from "@/components/ui/PageHero";
import { Recycle, Leaf, ArrowRight, ExternalLink, FlaskConical, Factory, MapPin, Zap, ShieldCheck } from "lucide-react";
import { SITE_CONFIG } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Recycle",
  description: "Maxvolt ReEarth – lithium battery recycling program. Responsible end-of-life management for EV and energy storage batteries.",
};

export default function RecyclePage() {
  return (
    <>
      <PageHero
        badge="Battery Recycling"
        title={<>Closing the Loop with <span className="gradient-text">Maxvolt ReEarth</span></>}
        description="Maxvolt ReEarth is our dedicated subsidiary researching and implementing sustainable lithium-ion battery recycling technologies — ensuring every battery we make has a responsible end of life."
      />

      <section className="section-padding bg-[#f7f7f5]">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            <div>
              <h2 className="text-3xl font-bold text-[#15171c] mb-5">
                Why Battery <span className="gradient-text">Recycling Matters</span>
              </h2>
              <p className="text-[#52525b] text-sm leading-relaxed mb-4">
                India will generate tens of thousands of used EV batteries in the coming years. Without responsible
                recycling, these batteries pose serious environmental risks — including soil contamination, water
                pollution, and loss of valuable critical minerals.
              </p>
              <p className="text-[#52525b] text-sm leading-relaxed mb-6">
                Maxvolt ReEarth is our commitment to a circular battery economy — recovering lithium, cobalt, nickel,
                and other valuable materials while preventing environmental harm.
              </p>
              <a href="https://maxvoltreearth.com" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#FFD100] text-black font-bold text-sm hover:bg-[#FFD100]/90 transition-all">
                Visit Maxvolt ReEarth
                <ExternalLink size={14} />
              </a>
            </div>
            <div className="space-y-4">
              {[
                { Icon: FlaskConical, title: "R&D in Battery Recycling", desc: "Active research into advanced hydrometallurgical and pyrometallurgical recycling processes.", color: "#FFD100" },
                { Icon: Leaf, title: "Environmental Responsibility", desc: "Preventing lithium, cobalt, and nickel from entering landfills and water systems.", color: "#FFA800" },
                { Icon: Recycle, title: "Material Recovery", desc: "Recovering critical battery materials for reuse in new battery manufacturing.", color: "#FF8C00" },
              ].map(({ Icon, title, desc, color }) => (
                <div key={title} className="flex gap-4 p-5 rounded-xl frosted-card border border-black/6">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0" style={{ backgroundColor: `${color}12`, border: `1px solid ${color}25` }}>
                    <Icon size={16} style={{ color }} />
                  </div>
                  <div>
                    <div className="text-[#15171c] font-bold text-sm mb-1">{title}</div>
                    <div className="text-[#5f6470] text-xs leading-relaxed">{desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* ReEarth recycling ecosystem (from company overview) */}
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-[#15171c] mb-3 text-center">The Maxvolt ReEarth <span className="gradient-text">Recycling Ecosystem</span></h2>
            <p className="text-[#52525b] text-sm text-center max-w-2xl mx-auto mb-8">
              A dedicated subsidiary establishing one of India&apos;s first lithium-ion battery recycling plants in Aligarh,
              Uttar Pradesh — recovering critical materials and returning them to new production. Recover. Reprocess. Reuse.
            </p>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              {[
                { v: "7,800 MT/yr", l: "Recycling Capacity" },
                { v: "Li · Co · Ni · Mn", l: "Materials Recovered" },
                { v: "LFP·NMC·NCA·LCO", l: "Chemistries Supported" },
                { v: "Jan 2026", l: "Phase 1 Launch" },
              ].map((s) => (
                <div key={s.l} className="text-center p-4 rounded-2xl frosted-card border border-black/6">
                  <div className="text-lg md:text-xl font-black gradient-text">{s.v}</div>
                  <div className="text-[#71717a] text-[11px] mt-1 uppercase tracking-wide">{s.l}</div>
                </div>
              ))}
            </div>

            <div className="relative w-full rounded-2xl overflow-hidden border border-black/8" style={{ aspectRatio: "1200/500" }}>
              <Image src="/images/overview/reearth-recycling.png" alt="Maxvolt ReEarth recycling ecosystem" fill className="object-contain" sizes="100vw" />
            </div>
          </div>

          {/* Duhai Plant + ReEarth facility details */}
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-[#15171c] mb-3 text-center">Our <span className="gradient-text">Manufacturing &amp; Recycling Facilities</span></h2>
            <p className="text-[#52525b] text-sm text-center max-w-2xl mx-auto mb-8">
              From manufacturing to responsible end-of-life management — both our Duhai production plant and the upcoming ReEarth recycling facility are built for scale and sustainability.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Duhai Plant */}
              <div className="p-7 rounded-2xl frosted-card border border-black/6">
                <div className="w-12 h-12 rounded-2xl bg-[#FFD100]/12 border border-[#FFD100]/25 flex items-center justify-center mb-5">
                  <Factory size={22} className="text-[#D97706]" />
                </div>
                <h3 className="text-[#15171c] font-bold text-lg mb-2">Duhai Manufacturing Plant</h3>
                <p className="text-[#5f6470] text-sm leading-relaxed mb-4">
                  Maxvolt&apos;s state-of-the-art 55,000 sq ft production facility in Duhai, Ghaziabad is engineered for high-volume lithium battery pack assembly with advanced automation, AIS 156-compliant testing bays, and a dedicated R&amp;D wing. The plant delivers a 3× capacity increase over our earlier facility — enabling 15,000+ battery packs per month.
                </p>
                <div className="grid grid-cols-2 gap-3 mb-5">
                  {[
                    { v: "55,000 sq ft", l: "Plant Area" },
                    { v: "15,000+/mo", l: "Production Capacity" },
                    { v: "3×", l: "Capacity Increase" },
                    { v: "AIS 156", l: "Certified Testing" },
                  ].map((s) => (
                    <div key={s.l} className="p-3 rounded-xl bg-[#FFD100]/5 border border-[#FFD100]/10 text-center">
                      <div className="text-base font-black gradient-text">{s.v}</div>
                      <div className="text-[#71717a] text-[10px] mt-0.5 uppercase tracking-wide">{s.l}</div>
                    </div>
                  ))}
                </div>
                <a
                  href={SITE_CONFIG.maps.plant}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-[#D97706] text-sm font-semibold hover:text-[#D97706]/80 transition-colors"
                >
                  <MapPin size={14} />
                  {SITE_CONFIG.addresses.plant}
                  <ExternalLink size={11} />
                </a>
              </div>

              {/* ReEarth Facility */}
              <div className="p-7 rounded-2xl frosted-card border border-black/6">
                <div className="w-12 h-12 rounded-2xl bg-[#4ade80]/12 border border-[#4ade80]/25 flex items-center justify-center mb-5">
                  <Recycle size={22} className="text-[#16a34a]" />
                </div>
                <h3 className="text-[#15171c] font-bold text-lg mb-2">ReEarth Recycling Plant — Aligarh, UP</h3>
                <p className="text-[#5f6470] text-sm leading-relaxed mb-4">
                  Maxvolt ReEarth is establishing one of India&apos;s first large-scale lithium-ion battery recycling plants in Aligarh, Uttar Pradesh. Using both hydrometallurgical and pyrometallurgical processes, the facility will recover lithium, cobalt, nickel, manganese, and other critical minerals from spent EV and energy storage batteries — feeding them back into new cell manufacturing.
                </p>
                <div className="grid grid-cols-2 gap-3 mb-5">
                  {[
                    { v: "7,800 MT/yr", l: "Recycling Capacity" },
                    { v: "Li·Co·Ni·Mn", l: "Materials Recovered" },
                    { v: "LFP·NMC·NCA·LCO", l: "Chemistries Supported" },
                    { v: "Jan 2026", l: "Phase 1 Launch" },
                  ].map((s) => (
                    <div key={s.l} className="p-3 rounded-xl bg-[#4ade80]/5 border border-[#4ade80]/10 text-center">
                      <div className="text-base font-black text-[#16a34a]">{s.v}</div>
                      <div className="text-[#71717a] text-[10px] mt-0.5 uppercase tracking-wide">{s.l}</div>
                    </div>
                  ))}
                </div>
                <a
                  href="https://maxvoltreearth.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-[#16a34a] text-sm font-semibold hover:text-[#16a34a]/80 transition-colors"
                >
                  Visit Maxvolt ReEarth
                  <ExternalLink size={11} />
                </a>
              </div>
            </div>
          </div>

          {/* ReEarth process steps */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-[#15171c] mb-6 text-center">The ReEarth <span className="gradient-text">Circular Process</span></h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { icon: Zap, step: "01", title: "Collection", desc: "Spent batteries collected from dealers, OEMs, and fleet operators across India.", color: "#FFD100" },
                { icon: FlaskConical, step: "02", title: "Processing", desc: "Batteries safely discharged, disassembled, and shredded in controlled conditions.", color: "#FFA800" },
                { icon: Recycle, step: "03", title: "Recovery", desc: "Black mass processed via hydro- and pyrometallurgy to recover Li, Co, Ni, Mn.", color: "#FF8C00" },
                { icon: ShieldCheck, step: "04", title: "Reintegration", desc: "Recovered materials certified and supplied back to battery cell manufacturers.", color: "#f97316" },
              ].map(({ icon: Icon, step, title, desc, color }) => (
                <div key={step} className="p-5 rounded-2xl frosted-card border border-black/6 text-center">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center mx-auto mb-3" style={{ backgroundColor: `${color}12`, border: `1px solid ${color}25` }}>
                    <Icon size={18} style={{ color }} />
                  </div>
                  <div className="text-[#FFD100] font-black text-xs mb-1">{step}</div>
                  <div className="text-[#15171c] font-bold text-sm mb-2">{title}</div>
                  <div className="text-[#5f6470] text-xs leading-relaxed">{desc}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="p-8 rounded-2xl border border-[#FFD100]/10 bg-[#FFD100]/4 text-center">
            <Recycle size={36} className="text-[#D97706] mx-auto mb-4" />
            <h3 className="text-[#15171c] font-bold text-xl mb-3">Recycle Your Maxvolt Battery</h3>
            <p className="text-[#5f6470] text-sm mb-6 max-w-md mx-auto">
              Contact us to locate your nearest Maxvolt authorized battery collection point or to arrange
              pickup for end-of-life batteries.
            </p>
            <a href="/contact-us" className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#FFD100] text-black font-bold text-sm hover:bg-[#FFD100]/90 transition-all">
              Contact for Recycling
              <ArrowRight size={14} />
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
