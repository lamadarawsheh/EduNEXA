import phone from "./Icons/vector (1).png"
import email from "./Icons/Frame (3).png"
import name from "./Icons/Frame (4).png"
export default function StudentForm() {
  return (
    <div className="bg-white text-black rounded-xl p-6 shadow">
      <h3 className="text-xl font-semibold mb-4">Student Information</h3>
        <p className="text-gray-500">Please provide your details to complete the enrollment</p>
    <form className="my-7">
      <div className="fullname">
      <label htmlFor="fullName" className="block text-gray-700 font-medium mb-2">
                Full Name <span className="text-red-500">*</span>
              </label>
              <div className="relative">
  <img 
    src={name} 
    alt="" 
    className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5"
  />
  <input
    type="text"
    id="fullName"
    name="fullName"
  
    className="w-full px-4 py-3 pl-10 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
  />
</div>
 
      </div>
      <div className="email-address">
      <label htmlFor="fullName" className="block text-gray-700 font-medium mb-2">
                Email Address <span className="text-red-500">*</span>
              </label>
              <div className="relative">
  <img 
    src={email} 
    alt="" 
    className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5"
  />
  <input
    type="text"
    id="fullName"
    name="fullName"
  
    className="w-full px-4 py-3 pl-10 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
  />
</div>
 
      </div>
      <div className="pnone">
      <label htmlFor="phone" className="block text-gray-700 font-medium mb-2">
                Phone Number <span className="text-red-500">*</span>
              </label>
              <div className="relative">
  <img 
    src={phone} 
    alt="" 
    className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5"
  />
  <input
    type="text"
    id="phone"
    name="phone"
  
    className="w-full px-4 py-3 pl-10 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
  />
</div>
 
      </div>
     

    </form>
    <p className="text-gray-400 text-xs">* Required fields. Your information is secure and will only be used for course enrollment.</p>
    </div>
  );
}

