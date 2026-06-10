"use client";

import { useState } from "react";
import { Send, CheckCircle2, Loader2 } from "lucide-react";

export default function NewsletterSignup() {
  const [email, setEmail] = useState("");
  const [state, setState] = useState<"idle" | "loading" | "done" | "error">("idle");
  const [msg, setMsg] = useState("");

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setState("loading"); setMsg("");
    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, source: typeof window !== "undefined" ? window.location.pathname : "/" }),
      });
      const data = await res.json().catch(() => ({}));
      if (res.ok) { setState("done"); setEmail(""); }
      else { setState("error"); setMsg(data.error || "Something went wrong."); }
    } catch {
      setState("error"); setMsg("Network error. Please try again.");
    }
  };

  if (state === "done") {
    return (
      <div className="flex items-center gap-2 text-[#15171c] text-sm font-medium">
        <CheckCircle2 size={16} className="text-[#16a34a]" /> You&apos;re subscribed — watch your inbox.
      </div>
    );
  }

  return (
    <form onSubmit={submit} className="w-full">
      <div className="flex gap-2">
        <input
          type="email"
          required
          value={email}
          onChange={(e) => { setEmail(e.target.value); setState("idle"); }}
          placeholder="Your email address"
          aria-label="Email address for newsletter"
          className="flex-1 px-3.5 py-2.5 rounded-xl bg-white border border-black/10 text-[#15171c] text-sm placeholder:text-[#a1a1aa] focus:outline-none focus:border-[#D97706]/50"
        />
        <button
          type="submit"
          disabled={state === "loading"}
          className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-[#FFD100] text-black font-bold text-sm hover:bg-[#FFA800] transition-all disabled:opacity-60 shrink-0"
        >
          {state === "loading" ? <Loader2 size={14} className="animate-spin" /> : <Send size={14} />}
          Subscribe
        </button>
      </div>
      {state === "error" && <p className="text-red-600 text-xs mt-1.5">{msg}</p>}
      <p className="text-[#8a8a93] text-[11px] mt-2">EV & energy-storage insights from Maxvolt. No spam — unsubscribe anytime.</p>
    </form>
  );
}
