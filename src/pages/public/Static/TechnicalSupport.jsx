import React from 'react';
import { Wrench, Monitor, Cpu, MessageSquare } from 'lucide-react';

const TechnicalSupport = () => {
    return (
        <div className="bg-gradient-to-r from-[#FCFFFE] via-[#F9FEFD] to-[#F5FDFC] min-h-screen py-10 px-4">
            <div className="max-w-4xl mx-auto text-center mb-16 space-y-4">
                <h1 className="text-4xl md:text-5xl font-bold text-[#0F172B]">
                    Technical <span className="text-[#4AA59B]">Support</span>
                </h1>
                <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                    Facing technical issues? Our dedicated support team is here to ensure your learning experience is smooth and uninterrupted.
                </p>
            </div>

            <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
                <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 text-center hover:shadow-md transition-all">
                    <div className="w-16 h-16 bg-[#E0F2F1] rounded-full flex items-center justify-center text-[#4AA59B] mx-auto mb-6">
                        <Monitor className="w-8 h-8" />
                    </div>
                    <h3 className="font-bold text-[#0F172B] text-xl mb-2">Platform Issues</h3>
                    <p className="text-gray-500 text-sm">Trouble accessing courses or dashboard errors.</p>
                </div>
                <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 text-center hover:shadow-md transition-all">
                    <div className="w-16 h-16 bg-[#E0F2F1] rounded-full flex items-center justify-center text-[#4AA59B] mx-auto mb-6">
                        <Cpu className="w-8 h-8" />
                    </div>
                    <h3 className="font-bold text-[#0F172B] text-xl mb-2">Account Access</h3>
                    <p className="text-gray-500 text-sm">Login problems, password resets, or account recovery.</p>
                </div>
                <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 text-center hover:shadow-md transition-all">
                    <div className="w-16 h-16 bg-[#E0F2F1] rounded-full flex items-center justify-center text-[#4AA59B] mx-auto mb-6">
                        <MessageSquare className="w-8 h-8" />
                    </div>
                    <h3 className="font-bold text-[#0F172B] text-xl mb-2">General Inquiries</h3>
                    <p className="text-gray-500 text-sm">Any other technical questions or feedback.</p>
                </div>
            </div>

            <div className="max-w-3xl mx-auto bg-white p-8 md:p-10 rounded-3xl shadow-xl border border-gray-100">
                <div className="flex items-center gap-3 mb-8 pb-4 border-b border-gray-100">
                    <Wrench className="w-6 h-6 text-[#4AA59B]" />
                    <h2 className="text-2xl font-bold text-[#0F172B]">Submit a Ticket</h2>
                </div>

                <form className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-700">Full Name</label>
                            <input type="text" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#4AA59B] focus:ring-4 focus:ring-[#4AA59B]/10 outline-none transition-all bg-gray-50 focus:bg-white" placeholder="Enter your name" />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-700">Email Address</label>
                            <input type="email" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#4AA59B] focus:ring-4 focus:ring-[#4AA59B]/10 outline-none transition-all bg-gray-50 focus:bg-white" placeholder="Enter your email" />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700">Issue Type</label>
                        <select className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#4AA59B] focus:ring-4 focus:ring-[#4AA59B]/10 outline-none transition-all bg-gray-50 focus:bg-white text-gray-600">
                            <option>Select an issue category</option>
                            <option>Login / Account Access</option>
                            <option>Course Content / Playback</option>
                            <option>Payment / Billing</option>
                            <option>Other</option>
                        </select>
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700">Description</label>
                        <textarea rows="5" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#4AA59B] focus:ring-4 focus:ring-[#4AA59B]/10 outline-none transition-all bg-gray-50 focus:bg-white resize-none" placeholder="Describe the issue you are facing in detail..."></textarea>
                    </div>

                    <button type="submit" className="w-full py-4 bg-[#0F4C4A] hover:bg-[#0b3836] text-white font-bold rounded-xl shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all duration-200">
                        Submit Ticket
                    </button>
                </form>
            </div>
        </div>
    );
};

export default TechnicalSupport;
