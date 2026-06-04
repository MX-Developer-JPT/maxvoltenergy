// Client-side enquiry store (localStorage).
// CRM-ready: swap saveEnquiry/getEnquiries to POST/GET against an API
// or a service like Formspree/HubSpot without changing component code.

export type EnquiryStatus = "new" | "contacted" | "closed";

export interface Enquiry {
  id: string;
  name: string;
  email: string;
  phone?: string;
  subject?: string;
  message: string;
  inquiryType: string; // product | dealer | oem | calculator | general
  source: string;      // page path
  status: EnquiryStatus;
  createdAt: number;
}

const KEY = "maxvolt_enquiries";

export function getEnquiries(): Enquiry[] {
  if (typeof window === "undefined") return [];
  try {
    return JSON.parse(localStorage.getItem(KEY) || "[]");
  } catch {
    return [];
  }
}

export function saveEnquiry(data: Omit<Enquiry, "id" | "status" | "createdAt">): Enquiry {
  const enquiry: Enquiry = {
    ...data,
    id: `ENQ-${Date.now().toString(36).toUpperCase()}`,
    status: "new",
    createdAt: Date.now(),
  };
  const all = getEnquiries();
  all.unshift(enquiry);
  localStorage.setItem(KEY, JSON.stringify(all));
  return enquiry;
}

export function updateEnquiryStatus(id: string, status: EnquiryStatus) {
  const all = getEnquiries().map((e) => (e.id === id ? { ...e, status } : e));
  localStorage.setItem(KEY, JSON.stringify(all));
  return all;
}

export function deleteEnquiry(id: string) {
  const all = getEnquiries().filter((e) => e.id !== id);
  localStorage.setItem(KEY, JSON.stringify(all));
  return all;
}

export function exportEnquiriesCSV(enquiries: Enquiry[]): string {
  const headers = ["ID", "Date", "Name", "Email", "Phone", "Type", "Subject", "Message", "Source", "Status"];
  const rows = enquiries.map((e) => [
    e.id,
    new Date(e.createdAt).toLocaleString(),
    e.name, e.email, e.phone || "", e.inquiryType, e.subject || "",
    `"${e.message.replace(/"/g, '""')}"`, e.source, e.status,
  ]);
  return [headers.join(","), ...rows.map((r) => r.join(","))].join("\n");
}
