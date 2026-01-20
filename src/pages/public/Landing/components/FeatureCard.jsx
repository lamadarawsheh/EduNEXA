import React from 'react';

const FeatureCard = ({ title, desc, Icon }) => (
    <div className="flex flex-col bg-white border border-transparent shadow-lg gap-3 rounded-lg p-6 w-full max-w-[240px] h-auto md:h-[220px] transition-transform hover:-translate-y-2">
        <div className="h-12 w-12 bg-[#0F4C4A]/10 flex items-center justify-center rounded-lg mb-2">
            <Icon className="w-6 h-6 text-[#0F4C4A]" />
        </div>
        <span className="text-[#0F172B] font-bold text-lg leading-tight">{title}</span>
        <p className="text-[#45556C] text-xs leading-relaxed">{desc}</p>
    </div>
);

export default FeatureCard;
