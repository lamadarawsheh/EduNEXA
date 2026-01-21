import React, { useState } from "react";
import {  CreditCard, Wallet, Smartphone, Banknote, CheckCircle2, Building2, Lock, Mail, ShieldCheck, Zap, Globe, RefreshCcw, ExternalLink  
} from "lucide-react";

export default function PaymentMethods() {
  const [selectedMethod, setSelectedMethod] = useState("bank");
  const [paypalTab, setPaypalTab] = useState("account"); 

  const methods = [
    {
      id: "card",
      title: "Credit / Debit Card",
      description: "Visa, Mastercard, American Express",
      icon: <CreditCard size={20} />,
    },
    {
      id: "paypal",
      title: "PayPal",
      description: "Pay securely with your PayPal account",
      icon: <Wallet size={20} />,
    },
    {
      id: "vodafone",
      title: "Vodafone Cash",
      description: "Mobile wallet payment",
      icon: <Smartphone size={20} />,
    },
    {
      id: "bank",
      title: "Bank Transfer",
      description: "Direct bank transfer",
      icon: <Banknote size={20} />,
    },
  ];

  return (
    <div className="space-y-6 w-full max-w-[843px] mx-auto p-4 md:p-0">
      
      <div className="bg-white w-full text-dark rounded-xl p-4 md:p-6 border border-gray-200 space-y-4">
        <h3 className="text-lg text-[#093332] font-bold">Payment Method</h3>
        <p className="text-gray-500 text-sm mb-4 md:mb-8">Choose your preferred payment method</p>
        
        <div className="grid grid-cols-1 gap-4">
          {methods.map((method) => {
            const isSelected = selectedMethod === method.id;
            return (
              <div 
                key={method.id} 
                onClick={() => setSelectedMethod(method.id)}
                className={`flex items-start md:items-center gap-4 p-4 border rounded-xl cursor-pointer transition-all ${
                  isSelected
                    ? "border-[#146A66] bg-[#F4F9F9]" 
                    : "border-gray-200 bg-white hover:border-gray-300"
                }`}
              >
                <div className="flex items-center justify-center mt-1 md:mt-0">
                  {isSelected ? (
                    <CheckCircle2 className="text-[#146A66]" size={22} fill="#2D5A58" color="white" />
                  ) : (
                    <div className="w-5 h-5 border-2 border-gray-200 rounded-full" />
                  )}
                </div>
                <div className="text-gray-600">
                  {method.icon}
                </div>
                <div className="flex flex-col">
                  <span className={`font-medium ${isSelected ? "text-[#146A66]" : "text-gray-800"}`}>
                    {method.title}
                  </span>
                  <span className="text-[#71717A] text-sm">
                    {method.description}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="bg-white w-full text-dark rounded-xl p-4 md:p-6 border border-gray-200 space-y-4">
        
        {selectedMethod === "card" && (
          <div className="space-y-4 animate-in fade-in duration-500">
            <h3 className="text-lg text-[#093332] font-bold">Card Information</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Card Number</label>
                <div className="relative">
                  <CreditCard className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                  <input type="text" placeholder="0000 0000 0000 0000" className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl outline-none focus:border-teal-600 text-sm" />
                </div>
              </div>
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Expiry Date</label>
                  <input type="text" placeholder="MM/YY" className="w-full px-4 py-3 border border-gray-200 rounded-xl outline-none focus:border-teal-600 text-sm" />
                </div>
                <div className="flex-1">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">CVC / CVV</label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                    <input type="text" placeholder="123" className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl outline-none focus:border-teal-600 text-sm" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
        
        {selectedMethod === "paypal" && (
          <div className="bg-white rounded-xl overflow-hidden animate-in fade-in duration-500">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center p-4 md:p-6 border-b border-gray-50 gap-4">
              <h3 className="text-lg font-bold text-[#093332]">PayPal Payment</h3>
              <div className="flex items-center gap-2">
                <div className="bg-[#003087] p-1 rounded">
                  <Wallet size={16} className="text-white" />
                </div>
                <span className="text-[#003087] font-black italic text-xl">Paypal</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row bg-gray-50/50 p-1 m-4 md:m-6 rounded-lg gap-1">
              <button 
                onClick={() => setPaypalTab("account")}
                className={`flex-1 py-2.5 text-sm font-semibold rounded-md transition-all ${
                  paypalTab === "account" ? "bg-white shadow text-[#2D5A58]" : "text-gray-500 hover:text-gray-700"
                }`}
              >
                Pay with PayPal Account
              </button>
              <button 
                onClick={() => setPaypalTab("guest")}
                className={`flex-1 py-2.5 text-sm font-semibold rounded-md transition-all ${
                  paypalTab === "guest" ? "bg-white shadow text-[#2D5A58]" : "text-gray-500 hover:text-gray-700"
                }`}
              >
                Pay as Guest
              </button>
            </div>

            <div className="px-4 md:px-6 pb-6 space-y-6">
              {paypalTab === "account" && (
                <>
                  <div className="bg-[#FFF9EC] border border-[#FDE68A]/40 p-4 rounded-xl flex gap-3">
                    <ShieldCheck size={20} className="text-[#B45309] shrink-0 mt-0.5" />
                    <div>
                      <p className="font-bold text-[#92400E] text-sm">Secure PayPal Checkout</p>
                      <p className="text-[#B45309] text-xs leading-relaxed">
                        Log in to your PayPal account to complete the payment.
                      </p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <label className="block text-xs font-bold text-gray-600 mb-1.5 uppercase tracking-wider">Email or Mobile Number</label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                        <input type="text" placeholder="email@example.com" className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg outline-none focus:border-[#2D5A58] text-sm" />
                      </div>
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-gray-600 mb-1.5 uppercase tracking-wider">Password</label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                        <input type="password" placeholder="••••••••" className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg outline-none focus:border-[#2D5A58] text-sm" />
                      </div>
                    </div>
                    <button className="text-[#2D5A58] text-xs font-bold hover:underline">Forgot password?</button>
                  </div>

                  <div className="bg-gray-50/50 rounded-xl p-4 space-y-3">
                    <p className="text-sm font-bold text-gray-700">PayPal Benefits:</p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {[
                        { icon: <CheckCircle2 size={16} />, text: "Buyer Protection" },
                        { icon: <Zap size={16} />, text: "Fast checkout" },
                        { icon: <Globe size={16} />, text: "Global support" },
                        { icon: <RefreshCcw size={16} />, text: "Easy refunds" }
                      ].map((benefit, idx) => (
                        <div key={idx} className="flex items-center gap-2 text-xs text-gray-600 font-medium">
                          <span className="text-[#2D5A58]">{benefit.icon}</span>
                          {benefit.text}
                        </div>
                      ))}
                    </div>
                  </div>

                  <button className="w-full bg-[#146A66] hover:bg-[#0D4D4A] text-white py-4 rounded-xl font-bold flex items-center justify-center gap-2 transition-all shadow-md">
                    Continue with PayPal <ExternalLink size={18} />
                  </button>
                  
                  <div className="flex flex-col sm:flex-row justify-center items-center gap-4 md:gap-6 pt-2 border-t border-gray-50">
                    <div className="flex items-center gap-1.5 text-[10px] text-gray-400 font-medium uppercase tracking-widest">
                      <ShieldCheck size={14} /> Buyer Protection
                    </div>
                    <div className="flex items-center gap-1.5 text-[10px] text-gray-400 font-medium uppercase tracking-widest">
                      <Lock size={14} /> 256-bit Encryption
                    </div>
                  </div>
                </>
              )}

              {paypalTab === "guest" && (
                <div className="space-y-4 py-4">
                  <input type="text" placeholder="Card Number" className="w-full px-4 py-3 border border-gray-200 rounded-lg text-sm" />
                  <button className="w-full bg-[#2D5A58] text-white py-4 rounded-xl font-bold">Pay with Card</button>
                </div>
              )}
            </div>
          </div>
        )}

        {selectedMethod === "vodafone" && (
          <div className="space-y-4 animate-in fade-in duration-500">
            <h3 className="text-lg text-[#093332] font-bold">Vodafone Cash Details</h3>
            <div className="bg-red-50 border border-red-100 p-4 rounded-xl">
              <p className="text-red-700 text-sm">
                Please transfer the total amount to: <span className="font-bold text-lg block sm:inline">01012345678</span>
              </p>
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Your Wallet Number</label>
              <input type="text" placeholder="010XXXXXXXX" className="w-full px-4 py-3 border border-gray-200 rounded-xl outline-none focus:border-red-500 text-sm" />
            </div>
          </div>
        )}

        {selectedMethod === "bank" && (
          <div className="space-y-4 animate-in fade-in duration-500">
            <h3 className="text-lg text-[#093332] font-bold">Bank Transfer Details</h3>
            <div className="bg-[#FFFBF2] border border-[#FDE68A]/40 p-4 md:p-6 rounded-xl mb-6">
              <p className="text-[#92400E] text-sm mb-4 font-medium">
                Important: Use your email as reference.
              </p>
              <div className="space-y-3 text-sm">
                {[
                  { label: "Bank:", val: "National Bank of Egypt" },
                  { label: "Name:", val: "EduNEXA Platform" },
                  { label: "Account:", val: "1234567890123456" },
                  { label: "IBAN:", val: "EG380002000156..." }
                ].map((item, i) => (
                  <p key={i} className="flex flex-col sm:flex-row gap-1 sm:gap-0">
                    <span className="font-bold text-[#92400E] sm:w-32 shrink-0">{item.label}</span> 
                    <span className="text-[#B45309] break-all">{item.val}</span>
                  </p>
                ))}
              </div>
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Reference Number</label>
              <div className="relative">
                <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                <input type="text" placeholder="Transaction ref" className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl outline-none focus:border-teal-600 text-sm" />
              </div>
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Upload Receipt (Optional)</label>
              <div className="border-2 border-dashed border-gray-200 rounded-2xl p-8 md:p-12 flex flex-col items-center justify-center bg-gray-50/50 hover:bg-gray-50 transition-colors cursor-pointer text-center">
                <p className="text-sm font-medium text-gray-600">Click to upload or drag and drop</p>
                <p className="text-[11px] text-gray-400 mt-1">PNG, JPG or PDF (max. 5MB)</p>
              </div>
            </div>
          </div>
        )}
      </div>

      {selectedMethod !== "paypal" && (
        <button className="w-full bg-[#146A66] text-white py-4 rounded-xl font-bold hover:bg-[#0D4D4A] transition-all shadow-lg animate-in fade-in">
          Confirm Payment
        </button>
      )}
    </div>   
  );
}