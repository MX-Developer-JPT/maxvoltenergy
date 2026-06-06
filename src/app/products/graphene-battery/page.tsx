import type { Metadata } from "next";
import ProductPageTemplate from "@/components/ui/ProductPageTemplate";

export const metadata: Metadata = {
  title: "Graphene Battery | Maxvolt Energy",
  description: "Maxvolt Graphene Battery – 50% faster charging than conventional lithium. Next-gen graphene-enhanced technology for e-scooters and energy storage. Eco-Series.",
};

const productData = {
  id: "graphene-battery",
  name: "Graphene Battery",
  category: "Advanced Technology",
  color: "#FFD100",
  image: "/images/product/graphene-battery-fnx.webp",
  description: "Next-generation graphene-enhanced batteries charging up to 50% faster than conventional lithium.",
  longDescription: "Maxvolt's Graphene Battery represents the cutting edge of energy storage technology. By incorporating graphene into the electrode architecture, we've achieved charge rates up to 50% faster than conventional lithium batteries — without compromising energy density, safety, or lifespan. Part of our premium Eco-Series lineup, the Graphene Battery is designed for riders who demand the absolute best.",
  features: [
    "Charges up to 50% faster than conventional lithium batteries",
    "High energy density for extended range and vehicle performance",
    "Lightweight design combined with superior efficiency",
    "Enhanced acceleration and smooth power delivery",
    "Intelligent BMS with continuous temperature and voltage monitoring",
    "Protection against overcharging, overheating, and voltage fluctuations",
    "Universal compatibility across major e-scooter and e-bike brands",
    "Eco-friendly alternative reducing carbon emissions",
    "Part of Maxvolt's premium Eco-Series product range",
    "Longer overall lifespan versus standard lithium batteries",
  ],
  benefits: [
    { title: "Revolutionary Charge Speed", description: "50% faster charging means your EV spends dramatically less time plugged in — maximizing your daily riding time." },
    { title: "Superior Performance", description: "Graphene-enhanced electrodes deliver smoother power delivery and better acceleration response at all speeds." },
    { title: "Next-Gen Technology", description: "Developed in Maxvolt's in-house R&D center, the graphene Eco-Series represents India's most advanced consumer EV battery." },
    { title: "Future-Ready", description: "Graphene technology forms the foundation of next-generation batteries — investing in it today means staying ahead of the curve." },
  ],
  quickSpecs: [
    { label: "Charge Speed", value: "50% Faster" },
    { label: "Technology", value: "Graphene Enhanced" },
    { label: "Applications", value: "E-Scooter / E-Bike" },
    { label: "Series", value: "Eco-Series" },
  ],
  applications: [
    "E-Scooter", "E-Bike", "Performance Electric Two-Wheelers", "Energy Storage Systems",
    "High-Performance Applications",
  ],
  certifications: [
    "AIS 156 Government Safety Compliance",
    "Eco-Series Quality Standards",
    "In-House R&D Validated",
    "Multi-Stage Performance Testing",
  ],
};

export default function GrapheneBatteryPage() {
  return <ProductPageTemplate product={productData} />;
}
