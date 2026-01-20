import courseImage from './images/Frame (3).png';
import profileicon from './Icons/profile.svg'
import clockicon from './Icons/clock.svg'
import staricon from './Icons/star.svg'

export default function CourseCard() {
  return (
    <div className="bg-white w-[843px] h-[688px] border border-borderGray rounded-2xl overflow-hidden transition-all duration-300 group  mx-auto lg:mx-0">
      
      <div className="flex flex-col">
        
        <div className="w-full h-[487px] relative overflow-hidden p-6 ">
          <img 
            src={courseImage} 
            alt="Course Thumbnail"
            className=" w-[795px] h-[457px] object-cover "
          />
        </div>

        <div className=" w-[841px] h-[214px] p-2 ">
    
      <div className=" w-[793px] h-[88px] mb-4">
        <h2 className="w-[793px] h-[32px] px-6 mb-2 text-[#093332] text-2xl lg:text-3xl leading-tight">
          UI/UX Design Course
        </h2>
      <p className="text-[#71717A] text-sm md:text-base leading-relaxed max-w-[793px] h-[48px] px-9 ">
        This comprehensive program will equip you with the knowledge and skills to create exceptional user interfaces (UI) and enhance user experiences (UX).
      </p>
      </div>

      <div className="w-[793px] h-[20px] px-7 flex flex-wrap items-center gap-x-6 gap-y-3 mb-4">
        <div className="flex items-center gap-1.5">
          <img src= {staricon} className="w-4 h-4 text-[#FACC15]" />
          <span className="text-sm text-[#093332]">4.8</span>
        </div>

       <div className="flex items-center gap-1.5 text-gray-500">
          <img src={profileicon} className="w-4 h-4" />
         <span className="text-sm text-gray-500">12,543 students</span> 
        </div>

        <div className="flex items-center gap-1.5 text-gray-500">
           <img src={clockicon} className="w-4 h-4" />
          <span className="text-sm">42 hours</span>
        </div>

      </div>

      <div className="w-[793px] h-[26px] flex flex-wrap items-center gap-4 px-6 ">
     
        <div className="bg-[#F4F4F5] text-[#093332] px-4 py-1.5 rounded-md text-sm ">
          Beginner to Advanced
        </div>

        <div className="text-sm">
          <span className="text-[#71717A]">Instructor: </span>
          <span className="text-[#093332] cursor-pointer">
            Sarah Johnson
          </span>
        </div>

      </div>

    </div>

      </div>
      </div>
    
  );
}