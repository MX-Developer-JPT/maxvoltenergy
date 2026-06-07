import type { Metadata } from "next";
import InvestorDocPage from "@/components/ui/InvestorDocPage";
import { investorDocs } from "@/lib/investor-docs";

export const metadata: Metadata = {
  title: "Financials",
  description: "Maxvolt Energy financial statements and filings — audited and half-yearly financials, AOC and MGT statutory filings.",
};

const DOCS = investorDocs("financial");

export default function FinancialPage() {
  return (
    <InvestorDocPage
      badge="Financials"
      title={<>Financial <span className="gradient-text">Statements</span></>}
      description="Audited financial statements, half-yearly results and statutory filings for Maxvolt Energy Industries Limited."
      docs={DOCS}
      note="Financial statements are prepared in accordance with the Companies Act, 2013 and applicable accounting standards."
    />
  );
}
