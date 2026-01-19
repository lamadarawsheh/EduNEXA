import { ShieldCheck, Lock, Award, CheckCircle } from "lucide-react";

export default function TrustSignals() {
  const signals = [
    { icon: <ShieldCheck className="w-5 h-5 sm:w-6 sm:h-6" />, text: "Secure Payment" },
    { icon: <Lock className="w-5 h-5 sm:w-6 sm:h-6" />, text: "SSL Encrypted" },
    { icon: <Award className="w-5 h-5 sm:w-6 sm:h-6" />, text: "Money-back Guarantee" },
    { icon: <CheckCircle className="w-5 h-5 sm:w-6 sm:h-6" />, text: "Verified Courses" },
  ];

  return (
    <div className="w-full bg-[#fcfcfc] border border-borderGray rounded-xl p-4 sm:p-6 lg:p-8 mt-6 lg:mt-10 transition-all">
      <div className="max-w-5xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
          {signals.map((item, index) => (
            <div key={index} className="flex flex-col items-center gap-2 sm:gap-3 group">
             
              <div className="w-10 h-10 sm:w-12 sm:h-12 lg:w-14 lg:h-14 rounded-full bg-[#eef5f4] flex items-center justify-center text-[#1a6b66] group-hover:bg-[#1a6b66] group-hover:text-white transition-all duration-300 shadow-sm group-hover:shadow-md">
                {item.icon}
              </div>
              <span className="text-[#1a4d4a] text-[11px] sm:text-[12px] lg:text-[13px] font-bold text-center leading-tight">
                {item.text}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}