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
            {!open && (
                <button
                    type="button"
                    onClick={() => setOpen(true)}
                    className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-teal-600 text-white shadow-xl transition hover:bg-teal-700"
                    aria-label="Open chat"
                >
                    <MessageCircle className="h-6 w-6" />
                </button>
            )}

            {open && (
                <div className="fixed bottom-6 right-6 z-50 flex h-130 w-90 max-h-[75vh] max-w-[92vw] flex-col overflow-hidden rounded-2xl bg-white shadow-2xl ring-1 ring-black/5">
                    <div className="flex items-center justify-between border-b bg-white px-4 py-3">
                        {showWelcome ? (
                            <span className="text-[11px] uppercase tracking-[0.35em] text-gray-500">chat</span>
                        ) : (
                            <div className="flex items-center gap-3">
                                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-teal-100 text-teal-700">
                                    <Bot className="h-5 w-5" />
                                </div>
                                <div className="leading-tight">
                                    <div className="text-sm font-semibold text-gray-700">Chat Bot</div>
                                    <div className="text-xs text-gray-400">Online</div>
                                </div>
                            </div>
                        )}
                        <button
                            type="button"
                            onClick={() => setOpen(false)}
                            className="flex h-8 w-8 items-center justify-center rounded-full text-gray-400 transition hover:bg-gray-100 hover:text-gray-600"
                            aria-label="Close chat"
                        >
                            <X className="h-4 w-4" />
                        </button>
                    </div>

                    {showWelcome ? (
                        <div className="flex flex-1 flex-col items-center justify-center gap-6 bg-slate-50 px-6 text-center">
                            <div className="relative flex h-36 w-36 items-center justify-center rounded-full bg-teal-100 shadow-inner">
                                <div className="flex h-20 w-20 items-center justify-center rounded-full bg-white shadow-md">
                                    <Bot className="h-10 w-10 text-teal-600" />
                                </div>
                            </div>
                            <button
                                type="button"
                                onClick={() => setMode("chat")}
                                className="w-full max-w-50 rounded-lg bg-teal-600 px-6 py-2 text-sm font-semibold text-white shadow transition hover:bg-teal-700"
                            >
                                Get start
                            </button>
                            <p className="text-xs text-gray-500">
                                Already have an account? <a className="font-semibold text-teal-700 hover:text-teal-800" href="/login">Log in</a>
                            </p>
                        </div>
                    ) : (
                        <>
                            <div className="flex-1 space-y-4 overflow-y-auto bg-linear-to-br from-teal-500 via-teal-600 to-emerald-500 px-4 py-5">
                                {demoMessages.map((message) => (
                                    <div
                                        key={message.id}
                                        className={`max-w-[80%] rounded-2xl px-3 py-2 text-sm shadow ${
                                            message.role === "user"
                                                ? "ml-auto rounded-tr-md bg-white/90 text-gray-800"
                                                : "rounded-tl-md bg-white text-gray-700"
                                        }`}
                                    >
                                        {message.text}
                                    </div>
                                ))}
                            </div>
                            <div className="border-t bg-white px-4 py-3">
                                <div className="flex items-center gap-2">
                                    <button
                                        type="button"
                                        className="flex h-9 w-9 items-center justify-center rounded-full text-gray-400 transition hover:bg-gray-100 hover:text-teal-600"
                                        aria-label="Attach image"
                                    >
                                        <ImageIcon className="h-4 w-4" />
                                    </button>
                                    <button
                                        type="button"
                                        className="flex h-9 w-9 items-center justify-center rounded-full text-gray-400 transition hover:bg-gray-100 hover:text-teal-600"
                                        aria-label="Voice message"
                                    >
                                        <Mic className="h-4 w-4" />
                                    </button>
                                    <input
                                        type="text"
                                        placeholder="Write a message"
                                        className="flex-1 rounded-full bg-gray-100 px-4 py-2 text-sm text-gray-700 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-400/60"
                                    />
                                    <button
                                        type="button"
                                        className="flex h-9 w-9 items-center justify-center rounded-full bg-teal-600 text-white shadow transition hover:bg-teal-700"
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
        </>
    );
}

export default function StudentLayout() {
    return (
        <div className="relative min-h-screen">
            <Outlet />
            <ChatWidget />
        </div>
    );
}
