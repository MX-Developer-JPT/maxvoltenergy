import type { Metadata } from "next";
import ProductPageTemplate from "@/components/ui/ProductPageTemplate";

export const metadata: Metadata = {
  title: "Customized Battery Solution | MaxVolt Energy",
  description: "MaxVolt Custom Lithium Battery Packs – tailor-made for medical devices, industrial equipment, specialty EVs & consumer electronics. Competitive pricing.",
};

const productData = {
  id: "customized-battery-solution",
  name: "Customized Battery Solution",
  category: "Customized",
  color: "#ec4899",
  image: "/images/product/customized-battery-solution-jkz.webp",
  description: "Tailor-made battery packs for medical devices, industrial, and specialized applications.",
  longDescription: "Every project has unique power requirements — and MaxVolt's Customized Battery Solutions team delivers exactly that. From medical devices requiring precise voltage stability to industrial robots demanding peak discharge rates, we design and manufacture bespoke lithium battery packs with advanced BMS, smart charging, and the highest safety standards. Power your world, exactly the way you want it.",
  features: [
    "Fully tailor-made design to exact voltage, capacity, and form factor specifications",
    "High-capacity lithium-ion cells with industry-leading energy density",
    "Advanced Battery Management System with smart charging logic",
    "Multiple safety mechanisms against overcharge, overheating, and short circuits",
    "Eco-friendly design with sustainable material selection",
    "Energy-efficient charging techniques minimizing waste",
    "Applications across portable electronics, EVs, and renewable energy",
    "Medical-grade options for device power reliability",
    "Industrial configurations for high-cycle and high-current applications",
    "Competitive pricing to keep projects within budget",
  ],
  benefits: [
    { title: "Perfect Fit Every Time", description: "We work closely with your engineering team to understand exact power requirements — voltage, current, form factor, and mounting." },
    { title: "Medical Grade Available", description: "IEC 62133 and medical device compatible configurations available for life-critical applications." },
    { title: "Industrial Reliability", description: "High-cycle-count configurations engineered for demanding industrial applications with extreme temperature and vibration resistance." },
    { title: "Budget Control", description: "Competitive pricing model ensures your custom solution stays within project budget without compromising on quality." },
  ],
  quickSpecs: [
    { label: "Voltage", value: "Custom Range" },
    { label: "Capacity", value: "Custom" },
    { label: "Industries", value: "Medical / Industrial / Auto" },
    { label: "BMS", value: "Advanced Smart BMS" },
  ],
  applications: [
    "Medical Devices", "Industrial Equipment", "Automotive", "Consumer Electronics",
    "Renewable Energy", "Robotics", "Defence", "Aerospace", "Marine", "Specialty EVs",
  ],
  certifications: [
    "AIS 156 (EV Applications)",
    "ISO Quality Manufacturing",
    "Medical Device Compatible Options",
    "Custom Testing Protocols Available",
  ],
};

export default function CustomizedBatteryPage() {
  return <ProductPageTemplate product={productData} />;
}
