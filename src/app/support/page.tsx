import type { Metadata } from "next";
import PageHero from "@/components/ui/PageHero";
import Link from "next/link";
import { Phone, Mail, MessageCircle, MapPin, Wrench, Clock, Shield, ArrowRight } from "lucide-react";
import { SITE_CONFIG } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Support",
  description: "Maxvolt Energy technical support, warranty, and service center information.",
};

export default function SupportPage() {
  return (
    <>
      <PageHero
        badge="Customer Support"
        title={<>We&apos;re Here <span className="gradient-text">to Help</span></>}
        description="Maxvolt's dedicated support team is available to assist with technical queries, warranty claims, battery troubleshooting, and service center locator."
      />

      <section className="section-padding bg-[#f7f7f5]">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-12">
            {[
              { Icon: MessageCircle, title: "WhatsApp Support", sub: "Instant messaging support", value: SITE_CONFIG.whatsapp, href: `https://wa.me/${SITE_CONFIG.whatsapp.replace("+", "")}`, color: "#FFD100" },
              { Icon: Phone, title: "Phone Support", sub: "Mon-Sat, 9am-6pm", value: SITE_CONFIG.phone, href: `tel:${SITE_CONFIG.phone}`, color: "#FFA800" },
              { Icon: Mail, title: "Email Support", sub: "Response within 24hrs", value: SITE_CONFIG.email, href: `mailto:${SITE_CONFIG.email}`, color: "#FF8C00" },
            ].map(({ Icon, title, sub, value, href, color }) => (
              <a key={title} href={href} target={href.startsWith("https") ? "_blank" : undefined} rel="noopener noreferrer" className="group block p-7 rounded-2xl frosted-card border border-black/6 hover:border-black/8 transition-all hover:-translate-y-1">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-5" style={{ backgroundColor: `${color}12`, border: `1px solid ${color}25` }}>
                  <Icon size={20} style={{ color }} />
                </div>
                <div className="text-[#15171c] font-bold text-lg mb-1">{title}</div>
                <div className="text-[#71717a] text-xs mb-3">{sub}</div>
                <div className="text-sm font-medium" style={{ color }}>{value}</div>
              </a>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              { Icon: Wrench, title: "Technical Support", description: "Battery performance issues, BMS configuration, charging problems, and technical troubleshooting for all Maxvolt products.", color: "#7c3aed" },
              { Icon: Shield, title: "Warranty Claims", description: "All Maxvolt batteries come with a manufacturer's warranty. Contact us with your model number and purchase date to initiate a claim.", color: "#f97316" },
              { Icon: MapPin, title: "Service Center Locator", description: "Find the nearest Maxvolt authorized service center in your city. We have 6+ service centers across India.", color: "#ec4899" },
              { Icon: Clock, title: "Replacement & Spares", description: "Genuine Maxvolt spare parts and replacement cells available through authorized dealers and service centers.", color: "#FFD100" },
            ].map(({ Icon, title, description, color }) => (
              <div key={title} className="flex gap-5 p-6 rounded-2xl frosted-card border border-black/6">
                <div className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0" style={{ backgroundColor: `${color}12`, border: `1px solid ${color}25` }}>
                  <Icon size={18} style={{ color }} />
                </div>
                <div>
                  <h3 className="text-[#15171c] font-bold mb-2">{title}</h3>
                  <p className="text-[#5f6470] text-sm leading-relaxed">{description}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-10 p-8 rounded-2xl border border-[#FFD100]/10 bg-[#FFD100]/4 text-center">
            <h3 className="text-[#15171c] font-bold text-xl mb-3">Need Immediate Help?</h3>
            <p className="text-[#5f6470] text-sm mb-6">Contact us via WhatsApp for the fastest response.</p>
            <a href={`https://wa.me/${SITE_CONFIG.whatsapp.replace("+", "")}`} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl bg-[#FFD100] text-black font-bold text-sm hover:bg-[#FFD100]/90 transition-all">
              <MessageCircle size={15} />
              WhatsApp Support
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
