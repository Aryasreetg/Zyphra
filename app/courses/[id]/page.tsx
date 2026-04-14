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
    id: "3-day-workshop",
    title: "3-Day Live Workshop",
    duration: "3 Days (2 Hours / Day)",
    originalPrice: null,
    offerPrice: "₹999",
    category: "workshop",
    description: "Kickstart your tech journey with this beginner-friendly live workshop. In just 3 days, you will get hands-on exposure to Manual Testing, Full Stack Development, and DevOps by building a real mini-project — the fastest way to discover which specialisation suits you best before enrolling in a full programme.",
    schedule: [
      {
        day: "Day 1",
        title: "Introduction to Manual Testing",
        topics: [
          "What is software testing and why it matters",
          "Real-world testing examples and test case writing",
          "Understanding software flow and bug reporting"
        ]
      },
      {
        day: "Day 2",
        title: "Full Stack Development Basics",
        topics: [
          "Frontend + Backend overview and how they connect",
          "Build a small working feature from scratch",
          "Live API integration demonstration"
        ]
      },
      {
        day: "Day 3",
        title: "DevOps & Deployment",
        topics: [
          "Introduction to DevOps principles",
          "Deploy your mini-project to the cloud",
          "How real production applications go live"
        ]
      }
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

interface CoursePageProps {
  params: Promise<{
    id: string;
  }>;
}

export async function generateStaticParams() {
  return coursesData.map((course) => ({
    id: course.id,
  }));
}

export async function generateMetadata({ params }: CoursePageProps) {
  const { id } = await params;
  const course = coursesData.find((c) => c.id === id);

  if (!course) {
    return {
      title: "Course Not Found | Zyphra",
    };
  }

  return {
    title: `${course.title} | Zyphra Online Learning Platform`,
    description: course.description,
  };
}

export default async function CoursePage({ params }: CoursePageProps) {
  const { id } = await params;
  const course = coursesData.find((c) => c.id === id);

  if (!course) {
    notFound();
  }

  return (
    <div className="min-h-screen py-16 max-w-4xl mx-auto px-6">
      {/* Breadcrumb */}
      <nav className="mb-8">
        <Link href="/" className="text-primary hover:underline">
          Home
        </Link>
        <span className="mx-2 text-muted-foreground">/</span>
        <Link href="/#courses" className="text-primary hover:underline">
          Courses
        </Link>
        <span className="mx-2 text-muted-foreground">/</span>
        <span className="text-muted-foreground">{course.title}</span>
      </nav>

      {/* Course Header */}
      <div className="bg-card border border-border rounded-2xl p-8 mb-8">
        <div className="flex flex-col md:flex-row justify-between items-start mb-6">
          <div className="flex-1">
            <h1 className="text-3xl md:text-4xl font-bold mb-2">{course.title}</h1>
            <p className="text-sm uppercase tracking-[0.2em] text-primary mb-4">Fully online programme</p>
            <p className="text-lg text-muted-foreground mb-4">Duration: {course.duration}</p>
            <p className="text-muted-foreground mb-4">{course.description}</p>
            <p className="text-sm text-muted-foreground">
              All Zyphra courses are delivered 100% online, with live interactive sessions, practical projects, and mentor support.
            </p>
          </div>
          <div className="mt-4 md:mt-0 md:ml-8">
            <div className="text-right">
              {course.originalPrice && (
                <span className="text-2xl line-through text-muted-foreground block">{course.originalPrice}</span>
              )}
              <span className="text-4xl font-bold text-primary">{course.offerPrice}</span>
            </div>
            <button className="w-full mt-4 bg-primary text-primary-foreground px-8 py-3 rounded-lg hover:opacity-90 transition font-medium">
              Enroll Now 🚀
            </button>
          </div>
        </div>
      </div>

      {/* Course Content */}
      <div className="space-y-8">
        {/* What You'll Learn */}
        {course.whatYouLearn && (
          <div className="bg-card border border-border rounded-2xl p-8">
            <h2 className="text-2xl font-bold mb-6">What You'll Learn</h2>
            <ul className="space-y-3">
              {course.whatYouLearn.map((item, i) => (
                <li key={i} className="flex items-start">
                  <span className="text-primary mr-3 mt-1">•</span>
                  <span className="text-muted-foreground">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Projects */}
        {course.projects && (
          <div className="bg-card border border-border rounded-2xl p-8">
            <h2 className="text-2xl font-bold mb-6">Projects You'll Build</h2>
            <ul className="space-y-3">
              {course.projects.map((project, i) => (
                <li key={i} className="flex items-start">
                  <span className="text-primary mr-3 mt-1">•</span>
                  <span className="text-muted-foreground">{project}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Course Format */}
        <div className="bg-card border border-border rounded-2xl p-8">
          <h2 className="text-2xl font-bold mb-6">Course Format</h2>
          <ul className="space-y-3 text-muted-foreground">
            <li className="flex items-start">
              <span className="text-primary mr-3 mt-1">•</span>
              <span>100% online delivery with live interactive sessions.</span>
            </li>
            <li className="flex items-start">
              <span className="text-primary mr-3 mt-1">•</span>
              <span>Recorded lessons and downloadable resources for self-paced review.</span>
            </li>
            <li className="flex items-start">
              <span className="text-primary mr-3 mt-1">•</span>
              <span>Hands-on real-world projects with online mentor guidance.</span>
            </li>
            <li className="flex items-start">
              <span className="text-primary mr-3 mt-1">•</span>
              <span>Weekly progress reviews, quizzes, and project feedback.</span>
            </li>
          </ul>
        </div>

        {/* Who Should Enroll */}
        <div className="bg-card border border-border rounded-2xl p-8">
          <h2 className="text-2xl font-bold mb-6">Who Should Enroll</h2>
          <ul className="space-y-3 text-muted-foreground">
            <li className="flex items-start">
              <span className="text-primary mr-3 mt-1">•</span>
              <span>Beginners who want structured online learning.</span>
            </li>
            <li className="flex items-start">
              <span className="text-primary mr-3 mt-1">•</span>
              <span>Working professionals seeking flexible online upskilling.</span>
            </li>
            <li className="flex items-start">
              <span className="text-primary mr-3 mt-1">•</span>
              <span>Students preparing for technology careers with project-based learning.</span>
            </li>
            <li className="flex items-start">
              <span className="text-primary mr-3 mt-1">•</span>
              <span>Anyone who prefers online learning with live mentorship support.</span>
            </li>
          </ul>
        </div>

        {/* Support */}
        <div className="bg-card border border-border rounded-2xl p-8">
          <h2 className="text-2xl font-bold mb-6">Learner Support</h2>
          <p className="text-muted-foreground mb-4">
            Zyphra offers online support, practical review, and mentor guidance throughout the programme.
          </p>
          <ul className="space-y-3 text-muted-foreground">
            <li className="flex items-start">
              <span className="text-primary mr-3 mt-1">•</span>
              <span>Online doubt support and code review guidance.</span>
            </li>
            <li className="flex items-start">
              <span className="text-primary mr-3 mt-1">•</span>
              <span>Guided practical project feedback from mentors.</span>
            </li>
            <li className="flex items-start">
              <span className="text-primary mr-3 mt-1">•</span>
              <span>Access to course resources and learning materials.</span>
            </li>
          </ul>
        </div>

        {/* What's Included (for mentorship) */}
        {course.whatsIncluded && (
          <div className="bg-card border border-border rounded-2xl p-8">
            <h2 className="text-2xl font-bold mb-6">What's Included</h2>
            <ul className="space-y-3">
              {course.whatsIncluded?.map((item, i) => (
                <li key={i} className="flex items-start">
                  <span className="text-primary mr-3 mt-1">•</span>
                  <span className="text-muted-foreground">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Call to Action */}
        <div className="bg-primary/5 border border-primary/20 rounded-2xl p-8 text-center">
          <h2 className="text-2xl font-bold mb-4">Ready to Start Your Learning Journey?</h2>
          <p className="text-muted-foreground mb-6">
            Join thousands of developers who have transformed their careers with Zyphra.
            All courses include hands-on projects and certification upon completion.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-primary text-primary-foreground px-8 py-3 rounded-lg hover:opacity-90 transition font-medium">
              Enroll Now 🚀
            </button>
            <Link
              href="/#courses"
              className="border border-border bg-background text-foreground px-8 py-3 rounded-lg hover:bg-accent transition font-medium"
            >
              View All Courses
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}