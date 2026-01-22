import { Layers, Receipt, CreditCard, Crown } from "lucide-react";

export default function EarningStats() {
  const stats = [
    { 
      label: "Total Revenue", 
      value: "$10,000", 
      icon: <Layers size={24} />, 
      bgColor: "bg-[#E6F7F6]" 
    },
    { 
      label: "Current Balance", 
      value: "$12,500", 
      icon: <Receipt size={24} />, 
      bgColor: "bg-[#E6F7F6]" 
    },
    { 
      label: "Total Withdrawals", 
      value: "$3,000", 
      icon: <CreditCard size={24} />, 
      bgColor: "bg-[#E6F7F6]" 
    },
    { 
      label: "Today Revenue", 
      value: "$50", 
      icon: <Crown size={24} />, 
      bgColor: "bg-[#E6F7F6]" 
    },
  ];

  return (
    <div className="w-full max-w-[1320px] grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 py-1 bg-white">
      {stats.map((stat, index) => (
        <div 
          key={index} 
          className="w-full min-h-[108px] flex items-center gap-4 px-4 py-2 border border-gray-50 sm:border-none rounded-lg"
        >
          <div className={`p-4 rounded-sm flex-shrink-0 ${stat.bgColor} text-[#2D6A6A]`}>
            {stat.icon}
          </div>
          
          <div className="flex flex-col">
            <span className="text-xl sm:text-lg text-primetext">
              {stat.value}
            </span>
            <span className="text-xs text-[#176D69] tracking-wider">
              {stat.label}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}