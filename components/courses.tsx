import React from "react";
import Link from "next/link";

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
      "Backend: Spring Boot / Django / Node.js",
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
    originalPrice: "₹12,000",
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
    duration: "7 Days",
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
    id: "one-on-one-classes",
    title: "Personalised One-on-One Classes",
    duration: "Flexible",
    originalPrice: null,
    offerPrice: "Contact Us",
    category: "mentorship",
    description:
      "For learners who prefer a fully tailored experience, Zyphraa offers personalised one-on-one mentorship sessions. Completely customised to your skill level, pace, and goals — whether you're a complete beginner or a working professional.",
    whatsIncluded: [
      "Fully customised curriculum based on your goals",
      "Flexible scheduling — mornings, evenings, or weekends",
      "Direct mentorship from an experienced Java Spring Boot developer & project lead",
      "Code reviews, doubt-clearing, and end-to-end project guidance",
      "Available for: Full Stack, Backend, Frontend, Git, DevOps basics",
    ],
  },
];

const CategoryLabel = ({ text }: { text: string }) => (
  <p className="text-xs tracking-[0.2em] uppercase font-semibold mb-3 text-center" style={{ color: "#8B6914" }}>
    ✦ {text}
  </p>
);

const SectionHeading = ({ text }: { text: string }) => (
  <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif font-bold mb-8 text-center" style={{ color: "#2D4A3E" }}>
    {text}
  </h2>
);

