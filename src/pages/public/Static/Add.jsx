import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import CourseCard from "../Landing/components/CourseCard";
import MetricItem from "../Landing/components/MetricItem";
import  {  useState } from "react";




  const Add = () => {

     const [search, setSearch] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();
    alert(`Searching for: ${search}`);
  };
    const thirdCardsData = [
  {
    header: "Top Instructor",
    image: "/images/user1.jpg",
    count: "20k+"
  },
  {
    header: "Best Courses",
    image: "/images/user2.jpg",
    count: "15k+"
  },
  {
    header: "Happy Students",
    image: "/images/user3.jpg",
    count: "50k+"
  },

];
    
  const cardsData2 = [
  {
    image: "/images/card5.png",
    title: "Python for Beginners",
    subtitle: "Beginner",
    starWord: "★",
    leftWord: "Duration: 2mo",
    rightWord: "Level: Easy",
    buttonText: "Enroll Now"
  },
  {
    image: "/images/card6.png",
    title: "Advanced CSS ",
    subtitle: "Intermediate",
    starWord: "★",
    leftWord: "Duration: 1.5mo",
    rightWord: "Level: Medium",
    buttonText: "Enroll Now"
  },
  {
    image: "/images/card7.png",
    title: "Machine Learning",
    subtitle: "Advanced",
    starWord: "★",
    leftWord: "Duration: 3mo",
    rightWord: "Level: Hard",
    buttonText: "Enroll Now"
  },
  {
    image: "/images/card8.png",
    title: "UI/UX Design",
    subtitle: "Expert",
    starWord: "★",
    leftWord: "Duration: 2mo",
    rightWord: "Level: Expert",
    buttonText: "Enroll Now"
  }
];
    const cardsData = [
  {
    image: "/images/card1.png",
    title: "Course 1",
    subtitle: "Beginner",
    starWord: "★",
    leftWord: "Duration: 3mo",
    rightWord: "Level: Easy"
  },
  {
    image: "/images/card2.png",
    title: "Course 2",
    subtitle: "Intermediate",
    starWord: "★",
    leftWord: "Duration: 2mo",
    rightWord: "Level: Medium"
  },
  {
    image: "/images/card3.png",
    title: "Course 3",
    subtitle: "Advanced",
    starWord: "★",
    leftWord: "Duration: 1mo",
    rightWord: "Level: Hard"
  },
  {
    image: "/images/card4.png",
    title: "Course 4",
    subtitle: "Expert",
    starWord: "★",
    leftWord: "Duration: 4mo",
    rightWord: "Level: Expert"
  }
];


    const CourseCard = ({ image, title, subtitle, students, rating, leftLabel, rightLabel }) => {
  return (
    <div className="bg-white rounded-lg shadow-lg p-4 flex flex-col gap-4">
      
      {/* ===== Image ===== */}
      {image && (
        <div className="w-full h-40 overflow-hidden rounded-lg">
          <img src={image} alt={title} className="w-full h-full object-cover" />
        </div>
      )}

      {/* ===== Title ===== */}
      <h1 className="text-2xl font-bold text-[#0F172B]">{title}</h1>

      {/* ===== Subtitle ===== */}
      {subtitle && <span className="text-gray-600">{subtitle}</span>}

      {/* ===== Rating ===== */}
      <div className="flex items-center gap-2">
        <span className="text-yellow-400 text-xl">★</span>
        <span className="font-semibold">{rating}</span>
        <span className="text-gray-500 ml-2">{students}</span>
      </div>

      {/* ===== Left & Right Labels ===== */}
      <div className="flex justify-between">
        <span className="text-gray-600">{leftLabel}</span>
        <span className="text-gray-600">{rightLabel}</span>
      </div>
      
    </div>
  );
};

  const navigate = useNavigate();

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add("opacity-100", "translate-y-0");
            entry.target.classList.remove("opacity-0", "translate-y-10");
          }
        });
      },
      { threshold: 0.1 }
    );

    document
      .querySelectorAll(".animate-on-scroll")
      .forEach(el => observer.observe(el));

    return () => observer.disconnect();
  }, []);
  return (


    
    <div className="bg-gradient-to-r from-[#FCFFFE] via-[#F9FEFD] to-[#F5FDFC] overflow-x-hidden">


        <section className="w-full bg-[#1E8A85] py-20">
      <div className="max-w-7xl mx-auto px-6 text-center">
        {/* الهيدر */}
        <h1 className="text-4xl lg:text-4xl font-bold text-white mb-6">
         find your favourite course
        </h1>

        {/* خانة البحث */}
        <form onSubmit={handleSearch} className="flex justify-center gap-2">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by course name..."
            className="w-full max-w-md px-4 py-3 rounded-l-lg focus:outline-none"
          />
          <button
            type="submit"
            className="bg-[#25ADA7] text-white px-6 py-3 rounded-r-lg font-semibold hover:opacity-90 transition"
          >
            Search
          </button>
        </form>
      </div>
    </section>
<h1 className="text-black text-2xl font-bold pb-2 ps-3">Popular Courses</h1>

         <section className="w-full  py-20">
      <div className="max-w-5xl mx-auto px-0">
        
        <div className="rounded-xl text-black grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {cardsData2.map((card, index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow-lg p-4 flex flex-col "
            >
              {/* الصورة */}
              <img
                src={card.image}
                alt={card.title}
                className="w-24 h-24 object-cover rounded mb-4"
              />

              {/* العنوان */}
              <h2 className="text-lg font-bold mb-2">{card.title}</h2>

              {/* الكلمة + نجمة + كلمة */}
              <div className="flex items-center gap-1 mb-2">
              <span className="text-yellow-400">{card.starWord}</span>
                <span className="text-sm">{card.subtitle}</span>
              </div>

              {/* الكلمات تحت */}
              <div className="flex justify-between w-full text-sm text-gray-600 mb-4">
                <span>{card.leftWord}</span>
                <span>{card.rightWord}</span>
              </div>

              {/* الزرار داخل الكرت */}
              <button className="bg-[#176D69] text-white px-3 py-1 rounded-lg font-semibold hover:opacity-90 transition">
  {card.buttonText}
</button>
            </div>
          ))}
        </div>
      </div>
    </section>
 <h1 className="text-black text-2xl font-bold pb-2 ps-3">Categories</h1>

    <section className="w-full  py-20">
      <div className="max-w-7xl mx-auto px-6">
       

        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-6 ">
          {thirdCardsData.map((card, index) => (
            <div
              key={index}
              className="bg-[#1E8A85] rounded-lg shadow-lg p-4 flex flex-col items-center text-center min-h-[300px]"
            >
              <h2 className="self-start text-sm font-semibold text-white mb-25 mt-10">
                {card.header}
              </h2>

              <img
                src={card.image}
                alt={card.header}
                className="w-24 h-24 rounded-full  object-cover self-start"
              />

              {/* الرقم تحت الصورة */}
              <span className="text-xl font-bold text-white self-start ">{card.count}</span>
            </div>
          ))}
        </div>
      </div>
    </section>

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


      

  {/* ===== Popular Courses ===== */}
