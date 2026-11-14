import React from "react";
import Image from "next/image";
import { C } from "@/lib/theme";
import Reveal from "./Reveal";
import teamImg from "@/public/images/team-coding.jpg";

const STEPS = [
  {
    title: "Talk to us",
    text: "Send a query through the contact form. We'll understand your background, goals, and recommend the right programme — no pressure.",
  },
  {
    title: "Pick your path",
    text: "Choose a flagship, foundation, specialisation, or fully personalised one-on-one track that matches your pace.",
  },
  {
    title: "Learn by building",
    text: "Live sessions, hands-on coding and real projects every week — with code reviews and doubt-clearing along the way.",
  },
  {
    title: "Ship & showcase",
    text: "Deploy your projects to the cloud and build a portfolio on GitHub that recruiters can actually click through.",
  },
  {
    title: "Get interview-ready",
    text: "Mock technical and HR interviews with honest feedback, plus resume and LinkedIn guidance before you apply.",
  },
];

const HowItWorks = () => (
  <section id="journey" style={{ backgroundColor: C.parchment }}>
    <div className="wrap py-20 lg:py-28 grid lg:grid-cols-12 gap-12 lg:gap-16">
      {/* Sticky intro */}
      <div className="lg:col-span-5">
        <div className="lg:sticky lg:top-28">
          <Reveal>
            <p className="label mb-6">
              <span className="label-num">04</span> Your journey with Zyphraa
            </p>
            <h2 className="display text-[2.6rem] sm:text-[3.4rem] mb-6" style={{ color: C.primary }}>
              From first question to <em style={{ color: C.bronze }}>first offer</em>
            </h2>
            <p className="lede mb-10">A simple, guided path — you always know what&rsquo;s next and why it matters.</p>
          </Reveal>
          <Reveal delay={120}>
            <figure className="frame mr-4">
              <div className="relative aspect-[3/2] overflow-hidden settle">
                <Image src={teamImg} alt="A small group coding together around a table" fill placeholder="blur" sizes="(min-width: 1024px) 38vw, 100vw" className="photo object-cover" />
              </div>
            </figure>
          </Reveal>
        </div>
      </div>

      {/* Steps */}
      <ol className="lg:col-span-7 lg:pt-4 mb-0">
        {STEPS.map((step, i) => (
          <li key={step.title} className="border-t rule last:border-b mb-0">
            <Reveal delay={i * 70} className="grid grid-cols-[4.5rem_1fr] sm:grid-cols-[6rem_1fr] gap-4 py-9">
              <span className="display serif-italic text-[3.2rem] sm:text-[4rem] leading-[0.8]" style={{ color: C.bronze }}>
                {String(i + 1).padStart(2, "0")}
              </span>
              <div>
                <h3 className="display text-[1.75rem] sm:text-[2rem] mb-3" style={{ color: C.primary }}>
                  {step.title}
                </h3>
                <p className="text-[15.5px] leading-[1.75] mb-0 max-w-lg" style={{ color: C.brown }}>
                  {step.text}
                </p>
              </div>
            </Reveal>
          </li>
        ))}
      </ol>
    </div>
  </section>
);

export default HowItWorks;
