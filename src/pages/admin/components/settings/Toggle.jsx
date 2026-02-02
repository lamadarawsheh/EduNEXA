import React from "react";

export default function Toggle({ value, onChange, disabled = false, afterToggle }) {
    const handleClick = () => {
    const next = !value;
    onChange(next);
    afterToggle?.(next);
    };

    return (
    <button
    type="button"
    disabled={disabled}
    onClick={handleClick}
    className={`relative inline-flex h-6 w-12 items-center rounded-full transition-colors duration-300
        ${value ? "bg-[#176D69]" : "bg-gray-300"}
        ${disabled ? "cursor-not-allowed opacity-50" : "cursor-pointer"}`}
    >
    <span
        className={`inline-block h-5 w-5 transform rounded-full bg-white shadow transition-transform duration-300
        ${value ? "translate-x-6" : "translate-x-1"}`}
    />
    </button>
    );
}
