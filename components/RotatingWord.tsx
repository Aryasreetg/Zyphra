"use client";

import React, { useEffect, useState } from "react";

/** Cycles through a list of words with a soft flip-in animation. */
const RotatingWord = ({ words, intervalMs = 2400, className, style }: {
  words: string[];
  intervalMs?: number;
  className?: string;
  style?: React.CSSProperties;
}) => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = setInterval(() => setIndex((i) => (i + 1) % words.length), intervalMs);
    return () => clearInterval(id);
  }, [words.length, intervalMs]);

  return (
    <span className={className} style={{ display: "inline-block", perspective: 600, ...style }} aria-live="polite">
      <span key={index} className="word-in">
        {words[index]}
      </span>
    </span>
  );
};

export default RotatingWord;
