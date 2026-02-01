import React, { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import DashboardNavbar from "../components/layout/DashboardNavbar";
import Footer from "../components/layout/Footer";
import { Bot, Image as ImageIcon, MessageCircle, Mic, Send, X, Star, Users, ExternalLink, PlayCircle, Info, CheckCircle2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { getApprovedCourses, getCategoriesWithSubcategories, BaseURL } from "../services/courseService";

const GlobalCourseModal = ({ course, onClose }) => {
    const navigate = useNavigate();
    const [showTrailer, setShowTrailer] = useState(false);
    if (!course) return null;

    const getValidImage = (imgUrl) => {
        if (!imgUrl || imgUrl === '/course_placeholder.png') return "/course_placeholder.png";
        if (imgUrl.startsWith('http')) return imgUrl;
        return `${BaseURL}/${imgUrl.replace(/^\//, '')}`;
    };

    const getValidVideo = (videoUrl) => {
        if (!videoUrl) return null;
        if (videoUrl.startsWith('http')) return videoUrl;
        return `${BaseURL}/${videoUrl.replace(/^\//, '')}`;
    };

    const handleEnroll = () => {
        onClose();
        navigate(`/student/checkout/${course.id}`);
    };

    const videoUrl = getValidVideo(course.promoVideoUrl || course.trailerUrl || course.videoPath || course.trailer);

    return (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-md flex items-center justify-center z-[200] p-4 animate-in fade-in duration-500" onClick={onClose}>
            <div className="bg-white rounded-[32px] w-full max-w-4xl max-h-[90vh] overflow-hidden shadow-2xl relative animate-in zoom-in-95 duration-500 flex flex-col md:flex-row" onClick={(e) => e.stopPropagation()}>

                {/* Media Section */}
                <div className="md:w-1/2 relative h-64 md:h-auto overflow-hidden bg-black group">
                    {showTrailer && videoUrl ? (
                        <video
                            src={videoUrl}
                            controls
                            autoPlay
                            className="w-full h-full object-contain"
                            onError={() => setShowTrailer(false)}
                        />
                    ) : (
                        <>
                            <img
                                src={getValidImage(course.image || course.thumbnailUrl)}
                                alt={course.title}
                                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110 opacity-70"
                                onError={(e) => e.target.src = "/course_placeholder.png"}
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent"></div>

                            {videoUrl && (
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <button
                                        onClick={() => setShowTrailer(true)}
                                        className="w-20 h-20 bg-white/10 backdrop-blur-xl rounded-full flex items-center justify-center text-white border border-white/20 hover:scale-110 hover:bg-white hover:text-[#0F4C4A] transition-all duration-500 shadow-2xl group/play"
                                    >
                                        <PlayCircle size={48} className="group-hover/play:fill-[#0F4C4A]/10" />
                                    </button>
                                </div>
                            )}

                            <div className="absolute bottom-10 left-10 text-white">
                                <span className="bg-[#4AA59B] px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-[0.2em] mb-4 inline-block shadow-2xl border border-white/10">Premium Content</span>
                                <h3 className="text-sm font-black uppercase tracking-widest text-white/60">Expert Masterclass</h3>
                            </div>
                        </>
                    )}
                </div>

                {/* Info Section */}
                <div className="md:w-1/2 p-10 md:p-14 flex flex-col bg-white overflow-y-auto custom-scrollbar relative">
                    <button onClick={onClose} className="absolute top-8 right-8 p-3 bg-gray-50 hover:bg-red-50 rounded-2xl text-gray-400 hover:text-red-500 transition-all border border-gray-100 group">
                        <X size={20} className="group-hover:rotate-90 transition-transform" />
                    </button>

                    <div className="flex items-center gap-3 mb-6">
                        <span className="bg-teal-50 text-[#0F4C4A] px-4 py-2 rounded-2xl text-[10px] font-black uppercase tracking-widest border border-teal-100/50">
                            {course.categoryName || course.category || 'Specialized Track'}
                        </span>
                        <span className="text-[#4AA59B] text-[10px] font-black uppercase tracking-widest px-4 py-2 bg-gray-50 rounded-2xl border border-gray-100">
                            {course.level || 'Mastery'}
                        </span>
                    </div>

                    <h2 className="text-3xl md:text-4xl font-black text-[#0F172B] mb-6 leading-[1.1] tracking-tighter uppercase">
                        {course.title}
                    </h2>

                    <div className="space-y-6 mb-10">
                        <p className="text-gray-500 text-sm font-bold flex items-center gap-3">
                            <span className="w-8 h-0.5 bg-teal-500/20"></span>
                            Instructor: <span className="text-[#0F4C4A]">{course.instructorName || 'Top Industry Mentor'}</span>
                        </p>
                        <div className="bg-gray-50/80 rounded-3xl p-6 border border-gray-100 max-h-40 overflow-y-auto custom-scrollbar">
                            <p className="text-gray-600 text-sm leading-relaxed font-medium">
                                {course.description || course.shortDescription || "Unlock professional success with this comprehensive industry-standard curriculum and hands-on projects."}
                            </p>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-6 mb-12">
                        <div className="bg-gray-50/50 rounded-2xl p-4 border border-gray-100 flex items-center gap-4">
                            <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-teal-600 shadow-sm">
                                <Users size={18} />
                            </div>
                            <div>
                                <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Enrolled</p>
                                <p className="text-lg font-black text-[#0F172B]">{(course.studentCount || course.enrolled || 0).toLocaleString()}</p>
                            </div>
                        </div>
                        <div className="bg-gray-50/50 rounded-2xl p-4 border border-gray-100 flex items-center gap-4">
                            <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-yellow-500 shadow-sm">
                                <Star size={18} fill="currentColor" />
                            </div>
                            <div>
                                <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Rating</p>
                                <p className="text-lg font-black text-[#0F172B]">{course.rating || '4.8'}</p>
                            </div>
                        </div>
                    </div>

                    <div className="mt-auto pt-10 border-t border-gray-100 flex items-center justify-between gap-8">
                        <div>
                            <p className="text-[10px] text-gray-400 font-bold uppercase tracking-[0.2em] mb-1">Investment</p>
                            <span className="text-3xl font-black text-[#0F4C4A]">{course.price ? (course.price.toString().startsWith('$') ? course.price : `$${course.price}`) : '$0'}</span>
                        </div>
                        <button
                            onClick={handleEnroll}
                            className="flex-1 bg-[#0F4C4A] text-white py-5 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-[#1E8A85] transition-all shadow-2xl shadow-teal-900/10 active:scale-95 transform hover:-translate-y-1"
                        >
                            Enroll Now
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

function ChatWidget({ onPreviewClick }) {
    const navigate = useNavigate();
    const [open, setOpen] = useState(false);
    const [mode, setMode] = useState("welcome");
    const [messages, setMessages] = useState([{ id: 1, role: "bot", text: "Hi! I'm your EduNEXA assistant. How can I help you find the perfect course today?" }]);
    const [inputValue, setInputValue] = useState("");
    const [isTyping, setIsTyping] = useState(false);
    const [allCourses, setAllCourses] = useState([]);
    const [categories, setCategories] = useState([]);
    const messagesEndRef = React.useRef(null);

    const scrollToBottom = () => { messagesEndRef.current?.scrollIntoView({ behavior: "smooth" }); };
    React.useEffect(() => { if (open) scrollToBottom(); }, [messages, isTyping, open]);

    // Fetch real courses and categories when chat opens
    useEffect(() => {
        if (open && allCourses.length === 0) {
            Promise.all([
                getApprovedCourses().catch(() => ({ data: [] })),
                getCategoriesWithSubcategories().catch(() => ({ data: [] }))
            ]).then(([coursesRes, catsRes]) => {
                setAllCourses(coursesRes.data || []);
                setCategories(catsRes.data || []);
            });
        }
    }, [open]);

    const getValidImage = (imgUrl) => {
        if (!imgUrl || imgUrl === '/course_placeholder.png') return "/course_placeholder.png";
        if (imgUrl.startsWith('http')) return imgUrl;
        return `${BaseURL}/${imgUrl.replace(/^\//, '')}`;
    };

    const findRecommendation = (text) => {
        const query = text.toLowerCase().trim();
        if (!query) return null;

        const keywordMap = { "jav": "java", "js": "javascript", "py": "python", "sharp": "c#" };
        let processedQuery = query;
        Object.entries(keywordMap).forEach(([key, value]) => {
            if (query === key || query.split(/\s+/).includes(key)) {
                processedQuery = processedQuery.replace(new RegExp(`\\b${key}\\b`, 'g'), value);
            }
        });

        const levels = ["beginner", "intermediate", "advanced", "expert"];
        const targetLevel = levels.find(l => query.includes(l));

        let matches = allCourses.filter(c => (c.title || "").toLowerCase().includes(processedQuery));

        if (matches.length === 0) {
            const matchingCat = categories.find(cat => (cat.name || "").toLowerCase().includes(processedQuery));
            if (matchingCat) matches = allCourses.filter(c => c.categoryId === matchingCat.id);
        }

        if (matches.length === 0 && targetLevel && query === targetLevel) {
            matches = allCourses.filter(c => (c.level || "").toLowerCase().includes(targetLevel));
        }

        if (matches.length > 0 && targetLevel) {
            const levelMatches = matches.filter(c => (c.level || "").toLowerCase().includes(targetLevel));
            if (levelMatches.length > 0) return levelMatches[0];
        }

        return matches.length > 0 ? matches[0] : null;
    };

    const handleSend = () => {
        if (!inputValue.trim()) return;
        const userMsg = { id: Date.now(), role: "user", text: inputValue };
        setMessages(prev => [...prev, userMsg]);
        setInputValue("");
        setIsTyping(true);

        setTimeout(() => {
            const query = userMsg.text.toLowerCase().trim();
            let botResponse;

            const greetings = ["hello", "hi", "hey", "greetings", "hi!"];
            if (greetings.some(g => query === g || query.startsWith(g + " "))) {
                botResponse = {
                    id: Date.now() + 1,
                    role: "bot",
                    text: `Hi! I'm your EduNEXA assistant. How can I help you find the perfect course today?`
                };
            } else {
                const recommendation = findRecommendation(userMsg.text);
                if (recommendation) {
                    const cleanTitle = (recommendation.title || "").trim();
                    const instructor = recommendation.instructorName || recommendation.instructor?.fullName || 'one of our Top Mentors';
                    const level = recommendation.level || 'all skill levels';

                    botResponse = {
                        id: Date.now() + 1,
                        role: "bot",
                        text: `Great! Based on your interest, I recommend "${cleanTitle}" by ${instructor}. It's perfect for ${level}!`,
                        suggestion: {
                            ...recommendation,
                            title: cleanTitle,
                            instructorName: instructor,
                            image: getValidImage(recommendation.thumbnailUrl || recommendation.image || recommendation.imagePath || recommendation.imageUrl),
                            price: recommendation.price,
                            level: level,
                            description: recommendation.description || recommendation.shortDescription || "Master this subject with our expert-led curriculum."
                        }
                    };
                } else {
                    botResponse = {
                        id: Date.now() + 1,
                        role: "bot",
                        text: `I couldn't find a matching course right now. Would you like to explore our popular categories or see what's new?`
                    };
                }
            }

            setMessages(prev => [...prev, botResponse]);
            setIsTyping(false);
        }, 800);
    };

    const showWelcome = mode === "welcome";
    return (
        <>
            {!open && (
                <button type="button" onClick={() => setOpen(true)} className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-teal-600 text-white shadow-xl transition-all duration-300 hover:bg-teal-700 hover:scale-110 animate-bounce-slow"><MessageCircle className="h-6 w-6 animate-pulse" /></button>
            )}
            {open && (
                <div className="fixed bottom-6 right-6 z-50 flex h-130 w-90 max-h-[75vh] max-w-[92vw] flex-col overflow-hidden rounded-2xl bg-white shadow-2xl ring-1 ring-black/5 animate-slide-up">
                    <div className="flex items-center justify-between border-b bg-white px-4 py-3 animate-fade-in">
                        {showWelcome ? <span className="text-[11px] uppercase tracking-[0.35em] text-gray-500 font-bold">chat</span> : <div className="flex items-center gap-3 animate-slide-in-left"><div className="flex h-9 w-9 items-center justify-center rounded-full bg-teal-100 text-teal-700 animate-pulse-gentle"><Bot className="h-5 w-5" /></div><div className="leading-tight"><div className="text-sm font-semibold text-gray-700">EduNEXA Assistant</div><div className="text-xs text-gray-400 flex items-center gap-1"><span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>Online</div></div></div>}
                        <button type="button" onClick={() => setOpen(false)} className="flex h-8 w-8 items-center justify-center rounded-full text-gray-400 transition-all duration-200 hover:bg-gray-100 hover:text-gray-600 hover:rotate-90"><X className="h-4 w-4" /></button>
                    </div>
                    {showWelcome ? (
                        <div className="flex flex-1 flex-col items-center justify-center gap-6 bg-slate-50 px-6 text-center animate-fade-in"><div className="relative flex h-36 w-36 items-center justify-center rounded-full bg-teal-100 shadow-inner animate-scale-in"><div className="flex h-20 w-20 items-center justify-center rounded-full bg-white shadow-md animate-float"><Bot className="h-10 w-10 text-teal-600" /></div><div className="absolute inset-0 rounded-full bg-teal-200 animate-ping opacity-20"></div></div><button type="button" onClick={() => setMode("chat")} className="w-full max-w-50 rounded-lg bg-teal-600 px-6 py-2 text-sm font-semibold text-white shadow transition-all duration-300 hover:bg-teal-700 hover:scale-105 hover:shadow-lg">Get started</button></div>
                    ) : (
                        <><div className="flex-1 space-y-4 overflow-y-auto bg-gradient-to-br from-teal-500 via-teal-600 to-emerald-500 px-4 py-5">{messages.map((message, index) => (<div key={message.id} className="flex flex-col"><div className={`max-w-[80%] rounded-2xl px-3 py-2 text-sm shadow animate-slide-in ${message.role === "user" ? "ml-auto rounded-tr-md bg-white/90 text-gray-800" : "rounded-tl-md bg-white text-gray-700"}`} style={{ animationDelay: `${index * 50}ms` }}>{message.text}</div>{message.suggestion && (<div className="mt-3 w-64 bg-white/95 backdrop-blur-sm rounded-xl overflow-hidden shadow-lg border border-white/20 animate-slide-in cursor-pointer group" onClick={() => onPreviewClick(message.suggestion)}><img src={message.suggestion.image} alt="" className="h-24 w-full object-cover group-hover:scale-110 transition-transform duration-500" onError={(e) => e.target.src = "/course_placeholder.png"} /><div className="p-3"><h4 className="text-xs font-bold text-teal-900 line-clamp-1">{message.suggestion.title}</h4><div className="flex items-center justify-between mt-2"><span className="text-[10px] text-teal-600 font-bold">{message.suggestion.price ? (message.suggestion.price.toString().startsWith('$') ? message.suggestion.price : `$${message.suggestion.price}`) : '$0'}</span><span className="text-[10px] bg-teal-600 text-white px-2 py-0.5 rounded-md font-bold hover:bg-teal-700 transition-colors shadow-sm">View Details</span></div></div></div>)}</div>))}{isTyping && <div className="bg-white/20 w-12 py-2 rounded-full flex justify-center gap-1 animate-pulse"><div className="w-1 h-1 bg-white rounded-full"></div><div className="w-1 h-1 bg-white rounded-full"></div><div className="w-1 h-1 bg-white rounded-full"></div></div>}<div ref={messagesEndRef} /></div><div className="border-t bg-white px-4 py-3"><div className="flex items-center gap-2"><button type="button" className="flex h-9 w-9 items-center justify-center rounded-full text-gray-400 hover:bg-gray-100 hover:text-teal-600"><ImageIcon className="h-4 w-4" /></button><button type="button" className="flex h-9 w-9 items-center justify-center rounded-full text-gray-400 hover:bg-gray-100 hover:text-teal-600"><Mic className="h-4 w-4" /></button><input type="text" placeholder="Ask about courses..." className="flex-1 rounded-full bg-gray-100 px-4 py-2 text-sm text-gray-700 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-400/60 transition-all focus:bg-white" value={inputValue} onChange={(e) => setInputValue(e.target.value)} onKeyPress={(e) => e.key === 'Enter' && handleSend()} /><button type="button" onClick={handleSend} className={`flex h-9 w-9 items-center justify-center rounded-full transition-all duration-200 ${inputValue.trim() ? "bg-teal-600 text-white shadow-md scale-100" : "bg-gray-200 text-gray-400 scale-90"}`}><Send className="h-4 w-4" /></button></div></div></>
                    )}
                </div>
            )}
            <style>{`
                @keyframes slide-up { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
                @keyframes slide-in { from { opacity: 0; transform: translateX(-10px); } to { opacity: 1; transform: translateX(0); } }
                @keyframes slide-in-left { from { opacity: 0; transform: translateX(-15px); } to { opacity: 1; transform: translateX(0); } }
                @keyframes fade-in { from { opacity: 0; } to { opacity: 1; } }
                @keyframes scale-in { from { opacity: 0; transform: scale(0.8); } to { opacity: 1; transform: scale(1); } }
                @keyframes float { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-10px); } }
                @keyframes bounce-slow { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-5px); } }
                @keyframes pulse-gentle { 0%, 100% { opacity: 1; } 50% { opacity: 0.7; } }
                .animate-slide-up { animation: slide-up 0.3s ease-out; }
                .animate-slide-in { animation: slide-in 0.4s ease-out; }
                .animate-slide-in-left { animation: slide-in-left 0.4s ease-out; }
                .animate-fade-in { animation: fade-in 0.3s ease-out; }
                .animate-scale-in { animation: scale-in 0.5s ease-out; }
                .animate-float { animation: float 3s ease-in-out infinite; }
                .animate-bounce-slow { animation: bounce-slow 2s ease-in-out infinite; }
                .animate-pulse-gentle { animation: pulse-gentle 2s ease-in-out infinite; }
                .custom-scrollbar::-webkit-scrollbar { width: 4px; }
                .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
                .custom-scrollbar::-webkit-scrollbar-thumb { background: #4AA59B; border-radius: 10px; }
            `}</style>
        </>
    );
}

export default function StudentLayout() {
    const [previewCourse, setPreviewCourse] = useState(null);
    return (
        <div className="relative min-h-screen flex flex-col">
            <DashboardNavbar role="student" />
            <main className="flex-1">
                <Outlet />
            </main>
            <Footer />
            <ChatWidget onPreviewClick={(course) => setPreviewCourse(course)} />
            <GlobalCourseModal course={previewCourse} onClose={() => setPreviewCourse(null)} />
        </div>
    );
}
