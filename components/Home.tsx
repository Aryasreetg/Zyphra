import React from "react";
import Link from "next/link";
import { ArrowRight, CalendarDays, MessageCircle, Code2, Database, Cloud, Brain, Laptop, CheckCircle2 } from "lucide-react";
import { C } from "@/lib/theme";
import { coursesData, getEnrolLink } from "@/config/courses";
import RotatingWord from "./RotatingWord";
import HeroVisual from "./HeroVisual";
import SectionBg from "./SectionBg";

// Price and link come from config/courses.ts so they always match the course page
const workshop = coursesData.find((c) => c.id === "3-day-workshop");

const HIGHLIGHTS = ["Live sessions", "Real projects", "Mock interviews", "Limited seats"];

const Home = () => {
  return (
    <section
      id="home"
      className="relative overflow-hidden min-h-[calc(100vh-72px)] flex items-center px-4 sm:px-6 py-16 sm:py-20"
      style={{ backgroundColor: C.cream }}
    >
      {/* Animated background */}
      <div aria-hidden className="absolute inset-0">
        <div className="blob w-[420px] h-[420px] -top-24 -left-24" style={{ background: "#CFE0D2" }} />
        <div className="blob w-[380px] h-[380px] top-1/3 -right-28" style={{ background: "#EBD9AE", animationDelay: "-6s" }} />
        <div className="blob w-[300px] h-[300px] -bottom-24 left-1/3" style={{ background: "#E4CFC0", animationDelay: "-12s" }} />
      </div>
      <SectionBg
        pattern="circuit"
        opacity={0.55}
        icons={[
          { Icon: Code2, className: "top-16 left-[4%] w-14 h-14", rotate: -12 },
          { Icon: Database, className: "bottom-20 left-[6%] w-12 h-12", rotate: 8 },
          { Icon: Cloud, className: "top-12 right-[40%] w-12 h-12", rotate: 0 },
          { Icon: Brain, className: "bottom-10 right-[44%] w-12 h-12", rotate: 10 },
          { Icon: Laptop, className: "top-20 right-[4%] w-12 h-12", rotate: -6 },
        ]}
      />

      <div className="relative z-10 max-w-6xl mx-auto w-full grid grid-cols-1 lg:grid-cols-[1.1fr_1fr] gap-14 lg:gap-10 items-center">
        {/* Text column */}
        <div className="min-w-0 flex flex-col items-center lg:items-start text-center lg:text-left">
          <div
            className="hero-in hero-in-1 inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-[10px] sm:text-xs font-semibold tracking-[0.12em] sm:tracking-[0.15em] uppercase mb-6"
            style={{ backgroundColor: C.sand, color: C.gold, border: `1px solid ${C.border}` }}
          >
            <span className="pulse-dot w-2 h-2 rounded-full" style={{ backgroundColor: C.green }} />
            Admissions open · Learn. Improve. Grow.
          </div>

          <h1
            className="hero-in hero-in-2 text-4xl sm:text-5xl md:text-6xl font-serif font-bold mb-6 leading-tight"
            style={{ color: C.green }}
          >
            Become a
            <br />
            <RotatingWord
              words={["Job-Ready", "Interview-Ready", "Project-Ready", "Confident"]}
              className="italic"
              style={{ color: C.gold }}
            />
            <br />
            Developer
          </h1>

          <p className="hero-in hero-in-3 text-base sm:text-lg max-w-xl mb-4 leading-relaxed" style={{ color: C.brownMid }}>
            Learn Full Stack Development, Python & AI/ML, Java & Spring Boot, and DevOps —
            and build real-world projects with Zyphraa. No boring theory, no filler modules,
            just practical skills that get you hired.
          </p>

          <p className="hero-in hero-in-3 text-sm sm:text-base max-w-xl mb-8 leading-relaxed" style={{ color: C.gold }}>
            ♡ Every programme includes live mock interview practice — graduate interview-ready, not just skill-ready.
          </p>

          {/* Buttons */}
          <div className="hero-in hero-in-5 flex flex-col sm:flex-row flex-wrap gap-2.5 justify-center lg:justify-start w-full">
            <Link
              href="/#courses"
              className="btn-shine group whitespace-nowrap inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full font-semibold text-sm tracking-wide hover:-translate-y-0.5 shadow-md"
              style={{ backgroundColor: C.green, color: C.cream }}
            >
              Explore Courses
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1" style={{ transition: "translate 200ms ease" }} />
            </Link>
            {workshop && (
            <Link
              href={getEnrolLink(workshop)}
              className="home-outline-btn whitespace-nowrap inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full font-semibold text-sm tracking-wide hover:-translate-y-0.5"
              style={{ border: `1.5px solid ${C.green}`, color: C.green }}
            >
              <CalendarDays className="w-4 h-4" />
              Join Workshop — {workshop.offerPrice}
            </Link>
            )}
            <Link
              href="/#contact"
              className="home-outline-btn whitespace-nowrap inline-flex items-center justify-center gap-2 px-4 py-3.5 rounded-full font-semibold text-sm tracking-wide hover:-translate-y-0.5"
              style={{ color: C.gold }}
            >
              <MessageCircle className="w-4 h-4" />
              Ask a Question
            </Link>
            <style>{`.home-outline-btn:hover { background-color: ${C.sand}; }`}</style>
          </div>

          {/* Highlights */}
          <ul className="hero-in hero-in-6 flex flex-wrap justify-center lg:justify-start gap-x-5 gap-y-2 mt-8">
            {HIGHLIGHTS.map((h) => (
              <li key={h} className="flex items-center gap-1.5 text-xs font-medium mb-0" style={{ color: C.brownMid }}>
                <CheckCircle2 className="w-4 h-4" style={{ color: C.green }} />
                {h}
              </li>
            ))}
          </ul>
        </div>

        {/* Visual column */}
        <div className="hero-in hero-in-4 min-w-0 px-2 sm:px-12 lg:px-4">
          <HeroVisual />
        </div>
      </div>

      {/* Scroll cue */}
      <Link
        href="/#about"
        aria-label="Scroll to about"
        className="absolute bottom-5 left-1/2 -translate-x-1/2 hidden lg:flex flex-col items-center gap-1 text-[10px] tracking-widest uppercase"
        style={{ color: C.brownLight }}
      >
        Scroll
        <span className="w-5 h-8 rounded-full border-2 flex justify-center pt-1.5" style={{ borderColor: C.brownLight }}>
          <span className="float-slow w-1 h-2 rounded-full" style={{ backgroundColor: C.brownLight }} />
        </span>
      </Link>
    </section>
  );
};

export default Home;
