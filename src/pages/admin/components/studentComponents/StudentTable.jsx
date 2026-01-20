import React from 'react'
import StudentRecord from './StudentRecord'
import { FiEdit, FiFilter, FiPrinter, FiTrash, FiArrowUp } from 'react-icons/fi'

export default function StudentTable({ students }) {
    return (
        <>
            <div className="my-6 flex justify-between">
                <div className='flex gap-2'>
                    <button className="flex items-center gap-1 bg-white text-black px-4 py-1 text-xs rounded-xl hover:bg-[#145A58] transition-colors">
                        <FiFilter /> Filter
                    </button>
                    <button className="flex items-center gap-1 bg-white text-black px-4 py-1 text-xs rounded-xl hover:bg-[#145A58] transition-colors">
                        <FiArrowUp />    Sort
                    </button>
                </div>
                <div className="flex items-center gap-2 justify-end">
                    <button className=" rounded-xl  py-1 px-1 text-sm bg-gray-100 hover:bg-gray-200">
                        <FiPrinter />
                    </button>
                    <button className=" rounded-xl  py-1 px-1 text-sm bg-gray-100 hover:bg-red-100">
                        <FiTrash />
                    </button>
                    <button className=" rounded-xl  py-1 px-1 text-sm  hover:bg-gray-200">
                        <FiEdit />
                    </button>
                </div>
            </div>
            <div className="bg-white rounded-3xl shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                        <thead className="bg-gray-50 text-[#093332]">
                            <tr>
                                <th className="text-left text-sm md:text-xl font-semibold p-2 md:p-4">
                                    <div className="flex items-center gap-3">

                                        <span>Student Name</span>
                                    </div>
                                </th>
                                <th className="text-left font-semibold p-2 md:p-4">Email</th>
                                <th className="text-left font-semibold p-2 md:p-4">Phone</th>
                                <th className="text-right font-semibold p-2 md:p-4">
                                    Date of birth
                                </th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            {students.map((student) => (
                                <StudentRecord
                                    key={student.id}
                                    student={student}
                                />))}

                        </tbody>
                    </table>
                </div>
            </div>
        </>
    )
}
