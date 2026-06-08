"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutDashboard, Home, Package, Newspaper, FileText, Images, BadgeCheck,
  Building2, MessageSquareQuote, Users, ShieldCheck, MapPin, Briefcase, Inbox,
  Settings, LogOut, ChevronDown, ChevronsLeft, Sun, Moon, Database, GalleryHorizontalEnd,
  type LucideIcon,
} from "lucide-react";
import { CMS_ENTITIES, CMS_COLLECTIONS } from "@/lib/cms-config";
import EntityManager from "./cms/EntityManager";
import Dashboard from "./Dashboard";
import BlogManager from "./BlogManager";
import CareersManager from "./CareersManager";
import EnquiriesManager from "./EnquiriesManager";
import SettingsPanel from "./SettingsPanel";

type NavItem = { key: string; icon: LucideIcon; label: string; custom?: boolean };

const DATA_ITEMS: NavItem[] = [
  { key: "home-sections", icon: Home, label: CMS_ENTITIES["home-sections"].label },
  { key: "products", icon: Package, label: CMS_ENTITIES["products"].label },
  { key: "media-coverage", icon: Newspaper, label: CMS_ENTITIES["media-coverage"].label },
  { key: "blogs", icon: FileText, label: "Manage Blogs", custom: true },
  { key: "banners", icon: GalleryHorizontalEnd, label: CMS_ENTITIES["banners"].label },
  { key: "certificates", icon: BadgeCheck, label: CMS_ENTITIES["certificates"].label },
  { key: "clients", icon: Building2, label: CMS_ENTITIES["clients"].label },
  { key: "gallery", icon: Images, label: CMS_ENTITIES["gallery"].label },
  { key: "testimonials", icon: MessageSquareQuote, label: CMS_ENTITIES["testimonials"].label },
  { key: "team", icon: Users, label: CMS_ENTITIES["team"].label },
  { key: "policies", icon: ShieldCheck, label: CMS_ENTITIES["policies"].label },
  { key: "locations", icon: MapPin, label: CMS_ENTITIES["locations"].label },
  { key: "careers", icon: Briefcase, label: "Manage Careers", custom: true },
];

const OPS_ITEMS: NavItem[] = [
  { key: "enquiries", icon: Inbox, label: "Enquiries" },
  { key: "settings", icon: Settings, label: "Settings" },
];

