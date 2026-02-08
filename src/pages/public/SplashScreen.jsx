import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const SplashScreen = () => {
    const [isVisible, setIsVisible] = useState(false);
    const navigate = useNavigate();
    const brandName = "EduNEXA";
    const tagline = "Shaping the Future of Digital Learning";

    useEffect(() => {
        setIsVisible(true);

        // Auto-transition to 'choose' page
        const timer = setTimeout(() => {
            navigate("/choose");
        }, 4500);

        return () => clearTimeout(timer);
    }, [navigate]);

    // Generate floating particles
    const particles = Array.from({ length: 20 }, (_, i) => ({
        id: i,
        left: Math.random() * 100,
        delay: Math.random() * 5,
        duration: 6 + Math.random() * 4,
        size: 2 + Math.random() * 4,
    }));

    return (
        <div className="relative min-h-screen w-full overflow-hidden splash-gradient flex items-center justify-center text-white">
            {/* Animated background glow orbs */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div
                    className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-accent/20 animate-glow-pulse"
                    style={{ filter: "blur(80px)" }}
                />
                <div
                    className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full bg-primary/30 animate-glow-pulse"
                    style={{ filter: "blur(60px)", animationDelay: "1.5s" }}
                />
                <div
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-accent/10 animate-glow-pulse"
                    style={{ filter: "blur(100px)", animationDelay: "0.75s" }}
                />
            </div>

            {/* Floating particles */}
            {particles.map((particle) => (
                <div
                    key={particle.id}
                    className="absolute rounded-full bg-white/40 float-particle"
                    style={{
                        left: `${particle.left}%`,
                        bottom: "-10px",
                        width: `${particle.size}px`,
                        height: `${particle.size}px`,
                        "--duration": `${particle.duration}s`,
                        "--delay": `${particle.delay}s`,
                    }}
                />
            ))}

            {/* Main content */}
            <div className="relative z-10 text-center px-4">


                {/* Brand name with letter animation */}
                <h1 className="text-6xl md:text-8xl lg:text-9xl font-light tracking-tight mb-6 [perspective:1000px]">
                    {brandName.split("").map((letter, index) => (
                        <span
                            key={index}
                            className={`inline-block text-glow ${isVisible ? "animate-letter-reveal" : "opacity-0"
                                }`}
                            style={{
                                animationDelay: `${index * 0.1}s`,
                            }}
                        >
                            {letter === " " ? "\u00A0" : letter}
                        </span>
                    ))}
                </h1>

                {/* Decorative line */}
                <div className="flex justify-center mb-8">
                    <div
                        className={`h-[1px] bg-gradient-to-r from-transparent via-white/50 to-transparent ${isVisible ? "animate-line-grow" : "scale-x-0"
                            }`}
                        style={{
                            width: "200px",
                            animationDelay: "0.8s",
                            transformOrigin: "center"
                        }}
                    />
                </div>

                {/* Tagline */}
                <p
                    className={`text-xl md:text-2xl lg:text-3xl font-light italic tracking-wide text-white/70 ${isVisible ? "animate-fade-up" : "opacity-0"
                        }`}
                    style={{ animationDelay: "1s" }}
                >
                    {tagline}
                </p>

                {/* Shimmer effect overlay on tagline */}
                <div
                    className={`mt-8 flex justify-center ${isVisible ? "animate-fade-up" : "opacity-0"}`}
                    style={{ animationDelay: "1.5s" }}
                >
                    <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-accent animate-pulse" />
                        <span className="text-sm text-white/50 tracking-widest uppercase">
                            Coming Nexa
                        </span>
                        <div className="flex gap-1">
                            {[0, 1, 2].map((i) => (
                                <div
                                    key={i}
                                    className="w-1.5 h-1.5 rounded-full bg-white/50 animate-pulse"
                                    style={{ animationDelay: `${i * 0.2}s` }}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Bottom gradient fade */}
            <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black/20 to-transparent pointer-events-none" />

            {/* Corner decorations */}
            <div className="absolute top-8 left-8 w-16 h-16 border-l border-t border-white/20" />
            <div className="absolute top-8 right-8 w-16 h-16 border-r border-t border-white/20" />
            <div className="absolute bottom-8 left-8 w-16 h-16 border-l border-b border-white/20" />
            <div className="absolute bottom-8 right-8 w-16 h-16 border-r border-b border-white/20" />
        </div>
    );
};

export default SplashScreen;
