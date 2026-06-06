import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "@/components/ui/PageHero";
import {
  TrendingUp, UserCog, Wrench, Megaphone, LifeBuoy,
  Handshake, ShieldCheck, BadgeCheck, ArrowRight, CheckCircle2,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Become a Dealer / OEM Partner | Maxvolt Energy",
  description:
    "Partner with Maxvolt Energy — 950+ dealers, 107 OEM partners, 2.2 GWh capacity. Dedicated OEM management, technical support, co-branded marketing and after-sales service backing.",
  keywords: [
    "Maxvolt dealership", "Maxvolt OEM partner", "lithium battery dealer India",
    "EV battery distributor", "become a battery dealer", "battery OEM partnership",
  ],
};

// Stats straight from Maxvolt's OEM company overview
const STATS = [
  { value: "950+", label: "Dealers" },
  { value: "107", label: "OEM Partners" },
  { value: "1100+", label: "Pincodes Served" },
  { value: "2.2 GWh", label: "Annual Capacity" },
  { value: "15,000+", label: "Batteries / Month" },
  { value: "10", label: "Warehouses" },
];

// The four OEM Policy & Partnership pillars from the deck
const PILLARS = [
  { Icon: UserCog, title: "Dedicated OEM Management", desc: "Maxvolt assigns a dedicated Corporate Manager to top OEM and corporate accounts, ensuring strategic, focused relationships with every partner." },
  { Icon: Wrench, title: "Product Development & Technical Support", desc: "Robust technical support, custom development with sample-battery provisioning, and active R&D involvement throughout your OEM product cycles." },
  { Icon: Megaphone, title: "Brand & Market Support", desc: "Co-branded marketing and promotional activities, joint participation in exhibitions and industry expos, and execution support to build visibility." },
  { Icon: LifeBuoy, title: "After-Sales & Service Support", desc: "Structured warranty and defect-battery replacement support, dedicated service coordinators for faster resolution, and a strong reliability focus." },
];

// Partnership promise band
const PROMISE = [
  { Icon: Handshake, title: "Stronger Together", desc: "Long-lasting partnerships built on shared success." },
  { Icon: TrendingUp, title: "Shared Growth", desc: "Grow your earnings as our network scales together." },
  { Icon: ShieldCheck, title: "Trust & Transparency", desc: "Committed to open and ethical collaboration." },
  { Icon: BadgeCheck, title: "Quality You Can Rely On", desc: "AIS 156 & ISO 9001:2015 certified products." },
];

const STEPS = [
  { n: "01", title: "Enquire", desc: "Submit the dealer/OEM enquiry with your location and business details." },
  { n: "02", title: "Discuss", desc: "Our partnerships team shares the commercial terms, support model and onboarding plan." },
  { n: "03", title: "Onboard", desc: "Place your first stocking order and receive branding, training and technical support." },
  { n: "04", title: "Grow", desc: "Sell Maxvolt's fast-moving range and scale your earnings with our growing network." },
];

