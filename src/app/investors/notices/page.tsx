import type { Metadata } from "next";
import InvestorDocPage from "@/components/ui/InvestorDocPage";

export const metadata: Metadata = {
  title: "Notices | Maxvolt Energy Investors",
  description: "Maxvolt Energy shareholder and statutory notices — board meeting intimations, EGM proceedings, trading window closures and newspaper publications.",
};

const DOCS = [
  "Board Meeting Intimation (12 May 2026)",
  "Board Meeting Intimation Revised (12 May 2026)",
  "Trading Window Closure",
  "EGM Proceedings",
  "Voting Results and Scrutinizers Report",
  "Copy of Newspaper Publication",
  "Copy of Newspaper (Dec 2025)",
  "Final Notice Newspaper",
];

export default function NoticesPage() {
  return (
    <InvestorDocPage
      badge="Notices"
      title={<>Shareholder <span className="gradient-text">Notices</span></>}
      description="Statutory notices, board meeting intimations and shareholder communications issued by Maxvolt Energy Industries Limited under SEBI LODR regulations."
      docs={DOCS}
      note="Notices are published in compliance with the SEBI (Listing Obligations and Disclosure Requirements) Regulations, 2015."
    />
  );
}
