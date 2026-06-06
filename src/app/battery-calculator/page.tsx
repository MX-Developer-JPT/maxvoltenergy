import type { Metadata } from "next";
import CalculatorContent from "./CalculatorContent";

export const metadata: Metadata = {
  title: "Battery Capacity Calculator | Maxvolt Energy",
  description: "Free lithium battery calculator. Find the ideal Maxvolt battery capacity (Ah / Wh) for your e-rickshaw, e-scooter, solar, or energy storage application based on load, runtime, and range.",
  keywords: ["battery calculator", "lithium battery capacity calculator", "EV battery sizing", "Ah calculator", "solar battery sizing India"],
  alternates: { canonical: "/battery-calculator" },
};

export default function BatteryCalculatorPage() {
  return <CalculatorContent />;
}
