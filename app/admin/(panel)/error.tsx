"use client";

import { C } from "@/lib/theme";

export default function AdminError({ error, reset }: { error: Error; reset: () => void }) {
  return (
    <div className="rounded-2xl p-6" style={{ backgroundColor: C.amber, border: `1px solid ${C.amberBorder}`, color: C.amberText }}>
      <p className="font-semibold mb-1">Something went wrong</p>
      <p className="text-sm mb-4">{error.message || "Please try again."}</p>
      <button onClick={reset} className="px-4 py-2 rounded-full text-sm font-semibold" style={{ backgroundColor: C.primary, color: C.cream }}>
        Try again
      </button>
    </div>
  );
}
