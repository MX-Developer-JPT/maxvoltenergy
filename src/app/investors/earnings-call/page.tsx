import type { Metadata } from "next";
import EarningsContent from "./EarningsContent";

export const metadata: Metadata = {
  title: "Earnings Call",
  description: "Maxvolt Energy earnings call presentations, audio recordings, and transcripts for FY 2025 and FY 2026.",
};

export default function EarningsCallPage() {
  return <EarningsContent />;
}
