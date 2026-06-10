"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import PageHero from "@/components/ui/PageHero";
import { Leaf, Users, Recycle, Zap, ArrowLeft, ArrowRight } from "lucide-react";

const CSR_PILLARS = [
  {
    Icon: Leaf,
    title: "Environmental Responsibility",
    description: "Maxvolt integrates sustainability at every level — from eco-friendly manufacturing processes to our dedicated Maxvolt ReEarth recycling subsidiary for responsible battery end-of-life management.",
    color: "#FFD100",
    image: "/images/csr/csr-tree-plantation.webp",
    initiatives: ["Lithium battery recycling program (Maxvolt ReEarth)", "Eco-Series product line with lower environmental footprint", "Reduced carbon emissions through EV battery adoption", "Sustainable material sourcing"],
  },
  {
    Icon: Users,
    title: "Community Development",
    description: "We believe growth must benefit the communities around us — creating employment, supporting skill development, and contributing to the socioeconomic development of the Ghaziabad region.",
    color: "#FFA800",
    image: "/images/csr/csr-community-donation.webp",
    initiatives: ["350+ local employment opportunities", "Skill development in lithium battery technology", "Support for EV mechanics and service technicians", "Community infrastructure support"],
  },
  {
    Icon: Zap,
    title: "Clean Energy Mission",
    description: "Every battery we manufacture helps India transition from fossil fuels to clean electric mobility — directly reducing carbon emissions and improving air quality in urban centers.",
    color: "#FF8C00",
    image: "/images/csr/csr-clean-energy.webp",
    initiatives: ["Enabling EV adoption across India", "Solar storage for off-grid communities", "Reducing dependence on fossil fuel transportation", "Promoting renewable energy integration"],
  },
  {
    Icon: Recycle,
    title: "Battery Recycling",
    description: "Through our subsidiary Maxvolt ReEarth, we conduct R&D on lithium-ion battery recycling technologies — ensuring responsible end-of-life management for the batteries we manufacture.",
    color: "#7c3aed",
    image: "/images/overview/reearth-recycling.png",
    initiatives: ["Maxvolt ReEarth recycling subsidiary", "Research on lithium-ion recycling technologies", "Responsible disposal programs", "Extended producer responsibility compliance"],
  },
];

const GALLERY = [
  { src: "/images/press/blanket-distribution-drive-noida-ghaziabad.webp", caption: "Blanket Distribution Drive — Noida & Ghaziabad" },
  { src: "/images/csr/csr-tree-plantation.webp", caption: "Tree Plantation Drive" },
  { src: "/images/csr/csr-skill-education.webp", caption: "Skill Development & Training" },
  { src: "/images/csr/csr-community-donation.webp", caption: "Community Donation Programme" },
  { src: "/images/csr/csr-clean-energy.webp", caption: "Clean Energy for Communities" },
  { src: "/images/press/maxvolt-reearth-closed-loop-recycling-ecosystem.webp", caption: "Maxvolt ReEarth — Closed-Loop Recycling" },
];

export default function CSRContent() {
  return (
    <>
      <PageHero
        badge="Corporate Social Responsibility"
        title={<>Growing With <span className="gradient-text">Purpose</span></>}
        description="At Maxvolt Energy, we believe that business growth must go hand-in-hand with environmental stewardship and community development. Our CSR initiatives reflect our commitment to a sustainable electric future."
        image="/images/csr/csr-tree-plantation.webp"
      >
        <Link href="/investors" className="inline-flex items-center gap-2 text-[#71717a] hover:text-[#15171c] text-sm transition-colors">
          <ArrowLeft size={13} />
          Back to Investors
        </Link>
      </PageHero>

      {/* CSR pillars with imagery */}
      <section className="py-16 bg-[#f7f7f5]">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {CSR_PILLARS.map(({ Icon, title, description, color, image, initiatives }, i) => (
              <motion.div
                key={title}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.55, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
                className="rounded-2xl frosted-card border border-black/6 hover:border-black/8 transition-all overflow-hidden flex flex-col"
              >
                <div className="img-zoom relative h-48 overflow-hidden">
                  <Image src={image} alt={title} fill className="object-cover" sizes="(max-width:768px) 100vw, 560px" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/45 to-transparent" />
                  <div className="absolute bottom-4 left-4 flex items-center gap-2">
                    <div className="w-9 h-9 rounded-xl flex items-center justify-center backdrop-blur-md" style={{ backgroundColor: `${color}26`, border: `1px solid ${color}55` }}>
                      <Icon size={18} style={{ color: "#fff" }} />
                    </div>
                    <h3 className="text-white font-bold text-lg drop-shadow">{title}</h3>
                  </div>
                </div>
                <div className="p-7">
                  <p className="text-[#52525b] text-sm leading-relaxed mb-5">{description}</p>
                  <ul className="space-y-2">
                    {initiatives.map((init) => (
                      <li key={init} className="flex items-start gap-2 text-[#5f6470] text-xs">
                        <span className="w-1.5 h-1.5 rounded-full shrink-0 mt-1" style={{ backgroundColor: color }} />
                        {init}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CSR in Action gallery */}
      <section className="py-16 bg-white">
        <div className="container-custom">
          <div className="text-center mb-10">
            <span className="text-[#D97706] text-[11px] font-bold tracking-[0.25em] uppercase mb-3 block">On The Ground</span>
            <h2 className="text-3xl md:text-4xl font-black text-[#15171c]">CSR <span className="gradient-text">in Action</span></h2>
            <p className="text-[#5f6470] text-sm max-w-xl mx-auto mt-3">From plantation and donation drives to clean-energy access and responsible recycling — putting our values to work in the communities we serve.</p>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
            {GALLERY.map((g, i) => (
              <motion.div
                key={g.src}
                initial={{ opacity: 0, scale: 0.94 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: (i % 3) * 0.08, ease: [0.22, 1, 0.36, 1] }}
                className="img-zoom group relative h-48 md:h-56 rounded-2xl overflow-hidden border border-black/6"
              >
                <Image src={g.src} alt={g.caption} fill className="object-cover" sizes="(max-width:1024px) 50vw, 380px" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/10 to-transparent" />
                <span className="absolute bottom-3 left-4 right-4 text-white text-xs font-semibold leading-snug drop-shadow">{g.caption}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ReEarth CTA */}
      <section className="py-16 bg-[#f7f7f5]">
        <div className="container-custom">
          <div className="p-10 rounded-3xl" style={{ background: "linear-gradient(135deg, rgba(255,209,0,0.06) 0%, rgba(255,168,0,0.03) 100%)", border: "1px solid rgba(255,209,0,0.12)" }}>
            <div className="flex flex-col md:flex-row items-center gap-8">
              <div className="w-16 h-16 rounded-2xl bg-[#FFD100]/15 border border-[#FFD100]/25 flex items-center justify-center shrink-0">
                <Recycle size={28} className="text-[#D97706]" />
              </div>
              <div className="flex-1">
                <h3 className="text-[#15171c] font-bold text-2xl mb-2">Maxvolt ReEarth</h3>
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
      <section className="py-16 bg-white">
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
