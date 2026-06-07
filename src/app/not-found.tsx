import Link from "next/link";
import { Home, ArrowRight, Search, BatteryWarning } from "lucide-react";

export default function NotFound() {
  const links = [
    { label: "Products", href: "/products" },
    { label: "Shop Batteries", href: "/shop" },
    { label: "Solutions", href: "/solutions" },
    { label: "Find a Dealer", href: "/find-dealer" },
    { label: "Contact Us", href: "/contact-us" },
    { label: "Sitemap", href: "/sitemap-page" },
  ];

  return (
    <section className="relative min-h-[72vh] flex items-center justify-center overflow-hidden bg-white">
      <div className="absolute inset-0 grid-pattern opacity-25" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-[#FFD100]/5 blur-[120px] pointer-events-none" />

      <div className="container-custom relative z-10 text-center max-w-2xl py-24">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-[#FFD100]/12 border border-[#FFD100]/25 mb-6">
          <BatteryWarning size={28} className="text-[#D97706]" />
        </div>
        <div className="text-7xl md:text-8xl font-black text-[#15171c] tracking-tight mb-3">
          4<span className="gradient-text">0</span>4
        </div>
        <h1 className="text-2xl md:text-3xl font-bold text-[#15171c] mb-3">Page Not Found</h1>
        <p className="text-[#5f6470] text-sm md:text-base leading-relaxed mb-8 max-w-md mx-auto">
          The page you&apos;re looking for has moved or no longer exists. Let&apos;s get you back on track —
          explore our lithium battery range or reach our team.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-3 mb-10">
          <Link href="/" className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#FFD100] text-black font-bold text-sm hover:bg-[#FFA800] transition-all">
            <Home size={15} /> Back to Home
          </Link>
          <Link href="/shop" className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-black/10 text-[#3f3f46] hover:text-[#15171c] hover:border-[#FFD100]/40 text-sm font-medium transition-all">
            <Search size={15} /> Browse Batteries
          </Link>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-2">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="group inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs text-[#52525b] border border-black/6 bg-black/[0.02] hover:border-[#FFD100]/25 hover:text-[#D97706] transition-all"
            >
              {l.label}
              <ArrowRight size={11} className="opacity-0 -ml-1 group-hover:opacity-100 group-hover:ml-0 transition-all" />
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
