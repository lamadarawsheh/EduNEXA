import React, { useState } from 'react';
import { FiSearch } from "react-icons/fi";
import { IoNotificationsOutline } from "react-icons/io5";
import { FaUserGraduate } from "react-icons/fa";
import { GiTeacher } from "react-icons/gi";
import { BsBookFill } from "react-icons/bs";
import { FaArrowTrendUp } from "react-icons/fa6";
import { BsThreeDotsVertical } from "react-icons/bs";
import { MdArrowOutward } from "react-icons/md";
import Avatar from './Avatar';

const items = [
  { title: "Students",value:2500, bgColor: "#D8DDE9", icon: FaUserGraduate  },
  { title: "Teachers",value:300, bgColor: "#D1DFCC", icon: GiTeacher  },
  { title: "Courses", value:1500, bgColor: "#EFF3A2", icon: BsBookFill  },
  { title: "Growth", value:"+15%", bgColor: "#DBEAFE", icon: FaArrowTrendUp  },
]

const user = {
  name: "Ahmed Hassan",
  avatar: "https://i.pravatar.cc/150?img=12",
};
export default function Header() {
  const [value, setValue] = useState("");
    
return (
  <>
        <div className="p-6 bg-white rounded-2xl shadow-md  min-h-[200px] hidden lg:flex flex-col items-between bg-[url('/adminDashboardbgjpeg.jpeg')] bg-cover bg-center bg-no-repeat mb-8">
        <div className="flex justify-end w-full mb-8 ">
        <div className="relative w-[50%] mx-auto">
        {!value && (
        <div className="pointer-events-none absolute w-full left-3 top-1/2 flex -translate-y-1/2 items-center gap-2 text-gray-400">
        <FiSearch size={18} />
        <span className="text-sm">Search Courses,Teachers,Students...</span>
        </div>
        )}
        <input
        type="search"
        dir="rtl"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className="w-full rounded-3xl border border-gray-300 bg-white py-3 pr-10 pl-4 text-sm
                  focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"/>
        </div>
        <div className="flex justify-end mt-4"></div>
        <button className="relative p-2 rounded-full bg-gray-100 hover:bg-gray-200 me-2">
        <IoNotificationsOutline size={30} className="text-gray-600 text-[#176D69]" />   
        </button>
        <Avatar
        src={user?.avatar}  
        name={user?.name}  
        size={45}/>
        </div>    
        <div className="mt-8 flex gap-2 justify-between">
        {items.map((item, index) => {
        const Icon = item.icon;
        return (
        <div
        key={index}
        className="w-[25%] rounded-2xl p-4 flex flex-col justify-between min-h-[150px]"
        style={{ backgroundColor: item.bgColor }}>
        <div className="flex justify-between items-center mb-6">
        <h4 className="flex gap-2 items-center">
        <Icon />
        <span className="font-bold">{item.title}</span>
        </h4>
        <BsThreeDotsVertical className="text-gray-600" />
        </div>
        <div className="flex justify-between items-center">
        <p className="text-3xl font-bold">{item.value.toLocaleString()}</p>
        <p className="text-green-500 bg-[#F2F2F2] p-4 rounded-full">
        <MdArrowOutward />
        </p>
        </div>
        </div>
        );
        })}
        </div>
        </div>

        <div className="p-6 rounded-b-[15%] shadow-md  min-h-[90px] lg:hidden flex-col items-between justify-center mb-8 bg-[#176D69]">
        <div className="flex justify-between items-center w-full mb-4 ">
            <Avatar
        src={user?.avatar}  
        name={user?.name}  
        size={45}/>
          <button className="relative p-2 rounded-full bg-gray-100 hover:bg-gray-200 me-2">
            <IoNotificationsOutline size={30} className="text-gray-600 text-[#176D69]" />   
        </button>
        </div>    
        <div className="flex justify-center w-full ">  
              <img src="/Heading1.png" alt="Admin NEXA" className="mb-4 w-40" />                
        </div>
        <div className="relative w-[90%] mx-auto">
        {!value && (
        <div className="pointer-events-none absolute w-full left-3 top-1/2 flex -translate-y-1/2 items-center gap-2 text-gray-400">
            <FiSearch size={18} />
        <span className="text-sm">Search Courses,Teachers,Students...</span>
        </div>
        )}
        <input
        type="search"
        dir="rtl"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className="w-full rounded-3xl border border-gray-300 bg-white py-3 pr-10 pl-4 text-sm
                  focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"/>
        </div>       
        </div>
        <div className="my-4 flex flex-wrap gap-2 justify-between lg:hidden px-4">
        {items.map((item, index) => {
        const Icon = item.icon;
        return (
        <div
        key={index}
        className="w-[49%] rounded-2xl p-4 flex flex-col justify-between min-h-[150px]"
        style={{ backgroundColor: item.bgColor }}>
        <div className="flex justify-between items-center mb-6">
        <h4 className="flex gap-2 items-center">
        <Icon />
        <span className="font-bold">{item.title}</span>
        </h4>
        <BsThreeDotsVertical className="text-gray-600" />
        </div>
        <div className="flex justify-between items-center">
        <p className="text-3xl font-bold">{item.value.toLocaleString()}</p>
        <p className="text-green-500 bg-[#F2F2F2] p-4 rounded-full">
        <MdArrowOutward />
        </p>
        </div>
        </div>
        );
        })}
        </div>
        </>
    );
}