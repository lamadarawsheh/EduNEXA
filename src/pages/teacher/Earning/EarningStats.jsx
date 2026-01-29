import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchWalletData } from "../../../ReduxToolkit/Slices/walletSlice/walletSlice";
import { Layers, Receipt, CreditCard, Crown } from "lucide-react";

export default function EarningStats() {
  const dispatch = useDispatch();
  const walletState = useSelector((state) => state.wallet);

  const {
    balance = 0,
    totalRevenue = 0,
    totalWithdrawals = 0,
    todayRevenue = 0,
    status = "idle",
  } = walletState || {};

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchWalletData());
    }
  }, [dispatch, status]);
 
  const stats = [
    { 
      label: "Total Revenue", 
      value: `$${totalRevenue.toLocaleString()}`,
      icon: <Layers size={20} className="text-[#2D6A6A]" />, 
      bgColor: "bg-[#E6F7F6]"
    },
    { 
      label: "Current Balance", 
      value: `$${balance.toLocaleString()}`, 
      icon: <Receipt size={20} className="text-[#2D6A6A]" />, 
      bgColor: "bg-[#E6F7F6]"
    },
    { 
      label: "Total Withdrawals", 
      value: `$${totalWithdrawals.toLocaleString()}`, 
      icon: <CreditCard size={20} className="text-[#2D6A6A]" />, 
      bgColor: "bg-[#E6F7F6]"
    },
    { 
      label: "Today Revenue", 
      value: `$${todayRevenue.toLocaleString()}`,
      icon: <Crown size={20} className="text-[#2D6A6A]" />, 
      bgColor: "bg-[#E6F7F6]"
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat, index) => (
        <div key={index} className="flex items-center gap-4">
          <div className={`flex items-center justify-center w-12 h-12 rounded-lg ${stat.bgColor}`}>
            {stat.icon}
          </div>
          <div className="flex flex-col">
            <span className="text-xl font-bold text-gray-900 leading-tight">
              {stat.value}
            </span>
            <span className="text-[13px] font-medium text-[#4A7171]">
              {stat.label}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}