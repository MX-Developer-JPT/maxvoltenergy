import type { Metadata } from "next";
import DealerLocatorContent from "./DealerLocatorContent";

export const metadata: Metadata = {
  title: "Find a Dealer | MaxVolt Energy Dealer Locator",
  description: "Locate your nearest MaxVolt Energy lithium battery dealer or service center across India. 58+ dealers in Delhi, Mumbai, Bangalore, Hyderabad, Lucknow and 150+ cities.",
  keywords: ["MaxVolt dealer near me", "lithium battery dealer India", "EV battery dealer locator", "e-rickshaw battery dealer", "MaxVolt service center"],
  alternates: { canonical: "/find-dealer" },
};

export default function FindDealerPage() {
  return <DealerLocatorContent />;
}
