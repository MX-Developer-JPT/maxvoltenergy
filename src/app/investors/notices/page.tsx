import type { Metadata } from "next";
import InvestorDocPage from "@/components/ui/InvestorDocPage";
import { investorDocs } from "@/lib/investor-docs";

export const metadata: Metadata = {
  title: "Notices",
  description: "Maxvolt Energy shareholder and statutory notices — board meeting intimations, EGM proceedings, trading window closures and newspaper publications.",
};

const DOCS = investorDocs("notices");

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
