"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { C } from "@/lib/theme";

const ITEMS = [
  { href: "/admin", label: "Dashboard", icon: "📊" },
  { href: "/admin/enquiries", label: "Enquiries", icon: "💬" },
  { href: "/admin/students", label: "Students", icon: "🎓" },
];

export default function AdminNav({ newCount }: { newCount: number }) {
  const pathname = usePathname();
  return (
    <nav className="flex gap-1 overflow-x-auto">
      {ITEMS.map((item) => {
        const active = item.href === "/admin" ? pathname === "/admin" : pathname.startsWith(item.href);
        return (
          <Link
            key={item.href}
            href={item.href}
            className="flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold whitespace-nowrap"
            style={{
              backgroundColor: active ? C.cream : "transparent",
              color: active ? C.primary : "rgba(248,243,234,0.8)",
            }}
          >
            <span>{item.icon}</span>
            {item.label}
            {item.href === "/admin/enquiries" && newCount > 0 && (
              <span className="pulse-dot min-w-5 h-5 px-1.5 rounded-full text-[10px] flex items-center justify-center" style={{ backgroundColor: C.bronzeLight, color: C.primaryDark }}>
                {newCount}
              </span>
            )}
          </Link>
        );
      })}
    </nav>
  );
}
