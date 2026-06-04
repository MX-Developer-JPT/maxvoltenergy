import type { Metadata } from "next";
import InvestorsContent from "./InvestorsContent";

export const metadata: Metadata = {
  title: "Investors | MaxVolt Energy Industries Limited",
  description: "MaxVolt Energy investor relations – earnings calls, annual reports, corporate governance, shareholding patterns, and corporate announcements for NSE SME Emerge listed company.",
};

export default function InvestorsPage() {
  return <InvestorsContent />;
}
