import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, MessageCircle, CheckCircle2, ShieldCheck, Factory, Truck, Headphones, BadgeCheck, Phone } from "lucide-react";
import { SKUS, getCategory, getSku, skusByCategory, skuImage, type Sku, type ShopCategory } from "@/lib/shop";
import { SITE_CONFIG } from "@/lib/constants";
import FaqAccordion from "@/components/ui/FaqAccordion";
import Reveal, { RevealStagger, RevealItem } from "@/components/ui/Reveal";

function skuFaqs(sku: Sku, c: ShopCategory) {
  return [
    { q: `What is the ${sku.name} compatible with?`, a: `The ${sku.name} is engineered for ${c.application.toLowerCase()} applications. Its ${sku.voltage} ${sku.capacity} rating suits most compatible platforms — contact our team if you need help confirming fitment for your exact model.` },
    { q: `How long does the ${sku.name} last?`, a: `Built on ${c.chemistry} chemistry with a smart BMS, it delivers a long cycle life with stable performance over many charge cycles when used and charged as recommended.` },
    { q: "Does the battery come with a warranty?", a: "Yes. Every Maxvolt battery ships with a manufacturer's warranty and is backed by nationwide after-sales service and support." },
    { q: "Can this battery handle daily heavy use?", a: `Yes. The ${sku.voltage} ${sku.capacity} pack is designed for dependable daily operation, with strong cell balancing and thermal control for safe, consistent output under Indian conditions.` },
    { q: "Do you offer bulk or dealer pricing?", a: `Yes — we provide special pricing and dedicated support for bulk orders, fleets and dealerships. Call ${SITE_CONFIG.phone} or enquire on WhatsApp for a quote.` },
  ];
}

const WHY_CHOOSE = [
  { Icon: Factory, t: "In-House Manufacturing", d: "Built at our 55,000 sq ft Duhai plant with AIS 156-compliant testing and advanced automation." },
  { Icon: BadgeCheck, t: "Tested Quality", d: "Every pack passes safety tests, capacity checks and performance validation before dispatch." },
  { Icon: Truck, t: "Pan-India Supply", d: "Delivered to dealers, distributors, service centers and fleets across 1,100+ pincodes." },
  { Icon: Headphones, t: "Dedicated Support", d: "Manufacturer warranty plus responsive after-sales and dealership support nationwide." },
];

