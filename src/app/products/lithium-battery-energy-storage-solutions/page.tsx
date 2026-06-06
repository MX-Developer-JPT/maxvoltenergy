import type { Metadata } from "next";
import ProductPageTemplate from "@/components/ui/ProductPageTemplate";

export const metadata: Metadata = {
  title: "Lithium Battery Energy Storage Solutions",
  description: "Maxvolt Lithium Battery Energy Storage – residential, commercial & grid-scale. High density, scalable, 95%+ round-trip efficiency. India's experienced ESS provider.",
};

const productData = {
  id: "lithium-battery-energy-storage-solutions",
  name: "Lithium Battery Energy Storage Solutions",
  category: "Energy Storage",
  color: "#7c3aed",
  image: "/images/product/lithium-battery-energy-storage-solutions-tjf.webp",
  galleryImages: [
    "/images/product/12-8v-100ah-inverter-battery-xgc.webp",
    "/images/product/48v-100ah-inverter-battery-bcg.webp",
    "/images/product/51-2v-100ah-inverter-battery-oqh.webp",
  ],
  description: "Scalable lithium energy storage for residential, commercial, and grid applications.",
  longDescription: "Maxvolt's Lithium Battery Energy Storage Solutions represent the next frontier in energy independence. Featuring high energy density, millisecond response times, and >95% round-trip efficiency, our ESS products seamlessly integrate with solar panels, wind turbines, and grid infrastructure to provide reliable, clean energy storage at any scale.",
  features: [
    "High energy density enabling large power storage in compact packages",
    "Rapid response times — discharge or store within milliseconds",
    "High round-trip efficiency >95% with minimal energy losses",
    "Extended lifespan compared to alternative battery technologies",
    "Highly scalable — expand capacity as requirements grow",
    "Seamless integration with solar panels and wind turbines",
    "Available in 12.8V, 25.6V, 48V, and 51.2V configurations",
    "Capacity options from 100Ah to 300Ah",
    "Advanced BMS with remote monitoring capabilities",
    "Modular design for easy installation and maintenance",
  ],
  benefits: [
    { title: "Energy Independence", description: "Store your own renewable energy and use it on demand — reduce grid dependence and eliminate power outages." },
    { title: "Cost Savings", description: "Leverage off-peak electricity rates and solar surplus to dramatically reduce energy bills over time." },
    { title: "Grid Support", description: "Provide frequency regulation and peak shaving services to utilities — turning your storage into a revenue source." },
    { title: "Scalable Architecture", description: "Start with what you need today and expand seamlessly as your energy requirements grow." },
  ],
  quickSpecs: [
    { label: "Voltage Range", value: "12.8V – 51.2V" },
    { label: "Capacity Range", value: "100Ah – 300Ah" },
    { label: "Efficiency", value: ">95% Round-Trip" },
    { label: "Cell Chemistry", value: "LiFePO4" },
  ],
  specTable: {
    headers: ["Voltage Series", "Capacity Options", "Applications", "Integration"],
    rows: [
      ["12.8V Series", "100Ah / 150Ah / 200Ah / 300Ah", "Residential, UPS Backup", "Solar / Grid"],
      ["25.6V Series", "100Ah / 200Ah", "Commercial Backup", "Solar / Grid"],
      ["48V Series", "100Ah / 150Ah", "Off-Grid Systems", "Solar / Wind"],
      ["51.2V Series", "100Ah / 150Ah", "Commercial/Industrial", "Solar / Grid / Wind"],
    ],
  },
  applications: [
    "Residential Solar Storage", "Commercial Energy Management", "Industrial Backup Power",
    "Grid Stabilization", "Remote / Off-Grid Systems", "Emergency Power Supply",
    "Telecom Infrastructure", "Data Centers",
  ],
  certifications: [
    "AIS 156 Safety Compliance",
    "IEC 62619 Battery Safety Standard",
    "ISO Manufacturing Quality",
    "Multi-Stage Performance Testing",
  ],
};

export default function EnergyStoragePage() {
  return <ProductPageTemplate product={productData} />;
}
