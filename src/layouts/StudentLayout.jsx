import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import DashboardNavbar from "../components/layout/DashboardNavbar";
import Footer from "../components/layout/Footer";
import { Bot, Image as ImageIcon, MessageCircle, Mic, Send, X, Star, Users, ExternalLink, PlayCircle, Info, CheckCircle2 } from "lucide-react";
import { useNavigate } from "react-router-dom";

const allCourses = [
    { id: 1, title: 'Complete Web BootCamp 2024', instructor: 'Dr. Angela Yu', rating: 4.9, enrolled: 15420, price: '$89.99', category: 'Web Development', subCategory: 'Fullstack', level: 'Beginner', image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&auto=format&fit=crop&q=60' },
    { id: 2, title: 'Advanced UI/UX Masterclass', instructor: 'Gary Simon', rating: 4.8, enrolled: 8900, price: '$74.99', category: 'UI/UX Design', subCategory: 'Visual Design', level: 'Intermediate', image: 'https://images.unsplash.com/photo-1586717791821-3f44a563eb4c?w=800&auto=format&fit=crop&q=60' },
    { id: 3, title: 'Machine Learning A-Z', instructor: 'Kirill Eremenko', rating: 4.7, enrolled: 12100, price: '$94.99', category: 'Data Science', subCategory: 'Machine Learning', level: 'Beginner', image: 'https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?w=800&auto=format&fit=crop&q=60' },
    { id: 4, title: 'Business Strategy 101', instructor: 'Chris Anderson', rating: 4.6, enrolled: 5400, price: '$49.99', category: 'Business', subCategory: 'Strategy', level: 'All Levels', image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&auto=format&fit=crop&q=60' },
    { id: 5, title: 'React & Next.js Professional', instructor: 'Maximilian Schwarzmüller', rating: 4.9, enrolled: 22000, price: '$99.99', category: 'Web Development', subCategory: 'Frontend', level: 'Advanced', image: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&auto=format&fit=crop&q=60' },
    { id: 6, title: 'Social Media Marketing', instructor: 'Neil Patel', rating: 4.5, enrolled: 18000, price: '$59.99', category: 'Marketing', subCategory: 'Social Media', level: 'Intermediate', image: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=800&auto=format&fit=crop&q=60' },
];

const GlobalCourseModal = ({ course, onClose }) => {
    if (!course) return null;
    return (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-[200] p-4 animate-in fade-in duration-300" onClick={onClose}>
            <div className="bg-white rounded-[24px] md:rounded-[32px] w-full max-w-2xl max-h-[90vh] overflow-y-auto md:overflow-hidden shadow-2xl relative animate-in zoom-in-95 duration-300" onClick={(e) => e.stopPropagation()}>
                <button onClick={onClose} className="absolute top-4 right-4 md:top-6 md:right-6 p-2 bg-white/80 hover:bg-white rounded-full text-gray-500 hover:text-[#0F4C4A] shadow-lg transition-all z-20"><X size={20} className="md:w-6 md:h-6" /></button>
                <div className="flex flex-col md:flex-row h-full">
                    <div className="md:w-1/2 relative h-48 sm:h-64 md:h-auto shrink-0">
                        <img src={course.image} alt={course.title} className="w-full h-full object-cover" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                        <div className="absolute bottom-4 left-4 md:bottom-6 md:left-6 text-white"><span className="bg-[#4AA59B] px-2 py-0.5 md:px-3 md:py-1 rounded-full text-[9px] md:text-[10px] font-bold uppercase tracking-wider mb-1 md:mb-2 inline-block">Preview Available</span><div className="flex items-center gap-2"><PlayCircle size={24} className="md:w-8 md:h-8 text-white fill-white/20" /><span className="font-bold text-sm md:text-base">Watch Trailer</span></div></div>
                    </div>
                    <div className="md:w-1/2 p-6 md:p-8 flex flex-col">
                        <div className="flex items-center gap-2 mb-3 md:mb-4"><span className="bg-[#F0F9F8] text-[#0F4C4A] px-2 py-0.5 md:px-3 md:py-1 rounded-lg text-[9px] md:text-[10px] font-black uppercase tracking-widest leading-none border border-[#0F4C4A]/5">{course.category}</span><span className="text-gray-300 text-xs font-bold">●</span><span className="text-[#4AA59B] text-[9px] md:text-[10px] font-black uppercase tracking-widest">{course.level}</span></div>
                        <h2 className="text-xl md:text-2xl font-black text-[#0F172B] mb-3 md:mb-4 leading-tight">{course.title}</h2>
                        <div className="flex flex-wrap items-center gap-4 md:gap-6 mb-4 md:mb-6"><div className="flex items-center gap-1.5"><Star size={16} fill="#EAB308" className="text-yellow-500 md:w-4.5 md:h-4.5" /><span className="font-bold text-[#0F172B] text-sm md:text-base">{course.rating}</span></div><div className="flex items-center gap-1.5 text-gray-500"><Users size={16} className="md:w-4.5 md:h-4.5" /><span className="font-bold text-sm md:text-base">{course.enrolled.toLocaleString()}</span></div></div>
                        <div className="space-y-2.5 md:space-y-3 mb-6 md:mb-8"><h4 className="text-xs md:text-sm font-black text-[#0F4C4A] uppercase tracking-wider mb-2 flex items-center gap-2"><Info size={14} /> What you'll learn</h4>{["Master fundamental concepts", "Hands-on projects and labs", "Professional level techniques", "Certificate of completion"].map((feature, i) => (<div key={i} className="flex items-start gap-2 text-xs md:text-sm text-gray-600"><CheckCircle2 size={14} className="text-[#4AA59B] mt-0.5 shrink-0" /><span>{feature}</span></div>))}</div>
                        <div className="mt-auto pt-4 md:pt-6 border-t border-gray-100 flex items-center justify-between gap-4"><div><p className="text-[9px] md:text-[10px] text-gray-400 font-bold uppercase tracking-widest mb-0.5 md:mb-1">Full access</p><span className="text-xl md:text-2xl font-black text-[#0F4C4A]">{course.price}</span></div><button className="flex-1 max-w-[160px] bg-[#0F4C4A] text-white py-3 md:py-4 rounded-xl md:rounded-2xl font-black text-xs md:text-sm hover:bg-[#4AA59B] transition-all shadow-lg shadow-[#0F4C4A]/20 active:scale-95 transform">Enroll Now</button></div>
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
    const [messages, setMessages] = useState([{ id: 1, role: "bot", text: "Hi chat, how can I help you?" }]);
    const [inputValue, setInputValue] = useState("");
    const [isTyping, setIsTyping] = useState(false);
    const messagesEndRef = React.useRef(null);
    const scrollToBottom = () => { messagesEndRef.current?.scrollIntoView({ behavior: "smooth" }); };
    React.useEffect(() => { if (open) scrollToBottom(); }, [messages, isTyping, open]);
    const findRecommendation = (text) => {
        const query = text.toLowerCase();
        return allCourses.find(course => query.includes(course.category.toLowerCase()) || query.includes(course.subCategory.toLowerCase()) || query.includes(course.title.toLowerCase().split(' ')[0]));
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
            const greetings = ["hello", "hi", "hey", "greetings", "hola"];
            if (greetings.some(g => query === g || query.startsWith(g + " "))) {
                botResponse = { id: Date.now() + 1, role: "bot", text: "Hello! I'm here to help you find the perfect course. What topic are you interested in exploring today?" };
            } else {
                const recommendation = findRecommendation(userMsg.text);
                if (recommendation) { botResponse = { id: Date.now() + 1, role: "bot", text: `Based on what you asked, I suggest the "${recommendation.title}" course.`, suggestion: recommendation }; }
                else { botResponse = { id: Date.now() + 1, role: "bot", text: "I'm not sure about that specific topic, but we have great courses in Web Development, UI/UX, and Data Science." }; }
            }
            setMessages(prev => [...prev, botResponse]);
            setIsTyping(false);
        }, 1000);
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
                        {showWelcome ? <span className="text-[11px] uppercase tracking-[0.35em] text-gray-500 font-bold">chat</span> : <div className="flex items-center gap-3 animate-slide-in-left"><div className="flex h-9 w-9 items-center justify-center rounded-full bg-teal-100 text-teal-700 animate-pulse-gentle"><Bot className="h-5 w-5" /></div><div className="leading-tight"><div className="text-sm font-semibold text-gray-700">Chat Bot</div><div className="text-xs text-gray-400 flex items-center gap-1"><span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>Online</div></div></div>}
                        <button type="button" onClick={() => setOpen(false)} className="flex h-8 w-8 items-center justify-center rounded-full text-gray-400 transition-all duration-200 hover:bg-gray-100 hover:text-gray-600 hover:rotate-90"><X className="h-4 w-4" /></button>
                    </div>
                    {showWelcome ? (
                        <div className="flex flex-1 flex-col items-center justify-center gap-6 bg-slate-50 px-6 text-center animate-fade-in"><div className="relative flex h-36 w-36 items-center justify-center rounded-full bg-teal-100 shadow-inner animate-scale-in"><div className="flex h-20 w-20 items-center justify-center rounded-full bg-white shadow-md animate-float"><Bot className="h-10 w-10 text-teal-600" /></div><div className="absolute inset-0 rounded-full bg-teal-200 animate-ping opacity-20"></div></div><button type="button" onClick={() => setMode("chat")} className="w-full max-w-50 rounded-lg bg-teal-600 px-6 py-2 text-sm font-semibold text-white shadow transition-all duration-300 hover:bg-teal-700 hover:scale-105 hover:shadow-lg">Get start</button></div>
                    ) : (
                        <><div className="flex-1 space-y-4 overflow-y-auto bg-gradient-to-br from-teal-500 via-teal-600 to-emerald-500 px-4 py-5">{messages.map((message, index) => (<div key={message.id} className="flex flex-col"><div className={`max-w-[80%] rounded-2xl px-3 py-2 text-sm shadow animate-slide-in ${message.role === "user" ? "ml-auto rounded-tr-md bg-white/90 text-gray-800" : "rounded-tl-md bg-white text-gray-700"}`} style={{ animationDelay: `${index * 50}ms` }}>{message.text}</div>{message.suggestion && (<div className="mt-3 w-64 bg-white/95 backdrop-blur-sm rounded-xl overflow-hidden shadow-lg border border-white/20 animate-slide-in cursor-pointer group" onClick={() => onPreviewClick(message.suggestion)}><img src={message.suggestion.image} alt="" className="h-24 w-full object-cover group-hover:scale-110 transition-transform duration-500" /><div className="p-3"><h4 className="text-xs font-bold text-teal-900 line-clamp-1">{message.suggestion.title}</h4><div className="flex items-center justify-between mt-2"><span className="text-[10px] text-teal-600 font-bold">{message.suggestion.price}</span><span className="text-[10px] bg-teal-600 text-white px-2 py-0.5 rounded-md font-bold hover:bg-teal-700 transition-colors shadow-sm">View Card</span></div></div></div>)}</div>))}{isTyping && <div className="bg-white/20 w-12 py-2 rounded-full flex justify-center gap-1 animate-pulse"><div className="w-1 h-1 bg-white rounded-full"></div><div className="w-1 h-1 bg-white rounded-full"></div><div className="w-1 h-1 bg-white rounded-full"></div></div>}<div ref={messagesEndRef} /></div><div className="border-t bg-white px-4 py-3"><div className="flex items-center gap-2"><button type="button" className="flex h-9 w-9 items-center justify-center rounded-full text-gray-400 hover:bg-gray-100 hover:text-teal-600"><ImageIcon className="h-4 w-4" /></button><button type="button" className="flex h-9 w-9 items-center justify-center rounded-full text-gray-400 hover:bg-gray-100 hover:text-teal-600"><Mic className="h-4 w-4" /></button><input type="text" placeholder="Write a message" className="flex-1 rounded-full bg-gray-100 px-4 py-2 text-sm text-gray-700 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-400/60 transition-all focus:bg-white" value={inputValue} onChange={(e) => setInputValue(e.target.value)} onKeyPress={(e) => e.key === 'Enter' && handleSend()} /><button type="button" onClick={handleSend} className={`flex h-9 w-9 items-center justify-center rounded-full transition-all duration-200 ${inputValue.trim() ? "bg-teal-600 text-white shadow-md scale-100" : "bg-gray-200 text-gray-400 scale-90"}`}><Send className="h-4 w-4" /></button></div></div></>
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
