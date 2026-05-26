import Link from "next/link";

const workshops = [
  {
    title: "Website Development Workshop",
    tagline: "Build your first real website — from zero to deployed.",
    duration: "1 to 3 Days | 3 hours/day",
    bestFor: "All streams, 1st–4th year students",
    learn: [
      "How the web works (browsers, servers, HTTP)",
      "HTML5, CSS3 with Flexbox and responsive design",
      "JavaScript DOM and interactivity",
      "Intro to React (3-day format)",
      "Cloud deployment via Vercel or Netlify",
    ],
    projects: [
      "Personal portfolio website",
      "Product landing page",
      "Interactive quiz app (3-day)",
    ],
    outcome: "Students leave with a live, publicly accessible website and a Zyphraa certificate.",
    pricingTable: [
      { duration: "1 Day", batch30: "₹399/student", batch60: "₹349/student", batch100: "—" },
      { duration: "2 Days", batch30: "₹699/student", batch60: "₹599/student", batch100: "—" },
      { duration: "3 Days", batch30: "₹1,199/student", batch60: "₹999/student", batch100: "₹799/student" },
    ],
  },
  {
    title: "Full Stack Development Workshop",
    tagline: "Build complete, deployable applications from frontend to backend.",
    duration: "3 to 5 Days | 2–3 hours/day",
    bestFor: "CS/IT students, 2nd–4th year",
    learn: [
      "React components and state",
      "REST APIs with Spring Boot or Django",
      "MySQL/MongoDB basics",
      "Frontend-to-backend API integration",
      "JWT authentication and Docker basics",
      "Cloud deployment (5-day format)",
    ],
    projects: [
      "Full stack task manager app",
      "Authentication system with login/logout",
      "Deployed live application (5-day)",
    ],
    outcome: "Portfolio-ready full stack project plus certificate.",
    pricingTable: [
      { duration: "3 Days / 2 hrs", batch30: "₹799/student", batch60: "₹699/student", batch100: "—" },
      { duration: "3 Days / 3 hrs", batch30: "₹999/student", batch60: "₹849/student", batch100: "—" },
      { duration: "5 Days / 3 hrs", batch30: "₹2,499/student", batch60: "₹1,999/student", batch100: "₹1,599/student" },
    ],
  },
  {
    title: "Career Guidance & Tech Readiness",
    tagline: "Navigate the tech job market with clarity and confidence.",
    duration: "1 to 2 Days | 2 hours/day",
    bestFor: "Final year students, any stream",
    learn: [
      "How tech hiring works end-to-end",
      "Building a standout resume and LinkedIn profile",
      "What to put on GitHub",
      "Cracking technical interviews (DSA, system design, HR)",
      "Choosing a specialisation and freelancing vs full-time",
    ],
    projects: [
      "Polished 1-page tech resume",
      "Optimised LinkedIn profile",
      "Personalised 6-month career roadmap",
    ],
    outcome: "Students leave application-ready and interview-confident.",
    pricingTable: [
      { duration: "1 Day", batch30: "₹299/student", batch60: "₹249/student", batch100: "₹299/student" },
      { duration: "2 Days", batch30: "₹499/student", batch60: "₹399/student", batch100: "₹299/student" },
    ],
  },
  {
    title: "Git & Version Control Workshop",
    tagline: "Learn the tool every professional developer uses every single day.",
    duration: "1 to 2 Days | 2 hours/day",
    bestFor: "All CS/IT students",
    learn: [
      "What version control is and why it matters",
      "Core Git commands: init, add, commit, push, pull, clone",
      "Branching with Git Flow",
      "Merge/rebase/conflict resolution",
      "Working with GitHub and GitLab",
      "CI/CD pipeline integration",
    ],
    projects: [
      "Team collaboration project using Git",
      "GitLab CI/CD pipeline setup",
    ],
    outcome: "Confident daily Git usage, active GitHub profile with real commits, and certificate.",
    pricingTable: [
      { duration: "1 Day", batch30: "₹299/student", batch60: "₹249/student", batch100: "₹299/student" },
      { duration: "2 Days", batch30: "₹499/student", batch60: "₹399/student", batch100: "₹299/student" },
    ],
  },
  {
    title: "DevOps Fundamentals Workshop",
    tagline: "Understand how software actually gets shipped in the real world.",
    duration: "2 to 3 Days | 2–3 hours/day",
    bestFor: "CS/IT students, 3rd–4th year",
    learn: [
      "What DevOps is and why it matters in 2025",
      "Linux CLI basics",
      "Docker containers and docker-compose",
      "CI/CD with GitHub Actions and GitLab CI",
      "Cloud deployment (AWS/Render/Railway)",
      "Monitoring and logging fundamentals",
    ],
    projects: [
      "Containerised application with Docker",
      "Automated CI/CD pipeline",
      "Live cloud-deployed app with custom URL",
    ],
    outcome: "Hands-on DevOps experience, deployed portfolio project, and certificate.",
    pricingTable: [
      { duration: "2 Days", batch30: "₹499/student", batch60: "₹399/student", batch100: "—" },
      { duration: "3 Days", batch30: "₹1,499/student", batch60: "₹1,199/student", batch100: "₹899/student" },
    ],
  },
  {
    title: "Software Testing & QA Basics",
    tagline: "Learn to think like a QA engineer and catch bugs before they go live.",
    duration: "1 Day | 2–3 hours",
    bestFor: "All CS/IT students",
    learn: [
      "What software testing is and why it's critical",
      "Types of testing: unit, integration, end-to-end",
      "Manual testing with test cases and bug reports",
      "Intro to Selenium and Postman",
      "Bug reporting in professional teams",
      "QA in Agile/Scrum",
    ],
    projects: [
      "Structured test case document",
      "Professional bug report with reproduction steps",
    ],
    outcome: "Foundation in QA thinking and manual testing, intro to automation tools, and certificate.",
    pricingTable: [
      { duration: "1 Day / 2 hrs", batch30: "₹299/student", batch60: "₹249/student", batch100: "₹199/student" },
      { duration: "1 Day / 3 hrs", batch30: "₹399/student", batch60: "—", batch100: "₹199/student" },
    ],
  },
];

