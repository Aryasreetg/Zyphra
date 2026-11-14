import React from "react";
import Link from "next/link";
import { coursesData } from "@/config/courses";
import { C } from "@/lib/theme";

const EXPLORE = [
  ["About", "/#about"],
  ["Courses", "/#courses"],
  ["How it works", "/#journey"],
  ["FAQ", "/#faq"],
  ["Contact", "/#contact"],
  ["Campus workshops", "/campus"],
];

const Footer = () => {
  const year = new Date().getFullYear();
  const featured = coursesData.filter((c) => c.category !== "workshop" && c.category !== "mentorship").slice(0, 5);
  const linkStyle = { color: "rgba(248,243,234,0.78)" };

  return (
    <footer style={{ backgroundColor: C.primaryDark, color: C.cream }}>
      <div className="wrap pt-20 pb-10">
        <div className="grid gap-12 md:grid-cols-12 pb-16 border-b rule-light">
          <div className="md:col-span-5">
            <p className="display text-[2.2rem] leading-tight mb-5" style={{ color: C.cream }}>
              Learn it. Build it. <em style={{ color: C.bronzeLight }}>Ship it.</em>
            </p>
            <p className="text-[15px] leading-relaxed max-w-sm mb-8" style={{ color: "rgba(248,243,234,0.7)" }}>
              Practical, project-first tech education that takes you from learning code to shipping real products —
              and landing the job.
            </p>
            <Link href="/#contact" className="btn-z btn-cream">
              Send a query <span className="arr" aria-hidden>→</span>
            </Link>
          </div>

          <nav className="md:col-span-2 md:col-start-7" aria-label="Explore">
            <p className="text-[11px] tracking-[0.18em] uppercase font-semibold mb-5" style={{ color: C.bronzeLight }}>Explore</p>
            <ul className="space-y-3 text-[14.5px] mb-0">
              {EXPLORE.map(([label, href]) => (
                <li key={href} className="mb-0">
                  <Link href={href} className="ulink font-normal" style={linkStyle}>{label}</Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav className="md:col-span-2" aria-label="Popular courses">
            <p className="text-[11px] tracking-[0.18em] uppercase font-semibold mb-5" style={{ color: C.bronzeLight }}>Courses</p>
            <ul className="space-y-3 text-[14.5px] mb-0">
              {featured.map((c) => (
                <li key={c.id} className="mb-0">
                  <Link href={`/courses/${c.id}`} className="ulink font-normal" style={linkStyle}>{c.title}</Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="md:col-span-2">
            <p className="text-[11px] tracking-[0.18em] uppercase font-semibold mb-5" style={{ color: C.bronzeLight }}>Contact</p>
            <ul className="space-y-3 text-[14.5px] mb-0">
              <li className="mb-0">
                <a href="mailto:aryasree.zyphraa@gmail.com" className="ulink font-normal break-all" style={linkStyle}>Email us</a>
              </li>
              <li className="mb-0">
                <a href="https://www.instagram.com/zyphraa.arya" target="_blank" rel="noopener noreferrer" className="ulink font-normal" style={linkStyle}>Instagram ↗</a>
              </li>
              <li className="mb-0">
                <a href="https://linkedin.com/in/aryasree-tg-027461201" target="_blank" rel="noopener noreferrer" className="ulink font-normal" style={linkStyle}>LinkedIn ↗</a>
              </li>
            </ul>
          </div>
        </div>

        {/* Wordmark */}
        {/* Decorative wordmark, drawn with CSS so it isn't read as text */}
        <div aria-hidden className="footer-wordmark display select-none mt-10 mb-6" />

        <div className="flex flex-col sm:flex-row justify-between gap-3 text-[12.5px]" style={{ color: "rgba(248,243,234,0.55)" }}>
          <p className="mb-0" style={{ color: "rgba(248,243,234,0.62)" }}>© {year} Zyphraa · A space for skills &amp; growth</p>
          <p className="mb-0" style={{ color: "rgba(248,243,234,0.62)" }}>Built with care for future developers.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
