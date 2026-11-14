"use client";

import React, { useMemo, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { coursesData, type Course } from "@/config/courses";
import { C } from "@/lib/theme";
import Reveal from "./Reveal";
import codingImg from "@/public/images/coding-closeup.jpg";

const TABS = [
  { key: "all", label: "All courses" },
  { key: "flagship", label: "Flagship" },
  { key: "foundation", label: "Foundation" },
  { key: "specialisation", label: "Specialisation" },
  { key: "mentorship", label: "One-on-One" },
] as const;

type TabKey = (typeof TABS)[number]["key"];

const CATEGORY_LABEL: Record<string, string> = {
  flagship: "Flagship programme",
  foundation: "Foundation programme",
  specialisation: "Specialisation",
  mentorship: "Personalised mentorship",
};

const listedCourses = coursesData.filter((c) => c.category !== "workshop");

/** Small list with en-dash markers and hairline separators */
function DashList({ items, light = false }: { items?: string[]; light?: boolean }) {
  if (!items?.length) return null;
  return (
    <ul className="mb-0">
      {items.map((item) => (
        <li
          key={item}
          className="flex gap-3 py-2.5 text-[14.5px] leading-snug border-b mb-0"
          style={{ color: light ? "rgba(248,243,234,0.88)" : C.brown, borderColor: light ? "rgba(248,243,234,0.14)" : "rgba(58,50,43,0.12)" }}
        >
          <span aria-hidden style={{ color: light ? C.bronzeLight : C.bronze }}>—</span>
          {item}
        </li>
      ))}
    </ul>
  );
}

function Price({ course, light = false, size = "lg" }: { course: Course; light?: boolean; size?: "lg" | "sm" }) {
  return (
    <div className="flex items-baseline gap-3">
      <span className={`display ${size === "lg" ? "text-[2.4rem]" : "text-[1.5rem]"} leading-none`} style={{ color: light ? C.cream : C.primary }}>
        {course.offerPrice}
      </span>
      {course.originalPrice && (
        <span className="text-[14px] line-through" style={{ color: light ? "rgba(248,243,234,0.72)" : C.brownLight }}>
          {course.originalPrice}
        </span>
      )}
    </div>
  );
}

/** Large editorial row for flagship, foundation and mentorship programmes */
function FeatureRow({ course }: { course: Course }) {
  const flagship = course.category === "flagship";
  const mentorship = course.category === "mentorship";
  const light = flagship;

  return (
    <article
      className={`grid lg:grid-cols-12 gap-10 lg:gap-12 ${flagship ? "p-7 sm:p-10 lg:p-14" : "py-12 lg:py-14 border-t rule"}`}
      style={flagship ? { backgroundColor: C.primary } : undefined}
    >
      <div className="lg:col-span-5 flex flex-col">
        <p className="text-[11px] tracking-[0.18em] uppercase font-semibold mb-4" style={{ color: light ? C.bronzeLight : C.bronze }}>
          {CATEGORY_LABEL[course.category]}
          {course.badge && (
            <span className="serif serif-italic normal-case tracking-normal text-[14px] font-normal ml-2">— {course.badge}</span>
          )}
        </p>
        <h3 className="display text-[2.2rem] sm:text-[2.8rem] mb-5" style={{ color: light ? C.cream : C.primary }}>
          {course.title}
        </h3>
        <p className="text-[13px] tracking-wide mb-6" style={{ color: light ? "rgba(248,243,234,0.7)" : C.brownMid }}>
          {mentorship ? "Schedule: fully flexible" : `Duration: ${course.duration}`}
          {course.batchInfo && <span className="block mt-1 serif serif-italic text-[15px]" style={{ color: light ? C.bronzeLight : C.bronze }}>{course.batchInfo}</span>}
        </p>
        <Price course={course} light={light} />

        <div className="mt-8 lg:mt-auto lg:pt-10 flex flex-wrap items-center gap-x-6 gap-y-4">
          {mentorship ? (
            <Link href={`/?course=${course.id}#contact`} className="btn-z btn-solid">
              Enquire about 1:1 classes <span className="arr" aria-hidden>→</span>
            </Link>
          ) : (
            <>
              <Link href={`/courses/${course.id}`} className={`btn-z ${light ? "btn-cream" : "btn-solid"}`}>
                View details &amp; enrol <span className="arr" aria-hidden>→</span>
              </Link>
              <Link href={`/?course=${course.id}#contact`} className="ulink on text-[14px]" style={{ color: light ? C.cream : C.primary }}>
                Ask a question
              </Link>
            </>
          )}
        </div>
      </div>

      <div className="lg:col-span-7">
        <p className="text-[16.5px] leading-[1.75] mb-8" style={{ color: light ? "rgba(248,243,234,0.82)" : C.brown }}>
          {course.description}
        </p>
        <div className={`grid ${course.projects ? "sm:grid-cols-2" : ""} gap-8`}>
          <div>
            <h4 className="text-[11px] tracking-[0.18em] uppercase font-semibold mb-2" style={{ color: light ? C.bronzeLight : C.bronze }}>
              {mentorship ? "What's included" : "What you'll learn"}
            </h4>
            <DashList items={mentorship ? course.whatsIncluded : course.whatYouLearn} light={light} />
          </div>
          {course.projects && (
            <div>
              <h4 className="text-[11px] tracking-[0.18em] uppercase font-semibold mb-2" style={{ color: light ? C.bronzeLight : C.bronze }}>
                Projects
              </h4>
              <DashList items={course.projects} light={light} />
            </div>
          )}
        </div>
      </div>
    </article>
  );
}

/** Compact, expandable index row for specialisation courses */
function IndexRow({ course, index }: { course: Course; index: number }) {
  const [open, setOpen] = useState(false);
  const panelId = `course-panel-${course.id}`;

  return (
    <article className="border-t rule">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        aria-controls={panelId}
        className="row-hover w-full text-left grid grid-cols-[2.5rem_1fr_auto] sm:grid-cols-[3rem_1fr_9rem_8rem_2rem] items-baseline gap-x-4 py-6 sm:px-3"
      >
        <span className="serif serif-italic text-[15px]" style={{ color: C.bronze }}>
          {String(index + 1).padStart(2, "0")}
        </span>
        <span>
          <span className="display block text-[1.6rem] sm:text-[1.85rem]" style={{ color: C.primary }}>
            {course.title}
          </span>
          <span className="sm:hidden block mt-1 text-[13px]" style={{ color: C.brownMid }}>
            {course.duration} · {course.offerPrice}
          </span>
        </span>
        <span className="hidden sm:block text-[14px]" style={{ color: C.brownMid }}>{course.duration}</span>
        <span className="hidden sm:block">
          <Price course={course} size="sm" />
        </span>
        <span
          aria-hidden
          className="justify-self-end text-xl leading-none"
          style={{ color: C.primary, transform: `rotate(${open ? 45 : 0}deg)`, transition: "transform 300ms ease" }}
        >
          +
        </span>
      </button>

      <div id={panelId} className="accordion-body" data-open={open}>
        <div>
          <div className="grid lg:grid-cols-12 gap-8 pb-10 pt-2 sm:px-3 lg:pl-[4.75rem]">
            <div className="lg:col-span-5">
              <p className="text-[15.5px] leading-[1.75] mb-6" style={{ color: C.brown }}>{course.description}</p>
              <div className="flex flex-wrap items-center gap-x-6 gap-y-4">
                <Link href={`/courses/${course.id}`} className="btn-z btn-solid">
                  View details &amp; enrol <span className="arr" aria-hidden>→</span>
                </Link>
                <Link href={`/?course=${course.id}#contact`} className="ulink on text-[14px]" style={{ color: C.primary }}>
                  Ask a question
                </Link>
              </div>
            </div>
            <div className="lg:col-span-7 grid sm:grid-cols-2 gap-8">
              <div>
                <h4 className="text-[11px] tracking-[0.18em] uppercase font-semibold mb-2" style={{ color: C.bronze }}>What you&rsquo;ll learn</h4>
                <DashList items={course.whatYouLearn} />
              </div>
              <div>
                <h4 className="text-[11px] tracking-[0.18em] uppercase font-semibold mb-2" style={{ color: C.bronze }}>Projects</h4>
                <DashList items={course.projects} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}

const Courses = () => {
  const [tab, setTab] = useState<TabKey>("all");

  const counts = useMemo(() => {
    const map: Record<string, number> = { all: listedCourses.length };
    listedCourses.forEach((c) => (map[c.category] = (map[c.category] ?? 0) + 1));
    return map;
  }, []);

  const show = (cat: string) => tab === "all" || tab === cat;
  const flagship = listedCourses.filter((c) => c.category === "flagship");
  const foundation = listedCourses.filter((c) => c.category === "foundation");
  const specialisation = listedCourses.filter((c) => c.category === "specialisation");
  const mentorship = listedCourses.filter((c) => c.category === "mentorship");

  return (
    <section id="courses" style={{ backgroundColor: C.cream }}>
      <div className="wrap py-20 lg:py-28">
        {/* Header */}
        <div className="grid lg:grid-cols-12 gap-10 mb-14 items-end">
          <Reveal className="lg:col-span-7">
            <p className="label mb-6">
              <span className="label-num">03</span> Course catalogue 2026
            </p>
            <h2 className="display text-[2.8rem] sm:text-[3.8rem] lg:text-[4.4rem]" style={{ color: C.primary }}>
              Zyphraa <em style={{ color: C.bronze }}>courses</em>
            </h2>
            <p className="lede mt-6 mb-0 max-w-xl">
              Industry-aligned programmes built around real-world projects, hands-on implementation, and job-ready
              skills. All courses include practical projects, personalised support, and live mock interview practice.
            </p>
          </Reveal>
          <Reveal delay={120} className="hidden lg:block lg:col-span-4 lg:col-start-9">
            <div className="relative aspect-[3/2] overflow-hidden settle">
              <Image src={codingImg} alt="A developer writing code on a laptop" fill placeholder="blur" sizes="30vw" className="photo object-cover" />
            </div>
          </Reveal>
        </div>

        {/* Filter tabs */}
        <div role="tablist" aria-label="Filter courses" className="flex gap-6 sm:gap-9 overflow-x-auto border-b rule mb-10 -mx-1 px-1">
          {TABS.map((t) => {
            const selected = tab === t.key;
            return (
              <button
                key={t.key}
                role="tab"
                aria-selected={selected}
                onClick={() => setTab(t.key)}
                className="tabline whitespace-nowrap text-[14.5px]"
                style={{ color: selected ? C.primary : C.brownMid, fontWeight: selected ? 600 : 500 }}
              >
                {t.label}
                <sup className="ml-1 text-[10px]" style={{ color: C.bronze }}>{counts[t.key] ?? 0}</sup>
              </button>
            );
          })}
        </div>

        {/* Courses — keyed by tab so they re-animate when the filter changes */}
        <div key={tab} className="pop-in">
          {show("flagship") && flagship.map((c) => <FeatureRow key={c.id} course={c} />)}

          {show("foundation") && foundation.length > 0 && (
            <div className={tab === "all" ? "mt-16" : ""}>
              {tab === "all" && (
                <h3 className="text-[12px] tracking-[0.18em] uppercase font-semibold mb-2" style={{ color: C.bronze }}>
                  Foundation programmes — start from zero
                </h3>
              )}
              {foundation.map((c) => <FeatureRow key={c.id} course={c} />)}
            </div>
          )}

          {show("specialisation") && specialisation.length > 0 && (
            <div className={tab === "all" ? "mt-16" : ""}>
              {tab === "all" && (
                <h3 className="text-[12px] tracking-[0.18em] uppercase font-semibold mb-2" style={{ color: C.bronze }}>
                  Specialisations — focused learning paths
                </h3>
              )}
              <div className="border-b rule">
                {specialisation.map((c, i) => <IndexRow key={c.id} course={c} index={i} />)}
              </div>
            </div>
          )}

          {show("mentorship") && mentorship.length > 0 && (
            <div className={tab === "all" ? "mt-16" : ""}>
              {mentorship.map((c) => <FeatureRow key={c.id} course={c} />)}
            </div>
          )}
        </div>

        {/* At a glance */}
        <Reveal>
          <div className="mt-20 pt-10 border-t-2" style={{ borderColor: C.primary }}>
            <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 mb-6">
              <h3 className="display text-[1.9rem]" style={{ color: C.primary }}>Course summary</h3>
              <p className="text-[13px] mb-0" style={{ color: C.brownLight }}>Quick overview · prices in INR</p>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-[14px]">
                <thead>
                  <tr className="border-b rule">
                    {["Course", "Duration", "Original", "Offer"].map((h, i) => (
                      <th key={h} className={`py-3 pr-4 font-semibold text-[11px] tracking-[0.16em] uppercase ${i > 1 ? "text-right" : "text-left"}`} style={{ color: C.bronze }}>
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {listedCourses.map((course) => (
                    <tr key={course.id} className="row-hover border-b rule">
                      <td className="py-3.5 pr-4">
                        <Link
                          href={course.category === "mentorship" ? `/?course=${course.id}#contact` : `/courses/${course.id}`}
                          className="ulink font-medium"
                          style={{ color: C.primary }}
                        >
                          {course.title}
                        </Link>
                      </td>
                      <td className="py-3.5 pr-4 whitespace-nowrap" style={{ color: C.brownMid }}>{course.duration}</td>
                      <td className="py-3.5 pr-4 text-right line-through whitespace-nowrap" style={{ color: C.brownLight }}>{course.originalPrice || "—"}</td>
                      <td className="py-3.5 text-right serif text-[16px] whitespace-nowrap" style={{ color: C.primary }}>{course.offerPrice}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="text-[13px] mt-6 mb-0" style={{ color: C.brownMid }}>
              All courses include hands-on projects and mock interview practice. Questions about enrolment?{" "}
              <Link href="/#contact" className="ulink on" style={{ color: C.primary }}>Send us a message</Link>
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
};

export default Courses;
