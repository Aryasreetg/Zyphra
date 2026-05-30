import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";

const coursesData = [
  {
    id: "full-stack-developer-program",
    title: "Full Stack Developer Program",
    duration: "3 Months",
    originalPrice: "₹25,000",
    offerPrice: "₹18,000",
    category: "flagship",
    badge: "Most Popular",
    description:
      "Become a job-ready full stack developer by building real-world applications using modern technologies. This programme focuses on practical learning, industry-level projects, and end-to-end deployment — perfectly aligned with current hiring requirements.",
    whatYouLearn: [
      "Frontend: Next.js, React, Tailwind CSS",
      "Backend: Spring Boot / Django",
      "Database: MongoDB / MySQL",
      "Authentication & REST APIs (JWT)",
      "DevOps Basics: Docker, CI/CD pipelines",
    ],
    projects: [
      "Full Stack Web Application",
      "Authentication System",
      "Deployment with DevOps tools",
    ],
  },
  {
    id: "frontend-mastery",
    title: "Frontend Mastery",
    duration: "1.5 Months",
    originalPrice: "15,000",
    offerPrice: "₹8,000",
    category: "specialisation",
    description:
      "Master modern frontend development by building responsive, high-performance web applications. Gain hands-on experience with industry-standard tools and best practices in UI/UX.",
    whatYouLearn: [
      "React fundamentals & component architecture",
      "Next.js with App Router",
      "Tailwind CSS for responsive design",
      "TypeScript basics",
      "UI/UX best practices",
    ],
    projects: ["Portfolio Website", "Dashboard UI", "Responsive Web Application"],
  },
  {
    id: "software-testing",
    title: "Software Testing Fundamentals",
    duration: "2 Weeks",
    originalPrice: "₹8,999",
    offerPrice: "₹3,999",
    category: "specialisation",
    description:
      "Master the fundamentals of software testing, manual QA, and quality assurance workflows for real applications.",
    whatYouLearn: [
      "Software testing lifecycle and QA best practices",
      "Manual test case design and execution",
      "Bug reporting and defect tracking",
      "Introduction to automation testing strategies",
      "Regression testing and quality metrics",
    ],
    projects: [
      "Real application test plan",
      "Bug report triage and tracking",
      "Regression checklist for release readiness",
    ],
  },
  {
    id: "backend-spring-boot",
    title: "Backend Development with Spring Boot",
    duration: "1.5 Months",
    originalPrice: "₹12,000",
    offerPrice: "₹8,000",
    category: "specialisation",
    description:
      "Learn to build scalable, secure backend systems with real-world REST APIs and authentication. Aligned with Aryasree's professional expertise in Spring Boot and microservices.",
    whatYouLearn: [
      "Spring Boot fundamentals",
      "REST API development & best practices",
      "JWT Authentication & security",
      "Microservices architecture basics",
      "Database integration: PostgreSQL / MySQL",
    ],
    projects: [
      "REST API System",
      "Authentication & Authorisation Service",
      "Mini Microservices Application",
    ],
  },
  {
    id: "git-version-control",
    title: "Git & Version Control",
    duration: "15 Days",
    originalPrice: null,
    offerPrice: "₹1,499",
    category: "specialisation",
    description:
      "A concise, practical course covering everything you need to confidently use Git in professional projects — from basic commands to branching strategies and CI/CD integration.",
    whatYouLearn: [
      "Git fundamentals: init, commit, push, pull",
      "Branching strategies (Git Flow)",
      "Merge, rebase, and conflict resolution",
      "Working with GitHub / GitLab",
      "Integrating Git with CI/CD pipelines",
    ],
    projects: [
      "Team collaboration project using Git",
      "Setting up a GitLab CI/CD pipeline",
    ],
  },
  {
    id: "3-day-workshop",
    title: "3-Day Live Workshop",
    duration: "3 Days (2 Hours / Day)",
    originalPrice: null,
    offerPrice: "₹999",
    category: "workshop",
    description:
      "Kickstart your tech journey with this beginner-friendly live workshop. In just 3 days, you will get hands-on exposure to Full Stack Development, Manual Testing, and DevOps by building a real mini-project — the fastest way to discover which specialisation suits you best before enrolling in a full programme.",
    schedule: [
      {
        day: "Day 1",
        title: "Full Stack Development Basics",
        topics: [
          "Frontend & backend overview and how they communicate",
          "Build a small working feature from scratch",
          "Live API integration demonstration",
        ],
      },
      {
        day: "Day 2",
        title: "Introduction to Manual Testing",
        topics: [
          "What is software testing and why it matters",
          "Real-world testing examples and test case writing",
          "Understanding software flow and bug reporting",
        ],
      },
      {
        day: "Day 3",
        title: "DevOps & Deployment",
        topics: [
          "Introduction to DevOps principles",
          "Deploy your mini-project to the cloud",
          "How real production applications go live",
        ],
      },
    ],
  },
  {
    id: "one-on-one-classes",
    title: "Personalised One-on-One Classes",
    duration: "Flexible",
    originalPrice: null,
    offerPrice: "Contact Us",
    category: "mentorship",
    description:
      "For learners who prefer a tailored experience, Zyphraa offers personalised one-on-one mentorship sessions. Fully customised to your current skill level, learning pace, and goals — whether you are a complete beginner or a working professional upskilling in a specific area.",
    whatsIncluded: [
      "Fully customised curriculum based on your goals",
      "Flexible scheduling at your convenience",
      "Direct mentorship from an experienced Java Spring Boot developer & project lead",
      "Code reviews, doubt-clearing, and project guidance",
      "Available for any topic: Full Stack, Backend, Frontend, Git, DevOps basics",
    ],
  },
];

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
      className={`rounded-2xl p-6 sm:p-8 shadow-sm ${className}`}
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
  const enrolLink = isContact
    ? "mailto:aryasree.zyphraa@gmail.com"
    : {
        "frontend-mastery": "https://forms.gle/3eACANepzSr72HSm9",
        "software-testing": "https://forms.gle/3mn6icFrWE5HgvEy7",
        "3-day-workshop": "https://forms.gle/WBvxgVHSrCuZspqVA",
      }[course.id] ?? "https://forms.gle/AdaaT56F6GMVCEUu9";

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
          <Card>
            <SectionTitle>What You'll Learn</SectionTitle>
            <BulletList items={course.whatYouLearn as string[]} />
          </Card>
        )}

        {/* Projects */}
        {"projects" in course && course.projects && (
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
        )}

        {/* Workshop Schedule */}
        {"schedule" in course && course.schedule && (
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
        )}

        {/* What's Included (mentorship) */}
        {"whatsIncluded" in course && course.whatsIncluded && (
          <Card>
            <SectionTitle>What's Included</SectionTitle>
            <BulletList items={course.whatsIncluded as string[]} />
          </Card>
        )}

        {/* Two-col: Format + Who Should Enrol */}
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

        {/* Learner Support */}
        <Card>
          <SectionTitle>Learner Support</SectionTitle>
          <p className="text-sm mb-4 leading-relaxed" style={{ color: C.brownMid }}>
            Zyphraa offers personalised support and mentor guidance throughout every programme.
          </p>
          <div className="grid sm:grid-cols-3 gap-4">
            {[
              { icon: "💬", label: "Doubt Sessions", desc: "Online Q&A and code review" },
              { icon: "📋", label: "Project Feedback", desc: "Guided feedback from mentors" },
              { icon: "📚", label: "Resource Access", desc: "Course materials & code samples" },
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