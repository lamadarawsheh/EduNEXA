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
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 py-6 bg-white">
      {stats.map((stat, index) => (
        <div key={index} className="flex items-center gap-4 px-2">
          <div className={`p-4 rounded-sm ${stat.bgColor} text-[#2D6A6A]`}>
            {stat.icon}
          </div>
          <div className="flex flex-col">
            <span className="text-lg font-semibold text-[#1A1A1A]">
              {stat.value}
            </span>
            <span className="text-xs text-[#2D5A58] font-medium">
              {stat.label}
            </span>
          </div>
        </div>
      ))}
    </div>
  )
}
