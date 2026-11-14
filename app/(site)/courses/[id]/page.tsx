import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { coursesData, getEnrolLink, type Course } from "@/config/courses";
import { C } from "@/lib/theme";
import Reveal from "@/components/Reveal";

const CATEGORY_LABEL: Record<string, string> = {
  flagship: "Flagship programme",
  foundation: "Foundation programme",
  specialisation: "Specialisation",
  workshop: "Live workshop",
  mentorship: "Personalised mentorship",
};

// ── Small pieces ────────────────────────────────────────────────────────────

function Section({ num, title, children }: { num: string; title: string; children: React.ReactNode }) {
  return (
    <Reveal>
      <section className="py-12 border-t rule">
        <p className="label mb-4">
          <span className="label-num">{num}</span> {title}
        </p>
        {children}
      </section>
    </Reveal>
  );
}

function DashList({ items, cols = 1 }: { items: string[]; cols?: 1 | 2 }) {
  return (
    <ul className={`mb-0 grid ${cols === 2 ? "sm:grid-cols-2 sm:gap-x-10" : ""}`}>
      {items.map((item) => (
        <li key={item} className="flex gap-3 py-3 text-[15.5px] leading-snug border-b rule mb-0" style={{ color: C.brown }}>
          <span aria-hidden style={{ color: C.bronze }}>—</span>
          {item}
        </li>
      ))}
    </ul>
  );
}

function PriceBlock({ course }: { course: Course }) {
  return (
    <div className="flex items-baseline gap-3 flex-wrap">
      <span className="display text-[3rem] leading-none" style={{ color: C.primary }}>{course.offerPrice}</span>
      {course.originalPrice && (
        <span className="text-[15px] line-through" style={{ color: C.brownLight }}>{course.originalPrice}</span>
      )}
    </div>
  );
}

// ── Page ────────────────────────────────────────────────────────────────────

interface CoursePageProps {
  params: Promise<{ id: string }>;
}

export async function generateStaticParams() {
  return coursesData.map((course) => ({ id: course.id }));
}

export async function generateMetadata({ params }: CoursePageProps) {
  const { id } = await params;
  const course = coursesData.find((c) => c.id === id);
  if (!course) return { title: "Course Not Found | Zyphraa" };
  return {
    title: `${course.title} | Zyphraa Online Learning Platform`,
    description: course.description,
  };
}

