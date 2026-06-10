import { ImageResponse } from "next/og";

export const runtime = "edge";

// Dynamic, branded Open Graph card. Used as the site-wide default and, with
// ?eyebrow=&title=, for per-page social cards (products, etc.).
export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const title = (searchParams.get("title") || "Powering India's Electric Future").slice(0, 90);
  const eyebrow = (searchParams.get("eyebrow") || "Maxvolt Energy Industries Limited").slice(0, 60);

  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "linear-gradient(135deg, #0a0c14 0%, #14182a 60%, #0a0c14 100%)",
          padding: "72px 80px",
          position: "relative",
        }}
      >
        {/* amber glow */}
        <div
          style={{
            position: "absolute", top: -160, right: -120, width: 560, height: 560, borderRadius: 9999,
            background: "radial-gradient(circle, rgba(255,209,0,0.30) 0%, rgba(255,209,0,0) 70%)",
            display: "flex",
          }}
        />
        {/* top row: wordmark */}
        <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
          <div style={{ width: 56, height: 56, borderRadius: 16, background: "#FFD100", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 34, fontWeight: 900, color: "#0a0c14" }}>
            M
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ fontSize: 30, fontWeight: 800, color: "#ffffff", letterSpacing: -0.5 }}>MaxVolt Energy</div>
            <div style={{ fontSize: 16, color: "#9aa1b2", letterSpacing: 2 }}>ENERGIZING THE FUTURE</div>
          </div>
        </div>

        {/* headline */}
        <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
          <div style={{ fontSize: 20, fontWeight: 700, color: "#FFD100", letterSpacing: 4, textTransform: "uppercase", display: "flex" }}>
            {eyebrow}
          </div>
          <div style={{ fontSize: 64, fontWeight: 900, color: "#ffffff", lineHeight: 1.05, letterSpacing: -1.5, maxWidth: 980, display: "flex" }}>
            {title}
          </div>
        </div>

        {/* bottom row */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", gap: 28, color: "#c7cbd6", fontSize: 22 }}>
            <span>AIS 156 Certified</span>
            <span style={{ color: "#3a3f52" }}>•</span>
            <span>NSE SME Emerge</span>
            <span style={{ color: "#3a3f52" }}>•</span>
            <span>950+ Dealers</span>
          </div>
          <div style={{ height: 8, width: 220, borderRadius: 9999, background: "linear-gradient(90deg,#FFD100,#D97706)", display: "flex" }} />
        </div>
      </div>
    ),
    { width: 1200, height: 630 }
  );
}
