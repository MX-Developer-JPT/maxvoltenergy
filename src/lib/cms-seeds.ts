// Seed data for each CMS collection — used to populate a collection the first
// time it is read (when its JSON file doesn't yet exist). Mirrors the content
// already live on the public site so the admin tables look populated.

import { PRODUCTS, LEADERSHIP, TESTIMONIALS, SERVICE_CENTERS, SITE_CONFIG } from "@/lib/constants";
import { PRESS_RELEASES } from "@/lib/press";

export type SeedRecord = Record<string, unknown> & { enabled?: boolean; order?: number };

export const CMS_SEEDS: Record<string, SeedRecord[]> = {
  "home-sections": [
    { name: "Banners Section", order: 1, enabled: true },
    { name: "Selected Categories With Products", order: 2, enabled: true },
    { name: "Powered with New-Gen Technology", order: 4, enabled: true },
    { name: "Blogs Section", order: 5, enabled: true },
    { name: "Clients Section", order: 6, enabled: true },
    { name: "Why Choose Us", order: 7, enabled: true },
    { name: "Stats Counter", order: 8, enabled: true },
    { name: "Testimonials Section", order: 9, enabled: true },
  ],

  products: PRODUCTS.map((p, i) => ({
    name: p.name,
    slug: p.id,
    category: "Products",
    metaTitle: p.name,
    metaDescription: p.description,
    indexFollow: true,
    owop: false,
    order: i + 1,
    enabled: true,
  })),

  "media-coverage": PRESS_RELEASES.map((pr, i) => ({
    title: pr.title,
    pageUrl: pr.slug,
    publishDate: pr.date,
    source: pr.source?.label || "",
    sourceUrl: pr.source?.url || "",
    excerpt: pr.excerpt,
    metaTitle: pr.title,
    metaDescription: pr.excerpt,
    indexFollow: true,
    order: i + 1,
    enabled: true,
  })),

  banners: [
    { title: "Powering India's Electric Future", subtitle: "AIS 156 certified lithium batteries for every application", image: "/images/product/e-rickshaw-lithium-battery-ohn.webp", link: "/products", order: 1, enabled: true },
    { title: "Energy Storage Solutions", subtitle: "Scalable LiFePO4 storage for homes, business and grid", image: "/images/product/lithium-battery-energy-storage-solutions-tjf.webp", link: "/products/lithium-battery-energy-storage-solutions", order: 2, enabled: true },
  ],

  certificates: [
    { name: "Udyam Registration Certificate", issuer: "Ministry of MSME, Government of India", image: "/images/certificate/-zrp.webp", year: "Since 2019", order: 1, enabled: true },
    { name: "ISO 9001:2015 Quality Management System", issuer: "QCC – Quality Control Certification (IAF Accredited)", image: "/images/certificate/-fzl.webp", year: "2025 – 2027", order: 2, enabled: true },
    { name: "TAC Certificate – 51.2V 105AH Battery", issuer: "Testing Agency, India", image: "/images/certificate/tac-maxvolt-51-2v-105ah-brz.webp", year: "2023", order: 3, enabled: true },
    { name: "TAC Certificate – 63V 40Ah Battery Model", issuer: "Testing Agency, India", image: "/images/certificate/450-tac-maxvolt-62940-106-xkd.webp", year: "2023", order: 4, enabled: true },
    { name: "TAC Certificate – 63V 34Ah Battery Model", issuer: "Testing Agency, India", image: "/images/certificate/449-tac-maxvolt-62934-105-tki.webp", year: "2023", order: 5, enabled: true },
    { name: "TAC Certificate – 63V 29Ah Battery Model", issuer: "Testing Agency, India", image: "/images/certificate/448-tac-maxvolt-62929-104-kkc.webp", year: "2023", order: 6, enabled: true },
  ],

  clients: [
    { name: "OEM Partner", logo: "/images/brand/client-pwd.webp", order: 1, enabled: true },
    { name: "Fleet Partner", logo: "/images/brand/client-eav.webp", order: 2, enabled: true },
  ],

  gallery: [
    { title: "Manufacturing Facility", image: "/images/gallery/-crj.webp", order: 1, enabled: true },
    { title: "Production Line", image: "/images/gallery/-okz.webp", order: 2, enabled: true },
    { title: "Battery Assembly", image: "/images/gallery/-pve.webp", order: 3, enabled: true },
    { title: "Quality Testing", image: "/images/gallery/-xgo.webp", order: 4, enabled: true },
    { title: "Warehouse", image: "/images/gallery/-zxk.webp", order: 5, enabled: true },
  ],

  testimonials: TESTIMONIALS.map((t, i) => ({
    name: t.name,
    role: t.role,
    content: t.content,
    rating: String(t.rating),
    order: i + 1,
    enabled: true,
  })),

  team: LEADERSHIP.map((m, i) => ({
    name: m.name,
    role: m.role,
    designation: m.designation,
    image: m.image,
    order: i + 1,
    enabled: true,
  })),

  policies: [
    { title: "Code of Conduct", fileUrl: "/assets/docs/policy/", order: 1, enabled: true },
    { title: "Whistle Blower Policy", fileUrl: "/assets/docs/policy/", order: 2, enabled: true },
    { title: "Related Party Transaction Policy", fileUrl: "/assets/docs/policy/", order: 3, enabled: true },
    { title: "Policy on Preservation of Documents", fileUrl: "/assets/docs/policy/", order: 4, enabled: true },
    { title: "Nomination & Remuneration Policy", fileUrl: "/assets/docs/policy/", order: 5, enabled: true },
  ],

  locations: [
    { name: "Corporate Office", address: SITE_CONFIG.addresses.corporate, city: "Ghaziabad", state: "Uttar Pradesh", mapUrl: SITE_CONFIG.maps.corporate, phone: SITE_CONFIG.phone, order: 1, enabled: true },
    { name: "Manufacturing Plant — Duhai", address: SITE_CONFIG.addresses.plant, city: "Ghaziabad", state: "Uttar Pradesh", mapUrl: SITE_CONFIG.maps.plant, phone: SITE_CONFIG.phone, order: 2, enabled: true },
    ...SERVICE_CENTERS.map((s, i) => ({
      name: `Service Center — ${s.city}`,
      address: `${s.city}, ${s.state}`,
      city: s.city,
      state: s.state,
      mapUrl: "",
      phone: SITE_CONFIG.supportPhone,
      order: i + 3,
      enabled: true,
    })),
  ],
};
