import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { BookOpen, Users, Award, TrendingUp, CheckCircle, ArrowRight } from "lucide-react";

const TeacherLanding = () => {
    const navigate = useNavigate();
    const [isVisible, setIsVisible] = useState({});

    useEffect(() => {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -100px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    setIsVisible(prev => ({
                        ...prev,
                        [entry.target.id]: true
                    }));
                }
            });
        }, observerOptions);

        document.querySelectorAll('[id^="section-"]').forEach(el => {
            observer.observe(el);
        });

        return () => observer.disconnect();
    }, []);


    const steps = [
        {
            icon: BookOpen,
            title: "Apply to Become a Teacher",
            description: "Submit your application and share your expertise with eager learners worldwide."
        },
        {
            icon: Users,
            title: "Setup Your Profile",
            description: "Create a compelling profile that showcases your skills and teaching experience."
        },
        {
            icon: Award,
            title: "Create Your Course",
            description: "Design engaging courses with our intuitive course creation tools and templates."
        },
        {
            icon: TrendingUp,
            title: "Start Teaching & Earning",
            description: "Launch your course, inspire students, and build a sustainable income stream."
        },
    ];

    const benefits = [
        "Teach your students with complete creative freedom",
        "Set your own schedule and work from anywhere",
        "Access to powerful analytics and student insights",
        "Dedicated support team to help you succeed"
    ];

    const stats = [
        { number: "26K+", label: "Certified Instructors" },
        { number: "67.1K", label: "Active Students" },
        { number: "71", label: "Countries Worldwide" },
        { number: "4.9", label: "Average Rating" }
    ];

    return (
        <div className="bg-white overflow-hidden">
            {/* Hero Section */}
            <section
                id="section-hero"
                className={`relative bg-gradient-to-br from-[#176D69] via-[#1a7d78] to-[#0F4C4A] text-white py-20 md:py-32 transition-all duration-1000 ${isVisible['section-hero'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                    }`}
            >
                <div className="absolute inset-0 bg-[url('/image/pattern.svg')] opacity-5"></div>

                <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                        {/* Left Content */}
                        <div className="text-center lg:text-left space-y-6 animate-in fade-in slide-in-from-left duration-700">
                            <div className="inline-block px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-sm font-semibold mb-4">
                                🎓 Join Our Teaching Community
                            </div>

                            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black leading-tight">
                                Become an <br />
                                <span className="text-[#A6E5E3]">Inspiring Teacher</span>
                            </h1>

                            <p className="text-lg sm:text-xl text-white/90 max-w-xl">
                                Share your knowledge with thousands of eager learners. Create courses, inspire students, and build a thriving teaching career on your own terms.
                            </p>

                            <div className="flex flex-col sm:flex-row gap-4 pt-4">
                                <button
                                    onClick={() => navigate('/signup')}
                                    className="group px-8 py-4 bg-[#A6E5E3] text-[#0F4C4A] rounded-xl font-bold text-lg hover:bg-white hover:scale-105 transition-all duration-300 shadow-xl hover:shadow-2xl flex items-center justify-center gap-2"
                                >
                                    Get Started Free
                                    <ArrowRight className="group-hover:translate-x-1 transition-transform" size={20} />
                                </button>

                                <button
                                    onClick={() => navigate('/login')}
                                    className="px-8 py-4 bg-white/10 backdrop-blur-sm border-2 border-white/30 text-white rounded-xl font-bold text-lg hover:bg-white/20 hover:scale-105 transition-all duration-300"
                                >
                                    Sign In
                                </button>
                            </div>

                            {/* Stats */}
                            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 pt-8">
                                {stats.map((stat, idx) => (
                                    <div key={idx} className="text-center">
                                        <div className="text-3xl sm:text-4xl font-black text-[#A6E5E3]">{stat.number}</div>
                                        <div className="text-sm text-white/70 mt-1">{stat.label}</div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Right Image */}
                        <div className="relative animate-in fade-in slide-in-from-right duration-700 delay-300">
                            <div className="relative z-10">
                                <img
                                    src="/image/bg-teacher.png"
                                    alt="Teacher Hero"
                                    className="w-full max-w-md mx-auto drop-shadow-2xl animate-float"
                                />
                            </div>
                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[#A6E5E3]/20 rounded-full blur-3xl"></div>
                        </div>
                    </div>
                </div>

                {/* Wave Bottom */}
                <div className="absolute bottom-0 left-0 right-0">
                    <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M0 120L60 110C120 100 240 80 360 70C480 60 600 60 720 65C840 70 960 80 1080 85C1200 90 1320 90 1380 90L1440 90V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z" fill="white" />
                    </svg>
                </div>
            </section>

            {/* Why Teach Section */}
            <section
                id="section-why"
                className={`py-20 md:py-32 transition-all duration-1000 ${isVisible['section-why'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                    }`}
            >
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                        {/* Image */}
                        <div className="order-2 lg:order-1 animate-in fade-in slide-in-from-left duration-700">
                            <img
                                src="/images/teaching.png"
                                alt="Teaching"
                                className="w-full max-w-md mx-auto rounded-2xl shadow-2xl"
                            />
                        </div>

                        {/* Content */}
                        <div className="order-1 lg:order-2 space-y-6 animate-in fade-in slide-in-from-right duration-700">
                            <div className="inline-block px-4 py-2 bg-[#A6E5E3]/20 rounded-full text-sm font-bold text-[#176D69]">
                                Why Choose EduNEXA
                            </div>

                            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#0F172B] leading-tight">
                                Why You'll Start Teaching on{" "}
                                <span className="text-[#25ADA7]">EduNEXA</span>
                            </h2>

                            <p className="text-gray-600 text-lg">
                                Join a thriving community of educators who are making a real impact. Our platform provides everything you need to succeed as an online instructor.
                            </p>

                            <div className="space-y-4 pt-4">
                                {benefits.map((benefit, idx) => (
                                    <div
                                        key={idx}
                                        className="flex items-start gap-4 p-4 bg-gradient-to-r from-[#F0F9F8] to-transparent rounded-xl hover:from-[#E6F4F3] transition-all duration-300 group"
                                    >
                                        <div className="flex-shrink-0 w-8 h-8 rounded-full bg-[#176D69] flex items-center justify-center group-hover:scale-110 transition-transform">
                                            <CheckCircle size={18} className="text-white" />
                                        </div>
                                        <p className="text-[#093332] font-semibold pt-1">{benefit}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* How It Works Section */}
            <section
                id="section-steps"
                className={`py-20 md:py-32 bg-gradient-to-br from-[#F0F9F8] to-[#E6F4F3] transition-all duration-1000 ${isVisible['section-steps'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                    }`}
            >
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16 animate-in fade-in zoom-in duration-700">
                        <div className="inline-block px-4 py-2 bg-white rounded-full text-sm font-bold text-[#176D69] mb-4">
                            Simple Process
                        </div>
                        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#0F172B] mb-4">
                            How You'll Become a <br />Successful Teacher
                        </h2>
                        <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                            Follow these simple steps to start your teaching journey and inspire thousands of students
                        </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                        {steps.map((step, idx) => {
                            const Icon = step.icon;
                            return (
                                <div
                                    key={idx}
                                    className="group bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 animate-in fade-in zoom-in"
                                    style={{ animationDelay: `${idx * 150}ms` }}
                                >
                                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#176D69] to-[#25ADA7] flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300">
                                        <Icon size={32} className="text-white" />
                                    </div>

                                    <div className="text-5xl font-black text-[#A6E5E3] mb-4">{idx + 1}</div>

                                    <h3 className="text-xl font-bold text-[#0F172B] mb-3">
                                        {step.title}
                                    </h3>

                                    <p className="text-gray-600 leading-relaxed">
                                        {step.description}
                                    </p>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section
                id="section-cta"
                className={`py-20 md:py-32 bg-gradient-to-br from-[#176D69] via-[#1a7d78] to-[#0F4C4A] text-white relative overflow-hidden transition-all duration-1000 ${isVisible['section-cta'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                    }`}
            >
                <div className="absolute inset-0 bg-[url('/image/pattern.svg')] opacity-5"></div>

                <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                        {/* Content */}
                        <div className="text-center lg:text-left space-y-6 animate-in fade-in slide-in-from-left duration-700">
                            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black leading-tight">
                                Start Teaching With Us <br />
                                <span className="text-[#A6E5E3]">And Inspire Others</span>
                            </h2>

                            <p className="text-xl text-white/90 max-w-xl">
                                Join 26,000+ certified instructors creating success stories with 67,100+ students across 71 countries. Your teaching journey starts here.
                            </p>

                            <div className="flex flex-col sm:flex-row gap-4 pt-4">
                                <button
                                    onClick={() => navigate('/signup')}
                                    className="group px-8 py-4 bg-[#A6E5E3] text-[#0F4C4A] rounded-xl font-bold text-lg hover:bg-white hover:scale-105 transition-all duration-300 shadow-xl hover:shadow-2xl flex items-center justify-center gap-2"
                                >
                                    Register Now
                                    <ArrowRight className="group-hover:translate-x-1 transition-transform" size={20} />
                                </button>

                                <button
                                    onClick={() => navigate('/contact')}
                                    className="px-8 py-4 bg-white/10 backdrop-blur-sm border-2 border-white/30 text-white rounded-xl font-bold text-lg hover:bg-white/20 hover:scale-105 transition-all duration-300"
                                >
                                    Learn More
                                </button>
                            </div>
                        </div>

                        {/* Image */}
                        <div className="relative animate-in fade-in slide-in-from-right duration-700 delay-300">
                            <img
                                src="/images/start-teaching.png"
                                alt="Start Teaching"
                                className="w-full max-w-md mx-auto drop-shadow-2xl"
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* Custom Animations */}
            <style>{`
                @keyframes float {
                    0%, 100% { transform: translateY(0px); }
                    50% { transform: translateY(-20px); }
                }
                
                .animate-float {
                    animation: float 6s ease-in-out infinite;
                }

                @keyframes fade-in {
                    from { opacity: 0; }
                    to { opacity: 1; }
                }

                @keyframes slide-in-from-left {
                    from { transform: translateX(-50px); opacity: 0; }
                    to { transform: translateX(0); opacity: 1; }
                }

                @keyframes slide-in-from-right {
                    from { transform: translateX(50px); opacity: 0; }
                    to { transform: translateX(0); opacity: 1; }
                }

                @keyframes zoom-in {
                    from { transform: scale(0.9); opacity: 0; }
                    to { transform: scale(1); opacity: 1; }
                }

                .animate-in {
                    animation-fill-mode: both;
                }

                .fade-in {
                    animation-name: fade-in;
                }

                .slide-in-from-left {
                    animation-name: slide-in-from-left;
                }

                .slide-in-from-right {
                    animation-name: slide-in-from-right;
                }

                .zoom-in {
                    animation-name: zoom-in;
                }

                .delay-300 {
                    animation-delay: 300ms;
                }
            `}</style>
        </div>
    );
};

export default TeacherLanding;
