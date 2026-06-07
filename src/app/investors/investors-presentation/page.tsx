import type { Metadata } from "next";
import InvestorDocPage from "@/components/ui/InvestorDocPage";
import { investorDocs } from "@/lib/investor-docs";

export const metadata: Metadata = {
  title: "Investors Presentation",
  description: "Maxvolt Energy investor presentations covering business overview, financial performance and growth strategy.",
};

const DOCS = investorDocs("investors-presentation");

export default function InvestorsPresentationPage() {
  return (
    <InvestorDocPage
      badge="Investors Presentation"
      title={<>Investor <span className="gradient-text">Presentations</span></>}
      description="Periodic investor presentations detailing Maxvolt Energy's business overview, production capacity, financial performance and growth roadmap."
      docs={DOCS}
      note="Presentations may contain forward-looking statements subject to risks and uncertainties."
    />
  );
}
