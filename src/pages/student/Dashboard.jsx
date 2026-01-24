import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Search, PlayCircle, Star, Sparkles, TrendingUp, Award } from "lucide-react";

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

                <div className="max-w-7xl mx-auto text-center relative z-20 reveal-on-scroll">
                    <h1 className="text-4xl md:text-7xl font-black text-white mb-8 tracking-tighter leading-none animate-shimmer-text">
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
                <MagneticCard className="bg-[#093332] rounded-[50px] overflow-hidden shadow-[0_50px_100px_-20px_rgba(0,0,0,0.5)] relative aspect-[21/9] md:aspect-[25/8] group cursor-pointer border border-white/5">
                    <img
                        src="/featured_course_banner.png"
                        alt="Featured"
                        className="w-full h-full object-cover opacity-50 group-hover:scale-105 transition-transform duration-[3000ms]"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-[#0F4C4A]/80 via-transparent to-transparent flex items-center px-12">
                        <div className="text-white max-w-lg space-y-6">
                            <span className="inline-flex items-center gap-2 bg-[#1E8A85] px-4 py-1.5 rounded-full text-[10px] font-black tracking-widest uppercase shadow-xl animate-pulse">
                                <Sparkles size={12} /> Premium Course
                            </span>
                            <h2 className="text-4xl md:text-7xl font-black tracking-tighter leading-none">ux mastery</h2>
                            <p className="text-white/60 text-lg font-medium max-w-xs leading-relaxed">Transfrom your creative vision into digital reality with our expert training.</p>
                        </div>
                    </div>
                    <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-24 h-24 md:w-32 md:h-32 bg-white/10 backdrop-blur-xl rounded-full flex items-center justify-center text-white border border-white/20 hover:scale-110 hover:bg-white hover:text-[#0F4C4A] transition-all duration-700 shadow-[0_0_50px_rgba(255,255,255,0.2)]">
                            <PlayCircle size={64} className="md:size-80" fill="currentColor" fillOpacity="0.2" />
                        </div>
                    </div>
                </MagneticCard>
            </section>

            {/* 3. POPULAR COURSES SECTION */}
            <section className="max-w-7xl mx-auto px-6 mb-32 reveal-on-scroll">
                <div className="flex justify-between items-end mb-16">
                    <div>
                        <h2 className="text-4xl font-black tracking-tighter text-[#0F172B]">Popular Courses</h2>
                        <div className="w-20 h-2 bg-[#1E8A85] mt-4 rounded-full" />
                    </div>
                    <button onClick={() => navigate('/student/available-courses')} className="text-[#1E8A85] font-black text-sm tracking-widest uppercase hover:translate-x-2 transition-transform duration-300">View Catalog →</button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
                    {[
                        { title: "UI Design Patterns", instructor: "Dr. Ahmad Kamal", rating: "4.9", duration: "2mo", level: "Beginner", img: "/images/card1.png", delay: "delay-100" },
                        { title: "Game Design Essentials", instructor: "Eng. Shatha Amer", rating: "4.8", duration: "3mo", level: "Medium", img: "/images/card2.png", delay: "delay-200" },
                        { title: "Python Advanced Mastery", instructor: "Dr. Ebrahim", rating: "4.7", duration: "4mo", level: "Expert", img: "/images/card3.png", delay: "delay-300" }
                    ].map((course, idx) => (
                        <MagneticCard key={idx} className={`bg-white rounded-[40px] overflow-hidden shadow-[0_20px_50px_-15px_rgba(0,0,0,0.05)] border border-gray-100 hover:shadow-[0_40px_80px_-20px_rgba(74,165,155,0.2)] transition-all duration-500 group reveal-on-scroll ${course.delay}`}>
                            <div className="h-64 overflow-hidden relative">
                                <img src={course.img} alt={course.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-[1500ms]" />
                                <div className="absolute top-6 left-6 bg-white/95 backdrop-blur px-4 py-1.5 rounded-full text-[10px] font-black text-[#0F4C4A] uppercase tracking-widest shadow-xl">{course.level}</div>
                            </div>
                            <div className="p-10">
                                <h3 className="text-2xl font-black mb-4 text-[#0F172B] line-clamp-1 group-hover:text-[#1E8A85] transition-all leading-tight">{course.title}</h3>
                                <div className="flex items-center justify-between text-[11px] text-gray-400 font-black uppercase tracking-[0.2em] mb-8">
                                    <div className="flex items-center gap-2 font-bold"><Star size={18} fill="#FFC107" className="text-[#FFC107]" /><span className="text-[#0F172B]">{course.rating}</span></div>
                                    <div className="flex items-center gap-2">By {course.instructor.split('.')[1] || course.instructor}</div>
                                </div>
                                <div className="flex items-center justify-between mt-4 pt-8 border-t border-gray-50">
                                    <span className="text-xs font-black text-gray-400 uppercase tracking-widest">{course.duration} course</span>
                                    <button
                                        onClick={() => navigate('/student/available-courses')}
                                        className="bg-[#1E8A85] text-white px-8 py-3 rounded-2xl font-black text-xs hover:bg-[#0F4C4A] transition-all hover:scale-105 shadow-2xl shadow-[#1E8A85]/40"
                                    >
                                        Enroll Now
                                    </button>
                                </div>
                            </div>
                        </MagneticCard>
                    ))}
                </div>
            </section>

            {/* 4. CATEGORIES SECTION */}
            <section className="bg-gray-50/50 py-40 px-6 relative overflow-hidden">
                <div className="max-w-7xl mx-auto relative z-10 text-center">
                    <h2 className="text-4xl font-black tracking-tighter mb-16 text-[#0F172B] reveal-on-scroll">Specialized Paths</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                        {[
                            { title: "Creative Design", count: "22k +", delay: "delay-100", grad: "from-[#1E8A85] to-[#4AA59B]" },
                            { title: "UI / UX Mastery", count: "18k +", delay: "delay-200", grad: "from-[#0F4C4A] to-[#1E8A85]" },
                            { title: "Growth Marketing", count: "25k +", delay: "delay-300", grad: "from-[#15615E] to-[#1E8A85]" }
                        ].map((cat, idx) => (
                            <div key={idx} className={`bg-gradient-to-br ${cat.grad} rounded-[50px] p-12 h-[380px] flex flex-col justify-between relative overflow-hidden group cursor-pointer shadow-2xl hover:-translate-y-4 transition-all duration-700 reveal-on-scroll ${cat.delay} text-left`}>
                                <h3 className="text-4xl font-black text-white leading-[0.9] tracking-tighter group-hover:translate-x-3 transition-transform duration-500">{cat.title}</h3>
                                <div className="z-10 bg-white/10 backdrop-blur-xl rounded-full p-3 pr-8 flex items-center gap-6 border border-white/20 w-fit group-hover:bg-white group-hover:text-[#0F4C4A] transition-all duration-500">
                                    <div className="flex -space-x-4">
                                        {[1, 2, 3, 4].map(i => (
                                            <div key={i} className="w-10 h-10 rounded-full border-2 border-white/50 overflow-hidden bg-gray-200">
                                                <img src={`https://randomuser.me/api/portraits/${i % 2 === 0 ? 'women' : 'men'}/${30 + i + idx}.jpg`} alt="" />
                                            </div>
                                        ))}
                                    </div>
                                    <span className="font-black text-sm tracking-widest text-white group-hover:text-[#0F4C4A] transition-colors">{cat.count}</span>
                                </div>
                                <div className="absolute -bottom-20 -right-20 w-80 h-80 bg-white/20 rounded-full blur-[100px] group-hover:scale-150 transition-transform duration-1000" />
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* 5. HERO SECTION */}
            <section className="bg-white py-40 px-6 reveal-on-scroll">
                <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
                    <div className="space-y-12">
                        <h2 className="text-6xl md:text-8xl font-black tracking-tighter text-[#0F172B] leading-[0.85]">
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
                        <div className="flex items-center gap-10">
                            <button
                                onClick={() => navigate('/student/available-courses')}
                                className="bg-[#0F4C4A] text-white px-12 py-5 rounded-2xl font-black shadow-[0_20px_50px_rgba(15,76,74,0.3)] hover:bg-[#1E8A85] transition-all hover:scale-105"
                            >
                                Start Learning
                            </button>
                            <button className="text-[#0F4C4A] font-black text-sm tracking-[0.2em] uppercase border-b-2 border-transparent hover:border-[#1E8A85] transition-all">Curriculum</button>
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
            </section>

            {/* 6. ELITE MENTORS SPOTLIGHT */}
            <section className="bg-white py-40 px-6 relative overflow-hidden">
                <div className="max-w-7xl mx-auto relative z-10">
                    <div className="text-center mb-24 reveal-on-scroll">
                        <h2 className="text-5xl md:text-7xl font-black tracking-tighter text-[#0F172B] leading-none mb-6">
                            Learn from the <span className="text-[#1E8A85]">Best</span>
                        </h2>
                        <p className="text-gray-400 font-medium text-xl max-w-2xl mx-auto">
                            Our mentors are industry leaders from top global companies, dedicated to your growth.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                        {[
                            { name: "Dr. Angela Yu", role: "Fullstack Architect", students: "2M+", courses: "15", img: "https://randomuser.me/api/portraits/women/44.jpg", delay: "delay-100" },
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
            </section>

            {/* 7. REGAL CTA SECTION */}
            <section className="py-40 px-6 bg-[#1A1A1A] relative overflow-hidden text-center">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,#1E8A85,transparent_70%)] opacity-10 animate-pulse"></div>
                <div className="max-w-4xl mx-auto space-y-12 relative z-10 reveal-on-scroll">
                    <h2 className="text-6xl md:text-9xl font-black text-white tracking-tighter leading-none animate-shimmer-text">Ready for <br /> takeoff?</h2>
                    <p className="text-white/40 text-xl max-w-2xl mx-auto font-medium leading-relaxed">Join 10,000+ pioneers transforming their lives through high-impact education.</p>
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
            </section>

            {/* Advanced Animations CSS */}
            <style>{`
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
