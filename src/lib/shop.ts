// Full e-shop catalogue replicated from maxvoltenergy.com.
// Each SKU keeps the original slug so URLs map 1:1 to the source site.

export interface ShopCategory {
  key: string;          // url segment, matches original site
  name: string;
  blurb: string;
  chemistry: string;
  image: string;        // reused category image from /public/images/product
  color: string;
  application: string;
}

export interface Sku {
  category: string;     // category key
  name: string;
  slug: string;         // last url segment, matches original
  voltage: string;
  capacity: string;
  weight?: string;
}

export const SHOP_CATEGORIES: ShopCategory[] = [
  {
    key: "electric-scooter-battery",
    name: "Electric Scooter Battery",
    blurb: "High-density lithium packs for electric scooters and bikes — lightweight, fast-charging and built for Indian roads.",
    chemistry: "NMC / Li-Ion",
    image: "/images/product/e-scooter-bike-lithium-battery-mpu.webp",
    color: "#FFA800",
    application: "Two-wheelers",
  },
  {
    key: "e-rickshaw-battery",
    name: "E-Rickshaw Battery",
    blurb: "Rugged, high-capacity LiFePO4 packs that end battery drain and maximize every e-rickshaw driver's daily earnings.",
    chemistry: "LiFePO4 / LFP",
    image: "/images/product/e-rickshaw-lithium-battery-ohn.webp",
    color: "#FF8C00",
    application: "Three-wheelers",
  },
  {
    key: "inverter-battery",
    name: "Inverter Battery",
    blurb: "Reliable lithium inverter batteries for home and commercial backup — long life, maintenance-free, deep cycling.",
    chemistry: "LiFePO4",
    image: "/images/product/lithium-battery-energy-storage-solutions-tjf.webp",
    color: "#7c3aed",
    application: "Home / Commercial backup",
  },
  {
    key: "solar-battery-storage-system",
    name: "Solar Battery Storage System",
    blurb: "Scalable lithium storage optimized for solar — high round-trip efficiency, 3,000+ cycles and app monitoring.",
    chemistry: "LiFePO4",
    image: "/images/product/lithium-battery-for-solar-application-zhs.webp",
    color: "#f97316",
    application: "Solar energy storage",
  },
  {
    key: "medical-device-battery",
    name: "Medical Device Battery",
    blurb: "Precision lithium packs for medical and industrial equipment — ultrasound, ECG, BP monitors and more.",
    chemistry: "Li-Ion / LiFePO4",
    image: "/images/product/customized-battery-solution-jkz.webp",
    color: "#ec4899",
    application: "Medical & industrial",
  },
];

