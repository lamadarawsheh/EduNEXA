import React, { useEffect, useState } from "react";
import { getApprovedCourses } from "../../../services/courseService";
import { useNavigate } from "react-router-dom";
import axios from "axios";

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
      <img
        src={image}
        alt={title}
        className="w-full h-40 object-cover rounded-lg mb-4"
      />

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

      <p className="text-[#176D69] text-sm mb-4 text-left line-clamp-2">
        {description}
      </p>

      <div className="flex justify-between mb-4 w-full mt-auto">
        <span className="text-[#176D69] text-xs">{level}</span>
        <span className="text-[#176D69] text-xs">{students} Students</span>
      </div>

      <button
        onClick={onDetailsClick}
        className="bg-[#0F4C4A] text-white px-4 py-2 rounded hover:bg-white hover:text-[#0F4C4A] hover:border transition font-bold"
      >
        {buttonText || "Details"}
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
      <div className="bg-white rounded-xl p-6 w-11/12 max-w-lg relative">
        <button onClick={onClose} className="absolute top-3 right-4 text-xl">×</button>

        <img src={course.thumbnailUrl} alt={course.title} className="w-full h-48 object-cover rounded mb-4" />

        <h2 className="text-2xl font-bold mb-2">{course.title}</h2>
        <p className="text-[#176D69] mb-4">{course.description}</p>

        <div className="flex justify-between text-sm">
          <span>{course.level}</span>
          <span>{course.studentsCount} Students</span>
        </div>
      </div>
    </div>
  );
};

/* ================= Page ================= */
const Courses = () => {
  const navigate = useNavigate();
  const [courses, setCourses] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);

  // Categories & Subcategories
  const [categories, setCategories] = useState([]);
  const [subcategories, setSubcategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedSubcategory, setSelectedSubcategory] = useState("");

  // Packages Data
  const packagesData = [
    { title: "For Starter", price: "$59", features: ["Feedback Categorization", "Features prioritization", "Real-time collaboration", "Feedback loop notifications", "Essential dev tools integrations"] },
    { title: "For Teams", price: "$99", features: ["Feedback Categorization", "Features prioritization", "Real-time collaboration", "Feedback loop notifications", "Essential dev tools integrations"] },
    { title: "For Company", price: "Custom", features: ["Feedback Categorization", "Feedback loop notifications", "Essential dev tools integrations"] },
  ];

  /* ================= API Calls ================= */
  // Get Courses
  useEffect(() => {
    getApprovedCourses()
      .then((res) => {
        setCourses(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  // Get Categories
  useEffect(() => {
    axios
      .get("http://edunexa.runasp.net/api/Category/fafc90eb-f4bf-4650-c5bd-08de4de279c5")
      .then((res) => setCategories(res.data))
      .catch((err) => console.error(err));
  }, []);

  // Get Subcategories based on selected category
  useEffect(() => {
    if (!selectedCategory) return;
    axios
      .get(`http://edunexa.runasp.net/api/SubCategory?categoryId=${selectedCategory}`)
      .then((res) => setSubcategories(res.data))
      .catch((err) => console.error(err));
  }, [selectedCategory]);

  // Filter Courses
  const filteredCourses = courses.filter((course) => {
    const matchesSearch = course.title?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory ? course.categoryId === selectedCategory : true;
    const matchesSubcategory = selectedSubcategory ? course.subcategoryId === selectedSubcategory : true;
    return matchesSearch && matchesCategory && matchesSubcategory;
  });

  // Popular Courses (static display)
  const popularCourses = [
    "Web Development",
    "Full-Stack",
    "Advanced UI/UX",
    "Data Science",
    "Machine Learning",
    "React Mastery",
    "UI Design",
    "Backend Development",
     "Machine Learning",
    "React Mastery",
    "UI Design",
    "Backend Development"
  ];

  return (
    <div className="px-4">
      {/* Header */}
      <div className="text-center py-10">
        <h2 className="text-4xl font-bold text-[#0F4C4A]">Courses</h2>
      </div>

      {/* Popular Courses */}
      <section className="py-4 pb-15">
        <div className="flex flex-wrap justify-center gap-4">
          {popularCourses.map((course, index) => (
            <div
              key={index}
              className="px-4 py-1 bg-white text-black border cursor-pointer hover:bg-[#0F4C4A] hover:text-white rounded-xl transition"
            >
              {course}
            </div>
          ))}
        </div>
      </section>

      {/* Categories & Subcategories Filter */}
      <div className="flex justify-center gap-4 mb-6">
        <select
          value={selectedCategory}
          onChange={(e) => { setSelectedCategory(e.target.value); setSelectedSubcategory(""); }}
          className="border px-4 py-2 rounded"
        >
          <option value="">Select Category</option>
          {categories.map((cat) => (
            <option key={cat.id} value={cat.id}>{cat.name}</option>
          ))}
        </select>

        <select
          value={selectedSubcategory}
          onChange={(e) => setSelectedSubcategory(e.target.value)}
          className="border px-4 py-2 rounded"
          disabled={!selectedCategory}
        >
          <option value="">Select Subcategory</option>
          {subcategories.map((sub) => (
            <option key={sub.id} value={sub.id}>{sub.name}</option>
          ))}
        </select>
      </div>

      {/* Search Input */}
      <div className="flex justify-center mb-8">
        <input
          type="text"
          placeholder="Search courses..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border border-black rounded-xl text-black px-4 py-2 w-full max-w-md"
        />
      </div>

      {/* Courses Grid */}
      <section className="py-16 bg-gray-50 rounded-3xl">
        {loading ? (
          <p className="text-center">Loading...</p>
        ) : filteredCourses.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {filteredCourses.map((course) => (
              <CourseCard
                key={course.id}
                image={course.thumbnailUrl}
                title={course.title}
                description={course.description}
                level={course.level}
                students={course.studentsCount}
                onDetailsClick={() => setSelectedCourse(course)}
              />
            ))}
          </div>
        ) : (
          <div className="text-center text-[#0F4C4A] py-20">
            <p className="text-xl font-semibold">No courses found matching your search.</p>
            <button
              onClick={() => setSearchTerm('')}
              className="mt-4 text-[#4AA59B] hover:underline transition-all"
            >
              Clear all filters
            </button>
          </div>
        )}
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
              isMiddle={index === 1}
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
