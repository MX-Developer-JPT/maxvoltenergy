"use client";

import { useState, useMemo, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import PageHero from "@/components/ui/PageHero";
import {
  MapPin, Phone, Search, Navigation, Wrench, Store, Factory, Building2,
  X, MessageCircle, Mail, ChevronDown,
} from "lucide-react";
import { SITE_CONFIG } from "@/lib/constants";
import { DEALERS, STATE_CENTROIDS, type Dealer } from "@/lib/dealers";

const REGIONS = ["All", "North", "Central", "East", "West", "South"] as const;
const TYPES = ["All", "Dealer", "Distributor", "OEM", "End User"] as const;
const STATES = ["All", ...Array.from(new Set(DEALERS.map((d) => d.state))).sort()];

const TYPE_ICON: Record<string, typeof Store> = {
  Dealer: Store, Distributor: Building2, OEM: Factory, "End User": Wrench,
};

// Application range available across the network (asset images).
const RANGE = [
  { src: "/asset/rickshaw-with-battery.webp", label: "E-Rickshaw Batteries", href: "/products/e-rickshaw-lithium-battery" },
  { src: "/asset/scooter-with-battery.webp", label: "E-Scooter / Bike Batteries", href: "/products/e-scooter-bike-lithium-battery" },
  { src: "/asset/inverter-with-battery.webp", label: "Inverter & Backup", href: "/products/lithium-battery-energy-storage-solutions" },
  { src: "/asset/solar-panel-with-battery.webp", label: "Solar Storage", href: "/products/lithium-battery-for-solar-application" },
];

// Project lat/lng to a 0-100 box over India's bounds
function project(lat: number, lng: number) {
  const minLat = 8, maxLat = 35, minLng = 68, maxLng = 92;
  const x = ((lng - minLng) / (maxLng - minLng)) * 100;
  const y = (1 - (lat - minLat) / (maxLat - minLat)) * 100;
  return { x, y };
}

function telHref(phone: string) {
  const m = phone.match(/\d[\d\s-]{6,}\d/);
  const digits = (m ? m[0] : phone).replace(/\D/g, "");
  if (!digits) return "";
  return digits.length === 10 ? `+91${digits}` : `+${digits.replace(/^0+/, "")}`;
}
function isEmail(e: string) { return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e); }

const PAGE = 24;

