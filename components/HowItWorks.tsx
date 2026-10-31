"use client";

import React, { useEffect, useRef, useState } from "react";
import { C } from "@/lib/theme";
import Reveal from "./Reveal";
import SectionBg from "./SectionBg";
import { MessageCircle, Compass, Wrench, Rocket, Mic, Flag } from "lucide-react";

const STEPS = [
  {
    Icon: MessageCircle,
    title: "Talk to Us",
    text: "Send a query through the contact form. We'll understand your background, goals, and recommend the right programme — no pressure.",
  },
  {
    Icon: Compass,
    title: "Pick Your Path",
    text: "Choose a flagship, foundation, specialisation, or fully personalised one-on-one track that matches your pace.",
  },
  {
    Icon: Wrench,
    title: "Learn by Building",
    text: "Live sessions, hands-on coding and real projects every week — with code reviews and doubt-clearing along the way.",
  },
  {
    Icon: Rocket,
    title: "Ship & Showcase",
    text: "Deploy your projects to the cloud and build a portfolio on GitHub that recruiters can actually click through.",
  },
  {
    Icon: Mic,
    title: "Get Interview-Ready",
    text: "Mock technical and HR interviews with honest feedback, plus resume and LinkedIn guidance before you apply.",
  },
];

/** Vertical timeline whose progress line fills in as you scroll through it. */
const HowItWorks = () => {
  const ref = useRef<HTMLOListElement>(null);
  const [fill, setFill] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const el = ref.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      const mid = window.innerHeight * 0.6;
      setFill(Math.max(0, Math.min(1, (mid - r.top) / r.height)));
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <section id="journey" className="relative overflow-hidden py-12 sm:py-16 md:py-20" style={{ backgroundColor: C.cream }}>
      <SectionBg
        pattern="dots"
        opacity={0.7}
        icons={[
          { Icon: Compass, className: "top-24 left-[5%] w-24 h-24", rotate: -10 },
          { Icon: Flag, className: "bottom-24 right-[6%] w-20 h-20", rotate: 8 },
        ]}
      />
      <div className="relative max-w-4xl mx-auto px-4 sm:px-6">
        <Reveal>
          <div className="text-center mb-12">
            <p className="text-xs tracking-[0.25em] uppercase font-semibold mb-3" style={{ color: C.gold }}>
              ✦ Your Journey With Zyphraa
            </p>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold mb-4" style={{ color: C.green }}>
              From First Question to First Offer
            </h2>
            <p className="text-base sm:text-lg max-w-2xl mx-auto leading-relaxed" style={{ color: C.brownMid }}>
              A simple, guided path — you always know what&rsquo;s next and why it matters.
            </p>
          </div>
        </Reveal>

        <ol ref={ref} className="relative">
          {/* Track + animated fill */}
          <div aria-hidden className="absolute left-6 sm:left-1/2 top-0 bottom-0 w-[3px] -translate-x-1/2 rounded-full" style={{ backgroundColor: C.sand }} />
          <div
            aria-hidden
            className="absolute left-6 sm:left-1/2 top-0 w-[3px] -translate-x-1/2 rounded-full"
            style={{ height: `${fill * 100}%`, background: `linear-gradient(${C.green}, ${C.gold})`, transition: "height 120ms linear" }}
          />

          {STEPS.map((step, i) => {
            const reached = fill >= (i + 0.3) / STEPS.length;
            const left = i % 2 === 0;
            return (
              <li key={step.title} className="relative mb-10 last:mb-0 pl-16 sm:pl-0 sm:grid sm:grid-cols-2 sm:gap-12">
                <div
                  className="absolute left-6 sm:left-1/2 top-2 w-12 h-12 rounded-full flex items-center justify-center z-10"
                  style={{
                    backgroundColor: reached ? C.green : C.cream,
                    border: `3px solid ${reached ? C.green : C.border}`,
                    transform: `translateX(-50%) scale(${reached ? 1.08 : 1})`,
                    boxShadow: reached ? "0 0 0 6px rgba(45,74,62,0.12)" : "none",
                    transition: "all 400ms cubic-bezier(0.22, 1, 0.36, 1)",
                  }}
                >
                  <step.Icon className="w-5 h-5" style={{ color: reached ? C.cream : C.green, transition: "color 400ms ease" }} />
                </div>
                <Reveal delay={80} className={left ? "sm:col-start-1 sm:text-right" : "sm:col-start-2"}>
                  <div
                    className="hover-lift spotlight rounded-2xl p-5 sm:p-6 shadow-sm"
                    style={{ backgroundColor: C.parchment, border: `1px solid ${C.border}` }}
                  >
                    <p className="text-[10px] tracking-[0.25em] uppercase font-semibold mb-1" style={{ color: C.gold }}>
                      Step {i + 1}
                    </p>
                    <h3 className="font-serif font-bold text-lg sm:text-xl mb-2" style={{ color: C.green }}>
                      {step.title}
                    </h3>
                    <p className="text-sm leading-relaxed mb-0" style={{ color: C.brown }}>
                      {step.text}
                    </p>
                  </div>
                </Reveal>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
};

export default HowItWorks;
