import type { Metadata } from "next";
import ManagementContent from "./ManagementContent";

export const metadata: Metadata = {
  title: "Management | Maxvolt Energy Investors",
  description: "Maxvolt Energy Board of Directors and Key Managerial Personnel – profiles, qualifications, and experience.",
};

export default function ManagementPage() {
  return <ManagementContent />;
}
