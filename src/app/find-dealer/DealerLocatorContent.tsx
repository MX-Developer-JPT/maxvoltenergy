"use client";

import { useState, useMemo, useEffect, useRef } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import PageHero from "@/components/ui/PageHero";
import { MapPin, Phone, Search, Store, MessageCircle, Mail, ChevronDown, RotateCcw } from "lucide-react";
import { SITE_CONFIG } from "@/lib/constants";
import type { Dealer } from "@/lib/dealers";
import type { IndiaStatePath } from "@/lib/india-map";

const REGIONS = ["All", "North", "Central", "East", "West", "South"] as const;

const RANGE = [
  { src: "/asset/rickshaw-with-battery.webp", label: "E-Rickshaw Batteries", href: "/products/e-rickshaw-lithium-battery" },
  { src: "/asset/scooter-with-battery.webp", label: "E-Scooter / Bike Batteries", href: "/products/e-scooter-bike-lithium-battery" },
  { src: "/asset/inverter-with-battery.webp", label: "Inverter & Backup", href: "/products/lithium-battery-energy-storage-solutions" },
  { src: "/asset/solar-panel-with-battery.webp", label: "Solar Storage", href: "/products/lithium-battery-for-solar-application" },
];

function telHref(phone: string) {
  const m = phone.match(/\d[\d\s-]{6,}\d/);
  const digits = (m ? m[0] : phone).replace(/\D/g, "");
  if (!digits) return "";
  return digits.length === 10 ? `+91${digits}` : `+${digits.replace(/^0+/, "")}`;
}
function isEmail(e: string) { return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e); }
function lerpColor(a: number[], b: number[], t: number) {
  const c = a.map((v, i) => Math.round(v + (b[i] - v) * t));
  return `rgb(${c[0]},${c[1]},${c[2]})`;
}

const PAGE = 24;

interface Stats { dealers: number; states: number; cities: number; pincodes: number }

