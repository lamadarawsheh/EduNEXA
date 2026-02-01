import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { withdrawMoney, fetchWalletData } from "../../../ReduxToolkit/walletSlice";
import { CheckCircle2, ChevronDown, Copy, ArrowRight, ArrowLeft } from "lucide-react";
import Swal from "sweetalert2";

export default function EarningPayments() {
  const dispatch = useDispatch();
  
  const { balance = 0, status = "idle" } = useSelector((state) => state.wallet);
  const user = useSelector((state) => state.auth?.user); 
  const userName = user?.firstName ? `${user.firstName} ${user.lastName}` : (user?.name || "Guest User");

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchWalletData());
    }
  }, [dispatch, status]);

  const handleWithdrawClick = async () => {
    if (Number(balance) <= 0) {
      return Swal.fire({
        title: "Empty Balance",
        text: "You don't have enough funds to withdraw.",
        icon: "warning",
        confirmButtonColor: "#1B5E5E",
        customClass: {
          popup: 'rounded-[24px]', 
        }
      });
    }

    const { value: amount } = await Swal.fire({
      title: "Withdraw Funds",
      html: `
        <div class="text-center mb-2">
          <p class="text-gray-500 text-sm">Available balance: <span class="text-[#1B5E5E] font-bold">$${balance}</span></p>
        </div>
      `,
      input: "number",
      inputPlaceholder: "Enter amount",
      showCancelButton: true,
      confirmButtonText: "Confirm Withdrawal",
      cancelButtonText: "Cancel",
      confirmButtonColor: "#1B5E5E",
      cancelButtonColor: "#f3f4f6",
      
    
      customClass: {
        popup: 'rounded-[28px] border-none p-8 shadow-2xl', 
        title: 'text-[#093332] font-bold text-2xl mb-4',
        input: 'rounded-[14px] border border-gray-200 focus:border-[#1B5E5E] focus:ring-2 focus:ring-[#1B5E5E]/20 text-center py-4 text-lg mx-auto w-[80%]',
        confirmButton: 'rounded-[12px] px-10 py-3 text-sm font-semibold transition-all hover:opacity-90',
        cancelButton: 'rounded-[12px] px-10 py-3 text-sm font-semibold text-gray-500 hover:bg-gray-200 transition-all',
        actions: 'gap-4 mt-6', 
      },
      
      buttonsStyling: true,

      inputAttributes: {
        min: 1,
        max: balance,
        step: 1
      },

      inputValidator: (value) => {
        if (!value || value <= 0) {
          return "Please enter a valid amount!";
        }
        if (Number(value) > balance) {
          return "Amount exceeds your current balance!";
        }
      }
    });

    if (amount) {
      Swal.fire({
        title: 'Processing...',
        didOpen: () => { Swal.showLoading(); },
        allowOutsideClick: false,
        customClass: { popup: 'rounded-[24px]' }
      });

      dispatch(withdrawMoney(amount))
        .unwrap()
        .then(() => {
          Swal.fire({
            title: "Success!",
            text: "Your withdrawal request has been sent.",
            icon: "success",
            confirmButtonColor: "#1B5E5E",
            customClass: { popup: 'rounded-[24px]' }
          });
        })
        .catch((err) => {
          Swal.fire({
            title: "Failed",
            text: err || "Insufficient balance or server error",
            icon: "error",
            confirmButtonColor: "#1B5E5E",
            customClass: { popup: 'rounded-[24px]' }
          });
        });
    }
  };

  return ( 
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 p-4 sm:p-6 bg-white overflow-hidden">
      
      <div className="space-y-6 w-full max-w-full">
        <div className="flex justify-between items-center">
          <h3 className="text-sm font-semibold text-[#093332]">Cards</h3>
          <div className="flex items-center gap-1 text-xs text-gray-500 cursor-pointer">
            Revenue <ChevronDown size={14} />
          </div>
        </div>
        <hr className="border-t border-gray-100" />
        
        <div className="relative group w-full max-w-[521px] mx-auto lg:mx-0">
          <div className="bg-gradient-to-br from-[#3E38BA] to-[#6058EF] p-6 sm:p-8 rounded-2xl text-white shadow-xl h-52 flex flex-col justify-between overflow-hidden">
            <div className="flex justify-between items-start">
              <span className="text-2xl font-bold italic tracking-tighter">VISA</span>
              <div className="flex gap-1">
                <div className="w-1 h-1 bg-white/50 rounded-full"></div>
                <div className="w-1 h-1 bg-white/50 rounded-full"></div>
                <div className="w-1 h-1 bg-white/50 rounded-full"></div>
              </div>
            </div>         
            <div className="flex items-center gap-4">
              <p className="text-lg sm:text-xl tracking-[0.15em] sm:tracking-[0.2em] font-medium truncate">
                4855 **** **** ****
              </p>
              <Copy size={16} className="text-white/60 shrink-0 cursor-pointer hover:text-white" />
            </div>
            <div className="flex justify-between items-end">
              <div>
                <p className="text-[10px] text-white/60 uppercase">Expires</p>
                <p className="text-sm font-medium">04/24</p>
              </div>
              <div className="text-right">
                <p className="text-[10px] text-white/60 uppercase">Card Name</p>
                <p className="text-sm font-medium">{userName.toUpperCase()}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-between items-center px-2 w-full max-w-[521px]">
          <div className="flex gap-2">
            <div className="w-2 h-2 rounded-full bg-gray-800"></div>
            <div className="w-2 h-2 rounded-full bg-[#D1E9E7]"></div>
          </div>
          <div className="flex gap-4">
            <ArrowLeft size={18} className="text-gray-200 cursor-not-allowed" />
            <ArrowRight size={18} className="text-[#2D6A6A] cursor-pointer" />
          </div>
        </div>

        <button className="w-full max-w-[521px] h-[96px] border-2 border-dashed border-gray-200 rounded-xl flex flex-row items-center justify-center gap-2 text-gray-500 hover:bg-gray-50 transition-all cursor-pointer">
          <span className="flex items-center justify-center w-6 h-6 border-2 border-gray-300 rounded-full text-lg font-light">
              +
          </span>
          <h4 className="text-sm font-medium text-gray-600">
              Add new card
          </h4>
        </button>
      </div>

      <div className="space-y-6 w-full">
        <h3 className="text-sm font-semibold text-gray-700">Withdraw your money</h3>
         <hr className="border-t border-gray-100" />
        <div className="space-y-3">
          <p className="text-[11px] text-[#093332] text-sm font-medium uppercase">Payment method:</p>
          
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 border border-[#2D6A6A] rounded-lg bg-white shadow-sm gap-4">
            <div className="flex flex-wrap items-center gap-4 sm:gap-6 flex-1">
              <span className="text-xs font-bold text-[#0E4F4F] w-10">VISA</span>
              <span className="text-sm text-gray-600 font-medium">4855 **** **** ****</span>
              <span className="text-sm text-gray-600">04/24</span>
              <span className="text-sm text-gray-600">{userName.toUpperCase()}</span>
            </div>
            <CheckCircle2 size={20} className="text-[#2D6A6A] fill-[#2D6A6A] text-white shrink-0 self-end sm:self-auto" />
          </div>

          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 border border-gray-100 rounded-lg bg-white opacity-60 gap-4">
            <div className="flex flex-wrap items-center gap-4 sm:gap-6">
               <div className="flex -space-x-2 w-10 shrink-0">
                  <div className="w-4 h-4 bg-red-500 rounded-full border border-white"></div>
                  <div className="w-4 h-4 bg-orange-400 rounded-full border border-white"></div>
               </div>
              <span className="text-sm text-gray-600">2855 **** **** ****</span>
              <span className="text-sm text-gray-600">04/24</span>
              <span className="text-sm text-gray-600">{userName.toUpperCase()}</span>
            </div>
          </div>

          <div className="flex items-start sm:items-center gap-4 p-4 border border-gray-100 rounded-lg bg-white">
            <img src="https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg" alt="PayPal" className="h-4 shrink-0 mt-1 sm:mt-0" />
            <span className="text-[11px] text-gray-400 leading-tight">You will be redirected to the PayPal site after reviewing your order.</span>
          </div>
        </div>

        <div className="pt-6 border-t border-gray-50 flex flex-col sm:flex-row justify-between items-center sm:items-end gap-6 sm:gap-0">
          <div className="text-center sm:text-left">
            <p className="text-2xl font-bold text-gray-800">${Number(balance).toLocaleString()}</p>
            <p className="text-[11px] text-gray-400 font-medium">Current Balance</p>
          </div>
          <button 
            onClick={handleWithdrawClick} 
            className="w-full sm:w-auto bg-[#1B5E5E] text-white px-10 py-3 rounded-lg font-medium hover:bg-[#154646] transition-all active:scale-95"
          >
            Withdraw Money
          </button>
        </div>
      </div>
      
    </div>
  )
}