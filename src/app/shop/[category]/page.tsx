import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import PageHero from "@/components/ui/PageHero";
import { ArrowRight, ArrowLeft } from "lucide-react";
import { SHOP_CATEGORIES, getCategory, skusByCategory, skuImage } from "@/lib/shop";
import Breadcrumbs from "@/components/seo/Breadcrumbs";

export function generateStaticParams() {
  return SHOP_CATEGORIES.map((c) => ({ category: c.key }));
}

export async function generateMetadata({ params }: { params: Promise<{ category: string }> }): Promise<Metadata> {
  const { category } = await params;
  const c = getCategory(category);
  if (!c) return { title: "Shop" };
  return {
    title: `${c.name}`,
    description: c.blurb,
    keywords: [c.name, `${c.name} price`, c.chemistry, c.application, "Maxvolt Energy"],
    alternates: { canonical: `/shop/${category}` },
  };
}

export default async function CategoryPage({ params }: { params: Promise<{ category: string }> }) {
  const { category } = await params;
  const c = getCategory(category);
  if (!c) notFound();
  const skus = skusByCategory(category);

  return (
    <>
      <PageHero badge="E-Shop" title={<>{c.name}</>} description={c.blurb} image={c.banner}>
        <Link href="/shop" className="inline-flex items-center gap-2 text-[#71717a] hover:text-[#15171c] text-sm transition-colors">
          <ArrowLeft size={13} /> All Categories
        </Link>
      </PageHero>

      <div className="container-custom pt-5">
        <Breadcrumbs
          items={[
            { name: "Home", href: "/" },
            { name: "Shop", href: "/shop" },
            { name: c.name, href: `/shop/${c.key}` },
          ]}
        />
      </div>

      <section className="section-padding bg-[#f7f7f5] pt-8">
        <div className="container-custom">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {skus.map((s) => (
              <Link
                key={s.slug}
                href={`/shop/${c.key}/${s.slug}`}
                className="group rounded-2xl bg-white border border-black/6 overflow-hidden hover:-translate-y-1 hover:border-[#FFD100]/30 transition-all"
              >
                <div className="relative h-40 bg-[#f7f7f5]">
                  <Image src={skuImage(s)} alt={s.name} fill className="object-contain p-5" sizes="350px" />
                </div>
                <div className="p-5">
                  <h2 className="text-[#15171c] font-bold text-sm mb-2 leading-snug">{s.name}</h2>
                  <div className="flex gap-2 mb-3">
                    <span className="text-[11px] font-bold px-2 py-0.5 rounded bg-[#FFD100]/12 text-[#7a5b00] border border-[#FFD100]/25">{s.voltage}</span>
                    <span className="text-[11px] font-bold px-2 py-0.5 rounded bg-black/[0.04] text-[#52525b] border border-black/8">{s.capacity}</span>
                  </div>
                  <span className="inline-flex items-center gap-1.5 text-[#D97706] font-semibold text-xs">
                    View details <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
