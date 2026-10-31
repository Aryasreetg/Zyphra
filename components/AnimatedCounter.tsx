"use client";

import React, { useEffect, useRef, useState } from "react";

interface AnimatedCounterProps {
  /** Final number to count up to */
  value: number;
  prefix?: string;
  suffix?: string;
  durationMs?: number;
  className?: string;
  style?: React.CSSProperties;
}

/** Counts up from 0 to `value` the first time it scrolls into view. */
const AnimatedCounter = ({ value, prefix = "", suffix = "", durationMs = 1400, className, style }: AnimatedCounterProps) => {
  const ref = useRef<HTMLSpanElement>(null);
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let frame = 0;
    if (reduced || typeof IntersectionObserver === "undefined") {
      frame = requestAnimationFrame(() => setDisplay(value));
      return () => cancelAnimationFrame(frame);
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        observer.disconnect();
        const start = performance.now();
        const tick = (now: number) => {
          const t = Math.min(1, (now - start) / durationMs);
          const eased = 1 - Math.pow(1 - t, 3);
          setDisplay(Math.round(eased * value));
          if (t < 1) frame = requestAnimationFrame(tick);
        };
        frame = requestAnimationFrame(tick);
      },
      { threshold: 0.4 }
    );
    observer.observe(el);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
    };
  }, [value, durationMs]);

  return (
    <span ref={ref} className={className} style={style}>
      {prefix}
      {display.toLocaleString("en-IN")}
      {suffix}
    </span>
  );
};

export default AnimatedCounter;
