import React from "react";
import type { LucideIcon } from "lucide-react";

// Decorative, non-interactive backgrounds for sections. Patterns are inline SVGs
// so there are no image files to load.

const svg = (s: string) => `url("data:image/svg+xml,${encodeURIComponent(s)}")`;

const PATTERNS = {
  dots: svg(`<svg xmlns="http://www.w3.org/2000/svg" width="22" height="22"><circle cx="2" cy="2" r="1.3" fill="#C9B793"/></svg>`),
  grid: svg(`<svg xmlns="http://www.w3.org/2000/svg" width="40" height="40"><path d="M40 0H0V40" fill="none" stroke="#D4C5A9" stroke-width="1"/></svg>`),
  waves: svg(`<svg xmlns="http://www.w3.org/2000/svg" width="120" height="40"><path d="M0 20 Q30 0 60 20 T120 20" fill="none" stroke="#D4C5A9" stroke-width="1.2"/></svg>`),
  plus: svg(`<svg xmlns="http://www.w3.org/2000/svg" width="36" height="36"><path d="M18 13v10M13 18h10" stroke="#C9B793" stroke-width="1.4" stroke-linecap="round"/></svg>`),
  // Light pattern for dark green sections
  dotsLight: svg(`<svg xmlns="http://www.w3.org/2000/svg" width="22" height="22"><circle cx="2" cy="2" r="1.2" fill="rgba(245,239,230,0.18)"/></svg>`),
  circuit: svg(`<svg xmlns="http://www.w3.org/2000/svg" width="160" height="160"><g fill="none" stroke="#CDBB96" stroke-width="1.1"><path d="M0 40h40l20 20h40"/><path d="M160 110h-50l-15-15H60"/><path d="M80 0v25l15 15"/><path d="M30 160v-35l20-20"/></g><g fill="#CDBB96"><circle cx="100" cy="60" r="3"/><circle cx="60" cy="95" r="3"/><circle cx="95" cy="40" r="3"/><circle cx="50" cy="105" r="3"/></g></svg>`),
};

export type PatternName = keyof typeof PATTERNS;

interface WatermarkIcon {
  Icon: LucideIcon;
  className: string; // position + size, e.g. "top-10 left-6 w-24 h-24"
  rotate?: number;
}

export default function SectionBg({
  pattern,
  opacity = 0.6,
  fade = "radial",
  icons = [],
  iconColor = "#C9B793",
}: {
  pattern?: PatternName;
  opacity?: number;
  /** How the pattern fades out toward the edges */
  fade?: "radial" | "top" | "bottom" | "none";
  icons?: WatermarkIcon[];
  iconColor?: string;
}) {
  const mask =
    fade === "radial"
      ? "radial-gradient(ellipse at center, #000 35%, transparent 80%)"
      : fade === "top"
        ? "linear-gradient(to bottom, #000, transparent 85%)"
        : fade === "bottom"
          ? "linear-gradient(to top, #000, transparent 85%)"
          : undefined;

  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      {pattern && (
        <div
          className="absolute inset-0"
          style={{ backgroundImage: PATTERNS[pattern], opacity, maskImage: mask, WebkitMaskImage: mask }}
        />
      )}
      {icons.map(({ Icon, className, rotate = 0 }, i) => (
        <Icon
          key={i}
          className={`absolute hidden md:block float-slow ${className}`}
          style={{ color: iconColor, opacity: 0.35, rotate: `${rotate}deg`, animationDelay: `${i * 0.9}s` }}
          strokeWidth={1.2}
        />
      ))}
    </div>
  );
}
