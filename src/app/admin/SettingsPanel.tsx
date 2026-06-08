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
        <h1 className="text-2xl font-black" style={{ color: "var(--a-text)" }}>Settings</h1>
        <p className="text-sm mt-0.5" style={{ color: "var(--a-text-dim)" }}>Manage your account, security and review site configuration.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {/* Account */}
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="admin-card p-6">
          <div className="flex items-center gap-2 mb-5">
            <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: "rgba(109,93,252,0.15)", border: "1px solid rgba(109,93,252,0.3)" }}>
              <User size={16} style={{ color: "var(--a-primary-2)" }} />
            </div>
            <h3 className="font-bold" style={{ color: "var(--a-text)" }}>Account</h3>
          </div>
          <dl className="space-y-3 text-sm">
            <Row label="Signed in as" value={me?.username || "—"} />
            <Row label="Role" value={me ? me.role : "—"} />
            <Row label="Password source" value={me?.customPassword ? "Custom (rotated)" : "Environment default"} />
            <Row label="Last changed" value={me?.lastPasswordChange ? new Date(me.lastPasswordChange).toLocaleString() : "Never"} />
          </dl>
          <div className="mt-5 flex items-start gap-2 p-3 rounded-xl text-xs leading-relaxed" style={{ background: "rgba(109,93,252,0.1)", border: "1px solid rgba(109,93,252,0.25)", color: "var(--a-text-dim)" }}>
            <ShieldCheck size={14} className="shrink-0 mt-0.5" style={{ color: "var(--a-primary-2)" }} />
            Sessions are signed with an encrypted httpOnly JWT and expire after 8 hours.
          </div>
        </motion.div>

        {/* Change password */}
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 }} className="admin-card p-6">
          <div className="flex items-center gap-2 mb-5">
            <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: "rgba(109,93,252,0.15)", border: "1px solid rgba(109,93,252,0.3)" }}>
              <KeyRound size={16} style={{ color: "var(--a-primary-2)" }} />
            </div>
            <h3 className="font-bold" style={{ color: "var(--a-text)" }}>Change Password</h3>
          </div>
          <form onSubmit={submit} className="space-y-3">
            <input type={show ? "text" : "password"} value={current} onChange={(e) => setCurrent(e.target.value)} required
              placeholder="Current password" autoComplete="current-password" className="admin-input" />
            <input type={show ? "text" : "password"} value={next} onChange={(e) => setNext(e.target.value)} required
              placeholder="New password (min 8 chars)" autoComplete="new-password" className="admin-input" />
            <div className="relative">
              <input type={show ? "text" : "password"} value={confirm} onChange={(e) => setConfirm(e.target.value)} required
                placeholder="Confirm new password" autoComplete="new-password" className="admin-input pr-10" />
              <button type="button" onClick={() => setShow(!show)} className="absolute right-3.5 top-1/2 -translate-y-1/2" style={{ color: "var(--a-text-mute)" }}>
                {show ? <EyeOff size={15} /> : <Eye size={15} />}
              </button>
            </div>

            {msg && (
              <div className="flex items-center gap-2 text-xs" style={{ color: msg.type === "ok" ? "var(--a-green)" : "var(--a-red)" }} role="alert">
                {msg.type === "ok" ? <CheckCircle2 size={13} /> : <AlertCircle size={13} />} {msg.text}
              </div>
            )}

            <button type="submit" disabled={saving} className="admin-btn-primary w-full justify-center disabled:opacity-60">
              {saving ? <Loader2 size={15} className="animate-spin" /> : <KeyRound size={15} />}
              {saving ? "Updating…" : "Update Password"}
            </button>
          </form>
        </motion.div>

        {/* Site configuration */}
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="admin-card p-6 lg:col-span-2">
          <div className="flex items-center gap-2 mb-5">
            <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: "rgba(109,93,252,0.15)", border: "1px solid rgba(109,93,252,0.3)" }}>
              <Server size={16} style={{ color: "var(--a-primary-2)" }} />
            </div>
            <h3 className="font-bold" style={{ color: "var(--a-text)" }}>Site Configuration</h3>
            <span className="ml-auto text-[10px] uppercase tracking-wide font-semibold" style={{ color: "var(--a-text-mute)" }}>read-only</span>
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
          <p className="text-[11px] mt-5 leading-relaxed" style={{ color: "var(--a-text-mute)" }}>
            Company details and investor documents are version-controlled in code for SEO stability.
            Operational content — home sections, products, media, blogs, careers, testimonials and more —
            is managed live from this portal.
          </p>
        </motion.div>
      </div>
    </div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-start justify-between gap-4 pb-2.5" style={{ borderBottom: "1px solid var(--a-border)" }}>
      <dt className="shrink-0" style={{ color: "var(--a-text-dim)" }}>{label}</dt>
      <dd className="font-medium text-right break-words" style={{ color: "var(--a-text)" }}>{value}</dd>
    </div>
  );
}
