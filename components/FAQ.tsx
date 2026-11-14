"use client";

import React, { useState } from "react";
import Link from "next/link";
import { C } from "@/lib/theme";
import Reveal from "./Reveal";

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
    link: { href: "/campus", label: "View campus workshops" },
  },
  {
    q: "How do I enrol or ask about fees and batches?",
    a: "Use the contact form below — pick the course you're interested in and we'll reply within 24 hours with batch dates, fees and next steps.",
  },
];

const FAQ = () => {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" style={{ backgroundColor: C.cream }}>
      <div className="wrap py-20 lg:py-28 grid lg:grid-cols-12 gap-12 lg:gap-16">
        <Reveal className="lg:col-span-4">
          <div className="lg:sticky lg:top-28">
            <p className="label mb-6">
              <span className="label-num">05</span> Questions, answered
            </p>
            <h2 className="display text-[2.6rem] sm:text-[3.2rem] mb-6" style={{ color: C.primary }}>
              Frequently asked <em style={{ color: C.bronze }}>questions</em>
            </h2>
            <p className="text-[15px] leading-relaxed mb-6" style={{ color: C.brownMid }}>
              Still have a question? We read every message personally.
            </p>
            <Link href="/#contact" className="btn-z btn-line">
              Ask us directly <span className="arr" aria-hidden>→</span>
            </Link>
          </div>
        </Reveal>

        <div className="lg:col-span-8 border-t rule">
          {FAQS.map((item, i) => {
            const isOpen = open === i;
            return (
              <div key={item.q} className="border-b rule">
                <button
                  type="button"
                  onClick={() => setOpen(isOpen ? null : i)}
                  aria-expanded={isOpen}
                  className="w-full flex items-baseline gap-5 text-left py-6"
                >
                  <span className="serif serif-italic text-[14px] w-6 flex-shrink-0" style={{ color: C.bronze }}>
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="flex-1 display text-[1.3rem] sm:text-[1.5rem] leading-snug" style={{ color: C.primary }}>
                    {item.q}
                  </span>
                  <span
                    aria-hidden
                    className="text-xl leading-none flex-shrink-0"
                    style={{ color: C.primary, transform: `rotate(${isOpen ? 45 : 0}deg)`, transition: "transform 300ms ease" }}
                  >
                    +
                  </span>
                </button>
                <div className="accordion-body" data-open={isOpen}>
                  <div>
                    <div className="pl-11 pr-8 pb-7 text-[15.5px] leading-[1.75] max-w-2xl" style={{ color: C.brown }}>
                      {item.a}
                      {item.link && (
                        <Link href={item.link.href} className="ulink on block w-fit mt-3 text-[14px]" style={{ color: C.primary }}>
                          {item.link.label} →
                        </Link>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FAQ;
