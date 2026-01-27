import React, { useEffect, useRef,useState } from "react";
import { useNavigate } from "react-router-dom";

import { Zap, BookOpen, Users } from "lucide-react";

import FeatureCard from "./components/FeatureCard";
import CourseCard from "./components/CourseCard";
import MetricItem from "./components/MetricItem";

const Landing = () => {
  const navigate = useNavigate();
  const [courses, setCourses] = useState([]);

  

  // Simple intersection observer for fade-in animations -> reusing existing code logic for brevity in replace
  const observerCallback = (entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('opacity-100', 'translate-y-0');
        entry.target.classList.remove('opacity-0', 'translate-y-10');
      }
    });
  };

  useEffect(() => {
    const observer = new IntersectionObserver(observerCallback, { threshold: 0.1 });
    document.querySelectorAll('.animate-on-scroll').forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
  fetch("https://YOUR_API_URL_HERE")
    .then((response) => response.json())
    .then((data) => {
      setCourses(data);
      console.log(data); // بس للتأكد
    })
    .catch((error) => {
      console.error("Error fetching courses:", error);
    });
}, []);


  return (
    <div className="bg-gradient-to-r from-[#FCFFFE] via-[#F9FEFD] to-[#F5FDFC] text-black overflow-x-hidden">

      {/* ===== Hero Section ===== */}
      <section className="px-4 lg:px-0 py-10 sm:py-20 opacity-0 translate-y-10 transition-all duration-1000 ease-out animate-on-scroll">
        <div className="grid grid-cols-1 lg:grid-cols-2 w-full max-w-[90%] lg:max-w-[80%] mx-auto gap-8 items-center">

          {/* ===== Image ===== */}
          <div className="order-1 lg:order-2 flex justify-center items-center w-full">
            <img
              src="/image 1.png"
              alt="Hero"
              className="w-full sm:w-[80%] md:w-full max-h-[50vh] md:max-h-[80vh] object-contain rounded-lg drop-shadow-xl"
            />
          </div>

          {/* ===== Texts ===== */}
          <div className="order-2 lg:order-1 flex flex-col justify-center items-center lg:items-start space-y-6 text-center lg:text-left">
            <div className="space-y-2">
              <h1 className="text-5xl md:text-6xl font-bold flex flex-wrap justify-center lg:justify-start">
                <span className="text-[#1A2A80]">Learn </span>
                <span className="text-[#0F172B] ps-3">New</span>
              </h1>
              <h1 className="text-5xl md:text-6xl font-bold flex flex-wrap justify-center lg:justify-start">
                <span className="text-[#0F172B]">Skills </span>
                <span className="text-[#0F4C4A] ps-3">Now</span>
              </h1>
            </div>

            <p className="text-black text-base md:text-lg leading-relaxed max-w-md">
              Join thousands of students who are developing their
              skills through our specialized courses and
              comprehensive educational content.
            </p>

            <div className="flex flex-wrap justify-center lg:justify-start items-center gap-4 w-full">
              <div className="flex flex-wrap justify-center items-center gap-4">
                <button
                  onClick={() => navigate('/login')}
                  className="bg-[#0F4C4A] text-white px-6 py-2 rounded-lg hover:bg-white hover:text-[#231D17] transition flex items-center space-x-2 shadow-md"
                >
                  <span>Start Now</span>
                  <span className="text-2xl">→</span>
                </button>
                <button
                  onClick={() => document.getElementById('courses')?.scrollIntoView({ behavior: 'smooth' })}
                  className="bg-white text-[#231D17] px-6 py-2 rounded-lg hover:bg-[#0F4C4A] hover:text-white transition border border-[#56A39A] shadow-sm"
                >
                  Learn More
                </button>
              </div>

              <div className="flex flex-wrap justify-center items-center gap-8 pt-4 md:pt-0">
                <div className="flex flex-col items-center lg:items-start">
                  <span className="font-bold text-3xl text-black">10K+</span>
                  <span className="text-gray-600 text-sm">Active Students</span>
                </div>
                <div className="flex flex-col items-center lg:items-start">
                  <span className="font-bold text-3xl text-black">500+</span>
                  <span className="text-gray-600 text-sm">Courses</span>
                </div>
                <div className="flex flex-col items-center lg:items-start">
                  <div className="flex items-center space-x-1 justify-center lg:justify-start">
                    <span className="font-bold text-3xl text-black">4.9</span>
                    <span className="text-yellow-400 text-xl">★</span>
                  </div>
                  <span className="text-gray-600 text-sm">Excellent Rating</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== Why Choose Our Academy? ===== */}
      <section className="py-16 bg-white opacity-0 translate-y-10 transition-all duration-1000 ease-out animate-on-scroll">
        <div className="text-center mb-12 px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-[#0F172B]">
            Why Choose Our Academy?
          </h2>
          <p className="text-sm md:text-lg text-gray-600 mt-2 max-w-2xl mx-auto">
            We provide a comprehensive learning experience with the best instructors
            and advanced content
          </p>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-6 px-4">
          <FeatureCard
            Icon={Zap}
            title="Fast & Effective Learning"
            desc="Focused and practical content that helps you acquire skills quickly"
          />
          <FeatureCard
            Icon={Users}
            title="Expert Instructors"
            desc="Learn from industry professionals with years of practical experience"
          />
          <FeatureCard
            Icon={BookOpen}
            title="Comprehensive Content"
            desc="Deep dive into every topic with our well-structured curriculum"
          />
        </div>
      </section>

      {/* ===== Popular Courses ===== */}
      <section id="courses" className="py-16 bg-gray-50/50 opacity-0 translate-y-10 transition-all duration-1000 ease-out animate-on-scroll">
        <div className="text-center mb-12 px-4">
          <h2 className="text-4xl font-bold text-[#0F172B]">
            Popular Courses
          </h2>
          <p className="text-lg text-gray-600 mt-2">
            Choose from hundreds of specialized courses in different fields
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto px-6">
          {courses.map((course) => (
  <CourseCard
    key={course.id}
    title={course.title}
    students={course.students}
    level={course.level}
  />
))}

        </div>

        {/* Simplified View All Link */}
        <div className="mt-12 text-center">
          <button
            onClick={() => navigate('/login')}
            className="inline-flex items-center gap-3 text-[#0F4C4A] font-extrabold hover:text-[#4AA59B] transition-all group"
          >
            <span className="text-lg">Browse all available courses</span>
            <div className="w-10 h-10 rounded-full bg-[#F0F9F8] flex items-center justify-center group-hover:bg-[#0F4C4A] group-hover:text-white transition-all transform group-hover:scale-110 shadow-sm group-hover:shadow-md">
              <span className="text-xl">→</span>
            </div>
          </button>
        </div>
      </section>

      {/* ===== Metrics Section ===== */}
      <section className="py-16 bg-gradient-to-r from-[#0F4C4A] via-[#0F4C4A] to-[#2D7A75] text-white opacity-0 translate-y-10 transition-all duration-1000 ease-out animate-on-scroll">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-6xl mx-auto px-4">
          <MetricItem value="10K+" label="Registered Students" />
          <MetricItem value="500+" label="Available Courses" />
          <MetricItem value="1.2K+" label="Expert Instructors" />
          <MetricItem value="4.9" label="Satisfaction Rate" />
        </div>
      </section>

      {/* ===== Student Reviews ===== */}
      <section className="py-20 bg-[#ECFAFA] opacity-0 translate-y-10 transition-all duration-1000 ease-out animate-on-scroll">
        <div className="text-center mb-12 px-4">
          <h2 className="text-4xl font-bold text-[#0F172B]">
            Student Reviews
          </h2>
          <p className="text-lg text-gray-600 mt-2">
            Hear from students whose careers have been transformed by our academy
          </p>
        </div>

        {/* ===== Grid for courses: 4 per row ===== */}
        <div className="flex justify-center flex-wrap gap-6 px-4">
          {[1, 2, 3].map((_, idx) => (
            <div key={idx} className="bg-white flex flex-col border border-transparent shadow-lg gap-2 rounded-lg p-6 w-full max-w-[280px]">
              <div className="flex mb-2 space-x-1 justify-center">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className="text-yellow-400 text-xl">★</span>
                ))}
              </div>
              <p className="text-[#45556C] text-sm text-center mb-4 leading-relaxed italic">
                "The content is very professional and the instructors are experts in their field"
              </p>
              <div className="flex flex-col items-center">
                <span className="text-[#0F172B] font-semibold text-lg">Ahmed Mohammed</span>
                <span className="text-[#0F172B] text-xs">Web Developer</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ===== CTA Section ===== */}
      <section className="py-20 text-center px-4 opacity-0 translate-y-10 transition-all duration-1000 ease-out animate-on-scroll">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-4xl font-bold text-[#0F172B] mb-4">
            Ready to Start Your Learning Journey?
          </h2>
          <p className="text-lg text-gray-600 mb-8 max-w-xl mx-auto">
            Join thousands of successful students and start learning the skills you need
            to achieve your career goals
          </p>
          <div className="flex flex-wrap justify-center items-center gap-4">
            <button
              onClick={() => navigate('/login')}
              className="bg-[#0F4C4A] text-white px-8 py-3 rounded-lg hover:bg-white hover:text-[#231D17] transition font-bold shadow-lg"
            >
              Start Free Now
            </button>
            <button
              onClick={() => navigate('/login')}
              className="bg-white text-[#231D17] px-8 py-3 rounded-lg hover:bg-[#0F4C4A] hover:text-white transition border border-[#56A39A] font-bold"
            >
              Start Now
            </button>
          </div>
        </div>
      </section>

    </div>
  );
};


export default Landing;
