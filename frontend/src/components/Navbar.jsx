import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Link as ScrollLink } from "react-scroll";

const navItems = [
  { name: "Home", to: "home" },
  { name: "Features", to: "features" },
  { name: "About", to: "about" },
  { name: "Contact", to: "contact" },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="w-full bg-gradient-to-r from-blue-500 via-teal-400 to-orange-300/90 shadow-lg fixed top-0 left-0 z-50 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
        {/* Logo */}
        <Link
          to="/"
          className="flex items-center gap-2 text-2xl font-extrabold tracking-tight text-white font-poppins hover:scale-105 transition-transform duration-200"
        >
          <svg
            className="w-8 h-8 text-white"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0h6"
            />
          </svg>
          <span>PlanMyTour</span>
        </Link>
        {/* Desktop Nav */}
        <div className="hidden md:flex space-x-8">
          {navItems.map((item) => (
            <ScrollLink
              key={item.name}
              to={item.to}
              smooth={true}
              duration={600}
              offset={-64}
              className="relative px-3 py-2 font-medium text-white hover:text-orange-100 cursor-pointer transition-colors duration-200 group"
              activeClass="text-orange-200"
              spy={true}
            >
              {item.name}
              <span className="block h-0.5 bg-white scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300"></span>
            </ScrollLink>
          ))}
        </div>
        {/* Mobile menu button */}
        <button
          className="md:hidden flex items-center text-white hover:text-orange-100 focus:outline-none"
          onClick={() => setMenuOpen((open) => !open)}
          aria-label="Toggle menu"
        >
          <svg
            className="h-7 w-7"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>
      </div>
      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden bg-gradient-to-br from-blue-500 via-teal-400 to-orange-300/95 shadow-lg px-4 pt-2 pb-4 space-y-2">
          {navItems.map((item) => (
            <ScrollLink
              key={item.name}
              to={item.to}
              smooth={true}
              duration={600}
              offset={-64}
              className="block px-3 py-2 rounded text-base font-medium text-white hover:bg-orange-200/20 hover:text-orange-100 transition-colors duration-200 cursor-pointer"
              activeClass="text-orange-200"
              spy={true}
              onClick={() => setMenuOpen(false)}
            >
              {item.name}
            </ScrollLink>
          ))}
        </div>
      )}
    </nav>
  );
}
