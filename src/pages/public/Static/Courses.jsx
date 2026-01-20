import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

/* ================= Course Card ================= */
const CourseCard = ({ image, title, description, level, students, buttonText, onDetailsClick }) => {
  const [favorite, setFavorite] = useState(false);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("favorites")) || [];
    setFavorite(saved.some((item) => item.title === title));
  }, [title]);

  const toggleFavorite = () => {
    let saved = JSON.parse(localStorage.getItem("favorites")) || [];

    if (favorite) {
      saved = saved.filter((item) => item.title !== title);
    } else {
      saved.push({ image, title, description, level, students });
    }

    localStorage.setItem("favorites", JSON.stringify(saved));
    setFavorite(!favorite);
  };

  return (
    <div className="bg-white shadow-lg rounded-lg p-4 flex flex-col cursor-pointer transform transition-transform duration-200 hover:scale-105 hover:shadow-2xl h-full">
      {/* img */}
      <img
        src={image}
        alt={title}
        className="w-full h-40 object-cover rounded-lg mb-4"
      />

      {/* title + favorite */}
      <div className="flex justify-between items-center mb-2 w-full">
        <h3 className="text-lg text-[#0F172B] font-bold text-left">{title}</h3>

        <button
          onClick={(e) => { e.stopPropagation(); toggleFavorite(); }}
          className="focus:outline-none w-8 h-8 flex items-center justify-center"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            className={`w-5 h-5 transition-all duration-300 transform
              ${favorite ? "fill-red-500" : "fill-white stroke-red-500"}
            `}
            strokeWidth="3"
          >
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
          </svg>
        </button>
      </div>

      {/* description */}
      <p className="text-[#176D69] text-sm mb-4 text-left line-clamp-2">
        {description}
      </p>

      {/* level + students */}
      <div className="flex justify-between mb-4 w-full mt-auto">
        <span className="text-[#176D69] text-xs">{level}</span>
        <span className="text-[#176D69] text-xs">{students} Students</span>
      </div>

      {/* button */}
      <button
        onClick={onDetailsClick}
        className="bg-[#0F4C4A] text-white px-4 py-2 rounded hover:bg-white hover:text-[#0F4C4A] hover:border transition font-bold"
      >
        {buttonText}
      </button>
    </div>
  );
};

/* ================= Package Card ================= */
const PackageCard = ({ title, price, features, isMiddle }) => {
  const navigate = useNavigate();

  return (
    <div
      className={`w-[300px] min-h-[30rem] h-auto rounded-3xl p-8 flex flex-col cursor-pointer transform transition-transform duration-200 hover:scale-105 hover:shadow-2xl
        ${isMiddle ? "bg-[#0F4C4A] text-white" : "bg-white border border-[#176D69] text-[#0F4C4A]"} 
      `}
    >
      <div className="flex flex-col items-center mb-6">
        <h3 className="text-2xl ">{title}</h3>
        <p className="text-4xl font-bold mt-2">{price}</p>
      </div>

      <div className="flex flex-col gap-5 mb-6">
        {features.map((feature, idx) => (
          <div key={idx} className="flex items-center gap-2">
            <div className={`w-4 h-4 rounded-full flex items-center justify-center ${isMiddle ? "bg-white" : "bg-[#0F4C4A]"}`}>
              <span className={`text-xs ${isMiddle ? "text-[#0F4C4A]" : "text-white"}`}>✓</span>
            </div>
            <p className={`font-bold text-sm ${isMiddle ? "text-white" : "text-[#176D69]"}`}>{feature}</p>
          </div>
        ))}
      </div>

      <button
        onClick={() => navigate("/login")}
        className={`mt-auto px-10 py-2 rounded-3xl font-bold transition
          ${isMiddle
            ? "bg-[#4FB6B2] text-white hover:bg-white hover:text-[#56A39A]"
            : "bg-white text-[#0F4C4A] hover:bg-[#0F4C4A] hover:text-white border border-[#56A39A]"
          }`}
      >
        Start Now
      </button>
    </div>
  );
};


/* ================= Modal ================= */
const CourseModal = ({ course, onClose }) => {
  if (!course) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl w-11/12 max-w-lg p-6 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-900 font-bold text-xl"
        >
          &times;
        </button>

        <img
          src={course.image}
          alt={course.title}
          className="w-full h-48 object-cover rounded-lg mb-4"
        />

        <h2 className="text-2xl font-bold text-[#0F4C4A] mb-2">{course.title}</h2>
        <p className="text-[#176D69] mb-4">{course.description}</p>
        <div className="flex justify-between mb-4">
          <span className="text-[#176D69] font-semibold">{course.level}</span>
          <span className="text-[#176D69] font-semibold">{course.students} Students</span>
        </div>

        <button
          onClick={onClose}
          className="bg-[#0F4C4A] text-white px-6 py-2 rounded hover:bg-white hover:text-[#0F4C4A] hover:border transition"
        >
          Close
        </button>
      </div>
    </div>
  );
};

