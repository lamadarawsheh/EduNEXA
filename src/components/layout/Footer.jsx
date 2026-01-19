import React from 'react';

const Footer = () => {
    return (
       <footer>
 <section className="py-12 bg-[#0F4C4A] text-white">
  <div className="max-w-6xl mx-auto">
    <div className="flex flex-col md:flex-row justify-center gap-8 ps-5 items-start text-left">
      
      <div className="flex flex-col w-full md:w-1/4">
        <span className="text-lg font-bold pb-3">About Academy</span>
        <span className="text-sm text-[#90A1B9] leading-relaxed">
          A specialized educational platform<br />
          offering high-quality courses in<br />
          technology and design fields
        </span>
      </div>

      <div className="flex flex-col w-full md:w-1/4">
        <span className="text-lg font-bold pb-3">Quick Links</span>
        <span className="text-sm text-[#90A1B9]">Courses</span>
        <span className="text-sm text-[#90A1B9]">About Us</span>
        <span className="text-sm text-[#90A1B9]">Contact</span>
      </div>

      <div className="flex flex-col w-full md:w-1/4">
        <span className="text-lg font-bold pb-3">Support</span>
        <span className="text-sm text-[#90A1B9]">FAQ</span>
        <span className="text-sm text-[#90A1B9]">Technical Support</span>
        <span className="text-sm text-[#90A1B9]">Privacy Policy</span>
      </div>

      <div className="flex flex-col w-full md:w-1/4">
        <span className="text-lg font-bold pb-3">Follow Us</span>
        <span className="text-sm text-[#90A1B9]">Facebook</span>
        <span className="text-sm text-[#90A1B9]">Twitter</span>
        <span className="text-sm text-[#90A1B9]">Instagram</span>
      </div>

    </div>
  </div>

  {/* line  */}
  <div className="flex justify-center mt-10">
    <div className="w-3/4 border-t border-black"></div>
  </div>

  {/* all rights */}
  <p className="text-left ps-2 md:text-center text-sm text-[#90A1B9] mt-4">
    © 2024 Learning Academy. All rights reserved.
  </p>

 </section>
</footer>

    );
};

export default Footer;
