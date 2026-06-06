import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "@/components/ui/PageHero";
import { NAV_ITEMS } from "@/lib/constants";
import { SHOP_CATEGORIES, skusByCategory } from "@/lib/shop";

export const metadata: Metadata = {
  title: "Sitemap | Maxvolt Energy",
  description: "Complete sitemap of Maxvolt Energy — browse every page including products, shop, solutions, investors, blog and more.",
};

const EXTRA = [
  { label: "Home", href: "/" },
  { label: "Product Portfolio", href: "/portfolio" },
  { label: "Shop All Batteries", href: "/shop" },
  { label: "Battery Calculator", href: "/battery-calculator" },
  { label: "Find a Dealer", href: "/find-dealer" },
  { label: "Become a Dealer", href: "/become-a-dealer" },
  { label: "Our Presence", href: "/our-presence" },
  { label: "Blog", href: "/blog" },
  { label: "FAQ", href: "/faq" },
  { label: "Gallery", href: "/gallery" },
  { label: "Career", href: "/career" },
  { label: "Recycle (ReEarth)", href: "/recycle" },
  { label: "Media Coverage", href: "/media" },
  { label: "Privacy Policy", href: "/privacy-policy" },
  { label: "Terms & Conditions", href: "/terms-and-conditions" },
];

function Group({ title, links }: { title: string; links: { label: string; href: string }[] }) {
  return (
    <div className="p-6 rounded-2xl frosted-card border border-black/6">
      <h2 className="text-[#15171c] font-bold text-sm uppercase tracking-wide mb-3">{title}</h2>
      <ul className="space-y-1.5">
        {links.map((l) => (
          <li key={l.href + l.label}>
            <Link href={l.href} className="text-[#52525b] text-sm hover:text-[#D97706] transition-colors">{l.label}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function SitemapPage() {
  return (
    <>
      <PageHero
        badge="Sitemap"
        title={<>Full <span className="gradient-text">Sitemap</span></>}
        description="Every page on the Maxvolt Energy website, organized for quick navigation."
      />
      <section className="section-padding bg-[#f7f7f5]">
        <div className="container-custom grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          <Group title="Main Pages" links={EXTRA} />
          {NAV_ITEMS.map((item) => (
            <Group key={item.label} title={item.label} links={[{ label: `${item.label} (Overview)`, href: item.href }, ...(item.children || [])]} />
          ))}
          {SHOP_CATEGORIES.map((c) => (
            <Group
              key={c.key}
              title={c.name}
              links={[
                { label: `All ${c.name}`, href: `/shop/${c.key}` },
                ...skusByCategory(c.key).map((s) => ({ label: s.name, href: `/shop/${c.key}/${s.slug}` })),
              ]}
            />
          ))}
        </div>
      </section>
    </>
  );
}
