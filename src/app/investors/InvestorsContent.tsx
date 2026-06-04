"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import PageHero from "@/components/ui/PageHero";
import TiltCard from "@/components/ui/TiltCard";
import { FadeUp } from "@/components/ui/AnimatedText";
import {
  TrendingUp, Users, FileText, Shield, BarChart3, Award, Phone, Mail,
  ArrowRight, ExternalLink, Mic, Building2, BookOpen, Newspaper,
} from "lucide-react";

const INVESTOR_SECTIONS = [
  {
    Icon: Mic,
    title: "Earnings Call",
    description: "Listen to our earnings calls and access transcripts and investor presentations for FY 2025 and FY 2026.",
    href: "/investors/earnings-call",
    color: "#FFD100",
    items: ["Investors Presentation FY 25", "Earnings Call Audio FY 2025", "H1 FY26 Transcript & Presentation", "FY 2026 Full Year Earnings"],
  },
  {
    Icon: Users,
    title: "Management",
    description: "Meet the Board of Directors and Key Managerial Personnel driving MaxVolt's strategic vision.",
    href: "/investors/management",
    color: "#FFA800",
    items: ["Board of Directors", "Key Managerial Personnel", "Executive Profiles", "Committee Compositions"],
  },
  {
    Icon: Shield,
    title: "Corporate Governance",
    description: "Our governance framework ensures integrity, accountability, and ethical conduct at every level.",
    href: "/investors/corporate-governance",
    color: "#FF8C00",
    items: ["Board Committees", "Audit Committee", "Nomination & Remuneration", "Stakeholders' Relationship"],
  },
  {
    Icon: Newspaper,
    title: "Corporate Announcements",
    description: "Official regulatory announcements, board meeting outcomes, and statutory filings.",
    href: "/investors/corporate-announcement",
    color: "#7c3aed",
    items: ["Outcome of Board Meetings", "EGM Proceedings", "Voting Results", "Trading Window Closures"],
  },
  {
    Icon: BarChart3,
    title: "Shareholding Pattern",
    description: "Promoter holdings, institutional investors, and public shareholder structure with regular updates.",
    href: "/investors/shareholding-pattern",
    color: "#f97316",
    items: ["As on 31-03-2024", "As on 31st March 2023", "As on 31.03.2022"],
  },
  {
    Icon: BookOpen,
    title: "Annual Reports",
    description: "Comprehensive annual reports covering financial performance, operations, and strategic outlook.",
    href: "/investors/annual-reports",
    color: "#ec4899",
    items: ["Annual Report Documents", "Financial Statements", "Director's Report", "Auditor's Report"],
  },
  {
    Icon: Building2,
    title: "CSR",
    description: "Corporate Social Responsibility initiatives and environmental commitment for sustainable growth.",
    href: "/investors/csr",
    color: "#FFD100",
    items: ["CSR Policy", "Environmental Commitment", "Community Initiatives", "Sustainability Programs"],
  },
  {
    Icon: FileText,
    title: "Policies & Notices",
    description: "Quality, safety, data security, employee conduct, and environmental responsibility policies.",
    href: "/investors/policies-notices",
    color: "#FFA800",
    items: ["Quality Policy", "Safety Policy", "Data Security Policy", "Employee Code of Conduct"],
  },
];

const KEY_HIGHLIGHTS = [
  { label: "NSE SME Emerge", value: "Listed", sub: "Stock Exchange Listing", color: "#FFD100" },
  { label: "Revenue FY25", value: "₹100+ Cr", sub: "Annual Revenue", color: "#FFA800" },
  { label: "Team Size", value: "170+", sub: "Skilled Professionals", color: "#FF8C00" },
  { label: "Monthly Capacity", value: "6,000+", sub: "Battery Packs", color: "#7c3aed" },
];

