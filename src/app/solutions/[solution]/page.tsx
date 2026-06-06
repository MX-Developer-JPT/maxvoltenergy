import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, CheckCircle2, Zap, Sun, Lightbulb, Cpu } from "lucide-react";
import PageHero from "@/components/ui/PageHero";
import { SOLUTIONS, getSolution } from "@/lib/solutions";

const ICONS = { Zap, Sun, Lightbulb, Cpu };

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
  };
}

export default async function SolutionPage({ params }: { params: Promise<{ solution: string }> }) {
  const { solution } = await params;
  const s = getSolution(solution);
  if (!s) notFound();
  const Icon = ICONS[s.icon];

  return (
    <>
      <PageHero badge="Solutions" title={<>{s.title} <span className="gradient-text">Solutions</span></>} description={s.description}>
        <Link href="/solutions" className="inline-flex items-center gap-2 text-[#71717a] hover:text-[#15171c] text-sm transition-colors">
          <ArrowLeft size={13} /> All Solutions
        </Link>
      </PageHero>

      <section className="section-padding bg-white">
        <div className="container-custom grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <div className="w-14 h-14 rounded-2xl flex items-center justify-center mb-6" style={{ backgroundColor: `${s.color}12`, border: `1px solid ${s.color}25` }}>
              <Icon size={24} style={{ color: s.color }} />
            </div>
            <p className="text-[#52525b] text-base leading-relaxed mb-6">{s.longDescription}</p>

            <h3 className="text-[#15171c] font-bold text-sm mb-3">Key Benefits</h3>
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

          <div className="relative h-80 rounded-3xl flex items-center justify-center" style={{ background: `radial-gradient(circle at 50% 40%, ${s.color}12 0%, transparent 70%)` }}>
            <div className="relative w-64 h-64">
              <Image src={s.image} alt={s.title} fill className="object-contain drop-shadow-2xl" sizes="320px" />
            </div>
          </div>
        </div>
      </section>

      <section className="section-padding bg-[#f7f7f5] pt-0">
        <div className="container-custom">
          <h2 className="text-2xl font-black text-[#15171c] mb-6">Applications</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {s.applications.map((a) => (
              <div key={a} className="p-5 rounded-2xl bg-white border border-black/6 text-[#15171c] font-semibold text-sm">{a}</div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
