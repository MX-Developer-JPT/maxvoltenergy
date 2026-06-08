import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, CheckCircle2, Zap, Sun, Lightbulb, Cpu, Phone, MessageCircle,
  Bike, Truck, Battery, BatteryCharging, Cctv, Router, Smartphone, HeartPulse, Wrench, Home, Building2, Boxes, type LucideIcon } from "lucide-react";
import PageHero from "@/components/ui/PageHero";
import FaqAccordion from "@/components/ui/FaqAccordion";
import Reveal, { RevealStagger, RevealItem } from "@/components/ui/Reveal";
import { SOLUTIONS, getSolution } from "@/lib/solutions";
import { SITE_CONFIG } from "@/lib/constants";

const ICONS = { Zap, Sun, Lightbulb, Cpu };

// Pick a representative icon for an application label by keyword.
function appIcon(label: string): LucideIcon {
  const l = label.toLowerCase();
  if (/scooter|bike|two-?wheeler/.test(l)) return Bike;
  if (/rickshaw|auto|cargo|three-?wheeler/.test(l)) return Truck;
  if (/cycle/.test(l)) return Bike;
  if (/solar|rooftop|off-?grid/.test(l)) return Sun;
  if (/inverter|home|backup|commercial/.test(l)) return Home;
  if (/grid|utility|industrial/.test(l)) return Building2;
  if (/lantern|light|lamp|street|outdoor|emergency/.test(l)) return Lightbulb;
  if (/cctv|surveillance|camera/.test(l)) return Cctv;
  if (/router|iot|smart-?home|smart home/.test(l)) return Router;
  if (/power bank|wearable|device|gadget|electronic/.test(l)) return Smartphone;
  if (/medical|ecg|bp|ultrasound|health/.test(l)) return HeartPulse;
  if (/tool|power tool|drill/.test(l)) return Wrench;
  if (/storage|portable power|power unit/.test(l)) return BatteryCharging;
  if (/oem|custom|pack/.test(l)) return Boxes;
  return Battery;
}

