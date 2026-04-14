import React from "react";

const Home = () => {
  return (
    <section
      id="home"
      className="min-h-screen flex flex-col justify-center items-center text-center px-6"
    >
      {/* Heading */}
      <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
        Become a{" "}
        <span className="text-primary">
          Job-Ready Developer
        </span>{" "}
      </h1>

      {/* Subheading */}
      <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mb-8">
        Learn Full Stack Development, DevOps, and build real-world projects 
        with Zyphra. No boring theory — just practical skills that get you hired.
      </p>

      {/* Buttons */}
      <div className="flex gap-4 flex-wrap justify-center">
        <button className="bg-primary text-primary-foreground px-6 py-3 rounded-lg font-medium hover:opacity-90 transition">
          Join Workshop ₹999
        </button>

        <button className="border border-border px-6 py-3 rounded-lg hover:bg-muted transition">
          View Courses
        </button>
      </div>

      {/* Small Trust Line */}
      <p className="text-sm text-muted-foreground mt-6">
        Limited seats • Live sessions • Real projects
      </p>
    </section>
  );
};

export default Home;