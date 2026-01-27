import React, { useEffect, useState } from 'react';
import { FiSearch } from "react-icons/fi";
import { IoNotificationsOutline } from "react-icons/io5";
import Avatar from '../Avatar';


export default function PageHeader({pageName, input, onChange, placeholder,admin}) {
    
return (
    <>
        <div className="flex items-center justify-between md:hidden">
            <img src="/Heading1.png" alt="Admin NEXA" className="w-28" />
            <div className="flex items-center gap-2 px-3 py-2">
                <button className="relative p-2 rounded-full bg-gray-100 hover:bg-gray-200">
                <IoNotificationsOutline size={24} className="text-[#176D69]" />
                </button>
            <div className="w-10 h-10">
                <Avatar src={admin?.imageUrl} name={admin?.fullName} size={40} />
            </div>
        </div>
        </div>
        <div className= "px-2 py-4 md:px-4 rounded-2xl shadow-md  min-h-[40px] flex-col items-between bg-[#176D69]">
        <div className="flex justify-between items-center w-full">
            <h2 className='font-bold text-white text-lg md:text-2xl'> {pageName} </h2>
        <div className="relative w-[60%] md:w-[50%] mx-auto">
        {!input && (
        <div className="pointer-events-none absolute w-full left-3 top-1/2 flex -translate-y-1/2 items-center gap-2 text-gray-400">
        <FiSearch size={18} />
        <span className="text-sm">{placeholder}</span>
        </div>
        )}
        <input
        type="search"
        dir="rtl"
        value={input}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-3xl border border-gray-300 bg-white py-3 pr-10 pl-4 text-sm
                focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"/>
        </div>
        <button className="hidden md:block p-2 rounded-full bg-gray-100 hover:bg-gray-200 me-2">
        <IoNotificationsOutline size={30} className="text-gray-600 text-[#176D69]" />   
        </button>
        <div className="hidden md:block w-12 h-12 me-4">
        <Avatar 
        src={admin?.imageUrl}  
        name={admin?.fullName}  
        size={45}/>
        </div>
        </div>    
        </div>
        </>
    );
}
