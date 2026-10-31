import React, { Suspense } from "react";
import { C } from "@/lib/theme";
import Reveal from "./Reveal";
import ContactForm from "./ContactForm";
import SectionBg from "./SectionBg";
import { Mail, Instagram, Linkedin, Clock, Sparkles, ArrowUpRight, Send, MessageSquareText } from "lucide-react";

const CHANNELS = [
  { Icon: Mail, label: "Email", value: "aryasree.zyphraa@gmail.com", href: "mailto:aryasree.zyphraa@gmail.com" },
  { Icon: Instagram, label: "Instagram", value: "@zyphraa.arya", href: "https://www.instagram.com/zyphraa.arya" },
  { Icon: Linkedin, label: "LinkedIn", value: "Aryasree TG", href: "https://linkedin.com/in/aryasree-tg-027461201" },
];

const Contact = () => (
  <section id="contact" className="relative overflow-hidden py-12 sm:py-16 md:py-20" style={{ backgroundColor: C.cream }}>
    <div aria-hidden className="blob w-[360px] h-[360px] -top-32 -right-24" style={{ background: "#E9DDBF" }} />
    <SectionBg
      pattern="circuit"
      opacity={0.45}
      icons={[
        { Icon: Send, className: "top-20 left-[6%] w-20 h-20", rotate: -15 },
        { Icon: MessageSquareText, className: "top-24 right-[7%] w-20 h-20", rotate: 10 },
      ]}
    />
    <div className="relative max-w-6xl mx-auto px-4 sm:px-6">
      <Reveal>
        <div className="text-center mb-10 sm:mb-12">
          <p className="text-xs tracking-[0.25em] uppercase font-semibold mb-3" style={{ color: C.gold }}>
            ✦ Get In Touch
          </p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold mb-4" style={{ color: C.green }}>
            Have a Question? Let&rsquo;s Talk.
          </h2>
          <p className="text-base sm:text-lg max-w-2xl mx-auto leading-relaxed" style={{ color: C.brownMid }}>
            Not sure which course is right for you? Ask about fees, batches, or anything else — we reply within 24 hours.
          </p>
        </div>
      </Reveal>

      <div className="grid lg:grid-cols-5 gap-6 lg:gap-8">
        {/* Info column */}
        <Reveal className="lg:col-span-2">
          <div className="relative overflow-hidden rounded-2xl p-6 sm:p-8 h-full flex flex-col" style={{ backgroundColor: C.green, color: C.cream }}>
            <SectionBg pattern="dotsLight" opacity={1} fade="none" />
            <Mail aria-hidden className="absolute -right-8 -bottom-10 w-48 h-48" style={{ color: "rgba(245,239,230,0.05)" }} strokeWidth={1} />
            <h3 className="relative flex items-center gap-2 font-serif font-bold text-2xl mb-2" style={{ color: C.cream }}>
              <Sparkles className="w-5 h-5" style={{ color: C.goldLight }} />
              Talk to a mentor
            </h3>
            <p className="relative text-sm leading-relaxed mb-6" style={{ color: "rgba(245,239,230,0.75)" }}>
              Every message is read personally by Arya. Tell us where you are today and where you want to be —
              we&rsquo;ll suggest the best path.
            </p>
            <ul className="relative space-y-3 mb-8">
              {CHANNELS.map((c) => (
                <li key={c.label} className="mb-0">
                  <a
                    href={c.href}
                    target={c.href.startsWith("http") ? "_blank" : undefined}
                    rel="noopener noreferrer"
                    className="group flex items-center gap-3 rounded-xl px-4 py-3 hover:translate-x-1"
                    style={{ backgroundColor: "rgba(245,239,230,0.08)", border: "1px solid rgba(245,239,230,0.15)", transition: "translate 200ms ease" }}
                  >
                    <span className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0" style={{ backgroundColor: "rgba(245,239,230,0.12)" }}>
                      <c.Icon className="w-4 h-4" style={{ color: C.goldLight }} />
                    </span>
                    <span className="flex flex-col leading-tight min-w-0">
                      <span className="text-[10px] tracking-widest uppercase" style={{ color: C.goldLight }}>{c.label}</span>
                      <span className="text-sm font-medium truncate" style={{ color: C.cream }}>{c.value}</span>
                    </span>
                    <ArrowUpRight className="ml-auto w-4 h-4 opacity-0 group-hover:opacity-100" style={{ color: C.goldLight }} />
                  </a>
                </li>
              ))}
            </ul>
            <div className="relative mt-auto grid grid-cols-2 gap-3 text-center">
              {[
                { k: "< 24 hrs", v: "Reply time", Icon: Clock },
                { k: "Free", v: "Course guidance", Icon: Sparkles },
              ].map((s) => (
                <div key={s.v} className="rounded-xl py-3" style={{ backgroundColor: "rgba(245,239,230,0.08)" }}>
                  <s.Icon className="w-4 h-4 mx-auto mb-1" style={{ color: C.goldLight }} />
                  <div className="font-serif font-bold text-lg" style={{ color: C.cream }}>{s.k}</div>
                  <div className="text-[10px] tracking-widest uppercase" style={{ color: C.goldLight }}>{s.v}</div>
                </div>
              ))}
            </div>
          </div>
        </Reveal>

        {/* Form */}
        <Reveal delay={120} className="lg:col-span-3">
          <div className="relative rounded-2xl p-6 sm:p-8 shadow-sm h-full" style={{ backgroundColor: "#FFFDF9", border: `1px solid ${C.border}` }}>
            <Suspense fallback={<div className="h-96" />}>
              <ContactForm />
            </Suspense>
          </div>
        </Reveal>
      </div>
    </div>
  </section>
);

export default Contact;
