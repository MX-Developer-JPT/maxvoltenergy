"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  MapPin, Phone, Mail,
  MessageCircle, ArrowUpRight, ExternalLink,
} from "lucide-react";
import { SITE_CONFIG } from "@/lib/constants";

const FOOTER_LINKS = {
  "Quick Links": [
    { label: "Home", href: "/" },
    { label: "Products", href: "/products" },
    { label: "About Us", href: "/about-us" },
    { label: "Blogs", href: "/blog" },
    { label: "Gallery", href: "/gallery" },
    { label: "Career", href: "/career" },
    { label: "Recycle", href: "/recycle" },
    { label: "Our Presence", href: "/our-presence" },
  ],
  "Products": [
    { label: "E-Cycle Batteries", href: "/products/e-cycle-lithium-battery" },
    { label: "E-Scooter / Bike", href: "/products/e-scooter-bike-lithium-battery" },
    { label: "E-Rickshaw", href: "/products/e-rickshaw-lithium-battery" },
    { label: "Energy Storage", href: "/products/lithium-battery-energy-storage-solutions" },
    { label: "Solar Batteries", href: "/products/lithium-battery-for-solar-application" },
    { label: "Customized Solutions", href: "/products/customized-battery-solution" },
    { label: "Product Portfolio", href: "/portfolio" },
    { label: "Shop All Batteries", href: "/shop" },
  ],
  "Investors": [
    { label: "Earnings Call", href: "/investors/earnings-call" },
    { label: "Management", href: "/investors/management" },
    { label: "Corporate Governance", href: "/investors/corporate-governance" },
    { label: "Announcements", href: "/investors/corporate-announcement" },
    { label: "Shareholding Pattern", href: "/investors/shareholding-pattern" },
    { label: "Annual Reports", href: "/investors/annual-reports" },
    { label: "CSR", href: "/investors/csr" },
  ],
  "Support": [
    { label: "Contact Us", href: "/contact-us" },
    { label: "Support", href: "/support" },
    { label: "FAQ", href: "/faq" },
    { label: "Media Coverage", href: "/media" },
    { label: "Sitemap", href: "/sitemap-page" },
    { label: "Privacy Policy", href: "/privacy-policy" },
    { label: "Terms & Conditions", href: "/terms-and-conditions" },
  ],
};

