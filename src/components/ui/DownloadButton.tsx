"use client";

import { useState } from "react";
import { Download, Check, Loader2 } from "lucide-react";
import { downloadDocument } from "@/lib/download";
import { docUrl } from "@/lib/docs";

export default function DownloadButton({
  title,
  url,
  variant = "icon",
  className = "",
}: {
  title: string;
  url?: string;
  variant?: "icon" | "button";
  className?: string;
}) {
  const [state, setState] = useState<"idle" | "loading" | "done">("idle");

  const handle = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setState("loading");
    try {
      await downloadDocument(title, url ?? docUrl(title));
      setState("done");
      setTimeout(() => setState("idle"), 2000);
    } catch {
      setState("idle");
    }
  };

  if (variant === "button") {
    return (
      <button
        onClick={handle}
        disabled={state === "loading"}
        className={`flex items-center gap-2 px-5 py-2.5 rounded-xl border border-black/10 hover:border-[#D97706]/40 text-[#3f3f46] hover:text-[#15171c] text-sm font-medium transition-all disabled:opacity-60 ${className}`}
      >
        {state === "loading" ? <Loader2 size={14} className="animate-spin" /> : state === "done" ? <Check size={14} className="text-green-600" /> : <Download size={14} />}
        {state === "done" ? "Downloaded" : "Download"}
      </button>
    );
  }

  return (
    <button
      onClick={handle}
      aria-label={`Download ${title}`}
      className={`shrink-0 text-[#a1a1aa] hover:text-[#D97706] transition-colors ${className}`}
    >
      {state === "loading" ? <Loader2 size={14} className="animate-spin" /> : state === "done" ? <Check size={14} className="text-green-600" /> : <Download size={14} />}
    </button>
  );
}
