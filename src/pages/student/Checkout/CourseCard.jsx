import { Star, Clock, Users, BookOpen } from "lucide-react";
import courseImage from './images/Frame (3).png';

export default function CourseCard() {
  return (
    <div className="bg-white w-full border border-borderGray rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 group  mx-auto lg:mx-0">
      
      <div className="flex flex-col">
        
        <div className="w-full h-full relative overflow-hidden px-4 py-4 ">
          <img 
            src={courseImage} 
            alt="Course Thumbnail"
            className=" w-full h-full object-cover "
          />
          
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-60" />

          <div className="absolute top-4 left-4 bg-[#1a6b66] text-white text-[11px] font-bold px-3 py-1.5 rounded-lg shadow-lg flex items-center gap-1">
            <Star className="w-3 h-3 fill-white" />
            <span className="uppercase tracking-wider">Best Seller</span>
          </div>
        </div>

        {/* تفاصيل الكورس - الآن تظهر تحت الصورة تلقائياً */}
        <div className="p-6">
          <div className="mb-4">
            <h2 className="text-[#093332] text-xl lg:text-2xl font-bold leading-tight">
              UI/UX Design Masterclass: From Beginner to Pro
            </h2>
          </div>
          
          <p className="text-gray-500 text-sm mb-6 leading-relaxed">
            Master the art of creating stunning user interfaces and seamless experiences. Learn Figma, Adobe XD, and design principles.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-yellow-50 flex items-center justify-center shrink-0">
                 <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
              </div>
              <span className="text-xs font-bold text-gray-700 leading-tight">4.8 (12,500 students)</span>
            </div>

            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center shrink-0">
                 <Clock className="w-4 h-4 text-blue-500" />
              </div>
              <span className="text-xs font-semibold text-gray-600">42 Hours content</span>
            </div>

            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-green-50 flex items-center justify-center shrink-0">
                 <Users className="w-4 h-4 text-green-600" />
              </div>
              <span className="text-xs font-semibold text-gray-600">Lifetime Access</span>
            </div>

            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-purple-50 flex items-center justify-center shrink-0">
                 <BookOpen className="w-4 h-4 text-purple-600" />
              </div>
              <span className="text-xs font-semibold text-gray-600">Certificate Included</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}