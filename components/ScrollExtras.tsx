"use client";

import React, { useEffect, useState } from "react";
import { C } from "@/lib/theme";

/** Reading-progress bar along the top of the page + floating back-to-top button. */
const ScrollExtras = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(max > 0 ? Math.min(1, window.scrollY / max) : 0);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  const showTop = progress > 0.08;

  return (
    <>
      <div
        aria-hidden
        className="fixed top-0 left-0 h-[3px] z-[60] origin-left"
        style={{
          width: "100%",
          transform: `scaleX(${progress})`,
          background: `linear-gradient(90deg, ${C.green}, ${C.goldLight})`,
          transition: "none",
        }}
      />
      <button
        type="button"
        aria-label="Back to top"
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        className="fixed bottom-6 right-6 z-50 w-12 h-12 rounded-full shadow-lg flex items-center justify-center hover:-translate-y-1"
        style={{
          backgroundColor: C.green,
          color: C.cream,
          opacity: showTop ? 1 : 0,
          pointerEvents: showTop ? "auto" : "none",
          transform: showTop ? undefined : "translateY(12px)",
          transition: "opacity 300ms ease, transform 300ms ease",
        }}
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 19V5M5 12l7-7 7 7" />
        </svg>
      </button>
    </>
  );
};

export default ScrollExtras;
