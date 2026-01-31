import React, { useState } from 'react';
import { X, Star, Users, Info, CheckCircle2, PlayCircle, Zap } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { BaseURL, isWorkingUrl, formatDuration } from '../../services/courseService';

const checkAuth = () => {
    const token = localStorage.getItem('token');
    if (!token) {
        Swal.fire({
            title: 'Login Required',
            text: 'Please log in first to access this feature.',
            icon: 'info',
            showCancelButton: true,
            confirmButtonColor: '#0F4C4A',
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

const CourseModal = ({ course, onClose }) => {
    const [showTrailer, setShowTrailer] = useState(false);
    const navigate = useNavigate();
    if (!course) return null;

    return (
        <div
            className="fixed inset-0 bg-[#0F172B]/80 backdrop-blur-md flex items-center justify-center z-[100] p-4 animate-in fade-in duration-500"
            onClick={onClose}
        >
            <div
                className="bg-white rounded-[24px] md:rounded-[32px] w-full max-w-lg md:max-w-3xl max-h-[90vh] md:max-h-[85vh] shadow-2xl relative animate-in zoom-in-95 duration-500 overflow-hidden flex flex-col"
                onClick={(e) => e.stopPropagation()}
            >
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 p-2 bg-white/90 hover:bg-white rounded-full text-[#0F4C4A] shadow-md transition-all z-[110] border border-gray-100 hover:scale-110 active:scale-95 group"
                >
                    <X size={18} className="transition-transform group-hover:rotate-90" />
                </button>

                <div className="flex flex-col h-full overflow-y-auto md:overflow-hidden md:flex-row">
                    {/* Media Side (Compact) */}
                    <div className="w-full h-48 sm:h-56 md:h-auto md:w-[40%] shrink-0 bg-[#0F172B] overflow-hidden relative">
                        {showTrailer ? (
                            <div className="w-full h-full relative group">
                                <iframe
                                    src={(course.trailerVideoUrl && isWorkingUrl(course.trailerVideoUrl))
                                        ? (course.trailerVideoUrl.startsWith('http') ? course.trailerVideoUrl : `${BaseURL}/${course.trailerVideoUrl.replace(/^\//, '')}`)
                                        : ""}
                                    className="w-full h-full"
                                    title="Course Trailer"
                                    allow="autoplay; encrypted-media"
                                    allowFullScreen
                                ></iframe>
                                <button
                                    onClick={() => setShowTrailer(false)}
                                    className="absolute top-4 left-4 p-3 bg-black/80 text-white rounded-full hover:bg-black transition-all shadow-lg hover:scale-110 z-20 border border-white/10"
                                >
                                    <X size={18} />
                                </button>
                            </div>
                        ) : (
                            <div className="w-full h-full relative">
                                <img
                                    src={(course.thumbnailUrl || course.image) && isWorkingUrl(course.thumbnailUrl || course.image)
                                        ? ((course.thumbnailUrl || course.image).startsWith('http') ? (course.thumbnailUrl || course.image) : `${BaseURL}/${(course.thumbnailUrl || course.image).replace(/^\//, '')}`)
                                        : "/course_placeholder.png"}
                                    alt={course.title}
                                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                                    onError={(e) => { e.target.src = "/course_placeholder.png"; }}
                                />

                                {/* Overlay Gradients */}
                                <div className="absolute inset-0 bg-gradient-to-t from-[#0F172B] via-transparent to-transparent opacity-90"></div>

                                {/* Floating Content */}
                                <div className="absolute bottom-6 left-6 right-6 text-white text-left">
                                    <div className="flex flex-col gap-2">
                                        <span className="bg-[#4AA59B] px-2 py-0.5 rounded-md text-[9px] font-black uppercase tracking-wider mb-2 inline-block shadow-md">
                                            Preview
                                        </span>
                                        <button
                                            onClick={() => setShowTrailer(true)}
                                            className="inline-flex items-center gap-4 group/play bg-white/10 backdrop-blur-md border border-white/20 p-2 pr-6 rounded-full hover:bg-white/20 transition-all w-fit"
                                        >
                                            <div className="w-12 h-12 bg-white flex items-center justify-center rounded-full text-[#0F4C4A] shadow-xl group-hover/play:scale-110 transition-transform">
                                                <PlayCircle size={24} fill="currentColor" />
                                            </div>
                                            <span className="font-black text-sm uppercase tracking-widest">Experience Trailer</span>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Content Side */}
                    <div className="flex-1 p-5 md:p-8 flex flex-col bg-white overflow-y-auto custom-scrollbar">
                        {/* Header Badges */}
                        <div className="flex flex-wrap items-center gap-2 mb-4">
                            <span className="bg-[#F0FDFB] text-[#0F4C4A] px-3 py-1 rounded-full text-[9px] font-bold uppercase tracking-wider border border-[#BFF1EA]">
                                {course.categoryName || course.category || "Education"}
                            </span>
                            <span className="w-1.5 h-1.5 rounded-full bg-gray-200"></span>
                            <span className="text-[#4AA59B] text-[10px] font-black uppercase tracking-widest">
                                Level: {course.level || "Beginner"}
                            </span>
                            <span className="w-1.5 h-1.5 rounded-full bg-gray-200"></span>
                            <span className="text-gray-400 text-[9px] font-bold uppercase">
                                #{course.id?.split('-')[0]}
                            </span>
                        </div>

                        {/* Title & Instructor */}
                        <div className="mb-6">
                            <div className="inline-flex items-center gap-1.5 mb-1.5">
                                <Users size={12} className="text-[#4AA59B]" />
                                <span className="text-xs font-bold text-[#4AA59B]">{course.instructorName || "Expert Mentor"}</span>
                            </div>
                            <h2 className="text-2xl md:text-3xl font-black text-[#0F172B] leading-tight">
                                {course.title}
                            </h2>
                        </div>

                        {/* Quick Stats Grid */}
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6 p-4 bg-gray-50/80 rounded-xl border border-gray-100">
                            <div className="flex flex-col gap-0.5">
                                <div className="flex items-center gap-1 text-yellow-500">
                                    <Star size={12} fill="currentColor" />
                                    <span className="font-black text-sm">{course.rating || "4.8"}</span>
                                </div>
                                <span className="text-[9px] text-gray-400 font-bold uppercase">({course.reviewCount || "0"} reviews)</span>
                            </div>

                            <div className="flex flex-col gap-0.5 border-l border-gray-200 pl-3">
                                <div className="flex items-center gap-1 text-[#0F4C4A]">
                                    <Users size={12} />
                                    <span className="font-black text-sm">{(course.studentCount || course.enrolled || 0).toLocaleString()}</span>
                                </div>
                                <span className="text-[9px] text-gray-400 font-bold uppercase">Students</span>
                            </div>

                            <div className="flex flex-col gap-0.5 border-l border-gray-200 pl-3">
                                <div className="flex items-center gap-1 text-[#4AA59B]">
                                    <span className="font-black text-xs uppercase">{course.language || "English"}</span>
                                </div>
                                <span className="text-[9px] text-gray-400 font-bold uppercase">Language</span>
                            </div>

                            <div className="flex flex-col gap-0.5 border-l border-gray-200 pl-3">
                                <div className="flex items-center gap-1 text-gray-700">
                                    <PlayCircle size={12} />
                                    <span className="font-bold text-xs whitespace-nowrap">{formatDuration(course.estimatedDuration || course.duration)}</span>
                                </div>
                                <span className="text-[9px] text-gray-400 font-bold uppercase">Duration</span>
                            </div>
                        </div>

                        {/* Description */}
                        <div className="space-y-4 mb-8">
                            <p className="text-xs md:text-sm text-gray-600 leading-relaxed max-w-prose">
                                {course.description || "Comprehensive course designed for professionals."}
                            </p>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                                {[
                                    "Production-grade workflows",
                                    "Real-world projects",
                                    "Industry best practices"
                                ].map((feature, i) => (
                                    <div key={i} className="flex items-center gap-2">
                                        <CheckCircle2 size={12} className="text-[#4AA59B] shrink-0" />
                                        <span className="text-[10px] md:text-xs font-bold text-gray-700">{feature}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Footer */}
                        <div className="mt-auto pt-5 border-t border-gray-100 flex items-center justify-between gap-4">
                            <div className="shrink-0">
                                <span className="text-2xl md:text-3xl font-black text-[#0F4C4A]">
                                    {course.price && course.price.toString().startsWith('$') ? course.price : `$${course.price || "0"}`}
                                </span>
                            </div>
                            <button
                                onClick={() => {
                                    if (checkAuth()) {
                                        navigate(`/student/checkout/${course.id}`);
                                    }
                                }}
                                className="flex-1 max-w-[200px] bg-[#0F4C4A] text-white py-3 rounded-xl font-bold text-xs uppercase tracking-wider hover:bg-[#1a6d6a] transition-all shadow-lg active:scale-95 flex items-center justify-center gap-2"
                            >
                                Enroll Now
                                <Zap size={14} />
                            </button>
                        </div>
                    </div>
                </div>
                <style>{`
                    .custom-scrollbar::-webkit-scrollbar {
                        width: 4px;
                    }
                    .custom-scrollbar::-webkit-scrollbar-track {
                        background: transparent;
                    }
                    .custom-scrollbar::-webkit-scrollbar-thumb {
                        background: rgba(15, 76, 74, 0.1);
                        border-radius: 10px;
                    }
                    .custom-scrollbar::-webkit-scrollbar-thumb:hover {
                        background: rgba(37, 173, 167, 0.3);
                    }
                `}</style>
            </div>
        </div>
    );
};

export default CourseModal;
