import React from "react";
import { C } from "@/lib/theme";

// Small presentational helpers shared by the admin pages.

export const STATUS_STYLES: Record<string, { bg: string; fg: string; label: string }> = {
  // enquiries
  new: { bg: "#E3EEF9", fg: "#1F4F82", label: "New" },
  contacted: { bg: "#FDF1D8", fg: "#8B6914", label: "Contacted" },
  converted: { bg: "#DDEFE3", fg: "#2D6A4F", label: "Converted" },
  closed: { bg: "#ECE7E1", fg: "#6B5744", label: "Closed" },
  // students
  active: { bg: "#DDEFE3", fg: "#2D6A4F", label: "Active" },
  paused: { bg: "#FDF1D8", fg: "#8B6914", label: "Paused" },
  completed: { bg: "#E3EEF9", fg: "#1F4F82", label: "Completed" },
  dropped: { bg: "#F7E1DC", fg: "#B3412E", label: "Dropped" },
};

export function StatusBadge({ status }: { status: string }) {
  const s = STATUS_STYLES[status] ?? { bg: C.parchment, fg: C.brown, label: status };
  return (
    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold whitespace-nowrap" style={{ backgroundColor: s.bg, color: s.fg }}>
      <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: s.fg }} />
      {s.label}
    </span>
  );
}

export function Panel({ children, className = "", style }: { children: React.ReactNode; className?: string; style?: React.CSSProperties }) {
  return (
    <div className={`rounded-2xl shadow-sm ${className}`} style={{ backgroundColor: "#FFFDF9", border: `1px solid ${C.border}`, ...style }}>
      {children}
    </div>
  );
}

export function PageTitle({ title, subtitle, action }: { title: string; subtitle?: string; action?: React.ReactNode }) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-6">
      <div>
        <h1 className="font-serif font-bold text-3xl mb-1" style={{ color: C.green }}>{title}</h1>
        {subtitle && <p className="text-sm mb-0" style={{ color: C.brownMid }}>{subtitle}</p>}
      </div>
      {action}
    </div>
  );
}

export function StatCard({ label, value, hint, accent = C.green }: { label: string; value: React.ReactNode; hint?: string; accent?: string }) {
  return (
    <Panel className="p-5 hover-lift">
      <p className="text-[10px] tracking-[0.2em] uppercase font-semibold mb-2" style={{ color: C.gold }}>{label}</p>
      <p className="font-serif font-bold text-3xl mb-1" style={{ color: accent }}>{value}</p>
      {hint && <p className="text-xs mb-0" style={{ color: C.brownLight }}>{hint}</p>}
    </Panel>
  );
}

export const btnPrimary = "inline-flex items-center justify-center gap-2 px-4 py-2 rounded-full text-sm font-semibold hover:opacity-90 hover:-translate-y-0.5 disabled:opacity-60";
export const btnPrimaryStyle: React.CSSProperties = { backgroundColor: C.green, color: C.cream };
export const btnOutline = "inline-flex items-center justify-center gap-2 px-4 py-2 rounded-full text-sm font-semibold hover:-translate-y-0.5";
export const btnOutlineStyle: React.CSSProperties = { border: `1.5px solid ${C.green}`, color: C.green };

export function formatDate(d: Date | string | null | undefined, withTime = false) {
  if (!d) return "—";
  const date = typeof d === "string" ? new Date(d.length === 10 ? `${d}T00:00:00` : d) : d;
  return date.toLocaleString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
    ...(withTime ? { hour: "numeric", minute: "2-digit" } : {}),
    timeZone: typeof d === "string" && d.length === 10 ? undefined : "Asia/Kolkata",
  });
}

export function formatRupees(n: number) {
  return `₹${n.toLocaleString("en-IN")}`;
}

/** Turns a phone number into a WhatsApp chat link (assumes India if no country code). */
export function whatsappLink(phone: string | null) {
  if (!phone) return null;
  let digits = phone.replace(/\D/g, "");
  if (digits.length === 10) digits = `91${digits}`;
  return digits.length >= 11 ? `https://wa.me/${digits}` : null;
}
