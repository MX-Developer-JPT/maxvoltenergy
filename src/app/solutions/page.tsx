import type { Metadata } from "next";
import PageHero from "@/components/ui/PageHero";
import Link from "next/link";
import { Zap, Sun, Lightbulb, Cpu, ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Solutions",
  description: "Maxvolt Energy solutions for electric vehicles, portable lighting, solar storage, and consumer electronics.",
};

const SOLUTIONS = [
  {
    Icon: Zap,
    title: "Electric Vehicles",
    href: "/solutions/electric-vehicles",
    description: "Complete lithium battery solutions for e-cycles, e-scooters, e-bikes, and e-rickshaws. AIS 156 certified and engineered for Indian road conditions.",
    products: ["E-Cycle Batteries", "E-Scooter Batteries", "E-Rickshaw Batteries", "Customized Packs"],
    color: "#FFD100",
  },
  {
    Icon: Sun,
    title: "Solar Storage",
    href: "/solutions/solar-storage",
    description: "High-efficiency lithium batteries for residential and commercial solar energy storage systems. Deep cycle capable with mobile monitoring.",
    products: ["Solar Lithium Batteries", "Grid-Tied Storage", "Off-Grid Systems", "Hybrid Solutions"],
    color: "#f97316",
  },
  {
    Icon: Lightbulb,
    title: "Portable Lighting",
    href: "/solutions/portable-lighting",
    description: "Reliable lithium batteries for portable lighting applications including solar lanterns, emergency lights, and outdoor illumination systems.",
    products: ["Solar Lanterns", "Emergency Lighting", "Outdoor Lighting", "Portable Power"],
    color: "#FFA800",
  },
  {
    Icon: Cpu,
    title: "Consumer Electronics",
    href: "/solutions/consumer-electronics",
    description: "Custom battery packs for consumer electronic devices, wearables, IoT devices, and smart home products.",
    products: ["Smart Devices", "IoT Batteries", "Wearable Power", "Home Automation"],
    color: "#FF8C00",
  },
];

export default function SolutionsPage() {
  return (
    <>
      <PageHero
        badge="Solutions"
        title={<>Powering Every <span className="gradient-text">Application</span></>}
        description="From electric rickshaws to solar homes and consumer devices — Maxvolt Energy delivers lithium battery solutions across four key application domains."
      />

      <section className="section-padding bg-[#f7f7f5]">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {SOLUTIONS.map(({ Icon, title, href, description, products, color }) => (
              <Link key={title} href={href} className="group block">
                <div className="h-full p-8 rounded-2xl frosted-card border border-black/6 hover:border-black/8 transition-all hover:-translate-y-1 overflow-hidden relative">
                  <div className="absolute top-0 right-0 w-40 h-40 rounded-full blur-[80px] opacity-0 group-hover:opacity-15 transition-opacity duration-500" style={{ background: color }} />

                  <div className="w-14 h-14 rounded-2xl flex items-center justify-center mb-6" style={{ backgroundColor: `${color}12`, border: `1px solid ${color}25` }}>
                    <Icon size={24} style={{ color }} />
                  </div>

                  <h3 className="text-[#15171c] font-bold text-2xl mb-3">{title}</h3>
                  <p className="text-[#52525b] text-sm leading-relaxed mb-6">{description}</p>

                  <div className="flex flex-wrap gap-2 mb-6">
                    {products.map((p) => (
                      <span key={p} className="px-3 py-1 rounded-lg text-xs border" style={{ color, borderColor: `${color}25`, backgroundColor: `${color}08` }}>{p}</span>
                    ))}
                  </div>

                  <div className="flex items-center gap-2 text-sm font-semibold" style={{ color }}>
                    Explore Solutions <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
