import type { Metadata } from "next";
import AnnualReportsContent from "./AnnualReportsContent";

export const metadata: Metadata = {
  title: "Annual Reports",
  description: "Maxvolt Energy annual reports covering financial performance, operations, and strategic outlook.",
};

export default function AnnualReportsPage() {
  return <AnnualReportsContent />;
}
