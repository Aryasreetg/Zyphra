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
    description: "Become a job-ready full stack developer by building real-world applications using modern technologies. This programme focuses on practical learning, industry-level projects, and end-to-end deployment — perfectly aligned with current hiring requirements.",
    whatYouLearn: [
      "Frontend: Next.js, React, Tailwind CSS",
      "Backend: Spring Boot / Django",
      "Database: MongoDB / MySQL",
      "Authentication & REST APIs (JWT)",
      "DevOps Basics: Docker, CI/CD pipelines"
    ],
    projects: [
      "Full Stack Web Application",
      "Authentication System",
      "Deployment with DevOps tools"
    ]
  },
  {
    id: "frontend-mastery",
    title: "Frontend Mastery",
    duration: "1.5 Months",
    originalPrice: "₹12,000",
    offerPrice: "₹8,000",
    category: "specialisation",
    description: "Master modern frontend development by building responsive, high-performance web applications. Gain hands-on experience with industry-standard tools and best practices in UI/UX.",
    whatYouLearn: [
      "React fundamentals & component architecture",
      "Next.js with App Router",
      "Tailwind CSS for responsive design",
      "TypeScript basics",
      "UI/UX best practices"
    ],
    projects: [
      "Portfolio Website",
      "Dashboard UI",
      "Responsive Web Application"
    ]
  },
  {
    id: "backend-spring-boot",
    title: "Backend Development with Spring Boot",
    duration: "1.5 Months",
    originalPrice: "₹12,000",
    offerPrice: "₹8,000",
    category: "specialisation",
    description: "Learn to build scalable, secure backend systems with real-world REST APIs and authentication. Aligned with Aryasree's professional expertise in Spring Boot and microservices.",
    whatYouLearn: [
      "Spring Boot fundamentals",
      "REST API development & best practices",
      "JWT Authentication & security",
      "Microservices architecture basics",
      "Database integration: PostgreSQL / MySQL"
    ],
    projects: [
      "REST API System",
      "Authentication & Authorisation Service",
      "Mini Microservices Application"
    ]
  },
  {
    id: "git-version-control",
    title: "Git & Version Control",
    duration: "15 Days",
    originalPrice: null,
    offerPrice: "₹1,499",
    category: "specialisation",
    description: "A concise, practical course covering everything you need to confidently use Git in professional projects — from basic commands to branching strategies and CI/CD integration.",
    whatYouLearn: [
      "Git fundamentals: init, commit, push, pull",
      "Branching strategies (Git Flow)",
      "Merge, rebase, and conflict resolution",
      "Working with GitHub / GitLab",
      "Integrating Git with CI/CD pipelines"
    ],
    projects: [
      "Team collaboration project using Git",
      "Setting up a GitLab CI/CD pipeline"
    ]
  },
  {
    id: "one-on-one-classes",
    title: "Personalised One-on-One Classes",
    duration: "Flexible",
    originalPrice: null,
    offerPrice: "Contact us",
    category: "mentorship",
    description: "For learners who prefer a tailored experience, Zyphra offers personalised one-on-one mentorship sessions. Classes are fully customised to your current skill level, learning pace, and goals — whether you are a beginner starting from scratch or a working professional upskilling in a specific area.",
    whatsIncluded: [
      "Fully customised curriculum based on your goals",
      "Flexible scheduling at your convenience",
      "Direct mentorship from an experienced Java Spring Boot developer & project lead",
      "Code reviews, doubt-clearing, and project guidance",
      "Available for any topic: Full Stack, Backend, Frontend, Git, DevOps basics"
    ]
  }
];

