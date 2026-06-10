import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { ArrowRight, MapPin, CheckCircle2, Phone, MessageCircle, Truck, ShieldCheck, Headphones, Factory, Store } from "lucide-react";
import PageHero from "@/components/ui/PageHero";
import { RevealStagger, RevealItem } from "@/components/ui/Reveal";
import { LOCATIONS, getLocation, toSlug, type Location } from "@/lib/locations";
import { PRODUCTS, SITE_CONFIG } from "@/lib/constants";
import { DEALERS, type Dealer } from "@/lib/dealers";

export const dynamicParams = false;

export function generateStaticParams() {
  return LOCATIONS.map((l) => ({ location: l.slug }));
}

// ── Dealer lookups (built once at module load, reused across all pages) ──
const byCity: Record<string, Dealer[]> = {};
const byState: Record<string, Dealer[]> = {};
const cityState: Record<string, string> = {};
for (const d of DEALERS) {
  const c = toSlug(d.city), s = toSlug(d.state);
  (byCity[c] ||= []).push(d);
  (byState[s] ||= []).push(d);
  cityState[c] = d.state;
}
const citiesByState: Record<string, string[]> = {};
for (const c of Object.keys(byCity)) {
  const s = toSlug(cityState[c]);
  (citiesByState[s] ||= []).push(c);
}

function dealersFor(loc: Location): Dealer[] {
  if (loc.type === "city") return byCity[loc.slug] || [];
  if (loc.type === "state") return byState[loc.slug] || [];
  return [];
}
function telHref(phone: string) {
  const m = phone.match(/\d[\d\s-]{6,}\d/);
  const digits = (m ? m[0] : phone).replace(/\D/g, "");
  return digits.length === 10 ? `+91${digits}` : `+${digits.replace(/^0+/, "")}`;
}

function phrase(loc: Location) {
  if (loc.slug === "india") return "across India";
  if (loc.type === "segment") return `for ${loc.name.toLowerCase()}`;
  if (loc.type === "state") return `in ${loc.name}`;
  return `in ${loc.name}`;
}

function lead(loc: Location): string {
  if (loc.slug === "india")
    return "Maxvolt Energy is among India's leading lithium-ion battery manufacturers — delivering AIS 156-certified battery packs for electric vehicles, solar storage, inverters and medical devices across the country.";
  if (loc.slug === "exporters")
    return "Maxvolt Energy partners with exporters seeking reliable, certified lithium-ion battery packs. With consistent quality, scalable capacity and export-ready documentation, we support international supply requirements.";
  if (loc.slug === "manufacturers")
    return "Maxvolt Energy supplies OEMs and manufacturers with custom lithium-ion battery packs engineered to exact voltage, capacity and form-factor specifications — backed by dedicated technical support.";
  if (loc.slug === "suppliers")
    return "Maxvolt Energy works with suppliers and distributors nationwide, offering competitive margins, marketing support and dependable stock availability across our full battery range.";
  if (loc.type === "state")
    return `Maxvolt Energy serves customers, dealers and OEMs across ${loc.name} with a complete range of AIS 156-certified lithium-ion batteries for electric vehicles, solar storage, inverters and more.`;
  return `Looking for a trusted lithium-ion battery manufacturer and supplier in ${loc.name}? Maxvolt Energy delivers AIS 156-certified battery packs for e-scooters, e-rickshaws, inverters, solar storage and medical devices — backed by reliable service and fast delivery in ${loc.name}.`;
}

export async function generateMetadata({ params }: { params: Promise<{ location: string }> }): Promise<Metadata> {
  const { location } = await params;
  const loc = getLocation(location);
  if (!loc) return { title: "Maxvolt Energy" };
  const title =
    loc.type === "segment" && loc.slug !== "india"
      ? `Lithium Battery Supplier for ${loc.name}`
      : `Lithium Ion Battery Manufacturer & Supplier ${phrase(loc)}`;
  const n = dealersFor(loc).length;
  const description = lead(loc) + (n ? ` Maxvolt has ${n} authorized ${n === 1 ? "dealer" : "dealers"} in ${loc.name}.` : "");
  return {
    title,
    description,
    keywords: [
      `lithium battery ${loc.name}`,
      `lithium ion battery manufacturer ${loc.name}`,
      `EV battery supplier ${loc.name}`,
      `e-rickshaw battery ${loc.name}`,
      `inverter battery ${loc.name}`,
      `solar battery ${loc.name}`,
      "Maxvolt Energy",
    ],
    alternates: { canonical: `/${loc.slug}` },
  };
}

