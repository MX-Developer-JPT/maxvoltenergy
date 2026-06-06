import type { Metadata } from "next";
import PageHero from "@/components/ui/PageHero";
import FaqContent, { FaqGroup } from "./FaqContent";

export const metadata: Metadata = {
  title: "FAQ",
  description:
    "Frequently asked questions about Maxvolt Energy lithium batteries for EVs, e-rickshaws, solar and inverters — chemistry, AIS 156 safety, warranty, BMS, recycling and dealer support.",
  keywords: [
    "lithium battery FAQ", "EV battery questions", "e-rickshaw lithium battery",
    "solar battery FAQ", "inverter lithium battery", "battery recycling",
    "LiFePO4 vs lead acid", "AIS 156 certification", "Maxvolt Energy",
  ],
};

const GROUPS: FaqGroup[] = [
  {
    category: "Batteries & Technology",
    items: [
      { q: "What battery chemistry does Maxvolt use?", a: "Maxvolt selects the chemistry best suited to each application. Two-wheelers (e-scooters/e-bikes) use NMC and Li-Ion cells for high energy density, while three-wheelers (e-rickshaws) use LiFePO4 / LFP cells for safety and long cycle life. These chemistries deliver longer life, superior thermal stability and faster charging than conventional lead-acid batteries." },
      { q: "How is a lithium battery better than a lead-acid battery?", a: "Lithium batteries offer 3–5x longer life, up to 50% faster charging, far lower weight, near-zero maintenance and a much higher usable depth of discharge. Over the total cost of ownership, lithium is significantly more economical for EVs, solar and inverter applications." },
      { q: "What is a BMS and why does it matter?", a: "A Battery Management System (BMS) continuously monitors voltage, current, temperature and cell balance. Every Maxvolt pack includes a smart BMS that protects against overcharge, over-discharge, short circuits and thermal events — maximizing safety and lifespan." },
      { q: "What does AIS 156 certification mean?", a: "AIS 156 is India's mandatory battery safety standard for electric vehicles. Maxvolt batteries are AIS 156 certified, meaning they have passed rigorous testing for thermal propagation, short-circuit protection and overall pack safety." },
    ],
  },
  {
    category: "Applications",
    items: [
      { q: "Which vehicles and applications do Maxvolt batteries support?", a: "Maxvolt supplies lithium batteries for e-rickshaws, e-scooters, e-cycles, electric two- and three-wheelers, solar energy storage, inverters and custom energy storage systems for residential, commercial and industrial use." },
      { q: "Can Maxvolt build a customized battery solution?", a: "Yes. Our in-house R&D team designs custom lithium battery packs tailored to your voltage, capacity, form factor and BMS requirements for OEM and specialized applications." },
      { q: "Do you offer solar and inverter batteries?", a: "Yes. Maxvolt offers lithium batteries engineered for solar energy storage and inverter backup, helping maximize solar ROI with deep cycling, high efficiency and long service life." },
    ],
  },
  {
    category: "Sustainability & Recycling",
    items: [
      { q: "Does Maxvolt recycle batteries?", a: "Yes. Through Maxvolt ReEarth we are building a circular economy for EV batteries — recovering lithium and rare earth elements to reduce waste, lower environmental impact and close the loop on sustainable mobility." },
      { q: "What happens to a battery at end of life?", a: "End-of-life packs are collected and processed to recover valuable materials such as lithium, cobalt and rare earth elements, which re-enter the supply chain — minimizing landfill waste and the need for fresh mining." },
    ],
  },
  {
    category: "Buying, Warranty & Support",
    items: [
      { q: "What warranty do Maxvolt batteries carry?", a: "Maxvolt batteries are covered by a manufacturer warranty that varies by product line. Please contact our team or your nearest authorized dealer for the exact warranty terms for your chosen model." },
      { q: "How do I find a Maxvolt dealer near me?", a: "Use our Find a Dealer page to locate authorized Maxvolt dealers by state and city across our pan-India network of 58+ dealers in 22+ states." },
      { q: "How can I become a dealer or OEM partner?", a: "Reach out through our Contact page selecting the dealer or OEM enquiry type. Our partnerships team will get in touch to discuss onboarding, pricing and support." },
    ],
  },
];

export default function FaqPage() {
  const faqLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: GROUPS.flatMap((g) =>
      g.items.map((item) => ({
        "@type": "Question",
        name: item.q,
        acceptedAnswer: { "@type": "Answer", text: item.a },
      }))
    ),
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />
      <PageHero
        badge="Help Center"
        title={<>Frequently Asked <span className="gradient-text">Questions</span></>}
        description="Everything you need to know about Maxvolt lithium batteries — technology, applications, sustainability, warranty and dealer support."
      />
      <FaqContent groups={GROUPS} />
    </>
  );
}
