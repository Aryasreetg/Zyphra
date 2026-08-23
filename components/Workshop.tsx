import React from "react";
import Reveal from "./Reveal";

const workshopDays = [
  {
    day: 1,
    title: "Full Stack Development Basics",
    description: "Explore how frontend and backend work together to build real applications.",
    points: [
      "Frontend & backend overview and how they communicate",
      "Build a small working feature from scratch with live guidance",
      "Live API integration demonstration",
    ],
  },
  {
    day: 2,
    title: "Introduction to Manual Testing",
    description: "Learn how professional developers ensure software quality before shipping.",
    points: [
      "What is software testing and why it matters",
      "Real-world examples and structured test case writing",
      "Understanding software flow and professional bug reporting",
    ],
  },
  {
    day: 3,
    title: "DevOps & Deployment",
    description: "Take your mini-project live and understand how real apps go to production.",
    points: [
      "Introduction to DevOps principles and culture",
      "Deploy your mini-project to the cloud",
      "How real production applications are taken live",
    ],
  },
];

const whoCanJoin = ["Students", "Freshers", "Anyone Curious About IT", "Beginners & Career Switchers"];

const Workshop = () => {
  return (
    <section
      id="workshop"
      className="py-12 sm:py-16 md:py-20"
      style={{ backgroundColor: "#F5EFE6" }}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6">

        {/* Header */}
        <Reveal>
        <div className="text-center mb-10 sm:mb-12">
          <p
            className="text-xs tracking-[0.25em] uppercase font-semibold mb-3"
            style={{ color: "#8B6914" }}
          >
            ✦ Happening at the End of May!
          </p>
          <h2
            className="text-4xl sm:text-5xl md:text-6xl font-serif font-bold mb-4 leading-tight"
            style={{ color: "#2D4A3E" }}
          >
            3-Day Live Workshop
          </h2>
          <p className="text-base sm:text-lg max-w-2xl mx-auto leading-relaxed" style={{ color: "#6B5744" }}>
            A hands-on workshop to kickstart your IT journey. Discover which specialisation suits
            you best before enrolling in a full programme.
          </p>

          {/* Stats */}
          <div className="flex flex-wrap justify-center gap-8 mt-10">
            {[
              { value: "3", label: "Days" },
              { value: "6", label: "Hours" },
              { value: "20", label: "Students Max" },
              { value: "100%", label: "Online" },
            ].map(({ value, label }) => (
              <div key={label} className="text-center">
                <div className="text-3xl sm:text-4xl font-serif font-bold" style={{ color: "#2D4A3E" }}>
                  {value}
                </div>
                <div className="text-xs mt-1 tracking-widest uppercase" style={{ color: "#8B6914" }}>
                  {label}
                </div>
              </div>
            ))}
          </div>
        </div>
        </Reveal>

        {/* Main Grid */}
        <div className="grid lg:grid-cols-2 gap-8 sm:gap-10 mb-10 sm:mb-14">

          {/* Left — Schedule */}
          <Reveal>
          <div
            className="hover-lift rounded-2xl p-6 sm:p-8 shadow-sm h-full"
            style={{ backgroundColor: "#EDE5D4", border: "1px solid #D4C5A9" }}
          >
            <h3 className="text-xl font-serif font-bold mb-6" style={{ color: "#2D4A3E" }}>
              What You'll Learn
            </h3>
            <div className="space-y-7">
              {workshopDays.map(({ day, title, description, points }) => (
                <div key={day} className="flex gap-4">
                  <div
                    className="flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center font-serif font-bold text-base"
                    style={{ backgroundColor: "#2D4A3E", color: "#F5EFE6" }}
                  >
                    {day}
                  </div>
                  <div>
                    <p className="text-xs tracking-widest uppercase font-semibold mb-1" style={{ color: "#8B6914" }}>
                      Day {day}
                    </p>
                    <h4 className="font-semibold text-base mb-1" style={{ color: "#2D4A3E" }}>
                      {title}
                    </h4>
                    <p className="text-sm mb-2" style={{ color: "#6B5744" }}>{description}</p>
                    <ul className="space-y-1">
                      {points.map((pt) => (
                        <li key={pt} className="flex items-start gap-2 text-xs" style={{ color: "#4A3728" }}>
                          <span className="mt-1 w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ backgroundColor: "#8B6914" }} />
                          {pt}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>
          </Reveal>

          {/* Right — Price & Details */}
          <div className="space-y-6">

            {/* Price Card */}
            <Reveal delay={100}>
            <div
              className="hover-lift rounded-2xl p-6 sm:p-8 text-center shadow-sm"
              style={{ backgroundColor: "#2D4A3E", color: "#F5EFE6" }}
            >
              <p className="text-xs tracking-widest uppercase mb-2" style={{ color: "#C4A96A" }}>
                Invest in Your Future ✦
              </p>
              <div className="text-5xl sm:text-6xl font-serif font-bold mb-1">₹999</div>
              <p className="text-sm opacity-75 mb-4">One-time · Limited seats only</p>
              <p
                className="text-sm italic font-medium"
                style={{ color: "#C4A96A" }}
              >
                Don't miss out!
              </p>
            </div>
            </Reveal>

            {/* What you get */}
            <Reveal delay={180}>
            <div
              className="hover-lift rounded-2xl p-6 sm:p-8 shadow-sm"
              style={{ backgroundColor: "#EDE5D4", border: "1px solid #D4C5A9" }}
            >
              <h3 className="font-serif font-bold text-lg mb-4" style={{ color: "#2D4A3E" }}>
                What You'll Get
              </h3>
              <ul className="space-y-3">
                {[
                  "Live instructor-led online sessions",
                  "Hands-on mini-project built from scratch",
                  "Cloud deployment on Day 3",
                  "Q&A and doubt-clearing in real-time",
                  "Downloadable resources & code samples",
                  "Access to mock interview practice after graduating",
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm" style={{ color: "#4A3728" }}>
                    <span
                      className="flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold"
                      style={{ backgroundColor: "#2D4A3E", color: "#F5EFE6" }}
                    >
                      {i + 1}
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            </Reveal>

            {/* Important Notes */}
            <Reveal delay={260}>
            <div
              className="rounded-2xl p-5 text-sm"
              style={{ backgroundColor: "#FDF6E3", border: "1px solid #E8D5A3", color: "#7A5C2E" }}
            >
              <p className="font-semibold mb-2">📌 Important Notes</p>
              <ul className="space-y-1 text-xs leading-relaxed">
                <li>• Live participation required — no recordings available</li>
                <li>• Bring your own laptop with internet connection</li>
                <li>• No prior experience needed — just curiosity!</li>
                <li>• Sessions conducted via Zoom</li>
              </ul>
            </div>
            </Reveal>
          </div>
        </div>

        {/* Who Can Join */}
        <Reveal>
        <div
          className="rounded-2xl p-6 sm:p-8 mb-8 sm:mb-10 text-center"
          style={{ backgroundColor: "#EDE5D4", border: "1px solid #D4C5A9" }}
        >
          <h3 className="font-serif font-bold text-xl mb-6" style={{ color: "#2D4A3E" }}>
            Who Can Join?
          </h3>
          <div className="flex flex-wrap justify-center gap-4 mb-4">
            {whoCanJoin.map((who) => (
              <div
                key={who}
                className="px-5 py-2 rounded-full text-sm font-medium"
                style={{ backgroundColor: "#F5EFE6", border: "1px solid #D4C5A9", color: "#4A3728" }}
              >
                {who}
              </div>
            ))}
          </div>
          <p className="text-xs italic" style={{ color: "#8B6914" }}>
            ♡ No prior experience needed. Just curiosity & the will to learn!
          </p>
        </div>
        </Reveal>

        {/* CTA Banner */}
        <Reveal>
        <div
          className="rounded-2xl p-8 sm:p-12 text-center"
          style={{ backgroundColor: "#2D4A3E" }}
        >
          <h3 className="text-2xl sm:text-3xl font-serif font-bold mb-3" style={{ color: "#F5EFE6" }}>
            Ready to Start Your Tech Journey?
          </h3>
          <p className="text-sm sm:text-base mb-8 max-w-xl mx-auto leading-relaxed" style={{ color: "#C4A96A" }}>
            Secure your spot today and take the first step toward your dream career. ♡
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <a
              href="https://forms.gle/WBvxgVHSrCuZspqVA"
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-4 rounded-full font-bold text-sm tracking-wide transition-all hover:opacity-85 hover:-translate-y-0.5 shadow-lg"
              style={{ backgroundColor: "#F5EFE6", color: "#2D4A3E" }}
            >
              Register Now — ₹999 ✦
            </a>
            <p className="text-xs" style={{ color: "#C4A96A" }}>
              Limited to 20 students · First come, first served
            </p>
          </div>
        </div>
        </Reveal>

      </div>
    </section>
  );
};

export default Workshop;