export default function DealerLocatorContent() {
  const [region, setRegion] = useState<(typeof REGIONS)[number]>("All");
  const [stateFilter, setStateFilter] = useState<string>("All");
  const [typeFilter, setTypeFilter] = useState<(typeof TYPES)[number]>("All");
  const [query, setQuery] = useState("");
  const [visible, setVisible] = useState(PAGE);
  const [active, setActive] = useState<Dealer | null>(null);

  const filtered = useMemo(() => {
    const q = query.toLowerCase().trim();
    return DEALERS.filter((d) => {
      const matchRegion = region === "All" || d.region === region;
      const matchState = stateFilter === "All" || d.state === stateFilter;
      const matchType = typeFilter === "All" || d.type === typeFilter;
      const matchQuery = !q ||
        d.city.toLowerCase().includes(q) || d.state.toLowerCase().includes(q) ||
        d.name.toLowerCase().includes(q) || d.pincode.includes(q) ||
        d.address.toLowerCase().includes(q);
      return matchRegion && matchState && matchType && matchQuery;
    });
  }, [region, stateFilter, typeFilter, query]);

  useEffect(() => { setVisible(PAGE); }, [region, stateFilter, typeFilter, query]);

  // Aggregate dealer counts per state for the network map.
  const stateAgg = useMemo(() => {
    const counts: Record<string, number> = {};
    filtered.forEach((d) => { counts[d.state] = (counts[d.state] || 0) + 1; });
    return Object.keys(STATE_CENTROIDS).map((state) => ({
      state,
      count: counts[state] || 0,
      ...STATE_CENTROIDS[state],
    }));
  }, [filtered]);

  const totalCities = useMemo(() => new Set(DEALERS.map((d) => d.city)).size, []);
  const totalStates = STATES.length - 1;
  const maxCount = Math.max(1, ...stateAgg.map((s) => s.count));

  const stats = [
    { value: `${DEALERS.length}`, label: "Network Partners" },
    { value: `${totalStates}`, label: "States Covered" },
    { value: `${totalCities}`, label: "Cities & Towns" },
    { value: `${DEALERS.filter((d) => d.type === "OEM").length}`, label: "OEM Partners" },
  ];

  const clearAll = () => { setStateFilter("All"); setTypeFilter("All"); setRegion("All"); setQuery(""); };
  const anyFilter = stateFilter !== "All" || typeFilter !== "All" || region !== "All" || query;

  return (
    <>
      <PageHero
        badge="Dealer Locator"
        title={<>Find a Maxvolt <span className="gradient-text">Dealer Near You</span></>}
        description="Our growing network of dealers, distributors and OEM partners spans 20 states across India. Search by city, state or pincode to find your nearest Maxvolt Energy point of sale and support."
      />

      {/* Stats */}
      <section className="py-10 bg-[#0b0b0d] relative overflow-hidden">
        <div className="absolute inset-0 grid-pattern opacity-[0.07]" />
        <div className="container-custom relative z-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {stats.map((s) => (
              <div key={s.label} className="text-center p-4 rounded-2xl bg-white/[0.03] border border-white/8">
                <div className="text-3xl font-black gradient-text tabular-nums">{s.value}</div>
                <div className="text-white/55 text-[11px] mt-1 uppercase tracking-wide">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding bg-[#f7f7f5]">
        <div className="container-custom">
          {/* Search + region filters */}
          <div className="flex flex-col md:flex-row gap-4 mb-5">
            <div className="relative flex-1">
              <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#a1a1aa]" />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search by city, state, pincode or dealer name…"
                className="w-full pl-11 pr-4 py-3.5 rounded-xl bg-white border border-black/8 text-[#15171c] text-sm placeholder:text-[#a1a1aa] focus:outline-none focus:border-[#D97706]/50 transition-colors"
              />
            </div>
            <div className="flex gap-2 flex-wrap">
              {REGIONS.map((r) => (
                <button
                  key={r}
                  onClick={() => setRegion(r)}
                  className="px-4 py-2 rounded-xl text-sm font-medium transition-all"
                  style={region === r
                    ? { background: "#FFD100", color: "#000" }
                    : { background: "#fff", border: "1px solid rgba(0,0,0,0.08)", color: "#52525b" }}
                >
                  {r}
                </button>
              ))}
            </div>
          </div>

          {/* State + type dropdowns */}
          <div className="flex flex-col sm:flex-row gap-3 mb-8">
            <div className="flex-1">
              <label className="block text-[#71717a] text-[11px] font-bold uppercase tracking-wide mb-1.5">State</label>
              <select value={stateFilter} onChange={(e) => setStateFilter(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-white border border-black/8 text-[#15171c] text-sm focus:outline-none focus:border-[#D97706]/50">
                {STATES.map((s) => <option key={s} value={s}>{s === "All" ? "All States" : s}</option>)}
              </select>
            </div>
            <div className="flex-1">
              <label className="block text-[#71717a] text-[11px] font-bold uppercase tracking-wide mb-1.5">Partner Type</label>
              <select value={typeFilter} onChange={(e) => setTypeFilter(e.target.value as (typeof TYPES)[number])}
                className="w-full px-4 py-3 rounded-xl bg-white border border-black/8 text-[#15171c] text-sm focus:outline-none focus:border-[#D97706]/50">
                {TYPES.map((t) => <option key={t} value={t}>{t === "All" ? "All Types" : t}</option>)}
              </select>
            </div>
            {anyFilter && (
              <div className="flex items-end">
                <button onClick={clearAll}
                  className="px-4 py-3 rounded-xl border border-black/8 text-[#52525b] text-sm font-medium hover:text-[#15171c] hover:border-[#D97706]/30 transition-all whitespace-nowrap">
                  Clear Filters
                </button>
              </div>
            )}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
            {/* Map */}
            <div className="lg:col-span-2 order-2 lg:order-1">
              <div className="sticky top-24 rounded-2xl frosted-card p-5 overflow-hidden">
                <div className="text-[#15171c] font-bold text-sm mb-4 flex items-center gap-2">
                  <Navigation size={14} className="text-[#D97706]" /> Network Map by State
                </div>
                <div className="relative w-full rounded-xl bg-[#f0f0ea] border border-black/6 overflow-hidden" style={{ aspectRatio: "3/4" }}>
                  <div className="absolute inset-0 dot-pattern opacity-40" />
                  {stateAgg.map((s) => {
                    const { x, y } = project(s.lat, s.lng);
                    const emphasized = (stateFilter === "All" || stateFilter === s.state) && s.count > 0;
                    const size = 10 + Math.sqrt(s.count) * 3.4;
                    return (
                      <button
                        key={s.state}
                        onClick={() => { setStateFilter(s.state); setRegion("All"); }}
                        className="absolute -translate-x-1/2 -translate-y-1/2 group"
                        style={{ left: `${x}%`, top: `${y}%`, zIndex: emphasized ? 10 : 1 }}
                        aria-label={`${s.state}: ${s.count} partners`}
                        title={`${s.state} — ${s.count} partner${s.count === 1 ? "" : "s"}`}
                      >
                        <span className="block rounded-full transition-all" style={{
                          width: s.count ? size : 6,
                          height: s.count ? size : 6,
                          background: emphasized ? "#D97706" : s.count ? "rgba(217,119,6,0.35)" : "rgba(0,0,0,0.15)",
                          boxShadow: emphasized ? "0 0 0 4px rgba(255,209,0,0.25)" : "none",
                        }} />
                        {s.count > 0 && (
                          <span className="absolute left-1/2 -translate-x-1/2 -bottom-4 text-[8px] font-bold text-[#15171c] opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                            {s.count}
                          </span>
                        )}
                      </button>
                    );
                  })}
                </div>
                <p className="text-[#71717a] text-[11px] mt-3 leading-relaxed">
                  Bubble size reflects partner density. Tap a state to filter. Showing{" "}
                  <span className="text-[#D97706] font-bold">{filtered.length}</span> of {DEALERS.length} partners.
                </p>
              </div>
            </div>

            {/* List */}
            <div className="lg:col-span-3 order-1 lg:order-2">
              <div className="space-y-3">
                {filtered.slice(0, visible).map((d, i) => {
                  const Icon = TYPE_ICON[d.type] || Store;
                  const tel = telHref(d.phone);
                  return (
                    <motion.div
                      key={`${d.name}-${d.city}-${i}`}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.25, delay: Math.min((i % PAGE) * 0.015, 0.25) }}
                      className="p-5 rounded-2xl frosted-card hover:border-[#D97706]/25 transition-all"
                    >
                      <div className="flex items-start gap-4">
                        <div className="w-11 h-11 rounded-xl bg-[#FFD100]/15 border border-[#D97706]/20 flex items-center justify-center shrink-0">
                          <Icon size={16} className="text-[#D97706]" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 flex-wrap mb-1">
                            <h3 className="text-[#15171c] font-bold text-sm">{d.name}</h3>
                            <span className="text-[9px] font-bold uppercase tracking-wide px-2 py-0.5 rounded-full bg-black/[0.04] text-[#71717a] border border-black/6">{d.type}</span>
                          </div>
                          <div className="flex items-start gap-1.5 text-[#52525b] text-xs mb-2">
                            <MapPin size={11} className="text-[#a1a1aa] shrink-0 mt-0.5" /> <span className="leading-relaxed">{d.address}</span>
                          </div>
                          <div className="flex items-center gap-4 flex-wrap">
                            {tel && (
                              <a href={`tel:${tel}`} className="flex items-center gap-1.5 text-[#D97706] text-xs font-semibold hover:underline">
                                <Phone size={11} /> {d.phone}
                              </a>
                            )}
                            {isEmail(d.email) && (
                              <a href={`mailto:${d.email}`} className="flex items-center gap-1.5 text-[#52525b] text-xs font-medium hover:text-[#15171c]">
                                <Mail size={11} /> Email
                              </a>
                            )}
                            <a
                              href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${d.name} ${d.city} ${d.state} ${d.pincode}`)}`}
                              target="_blank" rel="noopener noreferrer"
                              className="flex items-center gap-1.5 text-[#52525b] text-xs font-medium hover:text-[#15171c]"
                            >
                              <Navigation size={11} /> Directions
                            </a>
                          </div>
                        </div>
                        <span className="text-[#a1a1aa] text-[11px] shrink-0 text-right">{d.city}<br /><span className="text-[#c4c4cc]">{d.pincode}</span></span>
                      </div>
                    </motion.div>
                  );
                })}
              </div>

              {/* Load more */}
              {visible < filtered.length && (
                <div className="text-center mt-6">
                  <button onClick={() => setVisible((v) => v + PAGE)}
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white border border-black/10 text-[#15171c] text-sm font-bold hover:border-[#D97706]/40 transition-all">
                    Load More <span className="text-[#71717a] font-medium">({filtered.length - visible} more)</span> <ChevronDown size={15} />
                  </button>
                </div>
              )}

              {filtered.length === 0 && (
                <div className="p-10 rounded-2xl frosted-card text-center">
                  <MapPin size={28} className="text-[#a1a1aa] mx-auto mb-3" />
                  <h3 className="text-[#15171c] font-bold mb-1">No partner found in this area</h3>
                  <p className="text-[#71717a] text-sm mb-5">We&apos;re expanding fast. Contact us and we&apos;ll connect you with the nearest dealer or set up a new one.</p>
                  <a
                    href={`https://wa.me/${SITE_CONFIG.whatsapp.replace("+", "")}?text=Hi, I'm looking for a Maxvolt dealer near ${query || "my city"}.`}
                    target="_blank" rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#FFD100] text-black font-bold text-sm hover:bg-[#FFA800] transition-all"
                  >
                    <MessageCircle size={14} /> Ask on WhatsApp
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Product range available across the network */}
      <section className="section-padding bg-white border-t border-black/6">
        <div className="container-custom">
          <div className="text-center mb-10">
            <span className="text-[#D97706] text-[11px] font-bold tracking-[0.25em] uppercase mb-3 block">Available Across Our Network</span>
            <h2 className="text-3xl md:text-4xl font-black text-[#15171c]">The Full Maxvolt <span className="gradient-text">Range</span></h2>
            <p className="text-[#5f6470] text-sm max-w-xl mx-auto mt-3">Every authorized partner stocks and services Maxvolt&apos;s AIS 156-certified lithium battery line-up.</p>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
            {RANGE.map((r, i) => (
              <motion.a
                key={r.label}
                href={r.href}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="group block rounded-2xl frosted-card border border-black/6 hover:border-[#D97706]/30 hover:-translate-y-1 transition-all overflow-hidden"
              >
                <div className="relative h-44 flex items-center justify-center overflow-hidden" style={{ background: "radial-gradient(circle at 50% 40%, rgba(255,209,0,0.12) 0%, transparent 70%)" }}>
                  <Image src={r.src} alt={r.label} width={300} height={220} className="object-contain h-36 w-auto group-hover:scale-105 transition-transform duration-500 drop-shadow-xl" />
                </div>
                <div className="p-4 text-center">
                  <h3 className="text-[#15171c] font-bold text-sm group-hover:text-[#D97706] transition-colors">{r.label}</h3>
                </div>
              </motion.a>
            ))}
          </div>
        </div>
      </section>

      {/* Become a dealer CTA */}
      <section className="py-16 bg-[#f7f7f5] border-t border-black/6">
        <div className="container-custom text-center">
          <h2 className="text-3xl font-black text-[#15171c] mb-3">Want to become a <span className="gradient-text">Maxvolt Dealer?</span></h2>
          <p className="text-[#52525b] text-sm max-w-md mx-auto mb-7">Join our growing partner network. Competitive margins, technical training, and marketing support across India.</p>
          <a href="/become-a-dealer" className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl bg-[#FFD100] text-black font-bold text-sm hover:bg-[#FFA800] transition-all">
            Apply for Dealership
          </a>
        </div>
      </section>

      {/* Active dealer modal (mobile) */}
      <AnimatePresence>
        {active && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={() => setActive(null)}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 backdrop-blur-sm p-4 lg:hidden"
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.9, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-2xl p-6 max-w-sm w-full relative"
            >
              <button onClick={() => setActive(null)} className="absolute top-4 right-4 text-[#a1a1aa]"><X size={18} /></button>
              <h3 className="text-[#15171c] font-bold mb-1 pr-6">{active.name}</h3>
              <p className="text-[#52525b] text-sm mb-3">{active.address}</p>
              <a href={`tel:${telHref(active.phone)}`} className="flex items-center gap-2 text-[#D97706] font-semibold text-sm"><Phone size={13} /> {active.phone}</a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
