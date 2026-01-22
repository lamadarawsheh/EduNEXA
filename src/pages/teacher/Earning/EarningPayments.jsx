import { CheckCircle2, ChevronDown, Copy, PlusCircle, ArrowRight, ArrowLeft } from "lucide-react";

export default function EarningPayments() {
    return ( 
    // التعديل: جعل الشبكة (Grid) مرنة جداً في الموبايل واستخدام gap متناسب
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 p-4 sm:p-6 bg-white overflow-hidden">
      
      {/* القسم الأيسر: البطاقات */}
      <div className="space-y-6 w-full max-w-full">
        <div className="flex justify-between items-center">
          <h3 className="text-sm font-semibold text-[#093332]">Cards</h3>
          <div className="flex items-center gap-1 text-xs text-gray-500 cursor-pointer">
            Revenue <ChevronDown size={14} />
          </div>
        </div>
        <hr className="border-t border-gray-100" />
        
        {/* الفيزا كارد: جعل الحاوية مرنة العرض */}
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
              {/* تصغير الخط في الموبايل لضمان عدم كسر الرقم */}
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
                <p className="text-sm font-medium">Ali Ahmed</p>
              </div>
            </div>
          </div>
        </div>

        {/* أزرار التنقل */}
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

        {/* زر إضافة بطاقة: تحويل العرض الثابت w-[521px] إلى w-full max-w-[521px] */}
        <button className="w-full max-w-[521px] h-[96px] border-2 border-dashed border-gray-200 rounded-xl flex flex-row items-center justify-center gap-2 text-gray-500 hover:bg-gray-50 transition-all cursor-pointer">
          <span className="flex items-center justify-center w-6 h-6 border-2 border-gray-300 rounded-full text-lg font-light">
              +
          </span>
          <h4 className="text-sm font-medium text-gray-600">
              Add new card
          </h4>
        </button>
      </div>

      {/* القسم الأيمن: سحب الأموال */}
      <div className="space-y-6 w-full">
        <h3 className="text-sm font-semibold text-gray-700">Withdraw your money</h3>
         <hr className="border-t border-gray-100" />
        <div className="space-y-3">
          <p className="text-[11px] text-[#093332] text-sm font-medium uppercase">Payment method:</p>
          
          {/* خيار الفيزا الأول: جعل العناصر قابلة للالتفاف (wrap) في الموبايل */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 border border-[#2D6A6A] rounded-lg bg-white shadow-sm gap-4">
            <div className="flex flex-wrap items-center gap-4 sm:gap-6 flex-1">
              <span className="text-xs font-bold text-[#0E4F4F] w-10">VISA</span>
              <span className="text-sm text-gray-600 font-medium">4855 **** **** ****</span>
              <span className="text-sm text-gray-600">04/24</span>
              <span className="text-sm text-gray-600">Ali Ahmed</span>
            </div>
            <CheckCircle2 size={20} className="text-[#2D6A6A] fill-[#2D6A6A] text-white shrink-0 self-end sm:self-auto" />
          </div>

          {/* الخيار الثاني: MasterCard */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 border border-gray-100 rounded-lg bg-white opacity-60 gap-4">
            <div className="flex flex-wrap items-center gap-4 sm:gap-6">
               <div className="flex -space-x-2 w-10 shrink-0">
                  <div className="w-4 h-4 bg-red-500 rounded-full border border-white"></div>
                  <div className="w-4 h-4 bg-orange-400 rounded-full border border-white"></div>
               </div>
              <span className="text-sm text-gray-600">2855 **** **** ****</span>
              <span className="text-sm text-gray-600">04/24</span>
              <span className="text-sm text-gray-600">Ali Ahmed</span>
            </div>
          </div>

          {/* خيار PayPal */}
          <div className="flex items-start sm:items-center gap-4 p-4 border border-gray-100 rounded-lg bg-white">
            <img src="https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg" alt="PayPal" className="h-4 shrink-0 mt-1 sm:mt-0" />
            <span className="text-[11px] text-gray-400 leading-tight">You will be redirected to the PayPal site after reviewing your order.</span>
          </div>
        </div>

        {/* الرصيد وزر السحب: تحسين التخطيط للموبايل */}
        <div className="pt-6 border-t border-gray-50 flex flex-col sm:flex-row justify-between items-center sm:items-end gap-6 sm:gap-0">
          <div className="text-center sm:text-left">
            <p className="text-2xl font-bold text-gray-800">$12,500</p>
            <p className="text-[11px] text-gray-400 font-medium">Current Balance</p>
          </div>
          <button className="w-full sm:w-auto bg-[#1B5E5E] text-white px-10 py-3 rounded-lg font-medium hover:bg-[#154646] transition-all active:scale-95">
            Withdraw Money
          </button>
        </div>
      </div>
      
    </div>
  )
}