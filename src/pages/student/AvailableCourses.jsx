import React, { useState, useEffect } from 'react';
import { Search, Star, Users, X, Info, CheckCircle2, PlayCircle, Heart } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import Swal from 'sweetalert2';
import { getApprovedCourses, getNewestCourses, getPopularCourses, getCategoriesWithSubcategories, BaseURL, isWorkingUrl, toggleCourseFavorite, formatDuration, getFavoriteCourses } from '../../services/courseService';
import CourseModal from '../../components/common/CourseModal';

const checkAuth = () => {
    const token = localStorage.getItem('token');
    if (!token) {
        Swal.fire({
            title: 'Login Required',
            text: 'Please log in first to access this feature.',
            icon: 'info',
            confirmButtonColor: '#0F4C4A',
        });
        return false;
    }
    return true;
};

const AvailableCourses = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [searchTerm, setSearchTerm] = useState('');
    const [category, setCategory] = useState('All');
    const [subCategory, setSubCategory] = useState('All');
    const [categoriesList, setCategoriesList] = useState([]); // Real categories from API
    const [sortBy, setSortBy] = useState('popular');
    const [selectedCourse, setSelectedCourse] = useState(null);
    const [favorites, setFavorites] = useState([]);
    const [allCourses, setAllCourses] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    // Effect to select category if passed via navigation
    useEffect(() => {
        if (location.state?.categoryId && categoriesList.length > 0) {
            const foundCat = categoriesList.find(c => c.id === location.state.categoryId);
            if (foundCat) {
                setCategory(foundCat);
                // Clear state so it doesn't stick on refresh/navigation
                navigate(location.pathname, { replace: true, state: {} });
            }
        }
    }, [categoriesList, location.state]);

    const toggleFavorite = (e, courseId) => {
        e.stopPropagation();
        if (checkAuth()) {
            toggleCourseFavorite(courseId).then(() => {
                setFavorites(prev => {
                    const idStr = String(courseId);
                    return prev.includes(idStr)
                        ? prev.filter(id => id !== idStr)
                        : [...prev, idStr];
                });
                Swal.fire({
                    toast: true,
                    position: 'top-end',
                    icon: 'success',
                    title: 'Favorites updated',
                    showConfirmButton: false,
                    timer: 2000
                });
            }).catch(() => {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Something went wrong while updating favorites!',
                });
            });
        }
    };

    // Typing Placeholder Logic
    const [placeholder, setPlaceholder] = useState('');
    const [phraseIndex, setPhraseIndex] = useState(0);
    const [isDeleting, setIsDeleting] = useState(false);

    const phrases = ["Search for 'Fullstack Development'...", "Search for 'UI/UX Masterclass'...", "Search for 'Python Data Science'..."];

    useEffect(() => {
        const currentPhrase = phrases[phraseIndex] || "";
        const timer = setTimeout(() => {
            if (!isDeleting) {
                setPlaceholder(currentPhrase.substring(0, placeholder.length + 1));
                if (placeholder.length === currentPhrase.length) setTimeout(() => setIsDeleting(true), 2000);
            } else {
                setPlaceholder(currentPhrase.substring(0, placeholder.length - 1));
                if (placeholder.length === 0) {
                    setIsDeleting(false);
                    setPhraseIndex((prev) => (prev + 1) % phrases.length);
                }
            }
        }, isDeleting ? 30 : 80);
        return () => clearTimeout(timer);
    }, [placeholder, isDeleting, phraseIndex]);

    useEffect(() => {
        setIsLoading(true);

        const fetchData = async () => {
            try {
                // 1. Fetch Categories First (to build lookup map)
                const catRes = await getCategoriesWithSubcategories();
                const cats = catRes.data;

                // Normalize subcategory IDs to ensure consistent 'id' field
                const normalizedCats = cats.map(cat => ({
                    ...cat,
                    subCategories: (cat.subCategories || []).map(sub => ({
                        ...sub,
                        id: sub.id || sub.subCategoryID || sub.subCategoryId || sub.subcategoryID || sub.subcategoryId
                    }))
                }));

                setCategoriesList(normalizedCats);

                // Helper to find names
                const findCategoryName = (id) => normalizedCats.find(c => c.id === id)?.name || 'General';
                const findSubCategoryName = (catId, subId) => {
                    const cat = normalizedCats.find(c => c.id === catId);
                    return cat?.subCategories?.find(s => s.id === subId)?.name || 'Course';
                };

                // 2. Fetch Courses
                const promises = [getApprovedCourses()];
                const token = localStorage.getItem('token');

                if (token) {
                    promises.push(getFavoriteCourses().catch(() => ({ data: [] })));
                }

                const [courseRes, favRes] = await Promise.all(promises);

                // Initialize Favorites (Normalize IDs to strings for safety)
                if (favRes && favRes.data) {
                    // Handle case where IDs might be numbers or strings
                    const favIds = favRes.data.map(c => String(c.id || c.courseId || '').trim());
                    console.log("DEBUG: Initial Favorites:", favIds);
                    setFavorites(favIds);
                }

                console.log("DEBUG: AvailableCourses API Response:", courseRes.data);

                setAllCourses((courseRes.data || []).map(c => {
                    // Normalize subCategoryId (API returns both subCategoryID and subCategoryId)
                    const normalizedSubCategoryId = c.subCategoryId || c.subCategoryID || c.subcategoryId || c.subcategoryID;

                    return {
                        ...c,
                        id: c.id,
                        title: c.title || 'Untitled Course',
                        description: c.description || c.shortDescription || c.details || c.content || "No description available.",
                        instructor: c.instructorName || 'Expert Mentor',
                        rating: c.rating || 0,
                        reviewCount: c.reviewCount || 0,
                        enrolled: c.studentCount || 0,
                        price: c.price ? (c.price.toString().startsWith('$') ? c.price : `$${c.price}`) : '$0',
                        // Improved Category Mapping: Use Name if present, otherwise lookup ID
                        category: c.categoryName || findCategoryName(c.categoryId),
                        subCategory: c.subCategoryName || findSubCategoryName(c.categoryId, normalizedSubCategoryId),
                        categoryId: c.categoryId,
                        subCategoryId: normalizedSubCategoryId,
                        level: c.level || 'Beginner',
                        language: c.language || 'EN',
                        duration: formatDuration(c.estimatedDuration || '00:00:00'),
                        image: c.thumbnailUrl || c.imagePath || c.imageUrl
                    };
                }));

            } catch (err) {
                console.error("Error fetching data:", err);
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, []);

    // Handle Sort Change (fetch new data)
    useEffect(() => {
        setIsLoading(true);
        let fetchFn = getApprovedCourses; // Default

        if (sortBy === 'newest') fetchFn = getNewestCourses;
        else if (sortBy === 'popular') fetchFn = getPopularCourses;

        fetchFn().then(res => {
            // Map response similarly to initial load
            setAllCourses((res.data || []).map(c => {
                const normalizedSubCategoryId = c.subCategoryId || c.subCategoryID || c.subcategoryId || c.subcategoryID;

                return {
                    ...c,
                    id: c.id,
                    title: c.title || 'Untitled Course',
                    description: c.description || c.shortDescription || c.details || c.content || "No description available.",
                    instructor: c.instructorName || 'Expert Mentor',
                    rating: c.rating || 0,
                    reviewCount: c.reviewCount || 0,
                    enrolled: c.studentCount || 0,
                    price: c.price ? (c.price.toString().startsWith('$') ? c.price : `$${c.price}`) : '$0',
                    category: c.categoryName || 'General',
                    subCategory: c.subCategoryName || 'Course',
                    categoryId: c.categoryId,
                    subCategoryId: normalizedSubCategoryId,
                    level: c.level || 'Beginner',
                    language: c.language || 'EN',
                    duration: formatDuration(c.estimatedDuration || '00:00:00'),
                    image: c.thumbnailUrl || c.imagePath || c.imageUrl
                };
            }));
        }).catch(err => {
            console.error("Error fetching sorted courses:", err);
            // Fallback to approved courses if specialized endpoint fails
            if (fetchFn !== getApprovedCourses) {
                getApprovedCourses().then(res => {
                    setAllCourses((res.data || []).map(c => {
                        const normalizedSubCategoryId = c.subCategoryId || c.subCategoryID || c.subcategoryId || c.subcategoryID;

                        return {
                            ...c,
                            id: c.id,
                            title: c.title || 'Untitled Course',
                            description: c.description || c.shortDescription || c.details || c.content || "No description available.",
                            instructor: c.instructorName || 'Expert Mentor',
                            rating: c.rating || 0,
                            reviewCount: c.reviewCount || 0,
                            enrolled: c.studentCount || 0,
                            price: c.price ? (c.price.toString().startsWith('$') ? c.price : `$${c.price}`) : '$0',
                            category: c.categoryName || 'General',
                            subCategory: c.subCategoryName || 'Course',
                            categoryId: c.categoryId,
                            subCategoryId: normalizedSubCategoryId,
                            level: c.level || 'Beginner',
                            language: c.language || 'EN',
                            duration: formatDuration(c.estimatedDuration || '00:00:00'),
                            image: c.thumbnailUrl || c.imagePath || c.imageUrl
                        };
                    }));
                });
            }
        }).finally(() => setIsLoading(false));
    }, [sortBy]);

    const categories = ['All', ...categoriesList]; // Store full objects

    const subCategories = category !== 'All'
        ? ['All', ...(category.subCategories || [])]
        : [];

    const filteredCourses = allCourses.filter(course => {
        const matchesSearch = course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            course.instructor.toLowerCase().includes(searchTerm.toLowerCase());

        // Filter by Category ID if not 'All'
        const matchesCategory = category === 'All' ||
            (course.categoryId && category.id && course.categoryId === category.id) ||
            course.category === category.name; // Fallback for safety

        // Filter by SubCategory ID if not 'All'
        const matchesSubCategory = subCategory === 'All' ||
            (course.subCategoryId && subCategory.id && course.subCategoryId === subCategory.id) ||
            course.subCategory === subCategory.name;

        return matchesSearch && matchesCategory && matchesSubCategory;
    });

    const handleCategoryChange = (cat) => {
        setCategory(cat);
        setSubCategory('All');
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-[#F0F9F8] to-white relative overflow-hidden">
            {/* Background Decoration */}
            <div className="absolute top-0 right-0 p-32 opacity-[0.03] text-[#0F4C4A] transform rotate-12 pointer-events-none">
                <svg width="400" height="400" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2L2 7l10 5 10-5-10-5zm0 9l2.5-1.25L12 8.5l-2.5 1.25L12 11zm0 2.5l-5-2.5-5 2.5L12 22l10-8.5-5-2.5-5 2.5z" />
                </svg>
            </div>

            {/* Hero Section */}
            <div className="pt-20 pb-12 px-6 text-center max-w-4xl mx-auto relative z-10">
                <h1 className="text-4xl md:text-5xl font-black text-[#0F172B] mb-6 tracking-tight">
                    Find Your Next <span className="text-[#4AA59B]">Mastery</span>
                </h1>
                <p className="text-gray-600 text-lg mb-10 max-w-2xl mx-auto leading-relaxed">
                    Explore our curated collection of world-class courses designed to help you succeed in the modern world.
                </p>

                {/* Modern Search Bar with Typing Animation */}
                <div className="relative max-w-2xl mx-auto mb-12 group">
                    <div className="absolute inset-0 bg-[#4AA59B]/20 blur-2xl opacity-0 group-focus-within:opacity-100 transition-opacity duration-500 rounded-full"></div>
                    <div className="relative flex items-center bg-white rounded-2xl shadow-2xl border border-gray-100 p-2 focus-within:ring-2 focus-within:ring-[#4AA59B] transition-all">
                        <Search className="ml-4 text-gray-400" size={22} />
                        <input
                            type="text"
                            placeholder={placeholder}
                            className="w-full px-4 py-3 outline-none text-gray-700 bg-transparent placeholder-gray-300 font-bold"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                        <button className="bg-[#0F4C4A] text-white px-8 py-3 rounded-xl font-bold hover:bg-[#1a6b68] transition-all shadow-lg active:scale-95 transform hidden sm:block">
                            Search
                        </button>
                    </div>
                </div>

                {/* Primary Category Filters */}
                <div className="flex flex-wrap justify-center gap-3 mb-6">
                    {categories.map((cat, idx) => (
                        <button
                            key={cat.id || idx}
                            onClick={() => handleCategoryChange(cat)}
                            className={`px-5 py-2.5 rounded-full text-sm font-bold transition-all duration-300 transform active:scale-95
                                ${(category === cat || (category.id && cat.id === category.id))
                                    ? 'bg-[#0F4C4A] text-white shadow-lg -translate-y-1'
                                    : 'bg-white text-gray-600 hover:bg-[#E0F2F1] hover:text-[#0F4C4A] border border-gray-100 shadow-sm'
                                }
                            `}
                        >
                            {cat === 'All' ? 'All' : cat.name}
                        </button>
                    ))}
                </div>

                {/* Secondary SubCategory Filters */}
                {subCategories.length > 0 && (
                    <div className="flex flex-wrap justify-center gap-2 mt-4 animate-in fade-in slide-in-from-top-4 duration-500">
                        {subCategories.map((sub, idx) => (
                            <button
                                key={sub.id || idx}
                                onClick={() => setSubCategory(sub)}
                                className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all duration-300
                                    ${(subCategory === sub || (subCategory.id && sub.id === subCategory.id))
                                        ? 'bg-[#4AA59B] text-white shadow-md'
                                        : 'bg-[#F0F9F8] text-[#0F4C4A] hover:bg-[#4AA59B] hover:text-white border border-[#4AA59B]/10'
                                    }
                                `}
                            >
                                {sub === 'All' ? 'All' : sub.name}
                            </button>
                        ))}
                    </div>
                )}
            </div>

            {/* Main Content Area */}
            <div className="max-w-7xl mx-auto px-6 pb-24 relative z-10">
                {/* Header Meta */}
                <div className="flex flex-col sm:flex-row justify-between items-center mb-10 gap-4 border-b border-gray-100 pb-8">
                    <div className="flex items-center gap-3">
                        <div className="w-1.5 h-8 bg-[#4AA59B] rounded-full"></div>
                        <h2 className="text-2xl font-bold text-[#0F172B]">
                            {category === 'All' ? 'Latest Courses' : `${category.name} ${subCategory !== 'All' ? `> ${subCategory.name}` : ''}`}
                            <span className="ml-3 text-sm text-gray-400 font-medium tracking-tight">({filteredCourses.length} results)</span>
                        </h2>
                    </div>

                    <div className="flex items-center gap-3 bg-white p-1.5 rounded-xl border border-gray-100 shadow-sm">
                        <span className="text-xs font-bold text-gray-400 ml-3 uppercase tracking-wider">Sort By:</span>
                        <select
                            value={sortBy}
                            onChange={(e) => setSortBy(e.target.value)}
                            className="bg-transparent text-sm font-bold text-[#0F4C4A] outline-none pr-4 cursor-pointer"
                        >
                            <option value="popular">Popularity</option>
                            <option value="rated">Top Rated</option>
                            <option value="newest">Newest</option>
                        </select>
                    </div>
                </div>

                {/* Course Grid */}
                {isLoading ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                            <div key={i} className="flex flex-col bg-white border border-transparent rounded-2xl p-4 w-full h-[350px] animate-pulse">
                                <div className="rounded-xl h-36 bg-gray-200 mb-4 w-full relative">
                                    <div className="absolute top-3 left-3 w-16 h-4 bg-gray-300 rounded"></div>
                                </div>
                                <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                                <div className="h-3 bg-gray-200 rounded w-full mb-4"></div>
                                <div className="mt-auto flex justify-between items-center border-t border-gray-50 pt-3">
                                    <div className="h-3 bg-gray-200 rounded w-10"></div>
                                    <div className="h-3 bg-gray-200 rounded w-10"></div>
                                    <div className="h-4 bg-gray-200 rounded w-16"></div>
                                </div>
                                <div className="flex gap-2 mt-4">
                                    <div className="h-8 bg-gray-200 rounded-xl flex-1"></div>
                                    <div className="h-8 bg-gray-200 rounded-xl flex-1"></div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : filteredCourses.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {filteredCourses.map(course => (
                            <div
                                key={course.id}
                                className="flex flex-col bg-white border border-transparent shadow-lg rounded-2xl p-4 w-full group transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 cursor-pointer relative overflow-hidden"
                                onClick={() => setSelectedCourse(course)}
                            >
                                <div className="absolute top-0 right-0 w-24 h-24 bg-[#4AA59B]/5 rounded-full -mr-12 -mt-12 group-hover:scale-150 transition-transform duration-700"></div>

                                <div className="relative overflow-hidden rounded-xl mb-4 h-36">
                                    <img
                                        src={(course.image && isWorkingUrl(course.image)) ? (course.image.startsWith('http') ? course.image : `${BaseURL}/${course.image.replace(/^\//, '')}`) : "/course_placeholder.png"}
                                        alt={course.title}
                                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                                        onError={(e) => { e.target.src = "/course_placeholder.png"; }}
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                                    <div className="absolute top-3 right-3 z-20">
                                        <button
                                            onClick={(e) => toggleFavorite(e, course.id)}
                                            className={`p-2 rounded-full backdrop-blur-md transition-all duration-300 transform active:scale-90 ${favorites.includes(String(course.id).trim())
                                                ? 'bg-red-500 text-white shadow-lg'
                                                : 'bg-white/80 text-gray-400 hover:text-red-500 hover:bg-white'
                                                }`}
                                        >
                                            <Heart size={16} fill={favorites.includes(String(course.id).trim()) ? "currentColor" : "none"} />
                                        </button>
                                    </div>
                                    <div className="absolute top-3 left-3 flex flex-col gap-1.5">
                                        <span className="bg-white/95 backdrop-blur-sm px-2 py-1 rounded-md text-[8px] font-black text-[#0F4C4A] shadow-md uppercase tracking-wider leading-none border border-[#0F4C4A]/5">{course.level}</span>
                                        <span className="bg-[#4AA59B]/90 backdrop-blur-sm px-1.5 py-0.5 rounded-md text-[7px] font-bold text-white shadow-md uppercase tracking-wider leading-none">{course.subCategory}</span>
                                    </div>
                                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                        <div className="bg-white/20 backdrop-blur-md p-3 rounded-full border border-white/30 text-white transform scale-90 group-hover:scale-100 transition-transform duration-300">
                                            <PlayCircle size={32} />
                                        </div>
                                    </div>
                                </div>

                                <span className="text-[#0F172B] font-black text-lg mb-2 leading-tight group-hover:text-[#4AA59B] transition-colors line-clamp-1">{course.title}</span>
                                <p className="text-gray-500 text-xs mb-4 line-clamp-2 leading-relaxed font-medium">{course.description}</p>

                                <div className="flex items-center gap-3 py-3 border-t border-gray-50 mt-auto">
                                    <div className="flex items-center gap-1 text-yellow-500 font-bold text-xs">
                                        <Star size={12} fill="currentColor" />
                                        <span>{course.rating}</span>
                                    </div>
                                    <div className="flex items-center gap-1 text-gray-400 font-semibold text-[10px] border-l border-gray-100 pl-3">
                                        <Users size={12} />
                                        <span>{course.enrolled.toLocaleString()}</span>
                                    </div>
                                    <div className="ml-auto">
                                        <span className="text-[#0F4C4A] font-black text-base">{course.price}</span>
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-2 mt-4 relative z-10">
                                    <button
                                        onClick={(e) => { e.stopPropagation(); setSelectedCourse(course); }}
                                        className="bg-white text-[#0F4C4A] border border-[#0F4C4A]/10 py-2.5 rounded-xl font-bold text-[10px] hover:bg-[#F0F9F8] transition-all shadow-sm active:scale-95 transform"
                                    >
                                        Preview
                                    </button>
                                    <button
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            if (checkAuth()) {
                                                navigate(`/student/checkout/${course.id}`);
                                            }
                                        }}
                                        className="bg-[#0F4C4A] text-white py-2.5 rounded-xl font-bold text-[10px] hover:bg-[#4AA59B] transition-all shadow-md active:scale-95 transform"
                                    >
                                        Enroll Now
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-32 bg-white rounded-[40px] shadow-xl border border-dashed border-gray-200">
                        <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-6 text-gray-300">
                            <Search size={40} />
                        </div>
                        <h3 className="text-2xl font-bold text-[#0F172B] mb-2">No matching courses found</h3>
                        <p className="text-gray-500 mb-8 font-medium">Try adjusting your filters or searching for something else.</p>
                        <button
                            onClick={() => { setCategory('All'); setSearchTerm(''); setSubCategory('All'); }}
                            className="bg-[#4AA59B] text-white px-8 py-3 rounded-xl font-bold hover:bg-[#0F4C4A] transition-all shadow-lg active:scale-95 transform"
                        >
                            Reset All Filters
                        </button>
                    </div>
                )}
            </div>

            {/* Course Preview Modal */}
            <CourseModal
                course={selectedCourse}
                onClose={() => setSelectedCourse(null)}
            />
        </div >
    );
};

export default AvailableCourses;
