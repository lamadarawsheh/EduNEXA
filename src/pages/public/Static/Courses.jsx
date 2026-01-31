import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { X, Star, Users, Info, CheckCircle2, PlayCircle, Search, Filter, Heart } from "lucide-react";
import { getApprovedCourses, getCategoriesWithSubcategories, BaseURL, isWorkingUrl, toggleCourseFavorite, formatDuration } from "../../../services/courseService";
import Swal from 'sweetalert2';
import CourseModal from "../../../components/common/CourseModal";

const checkAuth = () => {
  const token = localStorage.getItem('token');
  if (!token) {
    Swal.fire({
      title: 'Login Required',
      text: 'Please log in first to access this feature.',
      icon: 'info',
      confirmButtonColor: '#0F4C4A',
      showCancelButton: true,
      confirmButtonText: 'Login Now',
      cancelButtonText: 'Cancel'
    }).then((result) => {
      if (result.isConfirmed) {
        window.location.href = '/login';
      }
    });
    return false;
  }
  return true;
};

/* ================= Course Card ================= */
const CourseCard = ({ id, image, title, description, level, students, instructor, price, subCategory, onDetailsClick, isFavorite }) => {
  const [favorite, setFavorite] = useState(isFavorite);
  const navigate = useNavigate();

  // Sync state if prop changes (e.g. after refetch)
  useEffect(() => {
    setFavorite(isFavorite);
  }, [isFavorite]);

  const toggleFavorite = (e) => {
    e.stopPropagation();
    if (checkAuth()) {
      toggleCourseFavorite(id).then(() => {
        setFavorite(!favorite);
        Swal.fire({
          toast: true,
          position: 'top-end',
          icon: 'success',
          title: 'Favorites updated',
          showConfirmButton: false,
          timer: 2000
        });
      });
    }
  };

  return (
    <div
      className="flex flex-col bg-white border border-transparent shadow-lg rounded-2xl p-4 w-full group transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 cursor-pointer relative overflow-hidden"
      onClick={onDetailsClick}
    >
      <div className="absolute top-0 right-0 w-24 h-24 bg-[#4AA59B]/5 rounded-full -mr-12 -mt-12 group-hover:scale-150 transition-transform duration-700"></div>

      <div className="relative overflow-hidden rounded-xl mb-4 h-36">
        <img
          src={(image && isWorkingUrl(image)) ? (image.startsWith('http') ? image : `${BaseURL}/${image.replace(/^\//, '')}`) : "/course_placeholder.png"}
          alt={title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
          onError={(e) => { e.target.src = "/course_placeholder.png"; }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
        <div className="absolute top-3 right-3 z-20">
          <button
            onClick={toggleFavorite}
            className={`p-2 rounded-full backdrop-blur-md transition-all duration-300 transform active:scale-90 ${favorite
              ? 'bg-red-500 text-white shadow-lg'
              : 'bg-white/80 text-gray-400 hover:text-red-500 hover:bg-white'
              }`}
          >
            <Heart size={16} fill={favorite ? "currentColor" : "none"} />
          </button>
        </div>
        <div className="absolute top-3 left-3 flex flex-col gap-1.5">
          <span className="bg-white/95 backdrop-blur-sm px-2 py-1 rounded-md text-[8px] font-black text-[#0F4C4A] shadow-md uppercase tracking-wider leading-none border border-[#0F4C4A]/5">{level}</span>
          <span className="bg-[#4AA59B]/90 backdrop-blur-sm px-1.5 py-0.5 rounded-md text-[7px] font-bold text-white shadow-md uppercase tracking-wider leading-none">{subCategory || "Education"}</span>
        </div>
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="bg-white/20 backdrop-blur-md p-3 rounded-full border border-white/30 text-white transform scale-90 group-hover:scale-100 transition-transform duration-300">
            <PlayCircle size={32} />
          </div>
        </div>
      </div>

      <span className="text-[#0F172B] font-black text-lg mb-2 leading-tight group-hover:text-[#4AA59B] transition-colors line-clamp-1">{title}</span>
      <p className="text-gray-500 text-xs mb-4 line-clamp-2 leading-relaxed font-medium">{description}</p>

      <div className="flex items-center gap-3 py-3 border-t border-gray-50 mt-auto">
        <div className="flex items-center gap-1 text-yellow-500 font-bold text-xs">
          <Star size={12} fill="currentColor" />
          <span>4.5</span>
        </div>
        <div className="flex items-center gap-1 text-gray-400 font-semibold text-[10px] border-l border-gray-100 pl-3">
          <Users size={12} />
          <span>{(students || 0).toLocaleString()}</span>
        </div>
        <div className="ml-auto">
          <span className="text-[#0F4C4A] font-black text-base">${price}</span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-2 mt-4 relative z-10">
        <button
          onClick={(e) => { e.stopPropagation(); onDetailsClick(); }}
          className="bg-white text-[#0F4C4A] border border-[#0F4C4A]/10 py-2.5 rounded-xl font-bold text-[10px] hover:bg-[#F0F9F8] transition-all shadow-sm active:scale-95 transform"
        >
          Preview
        </button>
        <button
          onClick={(e) => {
            e.stopPropagation();
            if (checkAuth()) {
              navigate(`/student/checkout/${id}`);
            }
          }}
          className="bg-[#0F4C4A] text-white py-2.5 rounded-xl font-bold text-[10px] hover:bg-[#4AA59B] transition-all shadow-md active:scale-95 transform"
        >
          Enroll Now
        </button>
      </div>
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
  // Get Courses & Favorites
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [courseRes, favRes] = await Promise.all([
          getApprovedCourses(),
          localStorage.getItem('token') ? getFavoriteCourses() : Promise.resolve({ data: [] })
        ]);

        const favIds = new Set(favRes.data?.map(c => c.id) || []);

        const coursesWithFav = courseRes.data.map(c => {
          // Normalize subCategoryId (API returns both subCategoryID and subCategoryId)
          const normalizedSubCategoryId = c.subCategoryId || c.subCategoryID || c.subcategoryId || c.subcategoryID;

          return {
            ...c,
            subCategoryId: normalizedSubCategoryId,
            isFavorite: favIds.has(c.id)
          };
        });

        setCourses(coursesWithFav);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Get Categories and their Subcategories in one call
  useEffect(() => {
    getCategoriesWithSubcategories()
      .then((res) => {
        // Normalize subcategory IDs to ensure consistent 'id' field
        const normalizedCats = res.data.map(cat => ({
          ...cat,
          subCategories: (cat.subCategories || []).map(sub => ({
            ...sub,
            id: sub.id || sub.subCategoryID || sub.subCategoryId || sub.subcategoryID || sub.subcategoryId
          }))
        }));

        setCategories(normalizedCats);
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
    const matchesSubcategory = selectedSubcategory ? course.subCategoryId === selectedSubcategory : true;
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
                id={course.id}
                image={course.thumbnailUrl}
                title={course.title}
                instructor={course.instructorName}
                description={course.description}
                level={course.level}
                price={course.price}
                students={course.studentCount}
                subCategory={course.categoryName}
                isFavorite={course.isFavorite} // Pass favorite status
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