<h1 className="text-black text-2xl font-bold pb-2 ps-3">New Courses</h1>

      {/* ===== Popular Courses ===== */}
       <section className="w-full bg-[#ECFAFA] py-20">
      <div className="max-w-7xl mx-auto px-6">
      

        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {cardsData.map((card, index) => (
            <div
              key={index}
              className="bg-[#176D69] rounded-lg shadow-lg p-4 flex flex-col "
            >
              {/* الصورة */}
              <img
                src={card.image}
                alt={card.title}
                className="w-24 h-24 object-cover rounded mb-4"
              />

              {/* العنوان */}
              <h2 className="text-lg font-bold mb-2">{card.title}</h2>

              {/* الكلمة + نجمة */}
              <div className="flex items-center gap-1 mb-2">
               <span className="text-yellow-400">{card.starWord}</span>
                <span className="text-sm">{card.subtitle}</span>
              </div>

              {/* الكلمات تحت */}
              <div className="flex justify-between w-full text-sm text-white">
                <span>{card.leftWord}</span>
                <span>{card.rightWord}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>


      
      {/* ===== METRICS ===== */}
      <section className="py-16 bg-gradient-to-r from-[#0F4C4A] to-[#2D7A75] text-white opacity-0 translate-y-10 transition-all duration-1000 animate-on-scroll">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-6xl mx-auto text-center">
          <Metric value="10K+" label="Registered Students" />
          <Metric value="500+" label="Available Courses" />
          <Metric value="1.2K+" label="Expert Instructors" />
          <Metric value="4.9 ★" label="Satisfaction Rate" />
        </div>
      </section>

      {/* ===== STUDENT REVIEWS ===== */}
      <section className="py-20 bg-[#ECFAFA] opacity-0 translate-y-10 transition-all duration-1000 animate-on-scroll">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-[#0F172B]">
            Student Reviews
          </h2>
          <p className="text-gray-600 mt-2">
            Hear from students whose careers have been transformed by our academy
          </p>
        </div>

        <div className="flex justify-center flex-wrap gap-6">
          {[1, 2, 3].map(i => (
            <div
              key={i}
              className="bg-white shadow-lg rounded-lg p-6 max-w-[280px] text-center"
            >
              <div className="text-yellow-400 text-xl mb-3">★★★★★</div>
              <p className="text-gray-600 italic mb-4">
                "The content is very professional and the instructors are experts in their field"
              </p>
              <span className="font-semibold text-[#0F172B]">
                Ahmed Mohammed
              </span>
              <p className="text-sm text-gray-500">Web Developer</p>
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

const Metric = ({ value, label }) => (
  <div>
    <p className="text-4xl font-bold">{value}</p>
    <p className="text-sm opacity-80">{label}</p>
  </div>
);

export default Add;
