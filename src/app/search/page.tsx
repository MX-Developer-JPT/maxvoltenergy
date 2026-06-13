import type { Metadata } from "next";
import { Suspense } from "react";
import SearchContent from "./SearchContent";

export const metadata: Metadata = {
  title: "Search",
  description:
    "Search the Maxvolt Energy website — lithium batteries, solutions, shop categories, dealers by state, investor pages and more.",
  alternates: { canonical: "/search" },
  // A query-driven results page should not compete with real content in the index.
  robots: { index: false, follow: true },
};

export default function SearchPage() {
  return (
    <Suspense fallback={<div className="container-custom pt-32 pb-24 min-h-screen" />}>
      <SearchContent />
    </Suspense>
  );
}