export default async function LocationPage({ params }: { params: Promise<{ location: string }> }) {
  const { location } = await params;
  const loc = getLocation(location);
  if (!loc) notFound();

  const isSegment = loc.type === "segment" && loc.slug !== "india";
  const here = loc.slug === "india" ? "across India" : isSegment ? "" : `in ${loc.name}`;

  // Local dealers + cross-link mesh for crawlability / unique content.
  const localDealers = dealersFor(loc);
  let stateLink: { slug: string; name: string } | null = null;
  let siblingCities: { slug: string; name: string }[] = [];
  let childCities: { slug: string; name: string }[] = [];
  const nameOf = (slug: string) =>
    slug.split("-").map((w) => (w === "and" ? "&" : w.charAt(0).toUpperCase() + w.slice(1))).join(" ");
  if (loc.type === "city") {
    const stName = cityState[loc.slug];
    if (stName) {
      const ss = toSlug(stName);
      stateLink = { slug: ss, name: stName };
      siblingCities = (citiesByState[ss] || []).filter((c) => c !== loc.slug).slice(0, 11).map((s) => ({ slug: s, name: nameOf(s) }));
    }
  } else if (loc.type === "state") {
    childCities = (citiesByState[loc.slug] || []).slice(0, 18).map((s) => ({ slug: s, name: nameOf(s) }));
  }

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: `Maxvolt Energy${here ? ` — ${loc.name}` : ""}`,
    description: lead(loc),
    url: `${SITE_CONFIG.url}/${loc.slug}`,
    telephone: SITE_CONFIG.phone,
    email: SITE_CONFIG.email,
    image: `${SITE_CONFIG.url}/images/logo.webp`,
    address: {
      "@type": "PostalAddress",
      streetAddress: "E 82, Bulandshahr Road Industrial Area",
      addressLocality: "Ghaziabad",
      addressRegion: "Uttar Pradesh",
      postalCode: "201009",
      addressCountry: "IN",
    },
    areaServed: loc.type === "segment" ? "IN" : loc.name,
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <PageHero image="/images/overview/pan-india-presence.png"
        badge={loc.type === "segment" ? "Maxvolt Energy" : `Serving ${loc.name}`}
        title={
          isSegment ? (
            <>Lithium Battery Solutions for <span className="gradient-text">{loc.name}</span></>
          ) : (
            <>Lithium-Ion Batteries <span className="gradient-text">{phrase(loc)}</span></>
          )
        }
        description={lead(loc)}
      >
        <div className="flex flex-wrap gap-3">
          <a href={`https://wa.me/${SITE_CONFIG.whatsapp.replace("+", "")}?text=Hi, I'm interested in Maxvolt batteries ${here}`} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#FFD100] text-black font-bold text-sm hover:bg-[#FFA800] transition-all">
            <MessageCircle size={15} /> Get a Quote
          </a>
          <a href={`tel:${SITE_CONFIG.phone}`} className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-black/10 text-[#3f3f46] hover:border-[#FFD100]/40 text-sm font-medium transition-all">
            <Phone size={15} /> {SITE_CONFIG.phone}
          </a>
        </div>
      </PageHero>

      {/* Product range */}
      <section className="section-padding bg-[#f7f7f5]">
        <div className="container-custom">
          <h2 className="text-2xl md:text-3xl font-black text-[#15171c] mb-2">
            Our Battery Range {here}
          </h2>
          <p className="text-[#52525b] text-sm mb-8 max-w-2xl">
            Every Maxvolt product is available {loc.slug === "india" ? "across India" : isSegment ? "to partners nationwide" : `${here}, with delivery and after-sales support`}.
          </p>
          <RevealStagger className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {PRODUCTS.map((p) => (
              <RevealItem key={p.id}>
                <Link href={p.href} className="group card-rise block h-full rounded-2xl bg-white border border-black/6 hover:border-[#FFD100]/25 overflow-hidden">
                  <div className="img-zoom relative h-40 bg-gradient-to-br from-[#FFD100]/6 to-transparent flex items-center justify-center">
                    <div className="relative w-32 h-32">
                      <Image src={p.image} alt={`${p.name} ${here}`} fill className="object-contain" sizes="160px" />
                    </div>
                  </div>
                  <div className="p-5">
                    <span className="text-[10px] font-bold uppercase tracking-wide text-[#D97706]">{p.category}</span>
                    <h3 className="text-[#15171c] font-bold text-base mt-1 mb-2 group-hover:text-[#D97706] transition-colors">{p.name} {isSegment ? "" : here}</h3>
                    <p className="text-[#5f6470] text-xs leading-relaxed line-clamp-2 mb-3">{p.description}</p>
                    <span className="inline-flex items-center gap-1 text-[#D97706] text-xs font-semibold">View Details <ArrowRight size={12} /></span>
                  </div>
                </Link>
              </RevealItem>
            ))}
          </RevealStagger>
        </div>
      </section>

      {/* Authorized dealers in this location (unique, useful content) */}
      {localDealers.length > 0 && (
        <section className="section-padding bg-white pt-0">
          <div className="container-custom">
            <h2 className="text-2xl md:text-3xl font-black text-[#15171c] mb-2">
              Authorized Maxvolt Dealers in {loc.name}
            </h2>
            <p className="text-[#52525b] text-sm mb-8 max-w-2xl">
              {localDealers.length} verified Maxvolt {localDealers.length === 1 ? "dealer" : "dealers"} {here} — buy genuine
              AIS 156-certified lithium batteries with local sales and after-sales support.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {localDealers.slice(0, 9).map((d, i) => {
                const tel = telHref(d.phone);
                return (
                  <div key={`${d.name}-${i}`} className="p-5 rounded-2xl frosted-card border border-black/6">
                    <div className="flex items-start gap-3">
                      <div className="w-9 h-9 rounded-xl bg-[#FFD100]/15 border border-[#D97706]/20 flex items-center justify-center shrink-0">
                        <Store size={15} className="text-[#D97706]" />
                      </div>
                      <div className="min-w-0">
                        <h3 className="text-[#15171c] font-bold text-sm leading-tight">{d.name}</h3>
                        <p className="text-[#52525b] text-xs mt-1 leading-relaxed line-clamp-2">{d.address}</p>
                        <div className="flex items-center gap-3 mt-2 flex-wrap">
                          {tel && <a href={`tel:${tel}`} className="inline-flex items-center gap-1 text-[#D97706] text-xs font-semibold hover:underline"><Phone size={10} /> {d.phone}</a>}
                          <span className="text-[#a1a1aa] text-[11px]">{d.city}{d.pincode ? ` · ${d.pincode}` : ""}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
            <Link href="/find-dealer" className="inline-flex items-center gap-1.5 text-[#D97706] text-sm font-semibold mt-6 hover:underline">
              {localDealers.length > 9 ? `View all ${localDealers.length} dealers ${here}` : "Open the full dealer locator"} <ArrowRight size={13} />
            </Link>
          </div>
        </section>
      )}

      {/* Why Maxvolt here */}
      <section className="section-padding bg-white pt-0">
        <div className="container-custom">
          <h2 className="text-2xl md:text-3xl font-black text-[#15171c] mb-8">
            Why Choose Maxvolt {here || "as Your Battery Partner"}
          </h2>
          <RevealStagger className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {[
              { Icon: ShieldCheck, t: "AIS 156 Certified", d: "Government-compliant safety standards on every EV battery pack we ship." },
              { Icon: Truck, t: loc.type === "city" ? `Fast Delivery in ${loc.name}` : "Pan-India Logistics", d: "Reliable dispatch through our network of 10 warehouses and 1,100+ pincodes." },
              { Icon: Headphones, t: "Local Service Support", d: "Responsive after-sales support and warranty service for total peace of mind." },
              { Icon: Factory, t: "In-House Manufacturing", d: "Built at our 55,000 sq ft Duhai plant producing 25,000+ packs every month." },
            ].map(({ Icon, t, d }) => (
              <RevealItem key={t} className="card-rise p-6 rounded-2xl frosted-card border border-black/6">
                <div className="w-11 h-11 rounded-xl bg-[#FFD100]/12 border border-[#FFD100]/25 flex items-center justify-center mb-4">
                  <Icon size={20} className="text-[#D97706]" />
                </div>
                <h3 className="text-[#15171c] font-bold text-sm mb-2">{t}</h3>
                <p className="text-[#5f6470] text-xs leading-relaxed">{d}</p>
              </RevealItem>
            ))}
          </RevealStagger>

          {/* Applications / use cases */}
          <div className="mt-10 grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="p-7 rounded-2xl frosted-card border border-black/6">
              <h3 className="text-[#15171c] font-bold text-lg mb-4">Applications We Power {here}</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {["Electric scooters & bikes", "E-rickshaws & e-autos", "E-cycles", "Solar energy storage", "Inverter / home backup", "Medical devices", "CCTV & router UPS", "Custom industrial packs"].map((a) => (
                  <div key={a} className="flex items-center gap-2 text-[#52525b] text-sm">
                    <CheckCircle2 size={15} className="text-[#D97706] shrink-0" /> {a}
                  </div>
                ))}
              </div>
            </div>
            <div className="p-7 rounded-2xl bg-[#0b0b0d] text-white flex flex-col justify-center">
              <MapPin size={24} className="text-[#FFD100] mb-3" />
              <h3 className="font-bold text-xl mb-2">
                {isSegment ? `Partner with Maxvolt` : `Become a Dealer ${here}`}
              </h3>
              <p className="text-white/60 text-sm mb-5">
                Join our growing network of 950+ dealers and 107+ OEM partners. Competitive margins, training and marketing support included.
              </p>
              <div className="flex flex-wrap gap-3">
                <Link href="/become-a-dealer" className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#FFD100] text-black font-bold text-sm hover:bg-[#FFA800] transition-all">
                  Become a Dealer <ArrowRight size={14} />
                </Link>
                <Link href="/contact-us" className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border border-white/15 text-white/80 hover:border-[#FFD100]/40 text-sm font-medium transition-all">
                  Contact Us
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Cross-links to nearby locations — internal crawl mesh */}
      {(() => {
        const links =
          loc.type === "city" ? siblingCities :
          loc.type === "state" ? childCities :
          loc.slug === "india" ? Object.keys(byState).sort().map((s) => ({ slug: s, name: nameOf(s) })) : [];
        const heading =
          loc.type === "city" ? `Maxvolt Energy across ${stateLink?.name || "India"}` :
          loc.type === "state" ? `Cities We Serve in ${loc.name}` :
          loc.slug === "india" ? "States We Serve" : "";
        if (links.length === 0 && !stateLink) return null;
        return (
          <section className="py-12 bg-[#f7f7f5] border-t border-black/6">
            <div className="container-custom">
              <h2 className="text-lg font-black text-[#15171c] mb-4">{heading}</h2>
              <div className="flex flex-wrap gap-2">
                {loc.type === "city" && stateLink && (
                  <Link href={`/${stateLink.slug}`} className="px-3 py-1.5 rounded-full bg-white border border-[#D97706]/30 text-[#D97706] text-xs font-bold hover:bg-[#FFD100]/10 transition-all">
                    All of {stateLink.name}
                  </Link>
                )}
                {links.map((c) => (
                  <Link key={c.slug} href={`/${c.slug}`} className="px-3 py-1.5 rounded-full bg-white border border-black/8 text-[#52525b] text-xs hover:border-[#D97706]/40 hover:text-[#D97706] transition-all">
                    {c.name}
                  </Link>
                ))}
              </div>
              <Link href="/our-presence" className="inline-flex items-center gap-1.5 text-[#D97706] text-sm font-semibold mt-5 hover:underline">
                Explore our full national presence <ArrowRight size={13} />
              </Link>
            </div>
          </section>
        );
      })()}
    </>
  );
}
