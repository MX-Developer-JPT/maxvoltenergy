import type { Metadata } from "next";
import PortfolioContent from "./PortfolioContent";

export const metadata: Metadata = {
  title: "Product Portfolio | Maxvolt Energy Lithium Batteries",
  description:
    "Explore Maxvolt Energy's complete product portfolio — e-cycle, e-scooter, e-rickshaw, energy storage, solar and fully customized lithium battery packs with detailed specifications, chemistries and applications.",
  keywords: [
    "lithium battery portfolio", "EV battery range", "e-rickshaw battery specs",
    "e-scooter battery", "solar lithium battery", "energy storage system",
    "customized lithium battery pack", "Maxvolt Energy products",
  ],
};

export default function PortfolioPage() {
  return <PortfolioContent />;
}
