import React from "react";
import fs from "node:fs";
import path from "node:path";
import Image from "next/image";
import { coursesData } from "@/config/courses";
import { C } from "@/lib/theme";
import Reveal from "./Reveal";
import AnimatedCounter from "./AnimatedCounter";

// Drop a real portrait at public/images/founder.jpg and it's used automatically.
const hasFounderPhoto = fs.existsSync(path.join(process.cwd(), "public", "images", "founder.jpg"));

const CREDENTIALS = [
  { k: "Role", v: "Senior Software Developer · Team Lead" },
  { k: "Stack", v: "Spring Boot, Angular, Next.js, Django, Machine Learning" },
  { k: "Teaching", v: "Part-time lecturer and mentor" },
  { k: "Focus", v: "Scalable backends, full-stack apps, microservices" },
];

const About = () => {
  const purchasableCourseCount = coursesData.filter((c) => c.category !== "mentorship").length;

  return (
    <section id="about" className="relative" style={{ backgroundColor: C.parchment }}>
      <div className="wrap py-20 lg:py-28">
        <Reveal>
          <p className="label mb-12 lg:mb-16">
            <span className="label-num">01</span> A message from the mentor
          </p>
        </Reveal>

        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16">
          {/* Portrait / placard */}
          <Reveal className="lg:col-span-4">
            <figure className="lg:sticky lg:top-28 max-w-sm">
              <div className="relative aspect-[4/5] overflow-hidden" style={{ backgroundColor: C.primary }}>
                {hasFounderPhoto ? (
                  <Image src="/images/founder.jpg" alt="Aryasree TG, founder of Zyphraa" fill sizes="(min-width: 1024px) 30vw, 100vw" className="photo object-cover" />
                ) : (
                  <div className="absolute inset-0 flex flex-col justify-between p-7">
                    <span className="text-[11px] tracking-[0.2em] uppercase" style={{ color: C.bronzeLight }}>
                      Founder &amp; mentor
                    </span>
                    <span className="display serif-italic text-[9rem] leading-none -mb-4" style={{ color: "rgba(248,243,234,0.92)" }}>
                      A.
                    </span>
                    <span className="block h-px w-16" style={{ backgroundColor: C.bronzeLight }} />
                  </div>
                )}
              </div>
              <figcaption className="mt-5 flex items-baseline justify-between gap-4">
                <span className="display text-2xl" style={{ color: C.primary }}>Aryasree TG</span>
                <span className="text-[12px] tracking-wide" style={{ color: C.bronze }}>Founder, Zyphraa</span>
              </figcaption>
            </figure>
          </Reveal>

          {/* Words */}
          <div className="lg:col-span-8">
            <Reveal>
              <blockquote className="display text-[2rem] sm:text-[2.6rem] lg:text-[3.1rem] leading-[1.12] mb-12" style={{ color: C.primary }}>
                <span aria-hidden className="serif" style={{ color: C.bronzeLight }}>&ldquo;</span>
                Zyphraa was founded with one focused goal: to help you move from{" "}
                <em style={{ color: C.bronze }}>just learning code</em> to actually building real projects and becoming
                job-ready.
                <span aria-hidden className="serif" style={{ color: C.bronzeLight }}>&rdquo;</span>
              </blockquote>
            </Reveal>

            <Reveal delay={100}>
              <div className="grid md:grid-cols-2 gap-x-10 gap-y-5 text-[16px] leading-[1.75]" style={{ color: C.brown }}>
                <p className="mb-0">
                  <span className="serif text-[3.2rem] leading-[0.8] float-left mr-2 mt-1" style={{ color: C.primary }}>H</span>
                  i, I&rsquo;m Arya — a developer and mentor behind <strong style={{ color: C.primary }}>Zyphraa</strong>. I
                  have 3+ years of hands-on experience working with modern technologies including Spring Boot, Angular,
                  Next.js, Django, and Machine Learning.
                </p>
                <p className="mb-0">
                  I&rsquo;ve contributed to real-world projects spanning scalable backend systems, full-stack web
                  applications, and microservices architectures. Alongside industry work, I&rsquo;ve served as a
                  part-time lecturer — an experience that shaped how I teach and helped me break down complex concepts
                  into clear, digestible explanations.
                </p>
                <p className="mb-0">
                  We prioritise practical learning, hands-on coding, and industry-level thinking — not passive theory.
                  If you&rsquo;re looking to break into tech, transition careers, or level up your development skills —
                  you&rsquo;re in exactly the right place.
                </p>
                <p className="mb-0">
                  Beyond the curriculum, every learner also gets access to{" "}
                  <strong style={{ color: C.primary }}>mock interview practice sessions</strong> — because being able to
                  explain your work under pressure is just as important as being able to build it.
                </p>
              </div>
            </Reveal>

            <Reveal delay={150}>
              <dl className="mt-14 border-t rule">
                {CREDENTIALS.map((c) => (
                  <div key={c.k} className="grid grid-cols-[7rem_1fr] sm:grid-cols-[9rem_1fr] gap-4 py-4 border-b rule">
                    <dt className="text-[11px] tracking-[0.18em] uppercase font-semibold pt-1" style={{ color: C.bronze }}>{c.k}</dt>
                    <dd className="text-[15px]" style={{ color: C.brown }}>{c.v}</dd>
                  </div>
                ))}
              </dl>
            </Reveal>

            <Reveal delay={200}>
              <div className="mt-12 flex flex-col sm:flex-row sm:items-end justify-between gap-10">
                <div className="flex gap-10 sm:gap-14">
                  {[
                    { value: 3, suffix: "+", label: "Years experience" },
                    { value: purchasableCourseCount, suffix: "", label: "Courses available" },
                    { value: 100, suffix: "%", label: "Project-based" },
                  ].map((s) => (
                    <div key={s.label}>
                      <AnimatedCounter value={s.value} suffix={s.suffix} className="display block text-[2.6rem] leading-none" style={{ color: C.primary }} />
                      <span className="block mt-2 text-[12px] tracking-wide" style={{ color: C.brownMid }}>{s.label}</span>
                    </div>
                  ))}
                </div>
                <div className="flex gap-6 text-[14px]">
                  <a href="https://www.instagram.com/zyphraa.arya" target="_blank" rel="noopener noreferrer" className="ulink on" style={{ color: C.primary }}>
                    Instagram ↗
                  </a>
                  <a href="https://linkedin.com/in/aryasree-tg-027461201" target="_blank" rel="noopener noreferrer" className="ulink on" style={{ color: C.primary }}>
                    LinkedIn ↗
                  </a>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
