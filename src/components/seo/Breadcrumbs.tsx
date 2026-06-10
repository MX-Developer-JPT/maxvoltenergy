import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { SITE_CONFIG } from "@/lib/constants";

export interface Crumb {
  name: string;
  href: string;
}

/**
 * Accessible breadcrumb trail with BreadcrumbList JSON-LD (earns breadcrumb
 * rich results in Google). `items` includes every crumb starting with Home;
 * the last item is rendered as the current page.
 */
export default function Breadcrumbs({ items, className = "" }: { items: Crumb[]; className?: string }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((c, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: c.name,
      item: `${SITE_CONFIG.url}${c.href}`,
    })),
  };

  return (
    <nav aria-label="Breadcrumb" className={className}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <ol className="flex items-center gap-1.5 flex-wrap text-xs">
        {items.map((c, i) => {
          const last = i === items.length - 1;
          return (
            <li key={c.href} className="flex items-center gap-1.5">
              {i > 0 && <ChevronRight size={12} className="text-[#c4c4cc] shrink-0" />}
              {last ? (
                <span className="text-[#15171c] font-semibold truncate max-w-[60vw]" aria-current="page">{c.name}</span>
              ) : (
                <Link href={c.href} className="text-[#71717a] hover:text-[#D97706] transition-colors">{c.name}</Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
