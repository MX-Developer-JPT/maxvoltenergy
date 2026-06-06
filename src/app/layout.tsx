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
    default: "MaxVolt Energy Industries Limited | Lithium Battery Manufacturer India",
    template: "%s | MaxVolt Energy",
  },
  description: "MaxVolt Energy Industries Limited – India's leading lithium battery manufacturer for EVs, solar systems, and energy storage. AIS 156 certified. Listed on NSE SME Emerge.",
  keywords: [
    "lithium battery manufacturer India",
    "EV battery manufacturer",
    "e-rickshaw battery",
    "e-scooter battery",
    "solar battery",
    "energy storage solutions",
    "MaxVolt Energy",
    "lithium ion battery",
    "graphene battery",
    "NSE SME Emerge",
  ],
  authors: [{ name: "MaxVolt Energy Industries Limited" }],
  creator: "MaxVolt Energy Industries Limited",
  publisher: "MaxVolt Energy Industries Limited",
  formatDetection: { email: true, address: true, telephone: true },
  manifest: "/site.webmanifest",
  metadataBase: new URL("https://max1.maxvolt-one.co.in"),
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://max1.maxvolt-one.co.in",
    title: "MaxVolt Energy Industries Limited",
    description: "Powering India's Electric Future with industry-leading lithium battery technology.",
    siteName: "MaxVolt Energy",
  },
  twitter: {
    card: "summary_large_image",
    title: "MaxVolt Energy Industries Limited",
    description: "Powering India's Electric Future",
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
        <SmoothScrollProvider>
          <ScrollProgress />
          <CustomCursor />
          <Navbar />
          <main className="flex-1">
            <PageTransition>{children}</PageTransition>
          </main>
          <Footer />
          <FloatingWhatsApp />
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
