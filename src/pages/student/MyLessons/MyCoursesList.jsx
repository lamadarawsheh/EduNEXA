import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { PlayCircle, Clock, BookOpen, ChevronRight } from 'lucide-react';
import { getApprovedCourses, isStudentEnrolled, BaseURL, isWorkingUrl, formatDuration } from '../../../services/courseService';

const EnrolledCourseCard = ({ course }) => {
    const navigate = useNavigate();

    const imageUrl = course.thumbnailUrl || course.image || course.imagePath || course.imageUrl;
    const safeImageUrl = imageUrl && isWorkingUrl(imageUrl)
        ? (imageUrl.startsWith('http') ? imageUrl : `${BaseURL}/${imageUrl.replace(/^\//, '')}`)
        : "/course_placeholder.png";

    return (
        <div
            onClick={() => navigate('/student/course-lessons', { state: { courseId: course.id } })}
            className="group bg-white rounded-3xl border border-gray-100 overflow-hidden hover:shadow-2xl hover:shadow-[#0F4C4A]/5 transition-all duration-500 cursor-pointer"
        >
            <div className="relative h-44 overflow-hidden">
                <img
                    src={safeImageUrl}
                    alt={course.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    onError={(e) => { e.target.src = "/course_placeholder.png"; }}
                />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors duration-500 flex items-center justify-center opacity-0 group-hover:opacity-100">
                    <div className="bg-white/20 backdrop-blur-md p-3 rounded-full border border-white/30 text-white transform scale-90 group-hover:scale-100 transition-transform duration-300">
                        <PlayCircle size={32} />
                    </div>
                </div>
                <div className="absolute top-4 left-4">
                    <span className="bg-[#4AA59B] text-white text-[10px] font-bold px-2 py-1 rounded-md uppercase tracking-wider shadow-sm">
                        {course.categoryName || course.category || 'Course'}
                    </span>
                </div>
            </div>

            <div className="p-6">
                <div className="flex items-center gap-2 mb-3">
                    <div className="w-6 h-6 rounded-full overflow-hidden bg-gray-100 flex items-center justify-center text-[10px] font-bold text-gray-400">
                        {(course.instructorName || 'Instructor')[0]}
                    </div>
                    <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">{course.instructorName || 'Expert Instructor'}</span>
                </div>

                <h3 className="text-base font-black text-[#0F172B] mb-4 line-clamp-2 min-h-[3rem] group-hover:text-[#4AA59B] transition-colors leading-tight">
                    {course.title}
                </h3>

                <div className="mb-4">
                    <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-tight mb-2">
                        <span className="text-gray-400">Progress</span>
                        <span className="text-[#4AA59B]">{course.progress || 0}%</span>
                    </div>
                    <div className="w-full h-1.5 bg-gray-50 rounded-full overflow-hidden">
                        <div
                            className="h-full bg-gradient-to-r from-[#0F4C4A] to-[#4AA59B] rounded-full transition-all duration-1000"
                            style={{ width: `${course.progress || 0}%` }}
                        ></div>
                    </div>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-gray-50">
                    <div className="flex items-center gap-3 text-[10px] font-bold text-gray-400 uppercase tracking-tighter">
                        <div className="flex items-center gap-1">
                            <BookOpen size={12} className="text-[#4AA59B]" />
                            <span>{course.lessonsCompleted || 0} / {course.totalLessons || 0}</span>
                        </div>
                        <div className="flex items-center gap-1">
                            <Clock size={12} className="text-[#4AA59B]" />
                            <span>{course.estimatedDuration ? formatDuration(course.estimatedDuration) : '0 hrs'}</span>
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
    const navigate = useNavigate();
    const [enrolledCourses, setEnrolledCourses] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchEnrolledCourses = async () => {
            try {
                setIsLoading(true);

                // 1. Fetch all approved courses
                const coursesResponse = await getApprovedCourses();
                const allCourses = coursesResponse.data || [];

                // 2. Check enrollment status for each course
                const enrollmentChecks = await Promise.all(
                    allCourses.map(async (course) => {
                        try {
                            const enrollmentResponse = await isStudentEnrolled(course.id);
                            return {
                                course,
                                isEnrolled: enrollmentResponse.data === true || enrollmentResponse.data?.isEnrolled === true
                            };
                        } catch (error) {
                            // If the API call fails, assume not enrolled
                            return { course, isEnrolled: false };
                        }
                    })
                );

                // 3. Filter only enrolled courses
                const enrolled = enrollmentChecks
                    .filter(item => item.isEnrolled)
                    .map(item => ({
                        ...item.course,
                        progress: 0, // TODO: Get actual progress from API
                        lessonsCompleted: 0, // TODO: Get from API
                        totalLessons: 0 // TODO: Get from API
                    }));

                setEnrolledCourses(enrolled);
            } catch (error) {
                console.error("Error fetching enrolled courses:", error);
                setEnrolledCourses([]);
            } finally {
                setIsLoading(false);
            }
        };

        fetchEnrolledCourses();
    }, []);

    if (isLoading) {
        return (
            <div className="min-h-screen bg-[#FCFDFD] py-12 px-6">
                <div className="max-w-7xl mx-auto">
                    <div className="mb-12">
                        <div className="flex items-center gap-3 mb-2">
                            <div className="w-1.5 h-6 bg-[#4AA59B] rounded-full"></div>
                            <span className="text-[#4AA59B] font-black uppercase tracking-[0.2em] text-[10px]">Your Workspace</span>
                        </div>
                        <h1 className="text-4xl font-black text-[#0F172B]">My <span className="text-[#4AA59B]">Courses</span></h1>
                        <p className="text-gray-400 mt-2 font-medium">Loading your courses...</p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                        {[1, 2, 3].map((i) => (
                            <div key={i} className="bg-white rounded-3xl border border-gray-100 overflow-hidden animate-pulse">
                                <div className="h-44 bg-gray-200"></div>
                                <div className="p-6 space-y-4">
                                    <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                                    <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                                    <div className="h-2 bg-gray-200 rounded w-full"></div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#FCFDFD] py-12 px-6">
            <div className="max-w-7xl mx-auto">
                <div className="mb-12">
                    <div className="flex items-center gap-3 mb-2">
                        <div className="w-1.5 h-6 bg-[#4AA59B] rounded-full"></div>
                        <span className="text-[#4AA59B] font-black uppercase tracking-[0.2em] text-[10px]">Your Workspace</span>
                    </div>
                    <h1 className="text-4xl font-black text-[#0F172B]">My <span className="text-[#4AA59B]">Courses</span></h1>
                    <p className="text-gray-400 mt-2 font-medium">
                        {enrolledCourses.length > 0
                            ? `You're enrolled in ${enrolledCourses.length} course${enrolledCourses.length > 1 ? 's' : ''}. Pick up where you left off!`
                            : "Start your learning journey today."}
                    </p>
                </div>

                {enrolledCourses.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                        {enrolledCourses.map(course => (
                            <EnrolledCourseCard key={course.id} course={course} />
                        ))}
                    </div>
                ) : (
                    <div className="flex flex-col items-center justify-center py-32 text-center bg-white rounded-[40px] border border-dashed border-gray-200">
                        <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mb-6 text-gray-300">
                            <BookOpen size={40} />
                        </div>
                        <h3 className="text-2xl font-bold text-[#0F172B] mb-2">No courses enrolled yet</h3>
                        <p className="text-gray-500 mb-8 max-w-sm font-medium">Start your learning journey today by exploring our available courses.</p>
                        <button
                            onClick={() => navigate('/student/available-courses')}
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