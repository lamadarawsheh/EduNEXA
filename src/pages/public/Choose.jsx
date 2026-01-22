import React from 'react';
import { useNavigate } from 'react-router-dom';

const Choose = () => {
    const navigate = useNavigate();

    return (
        <div className="flex flex-col items-center justify-center min-h-screen p-8 text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 tracking-tight">Welcome to EduNEXA</h1>
            <p className="text-xl text-white/60 mb-12 max-w-md italic">
                Shape your future or empower others. Please select your role to continue.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-4xl">
                <RoleCard
                    title="Student"
                    desc="Join courses and grow your skills"
                    onClick={() => navigate('/landing')}
                />
                <RoleCard
                    title="Teacher"
                    desc="Share knowledge and earn balance"
                    onClick={() => navigate('/teacher')}
                />
                <RoleCard
                    title="Admin"
                    desc="Manage users and system platforms"
                    onClick={() => navigate('/admin')}
                />
            </div>
        </div>
    );
};

const RoleCard = ({ title, desc, onClick }) => (
    <button
        onClick={onClick}
        className="group p-8 text-left bg-white/5 border border-white/10 rounded-2xl hover:bg-accent hover:border-accent transition-all duration-300"
    >
        <h3 className="text-2xl font-semibold mb-2 group-hover:text-white">{title}</h3>
        <p className="text-white/50 group-hover:text-white/80">{desc}</p>
    </button>
);

export default Choose;
