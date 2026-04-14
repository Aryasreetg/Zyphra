import React from "react";

const Home = () => {
  return (
    <section
      id="home"
      className="min-h-screen flex flex-col justify-center items-center text-center px-4 sm:px-6 py-16 sm:py-20"
    >
      {/* Heading */}
      <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight max-w-4xl">
        Become a{" "}
        <span className="text-primary">
          Job-Ready Developer
        </span>{" "}
      </h1>

      {/* Subheading */}
      <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mb-8 leading-relaxed text-justify">
        Learn Full Stack Development, DevOps, and build real-world projects
        with Zyphra. No boring theory — just practical skills that get you hired.
      </p>

      {/* Buttons */}
      <div className="flex flex-col sm:flex-row gap-4 justify-center w-full max-w-md">
        <button className="bg-primary text-primary-foreground px-6 py-3 rounded-lg font-medium hover:opacity-90 transition text-sm sm:text-base">
          Join Workshop ₹999
        </button>

        <button className="border border-border px-6 py-3 rounded-lg hover:bg-muted transition text-sm sm:text-base">
          View Courses
        </button>
      </div>

      {/* Small Trust Line */}
      <p className="text-xs sm:text-sm text-muted-foreground mt-6 max-w-md text-center">
        Limited seats • Live sessions • Real projects
      </p>
    </section>
  );
};

export default Home;