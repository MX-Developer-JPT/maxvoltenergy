import type { Metadata } from "next";
import DealerLocatorContent from "./DealerLocatorContent";
import { DEALERS } from "@/lib/dealers";

export const metadata: Metadata = {
  title: "Find a Dealer",
  description: "Locate your nearest authorized Maxvolt Energy lithium battery dealer across India on our interactive map — a network spanning 250+ cities in 20 states including Uttar Pradesh, Madhya Pradesh, Rajasthan, Haryana, Bihar, Delhi and beyond.",
  keywords: ["Maxvolt dealer near me", "lithium battery dealer India", "EV battery dealer locator", "e-rickshaw battery dealer", "Maxvolt dealer map"],
  alternates: { canonical: "/find-dealer" },
};

// Stats computed server-side (DEALERS stays out of the client bundle).
export default function FindDealerPage() {
  const stats = {
    dealers: DEALERS.length,
    states: new Set(DEALERS.map((d) => d.state)).size,
    cities: new Set(DEALERS.map((d) => d.city)).size,
    pincodes: new Set(DEALERS.map((d) => d.pincode).filter(Boolean)).size,
  };
  return <DealerLocatorContent stats={stats} />;
}
