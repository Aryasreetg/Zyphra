// Shared layout for social share images (1200×630), rendered with next/og.
import { ImageResponse } from "next/og";

export const OG_SIZE = { width: 1200, height: 630 };

/**
 * Load Noto Serif (which includes the ₹ sign) for just the characters we need.
 * Returns null if Google Fonts can't be reached, so the image still renders.
 */
async function loadSerif(text: string): Promise<ArrayBuffer | null> {
  try {
    const css = await (
      await fetch(`https://fonts.googleapis.com/css2?family=Noto+Serif:wght@400&text=${encodeURIComponent(text)}`)
    ).text();
    const url = css.match(/src: url\((.+?)\) format\('(opentype|truetype)'\)/)?.[1];
    if (!url) return null;
    const res = await fetch(url);
    return res.ok ? await res.arrayBuffer() : null;
  } catch {
    return null;
  }
}

export async function ogImage({ eyebrow, title, meta }: { eyebrow: string; title: string; meta?: string }) {
  const footer = "ZyphraaA space for skills & growthLive · Mentor-led · Project-first";
  const font = await loadSerif(`${eyebrow}${title}${meta ?? ""}${footer}`.toUpperCase() + `${eyebrow}${title}${meta ?? ""}${footer}`);
  // Without the font, swap ₹ for "Rs." so it never renders as a blank box
  if (!font) meta = meta?.replace(/₹/g, "Rs. ");

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px 80px",
          backgroundColor: "#F8F3EA",
          borderTop: "14px solid #1B2A41",
          fontFamily: font ? "Noto Serif" : "serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 18, color: "#86592B", fontSize: 26, letterSpacing: 5, textTransform: "uppercase" }}>
          <div style={{ width: 56, height: 2, backgroundColor: "#86592B" }} />
          {eyebrow}
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 22 }}>
          <div style={{ fontSize: title.length > 40 ? 68 : 82, color: "#1B2A41", lineHeight: 1.05, letterSpacing: -1.5 }}>{title}</div>
          {meta && <div style={{ fontSize: 34, color: "#5C5047" }}>{meta}</div>}
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ fontSize: 54, color: "#1B2A41" }}>Zyphraa</div>
            <div style={{ fontSize: 22, color: "#86592B", letterSpacing: 4, textTransform: "uppercase" }}>A space for skills &amp; growth</div>
          </div>
          <div style={{ display: "flex", fontSize: 26, color: "#5C5047" }}>Live · Mentor-led · Project-first</div>
        </div>
      </div>
    ),
    { ...OG_SIZE, fonts: font ? [{ name: "Noto Serif", data: font, weight: 400, style: "normal" }] : undefined }
  );
}
