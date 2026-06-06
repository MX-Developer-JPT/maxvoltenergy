import type { Metadata } from "next";
import ProductsContent from "./ProductsContent";

export const metadata: Metadata = {
  title: "Products | Maxvolt Energy Lithium Battery Solutions",
  description: "Explore Maxvolt Energy's complete range of lithium battery solutions – e-cycle, e-scooter, e-rickshaw, solar, energy storage, and customized battery packs.",
};

export default function ProductsPage() {
  return <ProductsContent />;
}