export function generateStaticParams() {
  return SOLUTIONS.map((s) => ({ solution: s.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ solution: string }> }): Promise<Metadata> {
  const { solution } = await params;
  const s = getSolution(solution);
  if (!s) return { title: "Solutions" };
  return {
    title: `${s.title} Battery Solutions`,
    description: s.description,
    keywords: [s.title, ...s.applications, "Maxvolt Energy lithium battery"],
    alternates: { canonical: `/solutions/${s.slug}` },
  };
}

export default async function SolutionPage({ params }: { params: Promise<{ solution: string }> }) {
  const { solution } = await params;
  const s = getSolution(solution);
  if (!s) notFound();
  const Icon = ICONS[s.icon];

  const faqLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: s.faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />

      <PageHero badge="Solutions" title={<>{s.title} <span className="gradient-text">Solutions</span></>} description={s.description}>
        <Link href="/solutions" className="inline-flex items-center gap-2 text-[#71717a] hover:text-[#15171c] text-sm transition-colors">
          <ArrowLeft size={13} /> All Solutions
        </Link>
      </PageHero>

      {/* Overview + image */}
      <section className="section-padding bg-white">
        <div className="container-custom grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <div className="w-14 h-14 rounded-2xl flex items-center justify-center mb-6" style={{ backgroundColor: `${s.color}12`, border: `1px solid ${s.color}25` }}>
              <Icon size={24} style={{ color: s.color }} />
            </div>
            {s.intro.map((p, i) => (
              <p key={i} className="text-[#52525b] text-base leading-relaxed mb-4">{p}</p>
            ))}

            <h3 className="text-[#15171c] font-bold text-sm mb-3 mt-6">Key Benefits</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-6">
              {s.benefits.map((b) => (
                <div key={b} className="flex items-center gap-2 text-[#52525b] text-sm">
                  <CheckCircle2 size={15} style={{ color: s.color }} className="shrink-0" /> {b}
                </div>
              ))}
            </div>

            <div className="flex flex-wrap gap-2 mb-8">
              {s.products.map((p) => (
                <span key={p} className="px-3 py-1 rounded-lg text-xs border" style={{ color: s.color, borderColor: `${s.color}25`, backgroundColor: `${s.color}08` }}>{p}</span>
              ))}
            </div>

            <div className="flex flex-wrap gap-3">
              <Link href="/shop" className="group flex items-center gap-2 px-6 py-3 rounded-xl bg-[#FFD100] text-black font-bold text-sm hover:bg-[#FFA800] transition-all">
                Shop Batteries <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link href="/contact-us" className="flex items-center gap-2 px-6 py-3 rounded-xl border border-black/10 text-[#3f3f46] hover:text-[#15171c] hover:border-[#FFD100]/40 text-sm font-medium transition-all">
                Enquire
              </Link>
            </div>
          </div>

          <div className="img-zoom relative h-80 rounded-3xl overflow-hidden border border-black/6" style={{ background: `radial-gradient(circle at 50% 40%, ${s.color}12 0%, transparent 70%)` }}>
            <Image src={s.image} alt={s.title} fill className="object-cover" sizes="(max-width:1024px) 100vw, 600px" />
          </div>
        </div>
      </section>

      {/* Powered-by-Maxvolt hardware showcase */}
      {s.showcase && (() => {
        const ShowIcon = s.showcase.icon === "Sun" ? Sun : s.showcase.icon === "Battery" ? Battery : Lightbulb;
        return (
          <section className="section-padding bg-[#0b0b0d] text-white pt-0">
            <div className="container-custom grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
              <Reveal direction="right">
                <div className="img-zoom relative h-72 md:h-96 rounded-3xl overflow-hidden border border-white/10 flex items-center justify-center"
                  style={{ background: `radial-gradient(circle at 50% 45%, ${s.color}26 0%, transparent 70%)` }}>
                  {/* glow */}
                  <div className="absolute w-56 h-56 rounded-full blur-[80px]" style={{ backgroundColor: `${s.color}40` }} />
                  <Image
                    src={s.showcase.image}
                    alt={s.showcase.title}
                    fill
                    className={s.showcase.fit === "cover" ? "object-cover" : "object-contain p-8 relative z-10"}
                    sizes="(max-width:1024px) 100vw, 600px"
                  />
                  <div className="absolute top-4 left-4 z-20 w-11 h-11 rounded-2xl flex items-center justify-center" style={{ backgroundColor: `${s.color}22`, border: `1px solid ${s.color}55` }}>
                    <ShowIcon size={20} style={{ color: s.color }} />
                  </div>
                </div>
              </Reveal>
              <Reveal direction="left">
                <span className="text-[11px] font-bold tracking-[0.22em] uppercase mb-3 block" style={{ color: s.color }}>Powered by Maxvolt</span>
                <h2 className="text-2xl md:text-3xl font-black mb-4">{s.showcase.title}</h2>
                <p className="text-white/65 text-base leading-relaxed mb-6">{s.showcase.caption}</p>
                <Link href="/shop" className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#FFD100] text-black font-bold text-sm hover:bg-[#FFA800] transition-all">
                  Explore the Range <ArrowRight size={14} />
                </Link>
              </Reveal>
            </div>
          </section>
        );
      })()}

      {/* Contextual sections */}
      <section className="section-padding bg-[#f7f7f5] pt-0">
        <div className="container-custom max-w-4xl">
          {s.sections.map((sec) => (
            <Reveal key={sec.heading} className="mb-10 last:mb-0">
              <h2 className="text-2xl md:text-3xl font-black text-[#15171c] mb-4">{sec.heading}</h2>
              {sec.body.map((p, i) => (
                <p key={i} className="text-[#52525b] text-base leading-relaxed mb-3">{p}</p>
              ))}
            </Reveal>
          ))}
        </div>
      </section>

      {/* Types */}
      <section className="section-padding bg-white pt-0">
        <div className="container-custom">
          <h2 className="text-2xl md:text-3xl font-black text-[#15171c] mb-8">{s.typesHeading}</h2>
          <RevealStagger className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {s.types.map((t, i) => (
              <RevealItem key={t.name} className="card-rise p-6 rounded-2xl frosted-card border border-black/6">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center text-xs font-black" style={{ backgroundColor: `${s.color}14`, color: s.color }}>{String(i + 1).padStart(2, "0")}</div>
                  <h3 className="text-[#15171c] font-bold text-base">{t.name}</h3>
                </div>
                <p className="text-[#5f6470] text-sm leading-relaxed">{t.desc}</p>
              </RevealItem>
            ))}
          </RevealStagger>
        </div>
      </section>

      {/* Future */}
      <section className="section-padding bg-[#f7f7f5] pt-0">
        <Reveal className="container-custom max-w-4xl">
          <h2 className="text-2xl md:text-3xl font-black text-[#15171c] mb-4">{s.future.heading}</h2>
          {s.future.body.map((p, i) => (
            <p key={i} className="text-[#52525b] text-base leading-relaxed mb-3">{p}</p>
          ))}
        </Reveal>
      </section>

      {/* Applications */}
      <section className="section-padding bg-white pt-0">
        <div className="container-custom">
          <Reveal>
            <h2 className="text-2xl md:text-3xl font-black text-[#15171c] mb-2">Applications We Power</h2>
            <p className="text-[#52525b] text-sm mb-8 max-w-2xl">Real-world use cases where {s.title.toLowerCase()} solutions from Maxvolt deliver reliable, certified power.</p>
          </Reveal>
          <RevealStagger className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {s.applications.map((a) => {
              const Icon = appIcon(a);
              return (
                <RevealItem key={a} className="card-rise group p-6 rounded-2xl bg-[#f7f7f5] border border-black/6 hover:border-[#FFD100]/30 flex flex-col items-start gap-4">
                  <div className="w-12 h-12 rounded-2xl flex items-center justify-center transition-transform group-hover:scale-110" style={{ backgroundColor: `${s.color}14`, border: `1px solid ${s.color}30` }}>
                    <Icon size={22} style={{ color: s.color }} />
                  </div>
                  <span className="text-[#15171c] font-bold text-sm leading-snug">{a}</span>
                </RevealItem>
              );
            })}
          </RevealStagger>
        </div>
      </section>

      {/* Dealer + contact CTA */}
      <section className="py-16 bg-[#0b0b0d] text-white">
        <div className="container-custom grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <div>
            <h2 className="text-2xl md:text-3xl font-black mb-3">{s.dealerHeading}</h2>
            <p className="text-white/60 text-sm leading-relaxed mb-5">
              Join Maxvolt&apos;s growing network of dealers and partners. Get full product training, marketing assistance and after-sales support — and build a profitable business in India&apos;s fast-growing clean-energy sector.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link href="/become-a-dealer" className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#FFD100] text-black font-bold text-sm hover:bg-[#FFA800] transition-all">
                Become a Dealer <ArrowRight size={14} />
              </Link>
              <Link href="/contact-us" className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-white/15 text-white/80 hover:border-[#FFD100]/40 text-sm font-medium transition-all">
                Contact Us
              </Link>
            </div>
          </div>
          <div className="lg:justify-self-end w-full lg:w-auto">
            <div className="p-6 rounded-2xl bg-white/[0.04] border border-white/10">
              <h3 className="font-bold text-lg mb-3">Contact Us for Price &amp; Service</h3>
              <a href={`tel:${SITE_CONFIG.phone}`} className="flex items-center gap-3 mb-3 text-white/80 hover:text-white transition-colors">
                <Phone size={16} className="text-[#FFD100]" /> {SITE_CONFIG.phone}
              </a>
              <a href={`https://wa.me/${SITE_CONFIG.whatsapp.replace("+", "")}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-white/80 hover:text-white transition-colors">
                <MessageCircle size={16} className="text-[#FFD100]" /> WhatsApp: {SITE_CONFIG.whatsapp}
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="section-padding bg-white">
        <div className="container-custom max-w-3xl">
          <h2 className="text-2xl md:text-3xl font-black text-[#15171c] mb-8 text-center">{s.title} <span className="gradient-text">FAQ</span></h2>
          <FaqAccordion items={s.faqs} />
        </div>
      </section>
    </>
  );
}
