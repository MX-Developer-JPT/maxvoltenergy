import type { Metadata } from "next";
import InvestorDocPage from "@/components/ui/InvestorDocPage";
import { investorDocs } from "@/lib/investor-docs";

export const metadata: Metadata = {
  title: "Material Contracts",
  description: "Material contracts and agreements disclosed by Maxvolt Energy Industries Limited under SEBI regulations.",
};

const DOCS = investorDocs("material-contract");

export default function MaterialContractPage() {
  return (
    <InvestorDocPage
      badge="Material Contracts"
      title={<>Material <span className="gradient-text">Contracts</span></>}
      description="Material contracts and agreements entered into by Maxvolt Energy Industries Limited, disclosed for shareholder reference."
      docs={DOCS}
      note="Material contracts are disclosed in line with the SEBI (LODR) Regulations and the company's documents preservation policy. For inspection of original documents, please contact investor relations."
    />
  );
}
