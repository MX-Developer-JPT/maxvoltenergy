import type { Metadata } from "next";
import DealerLocatorContent from "./DealerLocatorContent";

export const metadata: Metadata = {
  title: "Find a Dealer",
  description: "Locate your nearest authorized Maxvolt Energy lithium battery dealer across India on our interactive map — a network spanning 250+ cities in 20 states including Uttar Pradesh, Madhya Pradesh, Rajasthan, Haryana, Bihar, Delhi and beyond.",
  keywords: ["Maxvolt dealer near me", "lithium battery dealer India", "EV battery dealer locator", "e-rickshaw battery dealer", "Maxvolt dealer map"],
  alternates: { canonical: "/find-dealer" },
};

export default function FindDealerPage() {
  return <DealerLocatorContent />;
}
