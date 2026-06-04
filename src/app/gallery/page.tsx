import type { Metadata } from "next";
import GalleryContent from "./GalleryContent";

export const metadata: Metadata = {
  title: "Gallery | MaxVolt Energy",
  description: "MaxVolt Energy gallery – manufacturing facility, team, products, and workplace culture.",
};

export default function GalleryPage() {
  return <GalleryContent />;
}