export const SKUS: Sku[] = [
  // E-Rickshaw
  { category: "e-rickshaw-battery", name: "E-Rickshaw Battery 51.2V 100AH", slug: "e-rickshaw-battery-51-2v", voltage: "51.2V", capacity: "100Ah" },
  { category: "e-rickshaw-battery", name: "51.2V E-Rickshaw Battery 150AH", slug: "51-2v-e-rickshaw-battery", voltage: "51.2V", capacity: "150Ah" },
  { category: "e-rickshaw-battery", name: "E-Rickshaw Battery 200AH", slug: "e-rickshaw-battery-200ah", voltage: "51.2V", capacity: "200Ah" },

  // Inverter
  { category: "inverter-battery", name: "12.8V 100Ah Inverter Battery", slug: "12-8v-100ah-inverter-battery-12-8v", voltage: "12.8V", capacity: "100Ah" },
  { category: "inverter-battery", name: "12.8V 150Ah Inverter Battery", slug: "12-8v-150ah-inverter-battery", voltage: "12.8V", capacity: "150Ah" },
  { category: "inverter-battery", name: "12.8V 200Ah Inverter Battery", slug: "12-8v-200ah-inverter-battery", voltage: "12.8V", capacity: "200Ah" },
  { category: "inverter-battery", name: "12.8V 300Ah Inverter Battery", slug: "12-8v-300ah-inverter-battery", voltage: "12.8V", capacity: "300Ah" },
  { category: "inverter-battery", name: "25.6V 100Ah Inverter Battery", slug: "25-6v-100ah-inverter-battery", voltage: "25.6V", capacity: "100Ah" },
  { category: "inverter-battery", name: "25.6V 150Ah Inverter Battery", slug: "25-6v150ah-inverter-battery", voltage: "25.6V", capacity: "150Ah" },
  { category: "inverter-battery", name: "25.6V 200Ah Inverter Battery", slug: "25-6v-200ah-inverter-battery", voltage: "25.6V", capacity: "200Ah" },
  { category: "inverter-battery", name: "48V 100Ah Inverter Battery", slug: "48v-100ah-inverter-battery", voltage: "48V", capacity: "100Ah" },
  { category: "inverter-battery", name: "48V 150Ah Inverter Battery", slug: "48v-150ah-inverter-battery", voltage: "48V", capacity: "150Ah" },
  { category: "inverter-battery", name: "51.2V 100Ah Inverter Battery", slug: "51-2v-100ah-inverter-battery", voltage: "51.2V", capacity: "100Ah" },
  { category: "inverter-battery", name: "51.2V 150Ah Inverter Battery", slug: "51-2v-150ah-inverter-battery", voltage: "51.2V", capacity: "150Ah" },

  // Medical Device
  { category: "medical-device-battery", name: "12V 12Ah Medical Device Battery", slug: "12v-12ah-medical-device-battery", voltage: "12V", capacity: "12Ah" },
  { category: "medical-device-battery", name: "12V 18Ah Medical Device Battery", slug: "12v-18ah-medical-device-battery", voltage: "12V", capacity: "18Ah" },
  { category: "medical-device-battery", name: "12V 24Ah Medical Device Battery", slug: "12v-24ah-medical-device-battery", voltage: "12V", capacity: "24Ah" },
  { category: "medical-device-battery", name: "12V 30Ah Medical Device Battery", slug: "12v-30ah-medical-device-battery", voltage: "12V", capacity: "30Ah" },
  { category: "medical-device-battery", name: "12V 60Ah Medical Device Battery", slug: "12v-60ah-medical-device-battery", voltage: "12V", capacity: "60Ah" },
  { category: "medical-device-battery", name: "12V 80Ah Medical Device Battery", slug: "12v-80ah-medical-device-battery", voltage: "12V", capacity: "80Ah" },
  { category: "medical-device-battery", name: "24V 12Ah Medical Device Battery", slug: "24v-12ah-medical-device-battery", voltage: "24V", capacity: "12Ah" },
  { category: "medical-device-battery", name: "24V 18Ah Medical Device Battery", slug: "24v-18ah-medical-device-battery", voltage: "24V", capacity: "18Ah" },
  { category: "medical-device-battery", name: "24V 24Ah Medical Device Battery", slug: "24v-24ah-medical-device-battery", voltage: "24V", capacity: "24Ah" },
  { category: "medical-device-battery", name: "24V 30Ah Medical Device Battery", slug: "24v-30ah-medical-device-battery", voltage: "24V", capacity: "30Ah" },
  { category: "medical-device-battery", name: "24V 60Ah Medical Device Battery", slug: "24v-60ah-medical-device-battery", voltage: "24V", capacity: "60Ah" },

  // Solar Battery Storage
  { category: "solar-battery-storage-system", name: "48V 100Ah Solar Battery Storage System", slug: "48v-100ah-solar-battery-storage-system", voltage: "48V", capacity: "100Ah" },
  { category: "solar-battery-storage-system", name: "48V 200Ah Solar Battery Storage System", slug: "48v-200ah-solar-battery-storage-system", voltage: "48V", capacity: "200Ah" },
  { category: "solar-battery-storage-system", name: "48V 300Ah Solar Battery Storage System", slug: "48v-300ah-solar-battery-storage-system", voltage: "48V", capacity: "300Ah" },
  { category: "solar-battery-storage-system", name: "96V 100Ah Solar Battery Storage System", slug: "96v-100ah-solar-battery-storage-system", voltage: "96V", capacity: "100Ah" },
  { category: "solar-battery-storage-system", name: "96V 200Ah Solar Battery Storage System", slug: "96v-200ah-solar-battery-storage-system", voltage: "96V", capacity: "200Ah" },
  { category: "solar-battery-storage-system", name: "96V 300Ah Solar Battery Storage System", slug: "96v-300ah-solar-battery-storage-system", voltage: "96V", capacity: "300Ah" },
  { category: "solar-battery-storage-system", name: "96V 400Ah Solar Battery Storage System", slug: "96v-400ah-solar-battery-storage-system", voltage: "96V", capacity: "400Ah" },
  { category: "solar-battery-storage-system", name: "96V 500Ah Solar Battery Storage System", slug: "96v-500ah-solar-battery-storage-system", voltage: "96V", capacity: "500Ah" },
  { category: "solar-battery-storage-system", name: "120V 100Ah Solar Battery Storage System", slug: "120v-100ah-solar-battery-storage-system", voltage: "120V", capacity: "100Ah" },
  { category: "solar-battery-storage-system", name: "120V 200Ah Solar Battery Storage System", slug: "120v-200ah-solar-battery-storage-system", voltage: "120V", capacity: "200Ah" },
  { category: "solar-battery-storage-system", name: "120V 300Ah Solar Battery Storage System", slug: "120v-300ah-solar-battery-storage-system", voltage: "120V", capacity: "300Ah" },
  { category: "solar-battery-storage-system", name: "120V 400Ah Solar Battery Storage System", slug: "120v-400ah-solar-battery-storage-system", voltage: "120V", capacity: "400Ah" },
  { category: "solar-battery-storage-system", name: "120V 500Ah Solar Battery Storage System", slug: "120v-500ah-solar-battery-storage-system", voltage: "120V", capacity: "500Ah" },

  // E-Scooter
  { category: "electric-scooter-battery", name: "E-Scooter Battery 48V 29AH", slug: "e-scooter-battery-48v-29ah", voltage: "48V", capacity: "29Ah" },
  { category: "electric-scooter-battery", name: "E-Scooter Battery 48V 25AH", slug: "e-scooter-battery-48v-25ah", voltage: "48V", capacity: "25Ah" },
  { category: "electric-scooter-battery", name: "E-Scooter Battery 48V 29AH (17.5 Kg)", slug: "e-scooter-battery-48v", voltage: "48V", capacity: "29Ah", weight: "17.5 Kg" },
  { category: "electric-scooter-battery", name: "E-Scooter Battery 60V 25AH", slug: "e-scooter-battery-60v-25ah", voltage: "60V", capacity: "25Ah" },
  { category: "electric-scooter-battery", name: "E-Scooter Battery 60V 29AH", slug: "e-scooter-battery-60v-29ah", voltage: "60V", capacity: "29Ah" },
  { category: "electric-scooter-battery", name: "E-Scooter Battery 60V 34AH", slug: "e-scooter-battery-60v-34ah", voltage: "60V", capacity: "34Ah" },
  { category: "electric-scooter-battery", name: "E-Scooter Battery 63V 29AH (18 Kg)", slug: "e-scooter-battery-63v-18-kg", voltage: "63V", capacity: "29Ah", weight: "18 Kg" },
  { category: "electric-scooter-battery", name: "E-Scooter Battery 63V 29AH", slug: "e-scooter-battery-63v-29ah", voltage: "63V", capacity: "29Ah" },
  { category: "electric-scooter-battery", name: "E-Scooter Battery 63V 34AH", slug: "e-scooter-battery-63v-34ah", voltage: "63V", capacity: "34Ah" },
  { category: "electric-scooter-battery", name: "E-Scooter Battery 63V 40AH", slug: "e-scooter-battery-63v-40ah", voltage: "63V", capacity: "40Ah" },
  { category: "electric-scooter-battery", name: "E-Scooter Battery 74V 25AH", slug: "e-scooter-battery-74v-25ah", voltage: "74V", capacity: "25Ah" },
  { category: "electric-scooter-battery", name: "E-Scooter Battery 74V 29AH (19.5 Kg)", slug: "e-scooter-battery-74v-29ah-19-5-kg", voltage: "74V", capacity: "29Ah", weight: "19.5 Kg" },
  { category: "electric-scooter-battery", name: "E-Scooter Battery 74V 29AH", slug: "e-scooter-battery-74v-29ah", voltage: "74V", capacity: "29Ah" },
  { category: "electric-scooter-battery", name: "E-Scooter Battery 74V 34AH", slug: "e-scooter-battery-74v-34ah", voltage: "74V", capacity: "34Ah" },
  { category: "electric-scooter-battery", name: "E-Scooter Battery 74V 40AH", slug: "e-scooter-battery-74v-40ah", voltage: "74V", capacity: "40Ah" },
];

