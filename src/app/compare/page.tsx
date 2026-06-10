import type { Metadata } from "next";
import CompareContent from "./CompareContent";

export const metadata: Metadata = {
  title: "Compare Lithium Batteries",
  description: "Compare Maxvolt lithium battery solutions side by side — e-rickshaw, e-scooter, solar, energy storage and custom packs. Chemistry, voltage, capacity and use case at a glance.",
  keywords: ["compare lithium batteries", "Maxvolt battery comparison", "EV battery specs", "LiFePO4 vs NMC", "battery comparison India"],
  alternates: { canonical: "/compare" },
};

export default function ComparePage() {
  return <CompareContent />;
}
