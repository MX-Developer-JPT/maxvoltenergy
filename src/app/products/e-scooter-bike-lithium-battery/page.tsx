import type { Metadata } from "next";
import ProductPageTemplate from "@/components/ui/ProductPageTemplate";

export const metadata: Metadata = {
  title: "E-Scooter & Bike Lithium Battery",
  description: "Maxvolt E-Scooter/Bike Lithium Battery – 48V to 74V, 24Ah to 40Ah. High energy density, quick charge, advanced BMS. India's trusted EV battery supplier.",
};

const productData = {
  id: "e-scooter-bike-lithium-battery",
  name: "E-Scooter / Bike Lithium Battery",
  category: "Electric Vehicle",
  color: "#FFA800",
  image: "/images/product/e-scooter-bike-lithium-battery-mpu.webp",
  galleryImages: [
    "/images/product/e-scooter-battery-48v-29ah-kac.webp",
    "/images/product/e-scooter-battery-63v-40ah-mre.webp",
    "/images/product/e-scooter-battery-74v-40ah-qrg.webp",
  ],
  description: "Compact, powerful batteries engineered for modern electric two-wheelers.",
  longDescription: "Maxvolt's E-Scooter/Bike Lithium Battery range delivers the perfect balance of power, weight, and safety for electric two-wheelers. With a comprehensive lineup from 48V to 74V, our batteries integrate seamlessly with all major scooter and bike platforms — delivering extended range, quick charging, and an intelligent BMS that protects your investment.",
  features: [
    "Compact, lightweight construction integrating seamlessly with vehicle design",
    "High-energy density for improved vehicle performance and extended range",
    "Travel farther on a single charge while conserving energy",
    "Quick-charging capability reducing recharge time significantly",
    "Advanced BMS constantly monitoring temperature and voltage",
    "Safeguards against overcharging and overheating",
    "Universal compatibility across major e-scooter and e-bike brands",
    "Clean, green alternative reducing carbon footprint",
    "PVC/Box pack type for lightweight and compact form factor",
    "Available for bulk orders with OEM pricing",
  ],
  benefits: [
    { title: "Extended Range", description: "High energy density means you go farther on a single charge — reducing range anxiety for everyday commuters." },
    { title: "Quick Recharge", description: "Optimized charge acceptance means less time tethered to a charger and more time on the road." },
    { title: "Perfect Fit", description: "Multiple voltage and capacity options ensure a perfect match for your specific scooter or bike model." },
    { title: "Long-Term Reliability", description: "Rigorous quality testing at every production stage ensures consistent performance over thousands of cycles." },
  ],
  quickSpecs: [
    { label: "Voltage Range", value: "48V – 74V" },
    { label: "Capacity Range", value: "24Ah – 40Ah" },
    { label: "Cell Chemistry", value: "NMC / LiFePO4" },
    { label: "Pack Type", value: "PVC / Box" },
  ],
  specTable: {
    headers: ["Voltage", "Capacity", "Model", "Energy", "Charge V", "Charge A", "Dimensions", "Weight"],
    rows: [
      ["48V", "24Ah", "MEIPLES-48024", "1152 Wh", "54.6V", "6A", "200×175×196 mm", "13.5 kg"],
      ["48V", "29Ah", "MEIPLES-48030", "1392 Wh", "54.6V", "6A", "235×195×196 mm", "16.6 kg"],
      ["60V", "24Ah", "MEIPLES-60024", "1440 Wh", "54.6V", "6A", "200×175×196 mm", "12.8 kg"],
      ["63V", "29Ah", "MEIPLES-62929", "1827 Wh", "54.6V", "6A", "235×195×196 mm", "18.2 kg"],
      ["63V", "34Ah", "MEIPLES-62934", "2142 Wh", "54.6V", "8A", "209×150×255 mm", "19.6 kg"],
      ["63V", "40Ah", "MEIPLES-62940", "2520 Wh", "54.6V", "8A", "189×150×330 mm", "22.7 kg"],
      ["74V", "29Ah", "MEIPLES-74029", "2146 Wh", "54.6V", "6A", "189×150×330 mm", "19.3 kg"],
      ["74V", "34Ah", "MEIPLES-74034", "2516 Wh", "54.6V", "8A", "209×150×255 mm", "22.2 kg"],
      ["74V", "40Ah", "MEIPLES-74040", "2960 Wh", "54.6V", "8A", "196×177×330 mm", "24.3 kg"],
    ],
  },
  applications: ["E-Scooter", "E-Bike", "Electric Two-Wheeler", "Delivery Vehicles", "Urban Commute"],
  certifications: [
    "AIS 156 Government Safety Standard",
    "Multi-Stage Factory Quality Testing",
    "ISO Manufacturing Processes",
  ],
};

export default function EScooterBatteryPage() {
  return <ProductPageTemplate product={productData} />;
}
