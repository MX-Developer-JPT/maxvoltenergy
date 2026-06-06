"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import PageHero from "@/components/ui/PageHero";
import { SITE_CONFIG } from "@/lib/constants";
import { MapPin, Phone, Mail, MessageCircle, Send, User, AtSign, PhoneCall, MessageSquare, Building2, Users } from "lucide-react";

function ContactForm() {
  const [form, setForm] = useState({
    name: "", email: "", phone: "", subject: "", message: "", inquiry: "product",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await fetch("/api/enquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name, email: form.email, phone: form.phone,
          subject: form.subject, message: form.message,
          inquiryType: form.inquiry, source: "/contact-us",
        }),
      });
    } catch {
      // network error — still show success to user; could add retry UI
    }
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="p-10 rounded-2xl frosted-card border border-[#FFD100]/20 text-center">
        <div className="w-16 h-16 rounded-full bg-[#FFD100]/15 border border-[#FFD100]/30 flex items-center justify-center mx-auto mb-5">
          <Send size={24} className="text-[#D97706]" />
        </div>
        <h3 className="text-[#15171c] font-bold text-xl mb-2">Message Sent!</h3>
        <p className="text-[#52525b] text-sm">We&apos;ll get back to you within 24 hours.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Inquiry type */}
      <div className="grid grid-cols-3 gap-2">
        {[
          { value: "product", label: "Product Inquiry" },
          { value: "dealer", label: "Dealer Inquiry" },
          { value: "oem", label: "OEM / Bulk" },
        ].map(({ value, label }) => (
          <button
            key={value}
            type="button"
            onClick={() => setForm({ ...form, inquiry: value })}
            className="px-3 py-2.5 rounded-xl text-xs font-semibold transition-all"
            style={
              form.inquiry === value
                ? { backgroundColor: "rgba(255,209,0,0.15)", color: "#FFD100", border: "1px solid rgba(255,209,0,0.3)" }
                : { backgroundColor: "rgba(255,255,255,0.03)", color: "rgba(255,255,255,0.4)", border: "1px solid rgba(255,255,255,0.06)" }
            }
          >
            {label}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="relative">
          <User size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#a1a1aa]" />
          <input
            type="text"
            placeholder="Full Name *"
            required
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className="w-full pl-10 pr-4 py-3.5 rounded-xl bg-black/[0.03] border border-black/8 text-[#15171c] text-sm placeholder:text-[#8a8a93] focus:outline-none focus:border-[#FFD100]/40 transition-colors"
          />
        </div>
        <div className="relative">
          <AtSign size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#a1a1aa]" />
          <input
            type="email"
            placeholder="Email Address *"
            required
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            className="w-full pl-10 pr-4 py-3.5 rounded-xl bg-black/[0.03] border border-black/8 text-[#15171c] text-sm placeholder:text-[#8a8a93] focus:outline-none focus:border-[#FFD100]/40 transition-colors"
          />
        </div>
      </div>

      <div className="relative">
        <PhoneCall size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#a1a1aa]" />
        <input
          type="tel"
          placeholder="Phone Number"
          value={form.phone}
          onChange={(e) => setForm({ ...form, phone: e.target.value })}
          className="w-full pl-10 pr-4 py-3.5 rounded-xl bg-black/[0.03] border border-black/8 text-[#15171c] text-sm placeholder:text-[#8a8a93] focus:outline-none focus:border-[#FFD100]/40 transition-colors"
        />
      </div>

      <div className="relative">
        <MessageSquare size={14} className="absolute left-3.5 top-3.5 text-[#a1a1aa]" />
        <input
          type="text"
          placeholder="Subject"
          value={form.subject}
          onChange={(e) => setForm({ ...form, subject: e.target.value })}
          className="w-full pl-10 pr-4 py-3.5 rounded-xl bg-black/[0.03] border border-black/8 text-[#15171c] text-sm placeholder:text-[#8a8a93] focus:outline-none focus:border-[#FFD100]/40 transition-colors"
        />
      </div>

      <textarea
        placeholder="Your message..."
        rows={5}
        required
        value={form.message}
        onChange={(e) => setForm({ ...form, message: e.target.value })}
        className="w-full px-4 py-3.5 rounded-xl bg-black/[0.03] border border-black/8 text-[#15171c] text-sm placeholder:text-[#8a8a93] focus:outline-none focus:border-[#FFD100]/40 transition-colors resize-none"
      />

      <button
        type="submit"
        className="w-full flex items-center justify-center gap-2 py-4 rounded-xl bg-[#FFD100] text-black font-bold text-sm hover:bg-[#FFD100]/90 hover:shadow-[0_0_30px_rgba(255,209,0,0.4)] transition-all active:scale-[0.99]"
      >
        <Send size={15} />
        Send Message
      </button>
    </form>
  );
}

export default function ContactContent() {
  return (
    <>
      <PageHero
        badge="Contact Us"
        title={<>Let&apos;s Build the <span className="gradient-text">Electric Future</span> Together</>}
        description="Whether you're a dealer, OEM partner, investor, or individual customer — our team is ready to assist with product inquiries, technical support, and partnership opportunities."
      />

      <section className="section-padding bg-[#f7f7f5]">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Left - Contact info */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl font-bold text-[#15171c] mb-8">Get in Touch</h2>

              {/* Quick contact */}
              <div className="grid grid-cols-1 gap-4 mb-8">
                <a
                  href={`https://wa.me/${SITE_CONFIG.whatsapp.replace("+", "")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-4 p-5 rounded-2xl frosted-card border border-[#FFD100]/15 hover:border-[#FFD100]/30 transition-all"
                >
                  <div className="w-12 h-12 rounded-xl bg-[#FFD100]/15 border border-[#FFD100]/25 flex items-center justify-center">
                    <MessageCircle size={20} className="text-[#D97706]" />
                  </div>
                  <div>
                    <div className="text-[#15171c] font-bold">WhatsApp</div>
                    <div className="text-[#5f6470] text-sm">{SITE_CONFIG.whatsapp}</div>
                  </div>
                  <span className="ml-auto text-xs text-[#D97706] font-medium">Chat Now →</span>
                </a>

                <a
                  href={`tel:${SITE_CONFIG.phone}`}
                  className="group flex items-center gap-4 p-5 rounded-2xl frosted-card border border-black/6 hover:border-black/8 transition-all"
                >
                  <div className="w-12 h-12 rounded-xl bg-black/[0.04] border border-black/8 flex items-center justify-center">
                    <Phone size={20} className="text-[#52525b]" />
                  </div>
                  <div>
                    <div className="text-[#15171c] font-bold">Phone</div>
                    <div className="text-[#5f6470] text-sm">{SITE_CONFIG.phone}</div>
                  </div>
                </a>

                <a
                  href={`mailto:${SITE_CONFIG.email}`}
                  className="group flex items-center gap-4 p-5 rounded-2xl frosted-card border border-black/6 hover:border-black/8 transition-all"
                >
                  <div className="w-12 h-12 rounded-xl bg-black/[0.04] border border-black/8 flex items-center justify-center">
                    <Mail size={20} className="text-[#52525b]" />
                  </div>
                  <div>
                    <div className="text-[#15171c] font-bold">Email</div>
                    <div className="text-[#5f6470] text-sm">{SITE_CONFIG.email}</div>
                  </div>
                </a>
              </div>

              {/* Addresses */}
              <h3 className="text-[#15171c] font-bold text-lg mb-4">Our Locations</h3>
              <div className="space-y-4">
                <a
                  href={SITE_CONFIG.maps.corporate}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start gap-4 p-5 rounded-xl frosted-card border border-black/6 hover:border-[#FFD100]/30 transition-all group"
                >
                  <Building2 size={18} className="text-[#D97706] shrink-0 mt-0.5" />
                  <div>
                    <div className="text-[#15171c] font-semibold text-sm mb-1">Corporate Office</div>
                    <div className="text-[#5f6470] text-sm">{SITE_CONFIG.addresses.corporate}</div>
                    <div className="text-[#D97706] text-xs mt-1 font-medium">View on Google Maps →</div>
                  </div>
                </a>
                <a
                  href={SITE_CONFIG.maps.plant}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start gap-4 p-5 rounded-xl frosted-card border border-black/6 hover:border-[#FFD100]/30 transition-all group"
                >
                  <MapPin size={18} className="text-[#D97706] shrink-0 mt-0.5" />
                  <div>
                    <div className="text-[#15171c] font-semibold text-sm mb-1">Manufacturing Plant — Duhai, Ghaziabad</div>
                    <div className="text-[#5f6470] text-sm">{SITE_CONFIG.addresses.plant}</div>
                    <div className="text-[#D97706] text-xs mt-1 font-medium">View on Google Maps →</div>
                  </div>
                </a>
              </div>
            </motion.div>

            {/* Right - Form */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <h2 className="text-3xl font-bold text-[#15171c] mb-8">Send a Message</h2>
              <ContactForm />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Dealer inquiry section */}
      <section id="dealer" className="py-16 bg-white">
        <div className="container-custom">
          <div className="max-w-2xl mx-auto text-center">
            <div className="w-14 h-14 rounded-2xl bg-[#FFD100]/15 border border-[#FFD100]/25 flex items-center justify-center mx-auto mb-6">
              <Users size={24} className="text-[#D97706]" />
            </div>
            <h2 className="text-3xl font-bold text-[#15171c] mb-4">
              Become a Dealer or Distributor
            </h2>
            <p className="text-[#5f6470] text-sm leading-relaxed mb-8">
              Join Maxvolt&apos;s rapidly growing dealer network across India. We offer competitive margins,
              technical training, marketing support, and dedicated account management.
              Currently expanding in all major cities.
            </p>
            <a
              href={`https://wa.me/${SITE_CONFIG.whatsapp.replace("+", "")}?text=Hi, I'm interested in becoming a Maxvolt dealer`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-[#FFD100] text-black font-bold hover:bg-[#FFD100]/90 hover:shadow-[0_0_30px_rgba(255,209,0,0.4)] transition-all"
            >
              <MessageCircle size={16} />
              Dealer Inquiry via WhatsApp
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