export function getCategory(key: string) {
  return SHOP_CATEGORIES.find((c) => c.key === key);
}
export function skusByCategory(key: string) {
  return SKUS.filter((s) => s.category === key);
}
export function getSku(category: string, slug: string) {
  return SKUS.find((s) => s.category === category && s.slug === slug);
}

// Per-SKU product images replicated 1:1 from maxvoltenergy.com.
export const SKU_IMAGES: Record<string, string> = {
  "12-8v-100ah-inverter-battery-12-8v": "/images/product/12-8v-100ah-inverter-battery-xgc.webp",
  "12-8v-150ah-inverter-battery": "/images/product/12-8v-150ah-inverter-battery-jou.webp",
  "12-8v-200ah-inverter-battery": "/images/product/12-8v-200ah-inverter-battery-amo.webp",
  "12-8v-300ah-inverter-battery": "/images/product/12-8v-300ah-inverter-battery-sjm.webp",
  "120v-100ah-solar-battery-storage-system": "/images/product/120v-100ah-solar-battery-storage-system-prw.webp",
  "120v-200ah-solar-battery-storage-system": "/images/product/120v-200ah-solar-battery-storage-system-qbr.webp",
  "120v-300ah-solar-battery-storage-system": "/images/product/120v-300ah-solar-battery-storage-system-utw.webp",
  "120v-400ah-solar-battery-storage-system": "/images/product/120v-400ah-solar-battery-storage-system-tcr.webp",
  "120v-500ah-solar-battery-storage-system": "/images/product/120v-500ah-solar-battery-storage-system-zjt.webp",
  "12v-12ah-medical-device-battery": "/images/product/12v-12ah-medical-device-battery-rpg.webp",
  "12v-18ah-medical-device-battery": "/images/product/12v-18ah-medical-device-battery-xcm.webp",
  "12v-24ah-medical-device-battery": "/images/product/12v-24ah-medical-device-battery-ofm.webp",
  "12v-30ah-medical-device-battery": "/images/product/12v-30ah-medical-device-battery-uxl.webp",
  "12v-60ah-medical-device-battery": "/images/product/12v-60ah-medical-device-battery-yrg.webp",
  "12v-80ah-medical-device-battery": "/images/product/12v-80ah-medical-device-battery-tyh.webp",
  "24v-12ah-medical-device-battery": "/images/product/24v-12ah-medical-device-battery-tvu.webp",
  "24v-18ah-medical-device-battery": "/images/product/24v-18ah-medical-device-battery-bzy.webp",
  "24v-24ah-medical-device-battery": "/images/product/24v-24ah-medical-device-battery-gej.webp",
  "24v-30ah-medical-device-battery": "/images/product/24v-30ah-medical-device-battery-ccy.webp",
  "24v-60ah-medical-device-battery": "/images/product/24v-60ah-medical-device-battery-ngh.webp",
  "25-6v-100ah-inverter-battery": "/images/product/25-6v-100ah-inverter-battery-xiy.webp",
  "25-6v-200ah-inverter-battery": "/images/product/25-6v-200ah-inverter-battery-ckm.webp",
  "25-6v150ah-inverter-battery": "/images/product/25-6v150ah-inverter-battery-mou.webp",
  "48v-100ah-inverter-battery": "/images/product/48v-100ah-inverter-battery-bcg.webp",
  "48v-100ah-solar-battery-storage-system": "/images/product/48v-100ah-solar-battery-storage-system-faj.webp",
  "48v-150ah-inverter-battery": "/images/product/48v-150ah-inverter-battery-gkr.webp",
  "48v-200ah-solar-battery-storage-system": "/images/product/48v-200ah-solar-battery-storage-system-zyt.webp",
  "48v-300ah-solar-battery-storage-system": "/images/product/48v-300ah-solar-battery-storage-system-twx.webp",
  "51-2v-100ah-inverter-battery": "/images/product/51-2v-100ah-inverter-battery-jln.webp",
  "51-2v-150ah-inverter-battery": "/images/product/51-2v-150ah-inverter-battery-clv.webp",
  "51-2v-e-rickshaw-battery": "/images/product/51-2v-e-rickshaw-battery-wbv.webp",
  "96v-100ah-solar-battery-storage-system": "/images/product/96v-100ah-solar-battery-storage-system-wkk.webp",
  "96v-200ah-solar-battery-storage-system": "/images/product/96v-200ah-solar-battery-storage-system-ine.webp",
  "96v-300ah-solar-battery-storage-system": "/images/product/96v-300ah-solar-battery-storage-system-esg.webp",
  "96v-400ah-solar-battery-storage-system": "/images/product/96v-400ah-solar-battery-storage-system-xaf.webp",
  "96v-500ah-solar-battery-storage-system": "/images/product/96v-500ah-solar-battery-storage-system-wct.webp",
  "e-rickshaw-battery-200ah": "/images/product/e-rickshaw-battery-200ah-rxs.webp",
  "e-rickshaw-battery-51-2v": "/images/product/e-rickshaw-battery-51-2v-ged.webp",
  "e-scooter-battery-48v": "/images/product/e-scooter-battery-48v-25ah-rug.webp",
  "e-scooter-battery-48v-25ah": "/images/product/e-scooter-battery-48v-25ah-rug.webp",
  "e-scooter-battery-48v-29ah": "/images/product/e-scooter-battery-48v-29ah-caj.webp",
  "e-scooter-battery-60v-25ah": "/images/product/e-scooter-battery-60v-25ah-bfq.webp",
  "e-scooter-battery-60v-29ah": "/images/product/e-scooter-battery-60v-29ah-pau.webp",
  "e-scooter-battery-60v-34ah": "/images/product/e-scooter-battery-60v-34ah-owp.webp",
  "e-scooter-battery-63v-18-kg": "/images/product/e-scooter-battery-63v-18-kg-idi.webp",
  "e-scooter-battery-63v-29ah": "/images/product/e-scooter-battery-63v-29ah-hkv.webp",
  "e-scooter-battery-63v-34ah": "/images/product/e-scooter-battery-63v-34ah-olk.webp",
  "e-scooter-battery-63v-40ah": "/images/product/e-scooter-battery-63v-40ah-euj.webp",
  "e-scooter-battery-74v-25ah": "/images/product/e-scooter-battery-74v-25ah-guy.webp",
  "e-scooter-battery-74v-29ah": "/images/product/e-scooter-battery-74v-29ah-bbb.webp",
  "e-scooter-battery-74v-29ah-19-5-kg": "/images/product/e-scooter-battery-74v-29ah-19-5-kg-ukn.webp",
  "e-scooter-battery-74v-34ah": "/images/product/e-scooter-battery-74v-34ah-lyb.webp",
  "e-scooter-battery-74v-40ah": "/images/product/e-scooter-battery-74v-40ah-qrg.webp",
};

/** Returns the SKU-specific image, falling back to the category image. */
export function skuImage(sku: Sku): string {
  return SKU_IMAGES[sku.slug] || getCategory(sku.category)?.image || "/images/product/e-scooter-bike-lithium-battery-mpu.webp";
}
