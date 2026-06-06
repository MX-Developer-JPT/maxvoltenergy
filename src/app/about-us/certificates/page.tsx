import type { Metadata } from "next";
import CertificatesContent from "./CertificatesContent";

export const metadata: Metadata = {
  title: "Certificates | Maxvolt Energy",
  description: "Maxvolt Energy certifications and quality standards – AIS 156, ISO, and TAC certificates for lithium battery manufacturing.",
};

export default function CertificatesPage() {
  return <CertificatesContent />;
}
