import React from "react";
import Link from "next/link";
import Reveal from "./Reveal";
import AnimatedCounter from "./AnimatedCounter";
import TiltCard from "./TiltCard";
import SectionBg from "./SectionBg";
import { GraduationCap, FlaskConical, Briefcase, Brain, Mic, Trophy, Star, type LucideIcon } from "lucide-react";

const milestones = [
  {
    Icon: GraduationCap as LucideIcon,
    stat: 2,
    label: "Workshop Graduates",
    detail:
      "Completed the live 3-day workshop in June, walking away with a deployed mini-project and a certificate.",
  },
  {
    Icon: FlaskConical,
    stat: 2,
    label: "Software Testing Mini-Course",
    detail:
      "Finished the Software Testing Fundamentals mini-course, building real test plans and bug reports.",
  },
  {
    Icon: Briefcase,
    stat: 1,
    label: "Frontend Developer — Placed",
    detail:
      "A Frontend Mastery graduate is now placed in a frontend developer-Intern role.",
  },
  {
    Icon: Brain,
    stat: 1,
    label: "AI-ML",
    detail: "A workshop candidate has enrolled in the Python & AI/ML Foundation batch to keep growing"
  }
];

const Achievements = () => {
  return (
    <section
      id="achievements"
      className="relative overflow-hidden py-12 sm:py-16 md:py-20"
      style={{ backgroundColor: "#F5EFE6" }}
    >
      <SectionBg
        pattern="plus"
        opacity={0.8}
        icons={[
          { Icon: Trophy, className: "top-16 right-[8%] w-20 h-20", rotate: 12 },
          { Icon: Star, className: "top-28 left-[7%] w-14 h-14", rotate: -10 },
        ]}
      />
      <div className="relative max-w-6xl mx-auto px-4 sm:px-6">
        <Reveal>
          <div className="text-center mb-10 sm:mb-12">
            <p
              className="text-xs tracking-[0.25em] uppercase font-semibold mb-3"
              style={{ color: "#8B6914" }}
            >
              ✦ Real Cohorts, Real Outcomes
            </p>
            <h2
              className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold mb-4 leading-tight"
              style={{ color: "#2D4A3E" }}
            >
              Student Success So Far
            </h2>
            <p
              className="text-base sm:text-lg max-w-2xl mx-auto leading-relaxed"
              style={{ color: "#6B5744" }}
            >
              Zyphraa is a young, hands-on cohort — here&rsquo;s a transparent look at where our
              early learners are today.
            </p>
          </div>
        </Reveal>

        {/* Milestone cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10 sm:mb-14">
          {milestones.map((m, i) => (
            <Reveal key={m.label} delay={i * 100}>
              <TiltCard
                className="group rounded-2xl p-6 sm:p-7 shadow-sm h-full flex flex-col"
                style={{ backgroundColor: "#EDE5D4", border: "1px solid #D4C5A9" }}
              >
                <div className="flex items-center gap-3 mb-4">
                  <span
                    className="icon-tile w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0 shadow-sm"
                    style={{ background: "linear-gradient(135deg, #2D4A3E, #1F3A2F)" }}
                  >
                    <m.Icon className="w-6 h-6" style={{ color: "#F5EFE6" }} />
                  </span>
                  <div>
                    <AnimatedCounter value={m.stat} className="block text-2xl font-serif font-bold" style={{ color: "#2D4A3E" }} />
                    <div className="text-xs tracking-wide uppercase font-semibold" style={{ color: "#8B6914" }}>
                      {m.label}
                    </div>
                  </div>
                </div>
                <p className="text-sm leading-relaxed" style={{ color: "#4A3728" }}>
                  {m.detail}
                </p>
              </TiltCard>
            </Reveal>
          ))}
        </div>

        {/* Mock interview practice callout */}
        <Reveal delay={150}>
          <div
            className="relative overflow-hidden hover-lift rounded-2xl p-6 sm:p-10 shadow-sm flex flex-col lg:flex-row items-center gap-6 lg:gap-10"
            style={{ backgroundColor: "#2D4A3E" }}
          >
            <SectionBg pattern="dotsLight" opacity={1} fade="none" />
            <Mic aria-hidden className="absolute -right-6 -bottom-8 w-44 h-44 hidden md:block" style={{ color: "rgba(245,239,230,0.06)" }} strokeWidth={1} />
            <div
              className="relative float-slow w-16 h-16 rounded-2xl flex items-center justify-center flex-shrink-0"
              style={{ backgroundColor: "#F5EFE6" }}
            >
              <Mic className="w-8 h-8" style={{ color: "#2D4A3E" }} />
            </div>
            <div className="relative flex-1 text-center lg:text-left">
              <p className="text-xs tracking-widest uppercase font-semibold mb-2" style={{ color: "#C4A96A" }}>
                New — Now Included
              </p>
              <h3 className="text-2xl sm:text-3xl font-serif font-bold mb-3" style={{ color: "#F5EFE6" }}>
                Mock Interview Practice Sessions
              </h3>
              <p className="text-sm sm:text-base leading-relaxed max-w-2xl" style={{ color: "rgba(245,239,230,0.8)" }}>
                Every Zyphraa learner now gets access to live mock interview practice —
                technical questions, HR rounds, and honest feedback — so you walk into the
                real thing already confident, not just qualified.
              </p>
            </div>
            <Link
              href="/?course=mock-interview#contact"
              className="relative btn-shine flex-shrink-0 px-7 py-3.5 rounded-full font-semibold text-sm tracking-wide transition-opacity hover:opacity-85 shadow-lg"
              style={{ backgroundColor: "#F5EFE6", color: "#2D4A3E" }}
            >
              Book a Mock Interview ✦
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
};

export default Achievements;