export default function Footer() {
  return (
    <footer className="relative bg-[#f7f7f5] border-t border-black/6 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 dot-pattern opacity-30 pointer-events-none" />
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-[#FFD100]/3 blur-[120px] pointer-events-none" />

      <div className="container-custom relative z-10">
        {/* Top CTA bar */}
        <div className="py-12 border-b border-black/6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="text-2xl font-bold text-[#15171c] mb-1">Ready to Go Electric?</h3>
              <p className="text-[#52525b] text-sm">Talk to our experts about the right battery solution for you.</p>
            </div>
            <div className="flex items-center gap-4">
              <a
                href={`https://wa.me/${SITE_CONFIG.whatsapp.replace("+", "")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-6 py-3 rounded-xl bg-[#FFD100] text-black font-semibold text-sm hover:bg-[#FFD100]/90 hover:shadow-[0_0_30px_rgba(255,209,0,0.4)] transition-all active:scale-95"
              >
                <MessageCircle size={16} />
                WhatsApp Us
              </a>
              <Link
                href="/contact-us"
                className="flex items-center gap-2 px-6 py-3 rounded-xl border border-black/8 text-[#3f3f46] hover:text-[#15171c] hover:border-white/20 text-sm font-medium transition-all"
              >
                Contact Us
                <ArrowUpRight size={14} />
              </Link>
            </div>
          </div>
        </div>

        {/* Main footer */}
        <div className="py-14 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center mb-5 group w-fit">
              <div className="relative">
                <div className="absolute inset-0 rounded-lg bg-[#FFD100] opacity-0 blur-xl group-hover:opacity-15 transition-opacity duration-500" />
                <Image
                  src="/images/logo.webp"
                  alt="Maxvolt Energy"
                  width={160}
                  height={48}
                  className="h-10 w-auto object-contain relative z-10"
                />
              </div>
            </Link>

            <p className="text-[#5f6470] text-sm leading-relaxed mb-6 max-w-xs">
              India&apos;s premier lithium battery manufacturer powering the electric mobility revolution since 2019.
            </p>

            {/* Social links */}
            <div className="flex items-center gap-3 mb-6">
              {[
                { icon: "/images/addtoany/facebook.webp", title: "Facebook", href: SITE_CONFIG.social.facebook },
                { icon: "/images/addtoany/linkedin.webp", title: "LinkedIn", href: SITE_CONFIG.social.linkedin },
                { icon: "/images/addtoany/whatsapp.webp", title: "WhatsApp", href: `https://wa.me/${SITE_CONFIG.whatsapp.replace("+", "")}` },
              ].map(({ icon, title, href }) => (
                <a
                  key={title}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={title}
                  className="w-9 h-9 rounded-lg bg-black/[0.04] hover:bg-[#FFD100]/10 border border-black/6 hover:border-[#FFD100]/20 flex items-center justify-center transition-all overflow-hidden p-1.5"
                >
                  <Image src={icon} alt={title} width={20} height={20} className="w-full h-full object-contain opacity-50 hover:opacity-100 transition-opacity" />
                </a>
              ))}
              <a
                href={SITE_CONFIG.social.youtube}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="YouTube"
                className="w-9 h-9 rounded-lg bg-black/[0.04] hover:bg-[#FFD100]/10 border border-black/6 hover:border-[#FFD100]/20 flex items-center justify-center text-[#5f6470] hover:text-[#D97706] transition-all text-[10px] font-bold"
              >
                YT
              </a>
            </div>

            {/* NSE Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-[#FFD100]/5 border border-[#FFD100]/15">
              <div className="w-1.5 h-1.5 rounded-full bg-[#FFD100] animate-pulse" />
              <span className="text-[#D97706] text-xs font-medium">Listed on NSE SME Emerge</span>
            </div>
          </div>

          {/* Links */}
          {Object.entries(FOOTER_LINKS).map(([category, links]) => (
            <div key={category} className="lg:col-span-1">
              <h4 className="text-[#15171c] font-semibold text-sm mb-4 tracking-wide">{category}</h4>
              <ul className="space-y-2.5">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-[#5f6470] hover:text-[#D97706] text-sm transition-colors hover-underline"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Contact info */}
        <div className="py-8 border-t border-b border-black/6 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-lg bg-[#FFD100]/10 border border-[#FFD100]/20 flex items-center justify-center shrink-0 mt-0.5">
              <MapPin size={14} className="text-[#D97706]" />
            </div>
            <div>
              <div className="text-[#52525b] text-xs font-medium mb-1 uppercase tracking-wider">Manufacturing Plant</div>
              <div className="text-[#3f3f46] text-sm">{SITE_CONFIG.addresses.ghaziabad}</div>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-lg bg-[#FFD100]/10 border border-[#FFD100]/20 flex items-center justify-center shrink-0 mt-0.5">
              <MapPin size={14} className="text-[#D97706]" />
            </div>
            <div>
              <div className="text-[#52525b] text-xs font-medium mb-1 uppercase tracking-wider">Corporate Office</div>
              <div className="text-[#3f3f46] text-sm">{SITE_CONFIG.addresses.delhi}</div>
            </div>
          </div>
          <div className="flex flex-col gap-3">
            <a href={`tel:${SITE_CONFIG.phone}`} className="flex items-center gap-3 group">
              <div className="w-8 h-8 rounded-lg bg-[#FFD100]/10 border border-[#FFD100]/20 flex items-center justify-center shrink-0">
                <Phone size={14} className="text-[#D97706]" />
              </div>
              <span className="text-[#3f3f46] text-sm group-hover:text-[#15171c] transition-colors">{SITE_CONFIG.phone}</span>
            </a>
            <a href={`mailto:${SITE_CONFIG.email}`} className="flex items-center gap-3 group">
              <div className="w-8 h-8 rounded-lg bg-[#FFD100]/10 border border-[#FFD100]/20 flex items-center justify-center shrink-0">
                <Mail size={14} className="text-[#D97706]" />
              </div>
              <span className="text-[#3f3f46] text-sm group-hover:text-[#15171c] transition-colors">{SITE_CONFIG.email}</span>
            </a>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="py-6 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-[#71717a]">
          <p>© {new Date().getFullYear()} Maxvolt Energy Industries Limited. All Rights Reserved.</p>
          <div className="flex items-center gap-4">
            <Link href="/privacy-policy" className="hover:text-[#52525b] transition-colors">Privacy Policy</Link>
            <Link href="/terms-and-conditions" className="hover:text-[#52525b] transition-colors">Terms & Conditions</Link>
            <a href="https://maxvoltreearth.com" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 hover:text-[#D97706] transition-colors">
              Maxvolt ReEarth <ExternalLink size={10} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
