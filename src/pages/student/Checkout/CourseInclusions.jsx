export default function CourseInclusions() {
  const inclusions = [
    "Lifetime access to course materials",
    "Certificate of completion",
    "Access to student community",
    "30-day money-back guarantee",
  ];

  return (
    <div className="w-full bg-[#fcfcfc] rounded-xl p-5 sm:p-8 border border-borderGray h-fit font-sans mt-6 transition-all duration-300">
      <h3 className="text-[#1a4d4a] text-[16px] sm:text-[18px] font-bold mb-6">
        What's Included:
      </h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-5 gap-x-8 lg:gap-x-16">
        {inclusions.map((item, index) => (
          <div 
            key={index} 
            className="flex items-start sm:items-center gap-3 group"
          >
            <div className="w-1.5 h-1.5 rounded-full bg-[#1a6b66] shrink-0 mt-2 sm:mt-0" />
            
            <span className="text-gray-500 text-[13px] sm:text-[14px] font-medium leading-relaxed group-hover:text-[#1a4d4a] transition-colors duration-200">
              {item}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}