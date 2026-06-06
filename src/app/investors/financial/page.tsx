import type { Metadata } from "next";
import InvestorDocPage from "@/components/ui/InvestorDocPage";

export const metadata: Metadata = {
  title: "Financials",
  description: "Maxvolt Energy financial statements and filings — audited and half-yearly financials, AOC and MGT statutory filings.",
};

const DOCS = [
  "Financials 2024-25",
  "Re-Audited Financials 2023-24",
  "LR Half Yearly Financials 30.09.2025",
  "AOC F.Y. 2023-24",
  "AOC 2 F.Y. 22-23",
  "AOC 2 F.Y. 21-22",
  "MGT-9 F.Y. 21-22",
  "Corrigendum Expenditure Statement Final",
];

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
