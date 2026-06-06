import type { Metadata } from "next";
import PageHero from "@/components/ui/PageHero";
import Link from "next/link";
import { FileText, ArrowLeft, Shield } from "lucide-react";
import DownloadButton from "@/components/ui/DownloadButton";

export const metadata: Metadata = {
  title: "Policies & Notices | Maxvolt Energy Investors",
  description: "Maxvolt Energy policies, statutory notices, and financial reports.",
};

const POLICY_DOCS = [
  { name: "Familiarization Programme of ID", category: "Governance", color: "#D97706" },
  { name: "Nomination And Remuneration Policy", category: "HR", color: "#D97706" },
  { name: "Vigil Mechanism & Whistle Blower Policy", category: "Governance", color: "#D97706" },
  { name: "Code of Conduct For BoD and SMT", category: "Conduct", color: "#D97706" },
  { name: "Code of Practice and Procedure for UPSI", category: "Regulatory", color: "#D97706" },
  { name: "Criteria or Policy for Making Payments to NED", category: "Financial", color: "#D97706" },
  { name: "Policy on Preservation and Archival of Documents", category: "Governance", color: "#D97706" },
  { name: "POSH Policy", category: "HR", color: "#D97706" },
  { name: "Terms & Conditions of Appointment of Independent Directors", category: "Governance", color: "#D97706" },
  { name: "Prohibition of Insider Trading Policy", category: "Regulatory", color: "#D97706" },
  { name: "Policy On Identification Of Group Companies & Material Creditors", category: "Governance", color: "#D97706" },
  { name: "CSR Policy", category: "CSR", color: "#D97706" },
  { name: "Policy on Succession Planning for the Board and Senior Management", category: "Governance", color: "#D97706" },
  { name: "Related Party Transaction Policy", category: "Governance", color: "#D97706" },
];

export default function PoliciesNoticesPage() {
  return (
    <>
      <PageHero
        badge="Policies & Notices"
        title={<>Governance <span className="gradient-text">Documents</span></>}
        description="Maxvolt Energy's corporate policies, statutory notices, and governance documents ensuring transparency and regulatory compliance."
      >
        <Link href="/investors" className="inline-flex items-center gap-2 text-[#71717a] hover:text-[#15171c] text-sm transition-colors">
          <ArrowLeft size={13} />
          Back to Investors
        </Link>
      </PageHero>

      <section className="section-padding bg-[#f7f7f5]">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {POLICY_DOCS.map(({ name, category, color }) => (
              <div key={name} className="group flex items-center gap-4 p-5 rounded-xl frosted-card border border-black/6 hover:border-black/8 transition-all cursor-pointer">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0" style={{ backgroundColor: `${color}10`, border: `1px solid ${color}20` }}>
                  <Shield size={15} style={{ color }} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-[#15171c] text-sm font-medium">{name}</div>
                  <div className="text-[#8a8a93] text-xs">{category}</div>
                </div>
                <DownloadButton title={name} />
              </div>
            ))}
          </div>

          <div className="mt-8 p-5 rounded-xl border border-black/6 bg-black/[0.02] text-xs text-[#71717a]">
            All policies are reviewed and updated regularly. For the most current version or queries, contact{" "}
            <a href="mailto:info@maxvoltenergy.com" className="text-[#D97706] hover:underline">info@maxvoltenergy.com</a>
          </div>
        </div>
      </section>
    </>
  );
}
