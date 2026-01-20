import { useState } from "react";
import { User, Mail, Phone, AlertCircle, CheckCircle2 } from "lucide-react";

export default function StudentForm() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
  });

  const [errors, setErrors] = useState({});

  const validateField = (name, value) => {
    let error = "";
    if (!value.trim()) {
      error = "This field is required";
    } else {
      if (name === "email" && !/\S+@\S+\.\S+/.test(value)) {
        error = "Please enter a valid email address";
      }
      if (name === "phone" && !/^\+?[0-9]{10,14}$/.test(value.replace(/\s/g, ""))) {
        error = "Please enter a valid phone number";
      }
      if (name === "fullName" && value.trim().length < 3) {
        error = "Name must be at least 3 characters";
      }
    }
    return error;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    const error = validateField(name, value);
    setErrors((prev) => ({ ...prev, [name]: error }));
  };

  const inputBaseStyle = "w-[793px] h-[36px] pl-10 pr-10 py-1 border rounded-lg focus:outline-none text-sm transition-all";
  const labelStyle = "w-[120px] h-[7px]  block text-[#093332] text-sm mb-4";

  return (
    <div className="w-[843px] h-[384px] bg-white border border-borderGray rounded-2xl p-6 sm:p-8 ">
      <div className=" w-[841px] h-[90px]">
        <h3 className="text-[#093332] text-xl  font-inter">Student Information</h3>
        <p className="text-gray-400 text-sm mt-1">Please provide your details to complete the enrollment</p>
      </div>

      <div className="w-[841px] h-[292px] flex flex-col gap-6">
        
        {/* Full Name */}
        <div className="w-[793px] h-[48px]">
          <label className={labelStyle}>Full Name *</label>
          <div className="relative">
            <User className={`absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 ${errors.fullName ? 'text-red-400' : 'text-gray-400'}`} />
            <input 
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              onBlur={handleBlur}
              className={`${inputBaseStyle} ${errors.fullName ? 'border-red-500 bg-red-50/30' : 'border-borderGray focus:border-prime'}`}
         
            />
            {formData.fullName && !errors.fullName && (
              <CheckCircle2 className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-prime" />
            )}
          </div>
          {errors.fullName && <p className="text-red-500 text-xs mt-1 flex items-center gap-1"><AlertCircle className="w-3 h-3" /> {errors.fullName}</p>}
        </div>

        {/* Email Address */}
        <div className="w-[793px] h-[48px]">
          <label className={labelStyle}>Email Address *</label>
          <div className="relative">
            <Mail className={`absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 ${errors.email ? 'text-red-400' : 'text-gray-400'}`} />
            <input 
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              onBlur={handleBlur}
              className={`${inputBaseStyle} ${errors.email ? 'border-red-500 bg-red-50/30' : 'border-borderGray focus:border-prime'}`}
            
            />
            {formData.email && !errors.email && (
              <CheckCircle2 className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-prime" />
            )}
          </div>
          {errors.email && <p className="text-red-500 text-xs mt-1 flex items-center gap-1"><AlertCircle className="w-3 h-3" /> {errors.email}</p>}
        </div>

        {/* Phone Number */}
        <div className="w-[793px] h-[48px]">
          <label className={labelStyle}>Phone Number *</label>
          <div className="relative">
            <Phone className={`absolute  left-3 top-1/2 -translate-y-1/2 w-5 h-5 ${errors.phone ? 'text-red-400' : 'text-gray-400'}`} />
            <input 
              name="phone"
              type="tel"
              value={formData.phone}
              onChange={handleChange}
              onBlur={handleBlur}
              className={`${inputBaseStyle} ${errors.phone ? 'border-red-500 bg-red-50/30' : 'border-borderGray focus:border-prime'}`}
            
            />
            {formData.phone && !errors.phone && (
              <CheckCircle2 className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-prime " />
            )}
          </div>
          {errors.phone && <p className="text-red-500 text-xs mt-1 flex items-center gap-1"><AlertCircle className="w-3 h-3" /> {errors.phone}</p>}
        </div>

     
      <div className="w-[793px] h-[16px]">
      <p className=" text-xs text-gray-400 mt-1">
        * Required fields. Your information is secure and will only be used for course enrollment.
      </p>
      </div>
       </div>
    </div>
  );
}