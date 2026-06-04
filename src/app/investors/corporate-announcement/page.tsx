import type { Metadata } from "next";
import AnnouncementsContent from "./AnnouncementsContent";

export const metadata: Metadata = {
  title: "Corporate Announcements | MaxVolt Energy Investors",
  description: "MaxVolt Energy corporate announcements – board meetings, EGM proceedings, voting results, and statutory filings.",
};

export default function AnnouncementsPage() {
  return <AnnouncementsContent />;
}
