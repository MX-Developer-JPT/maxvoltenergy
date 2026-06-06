import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { ArrowLeft, MessageCircle, CheckCircle2, ShieldCheck } from "lucide-react";
import { SKUS, getCategory, getSku, skusByCategory } from "@/lib/shop";
import { SITE_CONFIG } from "@/lib/constants";

export function generateStaticParams() {
  return SKUS.map((s) => ({ category: s.category, slug: s.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ category: string; slug: string }> }): Promise<Metadata> {
  const { category, slug } = await params;
  const sku = getSku(category, slug);
  const c = getCategory(category);
  if (!sku || !c) return { title: "Product | Maxvolt Energy" };
  return {
    title: `${sku.name} | Maxvolt Energy`,
    description: `${sku.name} — ${sku.voltage} ${sku.capacity} ${c.chemistry} lithium battery by Maxvolt Energy. AIS 156 certified, smart BMS protected. ${c.application}.`,
    keywords: [sku.name, `${sku.voltage} ${sku.capacity} battery`, c.name, c.chemistry, "Maxvolt Energy"],
  };
}

const FEATURES = [
  "Smart BMS protection (overcharge, over-discharge, short circuit)",
  "Long cycle life with stable thermal performance",
  "Lightweight, maintenance-free lithium design",
  "Fast charging support",
];

export default async function SkuPage({ params }: { params: Promise<{ category: string; slug: string }> }) {
  const { category, slug } = await params;
  const sku = getSku(category, slug);
  const c = getCategory(category);
  if (!sku || !c) notFound();
  const related = skusByCategory(category).filter((s) => s.slug !== slug).slice(0, 3);

  const ld = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: sku.name,
    brand: { "@type": "Brand", name: "Maxvolt Energy" },
    category: c.name,
    description: `${sku.name} — ${sku.voltage} ${sku.capacity} ${c.chemistry} lithium battery by Maxvolt Energy.`,
    image: c.image,
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }} />
      <section className="relative pt-32 pb-16 bg-white overflow-hidden">
        <div className="absolute inset-0 grid-pattern opacity-25" />
        <div className="container-custom relative z-10">
          <Link href={`/shop/${c.key}`} className="inline-flex items-center gap-2 text-[#71717a] hover:text-[#15171c] text-sm mb-8 transition-colors">
            <ArrowLeft size={14} /> {c.name}
          </Link>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="relative h-80 rounded-3xl bg-[#f7f7f5] flex items-center justify-center"
              style={{ background: `radial-gradient(circle at 50% 40%, ${c.color}12 0%, transparent 70%)` }}>
              <div className="relative w-60 h-60">
                <Image src={c.image} alt={sku.name} fill className="object-contain drop-shadow-2xl" sizes="320px" priority />
              </div>
            </div>

            <div>
              <span className="inline-block text-[10px] font-semibold tracking-[0.2em] uppercase px-3 py-1.5 rounded-full border mb-5"
                style={{ color: c.color, borderColor: `${c.color}30`, backgroundColor: `${c.color}08` }}>
                {c.name}
              </span>
              <h1 className="text-3xl md:text-4xl font-black text-[#15171c] leading-tight mb-4">{sku.name}</h1>

              <div className="grid grid-cols-3 gap-3 mb-6">
                <Spec label="Voltage" value={sku.voltage} />
                <Spec label="Capacity" value={sku.capacity} />
                <Spec label="Chemistry" value={c.chemistry} />
                {sku.weight && <Spec label="Weight" value={sku.weight} />}
                <Spec label="Application" value={c.application} />
                <Spec label="Certification" value="AIS 156" />
              </div>

              <div className="space-y-2 mb-7">
                {FEATURES.map((f) => (
                  <div key={f} className="flex items-start gap-2 text-[#52525b] text-sm">
                    <CheckCircle2 size={15} style={{ color: c.color }} className="shrink-0 mt-0.5" /> {f}
                  </div>
                ))}
              </div>

              <div className="flex flex-wrap gap-3">
                <a
                  href={`https://wa.me/${SITE_CONFIG.whatsapp.replace("+", "")}?text=Hi, I'm interested in the ${sku.name}.`}
                  target="_blank" rel="noopener noreferrer"
                  className="flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-sm active:scale-95 transition-transform"
                  style={{ backgroundColor: c.color, color: "#000" }}
                >
                  <MessageCircle size={15} /> Enquire Now
                </a>
                <Link href="/contact-us" className="flex items-center gap-2 px-6 py-3 rounded-xl border border-black/10 text-[#3f3f46] hover:text-[#15171c] hover:border-[#FFD100]/40 text-sm font-medium transition-all">
                  Request a Quote
                </Link>
              </div>

              <div className="flex items-center gap-2 mt-6 text-[#71717a] text-xs">
                <ShieldCheck size={14} className="text-[#D97706]" /> AIS 156 certified · Smart BMS · Manufacturer warranty
              </div>
            </div>
          </div>
        </div>
      </section>

      {related.length > 0 && (
        <section className="section-padding bg-[#f7f7f5]">
          <div className="container-custom">
            <h2 className="text-2xl font-black text-[#15171c] mb-6">More {c.name} models</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
              {related.map((s) => (
                <Link key={s.slug} href={`/shop/${c.key}/${s.slug}`} className="group rounded-2xl bg-white border border-black/6 p-5 hover:-translate-y-1 hover:border-[#FFD100]/30 transition-all">
                  <div className="relative h-28 mb-3">
                    <Image src={c.image} alt={s.name} fill className="object-contain" sizes="200px" />
                  </div>
                  <h3 className="text-[#15171c] font-bold text-sm group-hover:text-[#D97706] transition-colors">{s.name}</h3>
                  <div className="text-[#71717a] text-xs mt-1">{s.voltage} · {s.capacity}</div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}

function Spec({ label, value }: { label: string; value: string }) {
  return (
    <div className="p-3 rounded-xl bg-black/[0.03] border border-black/6">
      <div className="text-[#8a8a93] text-[10px] uppercase tracking-wide">{label}</div>
      <div className="text-[#15171c] font-bold text-sm">{value}</div>
    </div>
  );
}
