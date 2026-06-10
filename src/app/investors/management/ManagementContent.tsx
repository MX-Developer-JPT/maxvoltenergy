"use client";

import { useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, useInView } from "framer-motion";
import PageHero from "@/components/ui/PageHero";
import { LEADERSHIP, COMMITTEES } from "@/lib/constants";
import { GraduationCap, Briefcase, Award, Users, ArrowLeft, Phone, Mail } from "lucide-react";

export default function ManagementContent() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  const ROLE_COLORS: Record<string, string> = {
    "Chairman & Whole Time Director": "#FFD100",
    "Managing Director & CFO": "#FFA800",
    "Non-Executive Independent Director": "#FF8C00",
  };

  return (
    <>
      <PageHero image="/images/category/management-hmh.webp"
        badge="Management"
        title={<>Board of <span className="gradient-text">Directors</span></>}
        description="Maxvolt Energy's Board comprises experienced professionals overseeing lithium battery systems development, operations, and strategic expansion into electric mobility, energy storage, and medical applications."
      >
        <Link href="/investors" className="inline-flex items-center gap-2 text-[#71717a] hover:text-[#15171c] text-sm transition-colors">
          <ArrowLeft size={13} />
          Back to Investors
        </Link>
      </PageHero>

      {/* Directors */}
      <section ref={ref} className="section-padding bg-[#f7f7f5]">
        <div className="container-custom">
          <h2 className="text-3xl font-bold text-[#15171c] mb-10">Board of Directors</h2>

          <div className="space-y-5">
            {LEADERSHIP.map((person, index) => {
              const color = ROLE_COLORS[person.role] || "#7c3aed";
              return (
                <motion.div
                  key={person.name}
                  initial={{ opacity: 0, y: 25 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: index * 0.08 }}
                  className="p-7 rounded-2xl frosted-card border border-black/6 hover:border-black/8 transition-all"
                >
                  <div className="flex flex-col md:flex-row md:items-start gap-6">
                    {/* Avatar */}
                    <div
                      className="w-16 h-16 rounded-2xl overflow-hidden flex items-center justify-center shrink-0 relative"
                      style={{ backgroundColor: `${color}15`, border: `2px solid ${color}25` }}
                    >
                      {person.image ? (
                        <Image src={person.image} alt={person.name} fill className="object-cover object-top" sizes="64px" />
                      ) : (
                        <span className="font-black text-2xl" style={{ color }}>
                          {person.name.split(" ").map((n: string) => n[0]).join("").slice(0, 2)}
                        </span>
                      )}
                    </div>

                    {/* Info */}
                    <div className="flex-1">
                      <div className="flex flex-wrap items-start gap-3 mb-3">
                        <div>
                          <h3 className="text-[#15171c] font-bold text-xl">{person.name}</h3>
                          <span className="text-xs font-semibold" style={{ color }}>{person.role}</span>
                        </div>
                        <span className="px-3 py-1 rounded-full text-xs bg-black/[0.04] text-[#5f6470] border border-black/6">
                          {person.designation}
                        </span>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                        <div className="flex items-start gap-2">
                          <GraduationCap size={14} className="text-[#a1a1aa] mt-0.5 shrink-0" />
                          <div>
                            <div className="text-[#8a8a93] text-[10px] font-medium uppercase tracking-wider mb-1">Education</div>
                            <div className="text-[#52525b] text-xs leading-relaxed">{person.education}</div>
                          </div>
                        </div>
                        <div className="flex items-start gap-2">
                          <Briefcase size={14} className="text-[#a1a1aa] mt-0.5 shrink-0" />
                          <div>
                            <div className="text-[#8a8a93] text-[10px] font-medium uppercase tracking-wider mb-1">Experience</div>
                            <div className="text-[#52525b] text-xs">{person.experience}</div>
                          </div>
                        </div>
                        <div className="flex items-start gap-2">
                          <Award size={14} className="text-[#a1a1aa] mt-0.5 shrink-0" />
                          <div>
                            <div className="text-[#8a8a93] text-[10px] font-medium uppercase tracking-wider mb-1">Focus Area</div>
                            <div className="text-[#52525b] text-xs leading-relaxed">{person.focus}</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* KMP */}
      <section className="py-16 bg-white">
        <div className="container-custom">
          <h2 className="text-3xl font-bold text-[#15171c] mb-8">Key Managerial Personnel</h2>
          <div className="p-7 rounded-2xl frosted-card border border-[#7c3aed]/15">
            <div className="flex flex-col md:flex-row md:items-center gap-6">
              <div className="w-14 h-14 rounded-2xl bg-[#7c3aed]/15 border border-[#7c3aed]/25 flex items-center justify-center shrink-0">
                <span className="text-[#7c3aed] font-black text-xl">AS</span>
              </div>
              <div className="flex-1">
                <div className="text-[#15171c] font-bold text-lg mb-1">Ms. Amisha Swain</div>
                <div className="text-[#7c3aed] text-sm font-semibold mb-2">Company Secretary & Compliance Officer</div>
                <div className="flex flex-wrap gap-4 text-sm">
                  <a href="tel:+919818889835" className="flex items-center gap-2 text-[#52525b] hover:text-[#15171c] transition-colors">
                    <Phone size={13} className="text-[#7c3aed]" />
                    +91 98188 89835
                  </a>
                  <a href="mailto:bhuvneshwar@maxvoltenergy.com" className="flex items-center gap-2 text-[#52525b] hover:text-[#15171c] transition-colors">
                    <Mail size={13} className="text-[#7c3aed]" />
                    bhuvneshwar@maxvoltenergy.com
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Committees */}
      <section className="py-16 bg-[#f7f7f5]">
        <div className="container-custom">
          <h2 className="text-3xl font-bold text-[#15171c] mb-10">Board Committees</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {COMMITTEES.map((committee, index) => (
              <motion.div
                key={committee.name}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: index * 0.1 }}
                className="p-6 rounded-2xl frosted-card border border-black/6"
              >
                <div className="flex items-center gap-3 mb-5">
                  <Users size={16} className="text-[#D97706]" />
                  <h3 className="text-[#15171c] font-bold">{committee.name}</h3>
                </div>
                <div className="space-y-2">
                  {committee.members.map((member) => (
                    <div key={member.name} className="flex items-center justify-between py-2 border-b border-black/5 last:border-0">
                      <span className="text-[#3f3f46] text-sm">{member.name}</span>
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
