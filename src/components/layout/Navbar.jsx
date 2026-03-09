import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 bg-white/50 backdrop-blur-md border-b border-white/5 px-4 py-4 flex items-center justify-between">
      {/* Logo */}
      <Link to="/landing" className="flex items-center space-x-2 ps-2">
        <div className="h-10 w-10 overflow-hidden flex items-center justify-center -translate-y-1">
          <img
            src="/favicon-removebg-preview.png"
            alt="EduNEXA Logo"
            className="w-full h-full object-contain"
          />
        </div>
        <span className="text-2xl text-[#0F172B] font-bold tracking-tighter">
          EDUNEXA
        </span>
      </Link>

      {/* Desktop Links */}
      <div className="hidden md:flex items-center gap-8 text-sm text-[#45556C]">
        <Link to="/landing" className="hover:text-black transition-colors font-semibold">Home</Link>
        <Link to="/courses" className="hover:text-black transition-colors">Courses</Link>
        <Link to="/about" className="hover:text-black  transition-colors">About Us</Link>
        <Link to="/contact" className="hover:text-black  transition-colors">Contact Us</Link>


        <Link
          to="/signup"
          className="text-white px-3 py-2 bg-[#0F4C4A] rounded-md hover:bg-[#0F3B36] transition-all"
        >
          Sign Up
        </Link>
      </div>

      {/* Hamburger Menu for Mobile */}
      <div className="md:hidden ml-auto">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="focus:outline-none text-[#0F172B]"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
            />
          </svg>
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="absolute top-full left-0 w-full bg-white shadow-md text-black flex flex-col items-center md:hidden py-4 space-y-4">
          <Link to="/landing" className="hover:text-black transition-colors font-semibold" onClick={() => setIsOpen(false)}>Home</Link>
          <Link to="/courses" className="hover:text-black transition-colors" onClick={() => setIsOpen(false)}>Courses</Link>
          <Link to="/about" className="hover:text-black transition-colors" onClick={() => setIsOpen(false)}>About Us</Link>
          <Link to="/contact" className="hover:text-black transition-colors" onClick={() => setIsOpen(false)}>Contact Us</Link>
          <Link
            to="/signup"
            className="text-white px-4 py-2 bg-[#0F4C4A] rounded-md hover:bg-[#0F3B36] transition-all"
            onClick={() => setIsOpen(false)}
          >
            Sign Up
          </Link>
        </div>
      )}
    </nav>

  );
};

export default Navbar;
