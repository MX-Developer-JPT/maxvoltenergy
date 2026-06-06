import type { Metadata } from "next";
import InvestorsContent from "./InvestorsContent";

export const metadata: Metadata = {
  title: "Investors | Maxvolt Energy Industries Limited",
  description: "Maxvolt Energy investor relations – earnings calls, annual reports, corporate governance, shareholding patterns, and corporate announcements for NSE SME Emerge listed company.",
};

export default function InvestorsPage() {
  return <InvestorsContent />;
}
