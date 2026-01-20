import React, { useEffect, useState } from "react";
import { Trash2, Star, Users, UserCircle } from "lucide-react";

/* ================= Horizontal Card ================= */
const FavoriteCard = ({ item, isMentor, reverse }) => {
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
                        src={item.image}
                        alt={item.title}
                        className="w-full h-full object-cover"
                    />
                )}
            </div>

            {/* Content Section */}
            <div className="flex-1 flex flex-col justify-between min-w-0 px-1">
                <div className="flex justify-between items-start">
                    <h3 className="font-bold text-xs md:text-sm text-black truncate">{item.title}</h3>
                    <button className="text-gray-400 hover:text-red-500 transition-colors shrink-0">
                        <Trash2 size={14} />
                    </button>
                </div>

                <div className="space-y-0.5 mt-1">
                    <p className="text-[10px] text-gray-800 font-medium truncate">{item.level || (isMentor ? "Expert Mentor" : "Beginner")}</p>
                    <div className="flex items-center gap-2">
                        <span className="text-[10px] text-gray-800 font-bold flex items-center gap-1">
                            <Users size={12} /> {item.students || "1.2K"}
                        </span>
                        {!isMentor && (
                            <span className="text-[10px] text-yellow-600 font-bold flex items-center gap-1">
                                <Star size={12} fill="currentColor" /> 4.9
                            </span>
                        )}
                    </div>
                </div>

                <div className="flex items-center justify-between mt-2 pt-2 border-t border-black/5">
                    <span className="text-xs font-black text-[#0F4C4A]">{item.extra1 || (isMentor ? "View Profile" : "800 L.E")}</span>
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
    const [favorites, setFavorites] = useState([]);

    useEffect(() => {
        // Updated Mock Data
        setFavorites([
            // Courses
            { title: "Web Development", image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=200", level: "Beginner", students: "2.5K", extra1: "Project Based", type: 'course' },
            { title: "React Mastery", image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=200", level: "Intermediate", students: "1.1K", extra1: "Hooks & Redux", type: 'course' },
            { title: "UI Design Patterns", image: "https://images.unsplash.com/photo-1586717791821-3f44a563eb4c?w=200", level: "Advanced", students: "700", extra1: "Figma & XD", type: 'course' },
            { title: "Data Science", image: "https://images.unsplash.com/photo-1555949105-d40b991da97d?w=200", level: "Beginner", students: "1K", extra1: "Pandas & NumPy", type: 'course' },
            { title: "Mobile Apps with React Native", image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=200", level: "Intermediate", students: "4.2K", extra1: "iOS & Android", type: 'course' },
            { title: "Cyber Security Pro", image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=200", level: "Advanced", students: "1.5K", extra1: "Network Sec", type: 'course' },
            { title: "Digital Marketing", image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=200", level: "Beginner", students: "10K", extra1: "SEO & Ads", type: 'course' },
            { title: "Python for Finance", image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=200", level: "Intermediate", students: "2.8K", extra1: "Analysis", type: 'course' },

            // Mentors (No images, using UserCircle icon)
            { title: "Dr. Angela Yu", level: "Senior Instructor", students: "150K", extra1: "Programming", type: 'mentor' },
            { title: "Gary Simon", level: "Design Master", students: "89K", extra1: "UI/UX Design", type: 'mentor' },
            { title: "Chris Anderson", level: "Business Advisor", students: "45K", extra1: "Business", type: 'mentor' },
            { title: "Max Schwarz", level: "Lead Architect", students: "210K", extra1: "Full Stack", type: 'mentor' },
            { title: "Neil Patel", level: "Marketing Guru", students: "1.2M", extra1: "SEO Expert", type: 'mentor' },
            { title: "Andrei Neagoie", level: "Academy Lead", students: "800K", extra1: "Web Dev", type: 'mentor' },
            { title: "Sarah Drasner", level: "Staff Engineer", students: "120K", extra1: "Vue Specialist", type: 'mentor' },
            { title: "Kent C. Dodds", level: "Teacher", students: "95K", extra1: "React Expert", type: 'mentor' },
        ]);
    }, []);

    const courses = favorites.filter(f => f.type === 'course');
    const mentors = favorites.filter(f => f.type === 'mentor');

    return (
        <div className="px-4 py-12 max-w-7xl mx-auto flex flex-col items-center">
            {/* Centered Page Header */}
            <div className="text-center mb-12">
                <h1 className="text-4xl font-black text-[#0F4C4A] tracking-tight">My Favourites</h1>
                <div className="h-1 w-20 bg-[#25ADA7] mx-auto mt-2 rounded-full shadow-sm"></div>
            </div>

            {/* Split View Columns */}
            <div className="flex flex-col lg:flex-row justify-center gap-12 w-full relative">

                {/* Left Column: Courses */}
                <div className="flex flex-col items-center gap-6 flex-1">
                    <h2 className="text-2xl font-black text-[#0F4C4A] uppercase tracking-widest">Courses</h2>
                    <div className="w-full bg-gradient-to-b from-[#25ADA7]/20 to-transparent p-6 rounded-[40px] border border-[#25ADA7]/5 shadow-inner">
                        <div className="max-h-[500px] overflow-y-auto pr-2 flex flex-col items-center gap-4 custom-scrollbar">
                            {courses.length > 0 ? (
                                courses.map((course, idx) => (
                                    <FavoriteCard key={idx} item={course} isMentor={false} />
                                ))
                            ) : (
                                <p className="text-gray-400 font-bold py-10">No courses saved.</p>
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
                                    <FavoriteCard key={idx} item={mentor} isMentor={true} reverse={true} />
                                ))
                            ) : (
                                <p className="text-gray-400 font-bold py-10">No mentors saved.</p>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* Custom Styles */}
            <style jsx>{`
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