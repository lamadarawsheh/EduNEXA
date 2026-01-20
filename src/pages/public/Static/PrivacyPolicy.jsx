import React from 'react';
import { Shield, Lock, Eye, FileText, CheckCircle } from 'lucide-react';

const PrivacyPolicy = () => {
    return (
        <div className="bg-gradient-to-r from-[#FCFFFE] via-[#F9FEFD] to-[#F5FDFC] min-h-screen py-12 px-4">
            <div className="max-w-4xl mx-auto bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden">

                {/* Header Banner */}
                <div className="bg-[#0F4C4A] text-white p-8 md:p-12 text-center relative overflow-hidden">
                    <div className="relative z-10">
                        <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-6 backdrop-blur-sm">
                            <Shield className="w-8 h-8 text-white" />
                        </div>
                        <h1 className="text-3xl md:text-4xl font-bold mb-4">Privacy Policy</h1>
                        <p className="text-white/80 max-w-xl mx-auto">
                            We are committed to protecting your privacy and ensuring your data is handled securely and transparently.
                        </p>
                    </div>
                    {/* Background Pattern */}
                    <div className="absolute top-0 right-0 p-12 opacity-10 transform rotate-45 pointer-events-none">
                        <svg width="300" height="300" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M12 2L2 7l10 5 10-5-10-5zm0 9l2.5-1.25L12 8.5l-2.5 1.25L12 11zm0 2.5l-5-2.5-5 2.5L12 22l10-8.5-5-2.5-5 2.5z" />
                        </svg>
                    </div>
                </div>

                {/* Content */}
                <div className="p-8 md:p-12 space-y-10 text-gray-700">

                    {/* Section 1 */}
                    <div className="space-y-4">
                        <div className="flex items-center gap-3 text-[#0F4C4A]">
                            <FileText className="w-6 h-6" />
                            <h2 className="text-2xl font-bold">1. Information We Collect</h2>
                        </div>
                        <p className="leading-relaxed text-gray-600 pl-9">
                            We collect information you provide directly to us, such as when you create an account, enroll in a course, or contact support. This may include your name, email address, payment information, and course progress data. We also automatically collect certain information about your device and how you interact with our platform.
                        </p>
                    </div>

                    {/* Section 2 */}
                    <div className="space-y-4">
                        <div className="flex items-center gap-3 text-[#0F4C4A]">
                            <Eye className="w-6 h-6" />
                            <h2 className="text-2xl font-bold">2. How We Use Your Information</h2>
                        </div>
                        <ul className="space-y-3 pl-9 text-gray-600 list-none">
                            {[
                                "To provide, maintain, and improve our services.",
                                "To process your transactions and manage your enrollment.",
                                "To send you technical notices, updates, and support messages.",
                                "To personalize your learning experience and recommend content."
                            ].map((item, idx) => (
                                <li key={idx} className="flex items-start gap-3">
                                    <CheckCircle className="w-5 h-5 text-[#4AA59B] shrink-0 mt-0.5" />
                                    <span>{item}</span>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Section 3 */}
                    <div className="space-y-4">
                        <div className="flex items-center gap-3 text-[#0F4C4A]">
                            <Lock className="w-6 h-6" />
                            <h2 className="text-2xl font-bold">3. Data Security</h2>
                        </div>
                        <p className="leading-relaxed text-gray-600 pl-9">
                            We implement appropriate technical and organizational measures to protect your personal data against unauthorized access, alteration, disclosure, or destruction. We use industry-standard encryption protocols and secure server infrastructure to safeguard your information.
                        </p>
                    </div>

                    <div className="border-t border-gray-100 pt-8">
                        <p className="text-sm text-gray-500 italic text-center">Last Updated: January 2026</p>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default PrivacyPolicy;
