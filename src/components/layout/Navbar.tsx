"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ChevronDown, Phone, MessageCircle } from "lucide-react";
import Image from "next/image";
import { NAV_ITEMS, SITE_CONFIG } from "@/lib/constants";
import { cn } from "@/lib/utils";
import ThemeToggle from "@/components/ui/ThemeToggle";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const [mobileExpanded, setMobileExpanded] = useState<string | null>(null);
  const pathname = usePathname();
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
    setActiveDropdown(null);
  }, [pathname]);

  return (
    <motion.nav
      ref={navRef}
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.19, 1, 0.22, 1] }}
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-700",
        scrolled
          ? "bg-white/85 backdrop-blur-3xl border-b border-black/8 shadow-[0_4px_30px_rgba(0,0,0,0.08)]"
          : "bg-white/40 backdrop-blur-sm"
      )}
    >
      <div className="container-custom">
        <div className="flex items-center justify-between h-18 lg:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center group">
            <div className="relative">
              <div className="absolute inset-0 rounded-lg bg-[#FFD100] opacity-0 blur-xl group-hover:opacity-20 transition-opacity duration-500" />
              <Image
                src="/images/logo.webp"
                alt="Maxvolt Energy"
                width={200}
                height={60}
                className="h-12 w-auto object-contain relative z-10"
                priority
              />
            </div>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-1">
            {NAV_ITEMS.map((item) => (
              <div
                key={item.label}
                className="relative"
                onMouseEnter={() => setActiveDropdown(item.label)}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <Link
                  href={item.href}
                  className={cn(
                    "flex items-center gap-1 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200",
                    pathname.startsWith(item.href) && item.href !== "/"
                      ? "text-[#D97706]"
                      : "text-[#3f3f46] hover:text-[#15171c] hover:bg-black/[0.04]"
                  )}
                >
                  {item.label}
                  {item.children && (
                    <ChevronDown
                      size={14}
                      className={cn(
                        "transition-transform duration-200",
                        activeDropdown === item.label ? "rotate-180" : ""
                      )}
                    />
                  )}
                </Link>

                {/* Dropdown */}
                <AnimatePresence>
                  {item.children && activeDropdown === item.label && (
                    <motion.div
                      initial={{ opacity: 0, y: 8, scale: 0.97 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 8, scale: 0.97 }}
                      transition={{ duration: 0.2, ease: "easeOut" }}
                      className="absolute top-full left-0 mt-2 w-56 frosted-card rounded-xl overflow-y-auto overscroll-contain max-h-[min(70vh,520px)] custom-scrollbar"
                    >
                      <div className="p-2">
                        {item.children.map((child) => (
                          <Link
                            key={child.label}
                            href={child.href}
                            className={cn(
                              "flex items-center gap-2 px-3 py-2.5 rounded-lg text-sm transition-all duration-200",
                              pathname === child.href
                                ? "text-[#D97706] bg-[#FFD100]/10"
                                : "text-[#52525b] hover:text-[#15171c] hover:bg-black/[0.04]"
                            )}
                          >
                            <span className="w-1.5 h-1.5 rounded-full bg-[#FFD100]/40" />
                            {child.label}
                          </Link>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>

          {/* CTA buttons */}
          <div className="hidden lg:flex items-center gap-3">
            <ThemeToggle />
            <a
              href={`tel:${SITE_CONFIG.phone}`}
              className="flex items-center gap-2 px-4 py-2 text-sm text-[#52525b] hover:text-[#15171c] transition-colors"
            >
              <Phone size={15} />
              <span>01204291595</span>
            </a>
            <a
              href={`https://wa.me/${SITE_CONFIG.whatsapp.replace("+", "")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-[#FFD100] text-black text-sm font-semibold hover:bg-[#FFD100]/90 transition-all hover:shadow-[0_0_20px_rgba(255,209,0,0.4)] active:scale-95"
            >
              <MessageCircle size={15} />
              Enquire Now
            </a>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden w-10 h-10 flex items-center justify-center rounded-lg text-[#3f3f46] hover:text-[#15171c] hover:bg-black/[0.04] transition-all"
            aria-label="Toggle menu"
          >
            <AnimatePresence mode="wait">
              {isOpen ? (
                <motion.div key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.2 }}>
                  <X size={22} />
                </motion.div>
              ) : (
                <motion.div key="menu" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.2 }}>
                  <Menu size={22} />
                </motion.div>
              )}
            </AnimatePresence>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="lg:hidden overflow-hidden bg-white/96 backdrop-blur-2xl border-t border-black/6"
          >
            <div className="container-custom py-4 pb-6 space-y-1">
              {NAV_ITEMS.map((item) => (
                <div key={item.label}>
                  <button
                    onClick={() => setMobileExpanded(mobileExpanded === item.label ? null : item.label)}
                    className="w-full flex items-center justify-between px-4 py-3 rounded-lg text-[#15171c] hover:text-[#15171c] hover:bg-black/[0.04] transition-all text-sm font-medium"
                  >
                    {item.label}
                    {item.children && (
                      <ChevronDown
                        size={15}
                        className={cn("transition-transform duration-200", mobileExpanded === item.label ? "rotate-180" : "")}
                      />
                    )}
                  </button>
                  <AnimatePresence>
                    {item.children && mobileExpanded === item.label && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden ml-4 border-l border-black/6 pl-4 space-y-0.5"
                      >
                        {item.children.map((child) => (
                          <Link
                            key={child.label}
                            href={child.href}
                            className="block px-3 py-2 text-sm text-[#52525b] hover:text-[#D97706] transition-colors"
                          >
                            {child.label}
                          </Link>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
              <div className="pt-4 flex flex-col gap-3">
                <a
                  href={`tel:${SITE_CONFIG.phone}`}
                  className="flex items-center justify-center gap-2 px-4 py-3 rounded-lg border border-black/8 text-sm text-[#3f3f46]"
                >
                  <Phone size={15} />
                  01204291595
                </a>
                <a
                  href={`https://wa.me/${SITE_CONFIG.whatsapp.replace("+", "")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 px-4 py-3 rounded-lg bg-[#FFD100] text-black text-sm font-semibold"
                >
                  <MessageCircle size={15} />
                  Enquire Now
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
