import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import { Bot, Image as ImageIcon, MessageCircle, Mic, Send, X } from "lucide-react";

const demoMessages = [
    { id: 1, role: "bot", text: "Hi chat, how can I help you?" },
    { id: 2, role: "user", text: "Hello! I'm your chat bot." }
];

function ChatWidget() {
    const [open, setOpen] = useState(false);
    const [mode, setMode] = useState("welcome");
    const showWelcome = mode === "welcome";

    return (
        <>
            {/* Animated Chat Button */}
            {!open && (
                <button
                    type="button"
                    onClick={() => setOpen(true)}
                    className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-teal-600 text-white shadow-xl transition-all duration-300 hover:bg-teal-700 hover:scale-110 animate-bounce-slow"
                    aria-label="Open chat"
                >
                    <MessageCircle className="h-6 w-6 animate-pulse" />
                </button>
            )}

            {/* Animated Chat Window */}
            {open && (
                <div className="fixed bottom-6 right-6 z-50 flex h-130 w-90 max-h-[75vh] max-w-[92vw] flex-col overflow-hidden rounded-2xl bg-white shadow-2xl ring-1 ring-black/5 animate-slide-up">
                    {/* Header with smooth transition */}
                    <div className="flex items-center justify-between border-b bg-white px-4 py-3 animate-fade-in">
                        {showWelcome ? (
                            <span className="text-[11px] uppercase tracking-[0.35em] text-gray-500">chat</span>
                        ) : (
                            <div className="flex items-center gap-3 animate-slide-in-left">
                                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-teal-100 text-teal-700 animate-pulse-gentle">
                                    <Bot className="h-5 w-5" />
                                </div>
                                <div className="leading-tight">
                                    <div className="text-sm font-semibold text-gray-700">Chat Bot</div>
                                    <div className="text-xs text-gray-400 flex items-center gap-1">
                                        <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                                        Online
                                    </div>
                                </div>
                            </div>
                        )}
                        <button
                            type="button"
                            onClick={() => setOpen(false)}
                            className="flex h-8 w-8 items-center justify-center rounded-full text-gray-400 transition-all duration-200 hover:bg-gray-100 hover:text-gray-600 hover:rotate-90"
                            aria-label="Close chat"
                        >
                            <X className="h-4 w-4" />
                        </button>
                    </div>

                    {showWelcome ? (
                        <div className="flex flex-1 flex-col items-center justify-center gap-6 bg-slate-50 px-6 text-center animate-fade-in">
                            {/* Animated Bot Avatar */}
                            <div className="relative flex h-36 w-36 items-center justify-center rounded-full bg-teal-100 shadow-inner animate-scale-in">
                                <div className="flex h-20 w-20 items-center justify-center rounded-full bg-white shadow-md animate-float">
                                    <Bot className="h-10 w-10 text-teal-600" />
                                </div>
                                {/* Pulse rings */}
                                <div className="absolute inset-0 rounded-full bg-teal-200 animate-ping opacity-20"></div>
                            </div>
                            <button
                                type="button"
                                onClick={() => setMode("chat")}
                                className="w-full max-w-50 rounded-lg bg-teal-600 px-6 py-2 text-sm font-semibold text-white shadow transition-all duration-300 hover:bg-teal-700 hover:scale-105 hover:shadow-lg"
                            >
                                Get start
                            </button>
                            <p className="text-xs text-gray-500 animate-fade-in-delay">
                                Already have an account? <a className="font-semibold text-teal-700 hover:text-teal-800 transition-colors" href="/login">Log in</a>
                            </p>
                        </div>
                    ) : (
                        <>
                            {/* Messages Area */}
                            <div className="flex-1 space-y-4 overflow-y-auto bg-gradient-to-br from-teal-500 via-teal-600 to-emerald-500 px-4 py-5">
                                {demoMessages.map((message, index) => (
                                    <div
                                        key={message.id}
                                        className={`max-w-[80%] rounded-2xl px-3 py-2 text-sm shadow animate-slide-in ${message.role === "user"
                                            ? "ml-auto rounded-tr-md bg-white/90 text-gray-800"
                                            : "rounded-tl-md bg-white text-gray-700"
                                            }`}
                                        style={{ animationDelay: `${index * 150}ms` }}
                                    >
                                        {message.text}
                                    </div>
                                ))}
                            </div>

                            {/* Input Area */}
                            <div className="border-t bg-white px-4 py-3 animate-slide-up-delay">
                                <div className="flex items-center gap-2">
                                    <button
                                        type="button"
                                        className="flex h-9 w-9 items-center justify-center rounded-full text-gray-400 transition-all duration-200 hover:bg-gray-100 hover:text-teal-600 hover:scale-110"
                                        aria-label="Attach image"
                                    >
                                        <ImageIcon className="h-4 w-4" />
                                    </button>
                                    <button
                                        type="button"
                                        className="flex h-9 w-9 items-center justify-center rounded-full text-gray-400 transition-all duration-200 hover:bg-gray-100 hover:text-teal-600 hover:scale-110"
                                        aria-label="Voice message"
                                    >
                                        <Mic className="h-4 w-4" />
                                    </button>
                                    <input
                                        type="text"
                                        placeholder="Write a message"
                                        className="flex-1 rounded-full bg-gray-100 px-4 py-2 text-sm text-gray-700 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-400/60 transition-all duration-200 focus:bg-white"
                                    />
                                    <button
                                        type="button"
                                        className="flex h-9 w-9 items-center justify-center rounded-full bg-teal-600 text-white shadow transition-all duration-200 hover:bg-teal-700 hover:scale-110 active:scale-95"
                                        aria-label="Send message"
                                    >
                                        <Send className="h-4 w-4" />
                                    </button>
                                </div>
                            </div>
                        </>
                    )}
                </div>
            )}

            {/* CSS Animations */}
            <style jsx>{`
                @keyframes slide-up {
                    from {
                        opacity: 0;
                        transform: translateY(20px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }
                
                @keyframes slide-in {
                    from {
                        opacity: 0;
                        transform: translateX(-10px);
                    }
                    to {
                        opacity: 1;
                        transform: translateX(0);
                    }
                }
                
                @keyframes slide-in-left {
                    from {
                        opacity: 0;
                        transform: translateX(-15px);
                    }
                    to {
                        opacity: 1;
                        transform: translateX(0);
                    }
                }
                
                @keyframes fade-in {
                    from { opacity: 0; }
                    to { opacity: 1; }
                }
                
                @keyframes scale-in {
                    from {
                        opacity: 0;
                        transform: scale(0.8);
                    }
                    to {
                        opacity: 1;
                        transform: scale(1);
                    }
                }
                
                @keyframes float {
                    0%, 100% { transform: translateY(0); }
                    50% { transform: translateY(-10px); }
                }
                
                @keyframes bounce-slow {
                    0%, 100% { transform: translateY(0); }
                    50% { transform: translateY(-5px); }
                }
                
                @keyframes pulse-gentle {
                    0%, 100% { opacity: 1; }
                    50% { opacity: 0.7; }
                }
                
                .animate-slide-up {
                    animation: slide-up 0.3s ease-out;
                }
                
                .animate-slide-in {
                    animation: slide-in 0.4s ease-out;
                }
                
                .animate-slide-in-left {
                    animation: slide-in-left 0.4s ease-out;
                }
                
                .animate-fade-in {
                    animation: fade-in 0.3s ease-out;
                }
                
                .animate-fade-in-delay {
                    animation: fade-in 0.5s ease-out 0.2s both;
                }
                
                .animate-scale-in {
                    animation: scale-in 0.5s ease-out;
                }
                
                .animate-float {
                    animation: float 3s ease-in-out infinite;
                }
                
                .animate-bounce-slow {
                    animation: bounce-slow 2s ease-in-out infinite;
                }
                
                .animate-pulse-gentle {
                    animation: pulse-gentle 2s ease-in-out infinite;
                }
                
                .animate-slide-up-delay {
                    animation: slide-up 0.4s ease-out 0.1s both;
                }
            `}</style>
        </>
    );
}

import Navbar from "../components/layout/Navbar";

export default function StudentLayout() {
    return (
        <div className="relative min-h-screen">
            <Navbar />
            <Outlet />
            <ChatWidget />
        </div>
    );
}
