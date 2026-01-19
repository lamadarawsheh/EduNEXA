import React from "react";

const Landing = () => {
  return (
    <div className="bg-gradient-to-r from-[#FCFFFE] via-[#F9FEFD] to-[#F5FDFC]  px-4 lg:px-0 py-10">

      {/* ===== Hero Section ===== */}
      <div className=" grid grid-cols-1 lg:grid-cols-2 w-full max-w-[80%] mx-auto gap-8 items-center">

        {/* ===== اimage ===== */}
        <div className="order-1 lg:order-2 flex justify-center items-center w-full">
          <img
            src="/image/image 1.png"
            alt="Hero"
            className="w-full sm:w-[80%] md:w-full max-h-[60vh] md:max-h-[80vh] object-contain rounded-lg"
          />
        </div>

        {/* ===== النصوص ===== */}
        <div className="order-2 lg:order-1 flex flex-col justify-center items-center lg:items-start space-y-6 text-center lg:text-left">

          {/* header */}
          <div className="space-y-2">
            <h2 className="text-6xl font-bold flex justify-center lg:justify-start">
              <span className="text-[#1A2A80]">Learn </span>
              <span className="text-[#0F172B] ps-3">New</span>
            </h2>
            <h2 className="text-6xl font-bold flex justify-center lg:justify-start">
              <span className="text-[#0F172B]">Skills </span>
              <span className="text-[#0F4C4A] ps-3">New</span>
            </h2>
          </div>

          {/* الوصف */}
          <div className="text-black text-base leading-relaxed">
            Join thousands of students who are developing their<br />
            skills through our specialized courses and<br />
            comprehensive educational content.
          </div>

          {/* button and numbers */}
          <div className="flex flex-wrap justify-center lg:justify-start items-center gap-4 w-full">

            {/* button */}
            <div className="flex flex-wrap justify-center items-center gap-4">
              <button className="bg-[#0F4C4A] text-white px-6 py-2 rounded-lg hover:bg-white hover:text-[#231D17] transition flex items-center space-x-2">
                <span>Start Now</span>
                <span className="text-2xl">→</span>
              </button>
              <button className="bg-white text-[#231D17] px-6 py-2 rounded-lg hover:bg-[#0F4C4A] hover:text-white transition border border-[#56A39A]">
                Learn More
              </button>
            </div>

            {/* numbers */}
            <div className="flex flex-wrap justify-center items-center gap-8">
              <div className="flex flex-col items-center lg:items-start">
                <span className="font-bold text-3xl text-black">10K+</span>
                <span className="text-gray-600">Active Students</span>
              </div>

              <div className="flex flex-col items-center lg:items-start">
                <span className="font-bold text-3xl text-black">500+</span>
                <span className="text-gray-600">Courses</span>
              </div>

              <div className="flex flex-col items-center lg:items-start">
                <div className="flex items-center space-x-1 justify-center lg:justify-start">
                  <span className="font-bold text-3xl text-black">4.9</span>
                  <span className="text-yellow-400 text-1xl">★</span>
                </div>
                <span className="text-gray-600 text-sm">Excellent Rating</span>
              </div>
            </div>

          </div>

        </div>
      </div>


<section className=" py-12  bg-white">
  {/* Header */}
  <div className="text-center mb-8 px-4">
    <h2 className="text-2xl md:text-4xl font-bold text-[#0F172B]">
      Why Choose Our Academy?
    </h2>
    <p className="text-sm md:text-lg text-gray-600 mt-2">
      We provide a comprehensive learning experience with the best instructors
      and advanced content
    </p>
  </div>

  {/* Cards */}
  <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-6 px-4">
    
    {/* Card 1 */}
    <div className="flex flex-col  border border-transparent shadow-lg gap-3 rounded-lg p-4 w-full max-w-[220px] h-[200px]">
      <img src="/image/logo2-landing.png" alt="Card 1" className="h-12 w-12" />
      <span className="text-[#0F172B] font-semibold   font-bold">
        Fast & Effective Learning
      </span>
      <p className="text-[#45556C] text-xs ">
        Focused and practical content that helps you acquire skills quickly
      </p>
    </div>

    {/* Card 2 */}
       <div className="flex flex-col  border border-transparent shadow-lg gap-3 rounded-lg p-4 w-full max-w-[220px] h-[200px]">
      <img src="/image/logo2-landing.png" alt="Card 1" className="h-12 w-12" />
      <span className="text-[#0F172B] font-semibold   font-bold">
        Fast & Effective Learning
      </span>
      <p className="text-[#45556C] text-xs ">
        Focused and practical content that helps you acquire skills quickly
      </p>
    </div>

    {/* Card 3 */}
       <div className="flex flex-col  border border-transparent shadow-lg gap-3 rounded-lg p-4 w-full max-w-[220px] h-[200px]">
      <img src="/image/logo2-landing.png" alt="Card 1" className="h-12 w-12" />
      <span className="text-[#0F172B] font-semibold   font-bold">
        Fast & Effective Learning
      </span>
      <p className="text-[#45556C] text-xs ">
        Focused and practical content that helps you acquire skills quickly
      </p>
    </div>

  </div>
</section>


 <section className="py-12 bg-gray-50">
  {/* Header */}
  <div className="text-center mb-12">
    <h2 className="text-4xl font-bold text-[#0F172B]">
      Popular Courses
    </h2>
    <p className="text-lg text-gray-600 mt-2">
Choose from hundreds of specialized courses in different fields    </p>
  </div>

  {/* 3cards */}
<div className="flex justify-center flex-wrap gap-4">
 
  {/* card1 */}
  <div className="flex flex-col border border-transparent shadow-lg rounded-lg p-4 w-[180px] sm:w-[200px] md:w-[260px]">
    <img src="/image/Gradient2.png" alt="Card 2" className="w-full h-32 sm:h-36 md:h-40 object-cover rounded-md mb-4" />
    <span className="text-[#0F172B] font-semibold mb-2 text-center">Expert Instructors</span>
    <p className="text-[#45556C] text-xs sm:text-sm text-center mb-4">
      Learn from industry experts with years of experience
    </p>
    <div className="flex justify-between w-full mt-2 text-xs sm:text-sm text-gray-500 mb-4">
      <span>2.5K Students</span>
      <span>Beginner</span>
    </div>
    <button className="bg-[#0F4C4A] text-white w-full py-1 rounded-lg hover:bg-[#0D3B36] transition-all">
      Details
    </button>
  </div>

  {/* card2 */}
  <div className="flex flex-col border border-transparent shadow-lg rounded-lg p-4 w-[180px] sm:w-[200px] md:w-[260px]">
    <img src="/image/Gradient2.png" alt="Card 2" className="w-full h-32 sm:h-36 md:h-40 object-cover rounded-md mb-4" />
    <span className="text-[#0F172B] font-semibold mb-2 text-center">Expert Instructors</span>
    <p className="text-[#45556C] text-xs sm:text-sm text-center mb-4">
      Learn from industry experts with years of experience
    </p>
    <div className="flex justify-between w-full mt-2 text-xs sm:text-sm text-gray-500 mb-4">
      <span>2.5K Students</span>
      <span>Beginner</span>
    </div>
    <button className="bg-[#0F4C4A] text-white w-full py-1 rounded-lg hover:bg-[#0D3B36] transition-all">
      Details
    </button>
  </div>

  {/* card3 */}
  <div className="flex flex-col border border-transparent shadow-lg rounded-lg p-4 w-[180px] sm:w-[200px] md:w-[260px]">
    <img src="/image/Gradient2.png" alt="Card 3" className="w-full h-32 sm:h-36 md:h-40 object-cover rounded-md mb-4" />
    <span className="text-[#0F172B] font-semibold mb-2 text-center">Advanced Content</span>
    <p className="text-[#45556C] text-xs sm:text-sm text-center mb-4">
      Get access to advanced and up-to-date learning materials
    </p>
    <div className="flex justify-between w-full mt-2 text-xs sm:text-sm text-gray-500 mb-4">
      <span>2.5K Students</span>
      <span>Beginner</span>
    </div>
    <button className="bg-[#0F4C4A] text-white w-full py-1 rounded-lg hover:bg-[#0D3B36] transition-all">
      Details
    </button>
  </div>
</div>


</section>

<section className="py-12 md:py-25 bg-gradient-to-r from-[#0F4C4A] via-[#0F4C4A] to-[#F8FFFE] text-white">
  <div className="flex flex-col md:flex-row items-center justify-center gap-12 md:gap-40">

    {/* number 1 */}
    <div className="flex flex-col items-center justify-center">
      <span className="text-3xl font-bold">10K+</span>
      <span className="text-sm mt-1">Registered Students</span>
    </div>

    {/* number 2 */}
    <div className="flex flex-col items-center justify-center">
      <span className="text-3xl font-bold">500+</span>
      <span className="text-sm mt-1">Available Courses</span>
    </div>

    {/* number 3 */}
    <div className="flex flex-col items-center justify-center">
      <span className="text-3xl font-bold">1.2K+</span>
      <span className="text-sm mt-1">Expert Instructors</span>
    </div>

    {/* number 4 */}
    <div className="flex flex-col items-center justify-center">
      <span className="text-3xl font-bold">4.9</span>
      <span className="text-sm mt-1">Satisfaction Rate</span>
    </div>

  </div>
</section>

    

     <section className=" py-12 bg-[#ECFAFA] pt-20 pb-20">
  {/* header */}
  <div className="text-center mb-12">
    <h2 className="text-4xl font-bold text-[#0F172B]">
    Student Reviews
    </h2>
    <p className="text-lg text-gray-600 mt-2">
Hear from students whose careers have been transformed by our academy    </p>
  </div>

  {/* 3cards */}
<div className="flex justify-center flex-wrap gap-4">
  {[...Array(3)].map((_, idx) => (
    <div key={idx} className=" bg-white flex flex-col border border-transparent shadow-lg gap-2 rounded-lg p-4 w-[180px] sm:w-[200px] md:w-[220px]">
      {/* النجوم */}
      <div className="flex mb-2 space-x-1 justify-center">
        {[...Array(5)].map((_, i) => (
          <svg
            key={i}
            className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-400"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.97a1 1 0 00.95.69h4.175c.969 0 1.371 1.24.588 1.81l-3.38 2.455a1 1 0 00-.364 1.118l1.286 3.97c.3.921-.755 1.688-1.54 1.118l-3.38-2.455a1 1 0 00-1.176 0l-3.38 2.455c-.784.57-1.838-.197-1.539-1.118l1.286-3.97a1 1 0 00-.364-1.118L2.05 9.397c-.783-.57-.38-1.81.588-1.81h4.175a1 1 0 00.95-.69l1.286-3.97z" />
          </svg>
        ))}
      </div>

      {/* النص */}
      <p className="text-[#45556C] text-xs sm:text-sm text-center mb-2">
        "The content is very professional and the instructors are experts in their field"
      </p>

      {/* الاسم والوظيفة */}
      <div className="flex flex-col leading-none items-center">
        <span className="text-[#0F172B] font-semibold">Ahmed Mohammed</span>
        <span className="text-[#0F172B] text-xs sm:text-sm">Web Developer</span>
      </div>
    </div>
  ))}
</div>


    
</section>



<section className="py-12 pt-20 pb-20">
  {/* Header */}
  <div className="text-center mb-8">
    <h2 className="text-4xl font-bold text-[#0F172B]">
Ready to Start Your Learning<br/>
Journey?    </h2>
    <p className="text-lg text-gray-600 mt-2  text-[#45556C]">
     Join thousands of successful students and start learning the skills you need<br/>
to achieve your career goals
    </p>
  </div>

    {/* button */}
            <div className="flex flex-wrap justify-center items-center gap-4">
              <button className="bg-[#0F4C4A] text-white px-6 py-2 rounded-lg hover:bg-white hover:text-[#231D17] transition flex items-center space-x-2">
                <span>Start Free Now</span>
                
              </button>
              <button className="bg-white text-[#231D17] px-6 py-2 rounded-lg hover:bg-[#0F4C4A] hover:text-white transition border border-[#56A39A]">
                Contact Us
              </button>
            </div>
</section>
    </div>
  );
};

export default Landing;
