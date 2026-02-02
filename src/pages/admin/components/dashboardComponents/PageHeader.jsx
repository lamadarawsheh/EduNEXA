import React, { useEffect, useState } from 'react';
import { FiSearch } from "react-icons/fi";
import { IoNotificationsOutline } from "react-icons/io5";
import Avatar from '../Avatar';
import MobileAdminMenu from '../../../../layouts/MobileAdminMenu';
import UnderDevelopmentPopup from '../../../../components/common/UnderDevelopmentPopup';


export default function PageHeader({ pageName, input, onChange, placeholder, admin, isSearch }) {
    const [openPopup, setOpenPopup] = useState(false);

    return (
        <>
            <UnderDevelopmentPopup
                isOpen={openPopup}
                onClose={() => setOpenPopup(false)}
            />
            <div className="flex items-center justify-between md:hidden p-4">
                <img src="/Heading1.png" alt="Admin NEXA" className="w-28" />
                <div className="flex items-center gap-3 relative">
                    <button
                        className="relative p-2 rounded-full bg-gray-100 hover:bg-gray-200"
                        onClick={() => setOpenPopup(true)}
                    >
                        <IoNotificationsOutline size={22} className="text-[#176D69]" />
                    </button>
                    <Avatar src={admin?.imageUrl} name={admin?.fullName} size={36} />
                    <MobileAdminMenu />
                </div>
            </div>

            <div className="mx-2 mb-6 p-4 md:p-6 rounded-2xl shadow-xl bg-[#176D69] text-white">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <h2 className='font-bold text-xl md:text-2xl tracking-tight'> {pageName} </h2>

                    <div className={`relative w-full md:w-1/2 lg:w-1/3 ${isSearch}`}>
                        <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none text-gray-400">
                            <FiSearch size={18} />
                        </div>
                        <input
                            type="search"
                            value={input}
                            onChange={(e) => onChange(e.target.value)}
                            placeholder={placeholder}
                            className="w-full rounded-full border-none bg-white py-2.5 pl-10 pr-4 text-sm text-gray-800 shadow-inner
                        focus:outline-none focus:ring-2 focus:ring-white/20 transition-all placeholder:text-gray-400"/>
                    </div>

                    <div className="hidden md:flex items-center gap-4">
                        <button className="p-2.5 rounded-full bg-white/10 hover:bg-white/20 transition-colors" onClick={() => setOpenPopup(true)}>
                            <IoNotificationsOutline size={24} className="text-white" />
                        </button>
                        <div className="h-8 w-[1px] bg-white/20 mx-1"></div>
                        <Avatar
                            src={admin?.imageUrl}
                            name={admin?.fullName}
                            size={42} />
                    </div>
                </div>
            </div>
        </>
    );
}
