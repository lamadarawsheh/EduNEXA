import React, { useState } from 'react';
import { FiSearch } from "react-icons/fi";
import { IoNotificationsOutline } from "react-icons/io5";
import { FaUserGraduate } from "react-icons/fa";
import { GiTeacher } from "react-icons/gi";
import { BsBookFill } from "react-icons/bs";
import { MdOutlinePendingActions } from "react-icons/md";
import { BsThreeDotsVertical } from "react-icons/bs";
import { MdArrowOutward } from "react-icons/md";
import Avatar from './Avatar';
import MobileAdminMenu from "../../../layouts/MobileAdminMenu"
import UnderDevelopmentPopup from '../../../components/common/UnderDevelopmentPopup';
const items = [
  { title: "Students", field: "studentsCount", bgColor: "#D8DDE9", icon: FaUserGraduate },
  { title: "Teachers", field: "instructorsCount", bgColor: "#D1DFCC", icon: GiTeacher },
  { title: "Courses", field: "totalCourses", bgColor: "#EFF3A2", icon: BsBookFill },
  { title: "Pending Courses", field: "pendingCourses", bgColor: "#DBEAFE", icon: MdOutlinePendingActions },
]

export default function Header({ header, admin }) {
  const [search, setSearch] = useState("");
  const [openPopup, setOpenPopup] = useState(false);

  return (
    <>
      <UnderDevelopmentPopup
        isOpen={openPopup}
        onClose={() => setOpenPopup(false)}
      />
      <div className="p-6 bg-white rounded-2xl shadow-md  min-h-[200px] hidden lg:flex flex-col items-between bg-[url('/adminDashboardbgjpeg.jpeg')] bg-cover bg-center bg-no-repeat mb-8">
        <div className="flex justify-end w-full mb-8 ">
          <button className="relative p-2 rounded-full bg-gray-100 hover:bg-gray-200 me-2">
            <IoNotificationsOutline size={30} className="text-gray-600 text-[#176D69]" onClick={() => setOpenPopup(true)} />
          </button>
          <Avatar
            src={admin?.imageUrl}
            name={admin?.fullName}
            size={45} />
        </div>
        <div className="mt-8 flex gap-2 justify-between">
          {items.map((item, index) => {
            const Icon = item.icon;
            const value = header?.[item.field] ?? 0;
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
                  <p className="text-3xl font-bold">{Number(value)}</p>
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
            src={admin?.imageUrl}
            name={admin?.fullName}
            size={45} />
          <div className='flex items-center relative'>
            <button className="relative p-2 rounded-full bg-gray-100 hover:bg-gray-200 me-2">
              <IoNotificationsOutline size={30} className="text-gray-600 text-[#176D69]" onClick={() => setOpenPopup(true)} />
            </button>
            <MobileAdminMenu />
          </div>
        </div>
        <div className="flex justify-center w-full ">
          <img src="/favicon-removebg-preview.png" alt="Admin NEXA" className="mb-4 w-40" />
        </div>
        <div className="relative w-full px-4">
          <div className="absolute inset-y-0 left-7 flex items-center pointer-events-none text-gray-400">
            <FiSearch size={18} />
          </div>
          <input
            type="search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search Courses, Teachers, Students..."
            className="w-full rounded-full border-none bg-white/90 backdrop-blur-sm py-3 pl-12 pr-4 text-sm shadow-inner
                  focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0F4C4A]/20 transition-all placeholder:text-gray-400"/>
        </div>
      </div>
      <div className="my-4 flex flex-wrap gap-4 lg:hidden px-4">
        {items.map((item, index) => {
          const Icon = item.icon;
          const value = header?.[item.field] ?? 0;
          return (
            <div
              key={index}
              className="w-full sm:w-[47%] md:w-[48%] rounded-2xl p-5 flex flex-col justify-between min-h-[140px] shadow-sm hover:shadow-md transition-shadow duration-300"
              style={{ backgroundColor: item.bgColor }}>
              <div className="flex justify-between items-center mb-4">
                <h4 className="flex gap-2 items-center text-gray-800">
                  <Icon className="text-lg opacity-80" />
                  <span className="font-bold text-sm">{item.title}</span>
                </h4>
                <BsThreeDotsVertical className="text-gray-500 opacity-50" />
              </div>
              <div className="flex justify-between items-end">
                <div>
                  <p className="text-3xl font-black text-gray-900 tracking-tight">{Number(value)}</p>
                  <p className="text-[10px] font-bold text-gray-500 uppercase mt-1">Total {item.title}</p>
                </div>
                <div className="bg-white/50 p-2.5 rounded-xl text-green-600 shadow-sm border border-white/20">
                  <MdArrowOutward size={18} />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}
