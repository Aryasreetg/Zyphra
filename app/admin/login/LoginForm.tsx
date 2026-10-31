"use client";

import React, { useActionState } from "react";
import Link from "next/link";
import { login } from "../actions";
import { C } from "@/lib/theme";

export default function LoginForm() {
  const [state, action, pending] = useActionState(login, {});

  return (
    <main className="relative overflow-hidden min-h-screen flex items-center justify-center px-4" style={{ backgroundColor: C.cream }}>
      <div aria-hidden className="blob w-[400px] h-[400px] -top-24 -left-24" style={{ background: "#CFE0D2" }} />
      <div aria-hidden className="blob w-[360px] h-[360px] -bottom-24 -right-24" style={{ background: "#EBD9AE", animationDelay: "-8s" }} />

      <div className="pop-in relative w-full max-w-sm rounded-2xl p-8 shadow-lg" style={{ backgroundColor: "#FFFDF9", border: `1px solid ${C.border}` }}>
        <p className="text-2xl font-serif font-bold mb-0" style={{ color: C.green }}>Zyphraa</p>
        <p className="text-[10px] tracking-[0.2em] uppercase mb-6" style={{ color: C.gold }}>Admin Panel</p>

        <form action={action} className="space-y-4">
          <div>
            <label htmlFor="password" className="block text-xs font-semibold mb-1.5" style={{ color: C.green }}>
              Password
            </label>
            <input id="password" name="password" type="password" required autoFocus autoComplete="current-password" className="field" />
          </div>
          {state.error && (
            <p className="pop-in text-sm rounded-lg px-3 py-2 mb-0" style={{ backgroundColor: "#FBEAE5", color: C.red }}>
              {state.error}
            </p>
          )}
          <button
            type="submit"
            disabled={pending}
            className="btn-shine w-full py-3 rounded-full font-semibold text-sm disabled:opacity-70"
            style={{ backgroundColor: C.green, color: C.cream }}
          >
            {pending ? "Signing in…" : "Sign in"}
          </button>
        </form>
        <Link href="/" className="block text-center text-xs mt-6 hover:underline" style={{ color: C.brownLight }}>
          ← Back to website
        </Link>
      </div>
    </main>
  );
}