const whyZyphraa = [
  "Industry-aligned curriculum built around what employers want in 2025",
  "Project-first approach: students build working, deployable projects",
  "Live coding sessions with real-time mentoring, not passive slides",
  "Customised campus workshop design for stream, year, and institution goals",
  "Flexible scheduling for weekdays, weekends, or bootcamp formats",
  "Certificates of completion for resumes and LinkedIn profiles",
  "Affordable tiered pricing with bulk discounts for larger batches",
  "Post-workshop student support for doubt clarification",
];

const discountTiers = [
  { range: "Up to 30 students", discount: "Standard pricing" },
  { range: "31–60 students", discount: "10–15% off" },
  { range: "61–100 students", discount: "20% off" },
  { range: "100+ students", discount: "30–40% off" },
];

const contactDetails = [
  { label: "Email", value: "aryasree.zyphraa@gmail.com", href: "mailto:aryasree.zyphraa@gmail.com" },
  { label: "LinkedIn", value: "linkedin.com/in/aryasree-tg-027461201", href: "https://linkedin.com/in/aryasree-tg-027461201" },
  { label: "Instagram", value: "instagram.com/zyphraa.arya", href: "https://instagram.com/zyphraa.arya" },
];

export const metadata = {
  title: "Zyphraa Campus Workshops | Institute & College Training",
  description: "Practical tech workshops for colleges and universities led by Zyphraa founder Aryasree TG.",
};

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="text-3xl sm:text-4xl font-serif font-bold mb-4" style={{ color: "#2D4A3E" }}>
      {children}
    </h2>
  );
}

function Badge({ text }: { text: string }) {
  return (
    <span className="inline-flex px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-[0.25em]" style={{ backgroundColor: "#EDE5D4", color: "#8B6914" }}>
      {text}
    </span>
  );
}

