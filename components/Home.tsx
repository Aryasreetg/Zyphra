import React from "react";

const Home = () => {
  return (
    <section
      id="home"
      className="min-h-screen flex flex-col justify-center items-center text-center px-4 sm:px-6 py-16 sm:py-20"
      style={{ backgroundColor: "#F5EFE6" }}
    >
      {/* Decorative tag */}
      <div
        className="hero-in hero-in-1 inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold tracking-[0.15em] uppercase mb-6"
        style={{ backgroundColor: "#E8DCC8", color: "#8B6914", border: "1px solid #D4C5A9" }}
      >
        ✦ Learn. Improve. Grow. Achieve.
      </div>

      {/* Heading */}
      <h1
        className="hero-in hero-in-2 text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-serif font-bold mb-6 leading-tight max-w-4xl"
        style={{ color: "#2D4A3E" }}
      >
        Become a{" "}
        <span
          className="italic"
          style={{ color: "#8B6914" }}
        >
          Job-Ready
        </span>{" "}
        Developer
      </h1>

      {/* Subheading */}
      <p
        className="hero-in hero-in-3 text-base sm:text-lg max-w-2xl mb-4 leading-relaxed"
        style={{ color: "#6B5744" }}
      >
        Learn Full Stack Development, Python & AI/ML, Java & Spring Boot, and DevOps —
        and build real-world projects with Zyphraa. No boring theory, no filler modules,
        just practical skills that get you hired.
      </p>

      {/* Secondary supporting line */}
      <p
        className="hero-in hero-in-3 text-sm sm:text-base max-w-2xl mb-2 leading-relaxed"
        style={{ color: "#8B6914" }}
      >
        Every programme now includes live mock interview practice, so you graduate
        interview-ready, not just skill-ready.
      </p>

      {/* Tagline */}
      <p
        className="hero-in hero-in-4 text-sm italic mb-10 tracking-wide"
        style={{ color: "#8B6914" }}
      >
        ♡ New Skills. New Opportunities. New You.
      </p>

      {/* Buttons */}
      <div className="hero-in hero-in-5 flex flex-col sm:flex-row gap-4 justify-center w-full max-w-sm">
        <a
          href="https://forms.gle/WBvxgVHSrCuZspqVA"
          target="_blank"
          rel="noopener noreferrer"
          className="px-7 py-3.5 rounded-full font-semibold text-sm tracking-wide transition-all hover:opacity-85 hover:-translate-y-0.5 shadow-md"
          style={{ backgroundColor: "#2D4A3E", color: "#F5EFE6" }}
        >
          Join Workshop — ₹999
        </a>

        <a
          href="#courses"
          className="home-outline-btn px-7 py-3.5 rounded-full font-semibold text-sm tracking-wide transition-all hover:-translate-y-0.5"
          style={{
            border: "1.5px solid #2D4A3E",
            color: "#2D4A3E",
            backgroundColor: "transparent",
          }}
        >
          View Courses
        </a>
        <style>{`
          .home-outline-btn:hover { background-color: #E8DCC8; }
        `}</style>
      </div>

      {/* Trust line */}
      <p className="hero-in hero-in-6 text-xs mt-8 tracking-wide" style={{ color: "#9C8570" }}>
        Limited seats &nbsp;•&nbsp; Live sessions &nbsp;•&nbsp; Real projects &nbsp;•&nbsp; Mock interview practice
      </p>

      {/* Bottom tags - Icons removed for cleaner design */}
      <div className="hero-in hero-in-6 flex flex-wrap justify-center gap-4 sm:gap-6 mt-8 sm:mt-12 px-4">
        {[
          { label: "Hands-On Learning" },
          { label: "Real-World Exposure" },
          { label: "Career Growth" },
          { label: "Build Confidence" },
        ].map(({ label }) => (
          <span key={label} className="text-[10px] tracking-widest uppercase font-medium" style={{ color: "#8B6914" }}>
            {label}
          </span>
        ))}
      </div>
    </section>
  );
};

export default Home;