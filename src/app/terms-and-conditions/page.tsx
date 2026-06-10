import type { Metadata } from "next";
import PageHero from "@/components/ui/PageHero";

export const metadata: Metadata = {
  title: "Terms & Conditions",
  description: "Maxvolt Energy terms and conditions for use of our website and products.",
};

export default function TermsPage() {
  return (
    <>
      <PageHero
        badge="Legal"
        title={<>Terms & <span className="gradient-text">Conditions</span></>}
        description="Please read these terms and conditions carefully before using the Maxvolt Energy website or purchasing our products."
      />
      <section className="section-padding bg-[#f7f7f5]">
        <div className="container-custom max-w-3xl">
          <div className="space-y-8 text-[#52525b] text-sm leading-relaxed">
            {[
              {
                title: "Acceptance of Terms",
                content: "By accessing and using the Maxvolt Energy website (maxvolt-one.co.in), you accept and agree to be bound by these Terms and Conditions. If you do not agree, please do not use our website.",
              },
              {
                title: "Use of Website",
                content: "This website is intended for informational purposes about Maxvolt Energy's products and services. You may not use this website for any unlawful purpose or in any way that could damage, disable, or impair the website.",
              },
              {
                title: "Product Information",
                content: "While we strive for accuracy, product specifications, availability, and pricing are subject to change without notice. For confirmed specifications, please contact our sales team directly.",
              },
              {
                title: "Intellectual Property",
                content: "All content on this website, including text, images, logos, and product descriptions, is the property of Maxvolt Energy Industries Limited and is protected by applicable intellectual property laws.",
              },
              {
                title: "Warranty",
                content: "Product warranties are governed by the specific warranty terms provided at the time of purchase. Please refer to your product documentation or contact our support team for warranty information.",
              },
              {
                title: "Limitation of Liability",
                content: "Maxvolt Energy shall not be liable for any indirect, incidental, or consequential damages arising from the use of our website or products beyond the extent permitted by applicable law.",
              },
              {
                title: "Governing Law",
                content: "These terms are governed by the laws of India. Any disputes shall be subject to the jurisdiction of courts in Ghaziabad, Uttar Pradesh, India.",
              },
              {
                title: "Contact",
                content: "For questions about these terms, contact us at info@maxvolt-one.co.in or at E 82, Bulandshahr Road Industrial Area, Ghaziabad (UP) 201009.",
              },
            ].map(({ title, content }) => (
              <div key={title}>
                <h2 className="text-[#15171c] font-bold text-xl mb-3">{title}</h2>
                <p>{content}</p>
              </div>
            ))}
            <p className="text-[#71717a] text-xs pt-4 border-t border-black/6">
              Last updated: June 2025 · Maxvolt Energy Industries Limited
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