export default function AdminPortal() {
  const router = useRouter();
  const [active, setActive] = useState<string>("dashboard");
  const [username, setUsername] = useState("");
  const [collapsed, setCollapsed] = useState(false);
  const [dataOpen, setDataOpen] = useState(true);
  const [theme, setTheme] = useState<"dark" | "light">("dark");
  const [clock, setClock] = useState("");

  useEffect(() => {
    const saved = (typeof window !== "undefined" && localStorage.getItem("mv-admin-theme")) as "dark" | "light" | null;
    if (saved) setTheme(saved);
    fetch("/api/auth/me", { cache: "no-store" })
      .then((r) => (r.ok ? r.json() : null))
      .then((d) => { if (d?.username) setUsername(d.username); })
      .catch(() => {});
  }, []);

  useEffect(() => {
    const tick = () => setClock(
      new Intl.DateTimeFormat("en-GB", {
        weekday: "short", day: "2-digit", month: "short", year: "numeric",
        hour: "2-digit", minute: "2-digit", hour12: true, timeZone: "Asia/Kolkata",
      }).format(new Date())
    );
    tick();
    const t = setInterval(tick, 1000 * 30);
    return () => clearInterval(t);
  }, []);

  const toggleTheme = () => {
    const next = theme === "dark" ? "light" : "dark";
    setTheme(next);
    try { localStorage.setItem("mv-admin-theme", next); } catch {}
  };

  const logout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    router.replace("/admin/login");
    router.refresh();
  };

  const activeLabel = useMemo(() => {
    if (active === "dashboard") return "Dashboard";
    return [...DATA_ITEMS, ...OPS_ITEMS].find((i) => i.key === active)?.label || "";
  }, [active]);

  const go = (key: string) => setActive(key);

  const renderSection = () => {
    if (active === "dashboard") return <Dashboard onNavigate={go} />;
    if (active === "blogs") return <BlogManager />;
    if (active === "careers") return <CareersManager />;
    if (active === "enquiries") return <EnquiriesManager />;
    if (active === "settings") return <SettingsPanel />;
    if (CMS_COLLECTIONS.includes(active)) return <EntityManager collection={active} />;
    return null;
  };

  const NavButton = ({ item }: { item: NavItem }) => {
    const Icon = item.icon;
    const on = active === item.key;
    return (
      <button
        onClick={() => go(item.key)}
        title={collapsed ? item.label : undefined}
        className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold transition-all"
        style={on
          ? { background: "linear-gradient(135deg, var(--a-primary), var(--a-primary-2))", color: "#fff", boxShadow: "0 8px 22px -10px rgba(109,93,252,0.8)" }
          : { color: "var(--a-text-dim)" }}
        onMouseEnter={(e) => { if (!on) e.currentTarget.style.color = "var(--a-text)"; }}
        onMouseLeave={(e) => { if (!on) e.currentTarget.style.color = "var(--a-text-dim)"; }}
      >
        <span className="w-5 h-5 flex items-center justify-center shrink-0">
          {on ? <span className="w-1.5 h-1.5 rounded-full bg-white" /> : <Icon size={17} />}
        </span>
        {!collapsed && <span className="truncate">{item.label}</span>}
      </button>
    );
  };

  return (
    <div className="admin-shell" data-theme={theme}>
      <div className="flex min-h-screen">
        {/* Sidebar */}
        <aside
          className="shrink-0 flex flex-col sticky top-0 h-screen transition-[width] duration-300"
          style={{ width: collapsed ? 76 : 268, background: "var(--a-sidebar)", borderRight: "1px solid var(--a-border)" }}
        >
          {/* Brand */}
          <div className="flex items-center gap-3 px-4 h-[68px] shrink-0" style={{ borderBottom: "1px solid var(--a-border)" }}>
            <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0" style={{ border: "1px solid var(--a-border-strong)" }}>
              <Image src="/images/logo.webp" alt="Maxvolt" width={28} height={28} className="object-contain" />
            </div>
            {!collapsed && <span className="font-black text-base truncate" style={{ color: "var(--a-text)" }}>Maxvolt En…</span>}
            <button onClick={() => setCollapsed((c) => !c)} className="ml-auto p-1.5 rounded-lg transition-colors" style={{ color: "var(--a-text-mute)" }} title="Collapse">
              <ChevronsLeft size={18} className="transition-transform" style={{ transform: collapsed ? "rotate(180deg)" : "none" }} />
            </button>
          </div>

          {/* Nav */}
          <nav className="flex-1 overflow-y-auto admin-scroll px-3 py-4 space-y-1">
            <NavButton item={{ key: "dashboard", icon: LayoutDashboard, label: "Dashboard" }} />

            {!collapsed && <div className="px-3 pt-5 pb-2 text-[10px] font-bold tracking-[0.18em] uppercase" style={{ color: "var(--a-text-mute)" }}>Main Menu</div>}

            {/* Data Management group */}
            <button
              onClick={() => setDataOpen((o) => !o)}
              className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-bold transition-all"
              style={{ color: "var(--a-text)", background: "var(--a-card-2)", border: "1px solid var(--a-border)" }}
            >
              <Database size={17} className="shrink-0" style={{ color: "var(--a-primary-2)" }} />
              {!collapsed && <><span>Data Management</span><ChevronDown size={15} className="ml-auto transition-transform" style={{ transform: dataOpen ? "none" : "rotate(-90deg)" }} /></>}
            </button>

            <AnimatePresence initial={false}>
              {dataOpen && (
                <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden space-y-1 pt-1">
                  {DATA_ITEMS.map((item) => <NavButton key={item.key} item={item} />)}
                </motion.div>
              )}
            </AnimatePresence>

            {!collapsed && <div className="px-3 pt-5 pb-2 text-[10px] font-bold tracking-[0.18em] uppercase" style={{ color: "var(--a-text-mute)" }}>Operations</div>}
            {collapsed && <div className="my-3 mx-2" style={{ borderTop: "1px solid var(--a-border)" }} />}
            {OPS_ITEMS.map((item) => <NavButton key={item.key} item={item} />)}
          </nav>

          {/* Sign out */}
          <div className="p-3 shrink-0" style={{ borderTop: "1px solid var(--a-border)" }}>
            <button onClick={logout} className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold transition-all" style={{ color: "var(--a-text-dim)" }}
              onMouseEnter={(e) => { e.currentTarget.style.color = "var(--a-red)"; }}
              onMouseLeave={(e) => { e.currentTarget.style.color = "var(--a-text-dim)"; }}>
              <LogOut size={17} className="shrink-0" /> {!collapsed && "Sign Out"}
            </button>
          </div>
        </aside>

        {/* Main column */}
        <div className="flex-1 min-w-0 flex flex-col">
          {/* Header */}
          <header className="sticky top-0 z-30 flex items-center gap-4 px-6 h-[68px] backdrop-blur-md"
            style={{ background: "color-mix(in srgb, var(--a-bg) 78%, transparent)", borderBottom: "1px solid var(--a-border)" }}>
            <span className="text-sm font-medium tabular-nums" style={{ color: "var(--a-text-dim)" }}>
              {clock ? `${clock} (IST)` : " "}
            </span>
            <div className="ml-auto flex items-center gap-3">
              <button onClick={toggleTheme} className="w-9 h-9 rounded-xl flex items-center justify-center transition-colors"
                style={{ border: "1px solid var(--a-border)", color: "var(--a-text-dim)" }} title="Toggle theme">
                {theme === "dark" ? <Sun size={16} /> : <Moon size={16} />}
              </button>
              <div className="relative">
                <div className="w-9 h-9 rounded-full flex items-center justify-center font-bold text-sm"
                  style={{ background: "linear-gradient(135deg, var(--a-primary), var(--a-primary-2))", color: "#fff" }}>
                  {(username || "A").slice(0, 1).toUpperCase()}
                </div>
                <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full border-2" style={{ background: "var(--a-green)", borderColor: "var(--a-sidebar)" }} />
              </div>
            </div>
          </header>

          {/* Content */}
          <main className="flex-1 p-6 overflow-x-hidden">
            <AnimatePresence mode="wait">
              <motion.div key={active}
                initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.22 }}>
                {renderSection()}
              </motion.div>
            </AnimatePresence>
          </main>
        </div>
      </div>
    </div>
  );
}
