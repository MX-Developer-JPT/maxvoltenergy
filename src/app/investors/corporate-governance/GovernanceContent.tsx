"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import PageHero from "@/components/ui/PageHero";
import { COMMITTEES } from "@/lib/constants";
import { Shield, CheckCircle2, Users, FileText, ArrowLeft, Scale, Eye, Lock } from "lucide-react";

const GOVERNANCE_PILLARS = [
  {
    Icon: Scale,
    title: "Integrity & Ethics",
    description: "We hold ourselves to standards that go beyond legal compliance — satisfying the spirit of regulations and maintaining the highest ethical conduct in all business dealings.",
    color: "#FFD100",
  },
  {
    Icon: Eye,
    title: "Transparency",
    description: "We release information only when it is clear, verified, and relevant. All corporate announcements meet regulatory standards and provide genuine value to stakeholders.",
    color: "#FFA800",
  },
  {
    Icon: Users,
    title: "Accountability",
    description: "Our Board reviews, financial controls, and compliance audits ensure every decision is documented, reviewed, and aligned with our responsibilities to shareholders.",
    color: "#FF8C00",
  },
  {
    Icon: Lock,
    title: "Regulatory Compliance",
    description: "Full compliance with Companies Act 2013, SEBI regulations, NSE SME Emerge requirements, and all applicable corporate governance standards.",
    color: "#7c3aed",
  },
];

export default function GovernanceContent() {
  return (
    <>
      <PageHero
        badge="Corporate Governance"
        title={<>Governance Beyond<br /><span className="gradient-text">Compliance</span></>}
        description="Maxvolt Energy's corporate governance framework ensures integrity, accountability, and ethical conduct at every level. We believe governance should satisfy the spirit of regulations — not merely their technical requirements."
      >
        <Link href="/investors" className="inline-flex items-center gap-2 text-[#71717a] hover:text-[#15171c] text-sm transition-colors">
          <ArrowLeft size={13} />
          Back to Investors
        </Link>
      </PageHero>

      {/* Philosophy */}
      <section className="py-16 bg-[#f7f7f5]">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <blockquote className="text-[#52525b] text-xl leading-relaxed italic border-l-4 border-[#FFD100] pl-6 text-left">
              &ldquo;Corporate governance standards should go beyond the law and must satisfy the spirit of regulations
              rather than merely their technical requirements. We set strict standards for decision-making,
              accountability, and ethical conduct — with Board reviews, financial controls, compliance audits,
              and fairness principles for all stakeholders.&rdquo;
            </blockquote>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {GOVERNANCE_PILLARS.map(({ Icon, title, description, color }, i) => (
              <motion.div
                key={title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="flex gap-5 p-6 rounded-2xl frosted-card border border-black/6"
              >
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0"
                  style={{ backgroundColor: `${color}12`, border: `1px solid ${color}25` }}
                >
                  <Icon size={20} style={{ color }} />
                </div>
                <div>
                  <h3 className="text-[#15171c] font-bold mb-2">{title}</h3>
                  <p className="text-[#5f6470] text-sm leading-relaxed">{description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Board Structure */}
      <section className="py-16 bg-white">
        <div className="container-custom">
          <h2 className="text-3xl font-bold text-[#15171c] mb-8">Board Structure</h2>
          <div className="p-7 rounded-2xl frosted-card border border-black/6 mb-8">
            <p className="text-[#52525b] text-sm mb-6">
              The Board comprises 5 members, including Executive Directors and Non-Executive Independent Directors,
              ensuring balanced oversight and independent judgment on all key decisions.
            </p>
            <div className="space-y-3">
              {[
                { name: "Mr. Vishal Gupta", role: "Chairman & Whole Time Director (Executive)", color: "#FFD100" },
                { name: "Mr. Bhuvneshwar Pal Singh", role: "Managing Director & CFO (Executive)", color: "#FFA800" },
                { name: "Mr. Preet Kumar", role: "Non-Executive Independent Director (CS)", color: "#FF8C00" },
                { name: "Ms. Kavita Dixit", role: "Non-Executive Independent Director (CA)", color: "#7c3aed" },
                { name: "Mr. Ajay Kumar", role: "Non-Executive Independent Director (CA)", color: "#f97316" },
              ].map(({ name, role, color }) => (
                <div key={name} className="flex items-center gap-4 py-3 border-b border-black/5 last:border-0">
                  <div className="w-2 h-2 rounded-full shrink-0" style={{ backgroundColor: color }} />
                  <span className="text-[#15171c] font-semibold text-sm">{name}</span>
                  <span className="text-[#71717a] text-xs ml-auto text-right">{role}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Committees */}
      <section className="py-16 bg-[#f7f7f5]">
        <div className="container-custom">
          <h2 className="text-3xl font-bold text-[#15171c] mb-8">Board Committees</h2>
          <p className="text-[#5f6470] text-sm mb-8">
            All committees constituted pursuant to applicable provisions of the Companies Act 2013 and SEBI regulations.
            Compositions approved at Board meeting held on October 16, 2024.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {COMMITTEES.map((committee, i) => (
              <motion.div
                key={committee.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="p-6 rounded-2xl frosted-card border border-black/6"
              >
                <div className="flex items-center gap-3 mb-4">
                  <Shield size={16} className="text-[#D97706]" />
                  <h3 className="text-[#15171c] font-bold">{committee.name}</h3>
                </div>
                <div className="space-y-2">
                  {committee.members.map((member) => (
                    <div key={member.name} className="flex items-center justify-between py-2 border-b border-black/5 last:border-0">
                      <div className="flex items-center gap-2">
                        <CheckCircle2 size={12} className="text-[#D97706]/50" />
                        <span className="text-[#3f3f46] text-sm">{member.name}</span>
                      </div>
                      <span className="text-[#71717a] text-xs">{member.role}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
