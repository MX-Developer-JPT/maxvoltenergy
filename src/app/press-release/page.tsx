import type { Metadata } from "next";
import PressListContent from "./PressListContent";
import { pressSorted } from "@/lib/press";

export const metadata: Metadata = {
  title: "Press Releases & Newsroom | Maxvolt Energy",
  description:
    "Latest press releases, company news and announcements from Maxvolt Energy Industries Limited — covering investments, product launches, ReEarth recycling, financial milestones and India's EV and energy-storage industry.",
  keywords: [
    "Maxvolt Energy press release",
    "Maxvolt news",
    "Maxvolt ReEarth",
    "lithium battery manufacturer India news",
    "EV battery company announcements",
    "battery energy storage news India",
  ],
  alternates: { canonical: "/press-release" },
};

export default function PressReleasePage() {
  const items = pressSorted();
  return <PressListContent items={items} />;
}
