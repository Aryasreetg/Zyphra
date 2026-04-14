import React from "react";

const Navbar = () => {
  return (
    <header className="sticky top-0 z-50 bg-background/80 backdrop-blur border-b border-border">
      <div className="max-w-6xl mx-auto flex items-center justify-between px-6 py-4">
        
        {/* Logo */}
        <h1 className="text-xl font-bold text-primary">
          Zyphra
        </h1>

        {/* Links */}
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

        {/* CTA Button */}
        <button className="bg-primary text-primary-foreground px-4 py-2 rounded-lg text-sm font-medium hover:opacity-90 transition">
          Join Now
        </button>
      </div>
    </header>
  );
};

export default Navbar;