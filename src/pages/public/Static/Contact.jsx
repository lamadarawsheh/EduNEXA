import React from 'react';
import { Mail, Phone, MapPin, Send } from 'lucide-react';

const Contact = () => {
    return (
        <div className="bg-gradient-to-r from-[#FCFFFE] via-[#F9FEFD] to-[#F5FDFC] min-h-screen py-10 px-4">
            {/* Header */}
            <div className="max-w-4xl mx-auto text-center mb-16 space-y-4">
                <h1 className="text-4xl md:text-5xl font-bold text-[#0F172B]">
                    Get in <span className="text-[#4AA59B]">Touch</span>
                </h1>
                <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                    We're here to help! Whether you have questions about our courses or need technical support, our team is ready to assist you.
                </p>
            </div>

            <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12">

                {/* Contact Info & Illustration */}
                <div className="space-y-10">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                            <div className="w-12 h-12 bg-[#E0F2F1] rounded-full flex items-center justify-center text-[#4AA59B] mb-4">
                                <Mail className="w-6 h-6" />
                            </div>
                            <h3 className="font-bold text-[#0F172B] text-lg mb-2">Email Us</h3>
                            <p className="text-gray-500 text-sm">Our friendly team is here to help.</p>
                            <p className="text-[#4AA59B] font-medium mt-2">support@edunexa.com</p>
                        </div>

                        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                            <div className="w-12 h-12 bg-[#E0F2F1] rounded-full flex items-center justify-center text-[#4AA59B] mb-4">
                                <Phone className="w-6 h-6" />
                            </div>
                            <h3 className="font-bold text-[#0F172B] text-lg mb-2">Call Us</h3>
                            <p className="text-gray-500 text-sm">Mon-Fri from 8am to 5pm.</p>
                            <p className="text-[#4AA59B] font-medium mt-2">+1 (555) 000-0000</p>
                        </div>

                        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow sm:col-span-2">
                            <div className="w-12 h-12 bg-[#E0F2F1] rounded-full flex items-center justify-center text-[#4AA59B] mb-4">
                                <MapPin className="w-6 h-6" />
                            </div>
                            <h3 className="font-bold text-[#0F172B] text-lg mb-2">Visit Us</h3>
                            <p className="text-gray-500 text-sm">Come say hello at our office HQ.</p>
                            <p className="text-[#4AA59B] font-medium mt-2">123 Education Street, Learning City, 10010</p>
                        </div>
                    </div>
                </div>

                {/* Contact Form */}
                <div className="bg-white p-8 rounded-3xl shadow-xl border border-gray-100">
                    <h2 className="text-2xl font-bold text-[#0F172B] mb-6">Send us a Message</h2>
                    <form className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-700">First Name</label>
                                <input type="text" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#4AA59B] focus:ring-4 focus:ring-[#4AA59B]/10 outline-none transition-all bg-gray-50 focus:bg-white" placeholder="John" />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-700">Last Name</label>
                                <input type="text" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#4AA59B] focus:ring-4 focus:ring-[#4AA59B]/10 outline-none transition-all bg-gray-50 focus:bg-white" placeholder="Doe" />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-700">Email Address</label>
                            <input type="email" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#4AA59B] focus:ring-4 focus:ring-[#4AA59B]/10 outline-none transition-all bg-gray-50 focus:bg-white" placeholder="you@example.com" />
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-700">Message</label>
                            <textarea rows="4" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#4AA59B] focus:ring-4 focus:ring-[#4AA59B]/10 outline-none transition-all bg-gray-50 focus:bg-white resize-none" placeholder="How can we help you?"></textarea>
                        </div>

                        <button type="submit" className="w-full py-4 bg-[#0F4C4A] hover:bg-[#0b3836] text-white font-bold rounded-xl shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all duration-200 flex items-center justify-center gap-2">
                            Send Message
                            <Send className="w-5 h-5" />
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Contact;
