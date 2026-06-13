import type { Metadata } from "next";
import ProductsContent from "./ProductsContent";
import { PRODUCTS, SITE_CONFIG } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Products",
  description: "Explore Maxvolt Energy's complete range of lithium battery solutions – e-cycle, e-scooter, e-rickshaw, solar, energy storage, and customized battery packs.",
  alternates: { canonical: "/products" },
};

// ItemList schema helps Google understand the product range and can surface a
// carousel of products in search results.
const itemListLd = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "Maxvolt Energy Lithium Battery Products",
  itemListOrder: "https://schema.org/ItemListOrderAscending",
  numberOfItems: PRODUCTS.length,
  itemListElement: PRODUCTS.map((p, i) => ({
    "@type": "ListItem",
    position: i + 1,
    name: p.name,
    url: `${SITE_CONFIG.url}${p.href}`,
    image: `${SITE_CONFIG.url}${p.image}`,
  })),
};

export default function ProductsPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListLd) }} />
      <ProductsContent />
    </>
  );
}
