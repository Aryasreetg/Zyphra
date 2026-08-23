export type CourseCategory =
  | "flagship"
  | "foundation"
  | "specialisation"
  | "workshop"
  | "mentorship";

export interface WorkshopDay {
  day: string;
  title: string;
  topics: string[];
}

export interface Course {
  id: string;
  title: string;
  duration: string;
  originalPrice: string | null;
  offerPrice: string;
  category: CourseCategory;
  badge?: string;
  batchInfo?: string;
  description: string;
  whatYouLearn?: string[];
  projects?: string[];
  whatsIncluded?: string[];
  schedule?: WorkshopDay[];
}

// Single source of truth for every course shown on the homepage catalogue
// (components/courses.tsx) and the individual course detail pages
// (app/courses/[id]/page.tsx). Update prices, copy, or add new courses here only.
export const coursesData: Course[] = [
  {
    id: "full-stack-developer-program",
    title: "Full Stack Developer Program",
    duration: "3 Months",
    originalPrice: "₹45,000",
    offerPrice: "₹30,000",
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
    id: "python-ai-ml-foundation",
    title: "Python & AI/ML Foundation",
    duration: "3 Months",
    originalPrice: "₹45,000",
    offerPrice: "₹30,000",
    category: "foundation",
    badge: "First Batch Offer",
    batchInfo: "First batch limited to 30 seats",
    description:
      "A foundation programme that takes you from Python fundamentals to building and deploying real machine learning models. Designed for beginners who want a structured, project-first route into AI/ML — no prior programming experience required.",
    whatYouLearn: [
      "Python programming fundamentals & problem solving",
      "NumPy, Pandas & data handling for ML",
      "Statistics and maths essentials for machine learning",
      "Core ML algorithms with scikit-learn",
      "Introduction to neural networks & deep learning",
      "Model evaluation and basic deployment",
    ],
    projects: [
      "Exploratory data analysis project",
      "End-to-end ML prediction model",
      "Mini AI-powered application",
    ],
  },
  {
    id: "java-springboot-foundation",
    title: "Java & Spring Boot Foundation",
    duration: "3 Months",
    originalPrice: "₹45,000",
    offerPrice: "₹40,000",
    category: "foundation",
    description:
      "A complete foundation in Java and Spring Boot for learners starting from scratch — covering core language fundamentals through to building and testing production-style REST APIs.",
    whatYouLearn: [
      "Core Java & object-oriented programming",
      "Collections framework & exception handling",
      "Spring Core & dependency injection",
      "Spring Boot & REST API development",
      "Spring Data JPA & Hibernate",
      "Unit testing with JUnit & Mockito",
    ],
    projects: [
      "Console-based Java application",
      "REST API built with Spring Boot",
      "Full CRUD application with database integration",
    ],
  },
  {
    id: "frontend-mastery",
    title: "Frontend Mastery",
    duration: "1.5 Months",
    originalPrice: "₹18,000",
    offerPrice: "₹12,500",
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
    duration: "4 Weeks",
    originalPrice: "₹14,999",
    offerPrice: "₹9,999",
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
    originalPrice: "₹20,000",
    offerPrice: "₹15,000",
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
    originalPrice: "₹3,799",
    offerPrice: "₹2,499",
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
    offerPrice: "2999",
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
      "For learners who prefer a fully tailored experience, Zyphraa offers personalised one-on-one mentorship sessions. Completely customised to your skill level, pace, and goals — whether you're a complete beginner or a working professional.",
    whatsIncluded: [
      "Fully customised curriculum based on your goals",
      "Flexible scheduling — mornings, evenings, or weekends",
      "Direct mentorship from an experienced Java Spring Boot developer & project lead",
      "Code reviews, doubt-clearing, and end-to-end project guidance",
      "Available for: Full Stack, Backend, Frontend, Git, DevOps basics, and Mock Interview Practice",
    ],
  },
];

// Enrolment links keyed by course id. Falls back to the generic form below
// when a course doesn't have a dedicated Google Form.
export const courseEnrolLinks: Record<string, string> = {
  "frontend-mastery": "https://forms.gle/3eACANepzSr72HSm9",
  "software-testing": "https://forms.gle/3mn6icFrWE5HgvEy7",
  "3-day-workshop": "https://forms.gle/WBvxgVHSrCuZspqVA",
};

export const defaultEnrolLink = "https://forms.gle/AdaaT56F6GMVCEUu9";

export function getEnrolLink(course: Pick<Course, "id" | "offerPrice">) {
  if (course.offerPrice === "Contact Us") return "mailto:aryasree.zyphraa@gmail.com";
  return courseEnrolLinks[course.id] ?? defaultEnrolLink;
}
