import type { Metadata } from "next";
import PageHero from "@/components/ui/PageHero";
import { Briefcase, MapPin, ArrowRight, Zap, Users, TrendingUp } from "lucide-react";

export const metadata: Metadata = {
  title: "Careers | MaxVolt Energy Industries Limited",
  description: "Join MaxVolt Energy – India's fastest-growing lithium battery manufacturer. 170+ team members. Openings in engineering, sales, manufacturing, and R&D.",
};

const OPENINGS = [
  { title: "Battery Design Engineer", department: "R&D", location: "Ghaziabad, UP", type: "Full Time", color: "#FFD100" },
  { title: "Sales Manager – EV Products", department: "Sales", location: "Delhi / Mumbai / Bangalore", type: "Full Time", color: "#FFA800" },
  { title: "Manufacturing Supervisor", department: "Operations", location: "Ghaziabad, UP", type: "Full Time", color: "#FF8C00" },
  { title: "BMS Firmware Engineer", department: "Engineering", location: "Ghaziabad, UP", type: "Full Time", color: "#7c3aed" },
  { title: "Regional Dealer Development Manager", department: "Business Development", location: "Pan India", type: "Full Time", color: "#f97316" },
  { title: "Quality Assurance Technician", department: "Quality", location: "Ghaziabad, UP", type: "Full Time", color: "#ec4899" },
];

export default function CareerPage() {
  return (
    <>
      <PageHero
        badge="Join Our Team"
        title={<>Power the <span className="gradient-text">EV Revolution</span></>}
        description="MaxVolt Energy is a 170+ member team on a mission to build India's best lithium batteries. We're always looking for talented engineers, sales leaders, and operations experts."
      />

      {/* Why MaxVolt */}
      <section className="py-16 bg-[#f7f7f5] border-b border-black/6">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {[
              { Icon: Zap, title: "Fast Growth", sub: "From 15 batteries/day in 2019 to 6,000+/month in 2025 — NSE listed.", color: "#FFD100" },
              { Icon: Users, title: "Great Culture", sub: "A collaborative team of 170+ engineers, technicians, and sales professionals.", color: "#FFA800" },
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
          <h2 className="text-3xl font-bold text-[#15171c] mb-8">Current Openings</h2>
          <div className="space-y-3">
            {OPENINGS.map(({ title, department, location, type, color }) => (
              <div key={title} className="group flex flex-col md:flex-row md:items-center gap-4 p-5 rounded-2xl frosted-card border border-black/6 hover:border-black/8 transition-all cursor-pointer">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0" style={{ backgroundColor: `${color}12`, border: `1px solid ${color}25` }}>
                  <Briefcase size={16} style={{ color }} />
                </div>
                <div className="flex-1">
                  <div className="text-[#15171c] font-bold text-base">{title}</div>
                  <div className="text-[#5f6470] text-xs">{department}</div>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <span className="flex items-center gap-1 text-[#71717a] text-xs"><MapPin size={11} />{location}</span>
                  <span className="px-2.5 py-1 rounded-full text-xs border" style={{ color, borderColor: `${color}30`, backgroundColor: `${color}08` }}>{type}</span>
                </div>
                <ArrowRight size={14} className="text-[#a1a1aa] group-hover:text-[#52525b] transition-colors shrink-0" />
              </div>
            ))}
          </div>

          <div className="mt-10 p-8 rounded-2xl border border-[#FFD100]/10 bg-[#FFD100]/4 text-center">
            <h3 className="text-[#15171c] font-bold text-xl mb-3">Don&apos;t See Your Role?</h3>
            <p className="text-[#5f6470] text-sm mb-5">Send us your resume and we&apos;ll keep it on file for future opportunities.</p>
            <a href="mailto:info@maxvoltenergy.com?subject=Career Inquiry" className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#FFD100] text-black font-bold text-sm hover:bg-[#FFD100]/90 transition-all">
              Send Resume
              <ArrowRight size={14} />
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