export default function CampusPage() {
  return (
    <main className="bg-[#F5EFE6] text-[#4A3728]">
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto grid gap-10 lg:grid-cols-[1.2fr_0.8fr] items-center">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] mb-4" style={{ color: "#8B6914" }}>
              Zyphraa Campus Workshops
            </p>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-bold leading-tight mb-6" style={{ color: "#2D4A3E" }}>
              Learn. Build. Grow.
            </h1>
            <p className="max-w-2xl text-base sm:text-lg leading-relaxed mb-8" style={{ color: "#6B5744" }}>
              Practical tech workshops designed for college and university students — built around real projects, not passive theory.
              Zyphraa brings live, mentor-led campus training that turns students into builders with interview-ready outcomes.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href="mailto:aryasree.zyphraa@gmail.com"
                className="inline-flex items-center justify-center rounded-full bg-[#2D4A3E] px-6 py-3 text-sm font-semibold text-[#F5EFE6] shadow-lg hover:opacity-90"
              >
                Book Your Campus Workshop
              </a>
              <Link
                href="/#courses"
                className="inline-flex items-center justify-center rounded-full border border-[#2D4A3E] bg-transparent px-6 py-3 text-sm font-semibold text-[#2D4A3E] hover:bg-[#E8DCC8]"
              >
                Explore Current Courses
              </Link>
            </div>
          </div>
          <div className="rounded-[32px] border border-[#D4C5A9] bg-[#EDE5D4] p-8 shadow-sm">
            <h2 className="font-serif text-2xl font-bold mb-4" style={{ color: "#2D4A3E" }}>
              Zyphraa for Institutions
            </h2>
            <p className="text-sm leading-relaxed mb-4" style={{ color: "#4A3728" }}>
              Zyphraa is a focused online learning platform offering industry-aligned workshops and training programmes for college and university students.
              Every session is live, project-driven, and delivered by a working Senior Software Developer.
            </p>
            <ul className="space-y-3">
              {[
                "Live workshops led by a Senior Software Developer",
                "Hands-on coding and deployed project outcomes",
                "Customised campus content for student year and stream",
                "Flexible single-day or multi-day bootcamp formats",
              ].map((item) => (
                <li key={item} className="flex gap-3 text-sm" style={{ color: "#4A3728" }}>
                  <span className="mt-1 h-2.5 w-2.5 rounded-full bg-[#2D4A3E]" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="py-16 px-4 sm:px-6 lg:px-8 border-t border-[#D4C5A9]">
        <div className="max-w-6xl mx-auto grid gap-10 lg:grid-cols-[0.9fr_0.95fr] items-start">
          <div>
            <SectionTitle>About the Mentor</SectionTitle>
            <p className="text-sm leading-relaxed mb-6" style={{ color: "#6B5744" }}>
              Aryasree TG is a Senior Software Developer and Team Lead at Baseel Partners LLP, with 3+ years of hands-on industry experience building scalable backend systems, full stack web applications, and microservices architectures.
              She has worked extensively with Spring Boot, Angular, Next.js, Django, React, Docker, CI/CD pipelines, and Machine Learning.
            </p>
            <p className="text-sm leading-relaxed mb-6" style={{ color: "#6B5744" }}>
              Alongside her industry career, Aryasree has served as a part-time lecturer — an experience that gave her deep insight into how students learn and where they get stuck.
              She founded Zyphraa to move students from just learning code to actually building real things and becoming job-ready.
            </p>
            <p className="text-sm leading-relaxed mb-6" style={{ color: "#6B5744" }}>
              Every workshop she leads is live, interactive, and project-driven — no slides being read aloud, no passive theory.
              Students write real code, build working projects, and leave with something they can show employers.
            </p>
          </div>
          <div className="rounded-[32px] border border-[#D4C5A9] bg-[#F5EFE6] p-8 shadow-sm">
            <div className="mb-6">
              <h3 className="text-2xl font-serif font-bold mb-2" style={{ color: "#2D4A3E" }}>
                Aryasree TG
              </h3>
              <p className="text-sm uppercase tracking-[0.3em] font-semibold" style={{ color: "#8B6914" }}>
                Senior Software Developer & Team Lead
              </p>
              <p className="text-sm text-[#6B5744] mt-3">Founder & Lead Mentor, Zyphraa</p>
            </div>
            <div className="mb-6">
              <h4 className="font-semibold mb-3" style={{ color: "#2D4A3E" }}>
                Skills & Technologies
              </h4>
              <div className="grid grid-cols-2 gap-2 text-sm text-[#4A3728]">
                {["Spring Boot", "Angular", "Next.js", "Django", "React", "Tailwind CSS", "Docker", "CI/CD", "MySQL", "MongoDB", "PostgreSQL", "JWT", "Microservices", "Machine Learning"].map((skill) => (
                  <span key={skill} className="rounded-full border border-[#D4C5A9] px-3 py-2 bg-[#EDE5D4]">{skill}</span>
                ))}
              </div>
            </div>
            <div>
              <h4 className="font-semibold mb-3" style={{ color: "#2D4A3E" }}>
                Connect
              </h4>
              <div className="space-y-2 text-sm">
                {contactDetails.map((contact) => (
                  <a key={contact.label} href={contact.href} target="_blank" rel="noopener noreferrer" className="block rounded-2xl border border-[#D4C5A9] bg-[#FFFDF7] px-4 py-3 text-[#4A3728] hover:bg-[#E8DCC8]">
                    <span className="font-semibold">{contact.label}:</span> {contact.value}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <SectionTitle>Workshops</SectionTitle>
          <div className="space-y-14">
            {workshops.map((workshop) => (
              <div key={workshop.title} className="rounded-[32px] border border-[#D4C5A9] bg-[#EDE5D4] p-8 shadow-sm">
                <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                  <div>
                    <Badge text={workshop.title} />
                    <h3 className="mt-4 text-2xl font-serif font-bold" style={{ color: "#2D4A3E" }}>
                      {workshop.tagline}
                    </h3>
                    <p className="mt-3 text-sm text-[#6B5744] leading-relaxed">
                      <span className="font-semibold">Duration:</span> {workshop.duration}
                    </p>
                    <p className="text-sm text-[#6B5744] leading-relaxed">
                      <span className="font-semibold">Best for:</span> {workshop.bestFor}
                    </p>
                  </div>
                  <div className="rounded-3xl bg-[#F5EFE6] p-6 text-sm text-[#4A3728] shadow-sm">
                    <p className="font-semibold mb-3">Outcome</p>
                    <p>{workshop.outcome}</p>
                  </div>
                </div>

                <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_0.9fr]">
                  <div>
                    <h4 className="font-semibold mb-3" style={{ color: "#2D4A3E" }}>
                      What students learn
                    </h4>
                    <ul className="grid gap-2 text-sm text-[#4A3728]">
                      {workshop.learn.map((item) => (
                        <li key={item} className="flex gap-3">
                          <span className="mt-1 h-2.5 w-2.5 rounded-full bg-[#2D4A3E]" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-3" style={{ color: "#2D4A3E" }}>
                      Projects built
                    </h4>
                    <ul className="grid gap-2 text-sm text-[#4A3728]">
                      {workshop.projects.map((item) => (
                        <li key={item} className="flex gap-3">
                          <span className="mt-1 h-2.5 w-2.5 rounded-full bg-[#2D4A3E]" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="mt-8 overflow-x-auto rounded-3xl border border-[#D4C5A9] bg-[#FFFDF7] p-4">
                  <table className="w-full text-left text-sm text-[#4A3728]">
                    <thead>
                      <tr>
                        <th className="pb-3 font-semibold">Duration</th>
                        <th className="pb-3 font-semibold">Batch (≤30)</th>
                        <th className="pb-3 font-semibold">Batch (31–60)</th>
                        <th className="pb-3 font-semibold">Batch (100+)</th>
                      </tr>
                    </thead>
                    <tbody>
                      {workshop.pricingTable.map((row) => (
                        <tr key={row.duration} className="border-t border-[#E8D5A3]">
                          <td className="py-3">{row.duration}</td>
                          <td className="py-3">{row.batch30}</td>
                          <td className="py-3">{row.batch60}</td>
                          <td className="py-3">{row.batch100}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 px-4 sm:px-6 lg:px-8 border-t border-[#D4C5A9]">
        <div className="max-w-6xl mx-auto">
          <SectionTitle>Full Campus Bootcamp — 5 Days</SectionTitle>
          <p className="text-sm leading-relaxed mb-8" style={{ color: "#6B5744" }}>
            The complete campus tech event. The 5-Day Full Campus Bootcamp combines all six workshop themes into one cohesive, intensive programme — giving students a 360° view of the modern tech industry in a single week.
          </p>
          <div className="grid gap-6 lg:grid-cols-[0.8fr_0.9fr]">
            <div className="rounded-[32px] border border-[#D4C5A9] bg-[#EDE5D4] p-8 shadow-sm">
              <div className="space-y-4 text-sm text-[#4A3728]">
                {[
                  { day: "Day 1", focus: "Website Development — HTML, CSS, JavaScript, live mini project" },
                  { day: "Day 2", focus: "Full Stack Overview — React, API integration, database basics" },
                  { day: "Day 3", focus: "Git & Version Control — Git Flow, GitHub, team collaboration lab" },
                  { day: "Day 4", focus: "DevOps & Deployment — Docker, CI/CD pipelines, cloud deployment" },
                  { day: "Day 5", focus: "Career Guidance — Resume, LinkedIn, interview prep, roadmap session" },
                ].map((item) => (
                  <div key={item.day} className="rounded-3xl bg-[#F5EFE6] p-5">
                    <p className="text-xs uppercase tracking-[0.3em] text-[#8B6914] mb-2">{item.day}</p>
                    <p className="text-sm text-[#4A3728]">{item.focus}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-[32px] border border-[#D4C5A9] bg-[#F5EFE6] p-8 shadow-sm">
              <h3 className="text-2xl font-serif font-bold mb-4" style={{ color: "#2D4A3E" }}>
                Pricing (3 hrs/day)
              </h3>
              <div className="grid gap-4 text-sm text-[#4A3728]">
                {[
                  { batch: "Up to 30", price: "₹3,499" },
                  { batch: "31–60", price: "₹2,999" },
                  { batch: "61–100", price: "₹2,499" },
                  { batch: "100+", price: "₹1,999" },
                ].map((row) => (
                  <div key={row.batch} className="rounded-3xl border border-[#D4C5A9] bg-[#FFFDF7] p-5">
                    <p className="font-semibold">{row.batch}</p>
                    <p>{row.price} / student</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <SectionTitle>Why Zyphraa</SectionTitle>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {whyZyphraa.map((point) => (
              <div key={point} className="rounded-[32px] border border-[#D4C5A9] bg-[#EDE5D4] p-6 text-sm shadow-sm">
                <p className="font-semibold mb-3 text-[#2D4A3E]">{point.split(" — ")[0]}</p>
                <p className="text-[#4A3728]">{point.split(" — ")[1] ?? ""}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 px-4 sm:px-6 lg:px-8 border-t border-[#D4C5A9]">
        <div className="max-w-6xl mx-auto grid gap-8 lg:grid-cols-[0.9fr_0.7fr] items-start">
          <div>
            <SectionTitle>Group Discount Structure</SectionTitle>
            <div className="space-y-4 text-sm text-[#4A3728]">
              {discountTiers.map((tier) => (
                <div key={tier.range} className="rounded-3xl border border-[#D4C5A9] bg-[#FFFDF7] p-5">
                  <p className="font-semibold">{tier.range}</p>
                  <p>{tier.discount}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-[32px] border border-[#D4C5A9] bg-[#EDE5D4] p-8 shadow-sm">
            <h3 className="text-2xl font-serif font-bold mb-4" style={{ color: "#2D4A3E" }}>
              Book a Workshop
            </h3>
            <p className="text-sm leading-relaxed mb-6" style={{ color: "#6B5744" }}>
              To book a workshop for your institution, share the name of your institution and department, estimated number of students, preferred workshop(s), preferred dates, and any specific topics or technologies to focus on.
            </p>
            <div className="space-y-3 text-sm">
              {contactDetails.map((contact) => (
                <a key={contact.label} href={contact.href} target="_blank" rel="noopener noreferrer" className="block rounded-2xl border border-[#D4C5A9] bg-[#FFFDF7] px-4 py-3 text-[#4A3728] hover:bg-[#E8DCC8]">
                  <span className="font-semibold">{contact.label}:</span> {contact.value}
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-[#2D4A3E] text-[#F5EFE6]">
        <div className="max-w-6xl mx-auto rounded-[32px] border border-[#4A3728] bg-[#2D4A3E]/90 p-10 text-center">
          <h2 className="text-3xl font-serif font-bold mb-4">Zyphraa · Learn. Build. Grow.</h2>
          <p className="max-w-3xl mx-auto text-sm leading-relaxed">
            All workshops include a hands-on project and a certificate of completion. Connect with Zyphraa today to bring practical tech learning to your campus.
          </p>
        </div>
      </section>
    </main>
  );
}
