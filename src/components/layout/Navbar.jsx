import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
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
};

export default Navbar;
