"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import PageHero from "@/components/ui/PageHero";
import { Zap, Battery, Gauge, Clock, Bike, Truck, Sun, Home, ArrowRight, MessageCircle, RotateCcw } from "lucide-react";
import { SITE_CONFIG } from "@/lib/constants";

type UseCase = "e-rickshaw" | "e-scooter" | "solar" | "ess";

const USE_CASES = [
  { id: "e-rickshaw" as UseCase, label: "E-Rickshaw", Icon: Truck, voltage: 51.2, recommend: "/products/e-rickshaw-lithium-battery", typicalPower: 1000 },
  { id: "e-scooter" as UseCase, label: "E-Scooter / Bike", Icon: Bike, voltage: 60, recommend: "/products/e-scooter-bike-lithium-battery", typicalPower: 1500 },
  { id: "solar" as UseCase, label: "Solar Storage", Icon: Sun, voltage: 51.2, recommend: "/products/lithium-battery-for-solar-application", typicalPower: 800 },
  { id: "ess" as UseCase, label: "Home / Commercial ESS", Icon: Home, voltage: 51.2, recommend: "/products/lithium-battery-energy-storage-solutions", typicalPower: 2000 },
];

export default function CalculatorContent() {
  const [useCase, setUseCase] = useState<UseCase>("e-rickshaw");
  const [power, setPower] = useState(1000);     // watts (load)
  const [hours, setHours] = useState(8);        // runtime hours
  const [dod, setDod] = useState(80);           // depth of discharge %

  const active = USE_CASES.find((u) => u.id === useCase)!;

  const result = useMemo(() => {
    const voltage = active.voltage;
    // Energy needed (Wh) accounting for usable DoD + ~10% system losses
    const energyWh = (power * hours) / (dod / 100) * 1.1;
    const capacityAh = energyWh / voltage;
    // round up to nearest sensible pack
    const roundedAh = Math.ceil(capacityAh / 5) * 5;
    const range = useCase === "e-rickshaw" || useCase === "e-scooter"
      ? Math.round((energyWh / 1000) * 18) // ~18 km per kWh approx
      : null;
    return {
      voltage,
      energyWh: Math.round(energyWh),
      capacityAh: roundedAh,
      kwh: (energyWh / 1000).toFixed(2),
      range,
    };
  }, [active, power, hours, dod, useCase]);

  const reset = () => { setPower(active.typicalPower); setHours(8); setDod(80); };

  return (
    <>
      <PageHero image="/images/category/powered-with-new-gen-technology-enj.webp"
        badge="Smart Tool"
        title={<>Battery Capacity <span className="gradient-text">Calculator</span></>}
        description="Estimate the ideal Maxvolt lithium battery capacity for your application. Adjust your load, runtime, and usage to get a recommended Ah/Wh rating instantly."
      />

      <section className="section-padding bg-[#f7f7f5]">
        <div className="container-custom max-w-5xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Inputs */}
            <div className="p-7 rounded-2xl frosted-card">
              {/* Use case selector */}
              <label className="block text-[#15171c] font-bold text-sm mb-3">1. Choose your application</label>
              <div className="grid grid-cols-2 gap-2 mb-7">
                {USE_CASES.map(({ id, label, Icon, typicalPower }) => (
                  <button
                    key={id}
                    onClick={() => { setUseCase(id); setPower(typicalPower); }}
                    className="flex items-center gap-2 p-3 rounded-xl text-left transition-all text-sm font-medium"
                    style={
                      useCase === id
                        ? { background: "rgba(255,209,0,0.15)", border: "1px solid rgba(217,119,6,0.4)", color: "#15171c" }
                        : { background: "rgba(0,0,0,0.03)", border: "1px solid rgba(0,0,0,0.06)", color: "#52525b" }
                    }
                  >
                    <Icon size={16} className={useCase === id ? "text-[#D97706]" : "text-[#71717a]"} />
                    {label}
                  </button>
                ))}
              </div>

              {/* Power slider */}
              <SliderRow
                label="2. Power / Load"
                Icon={Gauge}
                value={power} min={200} max={5000} step={50} unit="W"
                onChange={setPower}
              />
              {/* Hours slider */}
              <SliderRow
                label="3. Daily Runtime"
                Icon={Clock}
                value={hours} min={1} max={24} step={1} unit="hrs"
                onChange={setHours}
              />
              {/* DoD slider */}
              <SliderRow
                label="4. Depth of Discharge"
                Icon={Battery}
                value={dod} min={50} max={95} step={5} unit="%"
                onChange={setDod}
              />

              <button
                onClick={reset}
                className="mt-2 flex items-center gap-2 text-[#71717a] hover:text-[#15171c] text-xs font-medium transition-colors"
              >
                <RotateCcw size={12} /> Reset to typical values
              </button>
            </div>

            {/* Result */}
            <div className="p-7 rounded-2xl relative overflow-hidden"
              style={{ background: "linear-gradient(160deg, #fffdf5 0%, #ffffff 100%)", border: "1px solid rgba(217,119,6,0.2)" }}>
              <div className="absolute top-0 right-0 w-40 h-40 rounded-full blur-[80px] pointer-events-none" style={{ background: "rgba(255,209,0,0.18)" }} />

              <div className="relative z-10">
                <div className="flex items-center gap-2 mb-6">
                  <Zap size={18} className="text-[#D97706]" fill="#FFD100" />
                  <span className="text-[#15171c] font-bold">Recommended Battery</span>
                </div>

                <div className="grid grid-cols-2 gap-3 mb-6">
                  <ResultCard label="Capacity" value={`${result.capacityAh} Ah`} highlight />
                  <ResultCard label="System Voltage" value={`${result.voltage} V`} />
                  <ResultCard label="Energy" value={`${result.kwh} kWh`} />
                  <ResultCard label="Energy (Wh)" value={`${result.energyWh.toLocaleString()} Wh`} />
                </div>

                {result.range !== null && (
                  <div className="mb-6 p-4 rounded-xl bg-[#FFD100]/10 border border-[#D97706]/20">
                    <div className="text-[#71717a] text-xs font-medium uppercase tracking-wide mb-1">Estimated Range</div>
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={result.range}
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-[#15171c] font-black text-2xl"
                      >
                        ~{result.range} km <span className="text-sm font-medium text-[#52525b]">per full charge</span>
                      </motion.div>
                    </AnimatePresence>
                  </div>
                )}

                <p className="text-[#52525b] text-xs leading-relaxed mb-6">
                  This estimate includes a {dod}% usable depth of discharge and ~10% system losses.
                  Final specification may vary by cell chemistry, terrain, and load profile — our engineers
                  will confirm the exact pack for you.
                </p>

                <div className="flex flex-col gap-3">
                  <Link
                    href={active.recommend}
                    className="flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-[#FFD100] text-black font-bold text-sm hover:bg-[#FFA800] transition-all"
                  >
                    View Matching {active.label} Battery
                    <ArrowRight size={14} />
                  </Link>
                  <a
                    href={`https://wa.me/${SITE_CONFIG.whatsapp.replace("+", "")}?text=Hi, I used the battery calculator and need a ${result.voltage}V ${result.capacityAh}Ah battery for ${active.label}. Please advise.`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl border border-black/10 text-[#3f3f46] hover:text-[#15171c] font-medium text-sm transition-all"
                  >
                    <MessageCircle size={14} />
                    Get Exact Quote on WhatsApp
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <TcoCalculator />
    </>
  );
}

function TcoCalculator() {
  const [years, setYears] = useState(5);
  const [laPrice, setLaPrice] = useState(28000);   // lead-acid pack price
  const [laLifeM, setLaLifeM] = useState(14);       // lead-acid life (months)
  const [liPrice, setLiPrice] = useState(72000);   // lithium pack price
  const [liLifeY, setLiLifeY] = useState(6);        // lithium life (years)

  const r = useMemo(() => {
    const laReplacements = Math.max(1, Math.ceil((years * 12) / laLifeM));
    const liReplacements = Math.max(1, Math.ceil(years / liLifeY));
    const laTotal = laReplacements * laPrice;
    const liTotal = liReplacements * liPrice;
    const savings = laTotal - liTotal;
    const max = Math.max(laTotal, liTotal, 1);
    return { laReplacements, liReplacements, laTotal, liTotal, savings, laPct: (laTotal / max) * 100, liPct: (liTotal / max) * 100 };
  }, [years, laPrice, laLifeM, liPrice, liLifeY]);

  const inr = (n: number) => "₹" + n.toLocaleString("en-IN");

  return (
    <section className="section-padding bg-white border-t border-black/6">
      <div className="container-custom max-w-5xl">
        <div className="text-center mb-10">
          <span className="text-[#D97706] text-[11px] font-bold tracking-[0.25em] uppercase mb-3 block">Total Cost of Ownership</span>
          <h2 className="text-3xl md:text-4xl font-black text-[#15171c]">Lithium vs <span className="gradient-text">Lead-Acid</span> Savings</h2>
          <p className="text-[#5f6470] text-sm max-w-xl mx-auto mt-3">Lead-acid looks cheaper upfront — but it&apos;s replaced far more often. See the real cost over time.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* inputs */}
          <div className="p-7 rounded-2xl frosted-card">
            <SliderRow label="Ownership Period" Icon={Clock} value={years} min={1} max={10} step={1} unit="yrs" onChange={setYears} />
            <div className="grid grid-cols-2 gap-4">
              <NumRow label="Lead-acid pack price" value={laPrice} step={1000} unit="₹" onChange={setLaPrice} />
              <NumRow label="Lead-acid life" value={laLifeM} step={1} unit="mo" onChange={setLaLifeM} />
              <NumRow label="Maxvolt lithium price" value={liPrice} step={1000} unit="₹" onChange={setLiPrice} />
              <NumRow label="Lithium life" value={liLifeY} step={1} unit="yrs" onChange={setLiLifeY} />
            </div>
          </div>

          {/* result */}
          <div className="p-7 rounded-2xl relative overflow-hidden" style={{ background: "linear-gradient(160deg,#fffdf5 0%,#ffffff 100%)", border: "1px solid rgba(217,119,6,0.2)" }}>
            <div className="text-[#15171c] font-bold mb-5">{years}-year cost comparison</div>
            <div className="space-y-4 mb-6">
              <Bar label={`Lead-Acid (${r.laReplacements} packs)`} amount={inr(r.laTotal)} pct={r.laPct} color="#a1a1aa" />
              <Bar label={`Maxvolt Lithium (${r.liReplacements} pack${r.liReplacements > 1 ? "s" : ""})`} amount={inr(r.liTotal)} pct={r.liPct} color="#D97706" />
            </div>
            <div className="p-4 rounded-xl bg-[#16a34a]/8 border border-[#16a34a]/20">
              <div className="text-[#16a34a] text-[11px] font-bold uppercase tracking-wide mb-1">Estimated Savings with Maxvolt</div>
              <div className="text-[#15171c] font-black text-3xl tabular-nums">{r.savings >= 0 ? inr(r.savings) : "—"}</div>
              <p className="text-[#52525b] text-xs mt-1.5">Plus faster charging, longer range and far less downtime — savings that compound over the battery&apos;s life.</p>
            </div>
            <a href="/request-a-quote" className="mt-5 inline-flex items-center justify-center gap-2 w-full px-6 py-3 rounded-xl bg-[#FFD100] text-black font-bold text-sm hover:bg-[#FFA800] transition-all">
              Get an Exact Quote <ArrowRight size={14} />
            </a>
          </div>
        </div>
        <p className="text-[#a1a1aa] text-[11px] mt-4 text-center">Indicative estimate — actual costs vary by usage, model and operating conditions.</p>
      </div>
    </section>
  );
}

function NumRow({ label, value, step, unit, onChange }: { label: string; value: number; step: number; unit: string; onChange: (v: number) => void }) {
  return (
    <div>
      <label className="block text-[#71717a] text-[11px] font-semibold mb-1.5">{label}</label>
      <div className="flex items-center rounded-xl bg-black/[0.03] border border-black/8 overflow-hidden">
        <span className="px-2.5 text-[#a1a1aa] text-xs">{unit}</span>
        <input type="number" min={0} step={step} value={value} onChange={(e) => onChange(Math.max(0, Number(e.target.value)))}
          className="w-full px-1 py-2.5 bg-transparent text-[#15171c] text-sm font-bold focus:outline-none tabular-nums" />
      </div>
    </div>
  );
}

function Bar({ label, amount, pct, color }: { label: string; amount: string; pct: number; color: string }) {
  return (
    <div>
      <div className="flex items-center justify-between mb-1.5">
        <span className="text-[#52525b] text-xs font-medium">{label}</span>
        <span className="text-[#15171c] text-sm font-black tabular-nums">{amount}</span>
      </div>
      <div className="h-3 rounded-full bg-black/[0.05] overflow-hidden">
        <motion.div className="h-full rounded-full" style={{ backgroundColor: color }} initial={{ width: 0 }} animate={{ width: `${pct}%` }} transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }} />
      </div>
    </div>
  );
}

