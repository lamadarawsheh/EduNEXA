import React, { useState } from 'react'
import Record from './Record'
import { FiEdit, FiTrash, FiArrowUp, FiArrowDown } from 'react-icons/fi'
import UnderDevelopmentPopup from '../../../../components/common/UnderDevelopmentPopup';
import RecordMobile from './RecordMobile';

export default function Table({ records, columns, noOfCourses,pageName , sortBy, onSortChange, filters, onFiltersChange, isFilter, sortKey}) {
        const handleSortByName = () => {
            if (!onSortChange) return;
            onSortChange((prev) => {
            if (!prev || prev.key !== sortKey) return { key: sortKey, direction: "asc" };
            return { key: sortKey, direction: prev.direction === "asc" ? "desc" : "asc" };
            });
            };
        const [openPopup, setOpenPopup] = useState(false); 
    return (
        <>
            <div className="my-6 flex justify-between">
                <div className='flex gap-2'>
                    <button className="flex items-center gap-1 bg-white text-black px-4 py-1 text-xs rounded-xl hover:bg-[#145A58] transition-colors"
                        onClick={handleSortByName}
                    >
                        {sortBy?.direction === "desc" ? <FiArrowDown /> : <FiArrowUp />}   Sort
                    </button>
                </div>
                <div className="flex items-center gap-2 justify-end">
                    <button 
                    onClick={() => setOpenPopup(true)}
                    className=" rounded-xl  py-1 px-1 text-sm bg-gray-100 hover:bg-red-100">
                        <FiTrash />
                    </button>
                    <button
                    onClick={() => setOpenPopup(true)}
                    className=" rounded-xl  py-1 px-1 text-sm  hover:bg-gray-200">
                        <FiEdit /> 
                    </button>
                </div>
            </div>
            
            <div className="bg-white rounded-3xl shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                        <thead className="bg-gray-50 text-[#093332] hidden md:table-header-group">
                            <tr>
                                <th className="text-left text-sm md:text-xl font-semibold p-2 md:p-4">
                                    <div className="flex items-center gap-3">
                                    {columns[0]}
                                    </div>
                                </th>
                                <th className="text-left font-semibold p-2 md:p-4">                 
                                    { columns[1]}
                                </th>
                                <th className="text-left font-semibold pe-2 md:p-4">             
                                    {columns[2]}
                                </th>
                                <th className="text-left font-semibold p-2 md:p-4">
                                    {columns[3]}
                                </th>
                                <th className="text-left font-semibold p-2 md:p-4"> {noOfCourses}  </th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            {records.map((record) => (
                                <Record key={record.id} record={record} pageName={pageName} />))}

                            {records.length === 0 && (
                                <tr>
                                <td colSpan="100%" className="text-center py-4 text-gray-500">
                                No Records To Display
                                </td>
                                </tr>
                                )}                        
                        </tbody>
                    </table>
                </div>
            </div>
        <UnderDevelopmentPopup
        isOpen={openPopup}
        onClose={() => setOpenPopup(false)}
        />

         <div className="md:hidden p-3 space-y-3">
    {records.map((record) => (
      <RecordMobile key={record.id} record={record} pageName={pageName} />
    ))}

    {records.length === 0 && (
      <div className="text-center py-6 text-gray-500">No Records To Display</div>
    )}
  </div>
        </>
    )
}
