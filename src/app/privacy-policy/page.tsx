import type { Metadata } from "next";
import PageHero from "@/components/ui/PageHero";

export const metadata: Metadata = {
  title: "Privacy Policy | MaxVolt Energy Industries Limited",
  description: "MaxVolt Energy's privacy policy covering data collection, use, and protection practices.",
};

export default function PrivacyPolicyPage() {
  return (
    <>
      <PageHero
        badge="Legal"
        title={<>Privacy <span className="gradient-text">Policy</span></>}
        description="MaxVolt Energy Industries Limited is committed to protecting your privacy. This policy explains how we collect, use, and safeguard your information."
      />
      <section className="section-padding bg-[#f7f7f5]">
        <div className="container-custom max-w-3xl">
          <div className="prose prose-invert max-w-none space-y-8 text-[#52525b] text-sm leading-relaxed">
            {[
              {
                title: "Information We Collect",
                content: "We collect information you provide directly, such as name, email address, phone number, and messages when you contact us through our website, WhatsApp, or email. We also collect technical information such as IP address, browser type, and pages visited through cookies and analytics tools.",
              },
              {
                title: "How We Use Your Information",
                content: "We use your information to respond to inquiries, provide product information, process dealer or OEM applications, send relevant communications about our products and services, improve our website experience, and comply with legal obligations.",
              },
              {
                title: "Information Sharing",
                content: "MaxVolt Energy does not sell, trade, or rent your personal information to third parties. We may share information with trusted service partners who assist in operating our website and business, subject to confidentiality agreements.",
              },
              {
                title: "Data Security",
                content: "We implement appropriate security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. However, no method of transmission over the internet is 100% secure.",
              },
              {
                title: "Cookies",
                content: "Our website uses cookies to enhance user experience and analyze site traffic. You can choose to disable cookies through your browser settings, though this may affect some website functionality.",
              },
              {
                title: "Contact Us",
                content: "If you have questions about this privacy policy or your personal data, contact us at info@maxvoltenergy.com or at our Ghaziabad office: E 82, Bulandshahr Road Industrial Area, Ghaziabad (UP) 201009.",
              },
            ].map(({ title, content }) => (
              <div key={title}>
                <h2 className="text-[#15171c] font-bold text-xl mb-3">{title}</h2>
                <p>{content}</p>
              </div>
            ))}
            <p className="text-[#71717a] text-xs pt-4 border-t border-black/6">
              Last updated: June 2025 · MaxVolt Energy Industries Limited
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
