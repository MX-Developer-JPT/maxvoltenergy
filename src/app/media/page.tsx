import type { Metadata } from "next";
import PageHero from "@/components/ui/PageHero";
import { Newspaper, ExternalLink, TrendingUp } from "lucide-react";

export const metadata: Metadata = {
  title: "Media Coverage | MaxVolt Energy",
  description: "MaxVolt Energy in the news – press releases, media coverage, and company announcements.",
};

const PRESS_ITEMS = [
  {
    title: "Rising fuel prices and West Asia tensions accelerating EV adoption in India",
    source: "Energy News",
    date: "2025",
    summary: "MaxVolt Energy positioned to benefit as rising fuel costs drive accelerated transition to electric vehicles across India.",
    color: "#FFD100",
  },
  {
    title: "MaxVolt ReEarth research on lithium-ion battery recycling technologies",
    source: "CleanTech India",
    date: "2025",
    summary: "MaxVolt's subsidiary ReEarth conducts groundbreaking research into sustainable lithium battery recycling, addressing end-of-life battery management.",
    color: "#FFA800",
  },
  {
    title: "EV shift strengthening demand for Indian lithium battery manufacturers",
    source: "Economic Coverage",
    date: "2025",
    summary: "India's push for domestic EV manufacturing is driving significant demand for homegrown lithium battery companies like MaxVolt Energy.",
    color: "#FF8C00",
  },
  {
    title: "MaxVolt Energy lists on NSE SME Emerge Platform",
    source: "NSE India / Business News",
    date: "2025",
    summary: "MaxVolt Energy Industries Limited successfully completes IPO and lists on the NSE SME Emerge platform, achieving ₹100+ Crore revenue milestone.",
    color: "#7c3aed",
  },
];

export default function MediaPage() {
  return (
    <>
      <PageHero
        badge="Media Coverage"
        title={<>MaxVolt in the <span className="gradient-text">News</span></>}
        description="Press coverage, company announcements, and industry news featuring MaxVolt Energy Industries Limited."
      />

      <section className="section-padding bg-[#f7f7f5]">
        <div className="container-custom">
          <div className="space-y-5">
            {PRESS_ITEMS.map(({ title, source, date, summary, color }) => (
              <div key={title} className="group p-7 rounded-2xl frosted-card border border-black/6 hover:border-black/8 transition-all">
                <div className="flex items-start gap-5">
                  <div className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0" style={{ backgroundColor: `${color}12`, border: `1px solid ${color}25` }}>
                    <Newspaper size={18} style={{ color }} />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="text-xs font-semibold px-2 py-0.5 rounded" style={{ color, backgroundColor: `${color}10` }}>{source}</span>
                      <span className="text-[#8a8a93] text-xs">{date}</span>
                    </div>
                    <h3 className="text-[#15171c] font-bold text-lg mb-2 leading-tight">{title}</h3>
                    <p className="text-[#5f6470] text-sm leading-relaxed">{summary}</p>
                  </div>
                  <ExternalLink size={14} className="text-[#a1a1aa] shrink-0 mt-1" />
                </div>
              </div>
            ))}
          </div>

          <div className="mt-10 p-8 rounded-2xl border border-black/6 bg-black/[0.02] text-center">
            <TrendingUp size={32} className="text-[#D97706] mx-auto mb-4" />
            <h3 className="text-[#15171c] font-bold text-xl mb-2">Press Inquiries</h3>
            <p className="text-[#5f6470] text-sm mb-4">For media interviews, press releases, or company information, contact us directly.</p>
            <a href="mailto:info@maxvoltenergy.com" className="text-[#D97706] font-semibold text-sm hover:underline">info@maxvoltenergy.com</a>
          </div>
        </div>
      </section>
    </>
  );
}
