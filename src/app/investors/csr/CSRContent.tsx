"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import PageHero from "@/components/ui/PageHero";
import { Leaf, Users, Recycle, Zap, Heart, Globe, ArrowLeft, ArrowRight } from "lucide-react";

const CSR_PILLARS = [
  {
    Icon: Leaf,
    title: "Environmental Responsibility",
    description: "MaxVolt integrates sustainability at every level — from eco-friendly manufacturing processes to our dedicated MaxVolt ReEarth recycling subsidiary for responsible battery end-of-life management.",
    color: "#FFD100",
    initiatives: ["Lithium battery recycling program (MaxVolt ReEarth)", "Eco-Series product line with lower environmental footprint", "Reduced carbon emissions through EV battery adoption", "Sustainable material sourcing"],
  },
  {
    Icon: Users,
    title: "Community Development",
    description: "We believe growth must benefit the communities around us — creating employment, supporting skill development, and contributing to the socioeconomic development of the Ghaziabad region.",
    color: "#FFA800",
    initiatives: ["170+ local employment opportunities", "Skill development in lithium battery technology", "Support for EV mechanics and service technicians", "Community infrastructure support"],
  },
  {
    Icon: Zap,
    title: "Clean Energy Mission",
    description: "Every battery we manufacture helps India transition from fossil fuels to clean electric mobility — directly reducing carbon emissions and improving air quality in urban centers.",
    color: "#FF8C00",
    initiatives: ["Enabling EV adoption across India", "Solar storage for off-grid communities", "Reducing dependence on fossil fuel transportation", "Promoting renewable energy integration"],
  },
  {
    Icon: Recycle,
    title: "Battery Recycling",
    description: "Through our subsidiary MaxVolt ReEarth, we conduct R&D on lithium-ion battery recycling technologies — ensuring responsible end-of-life management for the batteries we manufacture.",
    color: "#7c3aed",
    initiatives: ["MaxVolt ReEarth recycling subsidiary", "Research on lithium-ion recycling technologies", "Responsible disposal programs", "Extended producer responsibility compliance"],
  },
];

export default function CSRContent() {
  return (
    <>
      <PageHero
        badge="Corporate Social Responsibility"
        title={<>Growing With <span className="gradient-text">Purpose</span></>}
        description="At MaxVolt Energy, we believe that business growth must go hand-in-hand with environmental stewardship and community development. Our CSR initiatives reflect our commitment to a sustainable electric future."
      >
        <Link href="/investors" className="inline-flex items-center gap-2 text-[#71717a] hover:text-[#15171c] text-sm transition-colors">
          <ArrowLeft size={13} />
          Back to Investors
        </Link>
      </PageHero>

      {/* CSR Overview */}
      <section className="py-16 bg-[#f7f7f5]">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {CSR_PILLARS.map(({ Icon, title, description, color, initiatives }, i) => (
              <motion.div
                key={title}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="p-7 rounded-2xl frosted-card border border-black/6 hover:border-black/8 transition-all"
              >
                <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-5" style={{ backgroundColor: `${color}12`, border: `1px solid ${color}25` }}>
                  <Icon size={20} style={{ color }} />
                </div>
                <h3 className="text-[#15171c] font-bold text-xl mb-3">{title}</h3>
                <p className="text-[#52525b] text-sm leading-relaxed mb-5">{description}</p>
                <ul className="space-y-2">
                  {initiatives.map((init) => (
                    <li key={init} className="flex items-start gap-2 text-[#5f6470] text-xs">
                      <span className="w-1.5 h-1.5 rounded-full shrink-0 mt-1" style={{ backgroundColor: color }} />
                      {init}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ReEarth CTA */}
      <section className="py-16 bg-white">
        <div className="container-custom">
          <div className="p-10 rounded-3xl" style={{ background: "linear-gradient(135deg, rgba(255,209,0,0.06) 0%, rgba(255,168,0,0.03) 100%)", border: "1px solid rgba(255,209,0,0.12)" }}>
            <div className="flex flex-col md:flex-row items-center gap-8">
              <div className="w-16 h-16 rounded-2xl bg-[#FFD100]/15 border border-[#FFD100]/25 flex items-center justify-center shrink-0">
                <Recycle size={28} className="text-[#D97706]" />
              </div>
              <div className="flex-1">
                <h3 className="text-[#15171c] font-bold text-2xl mb-2">MaxVolt ReEarth</h3>
                <p className="text-[#52525b] text-sm leading-relaxed">
                  Our dedicated subsidiary conducting research into lithium-ion battery recycling technologies —
                  ensuring that batteries we manufacture today are responsibly managed at end of life.
                  Visit maxvoltreearth.com to learn more.
                </p>
              </div>
              <a
                href="https://maxvoltreearth.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-6 py-3 rounded-xl bg-[#FFD100] text-black font-bold text-sm hover:bg-[#FFD100]/90 transition-all shrink-0"
              >
                Visit ReEarth
                <ArrowRight size={14} />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* CSR Committee */}
      <section className="py-16 bg-[#f7f7f5]">
        <div className="container-custom max-w-2xl">
          <h2 className="text-3xl font-bold text-[#15171c] mb-6">CSR Committee</h2>
          <div className="p-6 rounded-2xl frosted-card border border-black/6">
            <p className="text-[#5f6470] text-sm mb-5">
              Constituted under Section 135 of the Companies Act 2013 to oversee CSR policy, planning, and implementation.
            </p>
            <div className="space-y-3">
              {[
                { name: "Mr. Vishal Gupta", role: "Chairman" },
                { name: "Mr. Bhuvneshwar Pal Singh", role: "Member" },
                { name: "Mr. Preet Kumar", role: "Member" },
              ].map(({ name, role }) => (
                <div key={name} className="flex justify-between items-center py-2 border-b border-black/5 last:border-0">
                  <span className="text-[#3f3f46] text-sm">{name}</span>
                  <span className="text-[#D97706] text-xs font-medium">{role}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