export default async function CoursePage({ params }: CoursePageProps) {
  const { id } = await params;
  const course = coursesData.find((c) => c.id === id);
  if (!course) notFound();

  const isContact = course.offerPrice === "Contact Us";
  const enrolLink = getEnrolLink(course);
  let n = 0;
  const next = () => String(++n).padStart(2, "0");

  return (
    <div style={{ backgroundColor: C.cream }}>
      {/* Breadcrumb */}
      <nav aria-label="Breadcrumb" className="wrap pt-8 text-[13px] flex flex-wrap items-center gap-2" style={{ color: C.brownLight }}>
        <Link href="/" className="ulink font-normal" style={{ color: C.primary }}>Home</Link>
        <span aria-hidden>/</span>
        <Link href="/#courses" className="ulink font-normal" style={{ color: C.primary }}>Courses</Link>
        <span aria-hidden>/</span>
        <span>{course.title}</span>
      </nav>

      <div className="wrap pt-10 lg:pt-14 pb-20 grid lg:grid-cols-12 gap-12 lg:gap-16">
        {/* ── Main column ─────────────────────────────────────────── */}
        <div className="lg:col-span-8">
          <header className="pb-12">
            <p className="label mb-6">
              {CATEGORY_LABEL[course.category] ?? course.category}
              {course.badge && <span className="serif serif-italic normal-case tracking-normal font-normal text-[15px]">— {course.badge}</span>}
            </p>
            <h1 className="display text-[2.8rem] sm:text-[4rem] lg:text-[4.6rem] mb-8" style={{ color: C.primary }}>
              {course.title}
            </h1>
            <p className="lede max-w-2xl mb-10">{course.description}</p>

            <dl className="grid grid-cols-2 sm:grid-cols-3 border-t rule">
              <div className="py-4 pr-4">
                <dt className="text-[11px] tracking-[0.16em] uppercase font-semibold mb-1" style={{ color: C.bronze }}>Duration</dt>
                <dd className="serif text-lg mb-0" style={{ color: C.primary }}>{course.duration}</dd>
              </div>
              <div className="py-4 pl-4 border-l rule">
                <dt className="text-[11px] tracking-[0.16em] uppercase font-semibold mb-1" style={{ color: C.bronze }}>Format</dt>
                <dd className="serif text-lg mb-0" style={{ color: C.primary }}>Live &amp; online</dd>
              </div>
              <div className="py-4 sm:pl-4 sm:border-l border-t sm:border-t-0 rule col-span-2 sm:col-span-1">
                <dt className="text-[11px] tracking-[0.16em] uppercase font-semibold mb-1" style={{ color: C.bronze }}>Includes</dt>
                <dd className="serif text-lg mb-0" style={{ color: C.primary }}>{course.category === "workshop" ? "Mini-project" : "Mock interviews"}</dd>
              </div>
            </dl>
            {course.batchInfo && (
              <p className="serif serif-italic text-[17px] mt-5 mb-0" style={{ color: C.bronze }}>{course.batchInfo}</p>
            )}
          </header>

          {course.whatYouLearn && (
            <Section num={next()} title="What you'll learn">
              <DashList items={course.whatYouLearn} cols={2} />
            </Section>
          )}

          {course.projects && (
            <Section num={next()} title="Projects you'll build">
              <ol className="mb-0">
                {course.projects.map((project, i) => (
                  <li key={project} className="grid grid-cols-[3.5rem_1fr] items-baseline py-4 border-b rule mb-0">
                    <span className="display serif-italic text-[2rem] leading-none" style={{ color: C.bronze }}>{String(i + 1).padStart(2, "0")}</span>
                    <span className="display text-[1.5rem]" style={{ color: C.primary }}>{project}</span>
                  </li>
                ))}
              </ol>
            </Section>
          )}

          {course.schedule && (
            <Section num={next()} title="Workshop schedule">
              <div>
                {course.schedule.map(({ day, title, topics }) => (
                  <div key={day} className="grid sm:grid-cols-[8rem_1fr] gap-2 sm:gap-6 py-6 border-b rule">
                    <p className="serif serif-italic text-[1.3rem] mb-0" style={{ color: C.bronze }}>{day}</p>
                    <div>
                      <h3 className="display text-[1.6rem] mb-3" style={{ color: C.primary }}>{title}</h3>
                      <ul className="mb-0">
                        {topics.map((t) => (
                          <li key={t} className="flex gap-3 py-1 text-[15px] mb-0" style={{ color: C.brown }}>
                            <span aria-hidden style={{ color: C.bronze }}>—</span>
                            {t}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ))}
              </div>
            </Section>
          )}

          {course.whatsIncluded && (
            <Section num={next()} title="What's included">
              <DashList items={course.whatsIncluded} />
            </Section>
          )}

          <Section num={next()} title="Format & who it's for">
            <div className="grid sm:grid-cols-2 gap-10">
              <div>
                <h3 className="display text-[1.5rem] mb-3" style={{ color: C.primary }}>Course format</h3>
                <DashList
                  items={[
                    "100% online with live interactive sessions",
                    "Hands-on real-world projects with mentor guidance",
                    "Downloadable resources and code samples",
                    "Weekly progress reviews and project feedback",
                  ]}
                />
              </div>
              <div>
                <h3 className="display text-[1.5rem] mb-3" style={{ color: C.primary }}>Who should enrol</h3>
                <DashList
                  items={[
                    "Beginners wanting structured online learning",
                    "Working professionals seeking flexible upskilling",
                    "Students preparing for technology careers",
                    "Career switchers breaking into tech",
                  ]}
                />
              </div>
            </div>
          </Section>

          <Section num={next()} title="Learner support">
            <p className="text-[16px] leading-[1.75] mb-8 max-w-2xl" style={{ color: C.brown }}>
              Zyphraa offers personalised support and mentor guidance throughout every programme, including live mock
              interview practice before you start applying.
            </p>
            <div className="grid sm:grid-cols-3 border-t rule">
              {[
                { label: "Doubt sessions", desc: "Online Q&A and code review" },
                { label: "Project feedback", desc: "Guided feedback from mentors" },
                { label: "Mock interviews", desc: "Live practice with real feedback" },
              ].map(({ label, desc }, i) => (
                <div key={label} className={`py-5 ${i > 0 ? "sm:pl-6 sm:border-l border-t sm:border-t-0" : ""} sm:pr-6 rule`}>
                  <p className="display text-[1.35rem] mb-1" style={{ color: C.primary }}>{label}</p>
                  <p className="text-[14px] mb-0" style={{ color: C.brownMid }}>{desc}</p>
                </div>
              ))}
            </div>
          </Section>

          {course.category === "workshop" && (
            <Reveal>
              <aside className="mt-4 p-6 border-l-2" style={{ backgroundColor: C.parchment, borderColor: C.bronze }}>
                <p className="text-[11px] tracking-[0.16em] uppercase font-semibold mb-3" style={{ color: C.bronze }}>Important notes</p>
                <ul className="mb-0 text-[15px] leading-relaxed" style={{ color: C.brown }}>
                  <li className="mb-1">Live participation required — no recordings available</li>
                  <li className="mb-1">Bring your own laptop with internet connection</li>
                  <li className="mb-1">No prior experience needed — just curiosity!</li>
                  <li className="mb-0">Sessions conducted via Zoom</li>
                </ul>
              </aside>
            </Reveal>
          )}
        </div>

        {/* ── Enrol card (sticky on desktop) ──────────────────────── */}
        <aside className="lg:col-span-4 order-first lg:order-none">
          <div className="lg:sticky lg:top-28 p-7 sm:p-8 shadow-[0_24px_60px_-30px_rgba(18,28,44,0.35)]" style={{ backgroundColor: "#FCF8F1", borderTop: `3px solid ${C.primary}` }}>
            <p className="text-[11px] tracking-[0.16em] uppercase font-semibold mb-4" style={{ color: C.bronze }}>
              {isContact ? "Pricing" : "Course fee"}
            </p>
            <PriceBlock course={course} />
            <p className="text-[13.5px] mt-3 mb-7" style={{ color: C.brownMid }}>
              {isContact ? "Tailored to your goals and schedule." : `${course.duration} · live online · projects included`}
            </p>
            <Link href={enrolLink} className="btn-z btn-solid w-full">
              {isContact ? "Contact Us to Enquire" : "Enrol Now"} <span className="arr" aria-hidden>→</span>
            </Link>
            {!isContact && (
              <Link href={`/?course=${course.id}#contact`} className="ulink on mt-5 text-[14px]" style={{ color: C.primary }}>
                Ask a question first
              </Link>
            )}
            <ul className="mt-7 pt-6 border-t rule text-[13.5px] mb-0" style={{ color: C.brown }}>
              {["Live, mentor-led sessions", "Real projects for your portfolio", "Mock interview practice"].map((t) => (
                <li key={t} className="flex gap-2 py-1 mb-0">
                  <span aria-hidden style={{ color: C.bronze }}>—</span>
                  {t}
                </li>
              ))}
            </ul>
          </div>
        </aside>
      </div>

      {/* ── Closing band ──────────────────────────────────────────── */}
      <section style={{ backgroundColor: C.primary }}>
        <div className="wrap py-20 grid lg:grid-cols-12 gap-10 items-end">
          <div className="lg:col-span-7">
            <p className="text-[12px] tracking-[0.18em] uppercase font-semibold mb-5" style={{ color: C.bronzeLight }}>Learn. Build. Grow.</p>
            <h2 className="display text-[2.6rem] sm:text-[3.4rem]" style={{ color: C.cream }}>
              Ready to start your <em style={{ color: C.bronzeLight }}>journey?</em>
            </h2>
            <p className="text-[16px] mt-5 mb-0 max-w-md" style={{ color: "rgba(248,243,234,0.75)" }}>
              Secure your spot and take the first step toward your dream career.
            </p>
          </div>
          <div className="lg:col-span-5 flex flex-col sm:flex-row lg:justify-end gap-4">
            <Link href={enrolLink} className="btn-z btn-cream">
              {isContact ? "Contact Us" : `Enrol Now — ${course.offerPrice}`} <span className="arr" aria-hidden>→</span>
            </Link>
            <Link href="/#courses" className="btn-z" style={{ color: C.cream, border: "1px solid rgba(248,243,234,0.35)" }}>
              View all courses
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
