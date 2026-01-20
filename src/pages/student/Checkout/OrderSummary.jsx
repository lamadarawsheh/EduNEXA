import { Tag } from "lucide-react"; 

export default function OrderSummary() {
  return (
    <div className="bg-white rounded-xl p-6  border border-borderGray sticky top-10 w-[405px] h-[404px] flex flex-col justify-between font-sans">
     
      <h3 className="text-[#093332] w-[405px] h-[64px]  text-xl mb-6">Order Summary</h3>

      
      <div className="space-y-1 mb-1 w-[405px] h-[338px]">
        <div className="flex justify-between items-center w-[356px] h-[42px]">
          <span className="text-[#71717A] text-sm">Course Price</span>
          <span className="text-[#093332] text-sm">$79.99</span>
        </div>
        <div className="flex justify-between items-center w-[356px] h-[22px]">
          <span className="text-[#71717A] text-sm">Original Price</span>
          <span className="text-[#71717A] line-through text-sm ">$199.99</span>
        </div>
      </div>

      <hr className="border-borderGray mb-4 w-[356px] h-[1px]" />

    
      <div className="flex gap-2 mb-4 w-[356px] h-[36px]">
        <div className="relative flex-grow">
          <Tag className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
          <input
            type="text"
            className="w-full pl-10 pr-4 py-2 border border-borderGray rounded-lg focus:outline-none focus:border-accent text-sm"
            placeholder="Apply Coupon"
          />
        </div>
        <button className="px-5 py-2 border border-gray-200 rounded-lg text-sm font-semibold text-[#093332] hover:bg-gray-50 transition-colors">
          Apply
        </button>
      </div>

     <hr className="border-borderGray mb-4 w-[356px] h-[1px]" />

     
      <div className="flex justify-between items-start mb-6 w-[356px] h-[48px]">
        <span className="text-[#093332] text-lg">Total</span>
        <div className="text-right">
          <div className="text-[#093332] text-2xl  w-[100px] h-[32px]">$ 79.99</div>
          <div className="text-[#16A34A] text-xs mt-1 w-[100px] h-[16px]">
            You save $120.00
          </div>
        </div>
      </div>

      <button className="w-[356px] h-[48px] bg-prime hover:bg-[#15534f] text-white py-2 rounded-lg text-base transition-all shadow-md active:scale-[0.98]">
        Complete Purchase
      </button>

      <p className="text-center text-[#71717A] text-xs mt-3 leading-relaxed w-[356px] h-[32px]">
        By completing your purchase, you agree to our <br /> 
        <span className="underline cursor-pointer">Terms of Service</span>
      </p>
    </div>
  );
}