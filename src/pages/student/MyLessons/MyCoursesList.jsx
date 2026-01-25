import React from 'react';
import { useNavigate } from 'react-router-dom';
import { PlayCircle, Clock, BookOpen, ChevronRight } from 'lucide-react';

const EnrolledCourseCard = ({ course }) => {
    const navigate = useNavigate();

    return (
        <div
            onClick={() => navigate('/student/course-lessons')}
            className="group bg-white rounded-3xl border border-gray-100 overflow-hidden hover:shadow-2xl hover:shadow-[#0F4C4A]/5 transition-all duration-500 cursor-pointer"
        >
            <div className="relative h-44 overflow-hidden">
                <img
                    src={course.image}
                    alt={course.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors duration-500 flex items-center justify-center opacity-0 group-hover:opacity-100">
                    <div className="bg-white/20 backdrop-blur-md p-3 rounded-full border border-white/30 text-white transform scale-90 group-hover:scale-100 transition-transform duration-300">
                        <PlayCircle size={32} />
                    </div>
                </div>
                <div className="absolute top-4 left-4">
                    <span className="bg-[#4AA59B] text-white text-[10px] font-bold px-2 py-1 rounded-md uppercase tracking-wider shadow-sm">
                        {course.category}
                    </span>
                </div>
            </div>

            <div className="p-6">
                <div className="flex items-center gap-2 mb-3">
                    <div className="w-6 h-6 rounded-full overflow-hidden bg-gray-100">
                        <img src={course.instructorImage} alt={course.instructor} className="w-full h-full object-cover" />
                    </div>
                    <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">{course.instructor}</span>
                </div>

                <h3 className="text-base font-black text-[#0F172B] mb-4 line-clamp-2 min-h-[3rem] group-hover:text-[#4AA59B] transition-colors leading-tight">
                    {course.title}
                </h3>

                <div className="mb-4">
                    <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-tight mb-2">
                        <span className="text-gray-400">Progress</span>
                        <span className="text-[#4AA59B]">{course.progress}%</span>
                    </div>
                    <div className="w-full h-1.5 bg-gray-50 rounded-full overflow-hidden">
                        <div
                            className="h-full bg-gradient-to-r from-[#0F4C4A] to-[#4AA59B] rounded-full transition-all duration-1000"
                            style={{ width: `${course.progress}%` }}
                        ></div>
                    </div>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-gray-50">
                    <div className="flex items-center gap-3 text-[10px] font-bold text-gray-400 uppercase tracking-tighter">
                        <div className="flex items-center gap-1">
                            <BookOpen size={12} className="text-[#4AA59B]" />
                            <span>{course.lessonsCompleted} / {course.totalLessons}</span>
                        </div>
                        <div className="flex items-center gap-1">
                            <Clock size={12} className="text-[#4AA59B]" />
                            <span>{course.duration}</span>
                        </div>
                    </div>
                    <div className="text-[#0F4C4A] group-hover:translate-x-1 transition-transform duration-300">
                        <ChevronRight size={18} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default function MyCoursesList() {
    const enrolledCourses = [
        {
            id: 1,
            title: "Advanced UI/UX Masterclass: From Beginner to Pro",
            instructor: "Sema Hodali",
            instructorImage: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop",
            progress: 65,
            lessonsCompleted: 12,
            totalLessons: 18,
            duration: "14h 30m",
            category: "Design",
            image: "https://images.unsplash.com/photo-1586717791821-3f44a563eb4c?w=800&auto=format&fit=crop"
        },
        {
            id: 2,
            title: "Full-Stack Development with React and Node.js",
            instructor: "Ali Ahmed",
            instructorImage: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop",
            progress: 25,
            lessonsCompleted: 8,
            totalLessons: 32,
            duration: "45h 00m",
            category: "Development",
            image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&auto=format&fit=crop"
        },
        {
            id: 3,
            title: "Digital Marketing Strategy & SEO Mastery",
            instructor: "John Doe",
            instructorImage: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&auto=format&fit=crop",
            progress: 90,
            lessonsCompleted: 15,
            totalLessons: 16,
            duration: "12h 15m",
            category: "Marketing",
            image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&auto=format&fit=crop"
        }
    ];

    return (
        <div className="min-h-screen bg-[#FCFDFD] py-12 px-6">
            <div className="max-w-7xl mx-auto">
                <div className="mb-12">
                    <div className="flex items-center gap-3 mb-2">
                        <div className="w-1.5 h-6 bg-[#4AA59B] rounded-full"></div>
                        <span className="text-[#4AA59B] font-black uppercase tracking-[0.2em] text-[10px]">Your Workspace</span>
                    </div>
                    <h1 className="text-4xl font-black text-[#0F172B]">My <span className="text-[#4AA59B]">Courses</span></h1>
                    <p className="text-gray-400 mt-2 font-medium">Pick up where you left off and continue your learning journey.</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {enrolledCourses.map(course => (
                        <EnrolledCourseCard key={course.id} course={course} />
                    ))}
                </div>

                {enrolledCourses.length === 0 && (
                    <div className="flex flex-col items-center justify-center py-32 text-center bg-white rounded-[40px] border border-dashed border-gray-200">
                        <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mb-6 text-gray-300">
                            <BookOpen size={40} />
                        </div>
                        <h3 className="text-2xl font-bold text-[#0F172B] mb-2">No courses enrolled yet</h3>
                        <p className="text-gray-500 mb-8 max-w-sm font-medium">Start your learning journey today by exploring our available courses.</p>
                        <button
                            className="bg-[#0F4C4A] text-white px-8 py-4 rounded-xl font-bold hover:bg-[#4AA59B] transition-all shadow-lg active:scale-95 transform"
                        >
                            Browse Courses
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}
