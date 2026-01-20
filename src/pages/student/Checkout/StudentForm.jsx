import { User, Mail, Phone, Globe } from "lucide-react";

export default function StudentForm() {
  const inputStyle = "w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-[#1a6b66] focus:ring-1 focus:ring-[#1a6b66] text-sm transition-all bg-gray-50/50 focus:bg-white";
  const labelStyle = "block text-[#093332] text-xs font-bold mb-2 uppercase tracking-wide";

  return (
    <div className="bg-white border border-borderGray rounded-2xl p-6 sm:p-8 shadow-sm">
      <div className="mb-8">
        <h3 className="text-[#093332] text-lg font-bold">Student Information</h3>
        <p className="text-gray-400 text-xs mt-1">Please provide your details to complete the enrollment.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
    
        <div className="md:col-span-2">
          <label className={labelStyle}>Full Name *</label>
          <div className="relative">
            <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input type="text" placeholder="John Doe" className={inputStyle} />
          </div>
        </div>

        <div>
          <label className={labelStyle}>Email Address *</label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input type="email" placeholder="john@example.com" className={inputStyle} />
          </div>
        </div>

        <div>
          <label className={labelStyle}>Phone Number *</label>
          <div className="relative">
            <Phone className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input type="tel" placeholder="+1 (555) 000-0000" className={inputStyle} />
          </div>
        </div>

        {/* الدولة */}
        <div className="md:col-span-2">
          <label className={labelStyle}>Country / Region</label>
          <div className="relative">
            <Globe className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
            <select className={`${inputStyle} appearance-none`}>
              <option>Egypt</option>
              <option>Saudi Arabia</option>
              <option>United Arab Emirates</option>
              <option>United States</option>
            </select>
          </div>
        </div>
      </div>
      
      <p className="text-[10px] text-gray-400 mt-6 flex items-center gap-1">
        <span className="text-red-500">*</span> Required fields. Your information is secure and only used for course enrollment.
      </p>
    </div>
  );
}
