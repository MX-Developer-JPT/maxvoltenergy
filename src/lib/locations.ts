// Location-based SEO landing pages.
// Curated city/state slugs from the original site, unioned with every city &
// state where Maxvolt has an authorized dealer (derived from the dealer
// directory) so each has a crawlable, indexable local landing page.

export type LocationType = "city" | "state" | "segment";

export interface Location {
  slug: string;
  name: string;
  type: LocationType;
}

const SEGMENTS = ["india","exporters","manufacturers","suppliers"];

const STATES = ["andhra-pradesh","arunachal-pradesh","assam","bihar","chhattisgarh","delhi","goa","gujarat","haryana","himachal-pradesh","jammu-and-kashmir","jharkhand","karnataka","kerala","madhya-pradesh","maharashtra","odisha","puducherry","punjab","rajasthan","sikkim","tamil-nadu","telangana","uttar-pradesh","uttarakhand","west-bengal"];

const CITIES = ["agar","agra","ahmedabad","ajmer","aligarh","allahabad","alwar","ambala","ambattur","amravati","amreli","amritsar","amroha","anantapur","araria","asansol","ashoknagar","aurangabad","ayodhya","azamgarh","badanpur-narwana","baghpat","balaghat","balasore","baleshwar","balrampur","banda","bangalore","banswara","bara-banki","baran","baraut","bardhaman","bareilly","barnala","barwani","basti","begusarai","belagavi","belgaum","betul","bhadohi","bhagalpur","bharatpur","bharuch","bhatapara","bhavnagar","bhilai-nagar","bhilwara","bhind","bhiwandi","bhiwani","bhojpur","bhopal","bhubaneswar","biaora","bijnor","bikaner","bilaspur","bokaro","budaun","bulandshahr","buldhana","buxar","champawat","chandauli","chandausi","chandigarh","chennai","chhatarpur","chhindwara","chittorgarh","churu","coimbatore","cuttack","dadri","damoh","dankaur","darbhanga","darjeeling","datia","dehradun","deogarh","deoghar","deoria","dewas","dhanbad","dhar","dharamshala","dhaulpur","dhule","durg","durgapur","east-champaran","east-delhi","erode","faridabad","fatehpur","fazilka","firozabad","ganjam","gautam-buddha-nagar","gaya","ghaziabad","ghazipur","gidhori","giridih","gola-lakhimpur","gopalganj","gorakhpur","greater-noida","gulbarga","guna","guntur","gurgaon","gurugram","guwahati","gwalior","haldwani","haora","hapur","harda","hardoi","haridwar","hazaribagh","hisar","hooghly-district","hoshangabad","hoshiarpur","howrah","hyderabad","indore","jabalpur","jaipur","jaisalmer","jalandhar","jalaun","jalgaon","jammu","jamnagar","jamshedpur","jaunpur","jhajjar","jhalawar","jhansi","jhunjhunu","jind","jodhpur","junagadh","kaimur-district","kaithal","kakinada","kalyan","kanker","kanpur","kanpur-dehat","kanpur-nagar","kapurthala","karnal","kasganj","kashipur","katni","kavali","kawardha","keshiapata","khalilabad","khandwa","khargone","kheda","kochi","kolapur","kolhapur","kolkata","korba","kota","kozhikode","kurukshetra","kushinagar","lakhimpur","lakhisarai","lucknow","ludhiana","madhepura","madhubani","madurai","maharajganj","maheshtala","mainpuri","malkajgiri","mandi","mandla","mandsaur","mangalore","mathura","mau","mayurbhanj","meerut","mira-and-bhayander","mirzapur","mohali","moradabad","mumbai","muzaffarpur","mysore","nadia-district","nagaur","nagpur","nalanda","nanded-waghala","narsimhapur","nashik","navi-mumbai","nawabganj-barabanki","neemuch","nellore","new-delhi","noida","north-24-parganas-district","north-delhi","north-east-delhi","north-west-delhi","nowgong","pali","palwal","panipat","panna","pashchim-champaran","patiala","patna","pimpri-and-chinchwad","pithampur-dhar","ponda","porbandar","pratapgarh","prayagraj","prayagraj-allahabad","pune","purba-medinipur-district","purbi-champaran","puri","purnia","purulia","raigarh","raipur","raisen","rajgarh","rajkot","rajnandgaon","rajsamand","ramgarh","rampur","ranchi","ratlam","remuna","rewari","rishikesh","rohini","rohtak","rohtas","roorkee","rourkela","sagar","saharanpur","saharsa","salem","salumbar","samastipur","sambhal","sangli","sangrur","saran","sarangarh","sarangpur","satna","sehore","shahjahanpur","shajapur","shivpuri","shujalpur","siddharthnagar","siddipet","sikar","siliguri","sirohi","sirsa","sitapur","siwan","solan","solapur","sonipat","south-24-parganas-district","south-delhi","south-west-delhi","srinagar","supaul","surat","surendranagar","surguja","tarn-taran-sahib","thane","thiruvananthapuram","tikamgarh","tiruchirappalli","tirupati","tonk","udaipur","ujjain","ulhasnagar","vadodara","vaishali","varanasi","vellore","vidisha","vijayawada","visakhapatnam","warangal","wardha","west-delhi"];

const SEGMENT_NAMES: Record<string, string> = {
  india: "India",
  exporters: "Exporters",
  manufacturers: "Manufacturers",
  suppliers: "Suppliers",
};

/** Convert a place name to its URL slug (inverse of slugToName). */
export function toSlug(name: string): string {
  return name.toLowerCase().replace(/&/g, " and ")
    .replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "").replace(/-+/g, "-");
}

export function slugToName(slug: string): string {
  if (SEGMENT_NAMES[slug]) return SEGMENT_NAMES[slug];
  return slug
    .split("-")
    .map((w) => (w === "and" ? "&" : w.charAt(0).toUpperCase() + w.slice(1)))
    .join(" ");
}

export const LOCATIONS: Location[] = (() => {
  const seen = new Set<string>();
  const list: Location[] = [];
  const add = (slug: string, type: LocationType) => {
    if (!slug || seen.has(slug)) return;
    seen.add(slug);
    list.push({ slug, name: slugToName(slug), type });
  };
  SEGMENTS.forEach((s) => add(s, "segment"));
  STATES.forEach((s) => add(s, "state"));
  CITIES.forEach((s) => add(s, "city"));
  return list;
})();

export function getLocation(slug: string): Location | undefined {
  return LOCATIONS.find((l) => l.slug === slug);
}

export const CITY_LOCATIONS = LOCATIONS.filter((l) => l.type === "city");
export const STATE_LOCATIONS = LOCATIONS.filter((l) => l.type === "state");
export const SEGMENT_LOCATIONS = LOCATIONS.filter((l) => l.type === "segment");
