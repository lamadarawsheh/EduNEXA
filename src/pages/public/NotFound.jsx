import React from 'react';
import { useNavigate } from 'react-router-dom';

const NotFound = () => {
    const navigate = useNavigate();

    return (
        <div className="relative min-h-screen w-full overflow-hidden splash-gradient flex items-center justify-center text-white text-center px-4">
            {/* Background decorative elements (similar to splash) */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div
                    className="absolute top-1/4 right-1/4 w-96 h-96 rounded-full bg-white/5 animate-glow-pulse"
                    style={{ filter: "blur(80px)" }}
                />
                <div
                    className="absolute bottom-1/4 left-1/4 w-80 h-80 rounded-full bg-accent/10 animate-glow-pulse"
                    style={{ filter: "blur(60px)", animationDelay: "1.5s" }}
                />
            </div>

            <div className="relative z-10">
                <h1 className="text-[10rem] md:text-[15rem] font-bold leading-none opacity-10 select-none">
                    404
                </h1>

                <div className="mt-[-4rem] md:mt-[-6rem]">
                    <h2 className="text-3xl md:text-5xl font-light mb-4 tracking-tight">
                        LOST IN SPACE
                    </h2>
                    <p className="text-white/60 text-lg md:text-xl mb-12 max-w-md mx-auto italic">
                        The page you are looking for has drifted into another dimension.
                    </p>

                    <button
                        onClick={() => navigate('/choose')}
                        className="px-8 py-4 bg-white text-slate-900 font-semibold rounded-full hover:bg-opacity-90 transition-all transform hover:scale-105 active:scale-95 shadow-xl"
                    >
                        Return to Safety
                    </button>
                </div>
            </div>

            {/* Corner decorations */}
            <div className="absolute top-8 left-8 w-16 h-16 border-l border-t border-white/20" />
            <div className="absolute top-8 right-8 w-16 h-16 border-r border-t border-white/20" />
            <div className="absolute bottom-8 left-8 w-16 h-16 border-l border-b border-white/20" />
            <div className="absolute bottom-8 right-8 w-16 h-16 border-r border-b border-white/20" />
        </div>
    );
};

export default NotFound;