export default function DealerLocatorContent({ stats }: { stats: Stats }) {
  const [region, setRegion] = useState<(typeof REGIONS)[number]>("All");
  const [stateFilter, setStateFilter] = useState<string>("All");
  const [query, setQuery] = useState("");
  const [visible, setVisible] = useState(PAGE);
  const [hover, setHover] = useState<{ name: string; count: number; x: number; y: number } | null>(null);
  const mapWrap = useRef<HTMLDivElement>(null);

  // Heavy data loaded after first paint (kept out of the initial bundle).
  const [dealers, setDealers] = useState<Dealer[]>([]);
  const [mapStates, setMapStates] = useState<IndiaStatePath[]>([]);
  const [mapViewBox, setMapViewBox] = useState("0 0 1000 1116");
  const dealersLoaded = dealers.length > 0;

  useEffect(() => {
    let alive = true;
    fetch("/api/dealers").then((r) => r.json()).then((d) => { if (alive) setDealers(d.dealers || []); }).catch(() => {});
    import("@/lib/india-map").then((m) => { if (alive) { setMapStates(m.INDIA_STATES); setMapViewBox(m.INDIA_VIEWBOX); } }).catch(() => {});
    return () => { alive = false; };
  }, []);

  const statesList = useMemo(() => ["All", ...Array.from(new Set(dealers.map((d) => d.state))).sort()], [dealers]);
  const stateRegion = useMemo(() => {
    const m: Record<string, string> = {};
    dealers.forEach((d) => { m[d.state] = d.region; });
    return m;
  }, [dealers]);
  const countByState = useMemo(() => {
    const m: Record<string, number> = {};
    dealers.forEach((d) => { m[d.state] = (m[d.state] || 0) + 1; });
    return m;
  }, [dealers]);
  const maxCount = useMemo(() => Math.max(1, ...Object.values(countByState)), [countByState]);

  const filtered = useMemo(() => {
    const q = query.toLowerCase().trim();
    return dealers.filter((d) => {
      const matchRegion = region === "All" || d.region === region;
      const matchState = stateFilter === "All" || d.state === stateFilter;
      const matchQuery = !q ||
        d.city.toLowerCase().includes(q) || d.state.toLowerCase().includes(q) ||
        d.name.toLowerCase().includes(q) || d.pincode.includes(q) ||
        d.address.toLowerCase().includes(q);
      return matchRegion && matchState && matchQuery;
    });
  }, [dealers, region, stateFilter, query]);

  useEffect(() => { setVisible(PAGE); }, [region, stateFilter, query]);

  const statBoxes = [
    { value: `${stats.dealers}`, label: "Authorized Dealers" },
    { value: `${stats.states}`, label: "States Covered" },
    { value: `${stats.cities}`, label: "Cities & Towns" },
    { value: `${stats.pincodes}`, label: "Pincodes Served" },
  ];

  const clearAll = () => { setStateFilter("All"); setRegion("All"); setQuery(""); };
  const anyFilter = stateFilter !== "All" || region !== "All" || query;

  const stateActive = (name: string) =>
    (stateFilter === "All" || stateFilter === name) && (region === "All" || stateRegion[name] === region);

  const onStateClick = (name: string) => {
    if (!countByState[name]) return;
    setRegion("All");
    setStateFilter((s) => (s === name ? "All" : name));
  };

  return (
    <>
      <PageHero image="/images/overview/pan-india-presence.png"
        badge="Dealer Locator"
        title={<>Find a Maxvolt <span className="gradient-text">Dealer Near You</span></>}
        description="Our growing network of authorized dealers spans 20 states across India. Explore the interactive map or search by city, state or pincode to find your nearest Maxvolt Energy point of sale and support."
      />

      {/* Stats */}
      <section className="py-10 bg-[#0b0b0d] section-dark relative overflow-hidden">
        <div className="absolute inset-0 grid-pattern opacity-[0.07]" />
        <div className="container-custom relative z-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {statBoxes.map((s) => (
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
                aria-label="Search dealers"
                className="w-full pl-11 pr-4 py-3.5 rounded-xl bg-white border border-black/8 text-[#15171c] text-sm placeholder:text-[#a1a1aa] focus:outline-none focus:border-[#D97706]/50 transition-colors"
              />
            </div>
            <div className="flex gap-2 flex-wrap">
              {REGIONS.map((r) => (
                <button
                  key={r}
                  onClick={() => { setRegion(r); setStateFilter("All"); }}
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

          {/* State dropdown */}
          <div className="flex flex-col sm:flex-row gap-3 mb-8">
            <div className="flex-1">
              <label htmlFor="state-filter" className="block text-[#71717a] text-[11px] font-bold uppercase tracking-wide mb-1.5">State</label>
              <select id="state-filter" value={stateFilter} onChange={(e) => { setStateFilter(e.target.value); setRegion("All"); }}
                className="w-full px-4 py-3 rounded-xl bg-white border border-black/8 text-[#15171c] text-sm focus:outline-none focus:border-[#D97706]/50">
                {statesList.map((s) => <option key={s} value={s}>{s === "All" ? "All States" : `${s} (${countByState[s] || 0})`}</option>)}
              </select>
            </div>
            {anyFilter && (
              <div className="flex items-end">
                <button onClick={clearAll}
                  className="px-4 py-3 rounded-xl border border-black/8 text-[#52525b] text-sm font-medium hover:text-[#15171c] hover:border-[#D97706]/30 transition-all whitespace-nowrap flex items-center gap-2">
                  <RotateCcw size={13} /> Clear Filters
                </button>
              </div>
            )}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
            {/* Interactive India map */}
            <div className="lg:col-span-2 order-2 lg:order-1">
              <div className="sticky top-24 rounded-2xl frosted-card p-5">
                <div className="text-[#15171c] font-bold text-sm mb-3 flex items-center gap-2">
                  <MapPin size={14} className="text-[#D97706]" /> Interactive Network Map
                </div>

                <div ref={mapWrap} className="relative w-full" onMouseLeave={() => setHover(null)}>
                  {mapStates.length === 0 ? (
                    <div className="w-full rounded-xl bg-black/[0.04] animate-pulse" style={{ aspectRatio: "1000 / 1116" }} />
                  ) : (
                    <svg viewBox={mapViewBox} className="w-full h-auto" style={{ maxHeight: "70vh" }} role="img" aria-label="Map of India showing Maxvolt dealer density by state">
                      {mapStates.map((s) => {
                        const count = countByState[s.name] || 0;
                        const active = stateActive(s.name);
                        const isSel = stateFilter === s.name;
                        const t = count ? Math.sqrt(count) / Math.sqrt(maxCount) : 0;
                        const base = count ? lerpColor([253, 236, 206], [217, 119, 6], t) : "#e7e7e0";
                        return (
                          <path
                            key={s.name}
                            d={s.d}
                            fill={base}
                            stroke={isSel ? "#15171c" : "#ffffff"}
                            strokeWidth={isSel ? 2.4 : 0.8}
                            style={{ cursor: count ? "pointer" : "default", opacity: active ? 1 : 0.32, transition: "opacity .2s, fill .2s" }}
                            onMouseEnter={(e) => {
                              const r = mapWrap.current?.getBoundingClientRect();
                              const b = (e.target as SVGPathElement).getBoundingClientRect();
                              if (r) setHover({ name: s.name, count, x: b.x - r.x + b.width / 2, y: b.y - r.y });
                            }}
                            onClick={() => onStateClick(s.name)}
                          />
                        );
                      })}
                    </svg>
                  )}

                  {hover && (
                    <div className="pointer-events-none absolute z-20 -translate-x-1/2 -translate-y-full" style={{ left: hover.x, top: hover.y - 6 }}>
                      <div className="px-3 py-1.5 rounded-lg bg-[#15171c] text-white text-xs font-semibold whitespace-nowrap shadow-lg">
                        {hover.name}<span className="text-[#FFD100]"> · {hover.count} dealer{hover.count === 1 ? "" : "s"}</span>
                      </div>
                    </div>
                  )}
                </div>

                {/* Legend */}
                <div className="flex items-center justify-between mt-3 gap-3">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] text-[#a1a1aa]">Fewer</span>
                    <div className="h-2 w-24 rounded-full" style={{ background: "linear-gradient(90deg, rgb(253,236,206), rgb(217,119,6))" }} />
                    <span className="text-[10px] text-[#a1a1aa]">More</span>
                  </div>
                  <span className="text-[#71717a] text-[11px]">
                    <span className="text-[#D97706] font-bold">{dealersLoaded ? filtered.length : stats.dealers}</span> of {stats.dealers}
                  </span>
                </div>
                <p className="text-[#71717a] text-[11px] mt-2 leading-relaxed">Tap a highlighted state to filter the list. Shade reflects dealer density.</p>
              </div>
            </div>

            {/* List */}
            <div className="lg:col-span-3 order-1 lg:order-2">
              {!dealersLoaded ? (
                <div className="space-y-3">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <div key={i} className="p-5 rounded-2xl frosted-card animate-pulse">
                      <div className="flex items-start gap-4">
                        <div className="w-11 h-11 rounded-xl bg-black/[0.06]" />
                        <div className="flex-1 space-y-2">
                          <div className="h-3.5 w-2/3 rounded bg-black/[0.06]" />
                          <div className="h-3 w-full rounded bg-black/[0.04]" />
                          <div className="h-3 w-1/3 rounded bg-black/[0.05]" />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <>
                  <div className="space-y-3">
                    {filtered.slice(0, visible).map((d, i) => {
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
                              <Store size={16} className="text-[#D97706]" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-2 flex-wrap mb-1">
                                <h3 className="text-[#15171c] font-bold text-sm">{d.name}</h3>
                                <span className="text-[9px] font-bold uppercase tracking-wide px-2 py-0.5 rounded-full bg-black/[0.04] text-[#71717a] border border-black/6">Authorized Dealer</span>
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
                              </div>
                            </div>
                            <span className="text-[#a1a1aa] text-[11px] shrink-0 text-right">{d.city}<br /><span className="text-[#c4c4cc]">{d.pincode}</span></span>
                          </div>
                        </motion.div>
                      );
                    })}
                  </div>

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
                      <h3 className="text-[#15171c] font-bold mb-1">No dealer found in this area</h3>
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
                </>
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
            <p className="text-[#5f6470] text-sm max-w-xl mx-auto mt-3">Every authorized dealer stocks and services Maxvolt&apos;s AIS 156-certified lithium battery line-up.</p>
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
          <p className="text-[#52525b] text-sm max-w-md mx-auto mb-7">Join our growing dealer network. Competitive margins, technical training, and marketing support across India.</p>
          <a href="/become-a-dealer" className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl bg-[#FFD100] text-black font-bold text-sm hover:bg-[#FFA800] transition-all">
            Apply for Dealership
          </a>
        </div>
      </section>
    </>
  );
}
