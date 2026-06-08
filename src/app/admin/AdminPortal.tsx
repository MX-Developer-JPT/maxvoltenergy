"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  LogOut, LayoutDashboard, Inbox, FileText, Briefcase, Settings, Zap,
} from "lucide-react";
import Dashboard from "./Dashboard";
import EnquiriesManager from "./EnquiriesManager";
import BlogManager from "./BlogManager";
import CareersManager from "./CareersManager";
import SettingsPanel from "./SettingsPanel";

export type AdminTab = "dashboard" | "enquiries" | "blog" | "careers" | "settings";

const NAV: { id: AdminTab; label: string; Icon: typeof Inbox }[] = [
  { id: "dashboard", label: "Dashboard", Icon: LayoutDashboard },
  { id: "enquiries", label: "Enquiries", Icon: Inbox },
  { id: "blog", label: "Blog & News", Icon: FileText },
  { id: "careers", label: "Careers", Icon: Briefcase },
  { id: "settings", label: "Settings", Icon: Settings },
];

export default function AdminPortal() {
  const router = useRouter();
  const [tab, setTab] = useState<AdminTab>("dashboard");
  const [username, setUsername] = useState<string>("");

  useEffect(() => {
    fetch("/api/auth/me", { cache: "no-store" })
      .then((r) => (r.ok ? r.json() : null))
      .then((d) => { if (d?.username) setUsername(d.username); })
      .catch(() => {});
  }, []);

  const logout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    router.replace("/admin/login");
    router.refresh();
  };

  return (
    <div className="min-h-screen bg-[#f7f7f5] pt-20">
      <div className="container-custom py-6">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Sidebar */}
          <aside className="lg:w-64 shrink-0">
            <div className="lg:sticky lg:top-24">
              {/* Brand */}
              <div className="flex items-center gap-2.5 mb-6 px-1">
                <div className="w-10 h-10 rounded-xl bg-[#FFD100] flex items-center justify-center shrink-0">
                  <Zap size={20} className="text-black" fill="black" />
                </div>
                <div className="min-w-0">
                  <div className="text-[#15171c] font-black text-sm leading-tight">Maxvolt Admin</div>
                  <div className="text-[#a1a1aa] text-[11px] truncate">{username ? `@${username}` : "Control Center"}</div>
                </div>
              </div>

              {/* Nav — vertical on desktop, horizontal scroll on mobile */}
              <nav className="flex lg:flex-col gap-1.5 overflow-x-auto pb-2 lg:pb-0 -mx-1 px-1 custom-scrollbar">
                {NAV.map(({ id, label, Icon }) => (
                  <button
                    key={id}
                    onClick={() => setTab(id)}
                    className={`flex items-center gap-2.5 px-4 py-2.5 rounded-xl text-sm font-bold transition-all shrink-0 whitespace-nowrap lg:w-full ${
                      tab === id
                        ? "bg-[#FFD100] text-black shadow-[0_4px_14px_rgba(255,209,0,0.35)]"
                        : "text-[#71717a] hover:text-[#15171c] hover:bg-black/[0.03]"
                    }`}
                  >
                    <Icon size={16} /> {label}
                  </button>
                ))}
              </nav>

              <button
                onClick={logout}
                className="mt-3 hidden lg:flex items-center gap-2.5 px-4 py-2.5 rounded-xl text-sm font-bold text-[#71717a] hover:text-red-600 hover:bg-red-50 transition-all w-full"
              >
                <LogOut size={16} /> Sign Out
              </button>
            </div>
          </aside>

          {/* Main */}
          <main className="flex-1 min-w-0">
            {/* Top bar (mobile sign-out) */}
            <div className="flex items-center justify-between mb-5 lg:hidden">
              <h1 className="text-lg font-black text-[#15171c]">Maxvolt Admin</h1>
              <button onClick={logout} className="flex items-center gap-2 px-3.5 py-2 rounded-xl border border-black/10 text-[#52525b] text-sm font-medium">
                <LogOut size={14} /> Sign Out
              </button>
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={tab}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.25 }}
              >
                {tab === "dashboard" && <Dashboard onNavigate={setTab} />}
                {tab === "enquiries" && <EnquiriesManager />}
                {tab === "blog" && <BlogManager />}
                {tab === "careers" && <CareersManager />}
                {tab === "settings" && <SettingsPanel />}
              </motion.div>
            </AnimatePresence>

            <p className="text-[#a1a1aa] text-[11px] mt-10 leading-relaxed max-w-2xl">
              Authenticated via an encrypted httpOnly session cookie. Operational content is stored
              server-side and visible to all signed-in team members in real time.
            </p>
          </main>
        </div>
      </div>
    </div>
  );
}
