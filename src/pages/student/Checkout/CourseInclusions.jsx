import { Check } from "lucide-react"; // أيقونة بسيطة للنقاط

export default function CourseInclusions() {
  const inclusions = [
    "Lifetime access to course materials",
    "Certificate of completion",
    "Access to student community",
    "30-day money-back guarantee",
  ];

  return (
    <div className="bg-[#fcfcfc] rounded-xl p-8 border border-borderGray w-full max-w-[900px] h-fit font-sans mt-6">
      {/* العنوان العلوي */}
      <h3 className="text-[#1a4d4a] text-[18px] font-bold mb-6">
        What's Included:
      </h3>

      {/* شبكة العناصر - مقسمة لعمودين */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-12">
        {inclusions.map((item, index) => (
          <div key={index} className="flex items-center gap-3">
       
            <div className="w-1.5 h-1.5 rounded-full bg-[#1a6b66] shrink-0" />
            
           
            <span className="text-gray-500 text-[14px] font-medium leading-relaxed">
              {item}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}