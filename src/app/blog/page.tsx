import type { Metadata } from "next";
import PageHero from "@/components/ui/PageHero";
import { Newspaper, ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Blog | MaxVolt Energy",
  description: "Latest news, insights, and updates from MaxVolt Energy on EV batteries, solar storage, and India's electric future.",
};

const BLOG_POSTS = [
  {
    title: "Rising Fuel Prices Are Accelerating India's EV Transition",
    excerpt: "With West Asia tensions driving petroleum prices higher, India's electric vehicle adoption is accelerating faster than projected. Here's how MaxVolt is positioned to lead the charge.",
    category: "EV Industry",
    date: "June 2025",
    readTime: "5 min read",
    color: "#FFD100",
  },
  {
    title: "AIS 156: What India's Battery Safety Standard Means for EV Buyers",
    excerpt: "The AIS 156 certification is India's most rigorous battery safety standard. We break down what it means, what tests batteries must pass, and why it matters for you.",
    category: "Safety & Compliance",
    date: "May 2025",
    readTime: "7 min read",
    color: "#FFA800",
  },
  {
    title: "Graphene Batteries: The Technology Powering MaxVolt's Eco-Series",
    excerpt: "Graphene-enhanced anodes charge 50% faster than conventional lithium. We explain the science behind MaxVolt's latest Eco-Series battery lineup.",
    category: "Technology",
    date: "April 2025",
    readTime: "6 min read",
    color: "#FF8C00",
  },
  {
    title: "E-Rickshaw Battery Guide: How to Choose the Right Lithium Battery",
    excerpt: "Switching from lead-acid to lithium for your e-rickshaw? This comprehensive guide covers voltage, capacity, BMS requirements, and total cost of ownership.",
    category: "Product Guide",
    date: "March 2025",
    readTime: "8 min read",
    color: "#7c3aed",
  },
  {
    title: "Solar Battery Storage: Maximizing Your Solar System ROI",
    excerpt: "A lithium solar battery dramatically increases the return on your solar investment. Learn about cycle life, depth of discharge, and how to size the right system.",
    category: "Solar Energy",
    date: "February 2025",
    readTime: "6 min read",
    color: "#f97316",
  },
  {
    title: "MaxVolt ReEarth: Building a Circular Economy for EV Batteries",
    excerpt: "India generates thousands of used EV batteries annually. MaxVolt ReEarth is pioneering lithium battery recycling technology to close the loop on sustainable mobility.",
    category: "Sustainability",
    date: "January 2025",
    readTime: "5 min read",
    color: "#ec4899",
  },
];

export default function BlogPage() {
  return (
    <>
      <PageHero
        badge="Our Blog"
        title={<>Latest <span className="gradient-text">News & Insights</span></>}
        description="Stay updated on EV industry trends, battery technology innovations, and MaxVolt Energy's latest developments."
      />

      <section className="section-padding bg-white">
        <div className="container-custom">
          {/* Featured post */}
          <div className="mb-8 p-8 md:p-10 rounded-2xl bg-gradient-to-br from-[#FFD100]/8 to-transparent border border-[#FFD100]/10 group hover:border-[#FFD100]/20 transition-all cursor-pointer">
            <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-[#D97706] mb-3 block">Featured</span>
            <h2 className="text-2xl md:text-3xl font-bold text-[#15171c] mb-3 leading-tight">{BLOG_POSTS[0].title}</h2>
            <p className="text-[#52525b] text-sm leading-relaxed mb-5">{BLOG_POSTS[0].excerpt}</p>
            <div className="flex items-center gap-4 text-[#71717a] text-xs">
              <span>{BLOG_POSTS[0].date}</span>
              <span>{BLOG_POSTS[0].readTime}</span>
              <span className="ml-auto flex items-center gap-1 text-[#D97706] font-semibold text-sm">Read More <ArrowRight size={13} /></span>
            </div>
          </div>

          {/* Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {BLOG_POSTS.slice(1).map(({ title, excerpt, category, date, readTime, color }) => (
              <div key={title} className="group p-6 rounded-2xl frosted-card border border-black/6 hover:border-black/8 transition-all hover:-translate-y-1 cursor-pointer">
                <div className="mb-4 flex items-center justify-between">
                  <span className="text-[10px] font-bold tracking-[0.15em] uppercase px-2.5 py-1 rounded-full border" style={{ color, borderColor: `${color}30`, backgroundColor: `${color}08` }}>
                    {category}
                  </span>
                  <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: color }} />
                </div>
                <h3 className="text-[#15171c] font-bold text-base leading-tight mb-3">{title}</h3>
                <p className="text-[#5f6470] text-sm leading-relaxed mb-5 line-clamp-3">{excerpt}</p>
                <div className="flex items-center justify-between text-[#8a8a93] text-xs">
                  <span>{date}</span>
                  <span>{readTime}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
