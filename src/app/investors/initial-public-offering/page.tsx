import type { Metadata } from "next";
import InvestorDocPage from "@/components/ui/InvestorDocPage";

export const metadata: Metadata = {
  title: "Initial Public Offering",
  description: "Maxvolt Energy Industries Limited IPO documents — Draft Red Herring Prospectus, Red Herring Prospectus, Abridged Prospectus and final Prospectus. Listed on NSE SME Emerge.",
};

const DOCS = [
  "Draft Red Herring Prospectus",
  "Red Herring Prospectus",
  "Creditor Materiality",
  "Maxvolt - Abridged Prospectus Final",
  "Prospectus MEIL 14022025",
];

export default function IPOPage() {
  return (
    <InvestorDocPage
      badge="Initial Public Offering"
      title={<>Initial Public <span className="gradient-text">Offering</span></>}
      description="Maxvolt Energy Industries Limited completed its SME IPO and listed on the NSE SME Emerge platform in February 2025. Access the official offer documents below."
      docs={DOCS}
      note="IPO documents are provided in compliance with SEBI ICDR Regulations. The information herein is for reference and does not constitute an offer or invitation to subscribe."
    />
  );
}
