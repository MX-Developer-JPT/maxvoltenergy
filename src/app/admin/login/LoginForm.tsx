"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";
import { motion } from "framer-motion";
import { Lock, User, ShieldAlert, Loader2, Eye, EyeOff } from "lucide-react";

export default function LoginForm() {
  const router = useRouter();
  const params = useSearchParams();
  const from = params.get("from") || "/admin";

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });
      if (res.ok) {
        router.replace(from);
        router.refresh();
      } else {
        const data = await res.json().catch(() => ({}));
        setError(data.error || "Invalid credentials");
        setLoading(false);
      }
    } catch {
      setError("Network error. Please try again.");
      setLoading(false);
    }
  };

  return (
    <div className="admin-shell" data-theme="dark">
      <div className="min-h-screen flex items-center justify-center px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="admin-card w-full max-w-sm p-8"
        >
          <div className="w-14 h-14 rounded-2xl flex items-center justify-center mb-6 mx-auto" style={{ border: "1px solid var(--a-border-strong)" }}>
            <Image src="/images/logo.webp" alt="Maxvolt" width={34} height={34} className="object-contain" />
          </div>
          <h1 className="text-xl font-black text-center mb-1" style={{ color: "var(--a-text)" }}>Maxvolt Admin</h1>
          <p className="text-sm text-center mb-6" style={{ color: "var(--a-text-dim)" }}>Secure control center — authorized access only</p>

          <form onSubmit={submit} className="space-y-3">
            <div className="relative">
              <User size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2" style={{ color: "var(--a-text-mute)" }} />
              <input
                type="text"
                value={username}
                onChange={(e) => { setUsername(e.target.value); setError(""); }}
                placeholder="Username"
                autoComplete="username"
                autoFocus
                className="admin-input pl-10"
              />
            </div>
            <div className="relative">
              <Lock size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2" style={{ color: "var(--a-text-mute)" }} />
              <input
                type={show ? "text" : "password"}
                value={password}
                onChange={(e) => { setPassword(e.target.value); setError(""); }}
                placeholder="Password"
                autoComplete="current-password"
                className="admin-input pl-10 pr-10"
              />
              <button type="button" onClick={() => setShow(!show)} className="absolute right-3.5 top-1/2 -translate-y-1/2" style={{ color: "var(--a-text-mute)" }}>
                {show ? <EyeOff size={15} /> : <Eye size={15} />}
              </button>
            </div>

            {error && (
              <div className="flex items-center gap-2 text-xs" style={{ color: "var(--a-red)" }} role="alert">
                <ShieldAlert size={13} /> {error}
              </div>
            )}

            <button type="submit" disabled={loading} className="admin-btn-primary w-full justify-center disabled:opacity-60">
              {loading ? <Loader2 size={15} className="animate-spin" /> : null}
              {loading ? "Signing in…" : "Sign In"}
            </button>
          </form>

          <p className="text-[11px] text-center mt-4" style={{ color: "var(--a-text-mute)" }}>
            Sessions expire after 8 hours. Protected by encrypted httpOnly tokens.
          </p>
        </motion.div>
      </div>
    </div>
  );
}
