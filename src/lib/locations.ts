// Location-based SEO landing pages — replicated from maxvoltenergy.com
// The original publishes ~150 thin doorway pages (one per city/state). We
// rebuild them as proper local-SEO landing pages with genuine, useful content.

export type LocationType = "city" | "state" | "segment";

export interface Location {
  slug: string;
  name: string;
  type: LocationType;
}

// Indian states present on the original site
const STATES = [
  "andhra-pradesh", "arunachal-pradesh", "assam", "bihar", "chhattisgarh",
  "goa", "gujarat", "haryana", "himachal-pradesh", "jharkhand", "karnataka",
  "kerala", "madhya-pradesh", "maharashtra", "odisha", "punjab", "sikkim",
  "tamil-nadu", "telangana", "uttar-pradesh", "uttarakhand", "west-bengal",
];

// Special audience/segment landing pages
const SEGMENTS = ["india", "exporters", "manufacturers", "suppliers"];

// All cities present on the original site
const CITIES = [
  "agra", "ahmedabad", "ajmer", "aligarh", "allahabad", "ambala", "ambattur",
  "amravati", "amritsar", "asansol", "aurangabad", "bangalore", "bareilly",
  "belgaum", "bhagalpur", "bhavnagar", "bhilai-nagar", "bhiwandi", "bhopal",
  "bhubaneswar", "bikaner", "bilaspur", "bokaro", "chandigarh", "chennai",
  "coimbatore", "cuttack", "darbhanga", "darjeeling", "dehradun", "delhi",
  "deoghar", "dhanbad", "dharamshala", "durgapur", "erode", "faridabad",
  "firozabad", "gaya", "ghaziabad", "gorakhpur", "greater-noida", "gulbarga",
  "guntur", "gurgaon", "guwahati", "gwalior", "haldwani", "haora", "haridwar",
  "howrah", "hyderabad", "indore", "jabalpur", "jaipur", "jaisalmer",
  "jalandhar", "jalgaon", "jammu", "jamnagar", "jamshedpur", "jhansi",
  "jodhpur", "junagadh", "kalyan", "kanpur", "kapurthala", "kashipur", "kochi",
  "kolapur", "kolhapur", "kolkata", "kota", "kozhikode", "lucknow", "ludhiana",
  "madurai", "maheshtala", "mandi", "mangalore", "meerut", "mira-and-bhayander",
  "moradabad", "mumbai", "mysore", "nagpur", "nanded-waghala", "nashik",
  "navi-mumbai", "nellore", "noida", "panipat", "patiala", "patna",
  "pimpri-and-chinchwad", "ponda", "pune", "puri", "raigarh", "raipur",
  "rajkot", "ranchi", "rewari", "rishikesh", "roorkee", "saharanpur", "salem",
  "sangli", "siliguri", "solan", "solapur", "sonipat", "srinagar", "surat",
  "thane", "thiruvananthapuram", "tiruchirappalli", "tirupati", "udaipur",
  "ujjain", "ulhasnagar", "vadodara", "varanasi", "vellore", "vijayawada",
  "visakhapatnam", "warangal",
];

const SEGMENT_NAMES: Record<string, string> = {
  india: "India",
  exporters: "Exporters",
  manufacturers: "Manufacturers",
  suppliers: "Suppliers",
};

export function slugToName(slug: string): string {
  if (SEGMENT_NAMES[slug]) return SEGMENT_NAMES[slug];
  return slug
    .split("-")
    .map((w) => (w === "and" ? "&" : w.charAt(0).toUpperCase() + w.slice(1)))
    .join(" ");
}

export const LOCATIONS: Location[] = [
  ...SEGMENTS.map((slug) => ({ slug, name: slugToName(slug), type: "segment" as const })),
  ...STATES.map((slug) => ({ slug, name: slugToName(slug), type: "state" as const })),
  ...CITIES.map((slug) => ({ slug, name: slugToName(slug), type: "city" as const })),
];

export function getLocation(slug: string): Location | undefined {
  return LOCATIONS.find((l) => l.slug === slug);
}

export const CITY_LOCATIONS = LOCATIONS.filter((l) => l.type === "city");
export const STATE_LOCATIONS = LOCATIONS.filter((l) => l.type === "state");
export const SEGMENT_LOCATIONS = LOCATIONS.filter((l) => l.type === "segment");
