import React, { useState, useEffect, useRef } from 'react';

const MetricItem = ({ value, label }) => {
    const [count, setCount] = useState(0);
    const elementRef = useRef(null);
    const hasAnimated = useRef(false);

    // Parse value: "10K+" -> number: 10, suffix: "K+"
    const number = parseFloat(value.replace(/[^0-9.]/g, ''));
    const suffix = value.replace(/[0-9.]/g, '');
    const isDecimal = value.includes('.');

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting && !hasAnimated.current) {
                    hasAnimated.current = true;

                    let start = 0;
                    const end = number;
                    const duration = 2000; // 2 seconds
                    const startTime = performance.now();

                    const animate = (currentTime) => {
                        const elapsedTime = currentTime - startTime;
                        const progress = Math.min(elapsedTime / duration, 1);

                        // Ease out quart function for smooth slowing down
                        const easeProgress = 1 - Math.pow(1 - progress, 4);

                        const currentCount = start + (end - start) * easeProgress;

                        setCount(currentCount);

                        if (progress < 1) {
                            requestAnimationFrame(animate);
                        } else {
                            setCount(end);
                        }
                    };

                    requestAnimationFrame(animate);
                }
            },
            { threshold: 0.5 }
        );

        if (elementRef.current) {
            observer.observe(elementRef.current);
        }

        return () => observer.disconnect();
    }, [number]);

    return (
        <div ref={elementRef} className="flex flex-col items-center justify-center text-center transform hover:scale-105 transition-transform duration-300">
            <span className="text-4xl font-bold mb-2">
                {isDecimal ? count.toFixed(1) : Math.floor(count)}
                {suffix}
            </span>
            <span className="text-xs uppercase tracking-widest text-white/70 font-medium">{label}</span>
        </div>
    );
};

export default MetricItem;
