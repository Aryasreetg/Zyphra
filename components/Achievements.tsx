import React from "react";
import Link from "next/link";
import Image from "next/image";
import { C } from "@/lib/theme";
import Reveal from "./Reveal";
import AnimatedCounter from "./AnimatedCounter";
import interviewImg from "@/public/images/mock-interview.jpg";

const milestones = [
  {
    stat: 2,
    label: "Workshop graduates",
    detail: "Completed the live 3-day workshop in June, walking away with a deployed mini-project and a certificate.",
  },
  {
    stat: 2,
    label: "Software Testing mini-course",
    detail: "Finished the Software Testing Fundamentals mini-course, building real test plans and bug reports.",
  },
  {
    stat: 1,
    label: "Frontend developer — placed",
    detail: "A Frontend Mastery graduate is now placed in a frontend developer-Intern role.",
  },
  {
    stat: 1,
    label: "AI-ML",
    detail: "A workshop candidate has enrolled in the Python & AI/ML Foundation batch to keep growing.",
  },
];

const Achievements = () => {
  return (
    <section id="achievements" style={{ backgroundColor: C.cream }}>
      <div className="wrap py-20 lg:py-28">
        <div className="grid lg:grid-cols-12 gap-8 mb-14 lg:mb-20">
          <Reveal className="lg:col-span-5">
            <p className="label mb-6">
              <span className="label-num">02</span> Real cohorts, real outcomes
            </p>
            <h2 className="display text-[2.6rem] sm:text-[3.4rem]" style={{ color: C.primary }}>
              Student success <em style={{ color: C.bronze }}>so far</em>
            </h2>
          </Reveal>
          <Reveal delay={100} className="lg:col-span-6 lg:col-start-7 lg:pt-14">
            <p className="lede mb-0">
              Zyphraa is a young, hands-on cohort — here&rsquo;s a transparent look at where our early learners are
              today.
            </p>
          </Reveal>
        </div>

        {/* Ruled numerals */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 border-t rule">
          {milestones.map((m, i) => (
            <Reveal key={m.label} delay={i * 90}>
              <div
                className={`h-full pt-8 pb-10 sm:pr-8 border-b rule ${i % 2 === 1 ? "sm:pl-8 sm:border-l" : ""} ${i > 0 ? "lg:pl-8 lg:border-l" : ""} lg:border-b-0`}
              >
                <AnimatedCounter value={m.stat} className="display block text-[5.5rem] leading-[0.85] mb-6" style={{ color: C.primary }} />
                <p className="text-[12px] tracking-[0.16em] uppercase font-semibold mb-3" style={{ color: C.bronze }}>
                  {m.label}
                </p>
                <p className="text-[15px] leading-relaxed mb-0" style={{ color: C.brown }}>
                  {m.detail}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>

      {/* Mock interview feature: photo + panel */}
      <div className="grid lg:grid-cols-2" style={{ backgroundColor: C.primary }}>
        <Reveal className="relative min-h-[320px] lg:min-h-[520px] overflow-hidden">
          <div className="settle absolute inset-0">
            {/* Zoomed toward the candidate so the interviewer's branded T-shirt stays out of frame */}
            <div className="absolute inset-0 origin-[0%_45%] scale-[1.34]">
              <Image src={interviewImg} alt="A candidate answering questions in a practice interview" fill placeholder="blur" sizes="(min-width: 1024px) 70vw, 130vw" className="photo object-cover object-[0%_50%]" />
            </div>
          </div>
        </Reveal>
        <div className="flex items-center">
          <Reveal className="px-6 sm:px-12 lg:px-16 xl:px-20 py-16 lg:py-20 max-w-2xl">
            <p className="text-[12px] tracking-[0.18em] uppercase font-semibold mb-6" style={{ color: C.bronzeLight }}>
              New — now included
            </p>
            <h3 className="display text-[2.4rem] sm:text-[3rem] mb-6" style={{ color: C.cream }}>
              Mock interview <em style={{ color: C.bronzeLight }}>practice</em> sessions
            </h3>
            <p className="text-[16px] leading-[1.75] mb-10" style={{ color: "rgba(248,243,234,0.78)" }}>
              Every Zyphraa learner now gets access to live mock interview practice — technical questions, HR rounds,
              and honest feedback — so you walk into the real thing already confident, not just qualified.
            </p>
            <Link href="/?course=mock-interview#contact" className="btn-z btn-cream">
              Book a mock interview <span className="arr" aria-hidden>→</span>
            </Link>
          </Reveal>
        </div>
      </div>
    </section>
  );
};

export default Achievements;
