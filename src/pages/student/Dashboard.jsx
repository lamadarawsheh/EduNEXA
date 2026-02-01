import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Search, PlayCircle, Star, Sparkles, TrendingUp, Award, Bot, Users } from "lucide-react";
import { getApprovedCourses, getCategoriesWithSubcategories, BaseURL, isWorkingUrl, formatDuration } from "../../services/courseService";

/**
 * Animated Number Component
 */
const CountUpNumber = ({ end, duration = 2000, suffix = "" }) => {
    const [count, setCount] = useState(0);
    const [isVisible, setIsVisible] = useState(false);
    const countRef = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    observer.disconnect();
                }
            },
            { threshold: 0.1 }
        );

        if (countRef.current) {
            observer.observe(countRef.current);
        }

        return () => observer.disconnect();
    }, []);

    useEffect(() => {
        if (!isVisible) return;

        let start = 0;
        const endNum = parseFloat(end);
        if (isNaN(endNum)) return;

        const increment = endNum / (duration / 16);
        const timer = setInterval(() => {
            start += increment;
            if (start >= endNum) {
                setCount(endNum);
                clearInterval(timer);
            } else {
                setCount(start);
            }
        }, 16);

        return () => clearInterval(timer);
    }, [isVisible, end, duration]);

    const displayCount = end.toString().includes('.') ? count.toFixed(1) : Math.floor(count);

    return <span ref={countRef}>{displayCount}{suffix}</span>;
};

/**
 * Magnetic Card Component
 */
const MagneticCard = ({ children, className = "" }) => {
    const cardRef = useRef(null);
    const [transform, setTransform] = useState("perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)");

    const handleMouseMove = (e) => {
        if (!cardRef.current) return;
        const card = cardRef.current;
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateX = (y - centerY) / 25;
        const rotateY = (centerX - x) / 25;

        setTransform(`perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`);
    };

    const handleMouseLeave = () => {
        setTransform("perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)");
    };

    return (
        <div
            ref={cardRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{ transform, transition: "transform 0.1s ease-out" }}
            className={className}
        >
            {children}
        </div>
    );
};

