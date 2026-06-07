import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import PageHero from "@/components/ui/PageHero";
import { ArrowRight } from "lucide-react";
import { SHOP_CATEGORIES, skusByCategory } from "@/lib/shop";

export const metadata: Metadata = {
  title: "Shop Lithium Batteries",
  description:
    "Browse Maxvolt's full lithium battery catalogue — e-scooter, e-rickshaw, inverter, solar storage and medical device batteries across every voltage and capacity.",
  keywords: [
    "buy lithium battery", "e-scooter battery price", "e-rickshaw battery",
    "inverter lithium battery", "solar battery storage", "medical device battery",
  ],
};

export default function ShopPage() {
  return (
    <>
      <PageHero
        badge="E-Shop"
        title={<>Shop the Full <span className="gradient-text">Maxvolt Range</span></>}
        description="Explore every Maxvolt lithium battery by category — from two-wheelers and e-rickshaws to inverters, solar storage and medical devices."
        image="/images/category/products-ygb.webp"
      />
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {SHOP_CATEGORIES.map((c) => (
              <Link
                key={c.key}
                href={`/shop/${c.key}`}
                className="group rounded-2xl frosted-card border border-black/6 overflow-hidden hover:-translate-y-1 hover:border-[#FFD100]/30 transition-all"
              >
                <div className="relative h-44 bg-[#f7f7f5]">
                  <Image src={c.image} alt={c.name} fill className="object-contain p-6" sizes="400px" />
                  <span className="absolute top-4 left-4 text-[10px] font-bold uppercase tracking-wide px-2.5 py-1 rounded-full" style={{ backgroundColor: `${c.color}18`, border: `1px solid ${c.color}40`, color: c.color }}>
                    {skusByCategory(c.key).length} models
                  </span>
                </div>
                <div className="p-6">
                  <h2 className="text-[#15171c] font-bold text-lg mb-1">{c.name}</h2>
                  <div className="text-[#D97706] text-xs font-semibold mb-2">{c.chemistry} · {c.application}</div>
                  <p className="text-[#5f6470] text-sm leading-relaxed mb-4 line-clamp-2">{c.blurb}</p>
                  <span className="inline-flex items-center gap-1.5 text-[#15171c] font-semibold text-sm group-hover:text-[#D97706] transition-colors">
                    Browse {c.name} <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
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
