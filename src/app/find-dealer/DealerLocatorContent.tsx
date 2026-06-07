"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import PageHero from "@/components/ui/PageHero";
import { MapPin, Phone, Search, Navigation, Wrench, Store, X, MessageCircle } from "lucide-react";
import { SITE_CONFIG } from "@/lib/constants";

type Dealer = {
  name: string; city: string; state: string; region: "North" | "South" | "East" | "West";
  address: string; phone: string; type: "Dealer" | "Service Center" | "Distributor";
  lat: number; lng: number;
};

// Curated Maxvolt dealer/service network across India (approximate city coordinates)
const DEALERS: Dealer[] = [
  { name: "Maxvolt Flagship Store", city: "Ghaziabad", state: "Uttar Pradesh", region: "North", address: "E 82, Bulandshahr Road Industrial Area, Ghaziabad 201009", phone: "01204291595", type: "Distributor", lat: 28.67, lng: 77.45 },
  { name: "Maxvolt Energy Delhi", city: "New Delhi", state: "Delhi", region: "North", address: "F 108, United Plaza, Community Centre, Karkardooma, New Delhi 110092", phone: "01204291595", type: "Dealer", lat: 28.65, lng: 77.29 },
  { name: "PowerCell EV Hub", city: "Noida", state: "Uttar Pradesh", region: "North", address: "Sector 63, Noida", phone: "+918130327183", type: "Dealer", lat: 28.62, lng: 77.38 },
  { name: "Lucknow Lithium Centre", city: "Lucknow", state: "Uttar Pradesh", region: "North", address: "Gomti Nagar, Lucknow", phone: "+918130327183", type: "Dealer", lat: 26.85, lng: 80.95 },
  { name: "Chandigarh EV Power", city: "Chandigarh", state: "Chandigarh", region: "North", address: "Industrial Area Phase 1, Chandigarh", phone: "+918130327183", type: "Service Center", lat: 30.73, lng: 76.78 },
  { name: "Jaipur Energy Works", city: "Jaipur", state: "Rajasthan", region: "West", address: "Malviya Nagar, Jaipur", phone: "+918130327183", type: "Dealer", lat: 26.91, lng: 75.79 },
  { name: "Amritsar Battery Mart", city: "Amritsar", state: "Punjab", region: "North", address: "GT Road, Amritsar", phone: "+918130327183", type: "Dealer", lat: 31.63, lng: 74.87 },
  { name: "Maxvolt Mumbai West", city: "Mumbai", state: "Maharashtra", region: "West", address: "Andheri East, Mumbai", phone: "+918130327183", type: "Dealer", lat: 19.12, lng: 72.86 },
  { name: "Pune EV Solutions", city: "Pune", state: "Maharashtra", region: "West", address: "Hinjewadi, Pune", phone: "+918130327183", type: "Dealer", lat: 18.59, lng: 73.74 },
  { name: "Ahmedabad Power Centre", city: "Ahmedabad", state: "Gujarat", region: "West", address: "SG Highway, Ahmedabad", phone: "+918130327183", type: "Service Center", lat: 23.03, lng: 72.58 },
  { name: "Surat Lithium Store", city: "Surat", state: "Gujarat", region: "West", address: "Ring Road, Surat", phone: "+918130327183", type: "Dealer", lat: 21.17, lng: 72.83 },
  { name: "Indore Battery World", city: "Indore", state: "Madhya Pradesh", region: "West", address: "Vijay Nagar, Indore", phone: "+918130327183", type: "Dealer", lat: 22.72, lng: 75.86 },
  { name: "Maxvolt Bangalore", city: "Bangalore", state: "Karnataka", region: "South", address: "Whitefield, Bengaluru", phone: "+918130327183", type: "Service Center", lat: 12.97, lng: 77.59 },
  { name: "Chennai EV Mart", city: "Chennai", state: "Tamil Nadu", region: "South", address: "Guindy, Chennai", phone: "+918130327183", type: "Dealer", lat: 13.08, lng: 80.27 },
  { name: "Maxvolt Hyderabad (First OEM)", city: "Hyderabad", state: "Telangana", region: "South", address: "Gachibowli, Hyderabad", phone: "+918130327183", type: "Distributor", lat: 17.39, lng: 78.49 },
  { name: "Coimbatore Power Hub", city: "Coimbatore", state: "Tamil Nadu", region: "South", address: "Peelamedu, Coimbatore", phone: "+918130327183", type: "Dealer", lat: 11.02, lng: 76.96 },
  { name: "Kochi Energy Store", city: "Kochi", state: "Kerala", region: "South", address: "Edappally, Kochi", phone: "+918130327183", type: "Dealer", lat: 9.93, lng: 76.27 },
  { name: "Vijayawada Battery Centre", city: "Vijayawada", state: "Andhra Pradesh", region: "South", address: "Benz Circle, Vijayawada", phone: "+918130327183", type: "Service Center", lat: 16.51, lng: 80.65 },
  { name: "Maxvolt Kolkata", city: "Kolkata", state: "West Bengal", region: "East", address: "Salt Lake, Kolkata", phone: "+918130327183", type: "Dealer", lat: 22.57, lng: 88.36 },
  { name: "Patna EV Power", city: "Patna", state: "Bihar", region: "East", address: "Boring Road, Patna", phone: "+918130327183", type: "Dealer", lat: 25.59, lng: 85.13 },
  { name: "Ranchi Lithium Mart", city: "Ranchi", state: "Jharkhand", region: "East", address: "Lalpur, Ranchi", phone: "+918130327183", type: "Dealer", lat: 23.34, lng: 85.31 },
  { name: "Guwahati Energy Hub", city: "Guwahati", state: "Assam", region: "East", address: "GS Road, Guwahati", phone: "+918130327183", type: "Service Center", lat: 26.14, lng: 91.74 },
  { name: "Bhubaneswar Power Store", city: "Bhubaneswar", state: "Odisha", region: "East", address: "Saheed Nagar, Bhubaneswar", phone: "+918130327183", type: "Dealer", lat: 20.30, lng: 85.82 },
];

