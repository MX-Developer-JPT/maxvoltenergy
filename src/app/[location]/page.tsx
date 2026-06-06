import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { ArrowRight, MapPin, CheckCircle2, Phone, MessageCircle, Truck, ShieldCheck, Headphones, Factory } from "lucide-react";
import PageHero from "@/components/ui/PageHero";
import { LOCATIONS, getLocation, type Location } from "@/lib/locations";
import { PRODUCTS, SITE_CONFIG } from "@/lib/constants";

export const dynamicParams = false;

export function generateStaticParams() {
  return LOCATIONS.map((l) => ({ location: l.slug }));
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
      ? `Lithium Battery Supplier for ${loc.name} | Maxvolt Energy`
      : `Lithium Ion Battery Manufacturer & Supplier ${phrase(loc)} | Maxvolt Energy`;
  return {
    title,
    description: lead(loc),
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

      <PageHero
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
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {PRODUCTS.map((p) => (
              <Link key={p.id} href={p.href} className="group block rounded-2xl bg-white border border-black/6 hover:border-[#FFD100]/25 hover:-translate-y-1 transition-all overflow-hidden">
                <div className="relative h-40 bg-gradient-to-br from-[#FFD100]/6 to-transparent flex items-center justify-center">
                  <div className="relative w-32 h-32">
                    <Image src={p.image} alt={`${p.name} ${here}`} fill className="object-contain group-hover:scale-105 transition-transform" sizes="160px" />
                  </div>
                </div>
                <div className="p-5">
                  <span className="text-[10px] font-bold uppercase tracking-wide text-[#D97706]">{p.category}</span>
                  <h3 className="text-[#15171c] font-bold text-base mt-1 mb-2 group-hover:text-[#D97706] transition-colors">{p.name} {isSegment ? "" : here}</h3>
                  <p className="text-[#5f6470] text-xs leading-relaxed line-clamp-2 mb-3">{p.description}</p>
                  <span className="inline-flex items-center gap-1 text-[#D97706] text-xs font-semibold">View Details <ArrowRight size={12} /></span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Why Maxvolt here */}
      <section className="section-padding bg-white pt-0">
        <div className="container-custom">
          <h2 className="text-2xl md:text-3xl font-black text-[#15171c] mb-8">
            Why Choose Maxvolt {here || "as Your Battery Partner"}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {[
              { Icon: ShieldCheck, t: "AIS 156 Certified", d: "Government-compliant safety standards on every EV battery pack we ship." },
              { Icon: Truck, t: loc.type === "city" ? `Fast Delivery in ${loc.name}` : "Pan-India Logistics", d: "Reliable dispatch through our network of 10 warehouses and 1,100+ pincodes." },
              { Icon: Headphones, t: "Local Service Support", d: "Responsive after-sales support and warranty service for total peace of mind." },
              { Icon: Factory, t: "In-House Manufacturing", d: "Built at our 55,000 sq ft Duhai plant producing 15,000+ packs every month." },
            ].map(({ Icon, t, d }) => (
              <div key={t} className="p-6 rounded-2xl frosted-card border border-black/6">
                <div className="w-11 h-11 rounded-xl bg-[#FFD100]/12 border border-[#FFD100]/25 flex items-center justify-center mb-4">
                  <Icon size={20} className="text-[#D97706]" />
                </div>
                <h3 className="text-[#15171c] font-bold text-sm mb-2">{t}</h3>
                <p className="text-[#5f6470] text-xs leading-relaxed">{d}</p>
              </div>
            ))}
          </div>

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
    </>
  );
}
