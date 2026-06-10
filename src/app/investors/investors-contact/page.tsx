import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "@/components/ui/PageHero";
import { ArrowLeft, MapPin, Mail, Phone, Building2, UserCheck } from "lucide-react";
import { SITE_CONFIG } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Investors Contact",
  description: "Contact details for Maxvolt Energy Industries Limited investor relations, compliance officer and registered office.",
};

export default function InvestorsContactPage() {
  return (
    <>
      <PageHero image="/images/category/investors-contact-puv.webp"
        badge="Investors Contact"
        title={<>Investor <span className="gradient-text">Relations</span></>}
        description="For investor queries, grievances and statutory communications, reach the Maxvolt Energy investor relations team using the details below."
      >
        <Link href="/investors" className="inline-flex items-center gap-2 text-[#71717a] hover:text-[#15171c] text-sm transition-colors">
          <ArrowLeft size={13} /> Back to Investors
        </Link>
      </PageHero>

      <section className="section-padding bg-[#f7f7f5]">
        <div className="container-custom grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="p-7 rounded-2xl frosted-card border border-black/6">
            <div className="w-12 h-12 rounded-xl bg-[#FFD100]/12 border border-[#D97706]/20 flex items-center justify-center mb-4">
              <UserCheck size={20} className="text-[#D97706]" />
            </div>
            <h3 className="text-[#15171c] font-bold text-lg mb-2">Company Secretary &amp; Compliance Officer</h3>
            <p className="text-[#5f6470] text-sm mb-4">For investor grievances and regulatory compliance matters under SEBI (LODR) Regulations.</p>
            <div className="space-y-2 text-sm">
              <a href={`mailto:${SITE_CONFIG.email}`} className="flex items-center gap-2 text-[#D97706] font-semibold"><Mail size={14} /> {SITE_CONFIG.email}</a>
              <a href={`tel:${SITE_CONFIG.phone}`} className="flex items-center gap-2 text-[#52525b]"><Phone size={14} /> {SITE_CONFIG.phone}</a>
            </div>
          </div>

          <div className="p-7 rounded-2xl frosted-card border border-black/6">
            <div className="w-12 h-12 rounded-xl bg-[#FFD100]/12 border border-[#D97706]/20 flex items-center justify-center mb-4">
              <Building2 size={20} className="text-[#D97706]" />
            </div>
            <h3 className="text-[#15171c] font-bold text-lg mb-2">Registered Office</h3>
            <div className="flex items-start gap-2 text-[#5f6470] text-sm mb-3">
              <MapPin size={15} className="text-[#a1a1aa] shrink-0 mt-0.5" /> {SITE_CONFIG.addresses.ghaziabad}
            </div>
            <div className="flex items-start gap-2 text-[#5f6470] text-sm">
              <MapPin size={15} className="text-[#a1a1aa] shrink-0 mt-0.5" /> {SITE_CONFIG.addresses.delhi}
            </div>
          </div>
        </div>

        <div className="container-custom mt-5">
          <div className="p-5 rounded-xl border border-black/6 bg-black/[0.02] text-xs text-[#71717a]">
            Maxvolt Energy Industries Limited is listed on the NSE SME Emerge platform. Shareholders may also contact the
            company&apos;s Registrar and Transfer Agent (RTA) for matters relating to share transfers, dematerialization and
            dividend. RTA details are available in the offer documents on the Initial Public Offering page.
          </div>
        </div>
      </section>
    </>
  );
}
