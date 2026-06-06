import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, Calendar, Tag, ExternalLink } from "lucide-react";
import { PRESS_RELEASES, pressBySlug, pressSorted } from "@/lib/press";
import { SITE_CONFIG } from "@/lib/constants";

export function generateStaticParams() {
  return PRESS_RELEASES.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const pr = pressBySlug(slug);
  if (!pr) return { title: "Press Release Not Found | Maxvolt Energy" };
  return {
    title: `${pr.title} | Maxvolt Energy Newsroom`,
    description: pr.excerpt,
    keywords: ["Maxvolt Energy", "press release", pr.category, "lithium battery India"],
    alternates: { canonical: `/press-release/${pr.slug}` },
    openGraph: {
      title: pr.title,
      description: pr.excerpt,
      type: "article",
      publishedTime: pr.date,
      images: [pr.image],
    },
  };
}

export default async function PressReleaseDetail({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const pr = pressBySlug(slug);
  if (!pr) notFound();

  const related = pressSorted()
    .filter((p) => p.slug !== pr.slug && p.category === pr.category)
    .slice(0, 3);
  const fallbackRelated = pressSorted().filter((p) => p.slug !== pr.slug).slice(0, 3);
  const relatedItems = related.length ? related : fallbackRelated;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    headline: pr.title,
    image: [`${SITE_CONFIG.url}${pr.image}`],
    datePublished: pr.date,
    dateModified: pr.date,
    articleSection: pr.category,
    description: pr.excerpt,
    author: { "@type": "Organization", name: "Maxvolt Energy Industries Limited" },
    publisher: {
      "@type": "Organization",
      name: "Maxvolt Energy Industries Limited",
      logo: { "@type": "ImageObject", url: `${SITE_CONFIG.url}/images/logo.webp` },
    },
    mainEntityOfPage: { "@type": "WebPage", "@id": `${SITE_CONFIG.url}/press-release/${pr.slug}` },
  };

  const fmt = new Date(pr.date).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" });

  return (
    <article className="bg-white">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      {/* Hero */}
      <div className="relative pt-32 pb-12 overflow-hidden">
        <div className="absolute inset-0 grid-pattern opacity-20" />
        <div className="container-custom relative z-10 max-w-3xl">
          <Link href="/press-release" className="inline-flex items-center gap-2 text-[#71717a] hover:text-[#15171c] text-sm mb-6 transition-colors">
            <ArrowLeft size={14} /> All Press Releases
          </Link>
          <span className="inline-block text-[10px] font-bold tracking-[0.2em] uppercase px-3 py-1.5 rounded-full border border-[#D97706]/30 text-[#D97706] bg-[#FFD100]/10 mb-5">
            {pr.category}
          </span>
          <h1 className="text-3xl md:text-5xl font-black text-[#15171c] leading-tight tracking-tight mb-5">{pr.title}</h1>
          <div className="flex flex-wrap items-center gap-5 text-[#71717a] text-sm">
            <span className="flex items-center gap-1.5"><Calendar size={13} /> {fmt}</span>
            <span className="flex items-center gap-1.5"><Tag size={13} /> {pr.category}</span>
            <span className="text-[#a1a1aa]">Maxvolt Energy Industries Limited</span>
          </div>
        </div>
      </div>

      {/* Cover */}
      <div className="container-custom max-w-4xl mb-10">
        <div className="relative w-full h-64 md:h-96 rounded-2xl overflow-hidden border border-black/6">
          <Image src={pr.image} alt={pr.title} fill className="object-cover" sizes="100vw" priority />
        </div>
      </div>

      {/* Body */}
      <div className="container-custom max-w-3xl pb-20">
        <p className="text-[#3f3f46] text-lg leading-relaxed font-medium border-l-4 border-[#FFD100] pl-5 mb-8">
          {pr.excerpt}
        </p>
        <div className="space-y-5">
          {pr.body.map((para, i) => (
            <p key={i} className="text-[#52525b] text-base leading-relaxed">{para}</p>
          ))}
        </div>

        {pr.source && (
          <div className="mt-8 p-4 rounded-xl bg-[#f7f7f5] border border-black/6 text-sm text-[#52525b]">
            Source / coverage:{" "}
            <a href={pr.source.url} target="_blank" rel="noopener noreferrer" className="text-[#D97706] font-semibold inline-flex items-center gap-1 hover:underline">
              {pr.source.label} <ExternalLink size={12} />
            </a>
          </div>
        )}

        <div className="mt-12 pt-8 border-t border-black/6 flex items-center justify-between">
          <Link href="/press-release" className="inline-flex items-center gap-2 text-[#D97706] font-bold text-sm hover:gap-3 transition-all">
            <ArrowLeft size={14} /> All Press Releases
          </Link>
          <Link href="/contact-us" className="px-5 py-2.5 rounded-xl bg-[#FFD100] text-black font-bold text-sm hover:bg-[#FFA800] transition-all">
            Media Inquiry
          </Link>
        </div>
      </div>

      {/* Related */}
      {relatedItems.length > 0 && (
        <section className="section-padding bg-[#f7f7f5] pt-14">
          <div className="container-custom">
            <h2 className="text-2xl font-black text-[#15171c] mb-6">Related Updates</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {relatedItems.map((p) => (
                <Link key={p.slug} href={`/press-release/${p.slug}`} className="group block rounded-2xl bg-white border border-black/6 hover:border-[#FFD100]/20 hover:-translate-y-1 transition-all overflow-hidden">
                  <div className="relative h-36 overflow-hidden">
                    <Image src={p.image} alt={p.title} fill className="object-cover group-hover:scale-105 transition-transform duration-500" sizes="360px" />
                  </div>
                  <div className="p-5">
                    <span className="text-[#8a8a93] text-[11px]">{new Date(p.date).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}</span>
                    <h3 className="text-[#15171c] font-bold text-sm leading-tight mt-2 mb-2 group-hover:text-[#D97706] transition-colors line-clamp-3">{p.title}</h3>
                    <span className="inline-flex items-center gap-1 text-[#D97706] text-xs font-semibold">Read <ArrowRight size={12} /></span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </article>
  );
}
