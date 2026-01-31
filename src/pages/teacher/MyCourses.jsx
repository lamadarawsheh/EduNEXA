import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    Search,
    Filter,
    Plus,
    MoreVertical,
    Users,
    Star,
    CheckCircle2,
    AlertCircle,
    BookOpen,
    XCircle,
    HelpCircle
} from 'lucide-react';
import { BaseURL, isWorkingUrl, getCourses, getCategoriesWithSubcategories } from '../../services/courseService';

const MyCourses = () => {
    const navigate = useNavigate();
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [selectedSubCategory, setSelectedSubCategory] = useState('All');
    const [selectedStatus, setSelectedStatus] = useState('All');

    const [teacherCourses, setTeacherCourses] = useState([]);
    const [categoriesData, setCategoriesData] = useState([]);
    const [subCategoryMap, setSubCategoryMap] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    const [notification, setNotification] = useState(null);

    const showNotification = (message, type = "success") => {
        setNotification({ message, type });
        setTimeout(() => setNotification(null), 4000);
    };

    // Get current user from localStorage
    const userString = localStorage.getItem('user');
    const currentUser = userString ? JSON.parse(userString) : null;
    const currentUserId = currentUser?.id || "";

    useEffect(() => {
        const fetchData = async () => {
            try {
                setIsLoading(true);

                // 1. Fetch Categories and Subcategories
                const categoriesRes = await getCategoriesWithSubcategories();
                const categories = Array.isArray(categoriesRes.data)
                    ? categoriesRes.data
                    : (categoriesRes.data?.$values || categoriesRes.data?.data || []);
                setCategoriesData(categories);

                // 2. Build a comprehensive map for easy lookup
                const map = {};
                categories.forEach(cat => {
                    const catName = cat.name || cat.Name || "Unknown Category";
                    const catId = cat.id || cat.Id || cat.ID;

                    const subList = Array.isArray(cat.subCategories)
                        ? cat.subCategories
                        : (cat.subCategories?.$values || []);

                    subList.forEach(sub => {
                        const subId = sub.id || sub.Id || sub.ID || sub.subCategoryID;
                        map[String(subId)] = {
                            subName: sub.name || sub.Name || "Unknown Sub",
                            catName: catName,
                            catId: catId
                        };
                    });
                });
                setSubCategoryMap(map);

                // 3. Fetch All Courses
                const coursesRes = await getCourses();
                const allCourses = Array.isArray(coursesRes.data)
                    ? coursesRes.data
                    : (coursesRes.data?.$values || coursesRes.data?.data || []);

                // 4. Filter by current instructor ID and map to UI format
                const myCourses = allCourses
                    .filter(course => String(course.instructorId) === String(currentUserId))
                    .map(course => {
                        const sId = course.subCategoryID || course.subCategoryId || course.subCategoryID;
                        const info = map[String(sId)] || { subName: "General", catName: "Education" };

                        // Calculate rating
                        const reviews = Array.isArray(course.reviews) ? course.reviews : (course.reviews?.$values || []);
                        const rating = reviews.length > 0
                            ? (reviews.reduce((acc, rev) => acc + (rev.rating || 0), 0) / reviews.length).toFixed(1)
                            : "0.0";

                        const enrollments = Array.isArray(course.enrollments) ? course.enrollments : (course.enrollments?.$values || []);

                        return {
                            id: course.id || course.Id,
                            title: course.title || course.Title,
                            category: info.catName,
                            subCategory: info.subName,
                            status: course.status || "Pending",
                            students: enrollments.length || 0,
                            rating: rating,
                            price: course.price ? `$${course.price}` : "Free",
                            image: course.thumbnailUrl || course.imagePath || course.ThumbnailUrl,
                            date: course.createdAt ? new Date(course.createdAt).toLocaleDateString() : "Draft"
                        };
                    });

                setTeacherCourses(myCourses);
            } catch (error) {
                console.error("Error fetching teacher data:", error);
            } finally {
                setIsLoading(false);
            }
        };

        if (currentUserId) {
            fetchData();
        } else {
            setIsLoading(false);
        }
    }, [currentUserId]);

    // Handle Category selection change
    const onCategoryChange = (val) => {
        setSelectedCategory(val);
        setSelectedSubCategory('All'); // Reset subcategory when category changes
    };

    // Derived lists for filters
    const availableCategories = ['All', ...categoriesData.map(c => c.name)];

    const availableSubCategories = ['All'];
    if (selectedCategory !== 'All') {
        const cat = categoriesData.find(c => c.name === selectedCategory);
        if (cat?.subCategories) {
            availableSubCategories.push(...cat.subCategories.map(s => s.name));
        }
    }

    const statuses = ['All', 'Approved', 'Pending', 'Rejected'];

    // Final filtering logic
    const filteredCourses = teacherCourses.filter(course => {
        const matchesSearch = course.title.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCategory = selectedCategory === 'All' || course.category === selectedCategory;
        const matchesSubCategory = selectedSubCategory === 'All' || course.subCategory === selectedSubCategory;
        const matchesStatus = selectedStatus === 'All' || course.status === selectedStatus;
        return matchesSearch && matchesCategory && matchesSubCategory && matchesStatus;
    });

    const getStatusStyles = (status) => {
        switch (status) {
            case 'Approved':
                return 'bg-emerald-50 text-emerald-600 border-emerald-100';
            case 'Rejected':
                return 'bg-rose-50 text-rose-600 border-rose-100';
            case 'Pending':
                return 'bg-amber-50 text-amber-600 border-amber-100';
            default:
                return 'bg-gray-50 text-gray-500 border-gray-100';
        }
    };

    const getStatusIcon = (status) => {
        switch (status) {
            case 'Approved': return <CheckCircle2 size={12} />;
            case 'Rejected': return <XCircle size={12} />;
            case 'Pending': return <AlertCircle size={12} />;
            default: return <HelpCircle size={12} />;
        }
    };

    return (
        <div className="min-h-screen bg-[#FBFCFD] p-6 lg:p-10 relative">
            {notification && (
                <div className={`fixed bottom-4 left-4 right-4 sm:top-10 sm:right-10 sm:left-auto sm:bottom-auto z-[300] p-4 rounded-xl shadow-2xl text-white transform transition-all duration-300 animate-slide-in ${notification.type === 'error' ? 'bg-rose-600' : notification.type === 'warning' ? 'bg-amber-500' : 'bg-[#1E6B65]'}`}>
                    <p className="font-bold text-sm sm:text-base flex items-center gap-2">
                        {notification.type === 'error' ? '❌' : notification.type === 'warning' ? '⚠️' : '✅'}
                        {notification.message}
                    </p>
                </div>
            )}
            {/* Header */}
            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 mb-12">
                <div>
                    <div className="flex items-center gap-3 mb-2">
                        <div className="w-1.5 h-6 bg-[#1E6B65] rounded-full"></div>
                        <span className="text-[#1E6B65] font-black uppercase tracking-[0.2em] text-[10px]">Instructor Dashboard</span>
                    </div>
                    <h1 className="text-4xl font-black text-[#0F172B]">My <span className="text-[#1E6B65]">Courses</span></h1>
                    <p className="text-gray-400 mt-2 font-medium">Manage and monitor all your educational content</p>
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
            <div className="bg-white p-6 rounded-[24px] shadow-sm border border-gray-100 mb-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
                    {/* Search */}
                    <div className="flex flex-col gap-2">
                        <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Search Course</label>
                        <div className="relative group">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#1E6B65] transition-colors" size={18} />
                            <input
                                type="text"
                                placeholder="E.g. Web Dev..."
                                className={`w-full pl-11 pr-10 py-3 bg-gray-50 border ${searchTerm ? 'border-[#1E6B65] bg-white' : 'border-transparent'} focus:border-[#1E6B65] outline-none rounded-xl text-sm font-bold transition-all`}
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                            {searchTerm && (
                                <button
                                    onClick={() => setSearchTerm('')}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-300 hover:text-gray-500"
                                >
                                    <XCircle size={16} />
                                </button>
                            )}
                        </div>
                    </div>

                    {/* Category */}
                    <div className="flex flex-col gap-2">
                        <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Category</label>
                        <div className="relative">
                            <span className={`absolute left-4 top-1/2 -translate-y-1/2 text-[10px] font-black uppercase pointer-events-none z-10 ${selectedCategory !== 'All' ? 'text-[#1E6B65]/60' : 'text-gray-400'}`}>
                                Cat:
                            </span>
                            <select
                                className={`w-full pl-12 pr-4 py-3 bg-gray-50 border ${selectedCategory !== 'All' ? 'border-[#1E6B65] bg-white text-[#1E6B65]' : 'border-transparent'} focus:border-[#1E6B65] outline-none rounded-xl text-sm font-bold appearance-none transition-all cursor-pointer relative`}
                                value={selectedCategory}
                                onChange={(e) => onCategoryChange(e.target.value)}
                            >
                                <option value="All">All Categories</option>
                                {categoriesData.map(cat => <option key={cat.id} value={cat.name}>{cat.name}</option>)}
                            </select>
                            <Filter className={`absolute right-4 top-1/2 -translate-y-1/2 ${selectedCategory !== 'All' ? 'text-[#1E6B65]' : 'text-gray-400'} pointer-events-none`} size={14} />
                        </div>
                    </div>

                    {/* Subcategory */}
                    <div className="flex flex-col gap-2">
                        <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Subcategory</label>
                        <div className="relative">
                            <span className={`absolute left-4 top-1/2 -translate-y-1/2 text-[10px] font-black uppercase pointer-events-none z-10 ${selectedSubCategory !== 'All' ? 'text-[#1E6B65]/60' : 'text-gray-400'}`}>
                                Sub:
                            </span>
                            <select
                                className={`w-full pl-12 pr-4 py-3 bg-gray-50 border ${selectedSubCategory !== 'All' ? 'border-[#1E6B65] bg-white text-[#1E6B65]' : 'border-transparent'} focus:border-[#1E6B65] outline-none rounded-xl text-sm font-bold appearance-none transition-all cursor-pointer disabled:opacity-50`}
                                value={selectedSubCategory}
                                onChange={(e) => setSelectedSubCategory(e.target.value)}
                                disabled={selectedCategory === 'All'}
                            >
                                <option value="All">All Subcategories</option>
                                {availableSubCategories.filter(s => s !== 'All').map(sub => <option key={sub} value={sub}>{sub}</option>)}
                            </select>
                            <Filter className={`absolute right-4 top-1/2 -translate-y-1/2 ${selectedSubCategory !== 'All' ? 'text-[#1E6B65]' : 'text-gray-400'} pointer-events-none`} size={14} />
                        </div>
                    </div>

                    {/* Status */}
                    <div className="flex flex-col gap-2">
                        <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Status</label>
                        <div className="relative">
                            <span className={`absolute left-4 top-1/2 -translate-y-1/2 text-[10px] font-black uppercase pointer-events-none z-10 ${selectedStatus !== 'All' ? 'text-[#1E6B65]/60' : 'text-gray-400'}`}>
                                State:
                            </span>
                            <select
                                className={`w-full pl-14 pr-4 py-3 bg-gray-50 border ${selectedStatus !== 'All' ? 'border-[#1E6B65] bg-white text-[#1E6B65]' : 'border-transparent'} focus:border-[#1E6B65] outline-none rounded-xl text-sm font-bold appearance-none transition-all cursor-pointer`}
                                value={selectedStatus}
                                onChange={(e) => setSelectedStatus(e.target.value)}
                            >
                                {statuses.map(s => (
                                    <option key={s} value={s}>
                                        {s === 'All' ? 'All Statuses' : s}
                                    </option>
                                ))}
                            </select>
                            <Filter className={`absolute right-4 top-1/2 -translate-y-1/2 ${selectedStatus !== 'All' ? 'text-[#1E6B65]' : 'text-gray-400'} pointer-events-none`} size={14} />
                        </div>
                    </div>

                    {/* Results Count */}
                    <div className="flex items-center justify-center lg:justify-end">
                        <div className="text-right">
                            <p className="text-[10px] font-black text-gray-300 uppercase tracking-widest mb-1">Total Results</p>
                            <p className="text-xl font-black text-[#1E6B65]">
                                {isLoading ? "..." : filteredCourses.length}
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Active Selection Chips */}
            {(selectedCategory !== 'All' || selectedSubCategory !== 'All' || selectedStatus !== 'All' || searchTerm) && (
                <div className="flex flex-wrap items-center gap-3 mb-8 px-2 animate-in fade-in slide-in-from-top-2 duration-500">
                    <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest mr-2">Active Filters:</span>

                    {searchTerm && (
                        <div className="flex items-center gap-2 bg-white border border-[#1E6B65]/10 px-3 py-1.5 rounded-full shadow-sm">
                            <span className="text-[10px] font-black text-gray-400 uppercase tracking-tight">Search:</span>
                            <span className="text-xs font-bold text-[#1E6B65]">"{searchTerm}"</span>
                            <button onClick={() => setSearchTerm('')} className="text-gray-400 hover:text-rose-500 transition-colors"><XCircle size={14} /></button>
                        </div>
                    )}

                    {selectedCategory !== 'All' && (
                        <div className="flex items-center gap-2 bg-white border border-[#1E6B65]/10 px-3 py-1.5 rounded-full shadow-sm">
                            <span className="text-[10px] font-black text-gray-400 uppercase tracking-tight">Category:</span>
                            <span className="text-xs font-bold text-[#1E6B65]">{selectedCategory}</span>
                            <button onClick={() => onCategoryChange('All')} className="text-gray-400 hover:text-rose-500 transition-colors"><XCircle size={14} /></button>
                        </div>
                    )}

                    {selectedSubCategory !== 'All' && (
                        <div className="flex items-center gap-2 bg-white border border-[#1E6B65]/10 px-3 py-1.5 rounded-full shadow-sm">
                            <span className="text-[10px] font-black text-gray-400 uppercase tracking-tight">Sub:</span>
                            <span className="text-xs font-bold text-[#1E6B65]">{selectedSubCategory}</span>
                            <button onClick={() => setSelectedSubCategory('All')} className="text-gray-400 hover:text-rose-500 transition-colors"><XCircle size={14} /></button>
                        </div>
                    )}

                    {selectedStatus !== 'All' && (
                        <div className="flex items-center gap-2 bg-white border border-[#1E6B65]/10 px-3 py-1.5 rounded-full shadow-sm">
                            <span className="text-[10px] font-black text-gray-400 uppercase tracking-tight">Status:</span>
                            <span className="text-xs font-bold text-[#1E6B65]">{selectedStatus}</span>
                            <button onClick={() => setSelectedStatus('All')} className="text-gray-400 hover:text-rose-500 transition-colors"><XCircle size={14} /></button>
                        </div>
                    )}

                    <button
                        onClick={() => {
                            setSearchTerm('');
                            setSelectedCategory('All');
                            setSelectedSubCategory('All');
                            setSelectedStatus('All');
                        }}
                        className="text-[10px] font-black text-rose-500 uppercase tracking-widest hover:underline ml-2"
                    >
                        Clear All
                    </button>
                </div>
            )}

            {/* Courses Grid */}
            {isLoading ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {[1, 2, 3].map(i => (
                        <div key={i} className="bg-white h-[400px] rounded-[32px] animate-pulse border border-gray-100" />
                    ))}
                </div>
            ) : filteredCourses.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {filteredCourses.map(course => (
                        <div
                            key={course.id}
                            onClick={() => navigate(`/teacher/course-analytics/${course.id}`)}
                            className="group bg-white rounded-[32px] border border-gray-100 overflow-hidden hover:shadow-2xl hover:shadow-[#1E6B65]/5 transition-all duration-500 cursor-pointer flex flex-col"
                        >
                            {/* Image Header */}
                            <div className="relative h-48 overflow-hidden">
                                <img
                                    src={(course.image && isWorkingUrl(course.image)) ? (course.image.startsWith('http') ? course.image : `${BaseURL}/${course.image.replace(/^\//, '')}`) : "/course_placeholder.png"}
                                    alt={course.title}
                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                                    onError={(e) => { e.target.src = "/course_placeholder.png"; }}
                                />
                                <div className="absolute top-4 right-4 focus-within:z-10 flex gap-2">
                                    <button className="p-2 bg-white/20 backdrop-blur-md rounded-full text-white hover:bg-white hover:text-[#1E6B65] transition-all">
                                        <Plus size={16} />
                                    </button>
                                    <button className="p-2 bg-white/20 backdrop-blur-md rounded-full text-white hover:bg-white hover:text-[#1E6B65] transition-all">
                                        <MoreVertical size={16} />
                                    </button>
                                </div>
                                <div className="absolute bottom-4 left-4">
                                    <span className={`px-3 py-1.5 rounded-full text-[10px] font-black uppercase tracking-wider border shadow-sm flex items-center gap-1.5 ${getStatusStyles(course.status)}`}>
                                        {getStatusIcon(course.status)}
                                        {course.status}
                                    </span>
                                </div>
                            </div>

                            {/* Info */}
                            <div className="p-6 flex flex-col flex-1">
                                <div className="flex justify-between items-start mb-3">
                                    <span className="text-[10px] font-black text-[#1E6B65] uppercase tracking-[0.2em]">
                                        {course.category} • {course.subCategory}
                                    </span>
                                    <span className={`px-2 py-1 rounded-md text-[9px] font-bold uppercase tracking-wider border ${getStatusStyles(course.status)}`}>
                                        {course.status}
                                    </span>
                                </div>
                                <h3 className="text-xl font-black text-[#0F172B] mb-2 leading-tight group-hover:text-[#1E6B65] transition-colors line-clamp-2 min-h-[3rem]">
                                    {course.title}
                                </h3>
                                <p className="text-[11px] font-bold text-gray-400 mb-6 uppercase tracking-tighter">Created: {course.date}</p>

                                {/* Action Buttons */}
                                <div className="flex flex-col gap-2 mt-auto pt-6 border-t border-gray-50">
                                    <div className="grid grid-cols-2 gap-2">
                                        <button
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                navigate(`/teacher/create-new-course?id=${course.id}`);
                                            }}
                                            className="flex items-center justify-center gap-2 bg-[#EBF5F4] text-[#1E6B65] py-2.5 rounded-xl text-xs font-black hover:bg-[#1E6B65] hover:text-white transition-all active:scale-95"
                                        >
                                            <Plus size={14} />
                                            Edit & Build
                                        </button>
                                        <button
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                showNotification("Preview mode is currently in development. ✨", "warning");
                                            }}
                                            className="flex items-center justify-center gap-2 bg-gray-50 text-[#0F172B] py-2.5 rounded-xl text-xs font-black hover:bg-gray-200 transition-all active:scale-95 border border-gray-100"
                                        >
                                            <BookOpen size={14} />
                                            Preview
                                        </button>
                                    </div>

                                    {/* Analytics Button - Only for Approved Courses */}
                                    {course.status === 'Approved' && (
                                        <button
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                navigate(`/teacher/course-analytics/${course.id}`);
                                            }}
                                            className="w-full flex items-center justify-center gap-2 bg-[#1E6B65] text-white py-3 rounded-xl text-xs font-black hover:bg-[#154d4a] transition-all shadow-lg active:scale-95"
                                        >
                                            <Users size={14} />
                                            View Performance & Analytics
                                        </button>
                                    )}
                                </div>

                                <div className="grid grid-cols-2 gap-4 pt-4 mt-2">
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
                        {searchTerm || selectedCategory !== 'All' || selectedStatus !== 'All'
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
