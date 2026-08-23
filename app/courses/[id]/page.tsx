import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { coursesData, getEnrolLink } from "@/config/courses";
import Reveal from "@/components/Reveal";

// ── Colour tokens (matching the rest of the site) ──────────────────────────
const C = {
  cream: "#F5EFE6",
  parchment: "#EDE5D4",
  border: "#D4C5A9",
  green: "#2D4A3E",
  gold: "#8B6914",
  goldLight: "#C4A96A",
  brown: "#4A3728",
  brownMid: "#6B5744",
  brownLight: "#9C8570",
  amber: "#FDF6E3",
  amberBorder: "#E8D5A3",
  amberText: "#7A5C2E",
};

// ── Small reusable pieces ───────────────────────────────────────────────────

function Dot({ color = C.gold }: { color?: string }) {
  return (
    <span
      className="mt-1.5 w-1.5 h-1.5 rounded-full shrink-0"
      style={{ backgroundColor: color, display: "inline-block" }}
    />
  );
}

function Card({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`hover-lift rounded-2xl p-6 sm:p-8 shadow-sm ${className}`}
      style={{ backgroundColor: C.cream, border: `1px solid ${C.border}` }}
    >
      {children}
    </div>
  );
}

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <h2
      className="font-serif text-xl sm:text-2xl font-bold mb-5"
      style={{ color: C.green }}
    >
      {children}
    </h2>
  );
}

