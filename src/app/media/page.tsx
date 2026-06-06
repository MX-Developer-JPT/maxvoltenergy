import type { Metadata } from "next";
import PageHero from "@/components/ui/PageHero";
import { Newspaper, ExternalLink, TrendingUp } from "lucide-react";

export const metadata: Metadata = {
  title: "Media Coverage | Maxvolt Energy",
  description: "Maxvolt Energy in the news – press coverage and citations from leading business and financial news channels covering the NSE SME listing and lithium battery business.",
};

// Real, citable coverage from news channels. Logos pulled from each outlet's domain.
const PRESS_ITEMS = [
  {
    title: "Maxvolt Energy Industries makes muted debut at ₹180 on NSE SME; check details",
    source: "Upstox",
    domain: "upstox.com",
    date: "Feb 19, 2025",
    summary: "Shares of Maxvolt Energy Industries listed flat at ₹180 apiece on the NSE SME platform, in line with the IPO issue price, before touching an intraday high of ₹182.05.",
    url: "https://upstox.com/news/market-news/ipo/maxvolt-energy-industries-makes-muted-debut-at-180-on-nse-sme-check-details/article-146801/",
    color: "#FFD100",
  },
  {
    title: "NSE SME Maxvolt Energy Industries trades flat on debut",
    source: "Business Standard",
    domain: "business-standard.com",
    date: "Feb 19, 2025",
    summary: "Capital market coverage of Maxvolt Energy Industries' NSE SME Emerge listing, with the stock trading flat against its issue price on debut day.",
    url: "https://www.business-standard.com/markets/capital-market-news/nse-sme-maxvolt-energy-industries-trades-flat-on-debut-125021900300_1.html",
    color: "#FFA800",
  },
  {
    title: "Maxvolt Energy Lists Flat at Issue Price on NSE SME, Shows Marginal Gains in Early Trade",
    source: "5paisa",
    domain: "5paisa.com",
    date: "Feb 19, 2025",
    summary: "Maxvolt Energy's ₹54 Cr SME IPO was subscribed over 3x; the company reported ₹40.27 Cr revenue and ₹4.77 Cr net profit for the period ended September 2024.",
    url: "https://www.5paisa.com/news/maxvolt-energy-ipo-listing-today",
    color: "#FF8C00",
  },
  {
    title: "Maxvolt Energy SME IPO — Details, Subscription & Allotment",
    source: "InvestorGain",
    domain: "investorgain.com",
    date: "Feb 2025",
    summary: "Full IPO breakdown: Maxvolt Energy manufactures lithium-ion batteries for e-scooters, e-rickshaws, e-cycles, energy storage systems and electronic gadgets.",
    url: "https://www.investorgain.com/ipo/maxvolt-energy-sme-ipo/1206/",
    color: "#7c3aed",
  },
  {
    title: "Maxvolt Energy NSE SME IPO — GMP, Dates & Review",
    source: "IPOWiz",
    domain: "ipowiz.in",
    date: "Feb 2025",
    summary: "Independent IPO review and subscription tracking for Maxvolt Energy Industries Limited's NSE SME Emerge offering.",
    url: "https://www.ipowiz.in/ipo/maxvolt-energy-sme-ipo",
    color: "#16a34a",
  },
];

export default function MediaPage() {
  return (
    <>
      <PageHero
        badge="Media Coverage"
        title={<>Maxvolt in the <span className="gradient-text">News</span></>}
        description="Press coverage and citations from leading business and financial news channels featuring Maxvolt Energy Industries Limited."
      />

      <section className="section-padding bg-[#f7f7f5]">
        <div className="container-custom">
          <div className="space-y-5">
            {PRESS_ITEMS.map(({ title, source, domain, date, summary, url, color }) => (
              <a
                key={title}
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className="group block p-7 rounded-2xl frosted-card border border-black/6 hover:border-[#FFD100]/30 transition-all"
              >
                <div className="flex items-start gap-5">
                  {/* Publication logo */}
                  <div className="w-12 h-12 rounded-xl bg-white border border-black/8 flex items-center justify-center shrink-0 overflow-hidden">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={`https://logo.clearbit.com/${domain}`}
                      alt={`${source} logo`}
                      width={36}
                      height={36}
                      className="object-contain"
                    />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2 flex-wrap">
                      <span className="flex items-center gap-1.5 text-xs font-bold px-2 py-0.5 rounded" style={{ color, backgroundColor: `${color}12` }}>
                        <Newspaper size={11} /> {source}
                      </span>
                      <span className="text-[#8a8a93] text-xs">{date}</span>
                      <span className="text-[#a1a1aa] text-[11px]">· {domain}</span>
                    </div>
                    <h3 className="text-[#15171c] font-bold text-lg mb-2 leading-tight group-hover:text-[#D97706] transition-colors">{title}</h3>
                    <p className="text-[#5f6470] text-sm leading-relaxed">{summary}</p>
                    <span className="inline-flex items-center gap-1.5 mt-3 text-[#D97706] text-xs font-semibold">
                      Read full article <ExternalLink size={12} />
                    </span>
                  </div>
                </div>
              </a>
            ))}
          </div>

          <p className="text-[#a1a1aa] text-[11px] mt-6 text-center">
            Logos and article titles are property of their respective publications and are shown for citation purposes.
          </p>

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
