"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
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
    <div className="min-h-screen flex items-center justify-center bg-[#f7f7f5] pt-20 px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-sm p-8 rounded-2xl frosted-card"
      >
        <div className="w-14 h-14 rounded-2xl bg-[#FFD100]/15 border border-[#D97706]/25 flex items-center justify-center mb-6 mx-auto">
          <Lock size={22} className="text-[#D97706]" />
        </div>
        <h1 className="text-xl font-black text-[#15171c] text-center mb-1">Secure Portal</h1>
        <p className="text-[#71717a] text-sm text-center mb-6">MaxVolt enquiry management — authorized access only</p>

        <form onSubmit={submit} className="space-y-3">
          <div className="relative">
            <User size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#a1a1aa]" />
            <input
              type="text"
              value={username}
              onChange={(e) => { setUsername(e.target.value); setError(""); }}
              placeholder="Username"
              autoComplete="username"
              autoFocus
              className="w-full pl-10 pr-4 py-3 rounded-xl bg-white border border-black/10 text-[#15171c] text-sm focus:outline-none focus:border-[#D97706]/50"
            />
          </div>
          <div className="relative">
            <Lock size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#a1a1aa]" />
            <input
              type={show ? "text" : "password"}
              value={password}
              onChange={(e) => { setPassword(e.target.value); setError(""); }}
              placeholder="Password"
              autoComplete="current-password"
              className="w-full pl-10 pr-10 py-3 rounded-xl bg-white border border-black/10 text-[#15171c] text-sm focus:outline-none focus:border-[#D97706]/50"
            />
            <button type="button" onClick={() => setShow(!show)} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#a1a1aa] hover:text-[#52525b]">
              {show ? <EyeOff size={15} /> : <Eye size={15} />}
            </button>
          </div>

          {error && (
            <div className="flex items-center gap-2 text-red-600 text-xs" role="alert">
              <ShieldAlert size={13} /> {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-xl bg-[#FFD100] text-black font-bold text-sm hover:bg-[#FFA800] transition-all disabled:opacity-60 flex items-center justify-center gap-2"
          >
            {loading ? <Loader2 size={15} className="animate-spin" /> : null}
            {loading ? "Signing in…" : "Sign In"}
          </button>
        </form>

        <p className="text-[#a1a1aa] text-[11px] text-center mt-4">
          Sessions expire after 8 hours. Protected by encrypted httpOnly tokens.
        </p>
      </motion.div>
    </div>
  );
}