function BulletList({ items }: { items: string[] }) {
  return (
    <ul className="space-y-2.5">
      {items.map((item) => (
        <li key={item} className="flex items-start gap-2.5 text-sm" style={{ color: C.brown }}>
          <Dot />
          {item}
        </li>
      ))}
    </ul>
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

  return (
    <div className="min-h-screen" style={{ backgroundColor: C.parchment }}>

      {/* ── Breadcrumb bar ─────────────────────────────────────────────── */}
      <div
        className="border-b px-4 sm:px-6 py-3"
        style={{ backgroundColor: C.cream, borderColor: C.border }}
      >
        <nav className="max-w-4xl mx-auto flex items-center gap-2 text-xs" style={{ color: C.brownLight }}>
          <Link href="/" className="hover:underline transition-colors" style={{ color: C.green }}>
            Home
          </Link>
          <span>/</span>
          <Link href="/#courses" className="hover:underline transition-colors" style={{ color: C.green }}>
            Courses
          </Link>
          <span>/</span>
          <span style={{ color: C.brownLight }}>{course.title}</span>
        </nav>
      </div>

      {/* ── Hero header ────────────────────────────────────────────────── */}
      <div style={{ backgroundColor: C.green }}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12 sm:py-16">

          {/* Badge row */}
          <div className="flex flex-wrap items-center gap-3 mb-5">
            <span
              className="px-3 py-1 rounded-full text-xs font-semibold tracking-widest uppercase"
              style={{ backgroundColor: "rgba(196,169,106,0.2)", color: C.goldLight, border: `1px solid ${C.goldLight}` }}
            >
              {"badge" in course && course.badge ? String(course.badge) : course.category}
            </span>
            <span className="text-xs tracking-widest uppercase" style={{ color: C.goldLight }}>
              ✦ {course.duration}
            </span>
            {"batchInfo" in course && course.batchInfo && (
              <span
                className="px-3 py-1 rounded-full text-xs font-semibold"
                style={{ backgroundColor: "rgba(245,239,230,0.12)", color: C.cream, border: `1px solid rgba(245,239,230,0.3)` }}
              >
                {course.batchInfo}
              </span>
            )}
          </div>

          {/* Title */}
          <h1
            className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold mb-4 leading-tight"
            style={{ color: C.cream }}
          >
            {course.title}
          </h1>

          <p className="text-sm sm:text-base leading-relaxed mb-8 max-w-2xl" style={{ color: "rgba(245,239,230,0.75)" }}>
            {course.description}
          </p>

          {/* Price + CTA row */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5">
            <div>
              {course.originalPrice && (
                <span className="text-base line-through mr-2" style={{ color: C.goldLight }}>
                  {course.originalPrice}
                </span>
              )}
              <span className="text-4xl sm:text-5xl font-serif font-bold" style={{ color: C.cream }}>
                {course.offerPrice}
              </span>
            </div>

            <a
              href={enrolLink}
              target={isContact ? undefined : "_blank"}
              rel={isContact ? undefined : "noopener noreferrer"}
              className="enrol-btn px-7 py-3.5 rounded-full font-semibold text-sm tracking-wide transition-opacity hover:opacity-85 shadow-lg"
              style={{ backgroundColor: C.cream, color: C.green }}
            >
              {isContact ? "Contact Us to Enquire ✦" : "Enrol Now ✦"}
            </a>
          </div>
        </div>
      </div>

      {/* ── Body ───────────────────────────────────────────────────────── */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12 space-y-6">

        {/* What You'll Learn */}
        {"whatYouLearn" in course && course.whatYouLearn && (
          <Reveal>
          <Card>
            <SectionTitle>What You'll Learn</SectionTitle>
            <BulletList items={course.whatYouLearn as string[]} />
          </Card>
          </Reveal>
        )}

        {/* Projects */}
        {"projects" in course && course.projects && (
          <Reveal delay={80}>
          <Card>
            <SectionTitle>Projects You'll Build</SectionTitle>
            <div className="grid sm:grid-cols-2 gap-3">
              {(course.projects as string[]).map((project, i) => (
                <div
                  key={project}
                  className="flex items-start gap-3 p-4 rounded-xl"
                  style={{ backgroundColor: C.parchment, border: `1px solid ${C.border}` }}
                >
                  <span
                    className="shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold font-serif"
                    style={{ backgroundColor: C.green, color: C.cream }}
                  >
                    {i + 1}
                  </span>
                  <span className="text-sm" style={{ color: C.brown }}>{project}</span>
                </div>
              ))}
            </div>
          </Card>
          </Reveal>
        )}

        {/* Workshop Schedule */}
        {"schedule" in course && course.schedule && (
          <Reveal>
          <Card>
            <SectionTitle>Workshop Schedule</SectionTitle>
            <div className="space-y-6">
              {(course.schedule as { day: string; title: string; topics: string[] }[]).map(({ day, title, topics }, i) => (
                <div key={day} className="flex gap-4">
                  <div
                    className="shrink-0 w-10 h-10 rounded-full flex items-center justify-center font-serif font-bold"
                    style={{ backgroundColor: C.green, color: C.cream }}
                  >
                    {i + 1}
                  </div>
                  <div>
                    <p className="text-xs tracking-widest uppercase font-semibold mb-0.5" style={{ color: C.gold }}>
                      {day}
                    </p>
                    <h4 className="font-semibold mb-2" style={{ color: C.green }}>{title}</h4>
                    <ul className="space-y-1.5">
                      {topics.map((t) => (
                        <li key={t} className="flex items-start gap-2 text-xs" style={{ color: C.brown }}>
                          <Dot />
                          {t}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </Card>
          </Reveal>
        )}

        {/* What's Included (mentorship) */}
        {"whatsIncluded" in course && course.whatsIncluded && (
          <Reveal>
          <Card>
            <SectionTitle>What's Included</SectionTitle>
            <BulletList items={course.whatsIncluded as string[]} />
          </Card>
          </Reveal>
        )}

        {/* Two-col: Format + Who Should Enrol */}
        <Reveal>
        <div className="grid sm:grid-cols-2 gap-6">
          <Card>
            <SectionTitle>Course Format</SectionTitle>
            <BulletList
              items={[
                "100% online with live interactive sessions",
                "Hands-on real-world projects with mentor guidance",
                "Downloadable resources and code samples",
                "Weekly progress reviews and project feedback",
              ]}
            />
          </Card>

          <Card>
            <SectionTitle>Who Should Enrol</SectionTitle>
            <BulletList
              items={[
                "Beginners wanting structured online learning",
                "Working professionals seeking flexible upskilling",
                "Students preparing for technology careers",
                "Career switchers breaking into tech",
              ]}
            />
          </Card>
        </div>
        </Reveal>

        {/* Learner Support */}
        <Reveal>
        <Card>
          <SectionTitle>Learner Support</SectionTitle>
          <p className="text-sm mb-4 leading-relaxed" style={{ color: C.brownMid }}>
            Zyphraa offers personalised support and mentor guidance throughout every programme,
            including live mock interview practice before you start applying.
          </p>
          <div className="grid sm:grid-cols-3 gap-4">
            {[
              { icon: "💬", label: "Doubt Sessions", desc: "Online Q&A and code review" },
              { icon: "📋", label: "Project Feedback", desc: "Guided feedback from mentors" },
              { icon: "🎤", label: "Mock Interviews", desc: "Live practice with real feedback" },
            ].map(({ icon, label, desc }) => (
              <div
                key={label}
                className="p-4 rounded-xl text-center"
                style={{ backgroundColor: C.parchment, border: `1px solid ${C.border}` }}
              >
                <div className="text-2xl mb-2">{icon}</div>
                <p className="font-semibold text-xs mb-1" style={{ color: C.green }}>{label}</p>
                <p className="text-xs" style={{ color: C.brownLight }}>{desc}</p>
              </div>
            ))}
          </div>
        </Card>
        </Reveal>

        {/* Important notes (workshop only) */}
        {course.category === "workshop" && (
          <div
            className="rounded-2xl p-5 text-sm"
            style={{ backgroundColor: C.amber, border: `1px solid ${C.amberBorder}`, color: C.amberText }}
          >
            <p className="font-semibold mb-2">📌 Important Notes</p>
            <ul className="space-y-1 text-xs leading-relaxed">
              <li>• Live participation required — no recordings available</li>
              <li>• Bring your own laptop with internet connection</li>
              <li>• No prior experience needed — just curiosity!</li>
              <li>• Sessions conducted via Zoom</li>
            </ul>
          </div>
        )}

        {/* ── CTA banner ──────────────────────────────────────────────── */}
        <div
          className="rounded-2xl p-8 sm:p-12 text-center"
          style={{ backgroundColor: C.green }}
        >
          <p className="text-xs tracking-widest uppercase font-semibold mb-3" style={{ color: C.goldLight }}>
            ✦ Learn. Build. Grow.
          </p>
          <h2
            className="font-serif text-2xl sm:text-3xl font-bold mb-3"
            style={{ color: C.cream }}
          >
            Ready to Start Your Journey?
          </h2>
          <p className="text-sm mb-8 max-w-md mx-auto leading-relaxed" style={{ color: "rgba(245,239,230,0.75)" }}>
            Secure your spot and take the first step toward your dream career. ♡
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <a
              href={enrolLink}
              target={isContact ? undefined : "_blank"}
              rel={isContact ? undefined : "noopener noreferrer"}
              className="px-8 py-3.5 rounded-full font-bold text-sm tracking-wide transition-opacity hover:opacity-85 shadow-lg"
              style={{ backgroundColor: C.cream, color: C.green }}
            >
              {isContact ? "Contact Us ✦" : "Enrol Now — " + course.offerPrice + " ✦"}
            </a>
            <Link
              href="/#courses"
              className="view-all-btn px-8 py-3.5 rounded-full font-semibold text-sm tracking-wide transition-colors"
              style={{ border: `1.5px solid rgba(245,239,230,0.4)`, color: C.cream }}
            >
              View All Courses
            </Link>
          </div>
        </div>

        {/* Inline hover style (no JS handlers needed) */}
        <style>{`
          .view-all-btn:hover { background-color: rgba(245,239,230,0.1); }
          .enrol-btn:hover { opacity: 0.88; }
        `}</style>

      </div>
    </div>
  );
}