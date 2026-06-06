import type { Metadata } from "next";
import AnnouncementsContent from "./AnnouncementsContent";

export const metadata: Metadata = {
  title: "Corporate Announcements | Maxvolt Energy Investors",
  description: "Maxvolt Energy corporate announcements – board meetings, EGM proceedings, voting results, and statutory filings.",
};

export default function AnnouncementsPage() {
  return <AnnouncementsContent />;
}
