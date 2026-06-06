import type { Metadata } from "next";
import HeroSection from "@/components/sections/HeroSection";
import FeaturedProductsShowcase from "@/components/sections/FeaturedProductsShowcase";
import StatsSection from "@/components/sections/StatsSection";
import ProductsSection from "@/components/sections/ProductsSection";
import CustomBatterySection from "@/components/sections/CustomBatterySection";
import WhyChooseSection from "@/components/sections/WhyChooseSection";
import BrandsSection from "@/components/sections/BrandsSection";
import TimelineSection from "@/components/sections/TimelineSection";
import TestimonialsSection from "@/components/sections/TestimonialsSection";
import BlogPreviewSection from "@/components/sections/BlogPreviewSection";
import CTASection from "@/components/sections/CTASection";

export const metadata: Metadata = {
  title: "Maxvolt Energy Industries Limited | Lithium Battery Manufacturer India",
  description: "Maxvolt Energy – India's leading lithium battery manufacturer. AIS 156 certified batteries for e-rickshaws, e-scooters, solar storage & EVs. Listed on NSE SME Emerge.",
};

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <FeaturedProductsShowcase />
      <StatsSection />
      <ProductsSection />
      <CustomBatterySection />
      <WhyChooseSection />
      <BrandsSection />
      <TimelineSection />
      <TestimonialsSection />
      <BlogPreviewSection />
      <CTASection />
    </>
  );
}
