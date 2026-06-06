import type { Metadata } from "next";
import PageHero from "@/components/ui/PageHero";
import { Recycle, Leaf, ArrowRight, ExternalLink, FlaskConical } from "lucide-react";

export const metadata: Metadata = {
  title: "Recycle | Maxvolt ReEarth Battery Recycling",
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
