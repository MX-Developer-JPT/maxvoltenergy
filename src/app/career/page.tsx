import type { Metadata } from "next";
import PageHero from "@/components/ui/PageHero";
import { Briefcase, MapPin, ArrowRight, Zap, Users, TrendingUp, ExternalLink } from "lucide-react";
import { readPublished, type JobOpening } from "@/lib/careers-store.server";
import { SEED_OPENINGS } from "@/lib/careers-seed";
import { SITE_CONFIG } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Careers",
  description: "Join Maxvolt Energy – India's fastest-growing lithium battery manufacturer. 350+ team members. Openings in engineering, sales, manufacturing, and R&D.",
};

export const dynamic = "force-dynamic";

export default function CareerPage() {
  // Merge admin-published openings with the curated defaults (dedupe by title).
  const custom = readPublished();
  const seen = new Set(custom.map((j) => j.title.toLowerCase().trim()));
  const openings: JobOpening[] = [
    ...custom,
    ...SEED_OPENINGS.filter((j) => !seen.has(j.title.toLowerCase().trim())),
  ];

  return (
    <>
      <PageHero image="/images/category/career-aeu.webp"
        badge="Join Our Team"
        title={<>Power the <span className="gradient-text">EV Revolution</span></>}
        description="Maxvolt Energy is a 350+ member team on a mission to build India's best lithium batteries. We're always looking for talented engineers, sales leaders, and operations experts."
      >
        <a
          href={SITE_CONFIG.careersPortal}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl bg-[#FFD100] text-black font-black text-sm hover:bg-[#FFA800] transition-all"
        >
          View Open Positions <ExternalLink size={15} />
        </a>
      </PageHero>

      {/* Why Maxvolt */}
      <section className="py-16 bg-[#f7f7f5] border-b border-black/6">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {[
              { Icon: Zap, title: "Fast Growth", sub: "From 15 batteries/day in 2019 to 25,000+/month today — NSE listed.", color: "#FFD100" },
              { Icon: Users, title: "Great Culture", sub: "A collaborative team of 350+ engineers, technicians, and sales professionals.", color: "#FFA800" },
              { Icon: TrendingUp, title: "Industry Impact", sub: "Every battery we build helps India reduce carbon emissions.", color: "#FF8C00" },
            ].map(({ Icon, title, sub, color }) => (
              <div key={title} className="flex gap-4 p-6 rounded-2xl frosted-card border border-black/6">
                <div className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0" style={{ backgroundColor: `${color}12`, border: `1px solid ${color}25` }}>
                  <Icon size={18} style={{ color }} />
                </div>
                <div>
                  <h3 className="text-[#15171c] font-bold mb-1">{title}</h3>
                  <p className="text-[#5f6470] text-sm">{sub}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Openings */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="flex items-center justify-between mb-8 flex-wrap gap-3">
            <h2 className="text-3xl font-bold text-[#15171c]">Current Openings</h2>
            <a href={SITE_CONFIG.careersPortal} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-[#D97706] text-sm font-semibold hover:underline">
              View all on Career Portal <ExternalLink size={13} />
            </a>
          </div>
          <div className="space-y-3">
            {openings.map((job) => {
              const { id, title, department, location, type, color, experience, description } = job;
              return (
                <a
                  key={id}
                  href={SITE_CONFIG.careersPortal}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex flex-col md:flex-row md:items-center gap-4 p-5 rounded-2xl frosted-card border border-black/6 hover:border-[#FFD100]/30 hover:-translate-y-0.5 transition-all"
                >
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0" style={{ backgroundColor: `${color}12`, border: `1px solid ${color}25` }}>
                    <Briefcase size={16} style={{ color }} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-[#15171c] font-bold text-base">{title}</div>
                    <div className="text-[#5f6470] text-xs">{department}{experience ? ` · ${experience}` : ""}</div>
                    {description && <p className="text-[#71717a] text-xs mt-1.5 leading-relaxed line-clamp-2">{description}</p>}
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <span className="flex items-center gap-1 text-[#71717a] text-xs"><MapPin size={11} />{location}</span>
                    <span className="px-2.5 py-1 rounded-full text-xs border" style={{ color, borderColor: `${color}30`, backgroundColor: `${color}08` }}>{type}</span>
                  </div>
                  <span className="flex items-center gap-1 text-[#a1a1aa] text-xs font-medium group-hover:text-[#D97706] transition-colors shrink-0">Apply <ExternalLink size={13} className="group-hover:translate-x-0.5 transition-transform" /></span>
                </a>
              );
            })}
          </div>

          {/* Career portal band */}
          <div className="mt-10 p-8 rounded-2xl border border-[#FFD100]/10 bg-[#FFD100]/4 text-center">
            <h3 className="text-[#15171c] font-bold text-xl mb-3">Explore Every Live Opening</h3>
            <p className="text-[#5f6470] text-sm mb-6 max-w-md mx-auto">Browse and apply for all current vacancies on the Maxvolt Career Portal, or send us your resume for future opportunities.</p>
            <div className="flex flex-wrap items-center justify-center gap-3">
              <a href={SITE_CONFIG.careersPortal} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#FFD100] text-black font-bold text-sm hover:bg-[#FFD100]/90 transition-all">
                Visit Career Portal <ExternalLink size={14} />
              </a>
              <a href={`mailto:${SITE_CONFIG.careersEmail}?subject=Career Inquiry`} className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-black/10 text-[#3f3f46] hover:text-[#15171c] hover:border-[#FFD100]/40 font-medium text-sm transition-all">
                Send Resume <ArrowRight size={14} />
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
