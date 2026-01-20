import React, { useState, useEffect } from 'react';
import { Search, Star, Users, X, Info, CheckCircle2, PlayCircle, Heart } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

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
                    {/* Image/Video Preview Side */}
                    <div className="md:w-1/2 relative h-48 sm:h-64 md:h-auto shrink-0">
                        <img
                            src={course.image}
                            alt={course.title}
                            className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                        <div className="absolute bottom-4 left-4 md:bottom-6 md:left-6 text-white">
                            <span className="bg-[#4AA59B] px-2 py-0.5 md:px-3 md:py-1 rounded-full text-[9px] md:text-[10px] font-bold uppercase tracking-wider mb-1 md:mb-2 inline-block">
                                Preview Available
                            </span>
                            <div className="flex items-center gap-2">
                                <PlayCircle size={24} className="md:w-8 md:h-8 text-white fill-white/20" />
                                <span className="font-bold text-sm md:text-base">Watch Trailer</span>
                            </div>
                        </div>
                    </div>

                    {/* Content Side */}
                    <div className="md:w-1/2 p-6 md:p-8 flex flex-col">
                        <div className="flex items-center gap-2 mb-3 md:mb-4">
                            <span className="bg-[#F0F9F8] text-[#0F4C4A] px-2 py-0.5 md:px-3 md:py-1 rounded-lg text-[9px] md:text-[10px] font-black uppercase tracking-widest leading-none border border-[#0F4C4A]/5">
                                {course.category}
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
                                <span className="font-bold text-[#0F172B] text-sm md:text-base">{course.rating}</span>
                                <span className="text-gray-400 text-[10px] md:text-xs font-medium">(4.2k)</span>
                            </div>
                            <div className="flex items-center gap-1.5 text-gray-500">
                                <Users size={16} className="md:w-4.5 md:h-4.5" />
                                <span className="font-bold text-sm md:text-base">{course.enrolled.toLocaleString()}</span>
                            </div>
                        </div>

                        <div className="space-y-2.5 md:space-y-3 mb-6 md:mb-8">
                            <h4 className="text-xs md:text-sm font-black text-[#0F4C4A] uppercase tracking-wider mb-2 flex items-center gap-2">
                                <Info size={14} className="md:w-4 md:h-4" /> What you'll learn
                            </h4>
                            {[
                                "Master fundamental concepts",
                                "Hands-on projects and labs",
                                "Professional level techniques",
                                "Certificate of completion"
                            ].map((feature, i) => (
                                <div key={i} className="flex items-start gap-2 text-xs md:text-sm text-gray-600">
                                    <CheckCircle2 size={14} className="text-[#4AA59B] mt-0.5 shrink-0 md:w-4 md:h-4" />
                                    <span>{feature}</span>
                                </div>
                            ))}
                        </div>

                        <div className="mt-auto pt-4 md:pt-6 border-t border-gray-100 flex items-center justify-between gap-4">
                            <div className="shrink-0">
                                <p className="text-[9px] md:text-[10px] text-gray-400 font-bold uppercase tracking-widest mb-0.5 md:mb-1">Full access</p>
                                <span className="text-xl md:text-2xl font-black text-[#0F4C4A]">{course.price}</span>
                            </div>
                            <button className="flex-1 max-w-[160px] bg-[#0F4C4A] text-white py-3 md:py-4 rounded-xl md:rounded-2xl font-black text-xs md:text-sm hover:bg-[#4AA59B] transition-all shadow-lg shadow-[#0F4C4A]/20 active:scale-95 transform">
                                Enroll Now
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

