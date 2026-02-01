import React from 'react'
import Avatar from '../Avatar';

export default function Record({ record, pageName }) {
  return (
    <tr className="hover:bg-gray-50 text-xs xl:text-[14px]">
      <td className="p-2 xl:p-4 text-left ">
        <div className="flex items-center gap-3">
          <input
            type="checkbox"
            className="h-4 w-4 rounded border-gray-300" />
          <Avatar src={record.imageUrl} name={record.fullName} className="
        w-8 h-8
        sm:w-10 sm:h-10
        md:w-11 md:h-11
        lg:w-12 lg:h-12"
            size={42} />
          <span className="font-semibold text-[#093332]">{record.userName || record.fullName}</span>
        </div>
      </td>

      <td className="pe-2 md:p-4 text-left  text-gray-700">{record.email}</td>
      <td className="pe-2 md:p-4 text-left  text-gray-700">{pageName === "Students Records" ? record.phoneNumber : record.specialization}</td>
      <td className="pe-2 md:p-4 text-left  text-gray-700">{pageName === "Students Records" ? record.birthDate : record.rating}</td>
      <td className=" md:p-4 text-left md:text-center text-gray-700">{record.coursesCount}</td>
    </tr>
  );
}
