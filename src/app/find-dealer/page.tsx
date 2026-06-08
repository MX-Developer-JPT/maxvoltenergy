import type { Metadata } from "next";
import DealerLocatorContent from "./DealerLocatorContent";

export const metadata: Metadata = {
  title: "Find a Dealer",
  description: "Locate your nearest Maxvolt Energy lithium battery dealer, distributor or OEM partner across India — a network spanning 275+ cities in 20 states including Uttar Pradesh, Madhya Pradesh, Rajasthan, Haryana, Bihar, Delhi and beyond.",
  keywords: ["Maxvolt dealer near me", "lithium battery dealer India", "EV battery dealer locator", "e-rickshaw battery dealer", "Maxvolt distributor", "Maxvolt OEM partner"],
  alternates: { canonical: "/find-dealer" },
};

export default function FindDealerPage() {
  return <DealerLocatorContent />;
}
