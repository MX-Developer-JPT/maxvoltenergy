import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import PageHero from "@/components/ui/PageHero";
import { ArrowRight } from "lucide-react";
import { readPublished } from "@/lib/blog-store.server";
import { SEED_POSTS } from "@/lib/blog-seed";

export const metadata: Metadata = {
  title: "Blog | Maxvolt Energy",
  description: "Latest news, insights, and updates from Maxvolt Energy on EV batteries, solar storage, recycling, and India's electric future.",
};

export const dynamic = "force-dynamic";

function readTime(content: string) {
  const words = (content || "").trim().split(/\s+/).filter(Boolean).length;
  return `${Math.max(1, Math.round(words / 200))} min read`;
}

export default function BlogPage() {
  // Merge admin-published posts with curated seed articles (dedupe by slug).
  const published = readPublished();
  const seen = new Set(published.map((p) => p.slug));
  const posts = [...published, ...SEED_POSTS.filter((p) => !seen.has(p.slug))]
    .sort((a, b) => b.createdAt - a.createdAt);
  const featured = posts[0];
  const rest = posts.slice(1);

  return (
    <>
      <PageHero
        badge="Our Blog"
        title={<>Latest <span className="gradient-text">News & Insights</span></>}
        description="Stay updated on EV industry trends, battery technology innovations, and Maxvolt Energy's latest developments."
      />

      <section className="section-padding bg-white">
        <div className="container-custom">
          {(
            <>
              {/* Featured */}
              {featured && (
                <Link href={`/blog/${featured.slug}`} className="block mb-8 group">
                  <div className="rounded-2xl overflow-hidden border border-[#FFD100]/15 bg-gradient-to-br from-[#FFD100]/8 to-transparent hover:border-[#FFD100]/30 transition-all md:flex">
                    {featured.coverImage && (
                      <div className="relative md:w-1/2 h-56 md:h-auto">
                        <Image src={featured.coverImage} alt={featured.title} fill className="object-cover" sizes="600px" />
                      </div>
                    )}
                    <div className="p-8 md:w-1/2">
                      <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-[#D97706] mb-3 block">Featured · {featured.category}</span>
                      <h2 className="text-2xl md:text-3xl font-black text-[#15171c] mb-3 leading-tight group-hover:text-[#D97706] transition-colors">{featured.title}</h2>
                      <p className="text-[#52525b] text-sm leading-relaxed mb-5">{featured.excerpt}</p>
                      <div className="flex items-center gap-4 text-[#71717a] text-xs">
                        <span>{new Date(featured.createdAt).toLocaleDateString()}</span>
                        <span>{readTime(featured.content)}</span>
                        <span className="ml-auto flex items-center gap-1 text-[#D97706] font-semibold text-sm">Read More <ArrowRight size={13} /></span>
                      </div>
                    </div>
                  </div>
                </Link>
              )}

              {/* Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {rest.map((p) => (
                  <Link key={p.id} href={`/blog/${p.slug}`} className="group block p-6 rounded-2xl frosted-card border border-black/6 hover:border-[#FFD100]/20 hover:-translate-y-1 transition-all">
                    {p.coverImage && (
                      <div className="relative h-40 -mx-6 -mt-6 mb-4 rounded-t-2xl overflow-hidden">
                        <Image src={p.coverImage} alt={p.title} fill className="object-cover" sizes="400px" />
                      </div>
                    )}
                    <span className="text-[10px] font-bold tracking-[0.15em] uppercase px-2.5 py-1 rounded-full border border-[#D97706]/30 text-[#D97706] bg-[#FFD100]/8">{p.category}</span>
                    <h3 className="text-[#15171c] font-bold text-base leading-tight mt-4 mb-3 group-hover:text-[#D97706] transition-colors">{p.title}</h3>
                    <p className="text-[#5f6470] text-sm leading-relaxed mb-5 line-clamp-3">{p.excerpt}</p>
                    <div className="flex items-center justify-between text-[#8a8a93] text-xs">
                      <span>{new Date(p.createdAt).toLocaleDateString()}</span>
                      <span>{readTime(p.content)}</span>
                    </div>
                  </Link>
                ))}
              </div>
            </>
          )}
        </div>
      </section>
    </>
  );
}
