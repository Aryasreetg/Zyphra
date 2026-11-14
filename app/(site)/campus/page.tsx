import React from "react";
import fs from "node:fs";
import path from "node:path";
import Image from "next/image";
import Reveal from "@/components/Reveal";
import CampusProposalForm from "@/components/CampusProposalForm";
import { C } from "@/lib/theme";
import collabImg from "@/public/images/campus-collab.jpg";
import studentsImg from "@/public/images/campus-students.jpg";
import lectureImg from "@/public/images/campus-lecture.jpg";

export const metadata = {
  title: "Campus Workshops for Colleges | Zyphraa",
  description:
    "Industry-ready, mentor-led tech workshops for colleges and universities. Request a customised campus workshop proposal from Zyphraa.",
};

const PROPOSAL = "#proposal";
const hasFounderPhoto = fs.existsSync(path.join(process.cwd(), "public", "images", "founder.jpg"));

const WORKSHOPS = [
  { title: "Website Development", line: "Students build and deploy their first live website.", format: "1–3 days" },
  { title: "Full Stack Development", line: "A complete app — frontend, backend and authentication.", format: "3–5 days" },
  { title: "Git & Version Control", line: "The collaboration workflow every developer uses daily.", format: "1–2 days" },
  { title: "DevOps Fundamentals", line: "Docker, CI/CD pipelines and real cloud deployment.", format: "2–3 days" },
  { title: "Software Testing & QA", line: "Test cases, bug reports and quality-first thinking.", format: "1 day" },
  { title: "Career Guidance", line: "Resumes, LinkedIn, interview prep and a 6-month roadmap.", format: "1–2 days" },
];

const REASONS = [
  { title: "Industry experience", text: "Delivered by a working Senior Software Developer and Team Lead, not a generic trainer." },
  { title: "Live & mentor-led", text: "Interactive sessions with real-time guidance. No recorded videos, no slides read aloud." },
  { title: "Hands-on projects", text: "Every student writes real code and leaves with a working, deployable project." },
  { title: "Customised curriculum", text: "Content tailored to your students' year, stream and placement goals." },
  { title: "Flexible scheduling", text: "Weekdays, weekends or intensive bootcamp formats around your academic calendar." },
  { title: "Student certificates", text: "A certificate of completion for every participant — ready for resumes and LinkedIn." },
];

const PROGRAMS = [
  {
    name: "Single-day workshop",
    text: "A focused, high-energy session on one topic. Ideal before placement season or as a department event.",
    from: "From ₹199",
    unit: "per student",
  },
  {
    name: "Multi-day bootcamp",
    text: "Two to five days combining several tracks into one intensive, project-driven programme.",
    from: "From ₹299",
    unit: "per student",
  },
  {
    name: "Custom institutional training",
    text: "A programme designed around your syllabus, batch sizes and outcomes — on campus or online.",
    from: "Tailored",
    unit: "proposal on request",
  },
];

function Label({ num, children, light = false }: { num: string; children: React.ReactNode; light?: boolean }) {
  return (
    <p className="label mb-6" style={light ? { color: C.bronzeLight } : undefined}>
      <span className="label-num">{num}</span> {children}
    </p>
  );
}

