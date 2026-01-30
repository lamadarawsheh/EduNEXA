import React, { useEffect, useState } from "react";
import { Trash2, Star, Users, UserCircle } from "lucide-react";
import { BaseURL, isWorkingUrl, getFavoriteCourses, getFavoriteInstructors, toggleCourseFavorite, toggleInstructorFavorite } from "../../services/courseService";
import Swal from 'sweetalert2';

/* ================= Horizontal Card ================= */
const FavoriteCard = ({ item, isMentor, reverse, onRemove }) => {
    return (
        <div
            className={`bg-[#F2F2F2] hover:bg-white border border-transparent hover:border-[#25ADA7]/20 transition-all rounded-xl p-3 flex items-center gap-3 w-full md:w-[380px] shadow-sm ${reverse ? "flex-row-reverse" : "flex-row"
                }`}
        >
            {/* Image / Icon Section */}
            <div className="w-20 h-20 shrink-0 overflow-hidden rounded-lg bg-gray-200 shadow-inner flex items-center justify-center">
                {isMentor ? (
                    <UserCircle size={40} className="text-gray-400" />
                ) : (
                    <img
                        src={(item.image && isWorkingUrl(item.image)) ? (item.image.startsWith('http') ? item.image : `${BaseURL}/${item.image.replace(/^\//, '')}`) : "/course_placeholder.png"}
                        alt={item.title}
                        className="w-full h-full object-cover"
                        onError={(e) => { e.target.src = "/course_placeholder.png"; }}
                    />
                )}
            </div>

            {/* Content Section */}
            <div className="flex-1 flex flex-col justify-between min-w-0 px-1">
                <div className="flex justify-between items-start">
                    <h3 className="font-bold text-xs md:text-sm text-black truncate">{item.title || item.name}</h3>
                    <button
                        onClick={() => onRemove(item.id, isMentor ? 'mentor' : 'course')}
                        className="text-gray-400 hover:text-red-500 transition-colors shrink-0"
                    >
                        <Trash2 size={14} />
                    </button>
                </div>

                <p className="text-[10px] text-gray-800 font-medium truncate">{isMentor ? "Expert Mentor" : item.level}</p>
                <div className="flex items-center gap-2">
                    <span className="text-[10px] text-gray-800 font-bold flex items-center gap-1">
                        <Users size={12} /> {item.studentCount || item.students || "0"}
                    </span>
                    {!isMentor && (
                        <span className="text-[10px] text-yellow-600 font-bold flex items-center gap-1">
                            <Star size={12} fill="currentColor" /> {item.rating || "0"}
                        </span>
                    )}
                </div>

                <div className="flex items-center justify-between mt-2 pt-2 border-t border-black/5">
                    <span className="text-xs text-black">{isMentor ? "View Profile" : `$${item.price || "800"}`}</span>
                    <div className="text-[9px] text-gray-400 font-bold uppercase tracking-widest bg-white/50 px-2 py-0.5 rounded">
                        {isMentor ? "Mentor" : "Course"}
                    </div>
                </div>
            </div>
        </div>
    );
};

/* ================= Favorites Page ================= */
const Favourite = () => {
    const [courses, setCourses] = useState([]);
    const [mentors, setMentors] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        Promise.all([getFavoriteCourses(), getFavoriteInstructors()])
            .then(([coursesRes, mentorsRes]) => {
                setCourses(coursesRes.data || []);
                setMentors(mentorsRes.data || []);
            })
            .catch(err => console.error("Error fetching favorites:", err))
            .finally(() => setLoading(false));
    }, []);

    const handleRemove = (id, type) => {
        const action = type === 'course' ? toggleCourseFavorite(id) : toggleInstructorFavorite(id);
        action.then(() => {
            if (type === 'course') setCourses(prev => prev.filter(c => c.id !== id));
            else setMentors(prev => prev.filter(m => m.id !== id));

            Swal.fire({ toast: true, position: 'top-end', icon: 'success', title: 'Removed from favorites', showConfirmButton: false, timer: 2000 });
        });
    };

    return (
        <div className="px-4 py-12 max-w-7xl mx-auto flex flex-col items-center">
            {/* Centered Page Header */}
            <div className="text-center mb-12">
                <h1 className="text-4xl font-black text-[#0F4C4A] tracking-tight">My Favourites</h1>
                <div className="h-1 w-20 bg-[#25ADA7] mx-auto mt-2 rounded-full shadow-sm"></div>
            </div>

            {/* Split View Columns */}
            <div className="flex flex-col lg:flex-row justify-center gap-12 w-full relative">
                {loading ? (
                    <div className="flex justify-center items-center py-20 w-full">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#0F4C4A]"></div>
                    </div>
                ) : (
                    <>
                        {/* Left Column: Courses */}
                        <div className="flex flex-col items-center gap-6 flex-1">
                            <h2 className="text-2xl font-black text-[#0F4C4A] uppercase tracking-widest">Courses</h2>
                            <div className="w-full bg-gradient-to-b from-[#25ADA7]/20 to-transparent p-6 rounded-[40px] border border-[#25ADA7]/5 shadow-inner">
                                <div className="max-h-[500px] overflow-y-auto pr-2 flex flex-col items-center gap-4 custom-scrollbar">
                                    {courses.length > 0 ? (
                                        courses.map((course, idx) => (
                                            <FavoriteCard key={course.id || idx} item={course} isMentor={false} onRemove={handleRemove} />
                                        ))
                                    ) : (
                                        <p className="text-gray-400 font-bold py-10 text-center">No courses saved.</p>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Vertical Divider */}
                        <div className="hidden lg:block w-[1px] bg-black/10 absolute left-1/2 top-20 bottom-0"></div>

                        {/* Right Column: Mentors */}
                        <div className="flex flex-col items-center gap-6 flex-1">
                            <h2 className="text-2xl font-black text-[#0F4C4A] uppercase tracking-widest">Mentors</h2>
                            <div className="w-full bg-gradient-to-b from-[#25ADA7]/20 to-transparent p-6 rounded-[40px] border border-[#25ADA7]/5 shadow-inner">
                                <div className="max-h-[500px] overflow-y-auto pr-2 flex flex-col items-center gap-4 custom-scrollbar">
                                    {mentors.length > 0 ? (
                                        mentors.map((mentor, idx) => (
                                            <FavoriteCard key={mentor.id || idx} item={mentor} isMentor={true} reverse={true} onRemove={handleRemove} />
                                        ))
                                    ) : (
                                        <p className="text-gray-400 font-bold py-10 text-center">No mentors saved.</p>
                                    )}
                                </div>
                            </div>
                        </div>
                    </>
                )}
            </div>

            {/* Custom Styles */}
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
    );
};

export default Favourite;
