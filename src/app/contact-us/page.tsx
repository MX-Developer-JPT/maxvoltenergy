import type { Metadata } from "next";
import ContactContent from "./ContactContent";

export const metadata: Metadata = {
  title: "Contact Us | MaxVolt Energy Industries Limited",
  description: "Contact MaxVolt Energy – Ghaziabad & New Delhi offices. Phone, email, WhatsApp, dealer inquiry, and product inquiry.",
};

export default function ContactPage() {
  return <ContactContent />;
}
