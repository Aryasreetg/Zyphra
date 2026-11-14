import React, { Suspense } from "react";
import { C } from "@/lib/theme";
import Reveal from "./Reveal";
import ContactForm from "./ContactForm";

const CHANNELS = [
  { label: "Email", value: "aryasree.zyphraa@gmail.com", href: "mailto:aryasree.zyphraa@gmail.com" },
  { label: "Instagram", value: "@zyphraa.arya", href: "https://www.instagram.com/zyphraa.arya" },
  { label: "LinkedIn", value: "Aryasree TG", href: "https://linkedin.com/in/aryasree-tg-027461201" },
];

const Contact = () => (
  <section id="contact" style={{ backgroundColor: C.parchment }}>
    <div className="wrap py-20 lg:py-28 grid lg:grid-cols-12 gap-12 lg:gap-16">
      {/* Left: words + channels */}
      <Reveal className="lg:col-span-5">
        <p className="label mb-6">
          <span className="label-num">06</span> Get in touch
        </p>
        <h2 className="display text-[2.6rem] sm:text-[3.4rem] mb-6" style={{ color: C.primary }}>
          Have a question? <em style={{ color: C.bronze }}>Let&rsquo;s talk.</em>
        </h2>
        <p className="lede mb-10">
          Not sure which course is right for you? Ask about fees, batches, or anything else — every message is read
          personally by Arya, and we reply within 24 hours.
        </p>

        <dl className="border-t rule mb-0">
          {CHANNELS.map((c) => (
            <div key={c.label} className="flex items-baseline justify-between gap-4 py-4 border-b rule">
              <dt className="text-[11px] tracking-[0.18em] uppercase font-semibold" style={{ color: C.bronze }}>{c.label}</dt>
              <dd className="mb-0 min-w-0">
                <a
                  href={c.href}
                  target={c.href.startsWith("http") ? "_blank" : undefined}
                  rel="noopener noreferrer"
                  className="ulink text-[15px] break-all"
                  style={{ color: C.primary }}
                >
                  {c.value}
                </a>
              </dd>
            </div>
          ))}
        </dl>

      </Reveal>

      {/* Right: form */}
      <Reveal delay={120} className="lg:col-span-7">
        <div className="p-6 sm:p-10 lg:p-12 shadow-[0_24px_60px_-30px_rgba(18,28,44,0.35)]" style={{ backgroundColor: "#FCF8F1", borderTop: `3px solid ${C.primary}` }}>
          <p className="display text-[1.7rem] mb-1" style={{ color: C.primary }}>Send a message</p>
          <p className="text-[14px] mb-8" style={{ color: C.brownMid }}>Free course guidance · reply within 24 hours</p>
          <Suspense fallback={<div className="h-96" />}>
            <ContactForm />
          </Suspense>
        </div>
      </Reveal>
    </div>
  </section>
);

export default Contact;
