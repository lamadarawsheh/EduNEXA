import React, { useEffect, useState } from "react";
import { getApprovedCourses, getCategoriesWithSubcategories } from "../../../services/courseService";
import { useNavigate } from "react-router-dom";
import { X, Star, Users, Info, CheckCircle2, PlayCircle, Search, Filter } from "lucide-react";

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
      className={`w-full max-w-[320px] min-h-[30rem] h-auto rounded-3xl p-6 sm:p-8 flex flex-col cursor-pointer transform transition-transform duration-200 hover:scale-105 hover:shadow-2xl
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
    <div
      className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-[100] p-4 animate-in fade-in duration-300"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-[24px] md:rounded-[32px] w-full max-w-2xl max-h-[90vh] overflow-y-auto md:overflow-hidden shadow-2xl relative animate-in zoom-in-95 duration-300"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 md:top-6 md:right-6 p-2 bg-white/80 hover:bg-white rounded-full text-gray-500 hover:text-[#0F4C4A] shadow-lg transition-all z-20"
        >
          <X size={20} className="md:w-6 md:h-6" />
        </button>

        <div className="flex flex-col md:flex-row h-full">
          {/* Image Side */}
          <div className="md:w-1/2 relative h-48 sm:h-64 md:h-auto shrink-0">
            <img
              src={course.thumbnailUrl}
              alt={course.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
            <div className="absolute bottom-4 left-4 md:bottom-6 md:left-6 text-white text-left">
              <span className="bg-[#4AA59B] px-2 py-0.5 md:px-3 md:py-1 rounded-full text-[9px] md:text-[10px] font-bold uppercase tracking-wider mb-2 inline-block">
                Course Details
              </span>
              <div className="flex items-center gap-2">
                <PlayCircle size={24} className="md:w-8 md:h-8 text-white fill-white/20" />
                <span className="font-bold text-sm md:text-base">View Syllabus</span>
              </div>
            </div>
          </div>

          {/* Content Side */}
          <div className="md:w-1/2 p-6 md:p-8 flex flex-col text-left">
            <div className="flex items-center gap-2 mb-3 md:mb-4">
              <span className="bg-[#F0F9F8] text-[#0F4C4A] px-2 py-0.5 md:px-3 md:py-1 rounded-lg text-[9px] md:text-[10px] font-black uppercase tracking-widest leading-none border border-[#0F4C4A]/5">
                {course.categoryName || "Education"}
              </span>
              <span className="text-gray-300 text-xs font-bold">●</span>
              <span className="text-[#4AA59B] text-[9px] md:text-[10px] font-black uppercase tracking-widest">
                {course.level}
              </span>
            </div>

            <h2 className="text-xl md:text-2xl font-black text-[#0F172B] mb-3 md:mb-4 leading-tight">
              {course.title}
            </h2>

            <div className="flex flex-wrap items-center gap-4 md:gap-6 mb-4 md:mb-6">
              <div className="flex items-center gap-1.5">
                <Star size={16} fill="#EAB308" className="text-yellow-500 md:w-4.5 md:h-4.5" />
                <span className="font-bold text-[#0F172B] text-sm md:text-base">{(course.rating || 4.8)}</span>
              </div>
              <div className="flex items-center gap-1.5 text-gray-500">
                <Users size={16} className="md:w-4.5 md:h-4.5" />
                <span className="font-bold text-sm md:text-base">{(course.studentsCount || 0).toLocaleString()}</span>
              </div>
            </div>

            <div className="space-y-2.5 md:space-y-3 mb-6 md:mb-8 overflow-y-auto max-h-[150px] pr-2 custom-scrollbar">
              <h4 className="text-xs md:text-sm font-black text-[#0F4C4A] uppercase tracking-wider mb-2 flex items-center gap-2">
                <Info size={14} className="md:w-4 md:h-4" /> About this course
              </h4>
              <p className="text-xs md:text-sm text-gray-600 leading-relaxed mb-4">
                {course.description}
              </p>
              {[
                "Master fundamental concepts",
                "Hands-on projects and labs",
                "Industry recognized standards"
              ].map((feature, i) => (
                <div key={i} className="flex items-start gap-2 text-xs md:text-sm text-gray-600">
                  <CheckCircle2 size={14} className="text-[#4AA59B] mt-0.5 shrink-0 md:w-4 md:h-4" />
                  <span>{feature}</span>
                </div>
              ))}
            </div>

            <div className="mt-auto pt-4 md:pt-6 border-t border-gray-100 flex items-center justify-between gap-4">
              <div className="shrink-0">
                <p className="text-[9px] md:text-[10px] text-gray-400 font-bold uppercase tracking-widest mb-0.5 md:mb-1">Investment</p>
                <span className="text-xl md:text-2xl font-black text-[#0F4C4A]">${course.price || "Free"}</span>
              </div>
              <button
                onClick={() => window.location.href = '/login'}
                className="flex-1 max-w-[160px] bg-[#0F4C4A] text-white py-3 md:py-4 rounded-xl md:rounded-2xl font-black text-xs md:text-sm hover:bg-[#4AA59B] transition-all shadow-lg shadow-[#0F4C4A]/20 active:scale-95 transform"
              >
                Enroll Now
              </button>
            </div>
          </div>
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

  // Benefits Data
  const benefitsData = [
    {
      title: "Expert Instruction",
      price: "Pure Quality",
      features: ["Learn from industry veterans", "Real-world projects", "Direct mentorship", "Live Q&A sessions", "Up-to-date curriculum"]
    },
    {
      title: "Lifetime Access",
      price: "One-Time Pay",
      features: ["No monthly subscriptions", "Learn at your own pace", "Downloadable resources", "Certificate on completion", "Community forum access"]
    },
    {
      title: "Career Growth",
      price: "Full Support",
      features: ["Job placement assistance", "Resume building workshops", "Mock interviews", "Portfolio reviews", "Networking events"]
    },
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

  // Get Categories and their Subcategories in one call
  useEffect(() => {
    getCategoriesWithSubcategories()
      .then((res) => {
        setCategories(res.data);
      })
      .catch((err) => console.error("Error fetching categories catalog:", err));
  }, []);

  // Update subcategories list locally whenever category changes
  useEffect(() => {
    if (!selectedCategory) {
      setSubcategories([]);
      return;
    }
    const foundCategory = categories.find(cat => cat.id === selectedCategory);
    if (foundCategory && foundCategory.subCategories) {
      setSubcategories(foundCategory.subCategories);
    } else {
      setSubcategories([]);
    }
  }, [selectedCategory, categories]);

  // Filter Courses
  const filteredCourses = courses.filter((course) => {
    const matchesSearch = course.title?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory ? course.categoryId === selectedCategory : true;
    const matchesSubcategory = selectedSubcategory ? course.subcategoryId === selectedSubcategory : true;
    return matchesSearch && matchesCategory && matchesSubcategory;
  });


  return (
    <div className="px-4">
      {/* Header */}
      <div className="text-center py-10">
        <h2 className="text-4xl font-bold text-[#0F4C4A]">Courses</h2>
      </div>

      {/* Filters Section */}
      <div className="max-w-4xl mx-auto mb-12">
        <div className="flex flex-col md:flex-row gap-4 items-center justify-center p-4 bg-white rounded-2xl shadow-sm border border-gray-100">

          <div className="relative flex-1 w-full">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input
              type="text"
              placeholder="Search courses..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-gray-50 border-none rounded-xl focus:ring-2 focus:ring-[#4AA59B] transition-all font-medium text-gray-700"
            />
          </div>

          <div className="flex gap-2 w-full md:w-auto">
            <div className="relative flex-1 md:w-48">
              <select
                value={selectedCategory}
                onChange={(e) => { setSelectedCategory(e.target.value); setSelectedSubcategory(""); }}
                className="w-full appearance-none bg-gray-50 border-none px-4 py-3 rounded-xl focus:ring-2 focus:ring-[#4AA59B] transition-all font-bold text-[#0F4C4A] cursor-pointer"
              >
                <option value="">All Categories</option>
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.id}>{cat.name}</option>
                ))}
              </select>
            </div>

            <div className="relative flex-1 md:w-48">
              <select
                value={selectedSubcategory}
                onChange={(e) => setSelectedSubcategory(e.target.value)}
                className="w-full appearance-none bg-gray-50 border-none px-4 py-3 rounded-xl focus:ring-2 focus:ring-[#4AA59B] transition-all font-bold text-[#0F4C4A] cursor-pointer disabled:opacity-50"
                disabled={!selectedCategory}
              >
                <option value="">All Subcategories</option>
                {subcategories.map((sub) => (
                  <option key={sub.id} value={sub.id}>{sub.name}</option>
                ))}
              </select>
            </div>
          </div>

          {searchTerm && (
            <button
              onClick={() => { setSearchTerm(""); setSelectedCategory(""); setSelectedSubcategory(""); }}
              className="text-[#4AA59B] font-bold text-sm hover:underline px-2"
            >
              Reset
            </button>
          )}
        </div>
      </div>

      {/* Courses Grid */}
      <section className="py-16 bg-gray-50 rounded-3xl">
        {loading ? (
          <p className="text-center py-10">Loading...</p>
        ) : filteredCourses.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8 px-4 sm:px-6">
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

      {/* Benefits Section */}
      <section className="py-20">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-[#0F4C4A] mb-2">
            Why start your journey here?
          </h2>
          <span className="text-[#0F4C4A]">
            Discover the unique advantages of learning with EduNEXA
          </span>
        </div>

        <div className="flex flex-wrap justify-center gap-8">
          {benefitsData.map((benefit, index) => (
            <PackageCard
              key={index}
              {...benefit}
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
      {
        selectedCourse && (
          <CourseModal
            course={selectedCourse}
            onClose={() => setSelectedCourse(null)}
          />
        )
      }
    </div >
  );
};

export default Courses;
