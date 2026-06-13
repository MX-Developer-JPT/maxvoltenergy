// Shared, lightweight site search index used by both the ⌘K Command Palette
// and the full-page /search results view. Keeping it in one place means there
// is a single source of truth for what is discoverable on-site.
import { PRODUCTS } from "@/lib/constants";
import { SOLUTIONS } from "@/lib/solutions";
import { SHOP_CATEGORIES } from "@/lib/shop";
import { STATE_LOCATIONS } from "@/lib/locations";

export interface SearchEntry {
  /** Title */
  t: string;
  /** Href */
  h: string;
  /** Group label */
  g: string;
  /** Optional one-line description, shown on the /search results page */
  d?: string;
}

const CORE: SearchEntry[] = [
  { t: "Home", h: "/", g: "Pages", d: "Maxvolt Energy — India's premium lithium battery manufacturer." },
  { t: "About Us", h: "/about-us", g: "Pages", d: "Our story, mission, leadership and journey." },
  { t: "Certificates", h: "/about-us/certificates", g: "Pages", d: "AIS 156, ISO and Udyam certifications." },
  { t: "All Products", h: "/products", g: "Pages", d: "The complete Maxvolt lithium battery range." },
  { t: "Product Portfolio", h: "/portfolio", g: "Pages", d: "Full battery portfolio across applications." },
  { t: "Shop All Batteries", h: "/shop", g: "Pages", d: "Browse and buy lithium batteries by category." },
  { t: "Compare Batteries", h: "/compare", g: "Tools", d: "Compare lithium battery models side by side." },
  { t: "Request a Quote", h: "/request-a-quote", g: "Tools", d: "Get pricing for bulk, OEM or custom orders." },
  { t: "Solutions", h: "/solutions", g: "Pages", d: "EV, solar, inverter and energy-storage solutions." },
  { t: "Find a Dealer", h: "/find-dealer", g: "Pages", d: "Locate authorized Maxvolt dealers across India." },
  { t: "Become a Dealer", h: "/become-a-dealer", g: "Pages", d: "Partner with Maxvolt as a dealer or distributor." },
  { t: "Our Presence", h: "/our-presence", g: "Pages", d: "Pan-India network across 22+ states." },
  { t: "Battery Calculator", h: "/battery-calculator", g: "Tools", d: "Size the right battery for your application." },
  { t: "Blog", h: "/blog", g: "Pages", d: "Insights on lithium technology and e-mobility." },
  { t: "Press Releases", h: "/press-release", g: "Pages", d: "Official Maxvolt news and announcements." },
  { t: "Media Coverage", h: "/media", g: "Pages", d: "Maxvolt in the news." },
  { t: "Gallery", h: "/gallery", g: "Pages", d: "Photos from our facilities and events." },
  { t: "Careers", h: "/career", g: "Pages", d: "Join the Maxvolt team." },
  { t: "Recycle · Maxvolt ReEarth", h: "/recycle", g: "Pages", d: "Battery recycling and the circular economy." },
  { t: "Support", h: "/support", g: "Pages", d: "Help, warranty and customer support." },
  { t: "FAQ", h: "/faq", g: "Pages", d: "Answers to common battery questions." },
  { t: "Contact Us", h: "/contact-us", g: "Pages", d: "Reach our sales and support teams." },
  { t: "Investors", h: "/investors", g: "Investors", d: "Investor relations hub." },
  { t: "Earnings Call", h: "/investors/earnings-call", g: "Investors", d: "Quarterly earnings calls and transcripts." },
  { t: "Annual Reports", h: "/investors/annual-reports", g: "Investors", d: "Annual reports and filings." },
  { t: "Corporate Governance", h: "/investors/corporate-governance", g: "Investors", d: "Governance policies and disclosures." },
  { t: "Shareholding Pattern", h: "/investors/shareholding-pattern", g: "Investors", d: "Quarterly shareholding patterns." },
  { t: "CSR", h: "/investors/csr", g: "Investors", d: "Corporate social responsibility initiatives." },
];

export const SEARCH_INDEX: SearchEntry[] = [
  ...CORE,
  ...PRODUCTS.map((p) => ({ t: p.name, h: p.href, g: "Products", d: p.description })),
  ...SOLUTIONS.map((s) => ({ t: s.title, h: `/solutions/${s.slug}`, g: "Solutions", d: s.description })),
  ...SHOP_CATEGORIES.map((c) => ({ t: c.name, h: `/shop/${c.key}`, g: "Shop", d: c.blurb })),
  ...STATE_LOCATIONS.map((l) => ({
    t: `${l.name} — dealers & batteries`,
    h: `/${l.slug}`,
    g: "Locations",
    d: `Authorized Maxvolt dealers and lithium batteries in ${l.name}.`,
  })),
];

/** Filter the index for a query. Empty query returns popular starter entries. */
export function searchSite(query: string): SearchEntry[] {
  const s = query.toLowerCase().trim();
  if (!s) {
    return SEARCH_INDEX.filter(
      (e) => e.g === "Pages" || e.g === "Products" || e.g === "Tools"
    ).slice(0, 8);
  }
  const tokens = s.split(/\s+/);
  return SEARCH_INDEX.filter((e) => {
    const hay = `${e.t} ${e.h} ${e.g} ${e.d ?? ""}`.toLowerCase();
    return tokens.every((tok) => hay.includes(tok));
  });
}