const Courses = () => {
  const flagshipCourses = coursesData.filter((c) => c.category === "flagship");
  const specialisationCourses = coursesData.filter((c) => c.category === "specialisation");
  const mentorshipCourses = coursesData.filter((c) => c.category === "mentorship");

  return (
    <section
      id="courses"
      className="py-12 sm:py-16 md:py-20"
      style={{ backgroundColor: "#EDE5D4" }}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6">

        {/* Header */}
        <div className="text-center mb-10 sm:mb-12">
          <p className="text-xs tracking-[0.25em] uppercase font-semibold mb-3" style={{ color: "#8B6914" }}>
            ✦ Course Catalogue 2026
          </p>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-serif font-bold mb-4" style={{ color: "#2D4A3E" }}>
            Zyphraa Courses
          </h1>
          <p className="text-base sm:text-lg max-w-3xl mx-auto leading-relaxed" style={{ color: "#6B5744" }}>
            Industry-aligned programmes built around real-world projects, hands-on implementation,
            and job-ready skills. All courses include practical projects and personalised support.
          </p>
        </div>

        {/* FLAGSHIP */}
        <div className="mb-12 sm:mb-16">
          <CategoryLabel text="Flagship Programme" />
          <SectionHeading text="Full Stack Developer Program" />
          <div className="grid gap-8">
            {flagshipCourses.map((course) => (
              <div
                key={course.id}
                className="rounded-2xl p-6 sm:p-8 lg:p-10 shadow-sm relative overflow-hidden"
                style={{ backgroundColor: "#F5EFE6", border: "1px solid #D4C5A9" }}
              >
                {course.badge && (
                  <span
                    className="absolute top-5 right-5 px-3 py-1 rounded-full text-xs font-semibold"
                    style={{ backgroundColor: "#2D4A3E", color: "#F5EFE6" }}
                  >
                    {course.badge}
                  </span>
                )}

                <div className="flex flex-col sm:flex-row justify-between items-start mb-4 gap-4">
                  <h3 className="text-xl sm:text-2xl font-serif font-bold pr-20 sm:pr-0" style={{ color: "#2D4A3E" }}>
                    {course.title}
                  </h3>
                  <div className="text-left sm:text-right flex-shrink-0">
                    <p className="text-xs mb-1" style={{ color: "#8B6914" }}>Duration: {course.duration}</p>
                    {course.originalPrice && (
                      <span className="text-sm line-through mr-2" style={{ color: "#9C8570" }}>
                        {course.originalPrice}
                      </span>
                    )}
                    <span className="text-2xl font-serif font-bold" style={{ color: "#2D4A3E" }}>
                      {course.offerPrice}
                    </span>
                  </div>
                </div>

                <p className="text-sm sm:text-base leading-relaxed text-justify mb-6" style={{ color: "#6B5744" }}>
                  {course.description}
                </p>

                <div className="grid sm:grid-cols-2 gap-6 mb-8">
                  <div>
                    <h4 className="font-semibold text-sm mb-3" style={{ color: "#2D4A3E" }}>What You'll Learn:</h4>
                    <ul className="space-y-1.5">
                      {course.whatYouLearn?.map((item) => (
                        <li key={item} className="flex items-start gap-2 text-xs" style={{ color: "#4A3728" }}>
                          <span className="mt-1 w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ backgroundColor: "#8B6914" }} />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-sm mb-3" style={{ color: "#2D4A3E" }}>Projects:</h4>
                    <ul className="space-y-1.5">
                      {course.projects?.map((project) => (
                        <li key={project} className="flex items-start gap-2 text-xs" style={{ color: "#4A3728" }}>
                          <span className="mt-1 w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ backgroundColor: "#2D4A3E" }} />
                          {project}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <Link
                  href={`/courses/${course.id}`}
                  className="inline-block px-6 py-3 rounded-full font-semibold text-sm tracking-wide transition-opacity hover:opacity-85"
                  style={{ backgroundColor: "#2D4A3E", color: "#F5EFE6" }}
                >
                  View Details & Enrol ✦
                </Link>
              </div>
            ))}
          </div>
        </div>

        {/* SPECIALISATION */}
        <div className="mb-12 sm:mb-16">
          <CategoryLabel text="Specialisation Courses" />
          <SectionHeading text="Focused Learning Paths" />
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {specialisationCourses.map((course) => (
              <div
                key={course.id}
                className="rounded-2xl p-6 shadow-sm flex flex-col"
                style={{ backgroundColor: "#F5EFE6", border: "1px solid #D4C5A9" }}
              >
                <div className="mb-4">
                  <h3 className="font-serif font-bold text-lg mb-1" style={{ color: "#2D4A3E" }}>
                    {course.title}
                  </h3>
                  <p className="text-xs mb-1" style={{ color: "#8B6914" }}>Duration: {course.duration}</p>
                  <div className="flex items-center gap-2 mt-1">
                    {course.originalPrice && (
                      <span className="text-xs line-through" style={{ color: "#9C8570" }}>
                        {course.originalPrice}
                      </span>
                    )}
                    <span className="text-xl font-serif font-bold" style={{ color: "#2D4A3E" }}>
                      {course.offerPrice}
                    </span>
                  </div>
                </div>

                <p className="text-xs leading-relaxed mb-4 text-justify" style={{ color: "#6B5744" }}>
                  {course.description}
                </p>

                <div className="mb-4">
                  <h4 className="font-semibold text-xs mb-2" style={{ color: "#2D4A3E" }}>What You'll Learn:</h4>
                  <ul className="space-y-1">
                    {course.whatYouLearn?.map((item) => (
                      <li key={item} className="flex items-start gap-2 text-xs" style={{ color: "#4A3728" }}>
                        <span className="mt-1 w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ backgroundColor: "#8B6914" }} />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mb-6">
                  <h4 className="font-semibold text-xs mb-2" style={{ color: "#2D4A3E" }}>Projects:</h4>
                  <ul className="space-y-1">
                    {course.projects?.map((project) => (
                      <li key={project} className="flex items-start gap-2 text-xs" style={{ color: "#4A3728" }}>
                        <span className="mt-1 w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ backgroundColor: "#2D4A3E" }} />
                        {project}
                      </li>
                    ))}
                  </ul>
                </div>

                <Link
                  href={`/courses/${course.id}`}
                  className="mt-auto block text-center py-2.5 rounded-full text-xs font-semibold tracking-wide transition-opacity hover:opacity-85"
                  style={{ backgroundColor: "#2D4A3E", color: "#F5EFE6" }}
                >
                  View Details & Enrol
                </Link>
              </div>
            ))}
          </div>
        </div>

        {/* ONE-ON-ONE */}
        <div className="mb-12 sm:mb-16">
          <CategoryLabel text="Personalised Mentorship" />
          <SectionHeading text="One-on-One Classes" />
          {mentorshipCourses.map((course) => (
            <div
              key={course.id}
              className="rounded-2xl p-6 sm:p-8 lg:p-10 shadow-sm"
              style={{ backgroundColor: "#F5EFE6", border: "1px solid #D4C5A9" }}
            >
              <div className="flex flex-col sm:flex-row justify-between items-start mb-4 gap-4">
                <div>
                  <h3 className="text-xl sm:text-2xl font-serif font-bold mb-1" style={{ color: "#2D4A3E" }}>
                    {course.title}
                  </h3>
                  <p className="text-xs" style={{ color: "#8B6914" }}>Schedule: Fully Flexible</p>
                </div>
                <span className="text-xl font-serif font-bold" style={{ color: "#2D4A3E" }}>
                  {course.offerPrice}
                </span>
              </div>

              <p className="text-sm sm:text-base leading-relaxed text-justify mb-6" style={{ color: "#6B5744" }}>
                {course.description}
              </p>

              <div className="mb-8">
                <h4 className="font-semibold text-sm mb-3" style={{ color: "#2D4A3E" }}>What's Included:</h4>
                <ul className="space-y-2">
                  {course.whatsIncluded?.map((item) => (
                    <li key={item} className="flex items-start gap-2 text-sm" style={{ color: "#4A3728" }}>
                      <span className="mt-1 w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ backgroundColor: "#8B6914" }} />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <a
                href="mailto:aryasree.zyphraa@gmail.com"
                className="inline-block px-6 py-3 rounded-full font-semibold text-sm tracking-wide transition-opacity hover:opacity-85"
                style={{ backgroundColor: "#2D4A3E", color: "#F5EFE6" }}
              >
                Contact Us to Enquire ✦
              </a>
            </div>
          ))}
        </div>

        {/* COURSE SUMMARY TABLE */}
        <div
          className="rounded-2xl p-6 sm:p-8 shadow-sm"
          style={{ backgroundColor: "#F5EFE6", border: "1px solid #D4C5A9" }}
        >
          <p className="text-xs tracking-[0.2em] uppercase font-semibold mb-2 text-center" style={{ color: "#8B6914" }}>
            ✦ Quick Overview
          </p>
          <h2 className="text-2xl sm:text-3xl font-serif font-bold mb-6 text-center" style={{ color: "#2D4A3E" }}>
            Course Summary
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full text-xs sm:text-sm">
              <thead>
                <tr style={{ borderBottom: "2px solid #D4C5A9" }}>
                  {["Course", "Duration", "Original Price", "Offer Price"].map((h) => (
                    <th key={h} className="text-left py-3 px-2 font-semibold" style={{ color: "#2D4A3E" }}>
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {coursesData.map((course, i) => (
                  <tr
                    key={course.id}
                    style={{ borderBottom: "1px solid #E8DCC8", backgroundColor: i % 2 === 0 ? "transparent" : "#EDE5D4" }}
                  >
                    <td className="py-3 px-2 font-medium" style={{ color: "#4A3728" }}>{course.title}</td>
                    <td className="py-3 px-2" style={{ color: "#6B5744" }}>{course.duration}</td>
                    <td className="py-3 px-2 line-through" style={{ color: "#9C8570" }}>{course.originalPrice || "—"}</td>
                    <td className="py-3 px-2 font-bold font-serif" style={{ color: "#2D4A3E" }}>{course.offerPrice}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-xs mt-5 text-center leading-relaxed" style={{ color: "#9C8570" }}>
            Zyphraa Online Learning Platform · All courses include hands-on projects.
            For enrolment enquiries contact{" "}
            <a href="mailto:aryasree.zyphraa@gmail.com" className="underline">aryasree.zyphraa@gmail.com</a>
          </p>
        </div>

      </div>
    </section>
  );
};

export default Courses;
