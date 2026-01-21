import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
<<<<<<< HEAD
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 bg-white/50 backdrop-blur-md border-b border-white/5 px-4 py-4 flex items-center justify-between">
      {/* Logo */}
      <Link to="/landing" className="flex items-center space-x-2 ps-2">
        <img
          src="/image/logo-landing.png"
          alt="EduNEXA Logo"
          className="h-8 w-auto"
        />
        <span className="text-2xl text-[#0F172B] font-bold tracking-tighter">
          EDUNEXA
        </span>
      </Link>

      {/* Desktop Links */}
      <div className="hidden md:flex items-center gap-8 text-sm text-[#45556C]">
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
          <Link to="/landing" className="hover:text-black transition-colors">Courses</Link>
          <Link to="/about" className="hover:text-black transition-colors">About Us</Link>
          <Link to="/contact" className="hover:text-black transition-colors">Contact Us</Link>
          <Link
            to="/login"
            className="text-white px-4 py-2 bg-[#0F4C4A] rounded-md hover:bg-[#0F3B36] transition-all"
          >
            Sign Up
          </Link>
        </div>
      )}
    </nav>

  );
=======
    return (
        <nav className="flex items-center justify-between px-8 py-6 border-b border-white/5 bg-background/50 backdrop-blur-md sticky top-0 z-50">
            <Link to="/" className="text-2xl font-bold tracking-tighter hover:opacity-80 transition-opacity">
                EduNEXA
            </Link>
            <div className="flex items-center gap-8 text-sm font-medium">
                <Link to="/landing" className="hover:text-accent transition-colors">Explore</Link>
                <Link to="/login" className="px-5 py-2.5 bg-accent rounded-full hover:bg-accent/90 transition-all">
                    Sign In
                </Link>
            </div>
        </nav>
    );
>>>>>>> a1f79364e804aded903ad912a46c6712e386e51e
};

export default Navbar;
