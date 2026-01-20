import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { CheckCircle2, ArrowLeft, Loader2 } from 'lucide-react';
import Popup from '../../components/common/Popup';

const VerifyCode = () => {
    const navigate = useNavigate();
    const [code, setCode] = useState(['', '', '', '']);
    const inputs = useRef([]);
    const [timeLeft, setTimeLeft] = useState(180); // 3 minutes
    const [isLoading, setIsLoading] = useState(false);
    const [popup, setPopup] = useState({ show: false, title: '', message: '', type: 'success' });

    useEffect(() => {
        const timer = setInterval(() => {
            setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
        }, 1000);
        return () => clearInterval(timer);
    }, []);

    const formatTime = (seconds) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    };

    const handleChange = (index, value) => {
        if (!/^[0-9]*$/.test(value)) return;

        const newCode = [...code];
        newCode[index] = value;
        setCode(newCode);

        // Auto move to next input
        if (value && index < 3) {
            inputs.current[index + 1].focus();
        }
    };

    const handleKeyDown = (index, e) => {
        if (e.key === 'Backspace' && !code[index] && index > 0) {
            inputs.current[index - 1].focus();
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const verificationCode = code.join('');
        if (verificationCode.length !== 4) return;

        setIsLoading(true);
        try {
            await new Promise(resolve => setTimeout(resolve, 1500));
            // Navigate to Reset Password or directly login depending on flow
            navigate('/reset-password');
        } catch (error) {
            setPopup({ show: true, title: 'Error', message: 'Invalid code. Please try again.', type: 'error' });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen w-full flex items-center justify-center p-4 sm:p-6 bg-gradient-to-br from-[#4AA59B] to-[#0F4C4A] relative overflow-hidden">

            {/* Background Decoration */}
            <div className="absolute top-0 right-0 p-12 opacity-10 text-white transform rotate-45 pointer-events-none">
                <svg width="200" height="200" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2L2 7l10 5 10-5-10-5zm0 9l2.5-1.25L12 8.5l-2.5 1.25L12 11zm0 2.5l-5-2.5-5 2.5L12 22l10-8.5-5-2.5-5 2.5z" />
                </svg>
            </div>

            <Popup
                isOpen={popup.show}
                title={popup.title}
                message={popup.message}
                type={popup.type}
                onClose={() => setPopup({ ...popup, show: false })}
            />

            <div className="bg-white w-full max-w-[450px] rounded-3xl shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-500 mx-auto">
                <div className="pt-8 pb-6 text-center px-8">
                    <div className="w-20 h-20 bg-[#E0F2F1] rounded-full flex items-center justify-center text-[#4AA59B] shadow-sm mx-auto mb-6">
                        <CheckCircle2 className="h-10 w-10" />
                    </div>
                    <h2 className="text-2xl font-bold tracking-tight text-[#0F172B] mb-2">Email Verification</h2>
                    <p className="text-gray-500 text-sm">Please enter the 4-digit code sent to your email address.</p>
                </div>

                <div className="px-8 pb-8">
                    <form onSubmit={handleSubmit} className="space-y-8">
                        <div className="flex justify-center gap-4">
                            {code.map((digit, index) => (
                                <input
                                    key={index}
                                    ref={el => inputs.current[index] = el}
                                    type="text"
                                    maxLength={1}
                                    value={digit}
                                    onChange={(e) => handleChange(index, e.target.value)}
                                    onKeyDown={(e) => handleKeyDown(index, e)}
                                    className="w-14 h-14 text-center text-2xl font-bold border-2 border-gray-200 rounded-xl focus:border-[#4AA59B] focus:ring-4 focus:ring-[#4AA59B]/10 outline-none transition-all text-[#0F4C4A]"
                                />
                            ))}
                        </div>

                        <div className="text-center">
                            <p className="text-sm text-gray-500 mb-4">
                                Code expires in: <span className="font-bold text-[#4AA59B]">{formatTime(timeLeft)}</span>
                            </p>

                            <button
                                type="submit"
                                disabled={isLoading || code.some(d => !d)}
                                className={`w-full bg-[#4E9F96] hover:bg-[#3d9b90] text-white font-bold py-3.5 rounded-xl shadow-lg hover:shadow-xl hover:-translate-y-0.5 transform transition-all active:scale-[0.98] duration-200 text-sm flex items-center justify-center mb-4
                                    ${(isLoading || code.some(d => !d)) ? 'opacity-70 cursor-not-allowed hover:bg-[#4E9F96] hover:shadow-lg hover:translate-y-0' : ''}
                                `}
                            >
                                {isLoading ? (
                                    <>
                                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                        Verifying...
                                    </>
                                ) : (
                                    "Verify Code"
                                )}
                            </button>

                            <button
                                type="button"
                                disabled={timeLeft > 0}
                                className={`text-sm font-semibold transition-colors ${timeLeft > 0 ? 'text-gray-400 cursor-not-allowed' : 'text-[#4E9F96] hover:text-[#0F4C4A] hover:underline'}`}
                            >
                                Resend Code
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default VerifyCode;