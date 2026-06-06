import type { Metadata } from "next";
import ProductPageTemplate from "@/components/ui/ProductPageTemplate";

export const metadata: Metadata = {
  title: "E-Cycle Lithium Battery",
  description: "Maxvolt E-Cycle Lithium Battery – 36V 7.5Ah to 15Ah. Lightweight, fast charging, AIS 156 compliant. India's trusted e-bicycle battery supplier.",
};

const productData = {
  id: "e-cycle-lithium-battery",
  name: "E-Cycle Lithium Battery",
  category: "Electric Vehicle",
  color: "#FFD100",
  image: "/images/product/e-cycle-lithium-battery-txc.webp",
  description: "High-capacity, long-lasting performance that keeps you cruising for extended distances.",
  longDescription: "Maxvolt's E-Cycle Lithium Battery delivers high-capacity, long-lasting performance purpose-built for electric bicycles. Lightweight and compact, our batteries integrate seamlessly with all major e-cycle brands — delivering zero-to-full charge in minutes and providing extended range for recreational and commute riding alike.",
  features: [
    "High-capacity design for extended riding distances",
    "Compact and lightweight for easy installation and maintenance",
    "Quick charging from zero to full in minutes",
    "Temperature and voltage monitoring to prevent overcharging",
    "Compatible with multiple e-cycle brands and models",
    "Eco-friendly composition reducing carbon footprint",
    "Available in Soft Pack and Hard Pack configurations",
    "Advanced BMS protection for long battery life",
    "Available through service centers nationwide",
    "Designed for both recreational and daily commute use",
  ],
  benefits: [
    { title: "Extended Riding Range", description: "Cover longer distances on a single charge — perfect for daily commutes and weekend adventures." },
    { title: "Ultra Lightweight", description: "Engineered for minimal weight impact, keeping your e-cycle agile and responsive on any terrain." },
    { title: "Rapid Charging", description: "Get back on the road faster with optimized charge acceptance that fills your battery in minutes, not hours." },
    { title: "Nationwide Support", description: "Authorized service centers across India ensure professional support wherever you ride." },
  ],
  quickSpecs: [
    { label: "Voltage", value: "36V" },
    { label: "Capacity Range", value: "7.5Ah – 15Ah" },
    { label: "Cell Chemistry", value: "LiFePO4" },
    { label: "Pack Type", value: "Soft / Hard Pack" },
  ],
  specTable: {
    headers: ["Specification", "36V 7.5Ah", "36V 10Ah", "36V 15Ah"],
    rows: [
      ["Model", "MEIPLEC-36014", "MEIPLEC-36018", "MEIPLEC-36022"],
      ["Battery Energy", "504 Wh", "648 Wh", "792 Wh"],
      ["Charge Voltage", "42V", "42V", "42V"],
      ["Charge Current", "2A", "3A", "3A"],
      ["Discharge Voltage", "27.5V", "27.5V", "27.5V"],
      ["Discharge Current", "10A", "10A", "10A"],
      ["Dimensions", "361×90×92 mm", "361×90×92 mm", "361×90×92 mm"],
      ["Weight", "4 kg", "5 kg", "7 kg"],
      ["Pack Type", "Soft/Hard Pack", "Soft/Hard Pack", "Soft/Hard Pack"],
    ],
  },
  applications: ["E-Bicycle", "Electric Cycle", "City Commute", "Leisure Riding", "Fitness E-Bike"],
  certifications: [
    "AIS 156 Government Safety Compliance",
    "Multi-Stage Quality Testing",
    "ISO Manufacturing Standards",
  ],
};

export default function ECycleBatteryPage() {
  return <ProductPageTemplate product={productData} />;
}
