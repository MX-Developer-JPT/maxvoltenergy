import type { Metadata } from "next";
import ProductPageTemplate from "@/components/ui/ProductPageTemplate";

export const metadata: Metadata = {
  title: "E-Rickshaw Lithium Battery | Maxvolt Energy",
  description: "Maxvolt E-Rickshaw Lithium Battery – 51V 86Ah & 100Ah models. Fast charging, AIS 156 certified, advanced BMS. Solving battery drain for e-rickshaw drivers across India.",
};

const productData = {
  id: "e-rickshaw-lithium-battery",
  name: "E-Rickshaw Lithium Battery",
  category: "Electric Vehicle",
  color: "#FF8C00",
  image: "/images/product/e-rickshaw-lithium-battery-ohn.webp",
  galleryImages: [
    "/images/product/51-2v-100ah-e-rickshaw-battery-roc.webp",
    "/images/product/e-rickshaw-battery-51-2v-uif.webp",
    "/images/product/51-2v-200ah-e-rickshaw-battery-fjv.webp",
  ],
  description: "Fast-charging, high-capacity batteries solving the battery drain issue for e-rickshaw drivers.",
  longDescription: "Maxvolt's E-Rickshaw Lithium Battery is purpose-built to solve the #1 challenge for e-rickshaw operators — battery drain. With advanced LiFePO4 chemistry, fast recharge capability, and an intelligent BMS, our batteries help drivers maximize their daily earnings with longer range and quicker turnaround at charging stations.",
  features: [
    "Fast charging capability enabling quick return to service",
    "Compact, lightweight metal case design preserving passenger area",
    "Extended single-charge range for increased driver income potential",
    "Advanced Battery Management System monitoring temperature and voltage",
    "Overcharge and overheat protection for maximum safety",
    "Durability across various road conditions and climates",
    "Stable power output across all discharge stages",
    "Compatible with multiple e-rickshaw models and configurations",
    "Reduced dangerous emissions vs lead-acid alternatives",
    "Significant operating cost reduction",
  ],
  benefits: [
    { title: "Maximize Daily Income", description: "Longer range and faster charging means more trips per day and significantly higher daily earnings for drivers." },
    { title: "Lower Operating Costs", description: "Lithium chemistry dramatically reduces maintenance costs compared to traditional lead-acid batteries." },
    { title: "Safety First", description: "Multi-layer BMS protection prevents overcharge, overheating, and short circuits — certified under AIS 156." },
    { title: "Eco-Friendly Operation", description: "Zero direct emissions and responsible energy use contributing to India's clean transport goals." },
  ],
  quickSpecs: [
    { label: "Voltage", value: "51V (LiFePO4)" },
    { label: "Capacity Range", value: "86Ah – 100Ah" },
    { label: "Pack Type", value: "Metal Case" },
    { label: "Certification", value: "AIS 156" },
  ],
  specTable: {
    headers: ["Specification", "MEIPLRI-51086", "MEIPLRI-51100"],
    rows: [
      ["Capacity", "51V 86Ah", "51V 100Ah"],
      ["Energy", "4403 Wh", "5100 Wh"],
      ["Charge Voltage", "58.4V", "58.4V"],
      ["Charge Current", "20A", "25A"],
      ["Discharge Voltage", "37.5V", "37.5V"],
      ["Discharge Current", "40A", "50A"],
      ["Dimensions", "541 × 370 × 235 mm", "541 × 370 × 235 mm"],
      ["Weight", "50 kg", "55 kg"],
      ["Pack Type", "Metal Case", "Metal Case"],
    ],
  },
  applications: [
    "E-Rickshaw (Passenger)", "Battery Rickshaw", "Last-Mile Transport", "Rural Mobility", "Urban Commute",
  ],
  certifications: [
    "AIS 156 Government Safety Compliance",
    "ISO Quality Manufacturing Process",
    "Multi-Stage Factory Testing",
  ],
};

export default function ErickshawBatteryPage() {
  return <ProductPageTemplate product={productData} />;
}
