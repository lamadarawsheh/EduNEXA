import React from 'react';
import { useNavigate } from 'react-router-dom';

const Choose = () => {
    const navigate = useNavigate();

    return (
        <div className="flex flex-col items-center justify-center min-h-screen p-8 text-center bg-gradient-to-r from-[#FCFFFE] via-[#F9FEFD] to-[#F5FDFC] text-black">
            <img src="/image2.png" alt="EduNEXA Illustration" className="w-80 h-80 md:w-[28rem] md:h-[23rem] mb-4 object-contain mix-blend-multiply transition-transform duration-700 hover:scale-105" />
            <h1 className="text-4xl md:text-5xl font-bold mb-4 tracking-tight text-[#0F172B]">Welcome to EduNEXA</h1>
            <p className="text-xl text-gray-600 mb-12 max-w-md italic">
                Shape your future or empower others. Please select your role to continue.
            </p>

            <div className="flex flex-col md:flex-row gap-6 w-full max-w-5xl justify-center">
                <RoleCard
                    title="Student"
                    onClick={() => navigate('/landing')}
                />
                <RoleCard
                    title="Instructor"
                    onClick={() => navigate('/teacher-landing')}
                />
                <RoleCard
                    title="Admin"
                    onClick={() => navigate('/admin')}
                />
            </div>
        </div>
    );
};

const RoleCard = ({ title, onClick }) => (
    <button
        onClick={onClick}
        className="group py-2 px-14 text-center bg-[#0F4C4A] border border-transparent rounded-lg hover:bg-[#0D3B36] hover:scale-105 transition-all duration-300 shadow-md min-w-[160px]"
    >
        <h3 className="text-base font-bold text-white">{title}</h3>
    </button>
);

export default Choose;
