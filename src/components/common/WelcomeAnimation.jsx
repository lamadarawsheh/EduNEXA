import React, { useEffect, useState } from 'react';
import { Check, Sparkles } from 'lucide-react';

const WelcomeAnimation = ({ username, role, onComplete }) => {
    const [step, setStep] = useState(0);

    useEffect(() => {
        // Sequence of animations
        const t1 = setTimeout(() => setStep(1), 300); // Show circle
        const t2 = setTimeout(() => setStep(2), 1000); // Show name
        const t3 = setTimeout(() => setStep(3), 2000); // Show helping text
        const t4 = setTimeout(() => onComplete?.(), 3500); // Finish

        return () => {
            clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); clearTimeout(t4);
        };
    }, [onComplete]);

    return (
        <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#4AA59B] text-white transition-all duration-500">
            {/* Background particles/decorations could go here */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-20">
                <div className="absolute top-10 left-10 w-32 h-32 bg-white rounded-full blur-3xl animate-pulse"></div>
                <div className="absolute bottom-10 right-10 w-48 h-48 bg-[#0F4C4A] rounded-full blur-3xl animate-pulse delay-700"></div>
            </div>

            <div className="relative z-10 flex flex-col items-center text-center p-6">

                {/* Step 1: Icon Pop */}
                <div className={`transition-all duration-700 transform ${step >= 1 ? 'scale-100 opacity-100' : 'scale-0 opacity-0'}`}>
                    <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center shadow-2xl mb-8 animate-bounce-short">
                        <Check className="w-12 h-12 text-[#4AA59B] stroke-[3px]" />
                    </div>
                </div>

                {/* Step 2: Welcome Text */}
                <div className={`transition-all duration-700 delay-100 transform ${step >= 2 ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
                    <h1 className="text-4xl md:text-5xl font-bold mb-2 tracking-tight">
                        Welcome, {username}!
                    </h1>
                </div>

                {/* Step 3: Role/Redirect Text */}
                <div className={`transition-all duration-700 delay-200 transform ${step >= 3 ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
                    <p className="text-xl text-white/90 flex items-center justify-center gap-2">
                        <Sparkles className="w-5 h-5" />
                        <span>Setting up your {role} profile...</span>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default WelcomeAnimation;