/* ================= Page ================= */
const Courses = () => {
  const navigate = useNavigate();
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  const coursesData = [
    { title: "Web Development", description: "Learn HTML, CSS, JavaScript and create professional websites", image: "/images/webdev.jpg", level: "Beginner", students: "2.5K", buttonText: "Details" },
    { title: "Full-Stack", description: "Build complete web apps using React and Node.js", image: "/images/fullstack.jpg", level: "Intermediate", students: "1.2K", buttonText: "Details" },
    { title: "Advanced UI/UX", description: "Design beautiful and intuitive user interfaces", image: "/images/uiux.jpg", level: "Advanced", students: "800", buttonText: "Details" },
    { title: "Data Science ", description: "Learn Python, Pandas, and Data Visualization", image: "/images/datascience.jpg", level: "Beginner", students: "1K", buttonText: "Details" },
    { title: "Machine Learning", description: "Train models and make predictions", image: "/images/ml.jpg", level: "Advanced", students: "900", buttonText: "Details" },
    { title: "React Mastery", description: "Become an expert in React and its ecosystem", image: "/images/react.jpg", level: "Intermediate", students: "1.1K", buttonText: "Details" },
    { title: "UI Design ", description: "Learn reusable design components and patterns", image: "/images/design.jpg", level: "Advanced", students: "700", buttonText: "Details" },
    { title: "Backend Development", description: "Build robust server-side applications with Node.js", image: "/images/backend.jpg", level: "Intermediate", students: "1.3K", buttonText: "Details" },
  ];

  const packagesData = [
    { title: "For Starter", price: "$59", features: ["Feedback Categorization", "Features prioritization", "Real-time collaboration", "Feedback loop notifications", "Essential dev tools integrations"] },
    { title: "For Teams", price: "$99", features: ["Feedback Categorization", "Features prioritization", "Real-time collaboration", "Feedback loop notifications", "Essential dev tools integrations"] },
    { title: "For Company", price: "Custom", features: ["Feedback Categorization", "Feedback loop notifications", "Essential dev tools integrations"] },
  ];

  const filteredCourses = coursesData.filter(course =>
    course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    course.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="px-4">

      {/* Header */}
      <div className="text-center mb-4 pt-5 pb-5">
        <h2 className="text-4xl font-bold mb-4 text-[#0F4C4A] pb-5">Courses</h2>
        <div className="flex flex-wrap gap-4 justify-center">
          {coursesData.map((course, index) => (
            <button
              key={index}
              onClick={() => document.getElementById('courses')?.scrollIntoView({ behavior: 'smooth' })}
              className="bg-white text-[#231D17] px-6 py-1 rounded-lg hover:bg-[#0F4C4A] hover:text-white transition border border-[#56A39A] shadow-sm"
            >
              {course.title}
            </button>
          ))}
        </div>
      </div>


      {/* Search Bar */}
      <div className="flex justify-center mb-6 relative w-full max-w-md mx-auto">
        <input
          type="text"
          placeholder="Search courses..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border border-[#56A39A] rounded-lg px-4 py-2 w-full focus:outline-none text-[#0F4C4A]"
        />
        <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[#0F4C4A] cursor-pointer">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 21l-4.35-4.35M17 11a6 6 0 11-12 0 6 6 0 0112 0z"
            />
          </svg>
        </div>
      </div>


      {/* Courses */}
      <section className="py-16 bg-gray-50/50 rounded-3xl">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 px-2">
          {filteredCourses.length > 0 ? (
            filteredCourses.map((course, index) => (
              <CourseCard
                key={index}
                {...course}
                onDetailsClick={() => setSelectedCourse(course)}
              />
            ))
          ) : (
            <div className="text-center text-[#0F4C4A] col-span-full py-20">
              <p className="text-xl font-semibold">No courses found matching your search.</p>
              <button
                onClick={() => setSearchTerm('')}
                className="mt-4 text-[#4AA59B] hover:underline transition-all"
              >
                Clear all filters
              </button>
            </div>
          )}
        </div>

        {/* Simplified View All Link */}
        <div className="mt-12 text-center">
          <button
            onClick={() => navigate('/login')}
            className="inline-flex items-center gap-3 text-[#0F4C4A] font-extrabold hover:text-[#4AA59B] transition-all group"
          >
            <span className="text-lg">Access all premium student courses</span>
            <div className="w-10 h-10 rounded-full bg-[#F0F9F8] flex items-center justify-center group-hover:bg-[#0F4C4A] group-hover:text-white transition-all transform group-hover:scale-110 shadow-sm group-hover:shadow-md">
              <span className="text-xl">→</span>
            </div>
          </button>
        </div>
      </section>

      {/* Packages */}
      <section className="py-20">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-[#0F4C4A] mb-2">
            Choose your preferable subscription
          </h2>
          <span className="text-[#0F4C4A]">
            We Offer You Different Kind Of Packages
          </span>
        </div>

        <div className="flex flex-wrap justify-center gap-8">
          {packagesData.map((pkg, index) => (
            <PackageCard
              key={index}
              {...pkg}
              isMiddle={index === 1} // الكارت الأوسط
            />
          ))}
        </div>

      </section>

      {/* CTA */}
      <section className="py-20 text-center">
        <h2 className="text-4xl font-bold text-[#0F172B] mb-4">
          Ready to Start Your Learning Journey?
        </h2>

        <p className="text-gray-600 mb-8">
          Join thousands of successful students
        </p>

        <div className="flex justify-center gap-4">
          <button
            onClick={() => navigate("/login")}
            className="bg-[#0F4C4A] text-white px-8 py-3 rounded-lg font-bold hover:bg-white hover:text-[#231D17] transition"
          >
            Start Free Now
          </button>

          <button
            onClick={() => navigate("/login")}
            className="bg-white text-[#231D17] px-8 py-3 rounded-lg hover:bg-[#0F4C4A] hover:text-white transition border border-[#56A39A] font-bold"
          >
            Start Now
          </button>
        </div>
      </section>

      {/* Modal */}
      {selectedCourse && (
        <CourseModal
          course={selectedCourse}
          onClose={() => setSelectedCourse(null)}
        />
      )}
    </div>
  );
};

export default Courses;
