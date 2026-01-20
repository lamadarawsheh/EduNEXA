import React from 'react';

const Footer = () => {
    return (
        <footer className="px-8 py-12 border-t border-white/5 bg-background mt-auto text-center">
            <p className="text-white/40 text-sm">
                &copy; {new Date().getFullYear()} EduNEXA Professional Learning Platform. All rights reserved.
            </p>
        </footer>
    );
};

export default Footer;
