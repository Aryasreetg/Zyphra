"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { coursesData, getEnrolLink } from "@/config/courses";
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
const workshop = coursesData.find((c) => c.id === "3-day-workshop");

const Navbar = () => {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [sectionInView, setActive] = useState("home");
  const onCampus = pathname.startsWith("/campus");
  const active = pathname === "/" ? sectionInView : onCampus ? "campus" : "";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
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
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: "-45% 0px -50% 0px" }
    );
    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, [pathname]);

  // Lock page scroll while the mobile menu is open
  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMenuOpen]);

  return (
    <>
      {/* Announcement bar */}
      {workshop && (
        <div className="text-[12.5px]" style={{ backgroundColor: C.primaryDark, color: "rgba(248,243,234,0.85)" }}>
          <div className="wrap flex items-center justify-center gap-3 py-2 text-center">
            <span className="hidden sm:inline serif-italic serif" style={{ color: C.bronzeLight }}>Now enrolling</span>
            <span className="hidden sm:inline opacity-40">/</span>
            <span>
              {workshop.title} · {workshop.offerPrice}
            </span>
            <Link href={getEnrolLink(workshop)} className="ulink on" style={{ color: C.cream }}>
              Reserve a seat <span aria-hidden>→</span>
            </Link>
          </div>
        </div>
      )}

      <header
        className="sticky top-0 z-50 border-b"
        style={{
          backgroundColor: scrolled ? "rgba(248, 243, 234, 0.94)" : C.cream,
          backdropFilter: scrolled ? "saturate(140%) blur(10px)" : "none",
          borderColor: scrolled ? "rgba(58,50,43,0.14)" : "transparent",
          transition: "background-color 300ms ease, border-color 300ms ease",
        }}
      >
        <div className="wrap flex items-center justify-between" style={{ height: scrolled ? 64 : 76, transition: "height 300ms ease" }}>
          {/* Wordmark */}
          <Link href="/#home" className="flex items-baseline gap-3" aria-label="Zyphraa home">
            <span className="display text-[1.75rem] leading-none" style={{ color: C.primary }}>
              Zyphraa
            </span>
            <span className="hidden xl:inline text-[11px] tracking-[0.16em] uppercase" style={{ color: C.bronze }}>
              A space for skills &amp; growth
            </span>
          </Link>

          {/* Desktop links */}
          <nav className="hidden lg:flex items-center gap-8 text-[14px]">
            {LINKS.map((link) => (
              <Link
                key={link.id}
                href={hrefFor(link)}
                data-active={active === link.id}
                className="nav-link"
                style={{ color: active === link.id ? C.primary : "#4F443B", fontWeight: active === link.id ? 600 : 500 }}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {onCampus ? (
            // Plain anchor: scrolls even if the URL already ends in #proposal
            <a href="#proposal" className="btn-z btn-solid hidden lg:inline-flex py-2.5 px-5 text-[13px]">
              Request proposal
            </a>
          ) : (
            <Link href="/#contact" className="btn-z btn-solid hidden lg:inline-flex py-2.5 px-5 text-[13px]">
              Enquire now
            </Link>
          )}

          {/* Mobile menu button */}
          <button
            className="lg:hidden flex items-center gap-2.5 text-[13px] font-semibold tracking-wide"
            onClick={() => setIsMenuOpen(true)}
            aria-label="Open menu"
            aria-expanded={isMenuOpen}
            style={{ color: C.primary }}
          >
            Menu
            <span className="flex flex-col gap-[5px] w-6">
              <span className="block h-px bg-current" />
              <span className="block h-px bg-current w-4 ml-auto" />
            </span>
          </button>
        </div>

      </header>

      {/* Mobile menu: full-screen panel */}
      <div
        className="lg:hidden fixed inset-0 z-[80] flex flex-col"
        aria-hidden={!isMenuOpen}
        style={{
          backgroundColor: C.primaryDark,
          opacity: isMenuOpen ? 1 : 0,
          pointerEvents: isMenuOpen ? "auto" : "none",
          transition: "opacity 300ms ease",
        }}
      >
        <div className="wrap flex items-center justify-between h-[76px]">
          <span className="display text-[1.75rem] leading-none" style={{ color: C.cream }}>Zyphraa</span>
          <button
            onClick={() => setIsMenuOpen(false)}
            aria-label="Close menu"
            className="text-[13px] font-semibold tracking-wide"
            style={{ color: C.cream }}
          >
            Close ✕
          </button>
        </div>
        <nav className="wrap flex-1 flex flex-col justify-center gap-1">
          {LINKS.map((link, i) => (
            <Link
              key={link.id}
              href={hrefFor(link)}
              onClick={() => setIsMenuOpen(false)}
              className="group flex items-baseline gap-4 py-2 border-b rule-light"
              style={{
                color: C.cream,
                transform: isMenuOpen ? "none" : "translateY(12px)",
                opacity: isMenuOpen ? 1 : 0,
                transition: `transform 450ms ${i * 45}ms cubic-bezier(0.22,1,0.36,1), opacity 450ms ${i * 45}ms ease`,
              }}
            >
              <span className="serif serif-italic text-sm w-6" style={{ color: C.bronzeLight }}>
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className="display text-[2.1rem]">{link.label}</span>
            </Link>
          ))}
        </nav>
        <div className="wrap pb-10">
          {onCampus ? (
            <a href="#proposal" onClick={() => setIsMenuOpen(false)} className="btn-z btn-cream w-full">
              Request proposal <span className="arr" aria-hidden>→</span>
            </a>
          ) : (
            <Link href="/#contact" onClick={() => setIsMenuOpen(false)} className="btn-z btn-cream w-full">
              Enquire now <span className="arr" aria-hidden>→</span>
            </Link>
          )}
        </div>
      </div>
    </>
  );
};

export default Navbar;
