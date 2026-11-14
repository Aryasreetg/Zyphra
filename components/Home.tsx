import React from "react";
import Link from "next/link";
import Image from "next/image";
import { C } from "@/lib/theme";
import { coursesData, getEnrolLink } from "@/config/courses";
import heroImg from "@/public/images/learner-outdoors.jpg";

// Price and link come from config/courses.ts so they always match the course page
const workshop = coursesData.find((c) => c.id === "3-day-workshop");

const FACTS = [
  { k: "Live", v: "Mentor-led sessions, never pre-recorded" },
  { k: "Real", v: "Projects you build, ship and show recruiters" },
  { k: "Ready", v: "Mock interviews included in every programme" },
  { k: "Small", v: "Limited seats, so you're never just a number" },
];

const Home = () => {
  return (
    <section id="home" className="grain relative overflow-hidden" style={{ backgroundColor: C.cream }}>
      <div className="wrap pt-12 sm:pt-16 lg:pt-20 pb-16 lg:pb-20">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-8 items-start">
          {/* Copy */}
          <div className="lg:col-span-7 lg:pr-6 lg:pt-6">
            <p className="hero-in hero-in-1 label mb-8">Mentor-led · Online · Project-first</p>

            <h1 className="hero-in hero-in-2 display text-[3.1rem] sm:text-[4.4rem] lg:text-[5.6rem] mb-8" style={{ color: C.primary }}>
              Become a <em style={{ color: C.bronze }}>job&#8209;ready</em>
              <br />
              developer.
            </h1>

            <p className="hero-in hero-in-3 lede max-w-[34rem] mb-5">
              Learn Full Stack Development, Python &amp; AI/ML, Java &amp; Spring Boot, and DevOps — and build
              real-world projects with Zyphraa. No boring theory, no filler modules, just practical skills that get
              you hired.
            </p>
            <p className="hero-in hero-in-3 text-[15px] max-w-[34rem] mb-10 pl-4 border-l-2" style={{ color: C.brown, borderColor: C.bronzeLight }}>
              Every programme now includes live mock interview practice, so you graduate interview-ready, not just
              skill-ready.
            </p>

            <div className="hero-in hero-in-4 flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6">
              <Link href="/#courses" className="btn-z btn-solid">
                Explore courses <span className="arr" aria-hidden>→</span>
              </Link>
              <Link href="/#contact" className="ulink on text-[15px] self-start sm:self-auto" style={{ color: C.primary }}>
                Ask a question
              </Link>
            </div>
            <p className="hero-in hero-in-5 serif serif-italic text-[15px] mt-10" style={{ color: C.brownLight }}>
              New skills. New opportunities. New you.
            </p>
          </div>

          {/* Photograph + next-up note */}
          <div className="lg:col-span-5 relative hero-in hero-in-3">
            <div className="frame mr-4 sm:mr-6 lg:mr-0">
              <div className="relative aspect-[3/2] lg:aspect-[4/5] overflow-hidden" style={{ backgroundColor: C.parchment }}>
                <Image
                  src={heroImg}
                  alt="A student working on her laptop on a bench outdoors"
                  fill
                  priority
                  placeholder="blur"
                  sizes="(min-width: 1024px) 40vw, 100vw"
                  className="photo object-cover object-[50%_40%] lg:object-center"
                />
              </div>
            </div>

            {workshop && (
              <div
                className="relative z-10 lg:absolute lg:-left-16 lg:bottom-10 mt-8 lg:mt-0 lg:w-[19rem] p-6 shadow-[0_18px_40px_-18px_rgba(18,28,44,0.35)]"
                style={{ backgroundColor: "#FCF8F1", borderTop: `3px solid ${C.primary}` }}
              >
                <p className="text-[11px] tracking-[0.18em] uppercase font-semibold mb-2" style={{ color: C.bronze }}>
                  Next up
                </p>
                <p className="display text-[1.6rem] mb-1" style={{ color: C.primary }}>
                  {workshop.title}
                </p>
                <p className="text-[13px] mb-4" style={{ color: C.brownMid }}>
                  {workshop.duration} · Full stack, testing &amp; DevOps
                </p>
                <div className="flex items-center justify-between gap-4 pt-4 border-t rule">
                  <span className="serif text-xl" style={{ color: C.primary }}>{workshop.offerPrice}</span>
                  <Link href={getEnrolLink(workshop)} className="ulink on text-[14px]" style={{ color: C.primary }}>
                    Join Workshop <span aria-hidden>→</span>
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Facts strip */}
        <dl className="hero-in hero-in-5 mt-16 lg:mt-24 grid grid-cols-2 lg:grid-cols-4 border-t rule">
          {FACTS.map((f, i) => (
            <div
              key={f.k}
              className={`pt-6 pb-2 pr-6 ${i % 2 === 1 ? "pl-6 border-l rule" : ""} ${i === 2 ? "lg:pl-6 lg:border-l" : ""} ${i >= 2 ? "border-t lg:border-t-0 rule" : ""}`}
            >
              <dt className="display serif-italic text-[1.6rem] mb-1" style={{ color: C.bronze }}>
                {f.k}
              </dt>
              <dd className="text-[14px] leading-snug" style={{ color: C.brown }}>
                {f.v}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
};

export default Home;