const REGIONS = ["All", "North", "South", "East", "West"] as const;
const TYPES = ["All", "Dealer", "Service Center", "Distributor"] as const;
const STATES = ["All", ...Array.from(new Set(DEALERS.map((d) => d.state))).sort()];

// Project lat/lng to a 0-100 box over India's bounds
function project(lat: number, lng: number) {
  const minLat = 8, maxLat = 35, minLng = 68, maxLng = 92;
  const x = ((lng - minLng) / (maxLng - minLng)) * 100;
  const y = (1 - (lat - minLat) / (maxLat - minLat)) * 100;
  return { x, y };
}

export default function DealerLocatorContent() {
  const [region, setRegion] = useState<(typeof REGIONS)[number]>("All");
  const [stateFilter, setStateFilter] = useState<string>("All");
  const [typeFilter, setTypeFilter] = useState<(typeof TYPES)[number]>("All");
  const [query, setQuery] = useState("");
  const [active, setActive] = useState<Dealer | null>(null);

  const filtered = useMemo(() => {
    return DEALERS.filter((d) => {
      const matchRegion = region === "All" || d.region === region;
      const matchState = stateFilter === "All" || d.state === stateFilter;
      const matchType = typeFilter === "All" || d.type === typeFilter;
      const q = query.toLowerCase().trim();
      const matchQuery = !q || d.city.toLowerCase().includes(q) || d.state.toLowerCase().includes(q) || d.name.toLowerCase().includes(q);
      return matchRegion && matchState && matchType && matchQuery;
    });
  }, [region, stateFilter, typeFilter, query]);

  return (
    <>
      <PageHero
        badge="Dealer Locator"
        title={<>Find a Maxvolt <span className="gradient-text">Dealer Near You</span></>}
        description="950+ authorized dealers, distributors, and service centers across 22+ states. Search by city or state to find your nearest Maxvolt Energy point of sale and support."
      />

      <section className="section-padding bg-[#f7f7f5]">
        <div className="container-custom">
          {/* Search + filters */}
          <div className="flex flex-col md:flex-row gap-4 mb-8">
            <div className="relative flex-1">
              <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#a1a1aa]" />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search by city or state (e.g. Mumbai, Karnataka)…"
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

          {/* Location-based dropdown filters */}
          <div className="flex flex-col sm:flex-row gap-3 mb-8">
            <div className="flex-1">
              <label className="block text-[#71717a] text-[11px] font-bold uppercase tracking-wide mb-1.5">State</label>
              <select
                value={stateFilter}
                onChange={(e) => setStateFilter(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-white border border-black/8 text-[#15171c] text-sm focus:outline-none focus:border-[#D97706]/50"
              >
                {STATES.map((s) => <option key={s} value={s}>{s === "All" ? "All States" : s}</option>)}
              </select>
            </div>
            <div className="flex-1">
              <label className="block text-[#71717a] text-[11px] font-bold uppercase tracking-wide mb-1.5">Location Type</label>
              <select
                value={typeFilter}
                onChange={(e) => setTypeFilter(e.target.value as (typeof TYPES)[number])}
                className="w-full px-4 py-3 rounded-xl bg-white border border-black/8 text-[#15171c] text-sm focus:outline-none focus:border-[#D97706]/50"
              >
                {TYPES.map((t) => <option key={t} value={t}>{t === "All" ? "All Types" : t}</option>)}
              </select>
            </div>
            {(stateFilter !== "All" || typeFilter !== "All" || region !== "All" || query) && (
              <div className="flex items-end">
                <button
                  onClick={() => { setStateFilter("All"); setTypeFilter("All"); setRegion("All"); setQuery(""); }}
                  className="px-4 py-3 rounded-xl border border-black/8 text-[#52525b] text-sm font-medium hover:text-[#15171c] hover:border-[#D97706]/30 transition-all whitespace-nowrap"
                >
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
                  <Navigation size={14} className="text-[#D97706]" /> Network Map
                </div>
                <div className="relative w-full rounded-xl bg-[#f0f0ea] border border-black/6 overflow-hidden" style={{ aspectRatio: "3/4" }}>
                  {/* dot grid backdrop */}
                  <div className="absolute inset-0 dot-pattern opacity-40" />
                  {DEALERS.map((d, i) => {
                    const { x, y } = project(d.lat, d.lng);
                    const visible = filtered.includes(d);
                    return (
                      <button
                        key={i}
                        onClick={() => setActive(d)}
                        className="absolute -translate-x-1/2 -translate-y-1/2 group"
                        style={{ left: `${x}%`, top: `${y}%` }}
                        aria-label={d.name}
                      >
                        <motion.span
                          className="block rounded-full"
                          animate={{
                            scale: active === d ? [1, 1.4, 1] : 1,
                          }}
                          transition={{ duration: 1, repeat: active === d ? Infinity : 0 }}
                          style={{
                            width: visible ? 11 : 6,
                            height: visible ? 11 : 6,
                            background: visible ? "#D97706" : "rgba(0,0,0,0.2)",
                            boxShadow: visible ? "0 0 0 4px rgba(255,209,0,0.25)" : "none",
                          }}
                        />
                      </button>
                    );
                  })}
                </div>
                <p className="text-[#71717a] text-[11px] mt-3 leading-relaxed">
                  Tap a marker to view dealer details. Showing <span className="text-[#D97706] font-bold">{filtered.length}</span> of {DEALERS.length} locations.
                </p>
              </div>
            </div>

            {/* List */}
            <div className="lg:col-span-3 order-1 lg:order-2 space-y-3">
              <AnimatePresence mode="popLayout">
                {filtered.map((d, i) => (
                  <motion.div
                    layout
                    key={d.name}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.97 }}
                    transition={{ duration: 0.35, delay: Math.min(i * 0.03, 0.3) }}
                    onMouseEnter={() => setActive(d)}
                    className="p-5 rounded-2xl frosted-card hover:border-[#D97706]/25 transition-all"
                  >
                    <div className="flex items-start gap-4">
                      <div className="w-11 h-11 rounded-xl bg-[#FFD100]/15 border border-[#D97706]/20 flex items-center justify-center shrink-0">
                        {d.type === "Service Center" ? <Wrench size={16} className="text-[#D97706]" /> : <Store size={16} className="text-[#D97706]" />}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 flex-wrap mb-1">
                          <h3 className="text-[#15171c] font-bold text-sm">{d.name}</h3>
                          <span className="text-[9px] font-bold uppercase tracking-wide px-2 py-0.5 rounded-full bg-black/[0.04] text-[#71717a] border border-black/6">{d.type}</span>
                        </div>
                        <div className="flex items-center gap-1.5 text-[#52525b] text-xs mb-2">
                          <MapPin size={11} className="text-[#a1a1aa]" /> {d.address}
                        </div>
                        <div className="flex items-center gap-4">
                          <a href={`tel:${d.phone}`} className="flex items-center gap-1.5 text-[#D97706] text-xs font-semibold hover:underline">
                            <Phone size={11} /> {d.phone}
                          </a>
                          <a
                            href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(d.name + " " + d.city)}`}
                            target="_blank" rel="noopener noreferrer"
                            className="flex items-center gap-1.5 text-[#52525b] text-xs font-medium hover:text-[#15171c]"
                          >
                            <Navigation size={11} /> Directions
                          </a>
                        </div>
                      </div>
                      <span className="text-[#a1a1aa] text-[11px] shrink-0">{d.city}, {d.state}</span>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>

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
            </div>
          </div>
        </div>
      </section>

      {/* Become a dealer CTA */}
      <section className="py-16 bg-white border-t border-black/6">
        <div className="container-custom text-center">
          <h2 className="text-3xl font-black text-[#15171c] mb-3">Want to become a <span className="gradient-text">Maxvolt Dealer?</span></h2>
          <p className="text-[#52525b] text-sm max-w-md mx-auto mb-7">Join 950+ partners. Competitive margins, technical training, and marketing support across India.</p>
          <a href="/become-a-dealer" className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl bg-[#FFD100] text-black font-bold text-sm hover:bg-[#FFA800] transition-all">
            Apply for Dealership
          </a>
        </div>
      </section>

      {/* Active dealer modal */}
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
              <a href={`tel:${active.phone}`} className="flex items-center gap-2 text-[#D97706] font-semibold text-sm"><Phone size={13} /> {active.phone}</a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
