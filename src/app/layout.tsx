import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import { Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import PageTransition from "@/components/layout/PageTransition";
import FloatingWhatsApp from "@/components/ui/FloatingWhatsApp";
import CustomCursor from "@/components/ui/CustomCursor";
import ScrollProgress from "@/components/ui/ScrollProgress";
import { SmoothScrollProvider } from "@/components/providers/SmoothScrollProvider";
import StructuredData from "@/components/seo/StructuredData";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import CommandPalette from "@/components/ui/CommandPalette";
import CookieConsent from "@/components/ui/CookieConsent";
import IntroReveal from "@/components/ui/IntroReveal";
import PWARegister from "@/components/ui/PWARegister";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-display",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Maxvolt Energy Industries Limited | Lithium Battery Manufacturer India",
    template: "%s | Maxvolt Energy",
  },
  description: "Maxvolt Energy Industries Limited – India's leading lithium battery manufacturer for EVs, solar systems, and energy storage. AIS 156 certified. Listed on NSE SME Emerge.",
  keywords: [
    "lithium battery manufacturer India",
    "EV battery manufacturer",
    "electric vehicle battery",
    "e-rickshaw battery",
    "e-scooter battery",
    "e-cycle battery",
    "solar battery",
    "solar energy storage",
    "inverter battery",
    "lithium inverter battery",
    "energy storage solutions",
    "battery energy storage system",
    "LiFePO4 battery",
    "lithium ion battery",
    "battery recycling India",
    "lithium battery recycling",
    "rare earth elements recovery",
    "circular economy battery",
    "Maxvolt ReEarth",
    "AIS 156 certified battery",
    "BMS battery management system",
    "renewable energy storage",
    "clean energy India",
    "EV charging energy",
    "Maxvolt Energy",
    "NSE SME Emerge",
  ],
  authors: [{ name: "Maxvolt Energy Industries Limited" }],
  creator: "Maxvolt Energy Industries Limited",
  publisher: "Maxvolt Energy Industries Limited",
  formatDetection: { email: true, address: true, telephone: true },
  manifest: "/site.webmanifest",
  metadataBase: new URL("https://site.maxvolt-one.co.in"),
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://site.maxvolt-one.co.in",
    title: "Maxvolt Energy Industries Limited",
    description: "Powering India's Electric Future with industry-leading lithium battery technology.",
    siteName: "Maxvolt Energy",
    images: [{ url: "/og", width: 1200, height: 630, alt: "Maxvolt Energy — Powering India's Electric Future" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Maxvolt Energy Industries Limited",
    description: "Powering India's Electric Future",
    images: ["/og"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${spaceGrotesk.variable} ${geistMono.variable}`}>
      <head>
        <StructuredData />
      </head>
      <body className="min-h-screen flex flex-col bg-white text-[#15171c] antialiased cursor-none lg:cursor-none">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[300] focus:px-4 focus:py-2.5 focus:rounded-xl focus:bg-[#FFD100] focus:text-black focus:font-bold focus:text-sm focus:shadow-lg"
        >
          Skip to content
        </a>
        <SmoothScrollProvider>
          <ScrollProgress />
          <CustomCursor />
          <Navbar />
          <main id="main-content" className="flex-1">
            <PageTransition>{children}</PageTransition>
          </main>
          <Footer />
          <FloatingWhatsApp />
          <CommandPalette />
          <CookieConsent />
          <IntroReveal />
          <PWARegister />
        </SmoothScrollProvider>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
