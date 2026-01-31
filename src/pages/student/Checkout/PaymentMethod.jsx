import React, { useState, useEffect } from "react";
import {
  CreditCard, Wallet, Smartphone, Banknote, CheckCircle2, Building2,
  Lock, Mail, ShieldCheck, Zap, Globe, RefreshCcw, ExternalLink
} from "lucide-react";

export default function PaymentMethods({ selectedMethod, setSelectedMethod, onDetailsChange }) {
  const [paypalTab, setPaypalTab] = useState("account");

  // Local state for inputs
  const [cardDetails, setCardDetails] = useState({ cardNumber: "", expiryDate: "", cvc: "" });
  const [vodafoneDetails, setVodafoneDetails] = useState({ walletNumber: "" });
  const [bankDetails, setBankDetails] = useState({ referenceNumber: "", receiptFile: null });

  // Sync details to parent whenever they change or method changes
  useEffect(() => {
    if (selectedMethod === "card") {
      onDetailsChange(cardDetails);
    } else if (selectedMethod === "vodafone") {
      onDetailsChange(vodafoneDetails);
    } else if (selectedMethod === "bank") {
      onDetailsChange(bankDetails);
    } else {
      onDetailsChange({});
    }
  }, [selectedMethod, cardDetails, vodafoneDetails, bankDetails, onDetailsChange]);


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

      <div className="bg-white w-full text-dark rounded-xl p-4 md:p-6 border border-gray-200 space-y-4 shadow-sm">
        <h3 className="text-lg text-[#093332] font-bold font-inter">Payment Method</h3>
        <p className="text-gray-500 text-sm mb-4 md:mb-8 font-inter">Choose your preferred payment method</p>

        <div className="grid grid-cols-1 gap-4 font-inter">
          {methods.map((method) => {
            const isSelected = selectedMethod === method.id;
            return (
              <div
                key={method.id}
                onClick={() => setSelectedMethod(method.id)}
                className={`flex items-start md:items-center gap-4 p-4 border rounded-xl cursor-pointer transition-all ${isSelected
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

      <div className="bg-white w-full text-dark rounded-xl p-4 md:p-6 border border-gray-200 space-y-4 shadow-sm font-inter">

        {selectedMethod === "card" && (
          <div className="space-y-4 animate-in fade-in duration-500">
            <h3 className="text-lg text-[#093332] font-bold">Card Information</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Card Number</label>
                <div className="relative">
                  <CreditCard className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                  <input
                    type="text"
                    placeholder="0000 0000 0000 0000"
                    value={cardDetails.cardNumber}
                    onChange={(e) => setCardDetails({ ...cardDetails, cardNumber: e.target.value })}
                    className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl outline-none focus:border-[#146A66] text-sm"
                  />
                </div>
              </div>
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Expiry Date</label>
                  <input
                    type="text"
                    placeholder="MM/YY"
                    value={cardDetails.expiryDate}
                    onChange={(e) => setCardDetails({ ...cardDetails, expiryDate: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl outline-none focus:border-[#146A66] text-sm"
                  />
                </div>
                <div className="flex-1">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">CVC / CVV</label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                    <input
                      type="text"
                      placeholder="123"
                      value={cardDetails.cvc}
                      onChange={(e) => setCardDetails({ ...cardDetails, cvc: e.target.value })}
                      className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl outline-none focus:border-[#146A66] text-sm"
                    />
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

            <div className="p-6 text-center">
              <p className="text-gray-600 text-sm">You will be redirected to PayPal to complete your purchase securely.</p>
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
              <input
                type="text"
                placeholder="010XXXXXXXX"
                value={vodafoneDetails.walletNumber}
                onChange={(e) => setVodafoneDetails({ ...vodafoneDetails, walletNumber: e.target.value })}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl outline-none focus:border-red-500 text-sm"
              />
            </div>
          </div>
        )}

        {selectedMethod === "bank" && (
          <div className="space-y-4 animate-in fade-in duration-500 font-inter">
            <h3 className="text-lg text-[#093332] font-bold">Bank Transfer Details</h3>
            <div className="bg-[#FFFBF2] border border-[#FDE68A]/40 p-4 md:p-6 rounded-xl mb-6 shadow-sm">
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

                <input
                  type="text"
                  placeholder="Transaction ref"
                  value={bankDetails.referenceNumber}
                  onChange={(e) => setBankDetails({ ...bankDetails, referenceNumber: e.target.value })}
                  className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl outline-none 
                focus:border-[#146A66] text-sm"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2 font-inter">Upload Receipt (Optional)</label>
              <input
                type="file"
                id="file-upload"
                hidden
                onChange={(e) => setBankDetails({ ...bankDetails, receiptFile: e.target.files[0] })}
              />
              <label
                htmlFor="file-upload"
                className="border-2 border-dashed border-gray-200 rounded-2xl p-8 md:p-12 flex flex-col items-center justify-center bg-gray-50/50 hover:bg-gray-50 transition-colors cursor-pointer text-center"
              >
                <p className="text-sm font-medium text-gray-600 font-inter">
                  {bankDetails.receiptFile ? `Selected: ${bankDetails.receiptFile.name}` : "Click to upload or drag and drop"}
                </p>
                <p className="text-[11px] text-gray-400 mt-1 font-inter font-medium uppercase tracking-widest">PNG, JPG or PDF (max. 5MB)</p>
              </label>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}