const Courses = () => {
  const flagshipCourses = coursesData.filter(course => course.category === 'flagship');
  const specialisationCourses = coursesData.filter(course => course.category === 'specialisation');
  const mentorshipCourses = coursesData.filter(course => course.category === 'mentorship');

  return (
    <section id="courses" className="py-12 sm:py-16 max-w-6xl mx-auto px-4 sm:px-6">
      <div className="text-center mb-12">
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6">
          Online Learning Platform · Course Catalogue 2025 ZYPHRA
        </h1>
        <p className="text-base sm:text-lg text-muted-foreground max-w-4xl mx-auto leading-relaxed text-justify px-4">
          Zyphra is a focused, practical online learning platform offering industry-aligned courses in full stack development,
          frontend engineering, backend systems, and DevOps. All programmes are delivered fully online, built around real-world
          projects, hands-on implementation, and job-ready skills. Personalised one-on-one mentorship is also available for
          learners who prefer a customised learning experience.
        </p>
      </div>

      {/* FLAGSHIP PROGRAMMES */}
      <div className="mb-12 sm:mb-16">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-6 sm:mb-8 text-center">FLAGSHIP PROGRAMMES</h2>
        <div className="grid gap-6 sm:gap-8">
          {flagshipCourses.map((course) => (
            <div
              key={course.id}
              className="bg-card border border-border rounded-2xl p-4 sm:p-6 lg:p-8 hover:shadow-lg transition"
            >
              <div className="flex flex-col sm:flex-row justify-between items-start mb-4 gap-4">
                <h3 className="text-xl sm:text-2xl font-semibold">{course.title}</h3>
                <div className="text-left sm:text-right w-full sm:w-auto">
                  <p className="text-sm text-muted-foreground">Duration: {course.duration}</p>
                  <div className="flex flex-col sm:items-end gap-1 mt-1">
                    {course.originalPrice && (
                      <span className="text-base sm:text-lg line-through text-muted-foreground">{course.originalPrice}</span>
                    )}
                    <span className="text-xl sm:text-2xl font-bold text-primary">{course.offerPrice}</span>
                  </div>
                </div>
              </div>

              <p className="text-muted-foreground mb-6 leading-relaxed text-justify">{course.description}</p>

              <div className="grid sm:grid-cols-2 gap-4 sm:gap-6 mb-6">
                <div>
                  <h4 className="font-semibold mb-2 text-sm sm:text-base">What You'll Learn:</h4>
                  <ul className="space-y-1">
                    {course.whatYouLearn?.map((item, i) => (
                      <li key={i} className="text-xs sm:text-sm text-muted-foreground">• {item}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold mb-2 text-sm sm:text-base">Projects:</h4>
                  <ul className="space-y-1">
                    {course.projects?.map((project, i) => (
                      <li key={i} className="text-xs sm:text-sm text-muted-foreground">• {project}</li>
                    ))}
                  </ul>
                </div>
              </div>

              <Link
                href={`/courses/${course.id}`}
                className="inline-block bg-primary text-primary-foreground px-4 sm:px-6 py-2 sm:py-3 rounded-lg hover:opacity-90 transition font-medium text-sm sm:text-base w-full sm:w-auto text-center"
              >
                View Details & Enroll
              </Link>
            </div>
          ))}
        </div>
      </div>

      {/* SPECIALISATION COURSES */}
      <div className="mb-12 sm:mb-16">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-6 sm:mb-8 text-center">SPECIALISATION COURSES</h2>
        <div className="grid gap-6 sm:gap-8">
          {specialisationCourses.map((course) => (
            <div
              key={course.id}
              className="bg-card border border-border rounded-2xl p-4 sm:p-6 hover:shadow-lg transition"
            >
              <h3 className="text-lg sm:text-xl font-semibold mb-2">{course.title}</h3>
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-2">
                <p className="text-sm text-muted-foreground">Duration: {course.duration}</p>
                <div className="flex items-center gap-2 w-full sm:w-auto justify-between sm:justify-end">
                  {course.originalPrice && (
                    <span className="text-sm sm:text-base line-through text-muted-foreground">{course.originalPrice}</span>
                  )}
                  <span className="text-lg sm:text-lg font-bold text-primary">{course.offerPrice}</span>
                </div>
              </div>

              <p className="text-sm text-muted-foreground mb-4 leading-relaxed text-justify">{course.description}</p>

              <div className="mb-4">
                <h4 className="font-semibold mb-2 text-sm">What You'll Learn:</h4>
                <ul className="space-y-1">
                  {course.whatYouLearn?.map((item, i) => (
                    <li key={i} className="text-xs text-muted-foreground">• {item}</li>
                  ))}
                </ul>
              </div>

              <div className="mb-6">
                <h4 className="font-semibold mb-2 text-sm">Projects:</h4>
                <ul className="space-y-1">
                  {course.projects?.map((project, i) => (
                    <li key={i} className="text-xs text-muted-foreground">• {project}</li>
                  ))}
                </ul>
              </div>

              <Link
                href={`/courses/${course.id}`}
                className="w-full bg-primary text-primary-foreground py-2 rounded-lg hover:opacity-90 transition text-center block text-sm sm:text-base"
              >
                View Details & Enroll
              </Link>
            </div>
          ))}
        </div>
      </div>

      {/* PERSONALISED ONE-ON-ONE CLASSES */}
      <div className="mb-12 sm:mb-16">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-6 sm:mb-8 text-center">PERSONALISED ONE-ON-ONE CLASSES</h2>
        <div className="grid gap-6 sm:gap-8">
          {mentorshipCourses.map((course) => (
            <div
              key={course.id}
              className="bg-card border border-border rounded-2xl p-4 sm:p-6 lg:p-8 hover:shadow-lg transition"
            >
              <div className="flex flex-col sm:flex-row justify-between items-start mb-4 gap-4">
                <div className="w-full sm:w-auto">
                  <h3 className="text-xl sm:text-2xl font-semibold mb-2">{course.title}</h3>
                  <p className="text-sm text-muted-foreground">Duration: {course.duration}</p>
                </div>
                <span className="text-xl sm:text-2xl font-bold text-primary">{course.offerPrice}</span>
              </div>

              <p className="text-muted-foreground mb-6 leading-relaxed text-justify">{course.description}</p>

              <div className="mb-6">
                <h4 className="font-semibold mb-2">What's included:</h4>
                <ul className="space-y-1">
                  {course.whatsIncluded?.map((item, i) => (
                    <li key={i} className="text-sm text-muted-foreground">• {item}</li>
                  ))}
                </ul>
              </div>

              <Link
                href={`/courses/${course.id}`}
                className="inline-block bg-primary text-primary-foreground px-4 sm:px-6 py-2 sm:py-3 rounded-lg hover:opacity-90 transition font-medium text-sm sm:text-base w-full sm:w-auto text-center"
              >
                View Details & Enroll
              </Link>
            </div>
          ))}
        </div>
      </div>

      {/* COURSE SUMMARY */}
      <div className="bg-card border border-border rounded-2xl p-4 sm:p-6 lg:p-8">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-6 text-center">COURSE SUMMARY</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-xs sm:text-sm">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left py-2 px-1 sm:px-2">Course</th>
                <th className="text-left py-2 px-1 sm:px-2">Duration</th>
                <th className="text-left py-2 px-1 sm:px-2">Original Price</th>
                <th className="text-left py-2 px-1 sm:px-2">Offer Price</th>
              </tr>
            </thead>
            <tbody>
              {coursesData.map((course) => (
                <tr key={course.id} className="border-b border-border/50">
                  <td className="py-2 sm:py-3 px-1 sm:px-2 font-medium text-xs sm:text-sm">{course.title}</td>
                  <td className="py-2 sm:py-3 px-1 sm:px-2 text-xs sm:text-sm">{course.duration}</td>
                  <td className="py-2 sm:py-3 px-1 sm:px-2 text-xs sm:text-sm">{course.originalPrice || "—"}</td>
                  <td className="py-2 sm:py-3 px-1 sm:px-2 font-bold text-primary text-xs sm:text-sm">{course.offerPrice}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="text-xs sm:text-sm text-muted-foreground mt-4 text-center leading-relaxed text-justify">
          Zyphra Online Learning Platform · All courses include hands-on projects and practical learning support.
          For enrolment and one-on-one class enquiries, please reach out through our official channels.
        </p>
      </div>
    </section>
  );
};

export default Courses;