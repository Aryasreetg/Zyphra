import React from "react";
import { C } from "@/lib/theme";

const TECH = [
  "React", "Next.js", "TypeScript", "Tailwind CSS", "Spring Boot", "Java", "Python", "Django", "Node.js",
  "PostgreSQL", "MySQL", "MongoDB", "scikit-learn", "Pandas", "Docker", "CI/CD", "Git", "REST APIs", "JUnit",
];

/** A quiet, typographic list of the tools taught across Zyphraa courses. */
const TechMarquee = () => (
  <section aria-label="Technologies you'll learn" style={{ backgroundColor: C.primary }}>
    <div className="wrap py-10 lg:py-12 grid lg:grid-cols-12 gap-6 items-baseline">
      <p className="lg:col-span-3 serif serif-italic text-xl" style={{ color: C.bronzeLight }}>
        The toolbelt you&rsquo;ll graduate with
      </p>
      <p className="min-w-0 lg:col-span-9 text-[15px] leading-[2] mb-0" style={{ color: "rgba(248,243,234,0.88)" }}>
        {TECH.map((t, i) => (
          <React.Fragment key={t}>
            <span className="whitespace-nowrap">{t}</span>
            {i < TECH.length - 1 && (
              <>
                {" "}
                <span aria-hidden className="mx-2" style={{ color: C.bronzeLight, opacity: 0.6 }}>/</span>{" "}
              </>
            )}
          </React.Fragment>
        ))}
      </p>
    </div>
  </section>
);

export default TechMarquee;
