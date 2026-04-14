import React from "react";

const About = () => {
  return (
    <section id="about" className="max-w-4xl mx-auto py-12 sm:py-16 px-4 sm:px-6">
      <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-6 sm:mb-8 text-center">
        About Me
      </h1>

      <div className="space-y-4 sm:space-y-6">
        <p className="text-base sm:text-lg text-muted-foreground leading-relaxed text-justify">
          Hi, I'm Arya — a developer and mentor behind <span className="text-primary font-semibold">Zyphra</span>.
          I have 3+ years of experience working with modern technologies like
          Spring Boot, Angular, Next.js, Django, and Machine Learning.
        </p>

        <p className="text-base sm:text-lg text-muted-foreground leading-relaxed text-justify">
          I've worked on real-world projects including scalable backend systems,
          full-stack applications, and microservices architectures. Along with that,
          I've also been teaching students as a part-time lecturer — which helped me
          understand how to explain complex concepts in a simple way.
        </p>

        <p className="text-base sm:text-lg text-muted-foreground leading-relaxed text-justify">
          Zyphra is built with one goal — to help you move from just learning code
          to actually building real projects and becoming job-ready. I focus more on
          practical learning, hands-on coding, and industry-level thinking rather than just theory.
        </p>

        <p className="text-base sm:text-lg text-muted-foreground leading-relaxed text-justify">
          If you're someone who wants to break into tech, switch careers, or level up your
          development skills — you're in the right place
        </p>
      </div>
    </section>
  );
};

export default About;