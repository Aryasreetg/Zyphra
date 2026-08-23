import React from "react";
import Reveal from "./Reveal";

const milestones = [
  {
    icon: "🎓",
    stat: "2",
    label: "Workshop Graduates",
    detail:
      "Completed the live 3-day workshop in June, walking away with a deployed mini-project and a certificate.",
  },
  {
    icon: "🧪",
    stat: "2",
    label: "Software Testing Mini-Course",
    detail:
      "Finished the Software Testing Fundamentals mini-course, building real test plans and bug reports.",
  },
  {
    icon: "💼",
    stat: "1",
    label: "Frontend Developer — Placed",
    detail:
      "A Frontend Mastery graduate is now placed in a frontend developer-Intern role.",
  },
  {
    icon: "💻",
    stat: "1",
    label: "AI-ML",
    detail: "A workshop candidate has enrolled in the Python & AI/ML Foundation batch to keep growing"
  }
];

const Achievements = () => {
  return (
    <section
      id="achievements"
      className="py-12 sm:py-16 md:py-20"
      style={{ backgroundColor: "#F5EFE6" }}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <Reveal>
          <div className="text-center mb-10 sm:mb-12">
            <p
              className="text-xs tracking-[0.25em] uppercase font-semibold mb-3"
              style={{ color: "#8B6914" }}
            >
              ✦ Real Cohorts, Real Outcomes
            </p>
            <h2
              className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold mb-4 leading-tight"
              style={{ color: "#2D4A3E" }}
            >
              Student Success So Far
            </h2>
            <p
              className="text-base sm:text-lg max-w-2xl mx-auto leading-relaxed"
              style={{ color: "#6B5744" }}
            >
              Zyphraa is a young, hands-on cohort — here&rsquo;s a transparent look at where our
              early learners are today.
            </p>
          </div>
        </Reveal>

        {/* Milestone cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10 sm:mb-14">
          {milestones.map((m, i) => (
            <Reveal key={m.label} delay={i * 100}>
              <div
                className="hover-lift rounded-2xl p-6 sm:p-7 shadow-sm h-full flex flex-col"
                style={{ backgroundColor: "#EDE5D4", border: "1px solid #D4C5A9" }}
              >
                <div className="flex items-center gap-3 mb-4">
                  <span
                    className="text-2xl w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0"
                    style={{ backgroundColor: "#2D4A3E" }}
                  >
                    {m.icon}
                  </span>
                  <div>
                    <div className="text-2xl font-serif font-bold" style={{ color: "#2D4A3E" }}>
                      {m.stat}
                    </div>
                    <div className="text-xs tracking-wide uppercase font-semibold" style={{ color: "#8B6914" }}>
                      {m.label}
                    </div>
                  </div>
                </div>
                <p className="text-sm leading-relaxed" style={{ color: "#4A3728" }}>
                  {m.detail}
                </p>
              </div>
            </Reveal>
          ))}
        </div>

        {/* Mock interview practice callout */}
        <Reveal delay={150}>
          <div
            className="hover-lift rounded-2xl p-6 sm:p-10 shadow-sm flex flex-col lg:flex-row items-center gap-6 lg:gap-10"
            style={{ backgroundColor: "#2D4A3E" }}
          >
            <div
              className="float-slow text-4xl w-16 h-16 rounded-full flex items-center justify-center flex-shrink-0"
              style={{ backgroundColor: "#F5EFE6" }}
            >
              🎤
            </div>
            <div className="flex-1 text-center lg:text-left">
              <p className="text-xs tracking-widest uppercase font-semibold mb-2" style={{ color: "#C4A96A" }}>
                New — Now Included
              </p>
              <h3 className="text-2xl sm:text-3xl font-serif font-bold mb-3" style={{ color: "#F5EFE6" }}>
                Mock Interview Practice Sessions
              </h3>
              <p className="text-sm sm:text-base leading-relaxed max-w-2xl" style={{ color: "rgba(245,239,230,0.8)" }}>
                Every Zyphraa learner now gets access to live mock interview practice —
                technical questions, HR rounds, and honest feedback — so you walk into the
                real thing already confident, not just qualified.
              </p>
            </div>
            <a
              href="mailto:aryasree.zyphraa@gmail.com"
              className="flex-shrink-0 px-7 py-3.5 rounded-full font-semibold text-sm tracking-wide transition-opacity hover:opacity-85 shadow-lg"
              style={{ backgroundColor: "#F5EFE6", color: "#2D4A3E" }}
            >
              Book a Mock Interview ✦
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
};

export default Achievements;
