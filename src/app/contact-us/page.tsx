import type { Metadata } from "next";
import ContactContent from "./ContactContent";

export const metadata: Metadata = {
  title: "Contact Us | Maxvolt Energy Industries Limited",
  description: "Contact Maxvolt Energy – Ghaziabad & New Delhi offices. Phone, email, WhatsApp, dealer inquiry, and product inquiry.",
};

export default function ContactPage() {
  return <ContactContent />;
}
