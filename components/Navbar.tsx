"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { C } from "@/lib/theme";

// Same order as the sections appear on the homepage, top to bottom.
// Campus is a separate page, so it comes last.
const LINKS = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "courses", label: "Courses" },
  { id: "journey", label: "How It Works" },
  { id: "faq", label: "FAQ" },
  { id: "contact", label: "Contact" },
  { id: "campus", label: "Campus", href: "/campus" },
];

const hrefFor = (l: (typeof LINKS)[number]) => l.href ?? `/#${l.id}`;

const Navbar = () => {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [sectionInView, setActive] = useState("home");
  const active = pathname === "/" ? sectionInView : pathname.startsWith("/campus") ? "campus" : "";

  // Shrink the bar once the page is scrolled
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Highlight whichever homepage section is currently in view
  useEffect(() => {
    if (pathname !== "/") return;
    const sections = LINKS.filter((l) => !l.href)
      .map((l) => document.getElementById(l.id))
      .filter((el): el is HTMLElement => Boolean(el));

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { rootMargin: "-45% 0px -50% 0px" }
    );
    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, [pathname]);

  return (
    <header
      className="sticky top-0 z-50 backdrop-blur-md border-b"
      style={{
        backgroundColor: scrolled ? "rgba(245, 239, 230, 0.96)" : "rgba(245, 239, 230, 0.8)",
        borderColor: scrolled ? C.border : "transparent",
        boxShadow: scrolled ? "0 6px 24px rgba(45, 74, 62, 0.08)" : "none",
      }}
    >
      <div
        className="max-w-6xl mx-auto flex items-center justify-between px-4 sm:px-6"
        style={{ paddingTop: scrolled ? 10 : 16, paddingBottom: scrolled ? 10 : 16, transition: "padding 260ms ease" }}
      >
        {/* Logo */}
        <Link href="/#home" className="flex flex-col leading-none group">
          <span className="text-2xl font-serif font-bold tracking-wide group-hover:tracking-wider" style={{ color: C.green, transition: "letter-spacing 300ms ease" }}>
            Zyphraa
          </span>
          <span className="text-[10px] tracking-[0.2em] uppercase" style={{ color: C.gold }}>
            A Space for Skills & Growth
          </span>
        </Link>

        {/* Desktop Links */}
        <nav className="hidden lg:flex items-center gap-6 text-sm font-medium tracking-wide">
          {LINKS.map((link) => (
            <Link
              key={link.id}
              href={hrefFor(link)}
              data-active={active === link.id}
              className="nav-link"
              style={{ color: active === link.id ? C.green : C.brown }}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Desktop CTA */}
        <Link
          href="/#contact"
          className="btn-shine hidden lg:inline-flex items-center gap-2 px-5 py-2 rounded-full text-sm font-semibold tracking-wide hover:-translate-y-0.5 shadow-sm"
          style={{ backgroundColor: C.green, color: C.cream }}
        >
          <span className="pulse-dot w-2 h-2 rounded-full" style={{ backgroundColor: C.goldLight }} />
          Enquire Now
        </Link>

        {/* Mobile Menu Button */}
        <button className="lg:hidden p-2" onClick={() => setIsMenuOpen(!isMenuOpen)} aria-label="Toggle menu" aria-expanded={isMenuOpen}>
          <div className="w-6 h-6 flex flex-col justify-center items-center gap-1.5">
            <span className={`block w-5 h-0.5 transition-transform duration-300 ${isMenuOpen ? "rotate-45 translate-y-2" : ""}`} style={{ backgroundColor: C.green }} />
            <span className={`block w-5 h-0.5 transition-opacity duration-300 ${isMenuOpen ? "opacity-0" : ""}`} style={{ backgroundColor: C.green }} />
            <span className={`block w-5 h-0.5 transition-transform duration-300 ${isMenuOpen ? "-rotate-45 -translate-y-2" : ""}`} style={{ backgroundColor: C.green }} />
          </div>
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={`lg:hidden border-t transition-all duration-300 overflow-hidden ${isMenuOpen ? "max-h-[32rem] opacity-100" : "max-h-0 opacity-0"}`}
        style={{ borderColor: C.border, backgroundColor: C.cream }}
      >
        <nav className="px-6 py-5 space-y-3">
          {LINKS.map((link, i) => (
            <Link
              key={link.id}
              href={hrefFor(link)}
              className="block py-1 text-sm font-medium"
              style={{
                color: active === link.id ? C.green : C.brown,
                transform: isMenuOpen ? "none" : "translateX(-12px)",
                opacity: isMenuOpen ? 1 : 0,
                transition: `transform 300ms ${i * 40}ms ease, opacity 300ms ${i * 40}ms ease`,
              }}
              onClick={() => setIsMenuOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/#contact"
            className="block w-full text-center px-4 py-2.5 rounded-full text-sm font-semibold mt-4 hover:opacity-85"
            style={{ backgroundColor: C.green, color: C.cream }}
            onClick={() => setIsMenuOpen(false)}
          >
            Enquire Now ✦
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
