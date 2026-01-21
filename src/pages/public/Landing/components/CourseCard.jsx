import React from 'react';

const CourseCard = ({ title, students, level }) => (
    <div className="flex flex-col bg-white border border-transparent shadow-lg rounded-xl p-5 w-full group transition-all hover:shadow-2xl">
        <div className="relative overflow-hidden rounded-lg mb-4 h-40">
            <img src="/image/Gradient2.png" alt="Card" className="w-full h-full object-cover group-hover:scale-110 transition-transform" />
            <span className="absolute top-3 right-3 bg-white/90 px-2 py-px rounded-md text-[10px] font-bold text-[#0F4C4A]">{level}</span>
        </div>
        <span className="text-[#0F172B] font-bold mb-2 text-center text-lg">{title}</span>
        <p className="text-[#45556C] text-xs text-center mb-6">Learn from experts and advance your career today.</p>
        <div className="flex justify-between w-full mt-auto text-[11px] text-gray-500 mb-4 font-medium">
            <span>👥 {students} Students</span>
            <span>⭐ 4.8</span>
        </div>
        <button className="bg-[#0F4C4A] text-white w-full py-2.5 rounded-lg hover:bg-[#0D3B36] transition-all font-bold">
            Details
        </button>
    </div>
);

export default CourseCard;