export default function BecomeADealerPage() {
  return (
    <>
      <PageHero
        badge="Dealer & OEM Partnership"
        title={<>Grow Your Business with <span className="gradient-text">Maxvolt</span></>}
        description="Join 950+ dealers and 107 OEM partners across India. Maxvolt's OEM Policy & Partnership Approach is built around dedicated management, technical backing, marketing support and dependable after-sales service."
      >
        <Link href="/contact-us#dealer" className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl bg-[#FFD100] text-black font-black text-sm hover:bg-[#FFA800] transition-all">
          Apply for Partnership <ArrowRight size={15} />
        </Link>
      </PageHero>

      {/* Scale stats */}
      <section className="py-12 bg-[#0b0b0d] relative overflow-hidden">
        <div className="absolute inset-0 grid-pattern opacity-[0.07]" />
        <div className="container-custom relative z-10">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {STATS.map((s) => (
              <div key={s.label} className="text-center p-4 rounded-2xl bg-white/[0.03] border border-white/8">
                <div className="text-2xl md:text-3xl font-black gradient-text">{s.value}</div>
                <div className="text-white/55 text-[11px] mt-1 uppercase tracking-wide">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* OEM pillars */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="text-center mb-12">
            <span className="text-[#D97706] text-[11px] font-bold tracking-[0.25em] uppercase mb-3 block">Maxvolt OEM Policy &amp; Partnership Approach</span>
            <h2 className="text-3xl md:text-4xl font-black text-[#15171c]">Core Strengths <span className="gradient-text">Driving Your Success</span></h2>
            <p className="text-[#5f6470] text-sm max-w-2xl mx-auto mt-4">
              Partnering with Maxvolt means more than buying batteries — you gain a structured support system designed to protect your margins and grow your business.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {PILLARS.map(({ Icon, title, desc }) => (
              <div key={title} className="p-7 rounded-2xl frosted-card border border-black/6 hover:border-[#FFD100]/30 transition-all flex gap-5">
                <div className="w-12 h-12 rounded-xl bg-[#FFD100]/12 border border-[#FFD100]/25 flex items-center justify-center shrink-0">
                  <Icon size={20} className="text-[#D97706]" />
                </div>
                <div>
                  <h3 className="text-[#15171c] font-bold text-base mb-1.5">{title}</h3>
                  <p className="text-[#5f6470] text-sm leading-relaxed">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Partnership promise */}
      <section className="section-padding bg-[#f7f7f5]">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-black text-[#15171c]">Our Partnership <span className="gradient-text">Promise</span></h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {PROMISE.map(({ Icon, title, desc }) => (
              <div key={title} className="p-6 rounded-2xl bg-white border border-black/6 text-center">
                <div className="w-12 h-12 rounded-xl bg-[#FFD100]/12 border border-[#FFD100]/25 flex items-center justify-center mx-auto mb-4">
                  <Icon size={20} className="text-[#D97706]" />
                </div>
                <h3 className="text-[#15171c] font-bold text-sm mb-1.5">{title}</h3>
                <p className="text-[#5f6470] text-xs leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-black text-[#15171c]">How to <span className="gradient-text">Get Started</span></h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-5">
            {STEPS.map((s) => (
              <div key={s.n} className="p-6 rounded-2xl frosted-card border border-black/6">
                <div className="text-4xl font-black text-[#FFD100] mb-3">{s.n}</div>
                <h3 className="text-[#15171c] font-bold text-base mb-1.5">{s.title}</h3>
                <p className="text-[#5f6470] text-sm leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>

          <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-4">
            {["AIS 156 & ISO 9001:2015 certified, fast-moving range", "Backed by an NSE-listed company with 2 plants & 2.2 GWh capacity", "Doorstep service across 1100+ pincodes in India"].map((p) => (
              <div key={p} className="flex items-center gap-2.5 p-4 rounded-xl bg-black/[0.02] border border-black/6 text-[#52525b] text-sm">
                <CheckCircle2 size={16} className="text-[#D97706] shrink-0" /> {p}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-[#0b0b0d] relative overflow-hidden">
        <div className="absolute inset-0 grid-pattern opacity-[0.07]" />
        <div className="container-custom relative z-10 text-center">
          <h2 className="text-3xl md:text-4xl font-black text-white mb-3">Ready to <span className="gradient-text">grow with Maxvolt?</span></h2>
          <p className="text-white/60 text-sm max-w-lg mx-auto mb-7">
            Tell us your city and business — our partnerships team will share the full commercial structure and onboarding details.
          </p>
          <Link href="/contact-us#dealer" className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-[#FFD100] text-black font-black text-sm hover:bg-[#FFA800] transition-all">
            Apply for Partnership <ArrowRight size={15} />
          </Link>
        </div>
      </section>
    </>
  );
}
