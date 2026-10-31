"use client";

import React, { useMemo, useState } from "react";
import Link from "next/link";
import { coursesData, type Course } from "@/config/courses";
import { C } from "@/lib/theme";
import Reveal from "./Reveal";
import TiltCard from "./TiltCard";
import SectionBg from "./SectionBg";
import {
  Layers, Brain, Coffee, Monitor, Bug, Server, GitBranch, Users, BookOpen, Star, Sprout, Target, UserRound,
  CheckCircle2, Hammer, ArrowRight, MessageCircle, Clock, type LucideIcon,
} from "lucide-react";

// Icon shown on each course card
const COURSE_ICONS: Record<string, LucideIcon> = {
  "full-stack-developer-program": Layers,
  "python-ai-ml-foundation": Brain,
  "java-springboot-foundation": Coffee,
  "frontend-mastery": Monitor,
  "software-testing": Bug,
  "backend-spring-boot": Server,
  "git-version-control": GitBranch,
  "one-on-one-classes": Users,
};

const TABS = [
  { key: "all", label: "All Courses", Icon: BookOpen },
  { key: "flagship", label: "Flagship", Icon: Star },
  { key: "foundation", label: "Foundation", Icon: Sprout },
  { key: "specialisation", label: "Specialisation", Icon: Target },
  { key: "mentorship", label: "One-on-One", Icon: UserRound },
] as const;

type TabKey = (typeof TABS)[number]["key"];

const CATEGORY_LABEL: Record<string, string> = {
  flagship: "Flagship Programme",
  foundation: "Foundation Programme",
  specialisation: "Specialisation",
  mentorship: "Personalised Mentorship",
};

const listedCourses = coursesData.filter((c) => c.category !== "workshop");

const Bullet = ({ color }: { color: string }) => (
  <CheckCircle2 className="mt-0.5 w-3.5 h-3.5 flex-shrink-0" style={{ color }} />
);

