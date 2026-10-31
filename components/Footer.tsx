import React from "react";
import Link from "next/link";
import { coursesData } from "@/config/courses";
import { C } from "@/lib/theme";
import { Mail, Instagram, Linkedin, Send } from "lucide-react";
import SectionBg from "./SectionBg";

const Footer = () => {
  const year = new Date().getFullYear();
  const featured = coursesData.filter((c) => c.category !== "workshop" && c.category !== "mentorship").slice(0, 5);

  return (
    <footer className="relative overflow-hidden" style={{ backgroundColor: C.greenDark, color: C.cream }}>
      <SectionBg pattern="dotsLight" opacity={1} fade="bottom" />
      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 py-12 sm:py-14 grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
        <div className="lg:col-span-1">
          <p className="text-2xl font-serif font-bold mb-1" style={{ color: C.cream }}>Zyphraa</p>
          <p className="text-[10px] tracking-[0.2em] uppercase mb-4" style={{ color: C.goldLight }}>A Space for Skills & Growth</p>
          <p className="text-sm leading-relaxed" style={{ color: "rgba(245,239,230,0.7)" }}>
            Practical, project-first tech education that takes you from learning code to shipping real
            products — and landing the job.
          </p>
        </div>

        <div>
          <p className="text-xs tracking-widest uppercase font-semibold mb-4" style={{ color: C.goldLight }}>Explore</p>
          <ul className="space-y-2 text-sm">
            {[
              ["About", "/#about"],
              ["Courses", "/#courses"],
              ["How It Works", "/#journey"],
              ["FAQ", "/#faq"],
              ["Campus Workshops", "/campus"],
              ["Contact", "/#contact"],
            ].map(([label, href]) => (
              <li key={href} className="mb-0">
                <Link href={href} className="hover:underline underline-offset-4" style={{ color: "rgba(245,239,230,0.8)" }}>
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="text-xs tracking-widest uppercase font-semibold mb-4" style={{ color: C.goldLight }}>Popular Courses</p>
          <ul className="space-y-2 text-sm">
            {featured.map((c) => (
              <li key={c.id} className="mb-0">
                <Link href={`/courses/${c.id}`} className="hover:underline underline-offset-4" style={{ color: "rgba(245,239,230,0.8)" }}>
                  {c.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="text-xs tracking-widest uppercase font-semibold mb-4" style={{ color: C.goldLight }}>Get In Touch</p>
          <ul className="space-y-2 text-sm">
            <li className="mb-0">
              <a href="mailto:aryasree.zyphraa@gmail.com" className="inline-flex items-center gap-2 hover:underline underline-offset-4 break-all" style={{ color: "rgba(245,239,230,0.8)" }}>
                <Mail className="w-4 h-4 flex-shrink-0" style={{ color: C.goldLight }} />
                aryasree.zyphraa@gmail.com
              </a>
            </li>
            <li className="mb-0">
              <a href="https://www.instagram.com/zyphraa.arya" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 hover:underline underline-offset-4" style={{ color: "rgba(245,239,230,0.8)" }}>
                <Instagram className="w-4 h-4" style={{ color: C.goldLight }} />
                Instagram ↗
              </a>
            </li>
            <li className="mb-0">
              <a href="https://linkedin.com/in/aryasree-tg-027461201" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 hover:underline underline-offset-4" style={{ color: "rgba(245,239,230,0.8)" }}>
                <Linkedin className="w-4 h-4" style={{ color: C.goldLight }} />
                LinkedIn ↗
              </a>
            </li>
          </ul>
          <Link
            href="/#contact"
            className="btn-shine inline-flex items-center gap-2 mt-5 px-5 py-2.5 rounded-full text-sm font-semibold hover:-translate-y-0.5"
            style={{ backgroundColor: C.cream, color: C.green }}
          >
            <Send className="w-4 h-4" />
            Send a Query
          </Link>
        </div>
      </div>
      <div className="border-t" style={{ borderColor: "rgba(245,239,230,0.12)" }}>
        <p className="relative max-w-6xl mx-auto px-4 sm:px-6 py-5 text-xs text-center mb-0" style={{ color: "rgba(245,239,230,0.55)" }}>
          © {year} Zyphraa. Built with ♡ for future developers.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