export default function CampusPage() {
  return (
    <main style={{ backgroundColor: C.cream, color: C.brown }}>
      {/* ── 1. Hero ─────────────────────────────────────────────────── */}
      <section className="grain relative">
        <div className="wrap pt-12 lg:pt-16 pb-16 lg:pb-24 grid lg:grid-cols-12 gap-12 lg:gap-10 items-center">
          <div className="lg:col-span-6">
            <p className="hero-in hero-in-1 label mb-8">For colleges &amp; universities</p>
            <h1 className="hero-in hero-in-2 display text-[2.9rem] sm:text-[4rem] lg:text-[4.5rem] mb-7" style={{ color: C.primary }}>
              Bring <em style={{ color: C.bronze }}>industry-ready</em> tech training to your campus.
            </h1>
            <p className="hero-in hero-in-3 lede max-w-lg mb-10">
              Live, project-based workshops that turn students into builders — led by a working software developer,
              tailored to your department and placement goals.
            </p>
            <div className="hero-in hero-in-4 flex flex-col sm:flex-row sm:items-center gap-5">
              <a href={PROPOSAL} className="btn-z btn-solid text-[15px] px-7 py-4">
                Request a campus workshop proposal <span className="arr" aria-hidden>→</span>
              </a>
              <a href="#workshops" className="ulink on text-[15px] self-start sm:self-auto" style={{ color: C.primary }}>
                See workshop tracks
              </a>
            </div>
          </div>

          <div className="lg:col-span-6 hero-in hero-in-3">
            <div className="frame mr-4">
              <div className="relative aspect-[3/2] overflow-hidden" style={{ backgroundColor: C.parchment }}>
                <Image
                  src={collabImg}
                  alt="College students gathered around a laptop, working on a project together"
                  fill
                  priority
                  placeholder="blur"
                  sizes="(min-width: 1024px) 50vw, 100vw"
                  className="photo object-cover"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Proof strip */}
        <div className="wrap pb-16">
          <dl className="grid grid-cols-2 lg:grid-cols-4 border-t rule">
            {[
              { k: "6", v: "Workshop tracks" },
              { k: "1–5", v: "Day formats" },
              { k: "100%", v: "Hands-on & live" },
              { k: "Every", v: "Student certified" },
            ].map((s, i) => (
              <div key={s.v} className={`pt-6 pr-4 ${i % 2 ? "pl-6 border-l rule" : ""} ${i === 2 ? "lg:pl-6 lg:border-l" : ""} ${i >= 2 ? "border-t lg:border-t-0 rule pb-2 lg:pb-0" : "pb-6 lg:pb-0"}`}>
                <dt className="display text-[2.4rem] leading-none mb-2" style={{ color: C.primary }}>{s.k}</dt>
                <dd className="text-[13px] tracking-wide mb-0" style={{ color: C.brownMid }}>{s.v}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* ── 2. Workshop highlights ──────────────────────────────────── */}
      <section id="workshops" className="scroll-mt-24" style={{ backgroundColor: C.parchment }}>
        <div className="wrap py-20 lg:py-28">
          <div className="grid lg:grid-cols-12 gap-8 mb-12 items-end">
            <Reveal className="lg:col-span-7">
              <Label num="01">Workshop highlights</Label>
              <h2 className="display text-[2.4rem] sm:text-[3.2rem]" style={{ color: C.primary }}>
                Six tracks your students <em style={{ color: C.bronze }}>actually use</em>.
              </h2>
            </Reveal>
            <Reveal delay={100} className="lg:col-span-4 lg:col-start-9">
              <p className="text-[15px] leading-relaxed mb-0" style={{ color: C.brownMid }}>
                Run one track or combine several. The full catalogue and detailed syllabus come with your proposal.
              </p>
            </Reveal>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 border-l border-t rule">
            {WORKSHOPS.map((w, i) => (
              <Reveal key={w.title} delay={(i % 3) * 80} className="border-r border-b rule">
                <a
                  href={PROPOSAL}
                  aria-label={`${w.title} — request the full syllabus`}
                  className="group h-full p-7 sm:p-8 flex flex-col transition-colors duration-300 hover:bg-[#F8F3EA]"
                >
                  <span className="serif serif-italic text-[15px] mb-10" style={{ color: C.bronze }}>
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="display text-[1.75rem] sm:text-[1.9rem] mb-3" style={{ color: C.primary }}>{w.title}</h3>
                  <p className="text-[15px] leading-relaxed mb-8" style={{ color: C.brown }}>{w.line}</p>
                  <p className="mt-auto pt-4 border-t rule flex items-center justify-between text-[12.5px] mb-0" style={{ color: C.brownMid }}>
                    <span>{w.format}</span>
                    <span className="flex items-center gap-2 font-semibold" style={{ color: C.primary }}>
                      <span className="opacity-0 -translate-x-1 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0">Syllabus</span>
                      <span aria-hidden className="transition-transform duration-300 group-hover:translate-x-1">→</span>
                    </span>
                  </p>
                </a>
              </Reveal>
            ))}
          </div>

          <Reveal>
            <div className="mt-10 flex flex-col sm:flex-row sm:items-center justify-between gap-5">
              <p className="serif serif-italic text-[18px] mb-0" style={{ color: C.primary }}>
                Want the full catalogue and syllabus for each track?
              </p>
              <a href={PROPOSAL} className="btn-z btn-line self-start">
                Request the catalogue <span className="arr" aria-hidden>→</span>
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── 3. Why partner ──────────────────────────────────────────── */}
      <section style={{ backgroundColor: C.primary, color: C.cream }}>
        <div className="grid lg:grid-cols-12">
          <Reveal className="lg:col-span-5 relative min-h-[300px] lg:min-h-full overflow-hidden">
            <div className="settle absolute inset-0">
              <Image src={studentsImg} alt="College students working in a classroom" fill placeholder="blur" sizes="(min-width: 1024px) 42vw, 100vw" className="photo object-cover object-[60%_50%]" />
            </div>
          </Reveal>
          <div className="lg:col-span-7 px-5 sm:px-12 lg:px-16 xl:px-20 py-20 lg:py-24">
            <Reveal>
              <Label num="02" light>Why partner with Zyphraa</Label>
              <h2 className="display text-[2.4rem] sm:text-[3.2rem] mb-12" style={{ color: C.cream }}>
                Training built for <em style={{ color: C.bronzeLight }}>placement season</em>.
              </h2>
            </Reveal>
            <div className="grid sm:grid-cols-2 gap-x-10 border-t rule-light">
              {REASONS.map((r, i) => (
                <Reveal key={r.title} delay={(i % 2) * 80}>
                  <div className="py-6 border-b rule-light h-full">
                    <h3 className="display text-[1.45rem] mb-2" style={{ color: C.cream }}>{r.title}</h3>
                    <p className="text-[14.5px] leading-relaxed mb-0" style={{ color: "rgba(248,243,234,0.72)" }}>{r.text}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── 4. Flexible programs ────────────────────────────────────── */}
      <section>
        <div className="wrap py-20 lg:py-28">
          <div className="grid lg:grid-cols-12 gap-10 mb-14 items-center">
            <Reveal className="lg:col-span-6">
              <Label num="03">Flexible campus programs</Label>
              <h2 className="display text-[2.4rem] sm:text-[3.2rem]" style={{ color: C.primary }}>
                A format for every <em style={{ color: C.bronze }}>calendar</em>.
              </h2>
            </Reveal>
            <Reveal delay={100} className="hidden lg:block lg:col-span-5 lg:col-start-8">
              <div className="relative aspect-[3/2] overflow-hidden settle">
                <Image src={lectureImg} alt="A lecturer teaching students in a lecture hall" fill placeholder="blur" sizes="40vw" className="photo object-cover object-[15%_50%]" />
              </div>
            </Reveal>
          </div>

          <div className="grid md:grid-cols-3 border-t-2" style={{ borderColor: C.primary }}>
            {PROGRAMS.map((p, i) => (
              <Reveal key={p.name} delay={i * 90}>
                <div className={`h-full pt-8 pb-10 md:pr-8 border-b md:border-b-0 rule ${i > 0 ? "md:pl-8 md:border-l" : ""}`}>
                  <h3 className="display text-[1.8rem] mb-4" style={{ color: C.primary }}>{p.name}</h3>
                  <p className="text-[15px] leading-relaxed mb-8" style={{ color: C.brown }}>{p.text}</p>
                  <p className="mb-0">
                    <span className="serif text-[1.6rem]" style={{ color: C.primary }}>{p.from}</span>
                    <span className="block text-[12.5px] mt-1" style={{ color: C.brownMid }}>{p.unit}</span>
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
          <p className="text-[13px] mt-8 mb-0" style={{ color: C.brownMid }}>
            Indicative starting prices. Group discounts apply for larger batches — your proposal includes exact pricing
            for your student count.
          </p>
        </div>
      </section>

      {/* ── 5. Meet the mentor ──────────────────────────────────────── */}
      <section style={{ backgroundColor: C.parchment }}>
        <div className="wrap py-20 lg:py-24 grid md:grid-cols-12 gap-10 lg:gap-16 items-center">
          <Reveal className="md:col-span-4">
            <div className="relative aspect-[4/5] max-w-xs overflow-hidden" style={{ backgroundColor: C.primary }}>
              {hasFounderPhoto ? (
                <Image src="/images/founder.jpg" alt="Aryasree TG, founder of Zyphraa" fill sizes="(min-width: 768px) 30vw, 100vw" className="photo object-cover" />
              ) : (
                <div className="absolute inset-0 flex flex-col justify-between p-7">
                  <span className="text-[11px] tracking-[0.2em] uppercase" style={{ color: C.bronzeLight }}>Lead mentor</span>
                  <span className="display serif-italic text-[8rem] leading-none -mb-4" style={{ color: "rgba(248,243,234,0.92)" }}>A.</span>
                  <span className="block h-px w-16" style={{ backgroundColor: C.bronzeLight }} />
                </div>
              )}
            </div>
          </Reveal>
          <Reveal delay={100} className="md:col-span-8">
            <Label num="04">Meet the mentor</Label>
            <h2 className="display text-[2.4rem] sm:text-[3rem] mb-6" style={{ color: C.primary }}>Aryasree TG</h2>
            <p className="lede max-w-2xl mb-8">
              Senior Software Developer and Team Lead with 3+ years building scalable backends, full-stack applications
              and microservices, who has also served as a part-time lecturer and knows exactly where students get stuck. She
              founded Zyphraa to move students from learning code to building real things.
            </p>
            <dl className="flex flex-wrap gap-x-10 gap-y-4 border-t rule pt-6 mb-0">
              {[
                { k: "Industry", v: "Senior Software Developer & Team Lead" },
                { k: "Teaching", v: "Part-time lecturer" },
                { k: "Stack", v: "Spring Boot · Next.js · Django · DevOps · ML" },
              ].map((c) => (
                <div key={c.k}>
                  <dt className="text-[11px] tracking-[0.16em] uppercase font-semibold mb-1" style={{ color: C.bronze }}>{c.k}</dt>
                  <dd className="serif text-[1.1rem] mb-0" style={{ color: C.primary }}>{c.v}</dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>
      </section>

      {/* ── 6. Enquiry ──────────────────────────────────────────────── */}
      <section id="proposal" className="scroll-mt-24">
        <div className="wrap py-20 lg:py-28 grid lg:grid-cols-12 gap-12 lg:gap-16">
          <Reveal className="lg:col-span-5">
            <Label num="05">Request a proposal</Label>
            <h2 className="display text-[2.5rem] sm:text-[3.3rem] mb-6" style={{ color: C.primary }}>
              Let&rsquo;s plan a programme for <em style={{ color: C.bronze }}>your students</em>.
            </h2>
            <p className="lede mb-10">
              Tell us about your institution and batch size. We&rsquo;ll send a customised proposal — usually within
              24 hours.
            </p>
            <p className="text-[11px] tracking-[0.16em] uppercase font-semibold mb-3" style={{ color: C.bronze }}>Your proposal includes</p>
            <ul className="border-t rule mb-10">
              {[
                "The complete workshop catalogue",
                "Detailed day-by-day syllabus",
                "Institutional pricing for your student count",
                "A suggested schedule around your calendar",
              ].map((t) => (
                <li key={t} className="flex gap-3 py-3 border-b rule text-[15.5px] mb-0" style={{ color: C.brown }}>
                  <span aria-hidden style={{ color: C.bronze }}>—</span>
                  {t}
                </li>
              ))}
            </ul>
            <p className="text-[14px] mb-0" style={{ color: C.brownMid }}>
              Prefer email?{" "}
              <a href="mailto:aryasree.zyphraa@gmail.com" className="ulink on" style={{ color: C.primary }}>
                aryasree.zyphraa@gmail.com
              </a>
            </p>
          </Reveal>

          <Reveal delay={120} className="lg:col-span-7">
            <div className="p-6 sm:p-10 lg:p-12 shadow-[0_24px_60px_-30px_rgba(18,28,44,0.35)]" style={{ backgroundColor: "#FCF8F1", borderTop: `3px solid ${C.primary}` }}>
              <p className="display text-[1.8rem] mb-1" style={{ color: C.primary }}>Campus workshop enquiry</p>
              <p className="text-[14px] mb-8" style={{ color: C.brownMid }}>For placement coordinators, HODs and training heads.</p>
              <CampusProposalForm />
            </div>
          </Reveal>
        </div>
      </section>
    </main>
  );
}