function CourseCard({ course, wide }: { course: Course; wide: boolean }) {
  const [open, setOpen] = useState(false);
  const isMentorship = course.category === "mentorship";
  const learnList = isMentorship ? course.whatsIncluded : course.whatYouLearn;
  // On compact cards, show the first few bullets and let the visitor expand the rest
  const visibleLearn = wide || open ? learnList : learnList?.slice(0, 3);
  const hiddenCount = (learnList?.length ?? 0) - (visibleLearn?.length ?? 0);
  const Icon = COURSE_ICONS[course.id] ?? BookOpen;

  return (
    <TiltCard
      max={wide ? 2 : 4}
      className={`group relative rounded-2xl shadow-sm h-full flex flex-col ${wide ? "p-6 sm:p-8 lg:p-10" : "p-6"}`}
      style={{ backgroundColor: C.cream, border: `1px solid ${C.border}` }}
    >
      {/* Big faint icon in the corner */}
      <Icon aria-hidden className={`absolute pointer-events-none ${wide ? "right-6 bottom-6 w-40 h-40" : "right-4 bottom-16 w-24 h-24"}`} style={{ color: C.green, opacity: 0.05 }} strokeWidth={1.2} />
      <div className="relative flex items-start justify-between gap-3 mb-4">
        <div className="flex items-center gap-3">
          <span
            className="icon-tile w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0 shadow-sm"
            style={{ background: course.category === "flagship" ? `linear-gradient(135deg, ${C.green}, ${C.greenDark})` : `linear-gradient(135deg, ${C.gold}, #6E5310)` }}
          >
            <Icon className="w-5 h-5" style={{ color: C.cream }} />
          </span>
          <span className="text-[10px] tracking-[0.2em] uppercase font-semibold" style={{ color: C.gold }}>
            {CATEGORY_LABEL[course.category]}
          </span>
        </div>
        {course.badge && (
          <span
            className="float-slow px-3 py-1 rounded-full text-[11px] font-semibold whitespace-nowrap"
            style={{ backgroundColor: course.category === "flagship" ? C.green : C.gold, color: C.cream }}
          >
            {course.badge}
          </span>
        )}
      </div>

      <div className={`flex ${wide ? "flex-col sm:flex-row sm:items-start" : "flex-col"} justify-between gap-3 mb-4`}>
        <h3 className={`${wide ? "text-xl sm:text-2xl" : "text-lg"} font-serif font-bold`} style={{ color: C.green }}>
          {course.title}
        </h3>
        <div className={wide ? "sm:text-right flex-shrink-0" : ""}>
          <p className={`flex items-center gap-1.5 text-xs mb-1 ${wide ? "sm:justify-end" : ""}`} style={{ color: C.gold }}>
            <Clock className="w-3.5 h-3.5" />
            {isMentorship ? "Schedule: Fully Flexible" : `Duration: ${course.duration}`}
          </p>
          <div className={`flex items-baseline gap-2 ${wide ? "sm:justify-end" : ""}`}>
            {course.originalPrice && (
              <span className="text-sm line-through" style={{ color: C.brownLight }}>
                {course.originalPrice}
              </span>
            )}
            <span className={`${wide ? "text-2xl" : "text-xl"} font-serif font-bold`} style={{ color: C.green }}>
              {course.offerPrice}
            </span>
          </div>
        </div>
      </div>

      {course.batchInfo && (
        <p
          className="self-start text-xs font-semibold px-3 py-1 rounded-full mb-4"
          style={{ backgroundColor: C.parchment, color: C.gold, border: `1px solid ${C.border}` }}
        >
          ✦ {course.batchInfo}
        </p>
      )}

      <p className={`${wide ? "text-sm sm:text-base" : "text-xs"} leading-relaxed mb-5`} style={{ color: C.brownMid }}>
        {course.description}
      </p>

      <div className={`grid ${wide && course.projects ? "sm:grid-cols-2" : ""} gap-5 mb-6`}>
        <div>
          <h4 className="font-semibold text-sm mb-2" style={{ color: C.green }}>
            {isMentorship ? "What's Included:" : "What You'll Learn:"}
          </h4>
          <ul className="space-y-1.5">
            {visibleLearn?.map((item) => (
              <li key={item} className="flex items-start gap-2 text-xs mb-0" style={{ color: C.brown }}>
                <Bullet color={C.gold} />
                {item}
              </li>
            ))}
          </ul>
          {!wide && (learnList?.length ?? 0) > 3 && (
            <button
              type="button"
              onClick={() => setOpen((o) => !o)}
              className="mt-2 text-xs font-semibold underline-offset-4 hover:underline"
              style={{ color: C.gold }}
            >
              {open ? "Show less ↑" : `+${hiddenCount} more ↓`}
            </button>
          )}
        </div>
        {course.projects && (wide || open) && (
          <div className="pop-in">
            <h4 className="flex items-center gap-1.5 font-semibold text-sm mb-2" style={{ color: C.green }}>
              <Hammer className="w-4 h-4" style={{ color: C.gold }} /> Projects:
            </h4>
            <ul className="space-y-1.5">
              {course.projects.map((project) => (
                <li key={project} className="flex items-start gap-2 text-xs mb-0" style={{ color: C.brown }}>
                  <Bullet color={C.green} />
                  {project}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      <div className="relative mt-auto flex flex-wrap gap-3">
        {isMentorship ? (
          <Link
            href={`/?course=${course.id}#contact`}
            className="btn-shine inline-flex items-center gap-2 px-6 py-3 rounded-full font-semibold text-sm tracking-wide hover:-translate-y-0.5"
            style={{ backgroundColor: C.green, color: C.cream }}
          >
            <MessageCircle className="w-4 h-4" />
            Enquire About 1:1 Classes
          </Link>
        ) : (
          <>
            <Link
              href={`/courses/${course.id}`}
              className={`btn-shine inline-flex items-center justify-center gap-1.5 ${wide ? "px-6 py-3 text-sm" : "flex-1 py-2.5 text-xs"} rounded-full font-semibold tracking-wide hover:-translate-y-0.5`}
              style={{ backgroundColor: C.green, color: C.cream }}
            >
              View Details & Enrol
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
            <Link
              href={`/?course=${course.id}#contact`}
              className={`inline-block ${wide ? "px-6 py-3 text-sm" : "px-4 py-2.5 text-xs"} rounded-full font-semibold tracking-wide hover:-translate-y-0.5`}
              style={{ border: `1.5px solid ${C.green}`, color: C.green }}
            >
              Ask a Question
            </Link>
          </>
        )}
      </div>
    </TiltCard>
  );
}

const Courses = () => {
  const [tab, setTab] = useState<TabKey>("all");

  const counts = useMemo(() => {
    const map: Record<string, number> = { all: listedCourses.length };
    listedCourses.forEach((c) => (map[c.category] = (map[c.category] ?? 0) + 1));
    return map;
  }, []);

  const visible = tab === "all" ? listedCourses : listedCourses.filter((c) => c.category === tab);
  const wideCategories = new Set(["flagship", "foundation", "mentorship"]);

  return (
    <section id="courses" className="relative overflow-hidden py-12 sm:py-16 md:py-20" style={{ backgroundColor: C.parchment }}>
      <SectionBg pattern="grid" opacity={0.45} fade="top" />
      <div className="relative max-w-6xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <Reveal>
          <div className="text-center mb-8 sm:mb-10">
            <p className="text-xs tracking-[0.25em] uppercase font-semibold mb-3" style={{ color: C.gold }}>
              ✦ Course Catalogue 2026
            </p>
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-serif font-bold mb-4" style={{ color: C.green }}>
              Zyphraa Courses
            </h2>
            <p className="text-base sm:text-lg max-w-3xl mx-auto leading-relaxed" style={{ color: C.brownMid }}>
              Industry-aligned programmes built around real-world projects, hands-on implementation,
              and job-ready skills. All courses include practical projects, personalised support,
              and live mock interview practice.
            </p>
          </div>
        </Reveal>

        {/* Filter tabs */}
        <Reveal>
          <div role="tablist" aria-label="Filter courses" className="flex flex-wrap justify-center gap-2 mb-10">
            {TABS.map((t) => {
              const selected = tab === t.key;
              return (
                <button
                  key={t.key}
                  role="tab"
                  aria-selected={selected}
                  onClick={() => setTab(t.key)}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs sm:text-sm font-semibold tracking-wide hover:-translate-y-0.5"
                  style={{
                    backgroundColor: selected ? C.green : C.cream,
                    color: selected ? C.cream : C.brown,
                    border: `1px solid ${selected ? C.green : C.border}`,
                    boxShadow: selected ? "0 6px 16px rgba(45,74,62,0.2)" : "none",
                  }}
                >
                  <t.Icon className="w-4 h-4" />
                  {t.label}
                  <span
                    className="ml-2 inline-flex items-center justify-center min-w-5 h-5 px-1 rounded-full text-[10px]"
                    style={{ backgroundColor: selected ? "rgba(245,239,230,0.2)" : C.parchment }}
                  >
                    {counts[t.key] ?? 0}
                  </span>
                </button>
              );
            })}
          </div>
        </Reveal>

        {/* Course grid — keyed by tab so cards re-animate when the filter changes */}
        <div key={tab} className="grid sm:grid-cols-2 lg:grid-cols-6 gap-6 mb-14">
          {visible.map((course, i) => {
            const wide = wideCategories.has(course.category);
            return (
              <div
                key={course.id}
                className={`pop-in ${wide ? "sm:col-span-2 lg:col-span-6" : "lg:col-span-2"}`}
                style={{ animationDelay: `${i * 70}ms` }}
              >
                <CourseCard course={course} wide={wide} />
              </div>
            );
          })}
        </div>

        {/* Course summary table */}
        <Reveal>
          <div className="rounded-2xl p-6 sm:p-8 shadow-sm" style={{ backgroundColor: C.cream, border: `1px solid ${C.border}` }}>
            <p className="text-xs tracking-[0.2em] uppercase font-semibold mb-2 text-center" style={{ color: C.gold }}>
              ✦ Quick Overview
            </p>
            <h3 className="text-2xl sm:text-3xl font-serif font-bold mb-6 text-center" style={{ color: C.green }}>
              Course Summary
            </h3>
            <div className="overflow-x-auto">
              <table className="w-full text-xs sm:text-sm">
                <thead>
                  <tr style={{ borderBottom: `2px solid ${C.border}` }}>
                    {["Course", "Duration", "Original Price", "Offer Price"].map((h) => (
                      <th key={h} className="text-left py-3 px-2 font-semibold" style={{ color: C.green }}>
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {listedCourses.map((course, i) => (
                    <tr
                      key={course.id}
                      className="summary-row"
                      style={{ borderBottom: `1px solid ${C.sand}`, backgroundColor: i % 2 === 0 ? "transparent" : C.parchment }}
                    >
                      <td className="py-3 px-2 font-medium">
                        <Link href={course.category === "mentorship" ? `/?course=${course.id}#contact` : `/courses/${course.id}`} className="hover:underline underline-offset-4" style={{ color: C.brown }}>
                          {course.title}
                        </Link>
                      </td>
                      <td className="py-3 px-2" style={{ color: C.brownMid }}>{course.duration}</td>
                      <td className="py-3 px-2 line-through" style={{ color: C.brownLight }}>{course.originalPrice || "—"}</td>
                      <td className="py-3 px-2 font-bold font-serif" style={{ color: C.green }}>{course.offerPrice}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <style>{`.summary-row:hover { background-color: ${C.sand} !important; }`}</style>
            </div>
            <p className="text-xs mt-5 text-center leading-relaxed" style={{ color: C.brownLight }}>
              Zyphraa Online Learning Platform · All courses include hands-on projects and mock interview practice.
              Questions about enrolment?{" "}
              <Link href="/#contact" className="underline">Send us a message</Link>.
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
};

export default Courses;
