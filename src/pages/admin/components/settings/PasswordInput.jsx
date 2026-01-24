import { useState } from "react";

export default function PasswordInput({ value, id }) {
    const [show, setShow] = useState(false);

    return (
    <div className="relative w-[100%] lg:w-[80%]">
        <input
        type={show ? "text" : "password"}
        id={id}
        value={value}
        readOnly
        className="border-1 border-gray-200 rounded-md py-2 px-2 pr-10 w-full text-sm text-gray-500 outline-none transition
        focus:border-gray-900 focus:ring-2 focus:ring-gray-200
        disabled:cursor-not-allowed disabled:bg-gray-100"/>
        <button
        type="button"
        onClick={() => setShow((p) => !p)}
        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-800">
        {show ? (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
        >
        <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
            />
        <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M2.458 12C3.732 7.943 7.523 5 12 5c4.477 0 8.268 2.943 9.542 7
                -1.274 4.057-5.065 7-9.542 7
                -4.477 0-8.268-2.943-9.542-7z"  />
        </svg>
        ) : (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor">
            <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M13.875 18.825A10.05 10.05 0 0112 19
                c-4.478 0-8.269-2.943-9.543-7
                a9.956 9.956 0 012.223-3.592m3.095-2.448
                A9.956 9.956 0 0112 5
                c4.478 0 8.269 2.943 9.543 7
                a9.97 9.97 0 01-4.043 5.412M15 12
                a3 3 0 00-3-3m0 0
                a3 3 0 013 3m-3-3
                L3 3m18 18L9 9"
            />
        </svg>
        )}
    </button>
    </div>
    );
}
