import type { Metadata } from "next";
import ShareholdingContent from "./ShareholdingContent";

export const metadata: Metadata = {
  title: "Shareholding Pattern | Maxvolt Energy Investors",
  description: "Maxvolt Energy shareholding pattern – promoter holdings, institutional investors, and public shareholders as filed with regulatory authorities.",
};

export default function ShareholdingPage() {
  return <ShareholdingContent />;
}
