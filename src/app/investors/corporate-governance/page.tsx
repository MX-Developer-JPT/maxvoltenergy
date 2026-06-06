import type { Metadata } from "next";
import GovernanceContent from "./GovernanceContent";

export const metadata: Metadata = {
  title: "Corporate Governance | Maxvolt Energy Investors",
  description: "Maxvolt Energy corporate governance framework – board structure, committees, accountability, and ethical conduct standards.",
};

export default function GovernancePage() {
  return <GovernanceContent />;
}
