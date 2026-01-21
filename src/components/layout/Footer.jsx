import React from 'react';

const Footer = () => {
  return (
    <footer>
      <section className="py-12 bg-[#0F4C4A] text-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-left">

            <div className="flex flex-col">
              <span className="text-xl font-bold pb-3 italic">EduNEXA</span>
              <span className="text-sm text-white/70 leading-relaxed">
                Empowering the next generation<br />
                through accessible and<br />
                quality education.
              </span>
            </div>

            <div className="flex flex-col">
              <span className="text-lg font-bold pb-3">Quick Links</span>
              <Link to="/landing" className="text-sm text-white/70 hover:text-white cursor-pointer transition mb-2">Courses</Link>
              <Link to="/about" className="text-sm text-white/70 hover:text-white cursor-pointer transition mb-2">About Us</Link>
              <Link to="/contact" className="text-sm text-white/70 hover:text-white cursor-pointer transition mb-2">Contact</Link>
            </div>

            <div className="flex flex-col">
              <span className="text-lg font-bold pb-3">Support</span>
              <Link to="/faq" className="text-sm text-white/70 hover:text-white cursor-pointer transition mb-2">FAQ</Link>
              <Link to="/support" className="text-sm text-white/70 hover:text-white cursor-pointer transition mb-2">Technical Support</Link>
              <Link to="/privacy" className="text-sm text-white/70 hover:text-white cursor-pointer transition mb-2">Privacy Policy</Link>
            </div>

            <div className="flex flex-col">
              <span className="text-lg font-bold pb-3">Follow Us</span>
              <div className="flex gap-4">
                <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-white/70 hover:text-white transition-colors" aria-label="Facebook">
                  <Facebook className="w-5 h-5" />
                </a>
                <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-white/70 hover:text-white transition-colors" aria-label="Twitter">
                  <Twitter className="w-5 h-5" />
                </a>
                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-white/70 hover:text-white transition-colors" aria-label="Instagram">
                  <Instagram className="w-5 h-5" />
                </a>
              </div>
            </div>

          </div>
        </div>

        {/* line  */}
        <div className="flex justify-center mt-10">
          <div className="w-3/4 border-t border-white/20"></div>
        </div>

        {/* all rights */}
        <p className="text-center text-sm text-white/50 mt-4">
          © 2026 EduNEXA Academy. All rights reserved.
        </p>

      </section>
    </footer>

  );
};

export default Footer;