const StudentDashboard = () => {
    const navigate = useNavigate();
    const [search, setSearch] = useState("");
    const [popularCourses, setPopularCourses] = useState([]);
    const [categories, setCategories] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        Promise.all([
            getApprovedCourses().catch(err => { return { data: [] }; }),
            getCategoriesWithSubcategories().catch(err => { return { data: [] }; })
        ]).then(([approvedRes, catsRes]) => {
            console.log("🔥 DASHBOARD: Approved Courses Processing", {
                rawResponse: approvedRes,
                dataArray: approvedRes?.data
            });

            if (approvedRes?.data) {
                const slicedCourses = approvedRes.data.slice(0, 3);
                console.log("✅ Setting Popular Courses State (from Approved):", slicedCourses);
                setPopularCourses(slicedCourses);
            }
            if (catsRes?.data) setCategories(catsRes.data);
        }).finally(() => {
            setIsLoading(false);
        });
    }, []);

    const handleSearch = (e) => {
        e.preventDefault();
        navigate(`/student/available-courses?q=${search}`);
    };

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add("reveal-visible");
                    }
                });
            },
            { threshold: 0.1 }
        );

        const animatedElements = document.querySelectorAll(".reveal-on-scroll");
        animatedElements.forEach((el) => observer.observe(el));

        return () => {
            animatedElements.forEach((el) => observer.unobserve(el));
        };
    }, []);

    return (
        <div className="bg-white min-h-screen text-[#0F172B] font-sans antialiased overflow-x-hidden">

            {/* 1. PREMIUM MESH GRADIENT SEARCH HEADER */}
            <section className="relative pt-24 pb-48 px-6 overflow-hidden">
                <div className="absolute inset-0 bg-[#0F4C4A]">
                    <div className="absolute inset-0 opacity-40 bg-[radial-gradient(circle_at_50%_50%,#1E8A85,transparent_50%)] animate-mesh-1"></div>
                    <div className="absolute inset-0 opacity-30 bg-[radial-gradient(circle_at_20%_80%,#4AA59B,transparent_50%)] animate-mesh-2"></div>
                    <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_80%_20%,#15615E,transparent_50%)] animate-mesh-3"></div>
                </div>

                <div className="max-w-7xl mx-auto text-center relative z-20 reveal-on-scroll px-4">
                    <h1 className="text-4xl md:text-6xl lg:text-8xl font-black text-white mb-8 tracking-tighter leading-none animate-shimmer-text uppercase">
                        find your <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-[#4AA59B] to-white bg-[length:200%_auto] animate-gradient-text">favourite</span> course
                    </h1>

                    <div className="max-w-2xl mx-auto relative group">
                        <div className="absolute -inset-1 bg-gradient-to-r from-[#4AA59B] to-[#1E8A85] rounded-full blur opacity-25 group-hover:opacity-100 transition duration-1000 group-hover:duration-200"></div>
                        <form onSubmit={handleSearch} className="relative">
                            <input
                                type="text"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                placeholder="Unlock your future today..."
                                className="w-full bg-white/95 backdrop-blur-md pl-10 pr-16 py-5 rounded-full shadow-2xl focus:outline-none transition-all duration-500 font-bold text-lg border border-white/20"
                            />
                            <button type="submit" className="absolute inset-y-0 right-6 flex items-center text-[#0F4C4A] hover:scale-125 transition-transform">
                                <Search size={24} strokeWidth={3} />
                            </button>
                        </form>
                    </div>

                    <div className="hidden lg:block absolute top-0 left-10 animate-float">
                        <div className="bg-white/10 backdrop-blur-lg px-4 py-3 rounded-2xl border border-white/20 flex items-center gap-3 shadow-2xl">
                            <div className="w-10 h-10 bg-[#4AA59B] rounded-xl flex items-center justify-center text-white">
                                <TrendingUp size={20} />
                            </div>
                            <div className="text-left">
                                <p className="text-[10px] text-white/60 font-black uppercase">Trending</p>
                                <p className="text-sm text-white font-bold tracking-tight">Python Mastery</p>
                            </div>
                        </div>
                    </div>

                    <div className="hidden lg:block absolute bottom-0 right-10 animate-float-delayed">
                        <div className="bg-white/10 backdrop-blur-lg px-4 py-3 rounded-2xl border border-white/20 flex items-center gap-3 shadow-2xl">
                            <div className="w-10 h-10 bg-yellow-400 rounded-xl flex items-center justify-center text-[#0F4C4A]">
                                <Award size={20} />
                            </div>
                            <div className="text-left">
                                <p className="text-[10px] text-white/60 font-black uppercase">Certified</p>
                                <p className="text-sm text-white font-bold tracking-tight">Industry Expert</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* 2. FEATURED VIDEO BANNER */}
            <section className="max-w-7xl mx-auto px-6 -mt-24 mb-32 relative z-30 reveal-on-scroll">
                {(() => {
                    const featured = popularCourses.find(c => (c.title || "").toLowerCase().includes("ux")) || popularCourses[0];
                    if (!featured) return (
                        <div className="bg-[#093332] rounded-[50px] aspect-[21/9] md:aspect-[25/8] animate-pulse flex items-center justify-center">
                            <Bot className="text-white/20 size-20" />
                        </div>
                    );

                    const imgUrl = (featured.thumbnailUrl || featured.image || featured.imagePath || featured.imageUrl);
                    const safeImgUrl = imgUrl && isWorkingUrl(imgUrl)
                        ? (imgUrl.startsWith('http') ? imgUrl : `${BaseURL}/${imgUrl.replace(/^\//, '')}`)
                        : "/featured_course_banner.png";

                    const videoUrl = featured.promoVideoUrl || featured.trailerUrl || featured.videoPath || featured.trailer;
                    const safeVideoUrl = videoUrl && isWorkingUrl(videoUrl)
                        ? (videoUrl.startsWith('http') ? videoUrl : `${BaseURL}/${videoUrl.replace(/^\//, '')}`)
                        : null;

                    return (
                        <MagneticCard
                            onClick={() => navigate(`/student/checkout/${featured.id}`)}
                            className="bg-[#093332] rounded-3xl md:rounded-[50px] overflow-hidden shadow-[0_50px_100px_-20px_rgba(0,0,0,0.5)] relative aspect-square md:aspect-[21/9] lg:aspect-[25/8] group cursor-pointer border border-white/5"
                        >
                            <img
                                src={safeImgUrl}
                                alt={featured.title}
                                className="w-full h-full object-cover opacity-50 group-hover:scale-105 transition-transform duration-[3000ms]"
                                onError={(e) => { e.target.src = "/featured_course_banner.png"; }}
                            />
                            <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-[#0F4C4A]/95 via-[#0F4C4A]/40 to-transparent flex items-end md:items-center px-6 md:px-12 py-10 md:py-0">
                                <div className="text-white max-w-xl space-y-3 md:space-y-6">
                                    <span className="inline-flex items-center gap-2 bg-[#1E8A85] px-3 py-1 md:px-4 md:py-1.5 rounded-full text-[9px] md:text-[10px] font-black tracking-widest uppercase shadow-xl">
                                        <Sparkles size={12} className="animate-pulse" /> Trending Masterclass
                                    </span>
                                    <h2 className="text-2xl md:text-4xl lg:text-6xl font-black tracking-tighter leading-[1] md:leading-[0.9] uppercase group-hover:text-[#4AA59B] transition-colors line-clamp-2">
                                        {featured.title}
                                    </h2>
                                    <p className="text-white/60 text-xs md:text-base lg:text-lg font-medium max-w-md leading-relaxed line-clamp-2">
                                        {featured.description || featured.shortDescription || featured.details || "Advance your career with this comprehensive industry-standard curriculum and hands-on projects."}
                                    </p>
                                    <div className="flex flex-wrap items-center gap-3 md:gap-6 pt-2 md:pt-4">
                                        <button className="bg-white text-[#0F4C4A] px-6 py-2.5 md:px-8 md:py-3 rounded-xl md:rounded-2xl font-black text-[10px] md:text-xs uppercase tracking-widest hover:bg-[#4AA59B] hover:text-white transition-all">Enroll Now</button>
                                        <div className="flex items-center gap-2 text-white/40 text-[9px] md:text-xs font-bold uppercase tracking-widest">
                                            <Users size={14} />
                                            <span>{(featured.studentCount || featured.enrolled || featured.enrolledStudents || 0).toLocaleString()} Enrolled</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                                <div className="w-24 h-24 md:w-32 md:h-32 bg-white/10 backdrop-blur-xl rounded-full flex items-center justify-center text-white border border-white/20 group-hover:scale-110 group-hover:bg-white group-hover:text-[#0F4C4A] transition-all duration-700 shadow-[0_0_50px_rgba(255,255,255,0.2)] pointer-events-auto">
                                    <PlayCircle size={64} className="md:size-80" fill="currentColor" fillOpacity="0.2" />
                                </div>
                            </div>

                            {/* Hidden Video Preview on Hover (Optional functional enhancement) */}
                            {safeVideoUrl && (
                                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none delay-500">
                                    <video
                                        src={safeVideoUrl}
                                        muted
                                        loop
                                        autoPlay
                                        className="w-full h-full object-cover"
                                    />
                                    <div className="absolute inset-0 bg-black/40"></div>
                                </div>
                            )}
                        </MagneticCard>
                    );
                })()}
            </section>

            {/* 3. POPULAR COURSES SECTION */}
            <section className="max-w-7xl mx-auto px-6 mb-32 reveal-on-scroll">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-12">
                    <div>
                        <h2 className="text-3xl md:text-4xl lg:text-5xl font-black tracking-tighter text-[#0F172B]">Popular Courses</h2>
                        <div className="w-16 md:w-20 h-2 bg-[#1E8A85] mt-3 rounded-full" />

                    </div>
                    <button onClick={() => navigate('/student/available-courses')} className="text-[#1E8A85] font-black text-sm tracking-widest uppercase hover:translate-x-2 transition-transform duration-300">View Catalog →</button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
                    {(() => {
                        if (isLoading) {
                            return [1, 2, 3].map((i) => (
                                <div key={i} className="bg-white rounded-[40px] overflow-hidden shadow-sm border border-gray-100 h-[500px] animate-pulse">
                                    <div className="h-64 bg-gray-200 w-full relative">
                                        <div className="absolute top-6 left-6 w-20 h-6 bg-gray-300 rounded-full"></div>
                                    </div>
                                    <div className="p-10 space-y-4">
                                        <div className="h-8 bg-gray-200 rounded w-3/4"></div>
                                        <div className="flex justify-between">
                                            <div className="h-4 bg-gray-200 rounded w-16"></div>
                                            <div className="h-4 bg-gray-200 rounded w-24"></div>
                                        </div>
                                        <div className="pt-8 border-t border-gray-50 flex justify-between items-center">
                                            <div className="h-4 bg-gray-200 rounded w-20"></div>
                                            <div className="h-10 bg-gray-200 rounded-2xl w-32"></div>
                                        </div>
                                    </div>
                                </div>
                            ));
                        }

                        if (!popularCourses || popularCourses.length === 0) {
                            return (
                                <div className="col-span-full py-20 text-center bg-gray-50 rounded-[50px] border-2 border-dashed border-gray-200">
                                    <Bot className="mx-auto text-gray-300 mb-4" size={48} />
                                    <h3 className="text-xl font-black text-gray-400 uppercase tracking-widest">No trending courses yet</h3>
                                    <p className="text-gray-400 text-sm mt-2 font-medium">Explore our catalog to find your next favorite subject.</p>
                                </div>
                            );
                        }

                        return popularCourses.map((course, idx) => {
                            try {
                                const imageUrl = (course.thumbnailUrl || course.image || course.imagePath || course.imageUrl);
                                const safeImageUrl = imageUrl && isWorkingUrl(imageUrl)
                                    ? (imageUrl.startsWith('http') ? imageUrl : `${BaseURL}/${imageUrl.replace(/^\//, '')}`)
                                    : "/course_placeholder.png";

                                const title = (course.title || 'Untitled Course').trim();

                                const rawInstructor = (course.instructorName || course.instructor?.fullName || "").trim();
                                const displayInstructor = rawInstructor || "EduNexa Mentor";

                                // 🔍 DEBUG: Log the instructor resolution to confirm the issue
                                if (!rawInstructor) {
                                    console.warn(`⚠️ Missing instructor for course '${title}'. Raw value: '${course.instructorName}'`);
                                }

                                const price = (course.price !== undefined && course.price !== null) ? course.price : 0;
                                const displayPrice = price > 0 ? `$${price}` : "Free";

                                return (
                                    <MagneticCard key={course.id || idx} className={`bg-white rounded-[40px] overflow-hidden shadow-[0_20px_50px_-15px_rgba(0,0,0,0.05)] border border-gray-100 hover:shadow-[0_40px_80px_-20px_rgba(74,165,155,0.2)] transition-all duration-500 group delay-${(idx + 1) * 100} flex flex-col`}>
                                        <div className="h-64 overflow-hidden relative shrink-0">
                                            <img
                                                src={safeImageUrl}
                                                alt={title}
                                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-[1500ms]"
                                                onError={(e) => { e.target.src = "/course_placeholder.png"; }}
                                            />
                                            <div className="absolute top-6 left-6 flex gap-2">
                                                <span className="bg-[#0F4C4A] text-white px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest shadow-xl border border-white/20">
                                                    {course.level || "Beginner"}
                                                </span>
                                                {displayPrice === "Free" && (
                                                    <span className="bg-white text-[#0F4C4A] px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest shadow-xl">
                                                        Free
                                                    </span>
                                                )}
                                            </div>
                                        </div>
                                        <div className="p-10 flex flex-col flex-grow">
                                            <div className="mb-auto">
                                                <h3 className="text-xl font-black mb-4 text-[#0F172B] line-clamp-2 min-h-[3.5rem] group-hover:text-[#1E8A85] transition-all leading-tight">
                                                    {title}
                                                </h3>

                                                <div className="flex items-center justify-between text-[11px] text-gray-400 font-black uppercase tracking-[0.1em]">
                                                    <div className="flex items-center gap-2 font-bold bg-yellow-50 text-yellow-700 px-2 py-1 rounded-lg">
                                                        <Star size={14} fill="currentColor" />
                                                        <span>{course.rating || "5.0"}</span>
                                                        {course.reviewCount > 0 && <span className="text-[9px] opacity-70">({course.reviewCount})</span>}
                                                    </div>
                                                    <div className="flex items-center gap-2 text-[#0F4C4A] font-bold truncate max-w-[50%]">
                                                        <span className="truncate">By {displayInstructor}</span>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="flex items-end justify-between mt-8 pt-8 border-t border-gray-50">
                                                <div className="flex flex-col">
                                                    <span className="text-[9px] text-gray-400 font-black uppercase mb-1">Duration</span>
                                                    <div className="flex items-center gap-2">
                                                        <span className="text-xs font-black text-[#0F172B] tracking-widest">
                                                            {course.estimatedDuration ? formatDuration(course.estimatedDuration) : 'Project Track'}
                                                        </span>
                                                    </div>
                                                </div>
                                                <div className="flex items-center gap-4">
                                                    {displayPrice !== "Free" && (
                                                        <span className="text-lg font-black text-[#0F4C4A] tracking-tight">{displayPrice}</span>
                                                    )}
                                                    <button
                                                        onClick={() => navigate(`/student/checkout/${course.id || course.courseId}`)}
                                                        className="bg-[#1E8A85] text-white px-6 py-3 rounded-[18px] font-black text-xs hover:bg-[#0F4C4A] transition-all hover:scale-105 shadow-xl shadow-[#1E8A85]/20 active:scale-95 whitespace-nowrap"
                                                    >
                                                        Enroll
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </MagneticCard>
                                )
                            } catch (err) {
                                console.error("❌ Error rendering course:", course, err);
                                return null;
                            }
                        });
                    })()}
                </div>
            </section>

            {/* 4. CATEGORIES SECTION */}
            <section className="bg-gray-50/50 py-40 px-6 relative overflow-hidden">
                <div className="max-w-7xl mx-auto relative z-10 text-center">
                    <h2 className="text-4xl font-black tracking-tighter mb-16 text-[#0F172B] reveal-on-scroll">Specialized Paths</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                        {isLoading ? (
                            [1, 2, 3].map((i) => (
                                <div key={i} className="bg-gradient-to-br from-gray-300 to-gray-400 rounded-[50px] p-12 h-[380px] flex flex-col justify-between relative overflow-hidden animate-pulse">
                                    <div className="h-12 bg-gray-200/50 rounded w-3/4"></div>
                                    <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center">
                                        <Users size={18} className="text-white/40" />
                                    </div>
                                </div>
                            ))
                        ) : (
                            categories.length > 0 ? categories : [
                                { id: 'fallback-1', name: "Creative Design", count: "22k +" },
                                { id: 'fallback-2', name: "UI / UX Mastery", count: "18k +" },
                                { id: 'fallback-3', name: "Growth Marketing", count: "25k +" }
                            ]
                        ).slice(0, 3).map((cat, idx) => {
                            const gradients = ["from-[#1E8A85] to-[#4AA59B]", "from-[#0F4C4A] to-[#1E8A85]", "from-[#15615E] to-[#1E8A85]"];
                            const randomCount = cat.count || (Math.floor(Math.random() * (30 - 10 + 1) + 10) + "k +");
                            return (
                                <div
                                    key={cat.id || idx}
                                    onClick={() => cat.id && !cat.id.startsWith('fallback') ? navigate('/student/available-courses', { state: { categoryId: cat.id } }) : navigate('/student/available-courses')}
                                    className={`bg-gradient-to-br ${gradients[idx % 3]} rounded-3xl md:rounded-[50px] p-8 md:p-12 h-[300px] md:h-[380px] flex flex-col justify-between relative overflow-hidden group cursor-pointer shadow-2xl hover:-translate-y-4 transition-all duration-700 delay-${(idx + 1) * 100} text-left`}
                                >
                                    <h3 className="text-2xl md:text-4xl font-black text-white leading-[1] md:leading-[0.9] tracking-tighter group-hover:translate-x-3 transition-transform duration-500">{cat.name}</h3>
                                    <div className="z-10 bg-white/10 backdrop-blur-xl rounded-full p-2.5 px-5 flex items-center gap-3 md:gap-4 border border-white/20 w-fit group-hover:bg-white group-hover:text-[#0F4C4A] transition-all duration-500">
                                        <Users size={16} className="group-hover:text-[#0F4C4A] text-white" />
                                        <span className="font-black text-[11px] md:text-sm tracking-widest text-white group-hover:text-[#0F4C4A] transition-colors">{randomCount}</span>
                                    </div>
                                    <div className="absolute -bottom-20 -right-20 w-80 h-80 bg-white/20 rounded-full blur-[100px] group-hover:scale-150 transition-transform duration-1000" />
                                </div>
                            );
                        })}
                    </div>

                    <div className="mt-16">
                        <button
                            onClick={() => navigate('/student/available-courses')}
                            className="text-[#1E8A85] font-black text-sm tracking-[0.2em] uppercase border-b-2 border-transparent hover:border-[#1E8A85] transition-all hover:translate-x-2"
                        >
                            Explore All Categories →
                        </button>
                    </div>
                </div>
            </section>

            {/* 5. SECONDARY HERO SECTION */}
            <section className="bg-white py-40 px-6 reveal-on-scroll">
                <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
                    <div className="space-y-8 md:space-y-12">
                        <h2 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter text-[#0F172B] leading-[0.9] md:leading-[0.85]">
                            elevate your <br />
                            <span className="text-[#1E8A85] italic font-serif relative">
                                potential
                                <svg className="absolute -bottom-4 left-0 w-full h-4 text-[#1E8A85]/20" viewBox="0 0 100 10" preserveAspectRatio="none">
                                    <path d="M0 5 Q 50 10 100 5" stroke="currentColor" strokeWidth="2" fill="none" />
                                </svg>
                            </span>
                        </h2>
                        <p className="text-gray-400 text-xl leading-relaxed max-w-lg font-medium">
                            Step into the future of education. Personalized, expert-led training designed for the next generation of innovators.
                        </p>
                        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 sm:gap-10">
                            <button
                                onClick={() => navigate('/student/available-courses')}
                                className="w-full sm:w-auto bg-[#0F4C4A] text-white px-10 md:px-12 py-4 md:py-5 rounded-xl md:rounded-2xl font-black shadow-[0_20px_50px_rgba(15,76,74,0.3)] hover:bg-[#1E8A85] transition-all hover:scale-105"
                            >
                                Start Learning
                            </button>
                            <button className="text-[#0F4C4A] font-black text-xs md:text-sm tracking-[0.2em] uppercase border-b-2 border-transparent hover:border-[#1E8A85] transition-all">Curriculum</button>
                        </div>
                        <div className="flex flex-wrap gap-16 pt-12 border-t border-gray-100 font-bold">
                            <div>
                                <p className="text-5xl font-black text-[#0F4C4A] tracking-tighter"><CountUpNumber end={10} suffix="K+" /></p>
                                <p className="text-[10px] text-gray-400 font-black uppercase tracking-widest mt-2">Active Students</p>
                            </div>
                            <div>
                                <p className="text-5xl font-black text-[#0F4C4A] tracking-tighter"><CountUpNumber end={500} suffix="+" /></p>
                                <p className="text-[10px] text-gray-400 font-black uppercase tracking-widest mt-2">Specialized Courses</p>
                            </div>
                            <div>
                                <p className="text-5xl font-black text-[#0F4C4A] tracking-tighter"><CountUpNumber end={4.9} suffix=" ★" /></p>
                                <p className="text-[10px] text-gray-400 font-black uppercase tracking-widest mt-2">Users Satisfaction</p>
                            </div>
                        </div>
                    </div>
                    <div className="relative reveal-on-scroll delay-300">
                        <div className="absolute inset-0 bg-[#1E8A85]/10 blur-[120px] rounded-full animate-pulse" />
                        <img
                            src="/student_studying_hero.png"
                            alt="Student"
                            className="w-full max-w-xl mx-auto relative z-10 animate-float"
                        />
                    </div>
                </div>
            </section >

            {/* 6. ELITE MENTORS SPOTLIGHT */}
            < section className="bg-white py-40 px-6 relative overflow-hidden" >
                <div className="max-w-7xl mx-auto relative z-10">
                    <div className="text-center mb-16 md:mb-24 reveal-on-scroll">
                        <h2 className="text-4xl md:text-6xl lg:text-7xl font-black tracking-tighter text-[#0F172B] leading-tight mb-6 uppercase">
                            Learn from the <span className="text-[#1E8A85]">Best</span>
                        </h2>
                        <p className="text-gray-400 font-medium text-lg md:text-xl max-w-2xl mx-auto px-4">
                            Our mentors are industry leaders from top global companies, dedicated to your growth.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                        {[
                            { name: "Dr. Angela Yu", role: "Fullstack Architect", students: "2M+", courses: "15", img: "https://randomuser.me/api/portraits/men/32.jpg", delay: "delay-100" },
                            { name: "Gary Simon", role: "Design Visionary", students: "800K+", courses: "22", img: "https://randomuser.me/api/portraits/men/32.jpg", delay: "delay-200" },
                            { name: "Maximilian S.", role: "Software Engineer", students: "1.5M+", courses: "30", img: "https://randomuser.me/api/portraits/men/46.jpg", delay: "delay-300" }
                        ].map((mentor, idx) => (
                            <MagneticCard key={idx} className={`group relative reveal-on-scroll ${mentor.delay}`}>
                                <div className="relative h-[500px] rounded-[50px] overflow-hidden shadow-2xl transition-all duration-700 group-hover:shadow-[#1E8A85]/20">
                                    {/* Background Image / Portrait */}
                                    <img
                                        src={mentor.img}
                                        alt={mentor.name}
                                        className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-105"
                                    />
                                    {/* Gradient Overlay */}
                                    <div className="absolute inset-0 bg-gradient-to-t from-[#0F172B] via-transparent to-transparent opacity-90 group-hover:opacity-100 transition-opacity" />

                                    {/* Mentor Details */}
                                    <div className="absolute bottom-10 left-10 right-10 space-y-4">
                                        <div className="space-y-1">
                                            <p className="text-[#1E8A85] font-black text-xs uppercase tracking-[0.3em]">{mentor.role}</p>
                                            <h3 className="text-3xl font-black text-white">{mentor.name}</h3>
                                        </div>

                                        <div className="flex gap-8 pt-4 border-t border-white/10">
                                            <div className="text-left">
                                                <p className="text-white font-black text-lg leading-none">{mentor.students}</p>
                                                <p className="text-white/40 text-[9px] font-bold uppercase mt-1">Students</p>
                                            </div>
                                            <div className="text-left">
                                                <p className="text-white font-black text-lg leading-none">{mentor.courses}</p>
                                                <p className="text-white/40 text-[9px] font-bold uppercase mt-1">Courses</p>
                                            </div>
                                        </div>

                                        <button className="w-full bg-white text-[#0F172B] py-4 rounded-2xl font-black text-xs uppercase tracking-widest opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-500">
                                            View Profile
                                        </button>
                                    </div>
                                </div>
                            </MagneticCard>
                        ))}
                    </div>
                </div>
            </section >

            {/* 7. REGAL CTA SECTION */}
            <section className="py-24 md:py-40 px-6 bg-[#1A1A1A] relative overflow-hidden text-center">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,#1E8A85,transparent_70%)] opacity-10 animate-pulse"></div>
                <div className="max-w-4xl mx-auto space-y-8 md:space-y-12 relative z-10 reveal-on-scroll">
                    <h2 className="text-6xl md:text-8xl lg:text-9xl font-black text-white tracking-tighter leading-[0.9] md:leading-none animate-shimmer-text uppercase px-2">Ready for <br /> takeoff?</h2>
                    <p className="text-white/40 text-lg md:text-xl max-w-2xl mx-auto font-medium leading-relaxed px-4">Join 10,000+ pioneers transforming their lives through high-impact education.</p>
                    <div className="flex flex-wrap justify-center items-center pt-10">
                        <button
                            onClick={() => navigate('/student/available-courses')}
                            className="bg-white text-[#0F4C4A] px-16 py-6 rounded-3xl font-black shadow-[0_0_50px_rgba(255,255,255,0.1)] hover:scale-110 hover:shadow-[0_0_80px_rgba(255,255,255,0.2)] active:scale-95 transition-all text-xl"
                        >
                            Enroll Now — Forever Free
                        </button>
                    </div>
                </div>
                <div className="absolute top-0 right-0 w-96 h-96 bg-[#1E8A85]/10 rounded-full blur-[100px] -mr-48 -mt-48 pointer-events-none"></div>
                <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#4AA59B]/10 rounded-full blur-[100px] -ml-48 -mb-48 pointer-events-none"></div>
            </section >

            {/* Advanced Animations CSS */}
            < style > {`
                @keyframes mesh-1 { 0%, 100% { transform: translate(0, 0); } 50% { transform: translate(10%, 10%); } }
                @keyframes mesh-2 { 0%, 100% { transform: translate(0, 0); } 50% { transform: translate(-15%, -10%); } }
                @keyframes mesh-3 { 0%, 100% { transform: translate(0, 0); } 50% { transform: translate(10%, -15%); } }
                @keyframes float { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-30px); } }
                @keyframes float-delayed { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-20px); } }
                @keyframes shimmer { 0% { background-position: -200% center; } 100% { background-position: 200% center; } }
                @keyframes gradient-text { 0% { background-position: 0% 50%; } 50% { background-position: 100% 50%; } 100% { background-position: 0% 50%; } }

                .animate-mesh-1 { animation: mesh-1 15s ease-in-out infinite; }
                .animate-mesh-2 { animation: mesh-2 18s ease-in-out infinite; }
                .animate-mesh-3 { animation: mesh-3 20s ease-in-out infinite; }
                .animate-float { animation: float 6s ease-in-out infinite; }
                .animate-float-delayed { animation: float-delayed 8s ease-in-out infinite 1s; }
                .animate-gradient-text { background-size: 200% auto; animation: gradient-text 5s linear infinite; }
                .animate-shimmer-text { background: linear-gradient(90deg, #fff 0%, #4AA59B 50%, #fff 100%); background-size: 200% auto; -webkit-background-clip: text; -webkit-text-fill-color: transparent; animation: shimmer 8s linear infinite; }

                .reveal-on-scroll {
                    opacity: 0;
                    transform: translateY(60px);
                    transition: all 1.2s cubic-bezier(0.16, 1, 0.3, 1);
                }
                .reveal-visible {
                    opacity: 1 !important;
                    transform: translateY(0) !important;
                }
                .delay-100 { transition-delay: 100ms; }
                .delay-200 { transition-delay: 200ms; }
                .delay-300 { transition-delay: 300ms; }
                .delay-400 { transition-delay: 400ms; }
            `}</style>
        </div>
    );
};

export default StudentDashboard;
