import type { Metadata } from "next";
import AboutContent from "./AboutContent";

export const metadata: Metadata = {
  title: "About Us | Maxvolt Energy Industries Limited",
  description: "Learn about Maxvolt Energy – India's leading lithium battery manufacturer. Founded 2019, NSE listed 2025. AIS 156 certified, ₹100+ Crore revenue, 170+ team members.",
};

export default function AboutPage() {
  return <AboutContent />;
}
