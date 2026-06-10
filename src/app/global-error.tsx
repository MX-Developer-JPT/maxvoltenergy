"use client";

import { useEffect } from "react";

export default function GlobalError({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    // Report to Sentry only when a DSN is configured (otherwise tree-shaken out).
    if (process.env.NEXT_PUBLIC_SENTRY_DSN) {
      import("@sentry/nextjs").then((S) => S.captureException(error)).catch(() => {});
    }
  }, [error]);

  return (
    <html lang="en-IN">
      <body style={{ margin: 0, fontFamily: "system-ui, -apple-system, Segoe UI, Roboto, sans-serif" }}>
        <div style={{
          minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center",
          background: "radial-gradient(circle at 50% 40%, #14182a 0%, #0a0c14 70%)", color: "#eef1f7", padding: 24, textAlign: "center",
        }}>
          <div style={{ maxWidth: 460 }}>
            <div style={{ width: 64, height: 64, margin: "0 auto 24px", borderRadius: 18, background: "#FFD100", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 900, fontSize: 36, color: "#0a0c14" }}>M</div>
            <h1 style={{ fontSize: 26, fontWeight: 800, margin: "0 0 10px" }}>Something went wrong</h1>
            <p style={{ color: "#9aa1b2", fontSize: 15, lineHeight: 1.6, margin: "0 0 28px" }}>
              An unexpected error occurred. Our team has been notified — please try again.
            </p>
            <button onClick={() => reset()} style={{ background: "#FFD100", color: "#0a0c14", border: 0, fontWeight: 700, fontSize: 14, padding: "12px 24px", borderRadius: 12, cursor: "pointer" }}>
              Try again
            </button>
          </div>
        </div>
      </body>
    </html>
  );
}
