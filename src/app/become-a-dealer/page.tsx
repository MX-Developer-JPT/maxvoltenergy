import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "@/components/ui/PageHero";
import {
  TrendingUp, Percent, Gift, Megaphone, ShieldCheck, Truck,
  HandCoins, MapPin, ArrowRight, CheckCircle2,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Become a Dealer | Maxvolt Energy Partnership",
  description:
    "Partner with Maxvolt Energy and grow with India's fast-rising lithium battery brand. Attractive dealer margins, volume incentives, marketing support, territory protection and fast-moving inventory.",
  keywords: [
    "Maxvolt dealership", "lithium battery dealer", "EV battery distributor India",
    "battery dealer margins", "become a battery dealer", "Maxvolt partner",
  ],
};

const BENEFITS = [
  { Icon: Percent, title: "Attractive Dealer Margins", desc: "Earn healthy margins on every lithium battery sold, with pricing structured to keep you competitive and profitable in your market." },
  { Icon: TrendingUp, title: "Volume-Based Incentives", desc: "Unlock higher slabs and quarterly bonuses as your sales grow — the more you move, the more you earn." },
  { Icon: Gift, title: "Schemes & Rewards", desc: "Seasonal schemes, target-linked rewards and loyalty incentives that add directly to your bottom line." },
  { Icon: Truck, title: "Fast-Moving Inventory", desc: "High-demand EV, solar and inverter battery range with quick stock rotation and dependable resupply." },
  { Icon: Megaphone, title: "Marketing & Branding Support", desc: "Point-of-sale branding, banners, digital assets and lead support to drive walk-ins to your store." },
  { Icon: ShieldCheck, title: "Warranty & Service Backing", desc: "AIS 156 certified products with manufacturer warranty support — fewer returns, happier customers." },
  { Icon: MapPin, title: "Territory Protection", desc: "Defined catchment areas so your investment and customer base are protected from over-saturation." },
  { Icon: HandCoins, title: "Flexible Commercial Terms", desc: "Onboarding and credit terms designed to make stocking and scaling easy for committed partners." },
];

const STEPS = [
  { n: "01", title: "Enquire", desc: "Submit the dealer enquiry form with your location and business details." },
  { n: "02", title: "Discuss", desc: "Our partnerships team shares the margin structure, schemes and onboarding terms." },
  { n: "03", title: "Onboard", desc: "Sign up, place your first stocking order and receive branding & training support." },
  { n: "04", title: "Grow", desc: "Start selling Maxvolt batteries and scale your earnings with volume incentives." },
];

export default function BecomeADealerPage() {
  return (
    <>
      <PageHero
        badge="Dealer Partnership"
        title={<>Grow Your Business with <span className="gradient-text">Maxvolt</span></>}
        description="Join 58+ partners across 22+ states. Maxvolt offers one of the most rewarding dealer programs in the lithium battery industry — built around real, recurring monetary benefits."
      >
        <Link href="/contact-us#dealer" className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl bg-[#FFD100] text-black font-black text-sm hover:bg-[#FFA800] transition-all">
          Apply for Dealership <ArrowRight size={15} />
        </Link>
      </PageHero>

      {/* Monetary benefits */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="text-center mb-12">
            <span className="text-[#D97706] text-[11px] font-bold tracking-[0.25em] uppercase mb-3 block">Why Partner With Us</span>
            <h2 className="text-3xl md:text-4xl font-black text-[#15171c]">The Monetary Benefits of a <span className="gradient-text">Maxvolt Dealership</span></h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {BENEFITS.map(({ Icon, title, desc }) => (
              <div key={title} className="p-6 rounded-2xl frosted-card border border-black/6 hover:border-[#FFD100]/30 hover:-translate-y-1 transition-all">
                <div className="w-11 h-11 rounded-xl bg-[#FFD100]/12 border border-[#FFD100]/25 flex items-center justify-center mb-4">
                  <Icon size={18} className="text-[#D97706]" />
                </div>
                <h3 className="text-[#15171c] font-bold text-sm mb-1.5">{title}</h3>
                <p className="text-[#5f6470] text-xs leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="section-padding bg-[#f7f7f5]">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-black text-[#15171c]">How to <span className="gradient-text">Get Started</span></h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-5">
            {STEPS.map((s) => (
              <div key={s.n} className="p-6 rounded-2xl bg-white border border-black/6">
                <div className="text-4xl font-black text-[#FFD100] mb-3">{s.n}</div>
                <h3 className="text-[#15171c] font-bold text-base mb-1.5">{s.title}</h3>
                <p className="text-[#5f6470] text-sm leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>

          <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-4">
            {["AIS 156 certified, fast-moving product range", "Pan-India brand backed by an NSE-listed company", "Dedicated partnerships & after-sales support"].map((p) => (
              <div key={p} className="flex items-center gap-2.5 p-4 rounded-xl bg-white border border-black/6 text-[#52525b] text-sm">
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
          <h2 className="text-3xl md:text-4xl font-black text-white mb-3">Ready to <span className="gradient-text">earn with Maxvolt?</span></h2>
          <p className="text-white/60 text-sm max-w-lg mx-auto mb-7">
            Tell us your city and business — our team will share the full margin structure and onboarding details.
          </p>
          <Link href="/contact-us#dealer" className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-[#FFD100] text-black font-black text-sm hover:bg-[#FFA800] transition-all">
            Apply for Dealership <ArrowRight size={15} />
          </Link>
        </div>
      </section>
    </>
  );
}
