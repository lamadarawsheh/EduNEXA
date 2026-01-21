import React, { useState } from 'react';
import { ChevronDown, ChevronUp, Search, GraduationCap, Users } from 'lucide-react';
import { useLocation } from 'react-router-dom';

const FAQ = () => {
    const [openIndex, setOpenIndex] = useState(0);
    const location = useLocation();

    // Set initial tab based on URL path instead of query param
    const initialTab = location.pathname.startsWith('/teach/') ? 'teacher' : 'student';
    const [activeTab, setActiveTab] = useState(initialTab);

    const studentFaqs = [
        {
            question: "How do I sign up for a course?",
            answer: "Signing up is easy! Simply create an account, browse our catalog of courses, and click 'Enroll Now' on any course you're interested in. You can start learning immediately after enrollment."
        },
        {
            question: "Can I access the courses on mobile devices?",
            answer: "Yes! EduNEXA is fully responsive and works seamlessly on desktops, tablets, and mobile phones. You can learn on the go, anytime and anywhere."
        },
        {
            question: "Do I get a certificate after completion?",
            answer: "Absolutely. Upon successfully completing a course and passing any required assessments, you will receive a verified digital certificate that you can share on LinkedIn or add to your CV."
        },
        {
            question: "What payment methods do you accept?",
            answer: "We accept all major credit cards (Visa, MasterCard), PayPal, and various local payment methods depending on your region. All transactions are secure and encrypted."
        },
        {
            question: "Is there a refund policy?",
            answer: "Yes, we offer a 30-day money-back guarantee. If you're not satisfied with a course for any reason, simply contact our support team within 30 days of purchase for a full refund."
        }
    ];

    const teacherFaqs = [
        {
            question: "How do I become a teacher on EduNEXA?",
            answer: "Simply sign up for a teacher account, complete your profile with your expertise and credentials, and submit your application. Our team will review it within 2-3 business days and guide you through the course creation process."
        },
        {
            question: "What commission does EduNEXA take?",
            answer: "We operate on a revenue-sharing model where teachers keep 70% of course sales. This competitive rate ensures you're fairly compensated for your expertise while we handle marketing, hosting, and student support."
        },
        {
            question: "Can I set my own course prices?",
            answer: "Yes! You have complete control over your course pricing. You can offer free courses, one-time purchases, or subscription-based content. We provide pricing recommendations based on market analysis to help you maximize earnings."
        },
        {
            question: "What tools do you provide for course creation?",
            answer: "Our platform includes an intuitive course builder, video hosting, quiz creation tools, student analytics dashboard, and automated certificate generation. You can upload videos, PDFs, presentations, and interactive content with ease."
        },
        {
            question: "How and when do I get paid?",
            answer: "Payments are processed monthly via bank transfer or PayPal. You'll receive your earnings within 5-7 business days after the end of each month. We provide detailed revenue reports and analytics to track your income."
        },
        {
            question: "Do I need teaching experience to join?",
            answer: "While teaching experience is valuable, it's not mandatory. We welcome subject matter experts who are passionate about sharing their knowledge. We provide resources and best practices to help you create engaging courses."
        }
    ];

    const faqs = activeTab === 'teacher' ? teacherFaqs : studentFaqs;

    return (
        <div className="bg-gradient-to-r from-[#FCFFFE] via-[#F9FEFD] to-[#F5FDFC] min-h-screen py-10 px-4">
            <div className="max-w-4xl mx-auto">

                {/* Header */}
                <div className="text-center mb-12 space-y-4">
                    <h1 className="text-4xl md:text-5xl font-bold text-[#0F172B]">
                        Frequently Asked <span className="text-[#4AA59B]">Questions</span>
                    </h1>
                    <p className="text-gray-600 text-lg">
                        Everything you need to know about EduNEXA. Can't find the answer you're looking for? Please contact our team.
                    </p>
                </div>

                {/* Tab Switcher */}
                <div className="flex justify-center mb-8">
                    <div className="inline-flex bg-white rounded-2xl p-2 shadow-lg border border-gray-100">
                        <button
                            onClick={() => {
                                setActiveTab('student');
                                setOpenIndex(0);
                            }}
                            className={`flex items-center gap-2 px-6 py-3 rounded-xl font-bold transition-all duration-300 ${activeTab === 'student'
                                ? 'bg-[#4AA59B] text-white shadow-md'
                                : 'text-gray-600 hover:text-[#4AA59B]'
                                }`}
                        >
                            <GraduationCap size={20} />
                            <span>For Students</span>
                        </button>
                        <button
                            onClick={() => {
                                setActiveTab('teacher');
                                setOpenIndex(0);
                            }}
                            className={`flex items-center gap-2 px-6 py-3 rounded-xl font-bold transition-all duration-300 ${activeTab === 'teacher'
                                ? 'bg-[#4AA59B] text-white shadow-md'
                                : 'text-gray-600 hover:text-[#4AA59B]'
                                }`}
                        >
                            <Users size={20} />
                            <span>For Teachers</span>
                        </button>
                    </div>
                </div>

                {/* Search (Decorative) */}
                <div className="relative mb-12">
                    <input
                        type="text"
                        placeholder={`Search ${activeTab === 'teacher' ? 'teacher' : 'student'} FAQs...`}
                        className="w-full pl-12 pr-4 py-4 rounded-2xl border border-gray-200 shadow-sm focus:border-[#4AA59B] focus:ring-4 focus:ring-[#4AA59B]/10 outline-none transition-all"
                    />
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                </div>

                {/* FAQ List */}
                <div className="space-y-4">
                    {faqs.map((faq, index) => (
                        <div
                            key={index}
                            className={`bg-white rounded-2xl border transition-all duration-300 overflow-hidden
                                ${openIndex === index ? 'border-[#4AA59B] shadow-lg ring-4 ring-[#4AA59B]/5' : 'border-gray-100 shadow-sm hover:border-[#4AA59B]/30'}
                            `}
                        >
                            <button
                                onClick={() => setOpenIndex(index === openIndex ? -1 : index)}
                                className="w-full px-6 py-5 flex items-center justify-between text-left focus:outline-none"
                            >
                                <span className={`font-bold text-lg ${openIndex === index ? 'text-[#0F4C4A]' : 'text-gray-700'}`}>
                                    {faq.question}
                                </span>
                                {openIndex === index ? (
                                    <ChevronUp className="w-5 h-5 text-[#4AA59B] flex-shrink-0 ml-4" />
                                ) : (
                                    <ChevronDown className="w-5 h-5 text-gray-400 flex-shrink-0 ml-4" />
                                )}
                            </button>
                            <div
                                className={`px-6 transition-all duration-300 ease-in-out overflow-hidden
                                    ${openIndex === index ? 'max-h-96 opacity-100 pb-6' : 'max-h-0 opacity-0'}
                                `}
                            >
                                <p className="text-gray-600 leading-relaxed">
                                    {faq.answer}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>

            </div>
        </div>
    );
};

export default FAQ;
