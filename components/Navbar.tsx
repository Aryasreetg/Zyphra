"use client";

import React, { useState } from "react";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-background/80 backdrop-blur border-b border-border">
      <div className="max-w-6xl mx-auto flex items-center justify-between px-4 sm:px-6 py-4">

        {/* Logo */}
        <h1 className="text-xl font-bold text-primary">
          Zyphra
        </h1>

        {/* Desktop Links */}
        <nav className="hidden md:flex items-center gap-6 text-sm">
          <a href="#home" className="hover:text-primary transition">
            Home
          </a>
          <a href="#about" className="hover:text-primary transition">
            About
          </a>
          <a href="#courses" className="hover:text-primary transition">
            Courses
          </a>
          <a href="#workshop" className="hover:text-primary transition">
            Workshop
          </a>
          <a href="#contact" className="hover:text-primary transition">
            Contact
          </a>
        </nav>

        {/* Desktop CTA Button */}
        <button className="hidden md:block bg-primary text-primary-foreground px-4 py-2 rounded-lg text-sm font-medium hover:opacity-90 transition">
          Join Now
        </button>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden p-2"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle menu"
        >
          <div className="w-6 h-6 flex flex-col justify-center items-center">
            <span className={`block w-5 h-0.5 bg-foreground transition-transform duration-300 ${isMenuOpen ? 'rotate-45 translate-y-1' : '-translate-y-1'}`}></span>
            <span className={`block w-5 h-0.5 bg-foreground transition-opacity duration-300 ${isMenuOpen ? 'opacity-0' : 'opacity-100'}`}></span>
            <span className={`block w-5 h-0.5 bg-foreground transition-transform duration-300 ${isMenuOpen ? '-rotate-45 -translate-y-1' : 'translate-y-1'}`}></span>
          </div>
        </button>
      </div>

      {/* Mobile Menu */}
      <div className={`md:hidden bg-background border-b border-border transition-all duration-300 ${isMenuOpen ? 'max-h-64 opacity-100' : 'max-h-0 opacity-0 overflow-hidden'}`}>
        <nav className="px-4 sm:px-6 py-4 space-y-4">
          <a href="#home" className="block py-2 hover:text-primary transition" onClick={() => setIsMenuOpen(false)}>
            Home
          </a>
          <a href="#about" className="block py-2 hover:text-primary transition" onClick={() => setIsMenuOpen(false)}>
            About
          </a>
          <a href="#courses" className="block py-2 hover:text-primary transition" onClick={() => setIsMenuOpen(false)}>
            Courses
          </a>
          <a href="#workshop" className="block py-2 hover:text-primary transition" onClick={() => setIsMenuOpen(false)}>
            Workshop
          </a>
          <a href="#contact" className="block py-2 hover:text-primary transition" onClick={() => setIsMenuOpen(false)}>
            Contact
          </a>
          <button className="w-full bg-primary text-primary-foreground px-4 py-2 rounded-lg text-sm font-medium hover:opacity-90 transition mt-4">
            Join Now
          </button>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;