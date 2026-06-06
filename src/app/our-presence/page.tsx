import type { Metadata } from "next";
import PresenceContent from "./PresenceContent";

export const metadata: Metadata = {
  title: "Our Presence",
  description: "Maxvolt Energy's dealer and service network across 22+ states and 150+ cities in India.",
};

export default function OurPresencePage() {
  return <PresenceContent />;
}
