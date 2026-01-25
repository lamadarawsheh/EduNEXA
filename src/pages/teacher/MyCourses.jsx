import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    Search,
    Filter,
    Plus,
    MoreVertical,
    Users,
    Star,
    Clock,
    CheckCircle2,
    AlertCircle,
    BookOpen
} from 'lucide-react';

const MyCourses = () => {
    const navigate = useNavigate();
    const [searchTerm, setSearchTerm] = useState('');
    const [category, setCategory] = useState('All');
    const [subCategory, setSubCategory] = useState('All');
    const [status, setStatus] = useState('All');

    // Mock Teacher Courses
    const teacherCourses = [
        {
            id: 1,
            title: "Web Development Bootcamp 2024",
            category: "Development",
            subCategory: "Web Development",
            status: "Approved",
            students: 1540,
            rating: 4.8,
            price: "$89.99",
            image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&auto=format&fit=crop",
            date: "Uploaded: Dec 6, 2025"
        },
        {
            id: 2,
            title: "Advanced UI/UX Masterclass",
            category: "Design",
            subCategory: "UI/UX Design",
            status: "Pending",
            students: 0,
            rating: 0,
            price: "$74.99",
            image: "https://images.unsplash.com/photo-1586717791821-3f44a563eb4c?w=800&auto=format&fit=crop",
            date: "Uploaded: Jan 12, 2026"
        },
        {
            id: 3,
            title: "Python for Data Science",
            category: "Data Science",
            subCategory: "Machine Learning",
            status: "Approved",
            students: 856,
            rating: 4.9,
            price: "$94.99",
            image: "https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?w=800&auto=format&fit=crop",
            date: "Uploaded: Nov 20, 2025"
        }
    ];

    const categories = ['All', 'Development', 'Design', 'Data Science', 'Business', 'Marketing'];
    const statuses = ['All', 'Approved', 'Pending'];

    const filteredCourses = teacherCourses.filter(course => {
        const matchesSearch = course.title.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCategory = category === 'All' || course.category === category;
        const matchesSubCategory = subCategory === 'All' || course.subCategory === subCategory;
        const matchesStatus = status === 'All' || course.status === status;
        return matchesSearch && matchesCategory && matchesSubCategory && matchesStatus;
    });

    return (
        <div className="min-h-screen bg-[#FBFCFD] p-6 lg:p-10">
            {/* Header */}
            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 mb-12">
                <div>
                    <div className="flex items-center gap-3 mb-2">
                        <div className="w-1.5 h-6 bg-[#1E6B65] rounded-full"></div>
                        <span className="text-[#1E6B65] font-black uppercase tracking-[0.2em] text-[10px]">Your Content</span>
                    </div>
                    <h1 className="text-4xl font-black text-[#0F172B]">My <span className="text-[#1E6B65]">Courses</span></h1>
                </div>

                <button
                    onClick={() => navigate('/teacher/create-new-course')}
                    className="flex items-center gap-2 bg-[#1E6B65] text-white px-6 py-3.5 rounded-xl font-bold hover:bg-[#154d4a] transition-all shadow-lg active:scale-95"
                >
                    <Plus size={20} />
                    Create New Course
                </button>
            </div>

            {/* Filters Section */}
            <div className="bg-white p-6 rounded-[24px] shadow-sm border border-gray-100 mb-10">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {/* Search */}
                    <div className="flex flex-col gap-2">
                        <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Search Course</label>
                        <div className="relative group">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#1E6B65] transition-colors" size={18} />
                            <input
                                type="text"
                                placeholder="E.g. Web Dev..."
                                className="w-full pl-11 pr-4 py-3 bg-gray-50 border border-transparent focus:border-[#1E6B65] outline-none rounded-xl text-sm font-bold transition-all"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>
                    </div>

                    {/* Category */}
                    <div className="flex flex-col gap-2">
                        <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Filter by Category</label>
                        <div className="relative">
                            <select
                                className="w-full px-4 py-3 bg-gray-50 border border-transparent focus:border-[#1E6B65] outline-none rounded-xl text-sm font-bold appearance-none transition-all cursor-pointer"
                                value={category}
                                onChange={(e) => setCategory(e.target.value)}
                            >
                                {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                            </select>
                            <Filter className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={14} />
                        </div>
                    </div>

                    {/* Subcategory */}
                    <div className="flex flex-col gap-2">
                        <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Filter by Subcategory</label>
                        <div className="relative">
                            <select
                                className="w-full px-4 py-3 bg-gray-50 border border-transparent focus:border-[#1E6B65] outline-none rounded-xl text-sm font-bold appearance-none transition-all cursor-pointer"
                                value={subCategory}
                                onChange={(e) => setSubCategory(e.target.value)}
                            >
                                <option value="All">All Subcategories</option>
                                <option value="Web Development">Web Development</option>
                                <option value="UI/UX Design">UI/UX Design</option>
                                <option value="Machine Learning">Machine Learning</option>
                            </select>
                            <Filter className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={14} />
                        </div>
                    </div>

                    {/* Status */}
                    <div className="flex flex-col gap-2">
                        <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Filter by Status</label>
                        <div className="relative">
                            <select
                                className="w-full px-4 py-3 bg-gray-50 border border-transparent focus:border-[#1E6B65] outline-none rounded-xl text-sm font-bold appearance-none transition-all cursor-pointer"
                                value={status}
                                onChange={(e) => setStatus(e.target.value)}
                            >
                                {statuses.map(s => <option key={s} value={s}>{s}</option>)}
                            </select>
                            <Filter className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={14} />
                        </div>
                    </div>

                    {/* Results Count */}
                    <div className="flex items-center justify-center lg:justify-end">
                        <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">
                            {filteredCourses.length} Courses Found
                        </p>
                    </div>
                </div>
            </div>

            {/* Courses Grid */}
            {filteredCourses.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {filteredCourses.map(course => (
                        <div
                            key={course.id}
                            onClick={() => navigate(`/teacher/course-analytics/${course.id}`)}
                            className="group bg-white rounded-[32px] border border-gray-100 overflow-hidden hover:shadow-2xl hover:shadow-[#1E6B65]/5 transition-all duration-500 cursor-pointer flex flex-col"
                        >
                            {/* Image Header */}
                            <div className="relative h-48 overflow-hidden">
                                <img src={course.image} alt={course.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                                <div className="absolute top-4 right-4 focus-within:z-10">
                                    <button className="p-2 bg-white/20 backdrop-blur-md rounded-full text-white hover:bg-white hover:text-[#1E6B65] transition-all">
                                        <MoreVertical size={18} />
                                    </button>
                                </div>
                                <div className="absolute bottom-4 left-4">
                                    <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider shadow-lg flex items-center gap-1.5 ${course.status === 'Approved' ? 'bg-white text-emerald-600' : 'bg-white text-orange-500'
                                        }`}>
                                        {course.status === 'Approved' ? <CheckCircle2 size={12} /> : <AlertCircle size={12} />}
                                        {course.status}
                                    </span>
                                </div>
                            </div>

                            {/* Info */}
                            <div className="p-6 flex flex-col flex-1">
                                <span className="text-[10px] font-black text-[#1E6B65] uppercase tracking-[0.2em] mb-3 inline-block">
                                    {course.category} • {course.subCategory}
                                </span>
                                <h3 className="text-xl font-black text-[#0F172B] mb-6 leading-tight group-hover:text-[#1E6B65] transition-colors line-clamp-2 min-h-[3.5rem]">
                                    {course.title}
                                </h3>

                                <div className="grid grid-cols-2 gap-4 pt-6 border-t border-gray-50 mt-auto">
                                    <div className="flex items-center gap-2">
                                        <div className="w-8 h-8 rounded-lg bg-[#EBF5F4] flex items-center justify-center text-[#1E6B65]">
                                            <Users size={16} />
                                        </div>
                                        <div>
                                            <p className="text-xs font-black text-[#0F172B]">{course.students.toLocaleString()}</p>
                                            <p className="text-[9px] font-bold text-gray-400 uppercase tracking-tighter">Students</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <div className="w-8 h-8 rounded-lg bg-[#FFF2E5] flex items-center justify-center text-[#FD8E1F]">
                                            <Star size={16} fill="currentColor" />
                                        </div>
                                        <div>
                                            <p className="text-xs font-black text-[#0F172B]">{course.rating}</p>
                                            <p className="text-[9px] font-bold text-gray-400 uppercase tracking-tighter">Rating</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                /* Empty State */
                <div className="flex flex-col items-center justify-center py-32 text-center bg-white rounded-[40px] border border-dashed border-gray-200">
                    <div className="w-24 h-24 bg-gray-50 rounded-full flex items-center justify-center mb-8 text-gray-200">
                        <BookOpen size={48} />
                    </div>
                    <h3 className="text-2xl font-black text-[#0F172B] mb-2 tracking-tight">No courses found</h3>
                    <p className="text-gray-400 mb-10 max-w-sm font-bold">
                        {searchTerm || category !== 'All' || status !== 'All'
                            ? "Try adjusting your filters to find what you're looking for."
                            : "You haven't added any courses yet. Start sharing your knowledge with the world!"}
                    </p>
                    <button
                        onClick={() => navigate('/teacher/create-new-course')}
                        className="bg-[#1E6B65] text-white px-10 py-4 rounded-2xl font-black text-sm hover:bg-[#154d4a] transition-all shadow-xl shadow-[#1E6B65]/20 active:scale-95 transform"
                    >
                        Add your first course
                    </button>
                </div>
            )}
        </div>
    );
};

export default MyCourses;
