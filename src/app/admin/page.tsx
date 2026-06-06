import type { Metadata } from "next";
import AdminPortal from "./AdminPortal";

export const metadata: Metadata = {
  title: "Enquiry Portal | Maxvolt Energy",
  description: "Internal enquiry management portal.",
  robots: { index: false, follow: false },
};

export default function AdminPage() {
  return <AdminPortal />;
}
