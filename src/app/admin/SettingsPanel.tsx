"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  ShieldCheck, KeyRound, Loader2, CheckCircle2, AlertCircle, User, Eye, EyeOff, Server,
} from "lucide-react";
import { SITE_CONFIG } from "@/lib/constants";

interface Me {
  username: string; role: string; customPassword: boolean; lastPasswordChange: number | null;
}

export default function SettingsPanel() {
  const [me, setMe] = useState<Me | null>(null);
  const [current, setCurrent] = useState("");
  const [next, setNext] = useState("");
  const [confirm, setConfirm] = useState("");
  const [show, setShow] = useState(false);
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState<{ type: "ok" | "err"; text: string } | null>(null);

  const loadMe = async () => {
    try {
      const res = await fetch("/api/auth/me", { cache: "no-store" });
      if (res.ok) setMe(await res.json());
    } catch { /* ignore */ }
  };
  useEffect(() => { loadMe(); }, []);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMsg(null);
    if (next !== confirm) { setMsg({ type: "err", text: "New password and confirmation do not match." }); return; }
    if (next.length < 8) { setMsg({ type: "err", text: "New password must be at least 8 characters." }); return; }
    setSaving(true);
    try {
      const res = await fetch("/api/auth/password", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ currentPassword: current, newPassword: next }),
      });
      const data = await res.json().catch(() => ({}));
      if (res.ok) {
        setMsg({ type: "ok", text: "Password updated. It takes effect on your next sign-in." });
        setCurrent(""); setNext(""); setConfirm("");
        loadMe();
      } else {
        setMsg({ type: "err", text: data.error || "Could not update password." });
      }
    } catch {
      setMsg({ type: "err", text: "Network error. Please try again." });
    } finally {
      setSaving(false);
    }
  };

  return (
    <div>
      <div className="mb-6">
        <h2 className="text-xl font-black text-[#15171c]">Settings</h2>
        <p className="text-[#71717a] text-sm mt-0.5">Manage your account, security and review site configuration.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {/* Account */}
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="p-6 rounded-2xl frosted-card">
          <div className="flex items-center gap-2 mb-5">
            <div className="w-9 h-9 rounded-xl bg-[#FFD100]/15 border border-[#D97706]/25 flex items-center justify-center">
              <User size={16} className="text-[#D97706]" />
            </div>
            <h3 className="text-[#15171c] font-bold">Account</h3>
          </div>
          <dl className="space-y-3 text-sm">
            <Row label="Signed in as" value={me?.username || "—"} />
            <Row label="Role" value={me ? me.role : "—"} />
            <Row label="Password source" value={me?.customPassword ? "Custom (rotated)" : "Environment default"} />
            <Row label="Last changed" value={me?.lastPasswordChange ? new Date(me.lastPasswordChange).toLocaleString() : "Never"} />
          </dl>
          <div className="mt-5 flex items-start gap-2 p-3 rounded-xl bg-[#FFD100]/8 border border-[#FFD100]/20 text-[#7a5b00] text-xs leading-relaxed">
            <ShieldCheck size={14} className="shrink-0 mt-0.5 text-[#D97706]" />
            Sessions are signed with an encrypted httpOnly JWT and expire after 8 hours.
          </div>
        </motion.div>

        {/* Change password */}
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 }} className="p-6 rounded-2xl frosted-card">
          <div className="flex items-center gap-2 mb-5">
            <div className="w-9 h-9 rounded-xl bg-[#FFD100]/15 border border-[#D97706]/25 flex items-center justify-center">
              <KeyRound size={16} className="text-[#D97706]" />
            </div>
            <h3 className="text-[#15171c] font-bold">Change Password</h3>
          </div>
          <form onSubmit={submit} className="space-y-3">
            <input type={show ? "text" : "password"} value={current} onChange={(e) => setCurrent(e.target.value)} required
              placeholder="Current password" autoComplete="current-password" className={inputCls} />
            <input type={show ? "text" : "password"} value={next} onChange={(e) => setNext(e.target.value)} required
              placeholder="New password (min 8 chars)" autoComplete="new-password" className={inputCls} />
            <div className="relative">
              <input type={show ? "text" : "password"} value={confirm} onChange={(e) => setConfirm(e.target.value)} required
                placeholder="Confirm new password" autoComplete="new-password" className={inputCls + " pr-10"} />
              <button type="button" onClick={() => setShow(!show)} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#a1a1aa] hover:text-[#52525b]">
                {show ? <EyeOff size={15} /> : <Eye size={15} />}
              </button>
            </div>

            {msg && (
              <div className={`flex items-center gap-2 text-xs ${msg.type === "ok" ? "text-green-600" : "text-red-600"}`} role="alert">
                {msg.type === "ok" ? <CheckCircle2 size={13} /> : <AlertCircle size={13} />} {msg.text}
              </div>
            )}

            <button type="submit" disabled={saving}
              className="w-full py-3 rounded-xl bg-[#FFD100] text-black font-bold text-sm hover:bg-[#FFA800] transition-all disabled:opacity-60 flex items-center justify-center gap-2">
              {saving ? <Loader2 size={15} className="animate-spin" /> : <KeyRound size={15} />}
              {saving ? "Updating…" : "Update Password"}
            </button>
          </form>
        </motion.div>

        {/* Site configuration */}
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="p-6 rounded-2xl frosted-card lg:col-span-2">
          <div className="flex items-center gap-2 mb-5">
            <div className="w-9 h-9 rounded-xl bg-[#FFD100]/15 border border-[#D97706]/25 flex items-center justify-center">
              <Server size={16} className="text-[#D97706]" />
            </div>
            <h3 className="text-[#15171c] font-bold">Site Configuration</h3>
            <span className="ml-auto text-[10px] uppercase tracking-wide text-[#a1a1aa] font-semibold">read-only</span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-3 text-sm">
            <Row label="Company" value={SITE_CONFIG.name} />
            <Row label="Live URL" value={SITE_CONFIG.url} />
            <Row label="Primary email" value={SITE_CONFIG.email} />
            <Row label="Support email" value={SITE_CONFIG.supportEmail} />
            <Row label="Phone" value={SITE_CONFIG.phone} />
            <Row label="WhatsApp" value={SITE_CONFIG.whatsapp} />
            <Row label="Corporate office" value={SITE_CONFIG.addresses.corporate} />
            <Row label="Manufacturing plant" value={SITE_CONFIG.addresses.plant} />
          </div>
          <p className="text-[#a1a1aa] text-[11px] mt-5 leading-relaxed">
            Company details, products and investor documents are version-controlled in code for SEO stability.
            Operational content — enquiries, blog posts and job openings — is managed live from this portal.
          </p>
        </motion.div>
      </div>
    </div>
  );
}

const inputCls = "w-full px-3.5 py-2.5 rounded-xl bg-white border border-black/10 text-[#15171c] text-sm focus:outline-none focus:border-[#D97706]/50";

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-start justify-between gap-4 border-b border-black/5 pb-2.5">
      <dt className="text-[#71717a] shrink-0">{label}</dt>
      <dd className="text-[#15171c] font-medium text-right break-words">{value}</dd>
    </div>
  );
}