export default function InvestorsContent() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <>
      <PageHero
        badge="Investor Relations"
        title={<>Transparent Growth.<br /><span className="gradient-text">Investor Confidence.</span></>}
        description="MaxVolt Energy Industries Limited is listed on NSE SME Emerge. Access earnings calls, annual reports, corporate governance documents, and regulatory filings for informed investment decisions."
      />

      {/* Key highlights */}
      <section className="py-12 bg-[#f7f7f5] border-b border-black/6">
        <div className="container-custom">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {KEY_HIGHLIGHTS.map(({ label, value, sub, color }) => (
              <div key={label} className="p-5 rounded-xl frosted-card border border-black/6 text-center">
                <div className="text-2xl font-black mb-1" style={{ color }}>{value}</div>
                <div className="text-[#15171c] text-sm font-bold mb-0.5">{label}</div>
                <div className="text-[#71717a] text-xs">{sub}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* IPO highlight */}
      <section className="py-12 bg-white">
        <div className="container-custom">
          <div
            className="p-8 md:p-12 rounded-3xl relative overflow-hidden"
            style={{
              background: "linear-gradient(135deg, rgba(255,209,0,0.06) 0%, rgba(255,168,0,0.03) 50%, rgba(255,140,0,0.04) 100%)",
              border: "1px solid rgba(255,209,0,0.12)",
            }}
          >
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#FFD100]/5 rounded-full blur-[80px] pointer-events-none" />
            <div className="flex flex-col md:flex-row items-start md:items-center gap-8 relative z-10">
              <div className="w-16 h-16 rounded-2xl bg-[#FFD100]/15 border border-[#FFD100]/25 flex items-center justify-center shrink-0">
                <TrendingUp size={28} className="text-[#D97706]" />
              </div>
              <div className="flex-1">
                <div className="text-[#D97706] text-xs font-semibold tracking-[0.2em] uppercase mb-2">Initial Public Offering</div>
                <h2 className="text-2xl md:text-3xl font-bold text-[#15171c] mb-3">
                  Listed on NSE SME Emerge Platform
                </h2>
                <p className="text-[#52525b] text-sm leading-relaxed max-w-2xl">
                  MaxVolt Energy Industries Limited successfully listed on the NSE SME Emerge platform in 2025.
                  The IPO strengthened our financial base, expanded manufacturing capacity, advanced R&D capabilities,
                  and extended our market reach — all under strict regulatory compliance and full transparency.
                </p>
              </div>
              <div className="flex flex-col gap-3 shrink-0">
                <Link
                  href="/investors/earnings-call"
                  className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#FFD100] text-black font-bold text-sm hover:bg-[#FFD100]/90 transition-all"
                >
                  Investor Presentations
                  <ArrowRight size={13} />
                </Link>
                <a
                  href="https://www.nseindia.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-5 py-2.5 rounded-xl border border-black/8 text-[#52525b] hover:text-[#15171c] text-sm font-medium transition-all"
                >
                  NSE India
                  <ExternalLink size={12} />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Sections grid */}
      <section ref={ref} className="section-padding bg-[#f7f7f5]">
        <div className="absolute inset-0 dot-pattern opacity-15 pointer-events-none" />
        <div className="container-custom relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-[#15171c] mb-3">
              Investor <span className="gradient-text">Resources</span>
            </h2>
            <p className="text-[#5f6470] text-sm max-w-md mx-auto">
              Complete transparency for shareholders, analysts, and institutional investors.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {INVESTOR_SECTIONS.map(({ Icon, title, description, href, color, items }, index) => (
              <motion.div
                key={title}
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: index * 0.06 }}
              >
                <Link href={href} className="group block h-full">
                  <TiltCard maxTilt={5} className="h-full">
                  <div className="relative h-full flex flex-col p-6 rounded-2xl bg-white border border-black/6 hover:border-black/8 transition-all duration-300 hover:-translate-y-1 overflow-hidden">
                    {/* Glow */}
                    <div
                      className="absolute top-0 right-0 w-24 h-24 rounded-full blur-[50px] opacity-0 group-hover:opacity-20 transition-opacity duration-500"
                      style={{ background: color }}
                    />

                    <div
                      className="w-11 h-11 rounded-xl flex items-center justify-center mb-5"
                      style={{ backgroundColor: `${color}12`, border: `1px solid ${color}25` }}
                    >
                      <Icon size={18} style={{ color }} />
                    </div>

                    <h3 className="text-[#15171c] font-bold text-lg mb-2">{title}</h3>
                    <p className="text-[#5f6470] text-xs leading-relaxed mb-4 flex-1">{description}</p>

                    <ul className="space-y-1.5 mb-4">
                      {items.map((item) => (
                        <li key={item} className="flex items-center gap-2 text-[#71717a] text-xs">
                          <span className="w-1 h-1 rounded-full shrink-0" style={{ backgroundColor: color }} />
                          {item}
                        </li>
                      ))}
                    </ul>

                    <div
                      className="flex items-center gap-1 text-xs font-semibold"
                      style={{ color }}
                    >
                      View More <ArrowRight size={11} className="group-hover:translate-x-1 transition-transform" />
                    </div>

                    {/* Bottom line */}
                    <div
                      className="absolute bottom-0 left-0 h-[2px] w-0 group-hover:w-full transition-all duration-500"
                      style={{ background: `linear-gradient(90deg, ${color}, transparent)` }}
                    />
                  </div>
                  </TiltCard>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Governance philosophy */}
      <section className="py-20 bg-white">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center">
            <Award size={40} className="text-[#D97706] mx-auto mb-6" />
            <h2 className="text-3xl md:text-4xl font-bold text-[#15171c] mb-6">
              Our Governance Philosophy
            </h2>
            <blockquote className="text-[#52525b] text-lg leading-relaxed italic mb-8">
              &ldquo;Corporate governance standards should go beyond the law and must satisfy the spirit of regulations
              rather than merely their technical requirements. We set strict standards for decision-making,
              accountability, and ethical conduct — with Board reviews, financial controls, compliance audits,
              and fairness principles for all stakeholders.&rdquo;
            </blockquote>
            <Link
              href="/investors/corporate-governance"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-[#FFD100]/20 text-[#D97706] text-sm font-semibold hover:bg-[#FFD100]/5 transition-all"
            >
              View Governance Framework
              <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </section>

      {/* Contact for investors */}
      <section className="py-16 bg-[#f7f7f5] border-t border-black/6">
        <div className="container-custom">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div>
              <h3 className="text-xl font-bold text-[#15171c] mb-2">Investor Queries</h3>
              <p className="text-[#5f6470] text-sm">Contact our Compliance Officer for investor relations inquiries.</p>
            </div>
            <div className="flex flex-col gap-3 text-sm">
              <div className="flex items-center gap-2 text-[#52525b]">
                <Users size={14} className="text-[#D97706]" />
                Ms. Amisha Swain — Company Secretary & Compliance Officer
              </div>
              <a href="tel:+919818889835" className="flex items-center gap-2 text-[#52525b] hover:text-[#15171c] transition-colors">
                <Phone size={14} className="text-[#D97706]" />
                +91 98188 89835
              </a>
              <a href="mailto:info@maxvoltenergy.com" className="flex items-center gap-2 text-[#52525b] hover:text-[#15171c] transition-colors">
                <Mail size={14} className="text-[#D97706]" />
                info@maxvoltenergy.com
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
