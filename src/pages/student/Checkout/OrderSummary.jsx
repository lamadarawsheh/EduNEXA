import React from "react";
import { Tag } from "lucide-react";

export default function OrderSummary({ data, onComplete }) {
  const coursePrice = data?.price || 0;
  
  const originalPrice = coursePrice + 50; 
  const discountAmount = originalPrice - coursePrice;

  return (
    <div className="w-full max-w-[405px] sm:mb-6 bg-white border border-borderGray rounded-2xl p-6 sm:p-8 mx-auto shadow-sm">
      
      <h3 className="text-[#18181B] text-xl font-bold mb-6">Order Summary</h3>

      <div className="space-y-3 mb-4">
        <div className="flex justify-between items-center">
          <span className="text-[#71717A] text-sm">Course Price</span>
          <span className="text-[#18181B] text-sm font-medium">${coursePrice.toFixed(2)}</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-[#71717A] text-sm">Original Price</span>
          <span className="text-[#A1A1AA] line-through text-sm">${originalPrice.toFixed(2)}</span>
        </div>
      </div>

      <hr className="border-[#F4F4F5] mb-4" />

      <div className="flex gap-2 mb-4">
        <div className="relative flex-grow">
          <Tag className="absolute left-3 top-1/2 -translate-y-1/2 text-[#A1A1AA] w-4 h-4" />
          <input
            type="text"
            className="w-full pl-10 pr-4 py-2 border border-[#E4E4E7] rounded-lg text-sm focus:ring-1 focus:ring-prime outline-none"
            placeholder="Apply Coupon"
          />
        </div>
        <button className="px-5 py-2 border border-[#E4E4E7] rounded-lg text-sm font-semibold text-[#18181B] hover:bg-gray-50 transition-colors">
          Apply
        </button>
      </div>

      <hr className="border-[#F4F4F5] mb-4" />

      <div className="flex justify-between items-start mb-6">
        <span className="text-[#18181B] text-lg font-bold">Total</span>
        <div className="text-right">
          <div className="text-[#18181B] text-2xl font-bold">$ {coursePrice.toFixed(2)}</div>
          {discountAmount > 0 && (
            <div className="text-[#16A34A] text-xs mt-1 font-medium">
              You save ${discountAmount.toFixed(2)}
            </div>
          )}
        </div>
      </div>

      <button
        onClick={onComplete}
        className="w-full h-[48px] bg-[#1a5a56] hover:bg-[#154a46] text-white py-2 rounded-lg text-base font-semibold transition-all shadow-md active:scale-[0.98]"
      >
        Complete Purchase
      </button>

      <p className="text-center text-[#71717A] text-[11px] mt-4 leading-relaxed">
        By completing your purchase, you agree to our <br />
        <span className="underline cursor-pointer hover:text-prime">Terms of Service</span> and <span className="underline cursor-pointer hover:text-prime">Privacy Policy</span>.
      </p>
    </div>
  );
}