export function generateStaticParams() {
  return SKUS.map((s) => ({ category: s.category, slug: s.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ category: string; slug: string }> }): Promise<Metadata> {
  const { category, slug } = await params;
  const sku = getSku(category, slug);
  const c = getCategory(category);
  if (!sku || !c) return { title: "Product" };
  return {
    title: `${sku.name}`,
    description: `${sku.name} — ${sku.voltage} ${sku.capacity} ${c.chemistry} lithium battery by Maxvolt Energy. AIS 156 certified, smart BMS protected. ${c.application}.`,
    keywords: [sku.name, `${sku.voltage} ${sku.capacity} battery`, c.name, c.chemistry, "Maxvolt Energy"],
    alternates: { canonical: `/shop/${category}/${slug}` },
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
  const faqs = skuFaqs(sku, c);

  const ld = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: sku.name,
    brand: { "@type": "Brand", name: "Maxvolt Energy" },
    category: c.name,
    description: `${sku.name} — ${sku.voltage} ${sku.capacity} ${c.chemistry} lithium battery by Maxvolt Energy.`,
    image: skuImage(sku),
  };

  const faqLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />
      <section className="relative pt-32 pb-16 bg-white overflow-hidden">
        <div className="absolute inset-0 grid-pattern opacity-25" />
        <div className="container-custom relative z-10">
          <Link href={`/shop/${c.key}`} className="inline-flex items-center gap-2 text-[#71717a] hover:text-[#15171c] text-sm mb-8 transition-colors">
            <ArrowLeft size={14} /> {c.name}
          </Link>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="img-zoom relative h-80 rounded-3xl bg-[#f7f7f5] flex items-center justify-center"
              style={{ background: `radial-gradient(circle at 50% 40%, ${c.color}12 0%, transparent 70%)` }}>
              <div className="relative w-60 h-60">
                <Image src={skuImage(sku)} alt={sku.name} fill className="object-contain drop-shadow-2xl" sizes="320px" priority />
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

      {/* Overview */}
      <section className="section-padding bg-[#f7f7f5] pt-16">
        <Reveal className="container-custom max-w-4xl">
          <h2 className="text-2xl md:text-3xl font-black text-[#15171c] mb-5">
            {sku.name} — {c.chemistry} Lithium Battery
          </h2>
          <p className="text-[#52525b] text-base leading-relaxed mb-4">
            The {sku.name} delivers reliable power, steady performance and long runtime for {c.application.toLowerCase()} in India.
            Engineered around a {sku.voltage} {sku.capacity} {c.chemistry} pack with an intelligent Battery Management System,
            it offers safe, consistent output for daily riders, fleets and operators who depend on dependable energy.
          </p>
          <p className="text-[#52525b] text-base leading-relaxed">
            As a trusted lithium battery manufacturer, supplier and exporter, Maxvolt Energy supplies the {sku.name} to dealers,
            distributors, service centers and fleets across India — every unit safety-tested, capacity-checked and
            performance-validated, built to withstand Indian road and climate conditions with strong cell balancing and
            reliable thermal control.
          </p>
        </Reveal>
      </section>

      {/* Why choose */}
      <section className="section-padding bg-white pt-0">
        <div className="container-custom">
          <Reveal>
            <h2 className="text-2xl md:text-3xl font-black text-[#15171c] mb-8">
              Why Choose Maxvolt for the {sku.name}
            </h2>
          </Reveal>
          <RevealStagger className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {WHY_CHOOSE.map(({ Icon, t, d }) => (
              <RevealItem key={t} className="card-rise p-6 rounded-2xl frosted-card border border-black/6">
                <div className="w-11 h-11 rounded-xl flex items-center justify-center mb-4" style={{ backgroundColor: `${c.color}14`, border: `1px solid ${c.color}25` }}>
                  <Icon size={20} style={{ color: c.color }} />
                </div>
                <h3 className="text-[#15171c] font-bold text-sm mb-2">{t}</h3>
                <p className="text-[#5f6470] text-xs leading-relaxed">{d}</p>
              </RevealItem>
            ))}
          </RevealStagger>
        </div>
      </section>

      {/* FAQ */}
      <section className="section-padding bg-[#f7f7f5] pt-0">
        <div className="container-custom max-w-3xl">
          <h2 className="text-2xl md:text-3xl font-black text-[#15171c] mb-8 text-center">{sku.name} <span className="gradient-text">FAQ</span></h2>
          <FaqAccordion items={faqs} />
        </div>
      </section>

      {/* Dealer / price CTA */}
      <section className="py-16 bg-[#0b0b0d] section-dark text-white">
        <div className="container-custom flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div>
            <h2 className="text-2xl md:text-3xl font-black mb-2">Contact Us for {sku.name} Price &amp; Customization</h2>
            <p className="text-white/60 text-sm max-w-xl">Get the best price, bulk/dealer quotes and customization options. Become a certified Maxvolt dealer and grow with India&apos;s clean-energy leader.</p>
          </div>
          <div className="flex flex-wrap gap-3 shrink-0">
            <a href={`tel:${SITE_CONFIG.phone}`} className="inline-flex items-center gap-2 px-5 py-3 rounded-xl border border-white/15 text-white/85 hover:border-[#FFD100]/40 text-sm font-medium transition-all">
              <Phone size={15} /> {SITE_CONFIG.phone}
            </a>
            <Link href="/become-a-dealer" className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-[#FFD100] text-black font-bold text-sm hover:bg-[#FFA800] transition-all">
              Become a Dealer <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </section>

      {related.length > 0 && (
        <section className="section-padding bg-[#f7f7f5]">
          <div className="container-custom">
            <h2 className="text-2xl font-black text-[#15171c] mb-6">More {c.name} models</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
              {related.map((s) => (
                <Link key={s.slug} href={`/shop/${c.key}/${s.slug}`} className="group card-rise rounded-2xl bg-white border border-black/6 p-5 hover:border-[#FFD100]/30">
                  <div className="img-zoom relative h-28 mb-3">
                    <Image src={skuImage(s)} alt={s.name} fill className="object-contain" sizes="200px" />
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
