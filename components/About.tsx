import React from "react";
import { coursesData } from "@/config/courses";
import Reveal from "./Reveal";
import AnimatedCounter from "./AnimatedCounter";
import SectionBg from "./SectionBg";
import { Briefcase, BookOpen, Hammer, Instagram, Linkedin, Quote, Server, Code2, Brain, Users } from "lucide-react";

const SKILLS = [
  { Icon: Server, label: "Spring Boot & Microservices" },
  { Icon: Code2, label: "Angular · Next.js · Django" },
  { Icon: Brain, label: "Machine Learning" },
  { Icon: Users, label: "Team Lead & Lecturer" },
];

const About = () => {
  const purchasableCourseCount = coursesData.filter((c) => c.category !== "mentorship").length;

  return (
    <section
      id="about"
      className="relative overflow-hidden py-12 sm:py-16 md:py-20"
      style={{ backgroundColor: "#EDE5D4" }}
    >
      <SectionBg
        pattern="waves"
        opacity={0.7}
        icons={[
          { Icon: Quote, className: "top-24 left-[6%] w-24 h-24", rotate: -8 },
          { Icon: BookOpen, className: "bottom-24 right-[6%] w-20 h-20", rotate: 10 },
        ]}
      />
      <div className="relative max-w-4xl mx-auto px-4 sm:px-6">
        {/* Section Label */}
        <Reveal>
        <p
          className="text-center text-xs tracking-[0.25em] uppercase font-semibold mb-3"
          style={{ color: "#8B6914" }}
        >
          ✦ A Message from the Mentor
        </p>

        <h2
          className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold mb-10 text-center leading-tight"
          style={{ color: "#2D4A3E" }}
        >
          About Me
        </h2>
        </Reveal>

        {/* Card */}
        <Reveal delay={100}>
        <div
          className="hover-lift spotlight rounded-2xl p-6 sm:p-10 shadow-sm"
          style={{ backgroundColor: "#F5EFE6", border: "1px solid #D4C5A9" }}
        >
          {/* Name badge */}
          <div className="flex items-center gap-3 mb-6">
            <div
              className="relative w-16 h-16 rounded-2xl flex items-center justify-center text-2xl font-serif font-bold shadow-md rotate-3"
              style={{ background: "linear-gradient(135deg, #2D4A3E, #1F3A2F)", color: "#F5EFE6" }}
            >
              A
              <span className="absolute -bottom-1.5 -right-1.5 w-6 h-6 rounded-full flex items-center justify-center -rotate-3" style={{ backgroundColor: "#C4A96A" }}>
                <Briefcase className="w-3.5 h-3.5" style={{ color: "#1F3A2F" }} />
              </span>
            </div>
            <div>
              <p
                className="font-semibold text-base"
                style={{ color: "#2D4A3E" }}
              >
                Aryasree TG
              </p>
              <p className="text-xs" style={{ color: "#8B6914" }}>
                Senior Software Developer · Team Lead · Mentor
              </p>
            </div>
          </div>

          {/* Skill chips */}
          <div className="flex flex-wrap gap-2 mb-6">
            {SKILLS.map(({ Icon, label }) => (
              <span
                key={label}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium hover:-translate-y-0.5"
                style={{ backgroundColor: "#EDE5D4", color: "#2D4A3E", border: "1px solid #D4C5A9", transition: "translate 200ms ease" }}
              >
                <Icon className="w-3.5 h-3.5" style={{ color: "#8B6914" }} />
                {label}
              </span>
            ))}
          </div>

          <div className="space-y-5">
            <p
              className="text-base sm:text-lg leading-relaxed text-justify"
              style={{ color: "#4A3728" }}
            >
              Hi, I'm Arya — a developer and mentor behind{" "}
              <span className="font-semibold" style={{ color: "#2D4A3E" }}>
                Zyphraa
              </span>
              . I have 3+ years of hands-on experience working with modern
              technologies including Spring Boot, Angular, Next.js, Django, and
              Machine Learning.
            </p>

            <p
              className="text-base sm:text-lg leading-relaxed text-justify"
              style={{ color: "#4A3728" }}
            >
              I've contributed to real-world projects spanning scalable backend
              systems, full-stack web applications, and microservices
              architectures. Alongside industry work, I've served as a part-time
              lecturer — an experience that shaped how I teach and helped me
              understand how to break down complex concepts into clear,
              digestible explanations.
            </p>

            <p
              className="text-base sm:text-lg leading-relaxed text-justify"
              style={{ color: "#4A3728" }}
            >
              Zyphraa was founded with one focused goal:{" "}
              <span className="italic font-medium" style={{ color: "#2D4A3E" }}>
                to help you move from just learning code to actually building
                real projects and becoming job-ready.
              </span>{" "}
              We prioritise practical learning, hands-on coding, and
              industry-level thinking — not passive theory.
            </p>

            <p
              className="text-base sm:text-lg leading-relaxed"
              style={{ color: "#4A3728" }}
            >
              If you're looking to break into tech, transition careers, or level
              up your development skills — you're in exactly the right place. ♡
            </p>

            <p
              className="text-base sm:text-lg leading-relaxed text-justify"
              style={{ color: "#4A3728" }}
            >
              Beyond the curriculum, every learner also gets access to{" "}
              <span className="font-semibold" style={{ color: "#2D4A3E" }}>
                mock interview practice sessions
              </span>{" "}
              — because being able to explain your work under pressure is just as
              important as being able to build it.
            </p>
          </div>

          {/* Divider */}
          <div className="my-8 border-t" style={{ borderColor: "#D4C5A9" }} />

          {/* Stats row */}
          <div className="grid grid-cols-3 gap-4 text-center">
            {[
              { value: 3, suffix: "+", label: "Years Experience", Icon: Briefcase },
              { value: purchasableCourseCount, suffix: "", label: "Courses Available", Icon: BookOpen },
              { value: 100, suffix: "%", label: "Project-Based", Icon: Hammer },
            ].map(({ value, suffix, label, Icon }) => (
              <div key={label} className="group rounded-xl py-3 hover:-translate-y-1" style={{ transition: "translate 250ms ease" }}>
                <span className="icon-tile mx-auto mb-2 w-10 h-10 rounded-xl flex items-center justify-center" style={{ backgroundColor: "#EDE5D4" }}>
                  <Icon className="w-5 h-5" style={{ color: "#8B6914" }} />
                </span>
                <AnimatedCounter
                  value={value}
                  suffix={suffix}
                  className="block text-2xl sm:text-3xl font-serif font-bold"
                  style={{ color: "#2D4A3E" }}
                />
                <div
                  className="text-xs mt-1 tracking-wide"
                  style={{ color: "#8B6914" }}
                >
                  {label}
                </div>
              </div>
            ))}
          </div>

          {/* Contact links */}
          <div className="flex flex-col sm:flex-row gap-3 mt-8">
            <a
              href="https://www.instagram.com/zyphraa.arya"
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 inline-flex items-center justify-center gap-2 py-2.5 rounded-full text-sm font-medium tracking-wide transition-opacity hover:opacity-80"
              style={{ backgroundColor: "#2D4A3E", color: "#F5EFE6" }}
            >
              <Instagram className="w-4 h-4" />
              Instagram ↗
            </a>
            <a
              href="https://linkedin.com/in/aryasree-tg-027461201"
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 inline-flex items-center justify-center gap-2 py-2.5 rounded-full text-sm font-medium tracking-wide transition-colors"
              style={{
                border: "1.5px solid #2D4A3E",
                color: "#2D4A3E",
                backgroundColor: "transparent",
              }}
            >
              <Linkedin className="w-4 h-4" />
              LinkedIn ↗
            </a>
          </div>
        </div>
        </Reveal>
      </div>
    </section>
  );
};

export default About;
