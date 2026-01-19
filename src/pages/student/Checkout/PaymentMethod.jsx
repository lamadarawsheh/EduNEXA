 
import paypall from "./Icons/Frame (5).png";
import  Vodafone from "./Icons/Frame (6).png";
import  bank from "./Icons/Frame (7).png";
import credit from "./Icons/Frame (8).png";
export default function PaymentMethod() {
  return (
    <div className="bg-white text-black rounded-xl p-6 shadow">
      <h3 className="text-xl font-semibold mb-4">Payment Method</h3>
      <p className="text-gray-500">Choose your preferred payment method</p>
      
      <form className="my-7">
        {/* Credit/Debit Card Option - Selected */}
        <div className="payment-option mb-4">
          <label className="flex items-center p-4 border border-green-500 rounded-lg bg-green-50 cursor-pointer transition-all">
            <div className="relative">
              <input
                type="radio"
                name="paymentMethod"
                value="card"
                className="h-5 w-5 text-green-600 focus:ring-green-500"
                checked
              />
              {/* Green checkmark in circle - Only shows when selected */}
              <div className="absolute -top-1 -right-1 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                <svg 
                  className="w-3.5 h-3.5 text-white" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth="3" 
                    d="M5 13l4 4L19 7" 
                  />
                </svg>
              </div>
            </div>
            <div className="p-2"> <img src={credit} alt=""></img></div>
            <div className="ml-4">
              <div className="flex items-center">
                <span className="font-medium">Credit/Debit Card</span>
              </div>
              <p className="text-sm text-gray-500 mt-1">Visa, Mastercard, American Express</p>
            </div>
          </label>
        </div>

        {/* PayPal Option - Not Selected */}
        <div className="payment-option mb-4">
          <label className="flex items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer transition-all">
            <div className="relative">
              <input
                type="radio"
                name="paymentMethod"
                value="paypal"
                className="h-5 w-5 text-green-600 focus:ring-green-500"
              />
              {/* Empty div for alignment - Hidden */}
              <div className="absolute -top-1 -right-1 w-6 h-6 hidden"></div>
            </div>
            <div className="p-2"> <img src={paypall} alt=""></img></div>
            <div className="ml-4">
              <div className="flex items-center">
                <span className="font-medium">PayPal</span>
              </div>
              <p className="text-sm text-gray-500 mt-1">Pay securely with your PayPal account</p>
            </div>
          </label>
        </div>

        {/* Vodafone Cash Option - Not Selected */}
        <div className="payment-option mb-4">
          <label className="flex items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer transition-all">
            <div className="relative">
              <input
                type="radio"
                name="paymentMethod"
                value="bankTransfer"
                className="h-5 w-5 text-green-600 focus:ring-green-500"
              />
              {/* Empty div for alignment - Hidden */}
              <div className="absolute -top-1 -right-1 w-6 h-6 hidden"></div>
            </div>
            <div className="p-2"> <img src={Vodafone} alt=""></img></div>
            <div className="ml-4">
              <div className="flex items-center">
                <span className="font-medium">Vodafone Cash</span>
              </div>
              <p className="text-sm text-gray-500 mt-1">Mobile wallet payment</p>
            </div>
          </label>
        </div>

        {/* Bank Transfer Option - Not Selected */}
        <div className="payment-option">
          <label className="flex items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer transition-all">
            <div className="relative">
              <input
                type="radio"
                name="paymentMethod"
                value="installment"
                className="h-5 w-5 text-green-600 focus:ring-green-500"
              />
              {/* Empty div for alignment - Hidden */}
              <div className="absolute -top-1 -right-1 w-6 h-6 hidden"></div>
            </div>
            <div className="p-2"> <img src={bank} alt=""></img></div>
            <div className="ml-4">
              <div className="flex items-center">
                <span className="font-medium">Bank Transfer</span>
              </div>
              <p className="text-sm text-gray-500 mt-1">Direct bank transfer</p>
            </div>
          </label>
        </div>
      </form>
    </div>
  );
}