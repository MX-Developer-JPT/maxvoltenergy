import type { Metadata } from "next";
import InvestorDocPage from "@/components/ui/InvestorDocPage";

export const metadata: Metadata = {
  title: "Material Documents | Maxvolt Energy Investors",
  description: "Material documents for inspection disclosed by Maxvolt Energy Industries Limited including incorporation and governance documents.",
};

const DOCS = [
  "Incorporation REG 30",
  "Policy on Preservation and Archival of Documents",
  "Policy On Identification Of Group Companies & Material Creditors",
];

export default function MaterialDocumentPage() {
  return (
    <InvestorDocPage
      badge="Material Documents"
      title={<>Material <span className="gradient-text">Documents</span></>}
      description="Material documents available for inspection, including incorporation records and governance policies of Maxvolt Energy Industries Limited."
      docs={DOCS}
      note="Documents are made available for inspection in compliance with applicable SEBI and Companies Act requirements."
    />
  );
}
