import React from "react";

const About = () => {
  return (
    <section
      id="about"
      className="py-16 sm:py-20"
      style={{ backgroundColor: "#EDE5D4" }}
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        {/* Section Label */}
        <p
          className="text-center text-xs tracking-[0.25em] uppercase font-semibold mb-3"
          style={{ color: "#8B6914" }}
        >
          ✦ A Message from the Mentor
        </p>

        <h2
          className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold mb-10 text-center leading-tight"
          style={{ color: "#2D4A3E" }}
        >
          About Me
        </h2>

        {/* Card */}
        <div
          className="rounded-2xl p-6 sm:p-10 shadow-sm"
          style={{ backgroundColor: "#F5EFE6", border: "1px solid #D4C5A9" }}
        >
          {/* Name badge */}
          <div className="flex items-center gap-3 mb-6">
            <div
              className="w-12 h-12 rounded-full flex items-center justify-center text-lg font-serif font-bold"
              style={{ backgroundColor: "#2D4A3E", color: "#F5EFE6" }}
            >
              A
            </div>
            <div>
              <p
                className="font-semibold text-base"
                style={{ color: "#2D4A3E" }}
              >
                Aryasree TG
              </p>
              <p className="text-xs" style={{ color: "#8B6914" }}>
                Senior Software Developer · Team Lead · Mentor
              </p>
            </div>
          </div>

          <div className="space-y-5">
            <p
              className="text-base sm:text-lg leading-relaxed text-justify"
              style={{ color: "#4A3728" }}
            >
              Hi, I'm Arya — a developer and mentor behind{" "}
              <span className="font-semibold" style={{ color: "#2D4A3E" }}>
                Zyphraa
              </span>
              . I have 3+ years of hands-on experience working with modern
              technologies including Spring Boot, Angular, Next.js, Django, and
              Machine Learning.
            </p>

            <p
              className="text-base sm:text-lg leading-relaxed text-justify"
              style={{ color: "#4A3728" }}
            >
              I've contributed to real-world projects spanning scalable backend
              systems, full-stack web applications, and microservices
              architectures. Alongside industry work, I've served as a part-time
              lecturer — an experience that shaped how I teach and helped me
              understand how to break down complex concepts into clear,
              digestible explanations.
            </p>

            <p
              className="text-base sm:text-lg leading-relaxed text-justify"
              style={{ color: "#4A3728" }}
            >
              Zyphraa was founded with one focused goal:{" "}
              <span className="italic font-medium" style={{ color: "#2D4A3E" }}>
                to help you move from just learning code to actually building
                real projects and becoming job-ready.
              </span>{" "}
              We prioritise practical learning, hands-on coding, and
              industry-level thinking — not passive theory.
            </p>

            <p
              className="text-base sm:text-lg leading-relaxed"
              style={{ color: "#4A3728" }}
            >
              If you're looking to break into tech, transition careers, or level
              up your development skills — you're in exactly the right place. ♡
            </p>
          </div>

          {/* Divider */}
          <div className="my-8 border-t" style={{ borderColor: "#D4C5A9" }} />

          {/* Stats row */}
          <div className="grid grid-cols-3 gap-4 text-center">
            {[
              { value: "3+", label: "Years Experience" },
              { value: "5", label: "Courses Available" },
              { value: "100%", label: "Project-Based" },
            ].map(({ value, label }) => (
              <div key={label}>
                <div
                  className="text-2xl sm:text-3xl font-serif font-bold"
                  style={{ color: "#2D4A3E" }}
                >
                  {value}
                </div>
                <div
                  className="text-xs mt-1 tracking-wide"
                  style={{ color: "#8B6914" }}
                >
                  {label}
                </div>
              </div>
            ))}
          </div>

          {/* Contact links */}
          <div className="flex flex-col sm:flex-row gap-3 mt-8">
            <a
              href="https://www.instagram.com/zyphraa.arya"
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 text-center py-2.5 rounded-full text-sm font-medium tracking-wide transition-opacity hover:opacity-80"
              style={{ backgroundColor: "#2D4A3E", color: "#F5EFE6" }}
            >
              Instagram ↗
            </a>
            <a
              href="https://linkedin.com/in/aryasree-tg-027461201"
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 text-center py-2.5 rounded-full text-sm font-medium tracking-wide transition-colors"
              style={{
                border: "1.5px solid #2D4A3E",
                color: "#2D4A3E",
                backgroundColor: "transparent",
              }}
            >
              LinkedIn ↗
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