const AvailableCourses = () => {
    const navigate = useNavigate();
    const [searchTerm, setSearchTerm] = useState('');
    const [category, setCategory] = useState('All');
    const [subCategory, setSubCategory] = useState('All');
    const [sortBy, setSortBy] = useState('popular');
    const [selectedCourse, setSelectedCourse] = useState(null);
    const [favorites, setFavorites] = useState([1, 2]); // Mock some initial favorites by ID

    const toggleFavorite = (e, courseId) => {
        e.stopPropagation();
        setFavorites(prev =>
            prev.includes(courseId)
                ? prev.filter(id => id !== courseId)
                : [...prev, courseId]
        );
    };

    // Typing Placeholder Logic
    const [placeholder, setPlaceholder] = useState('');
    const [phraseIndex, setPhraseIndex] = useState(0);
    const [isDeleting, setIsDeleting] = useState(false);

    const phrases = [
        "Search for 'Fullstack Development'...",
        "Search for 'UI/UX Masterclass'...",
        "Search for 'Python Data Science'...",
        "Search for 'Social Media Marketing'...",
        "Search for 'React Mastery'...",
        "What do you want to learn today?..."
    ];

    useEffect(() => {
        const currentPhrase = phrases[phraseIndex];
        const typingSpeed = isDeleting ? 30 : 80;

        const timer = setTimeout(() => {
            if (!isDeleting) {
                setPlaceholder(currentPhrase.substring(0, placeholder.length + 1));
                if (placeholder.length === currentPhrase.length) {
                    setTimeout(() => setIsDeleting(true), 2000);
                }
            } else {
                setPlaceholder(currentPhrase.substring(0, placeholder.length - 1));
                if (placeholder.length === 0) {
                    setIsDeleting(false);
                    setPhraseIndex((prev) => (prev + 1) % phrases.length);
                }
            }
        }, typingSpeed);

        return () => clearTimeout(timer);
    }, [placeholder, isDeleting, phraseIndex]);

    const categoryData = {
        'All': [],
        'Web Development': ['Frontend', 'Backend', 'Fullstack', 'Mobile'],
        'UI/UX Design': ['User Research', 'Visual Design', 'Interaction Design', 'Prototyping'],
        'Data Science': ['Machine Learning', 'AI', 'Data Analysis', 'Python'],
        'Business': ['Management', 'Startup', 'Finance', 'Strategy'],
        'Marketing': ['Social Media', 'SEO', 'Email Marketing', 'Ads']
    };

    const categories = Object.keys(categoryData);
    const subCategories = category !== 'All' ? ['All', ...categoryData[category]] : [];

    const allCourses = [
        { id: 1, title: 'Complete Web BootCamp 2024', instructor: 'Dr. Angela Yu', rating: 4.9, enrolled: 15420, price: '$89.99', category: 'Web Development', subCategory: 'Fullstack', level: 'Beginner', image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&auto=format&fit=crop&q=60' },
        { id: 2, title: 'Advanced UI/UX Masterclass', instructor: 'Gary Simon', rating: 4.8, enrolled: 8900, price: '$74.99', category: 'UI/UX Design', subCategory: 'Visual Design', level: 'Intermediate', image: 'https://images.unsplash.com/photo-1586717791821-3f44a563eb4c?w=800&auto=format&fit=crop&q=60' },
        { id: 3, title: 'Machine Learning A-Z', instructor: 'Kirill Eremenko', rating: 4.7, enrolled: 12100, price: '$94.99', category: 'Data Science', subCategory: 'Machine Learning', level: 'Beginner', image: 'https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?w=800&auto=format&fit=crop&q=60' },
        { id: 4, title: 'Business Strategy 101', instructor: 'Chris Anderson', rating: 4.6, enrolled: 5400, price: '$49.99', category: 'Business', subCategory: 'Strategy', level: 'All Levels', image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&auto=format&fit=crop&q=60' },
        { id: 5, title: 'React & Next.js Professional', instructor: 'Maximilian Schwarzmüller', rating: 4.9, enrolled: 22000, price: '$99.99', category: 'Web Development', subCategory: 'Frontend', level: 'Advanced', image: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&auto=format&fit=crop&q=60' },
        { id: 6, title: 'Social Media Marketing', instructor: 'Neil Patel', rating: 4.5, enrolled: 18000, price: '$59.99', category: 'Marketing', subCategory: 'Social Media', level: 'Intermediate', image: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=800&auto=format&fit=crop&q=60' },
    ];

    const filteredCourses = allCourses.filter(course => {
        const matchesSearch = course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            course.instructor.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCategory = category === 'All' || course.category === category;
        const matchesSubCategory = subCategory === 'All' || course.subCategory === subCategory;
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
                    {categories.map((cat) => (
                        <button
                            key={cat}
                            onClick={() => handleCategoryChange(cat)}
                            className={`px-5 py-2.5 rounded-full text-sm font-bold transition-all duration-300 transform active:scale-95
                                ${category === cat
                                    ? 'bg-[#0F4C4A] text-white shadow-lg -translate-y-1'
                                    : 'bg-white text-gray-600 hover:bg-[#E0F2F1] hover:text-[#0F4C4A] border border-gray-100 shadow-sm'
                                }
                            `}
                        >
                            {cat}
                        </button>
                    ))}
                </div>

                {/* Secondary SubCategory Filters */}
                {subCategories.length > 0 && (
                    <div className="flex flex-wrap justify-center gap-2 mt-4 animate-in fade-in slide-in-from-top-4 duration-500">
                        {subCategories.map((sub) => (
                            <button
                                key={sub}
                                onClick={() => setSubCategory(sub)}
                                className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all duration-300
                                    ${subCategory === sub
                                        ? 'bg-[#4AA59B] text-white shadow-md'
                                        : 'bg-[#F0F9F8] text-[#0F4C4A] hover:bg-[#4AA59B] hover:text-white border border-[#4AA59B]/10'
                                    }
                                `}
                            >
                                {sub}
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
                            {category === 'All' ? 'Latest Courses' : `${category} ${subCategory !== 'All' ? `> ${subCategory}` : ''}`}
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
                {filteredCourses.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {filteredCourses.map(course => (
                            <div
                                key={course.id}
                                className="flex flex-col bg-white border border-transparent shadow-lg rounded-2xl p-4 w-full group transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 cursor-pointer relative overflow-hidden"
                                onClick={() => setSelectedCourse(course)}
                            >
                                <div className="absolute top-0 right-0 w-24 h-24 bg-[#4AA59B]/5 rounded-full -mr-12 -mt-12 group-hover:scale-150 transition-transform duration-700"></div>

                                <div className="relative overflow-hidden rounded-xl mb-4 h-36">
                                    <img src={course.image} alt={course.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                                    <div className="absolute top-3 right-3 z-20">
                                        <button
                                            onClick={(e) => toggleFavorite(e, course.id)}
                                            className={`p-2 rounded-full backdrop-blur-md transition-all duration-300 transform active:scale-90 ${favorites.includes(course.id)
                                                    ? 'bg-red-500 text-white shadow-lg'
                                                    : 'bg-white/80 text-gray-400 hover:text-red-500 hover:bg-white'
                                                }`}
                                        >
                                            <Heart size={16} fill={favorites.includes(course.id) ? "currentColor" : "none"} />
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
                                <p className="text-gray-500 text-xs mb-4 line-clamp-2 leading-relaxed font-medium">Learn {course.subCategory} with {course.instructor}. Master modern industry standards.</p>

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
                                        onClick={(e) => { e.stopPropagation(); /* Potential enrollment logic */ }}
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
        </div>
    );
};

export default AvailableCourses;
