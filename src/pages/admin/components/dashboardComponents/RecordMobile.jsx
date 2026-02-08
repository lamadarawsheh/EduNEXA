import React from "react";
import Avatar from "../Avatar";

export default function RecordMobile({ record, pageName }) {
    const thirdLabel = pageName === "Students Records" ? "Phone" : "Specialization";
    const thirdValue = pageName === "Students Records" ? record.phoneNumber : record.specialization;

    const fourthLabel = pageName === "Students Records" ? "Birth Date" : "Rating";
    const fourthValue = pageName === "Students Records" ? record.birthDate : record.rating;

    return (
    <div className="rounded-2xl border border-gray-200 bg-white p-3 shadow-sm">
        <div className="flex items-center gap-3">
        <input type="checkbox" className="h-4 w-4 rounded border-gray-300" />

        <Avatar
            src={record.imageUrl}
            name={record.fullName}
            className="w-10 h-10"
            size={42}
        />

        <div className="min-w-0">
            <div className="font-semibold text-[#093332] truncate">
            {record.userName || record.fullName}
            </div>
            <div className="text-xs text-gray-500 truncate">{record.email}</div>
        </div>
        </div>

        <div className="mt-3 grid grid-cols-1 gap-2 text-sm">
        <InfoRow label={thirdLabel} value={thirdValue} />
        <InfoRow label={fourthLabel} value={fourthValue} />
        <InfoRow label="Courses" value={record.coursesCount} />
        </div>
    </div>
    );
}

function InfoRow({ label, value }) {
    return (
    <div className="flex items-start gap-2">
        <span className="text-gray-500 w-24 shrink-0">{label}:</span>
        <span className="text-gray-800 break-words">{value ?? "-"}</span>
        </div>
    );
}
