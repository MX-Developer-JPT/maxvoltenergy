import type { Metadata } from "next";
import RfqContent from "./RfqContent";

export const metadata: Metadata = {
  title: "Request a Quote",
  description: "Get a custom quote for Maxvolt lithium batteries — e-rickshaw, e-scooter, solar, energy storage and OEM packs. Tell us your requirement and we'll respond within 24 hours.",
  keywords: ["Maxvolt quote", "lithium battery price India", "EV battery quote", "OEM battery quote", "bulk battery enquiry"],
  alternates: { canonical: "/request-a-quote" },
};

export default function RequestAQuotePage() {
  return <RfqContent />;
}
