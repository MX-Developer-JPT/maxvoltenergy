"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, ArrowLeft, Check, Send, Loader2, Truck, Bike, Sun, Home, Boxes, Zap } from "lucide-react";
import PageHero from "@/components/ui/PageHero";

const USE_CASES = [
  { id: "E-Rickshaw", Icon: Truck },
  { id: "E-Scooter / Bike", Icon: Bike },
  { id: "E-Cycle", Icon: Zap },
  { id: "Solar Storage", Icon: Sun },
  { id: "Inverter / Home ESS", Icon: Home },
  { id: "Custom / OEM", Icon: Boxes },
];
const QTYS = ["1–10", "10–50", "50–200", "200–1000", "1000+"];
const TIMELINES = ["Immediately", "Within 1–3 months", "Just exploring"];

export default function RfqContent() {
  const [step, setStep] = useState(0);
  const [done, setDone] = useState(false);
  const [saving, setSaving] = useState(false);
  const [f, setF] = useState({
    useCase: "", quantity: "", voltage: "", capacity: "", timeline: "", notes: "",
    name: "", company: "", email: "", phone: "", city: "",
  });
  const set = (k: string, v: string) => setF((s) => ({ ...s, [k]: v }));

  const canNext = step === 0 ? f.useCase && f.quantity : step === 1 ? f.timeline : true;

  const submit = async () => {
    setSaving(true);
    const message =
      `RFQ — ${f.useCase}\n` +
      `Quantity: ${f.quantity}\nVoltage: ${f.voltage || "—"}\nCapacity: ${f.capacity || "—"}\n` +
      `Timeline: ${f.timeline}\nCompany: ${f.company || "—"}\nCity: ${f.city || "—"}\n` +
      `Notes: ${f.notes || "—"}`;
    try {
      await fetch("/api/enquiries", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: f.name, email: f.email, phone: f.phone,
          subject: `Quote request — ${f.useCase}`, message, inquiryType: "rfq", source: "/request-a-quote",
        }),
      });
    } catch { /* still show success */ }
    setSaving(false);
    setDone(true);
  };

  return (
    <>
      <PageHero
        image="/images/overview/oem-partnership.png"
        badge="Request a Quote"
        title={<>Build Your <span className="gradient-text">Battery Quote</span></>}
        description="Tell us what you need in three quick steps — our team replies with pricing, specs and lead times, usually within 24 hours."
      />

      <section className="section-padding bg-[#f7f7f5]">
        <div className="container-custom max-w-2xl">
          {done ? (
            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="p-10 rounded-2xl frosted-card text-center">
              <div className="w-16 h-16 rounded-full bg-[#16a34a]/12 border border-[#16a34a]/30 flex items-center justify-center mx-auto mb-5">
                <Check size={26} className="text-[#16a34a]" />
              </div>
              <h2 className="text-2xl font-black text-[#15171c] mb-2">Quote request received!</h2>
              <p className="text-[#52525b] text-sm mb-6">Thanks {f.name?.split(" ")[0] || "there"} — our team will get back to you within 24 hours with pricing and specs for your {f.useCase.toLowerCase()} requirement.</p>
              <Link href="/products" className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#FFD100] text-black font-bold text-sm hover:bg-[#FFA800] transition-all">
                Explore Products <ArrowRight size={14} />
              </Link>
            </motion.div>
          ) : (
            <>
              {/* progress */}
              <div className="flex items-center gap-2 mb-8">
                {["Application", "Requirements", "Your details"].map((label, i) => (
                  <div key={label} className="flex-1">
                    <div className="h-1.5 rounded-full overflow-hidden bg-black/8">
                      <motion.div className="h-full rounded-full bg-gradient-to-r from-[#FFD100] to-[#D97706]" animate={{ width: step >= i ? "100%" : "0%" }} transition={{ duration: 0.4 }} />
                    </div>
                    <span className={`text-[11px] font-semibold mt-1.5 block ${step >= i ? "text-[#D97706]" : "text-[#a1a1aa]"}`}>{i + 1}. {label}</span>
                  </div>
                ))}
              </div>

              <div className="p-6 md:p-8 rounded-2xl frosted-card">
                <AnimatePresence mode="wait">
                  <motion.div key={step} initial={{ opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -24 }} transition={{ duration: 0.3 }}>
                    {step === 0 && (
                      <div>
                        <h3 className="text-[#15171c] font-bold text-lg mb-4">What is the battery for?</h3>
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 mb-6">
                          {USE_CASES.map(({ id, Icon }) => (
                            <button key={id} onClick={() => set("useCase", id)}
                              className="p-3 rounded-xl border text-left transition-all flex flex-col gap-2"
                              style={f.useCase === id ? { background: "rgba(255,209,0,0.12)", borderColor: "rgba(217,119,6,0.4)" } : { background: "#fff", borderColor: "rgba(0,0,0,0.08)" }}>
                              <Icon size={18} className={f.useCase === id ? "text-[#D97706]" : "text-[#a1a1aa]"} />
                              <span className="text-[#15171c] text-xs font-semibold">{id}</span>
                            </button>
                          ))}
                        </div>
                        <label className="block text-[#52525b] text-xs font-semibold mb-2">Estimated quantity</label>
                        <div className="flex flex-wrap gap-2">
                          {QTYS.map((q) => (
                            <button key={q} onClick={() => set("quantity", q)}
                              className="px-3.5 py-2 rounded-xl text-sm font-medium transition-all border"
                              style={f.quantity === q ? { background: "#FFD100", borderColor: "#FFD100", color: "#000" } : { background: "#fff", borderColor: "rgba(0,0,0,0.08)", color: "#52525b" }}>
                              {q}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}

                    {step === 1 && (
                      <div>
                        <h3 className="text-[#15171c] font-bold text-lg mb-4">Your requirements</h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
                          <Field label="Voltage (optional)"><input value={f.voltage} onChange={(e) => set("voltage", e.target.value)} placeholder="e.g. 51.2V" className={inputCls} /></Field>
                          <Field label="Capacity (optional)"><input value={f.capacity} onChange={(e) => set("capacity", e.target.value)} placeholder="e.g. 100Ah" className={inputCls} /></Field>
                        </div>
                        <label className="block text-[#52525b] text-xs font-semibold mb-2">When do you need it?</label>
                        <div className="flex flex-wrap gap-2 mb-4">
                          {TIMELINES.map((t) => (
                            <button key={t} onClick={() => set("timeline", t)}
                              className="px-3.5 py-2 rounded-xl text-sm font-medium transition-all border"
                              style={f.timeline === t ? { background: "#FFD100", borderColor: "#FFD100", color: "#000" } : { background: "#fff", borderColor: "rgba(0,0,0,0.08)", color: "#52525b" }}>
                              {t}
                            </button>
                          ))}
                        </div>
                        <Field label="Anything else? (optional)"><textarea value={f.notes} onChange={(e) => set("notes", e.target.value)} rows={3} placeholder="Application details, fitment, certifications…" className={inputCls + " resize-none"} /></Field>
                      </div>
                    )}

                    {step === 2 && (
                      <div>
                        <h3 className="text-[#15171c] font-bold text-lg mb-4">Where should we send the quote?</h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          <Field label="Full name *"><input required value={f.name} onChange={(e) => set("name", e.target.value)} className={inputCls} /></Field>
                          <Field label="Company (optional)"><input value={f.company} onChange={(e) => set("company", e.target.value)} className={inputCls} /></Field>
                          <Field label="Email *"><input type="email" required value={f.email} onChange={(e) => set("email", e.target.value)} className={inputCls} /></Field>
                          <Field label="Phone *"><input type="tel" required value={f.phone} onChange={(e) => set("phone", e.target.value)} className={inputCls} /></Field>
                          <Field label="City"><input value={f.city} onChange={(e) => set("city", e.target.value)} className={inputCls} /></Field>
                        </div>
                      </div>
                    )}
                  </motion.div>
                </AnimatePresence>

                {/* nav */}
                <div className="flex items-center justify-between mt-7 pt-5 border-t border-black/6">
                  <button onClick={() => setStep((s) => Math.max(0, s - 1))} disabled={step === 0}
                    className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#71717a] hover:text-[#15171c] disabled:opacity-0 transition-all">
                    <ArrowLeft size={14} /> Back
                  </button>
                  {step < 2 ? (
                    <button onClick={() => canNext && setStep((s) => s + 1)} disabled={!canNext}
                      className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#FFD100] text-black font-bold text-sm hover:bg-[#FFA800] transition-all disabled:opacity-50">
                      Continue <ArrowRight size={14} />
                    </button>
                  ) : (
                    <button onClick={submit} disabled={saving || !f.name || !f.email || !f.phone}
                      className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#FFD100] text-black font-bold text-sm hover:bg-[#FFA800] transition-all disabled:opacity-50">
                      {saving ? <Loader2 size={14} className="animate-spin" /> : <Send size={14} />} Submit Request
                    </button>
                  )}
                </div>
              </div>
            </>
          )}
        </div>
      </section>
    </>
  );
}

const inputCls = "w-full px-3.5 py-2.5 rounded-xl bg-white border border-black/10 text-[#15171c] text-sm focus:outline-none focus:border-[#D97706]/50";

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="block text-[#52525b] text-xs font-semibold mb-1.5">{label}</label>
      {children}
    </div>
  );
}
