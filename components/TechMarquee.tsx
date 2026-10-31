import React from "react";
import { C } from "@/lib/theme";

const TECH = [
  "React", "Next.js", "TypeScript", "Tailwind CSS", "Spring Boot", "Java", "Python",
  "Django", "Node.js", "PostgreSQL", "MySQL", "MongoDB", "scikit-learn", "Pandas",
  "Docker", "CI/CD", "Git", "GitHub", "JWT Auth", "REST APIs", "Microservices", "JUnit",
];

/** Infinite scrolling strip of the technologies taught across Zyphraa courses. */
const TechMarquee = () => (
  <section aria-label="Technologies you'll learn" className="py-8 border-y" style={{ backgroundColor: C.green, borderColor: C.greenDark }}>
    <p className="text-center text-[10px] tracking-[0.3em] uppercase font-semibold mb-4" style={{ color: C.goldLight }}>
      ✦ Tools & technologies you&rsquo;ll work with
    </p>
    <div className="marquee overflow-hidden">
      <div className="marquee-track gap-3">
        {[...TECH, ...TECH].map((t, i) => (
          <span
            key={`${t}-${i}`}
            aria-hidden={i >= TECH.length}
            className="px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap"
            style={{ backgroundColor: "rgba(245,239,230,0.08)", color: C.cream, border: "1px solid rgba(245,239,230,0.18)" }}
          >
            {t}
          </span>
        ))}
      </div>
    </div>
  </section>
);

export default TechMarquee;
