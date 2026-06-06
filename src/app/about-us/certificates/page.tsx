import type { Metadata } from "next";
import PageHero from "@/components/ui/PageHero";
import Link from "next/link";
import Image from "next/image";
import { Shield, CheckCircle2, ArrowLeft, Award } from "lucide-react";

export const metadata: Metadata = {
  title: "Certificates | Maxvolt Energy",
  description: "Maxvolt Energy certifications and quality standards – AIS 156, ISO, and TAC certificates for lithium battery manufacturing.",
};

const CERTIFICATIONS = [
  {
    name: "AIS 156 Government Safety Compliance",
    issuer: "Automotive Industry Standards Committee, India",
    description: "India's mandatory automotive battery safety standard covering thermal runaway, short circuit, overcharge, and crash safety for EV batteries.",
    image: "/images/certificate/-zrp.webp",
    products: "E-Cycle, E-Scooter/Bike, E-Rickshaw",
    color: "#FFD100",
    year: "2023 / 2024",
  },
  {
    name: "TAC Certificate – 51.2V 105AH Battery",
    issuer: "Testing Agency, India",
    description: "Type Approval Certificate for the 51.2V 105AH lithium battery pack for e-rickshaw applications.",
    products: "E-Rickshaw Battery (MEIPLRI-51100)",
    color: "#FFA800",
    year: "2023",
    image: "/images/certificate/tac-maxvolt-51-2v-105ah-brz.webp",
  },
  {
    name: "TAC Certificate – 63V 40Ah Battery Model",
    issuer: "Testing Agency, India",
    description: "Type Approval Certificate for the 63V 40Ah lithium battery pack for e-scooter applications.",
    products: "E-Scooter Battery (MEIPLES-62940)",
    color: "#FF8C00",
    year: "2023",
    image: "/images/certificate/450-tac-maxvolt-62940-106-xkd.webp",
  },
  {
    name: "TAC Certificate – 63V 34Ah Battery Model",
    issuer: "Testing Agency, India",
    description: "Type Approval Certificate covering the 63V 34Ah e-scooter battery pack specifications.",
    products: "E-Scooter Battery (MEIPLES-62934)",
    color: "#7c3aed",
    year: "2023",
    image: "/images/certificate/449-tac-maxvolt-62934-105-tki.webp",
  },
  {
    name: "TAC Certificate – 63V 29Ah Battery Model",
    issuer: "Testing Agency, India",
    description: "Type Approval Certificate for the 63V 29Ah e-scooter battery pack.",
    products: "E-Scooter Battery (MEIPLES-62929)",
    color: "#f97316",
    year: "2023",
    image: "/images/certificate/448-tac-maxvolt-62929-104-kkc.webp",
  },
  {
    name: "ISO Manufacturing Quality Standards",
    issuer: "International Organization for Standardization",
    description: "Quality management systems ensuring consistent production processes, multi-stage testing, and manufacturing excellence.",
    products: "All Maxvolt Products",
    color: "#7c3aed",
    year: "Ongoing",
  },
];

export default function CertificatesPage() {
  return (
    <>
      <PageHero
        badge="Certifications"
        title={<>Safety You Can <span className="gradient-text">Trust</span></>}
        description="Maxvolt Energy's batteries are certified to the highest Indian and international safety standards. Every battery undergoes multi-stage testing before leaving our Ghaziabad facility."
      >
        <Link href="/about-us" className="inline-flex items-center gap-2 text-[#71717a] hover:text-[#15171c] text-sm transition-colors">
          <ArrowLeft size={13} />
          Back to About Us
        </Link>
      </PageHero>

      <section className="section-padding bg-[#f7f7f5]">
        <div className="container-custom">
          <div className="space-y-5">
            {CERTIFICATIONS.map(({ name, issuer, description, products, color, year, image }: any) => (
              <div key={name} className="p-7 rounded-2xl frosted-card border border-black/6 hover:border-black/8 transition-all">
                <div className="flex flex-col md:flex-row md:items-start gap-6">
                  {/* Certificate thumbnail */}
                  {image ? (
                    <div className="w-24 h-28 rounded-xl overflow-hidden border border-black/8 shrink-0 relative bg-white">
                      <Image src={image} alt={name} fill className="object-cover" sizes="96px" />
                    </div>
                  ) : (
                    <div className="w-14 h-14 rounded-2xl flex items-center justify-center shrink-0" style={{ backgroundColor: `${color}12`, border: `1px solid ${color}25` }}>
                      <Award size={24} style={{ color }} />
                    </div>
                  )}
                  <div className="flex-1">
                    <div className="flex items-start gap-3 flex-wrap mb-2">
                      <h3 className="text-[#15171c] font-bold text-lg">{name}</h3>
                      <span className="px-2.5 py-1 rounded-lg text-xs font-bold" style={{ color, backgroundColor: `${color}10`, border: `1px solid ${color}20` }}>{year}</span>
                    </div>
                    <div className="text-[#71717a] text-xs mb-3">{issuer}</div>
                    <p className="text-[#52525b] text-sm leading-relaxed mb-4">{description}</p>
                    <div className="flex items-center gap-2 text-xs text-[#71717a]">
                      <CheckCircle2 size={12} style={{ color }} />
                      Applicable to: {products}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-10 p-7 rounded-2xl border border-[#FFD100]/10 bg-[#FFD100]/4">
            <div className="flex items-start gap-4">
              <Shield size={24} className="text-[#D97706] shrink-0 mt-0.5" />
              <div>
                <h3 className="text-[#15171c] font-bold mb-2">Our Quality Commitment</h3>
                <p className="text-[#52525b] text-sm leading-relaxed">
                  Every Maxvolt battery undergoes multi-stage testing including charge/discharge cycling,
                  thermal stress testing, vibration testing, and BMS validation before leaving our facility.
                  Our manufacturing processes comply with international quality standards to ensure every
                  battery delivered to customers meets our zero-compromise safety policy.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
