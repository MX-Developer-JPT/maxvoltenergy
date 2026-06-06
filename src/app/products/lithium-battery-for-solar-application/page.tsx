import type { Metadata } from "next";
import ProductPageTemplate from "@/components/ui/ProductPageTemplate";

export const metadata: Metadata = {
  title: "Lithium Battery for Solar Application | Maxvolt Energy",
  description: "Maxvolt Solar Lithium Battery – optimized for solar energy storage. Fast absorption, 3000+ cycle life, mobile app monitoring. India's premier solar battery manufacturer.",
};

const productData = {
  id: "lithium-battery-for-solar-application",
  name: "Lithium Battery for Solar Application",
  category: "Solar",
  color: "#f97316",
  image: "/images/product/lithium-battery-for-solar-application-zhs.webp",
  description: "Optimized for solar energy storage with fast absorption and long cycle life.",
  longDescription: "Maxvolt's Solar Lithium Battery is purpose-engineered to work in harmony with photovoltaic systems. With exceptional fast-charge acceptance for rapidly absorbing solar surpluses, a 3,000+ cycle lifespan, and a user-friendly mobile monitoring app, our solar batteries help homeowners and businesses achieve true energy independence.",
  features: [
    "Exceptional energy density for efficient compact storage of solar electricity",
    "Fast-charging capabilities to quickly absorb excess solar energy during peak hours",
    "Long cycle life with minimal degradation — 3,000+ cycles",
    "Advanced safety features with zero harmful emissions",
    "Real-time monitoring through user-friendly mobile applications",
    "Scalable solutions for various installation sizes",
    "Deep discharge capability optimized for solar cycling",
    "Wide temperature operation range for outdoor installations",
    "Compatible with all major solar inverter brands",
    "Eco-friendly with no pollutants or hazardous materials",
  ],
  benefits: [
    { title: "Energy Independence", description: "Store solar energy during the day and power your home or business through the night — eliminate grid dependence." },
    { title: "Cost Savings", description: "Reduce electricity bills dramatically by using your own stored solar energy instead of expensive grid power." },
    { title: "Smart Monitoring", description: "Track battery health, charge levels, and usage patterns in real-time via our intuitive mobile application." },
    { title: "Long-Term Investment", description: "3,000+ cycle lifespan and minimal degradation ensure your solar storage investment pays back for many years." },
  ],
  quickSpecs: [
    { label: "Compatibility", value: "All Solar Systems" },
    { label: "Cycle Life", value: "3,000+ Cycles" },
    { label: "Efficiency", value: ">95% Round-Trip" },
    { label: "Monitoring", value: "Mobile App Enabled" },
  ],
  applications: [
    "Residential Solar", "Commercial Solar", "Industrial Solar", "Off-Grid Systems",
    "Rural Electrification", "Emergency Backup", "Agricultural Solar Pump", "Street Lighting",
  ],
  certifications: [
    "AIS 156 Safety Compliance",
    "Solar Inverter Compatibility Certified",
    "ISO Quality Manufacturing",
    "Deep Cycle Performance Tested",
  ],
};

export default function SolarBatteryPage() {
  return <ProductPageTemplate product={productData} />;
}