function SliderRow({ label, Icon, value, min, max, step, unit, onChange }: {
  label: string; Icon: typeof Gauge; value: number; min: number; max: number; step: number; unit: string; onChange: (v: number) => void;
}) {
  return (
    <div className="mb-6">
      <div className="flex items-center justify-between mb-2">
        <label className="flex items-center gap-2 text-[#15171c] font-bold text-sm">
          <Icon size={14} className="text-[#D97706]" />
          {label}
        </label>
        <span className="tabular-nums font-black text-[#D97706]">{value.toLocaleString()} <span className="text-xs text-[#71717a] font-medium">{unit}</span></span>
      </div>
      <input
        type="range"
        min={min} max={max} step={step} value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full accent-[#D97706] h-2 cursor-pointer"
        aria-label={label}
      />
      <div className="flex justify-between text-[10px] text-[#a1a1aa] mt-1">
        <span>{min.toLocaleString()} {unit}</span>
        <span>{max.toLocaleString()} {unit}</span>
      </div>
    </div>
  );
}

function ResultCard({ label, value, highlight }: { label: string; value: string; highlight?: boolean }) {
  return (
    <div
      className="p-4 rounded-xl"
      style={highlight
        ? { background: "rgba(255,209,0,0.15)", border: "1px solid rgba(217,119,6,0.3)" }
        : { background: "rgba(0,0,0,0.03)", border: "1px solid rgba(0,0,0,0.06)" }}
    >
      <div className="text-[#71717a] text-[10px] font-medium uppercase tracking-wide mb-1">{label}</div>
      <div className={`font-black ${highlight ? "text-[#D97706] text-xl" : "text-[#15171c] text-lg"} tabular-nums`}>{value}</div>
    </div>
  );
}
