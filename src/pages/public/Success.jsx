import React from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle } from 'lucide-react';

const Success = () => {
    return (
        <div className="min-h-screen w-full flex items-center justify-center p-4 sm:p-6 bg-gradient-to-br from-[#4AA59B] to-[#0F4C4A] relative overflow-hidden">

            {/* Background Decoration */}
            <div className="absolute top-0 right-0 p-12 opacity-10 text-white transform rotate-45 pointer-events-none">
                <svg width="200" height="200" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2L2 7l10 5 10-5-10-5zm0 9l2.5-1.25L12 8.5l-2.5 1.25L12 11zm0 2.5l-5-2.5-5 2.5L12 22l10-8.5-5-2.5-5 2.5z" />
                </svg>
            </div>

            <div className="bg-white w-full max-w-[450px] rounded-3xl shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-500 mx-auto text-center p-8">

                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center text-green-600 shadow-sm mx-auto mb-6">
                    <CheckCircle className="h-10 w-10" />
                </div>

                <h2 className="text-3xl font-bold tracking-tight text-[#0F172B] mb-4">Success!</h2>
                <p className="text-gray-500 mb-8">
                    Your password has been reset successfully. You can now login with your new credentials.
                </p>

                <Link
                    to="/login"
                    className="block w-full bg-[#4E9F96] hover:bg-[#3d9b90] text-white font-bold py-3.5 rounded-xl shadow-lg hover:shadow-xl hover:-translate-y-0.5 transform transition-all active:scale-[0.98] duration-200"
                >
                    Continue to Login
                </Link>

            </div>
        </div>
    );
};

export default Success;