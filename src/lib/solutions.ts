export interface Solution {
  slug: string;
  title: string;
  icon: "Zap" | "Sun" | "Lightbulb" | "Cpu";
  description: string;
  longDescription: string;
  products: string[];
  benefits: string[];
  applications: string[];
  color: string;
  image: string;
}

export const SOLUTIONS: Solution[] = [
  {
    slug: "electric-vehicles",
    title: "Electric Vehicles",
    icon: "Zap",
    description: "Complete lithium battery solutions for e-cycles, e-scooters, e-bikes and e-rickshaws.",
    longDescription:
      "Maxvolt powers India's electric mobility with AIS 156 certified lithium battery packs engineered for the country's road and climate conditions. Two-wheeler packs use high-density NMC / Li-Ion cells, while e-rickshaw packs use rugged LiFePO4 / LFP chemistry for safety and long cycle life.",
    products: ["E-Cycle Batteries", "E-Scooter / Bike Batteries", "E-Rickshaw Batteries", "Customized EV Packs"],
    benefits: ["AIS 156 certified safety", "Fast charging support", "Smart BMS protection", "Long cycle life"],
    applications: ["E-scooters & e-bikes", "E-rickshaws & e-autos", "E-cycles", "Two/three-wheeler OEMs"],
    color: "#FFD100",
    image: "/images/product/e-rickshaw-lithium-battery-ohn.webp",
  },
  {
    slug: "solar-storage",
    title: "Solar Storage",
    icon: "Sun",
    description: "High-efficiency lithium batteries for residential and commercial solar energy storage.",
    longDescription:
      "Maxvolt's solar storage systems capture daytime solar generation for round-the-clock use. With LiFePO4 chemistry, 3,000+ cycle life and over 95% round-trip efficiency, they maximize the return on any solar investment — from rooftops to large commercial installations.",
    products: ["Solar Lithium Batteries", "Grid-Tied Storage", "Off-Grid Systems", "Hybrid Solutions"],
    benefits: [">95% round-trip efficiency", "3,000+ cycles", "App-enabled monitoring", "Scalable 48V–120V"],
    applications: ["Rooftop solar storage", "Off-grid solar", "Commercial backup", "Solar + inverter hybrid"],
    color: "#f97316",
    image: "/images/product/lithium-battery-for-solar-application-zhs.webp",
  },
  {
    slug: "portable-lighting",
    title: "Portable Lighting",
    icon: "Lightbulb",
    description: "Reliable lithium batteries for solar lanterns, emergency lights and outdoor illumination.",
    longDescription:
      "Maxvolt lithium packs deliver dependable, long-runtime power for portable and emergency lighting. Lightweight and maintenance-free, they keep solar lanterns, emergency lights and outdoor illumination systems running far longer than conventional batteries.",
    products: ["Solar Lanterns", "Emergency Lighting", "Outdoor Lighting", "Portable Power"],
    benefits: ["Long runtime", "Lightweight design", "Fast recharge", "Maintenance-free"],
    applications: ["Solar lanterns", "Emergency lights", "Street & outdoor lighting", "Portable power units"],
    color: "#FFA800",
    image: "/images/product/customized-battery-solution-jkz.webp",
  },
  {
    slug: "consumer-electronics",
    title: "Consumer Electronics",
    icon: "Cpu",
    description: "Custom battery packs for consumer devices, wearables, IoT and smart home products.",
    longDescription:
      "From power banks and routers to CCTV, IoT sensors and smart-home devices, Maxvolt engineers application-specific lithium packs tailored to each product's voltage, capacity and form factor — all built with an advanced smart BMS.",
    products: ["Smart Devices", "IoT Batteries", "Wearable Power", "Home Automation"],
    benefits: ["Custom form factors", "Advanced smart BMS", "Stable, clean power", "Rapid prototyping"],
    applications: ["Power banks", "Router backup UPS", "CCTV & surveillance", "IoT & smart-home devices"],
    color: "#FF8C00",
    image: "/images/product/customized-battery-solution-jkz.webp",
  },
];

export function getSolution(slug: string) {
  return SOLUTIONS.find((s) => s.slug === slug);
}
