import type { Metadata } from "next";
import CSRContent from "./CSRContent";

export const metadata: Metadata = {
  title: "CSR | MaxVolt Energy Corporate Social Responsibility",
  description: "MaxVolt Energy CSR initiatives – environmental commitment, community development, and sustainable manufacturing practices.",
};

export default function CSRPage() {
  return <CSRContent />;
}
