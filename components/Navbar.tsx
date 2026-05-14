"use client";

import React, { useState } from "react";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 backdrop-blur-md border-b"
      style={{ backgroundColor: "rgba(245, 239, 230, 0.92)", borderColor: "#D4C5A9" }}>
      <div className="max-w-6xl mx-auto flex items-center justify-between px-4 sm:px-6 py-4">

        {/* Logo */}
        <div className="flex flex-col leading-none">
          <span className="text-2xl font-serif font-bold tracking-wide" style={{ color: "#2D4A3E" }}>
            Zyphraa
          </span>
          <span className="text-[10px] tracking-[0.2em] uppercase" style={{ color: "#8B6914" }}>
            A Space for Skills & Growth
          </span>
        </div>

        {/* Desktop Links */}
        <nav className="hidden md:flex items-center gap-7 text-sm font-medium tracking-wide">
          {["home", "about", "courses", "workshop", "contact"].map((link) => (
            <a
              key={link}
              href={`#${link}`}
              className="capitalize transition-colors duration-200"
              style={{ color: "#4A3728" }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "#2D4A3E")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "#4A3728")}
            >
              {link}
            </a>
          ))}
        </nav>

        {/* Desktop CTA */}
        <a
          href="https://forms.gle/AdaaT56F6GMVCEUu9"
          target="_blank"
          rel="noopener noreferrer"
          className="hidden md:inline-block px-5 py-2 rounded-full text-sm font-semibold tracking-wide transition-opacity duration-200 hover:opacity-85"
          style={{ backgroundColor: "#2D4A3E", color: "#F5EFE6" }}
        >
          Join Now ✦
        </a>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden p-2"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle menu"
        >
          <div className="w-6 h-6 flex flex-col justify-center items-center gap-1.5">
            <span
              className={`block w-5 h-0.5 transition-transform duration-300 ${isMenuOpen ? "rotate-45 translate-y-2" : ""}`}
              style={{ backgroundColor: "#2D4A3E" }}
            />
            <span
              className={`block w-5 h-0.5 transition-opacity duration-300 ${isMenuOpen ? "opacity-0" : ""}`}
              style={{ backgroundColor: "#2D4A3E" }}
            />
            <span
              className={`block w-5 h-0.5 transition-transform duration-300 ${isMenuOpen ? "-rotate-45 -translate-y-2" : ""}`}
              style={{ backgroundColor: "#2D4A3E" }}
            />
          </div>
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden border-t transition-all duration-300 overflow-hidden ${isMenuOpen ? "max-h-72 opacity-100" : "max-h-0 opacity-0"}`}
        style={{ borderColor: "#D4C5A9", backgroundColor: "#F5EFE6" }}
      >
        <nav className="px-6 py-5 space-y-4">
          {["home", "about", "courses", "workshop", "contact"].map((link) => (
            <a
              key={link}
              href={`#${link}`}
              className="block py-1 capitalize text-sm font-medium transition-colors duration-200"
              style={{ color: "#4A3728" }}
              onClick={() => setIsMenuOpen(false)}
            >
              {link}
            </a>
          ))}
          <a
            href="https://forms.gle/AdaaT56F6GMVCEUu9"
            target="_blank"
            rel="noopener noreferrer"
            className="block w-full text-center px-4 py-2.5 rounded-full text-sm font-semibold mt-4 transition-opacity hover:opacity-85"
            style={{ backgroundColor: "#2D4A3E", color: "#F5EFE6" }}
            onClick={() => setIsMenuOpen(false)}
          >
            Join Now ✦
          </a>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
