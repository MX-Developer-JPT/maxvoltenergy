"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Shield, CheckCircle2, ArrowLeft, Award, X, Maximize2 } from "lucide-react";
import PageHero from "@/components/ui/PageHero";

interface Cert {
  name: string; issuer: string; description: string; products: string;
  color: string; year: string; image?: string;
}

const CERTIFICATIONS: Cert[] = [
  { name: "Udyam Registration Certificate", issuer: "Ministry of MSME, Government of India", description: "Official Udyam (MSME) registration for Maxvolt Energy Industries Limited — UDYAM-UP-28-0011807. Major activity: Manufacturing of lithium batteries for electric vehicles, energy storage, electronic gadgets and medical equipment.", image: "/images/certificate/-zrp.webp", products: "Reg. No. UDYAM-UP-28-0011807", color: "#FFD100", year: "Since 2019" },
  { name: "ISO 9001:2015 Quality Management System", issuer: "QCC – Quality Control Certification (IAF Accredited)", description: "Certified Quality Management System (Cert. QCC/0DB/0224) for the manufacture of lithium batteries for electric vehicles, energy storage solutions, electronic gadgets, medical equipment and lithium chargers. Valid through 2027.", image: "/images/certificate/-fzl.webp", products: "All Maxvolt Products", color: "#FFA800", year: "2025 – 2027" },
  { name: "TAC Certificate – 51.2V 105AH Battery", issuer: "Testing Agency, India", description: "Type Approval Certificate for the 51.2V 105AH lithium battery pack for e-rickshaw applications.", products: "E-Rickshaw Battery (MEIPLRI-51100)", color: "#FF8C00", year: "2023", image: "/images/certificate/tac-maxvolt-51-2v-105ah-brz.webp" },
  { name: "TAC Certificate – 63V 40Ah Battery Model", issuer: "Testing Agency, India", description: "Type Approval Certificate for the 63V 40Ah lithium battery pack for e-scooter applications.", products: "E-Scooter Battery (MEIPLES-62940)", color: "#7c3aed", year: "2023", image: "/images/certificate/450-tac-maxvolt-62940-106-xkd.webp" },
  { name: "TAC Certificate – 63V 34Ah Battery Model", issuer: "Testing Agency, India", description: "Type Approval Certificate covering the 63V 34Ah e-scooter battery pack specifications.", products: "E-Scooter Battery (MEIPLES-62934)", color: "#f97316", year: "2023", image: "/images/certificate/449-tac-maxvolt-62934-105-tki.webp" },
  { name: "TAC Certificate – 63V 29Ah Battery Model", issuer: "Testing Agency, India", description: "Type Approval Certificate for the 63V 29Ah e-scooter battery pack.", products: "E-Scooter Battery (MEIPLES-62929)", color: "#ec4899", year: "2023", image: "/images/certificate/448-tac-maxvolt-62929-104-kkc.webp" },
  { name: "AIS 156 Government Safety Compliance", issuer: "Automotive Industry Standards Committee, India", description: "India's mandatory automotive battery safety standard covering thermal runaway, short circuit, overcharge and crash safety — evidenced by the Type Approval Certificates above for Maxvolt EV battery models.", products: "E-Cycle, E-Scooter/Bike, E-Rickshaw", color: "#FFD100", year: "2023 / 2024" },
];

export default function CertificatesContent() {
  const [open, setOpen] = useState<Cert | null>(null);

  return (
    <>
      <PageHero image="/images/category/about-us-rja.webp"
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
            {CERTIFICATIONS.map((cert) => {
              const { name, issuer, description, products, color, year, image } = cert;
              const clickable = !!image;
              return (
                <div key={name} className="p-7 rounded-2xl frosted-card border border-black/6 hover:border-black/8 transition-all">
                  <div className="flex flex-col md:flex-row md:items-start gap-6">
                    {image ? (
                      <button
                        onClick={() => setOpen(cert)}
                        className="group w-24 h-28 rounded-xl overflow-hidden border border-black/8 shrink-0 relative bg-white cursor-zoom-in"
                        aria-label={`View ${name} certificate`}
                      >
                        <Image src={image} alt={name} fill className="object-cover group-hover:scale-105 transition-transform" sizes="96px" />
                        <span className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors flex items-center justify-center">
                          <Maximize2 size={16} className="text-white opacity-0 group-hover:opacity-100 transition-opacity" />
                        </span>
                      </button>
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
                      {clickable && (
                        <button onClick={() => setOpen(cert)} className="mt-3 inline-flex items-center gap-1.5 text-xs font-semibold" style={{ color }}>
                          <Maximize2 size={12} /> View full certificate
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
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

      {/* Lightbox */}
      <AnimatePresence>
        {open && open.image && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={() => setOpen(null)}
            className="fixed inset-0 z-[130] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
          >
            <motion.div
              initial={{ scale: 0.92, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.92, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="relative bg-white rounded-2xl overflow-hidden max-w-3xl w-full max-h-[90vh] flex flex-col"
            >
              <div className="flex items-center justify-between px-5 py-3.5 border-b border-black/8">
                <h3 className="text-[#15171c] font-bold text-sm pr-6">{open.name}</h3>
                <button onClick={() => setOpen(null)} className="text-[#a1a1aa] hover:text-[#15171c] shrink-0"><X size={18} /></button>
              </div>
              <div className="relative flex-1 overflow-auto bg-[#f7f7f5] flex items-center justify-center p-4">
                <div className="relative w-full" style={{ minHeight: "60vh" }}>
                  <Image src={open.image} alt={open.name} fill className="object-contain" sizes="800px" />
                </div>
              </div>
              <a
                href={open.image}
                target="_blank"
                rel="noopener noreferrer"
                className="text-center px-5 py-3 text-sm font-semibold text-[#D97706] border-t border-black/8 hover:bg-[#FFD100]/8 transition-colors"
              >
                Open original in new tab
              </a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
