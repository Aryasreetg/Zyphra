"use client";

import React, { useState } from "react";
import Link from "next/link";
import { C } from "@/lib/theme";
import Reveal from "./Reveal";
import SectionBg from "./SectionBg";
import { Plus, CircleHelp, MessageCircle, Lightbulb } from "lucide-react";

const FAQS = [
  {
    q: "I have no coding background. Can I still join?",
    a: "Yes. The foundation programmes (Python & AI/ML, Java & Spring Boot) and the live workshop are designed for complete beginners. We start from the basics and build up step by step.",
  },
  {
    q: "Are the classes live or recorded?",
    a: "Classes are live and instructor-led, so you can ask questions and get your doubts cleared in real time. Hands-on practice and project work happen alongside every session.",
  },
  {
    q: "What will I have at the end of a course?",
    a: "Working, deployed projects you can show recruiters, a GitHub portfolio, a Zyphraa certificate, and mock interview practice so you're ready to talk about your work confidently.",
  },
  {
    q: "Is mock interview practice really included?",
    a: "Yes — every programme now includes live mock interview practice covering technical questions and HR rounds, with honest feedback afterwards.",
  },
  {
    q: "Can I learn one-on-one at my own pace?",
    a: "Absolutely. Personalised one-on-one classes have a fully customised curriculum and flexible scheduling — mornings, evenings or weekends. Send a query and we'll plan it with you.",
  },
  {
    q: "Do you run workshops for colleges?",
    a: "Yes. We run on-campus and online workshops for colleges on web development, full stack, Git, and career readiness. See the Campus page for formats and pricing.",
    link: { href: "/campus", label: "View campus workshops →" },
  },
  {
    q: "How do I enrol or ask about fees and batches?",
    a: "Use the contact form below — pick the course you're interested in and we'll reply within 24 hours with batch dates, fees and next steps.",
  },
];

const FAQ = () => {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" className="relative overflow-hidden py-12 sm:py-16 md:py-20" style={{ backgroundColor: C.parchment }}>
      <SectionBg
        pattern="plus"
        opacity={0.7}
        icons={[
          { Icon: CircleHelp, className: "top-20 left-[6%] w-28 h-28", rotate: -12 },
          { Icon: Lightbulb, className: "bottom-28 right-[6%] w-24 h-24", rotate: 10 },
        ]}
      />
      <div className="relative max-w-3xl mx-auto px-4 sm:px-6">
        <Reveal>
          <div className="text-center mb-10">
            <p className="text-xs tracking-[0.25em] uppercase font-semibold mb-3" style={{ color: C.gold }}>
              ✦ Questions, Answered
            </p>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold" style={{ color: C.green }}>
              Frequently Asked Questions
            </h2>
          </div>
        </Reveal>

        <div className="space-y-3">
          {FAQS.map((item, i) => {
            const isOpen = open === i;
            return (
              <Reveal key={item.q} delay={i * 50}>
                <div
                  className="rounded-2xl"
                  style={{
                    backgroundColor: C.cream,
                    border: `1px solid ${isOpen ? C.green : C.border}`,
                    boxShadow: isOpen ? "0 10px 28px rgba(45,74,62,0.10)" : "none",
                  }}
                >
                  <button
                    type="button"
                    onClick={() => setOpen(isOpen ? null : i)}
                    aria-expanded={isOpen}
                    className="w-full flex items-center justify-between gap-4 text-left px-5 sm:px-6 py-4 sm:py-5"
                  >
                    <span className="flex items-center gap-3 font-semibold text-sm sm:text-base" style={{ color: C.green }}>
                      <CircleHelp className="w-5 h-5 flex-shrink-0" style={{ color: C.gold }} />
                      {item.q}
                    </span>
                    <span
                      className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center"
                      style={{
                        backgroundColor: isOpen ? C.green : C.parchment,
                        color: isOpen ? C.cream : C.green,
                        transform: `rotate(${isOpen ? 45 : 0}deg)`,
                        transition: "transform 300ms ease, background-color 300ms ease",
                      }}
                    >
                      <Plus className="w-4 h-4" />
                    </span>
                  </button>
                  <div className="accordion-body" data-open={isOpen}>
                    <div>
                      <div className="px-5 sm:px-6 pb-5 pl-13 sm:pl-14 text-sm leading-relaxed" style={{ color: C.brown }}>
                        {item.a}
                        {item.link && (
                          <Link href={item.link.href} className="block mt-2 font-semibold hover:underline" style={{ color: C.gold }}>
                            {item.link.label}
                          </Link>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>

        <Reveal>
          <div className="mt-8 text-center">
            <p className="text-sm mb-3" style={{ color: C.brownMid }}>Still have a question?</p>
            <Link
              href="/#contact"
              className="btn-shine inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-semibold hover:-translate-y-0.5"
              style={{ backgroundColor: C.green, color: C.cream }}
            >
              <MessageCircle className="w-4 h-4" />
              Ask us directly
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
};

export default FAQ;
