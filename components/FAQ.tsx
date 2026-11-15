"use client";

import React, { useState } from "react";
import Link from "next/link";
import { C } from "@/lib/theme";
import Reveal from "./Reveal";
import { FAQS } from "@/config/faq";



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
