import type { Metadata } from "next";
import HeroSection from "@/components/sections/HeroSection";
import FeaturedProductsShowcase from "@/components/sections/FeaturedProductsShowcase";
import StatsSection from "@/components/sections/StatsSection";
import ProductsSection from "@/components/sections/ProductsSection";
import CustomBatterySection from "@/components/sections/CustomBatterySection";
import BatteryAnatomy from "@/components/sections/BatteryAnatomy";
import WhyChooseSection from "@/components/sections/WhyChooseSection";
import BrandsSection from "@/components/sections/BrandsSection";
import TimelineSection from "@/components/sections/TimelineSection";
import TestimonialsSection from "@/components/sections/TestimonialsSection";
import BlogPreviewSection from "@/components/sections/BlogPreviewSection";
import CTASection from "@/components/sections/CTASection";
import { SITE_CONFIG } from "@/lib/constants";

const videoJsonLd = {
  "@context": "https://schema.org",
  "@type": "VideoObject",
  name: "Anatomy of a Maxvolt Lithium Battery Pack",
  description: "A scroll-driven dissection of a Maxvolt lithium battery pack — protective cover, smart BMS, lithium cell pack and rugged housing — engineered for safety, range and life.",
  thumbnailUrl: [`${SITE_CONFIG.url}/video/battery-explode-poster.webp`],
  contentUrl: `${SITE_CONFIG.url}/video/battery-explode.mp4`,
  uploadDate: "2026-06-10T00:00:00+05:30",
  duration: "PT10S",
  publisher: {
    "@type": "Organization",
    name: "Maxvolt Energy Industries Limited",
    logo: { "@type": "ImageObject", url: `${SITE_CONFIG.url}/images/logo.webp` },
  },
};

export const metadata: Metadata = {
  title: "Maxvolt Energy Industries Limited | Lithium Battery Manufacturer India",
  description: "Maxvolt Energy – India's leading lithium battery manufacturer. AIS 156 certified batteries for e-rickshaws, e-scooters, solar storage & EVs. Listed on NSE SME Emerge.",
};

export default function HomePage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(videoJsonLd) }} />
      <HeroSection />
      <FeaturedProductsShowcase />
      <StatsSection />
      <ProductsSection />
      <CustomBatterySection />
      <BatteryAnatomy />
      <WhyChooseSection />
      <BrandsSection />
      <TimelineSection />
      <TestimonialsSection />
      <BlogPreviewSection />
      <CTASection />
    </>
  );
}
