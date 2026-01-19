import CourseCard from "./CourseCard";
import StudentForm from "./StudentForm";
import PaymentMethod from "./PaymentMethod";
import OrderSummary from "./OrderSummary";
import CourseInclusions from "./CourseInclusions";
import TrustSignals from "./TrustSignals";

export default function Checkout() {
  return (
    <div className="min-h-screen bg-white text-black px-4 sm:px-6 py-6 lg:py-10 font-sans">
      <div className="max-w-7xl mx-auto flex flex-col gap-6 lg:gap-10">
        
        <header className="mb-2 lg:mb-4">
          <p className="text-[10px] sm:text-xs text-gray-400 uppercase tracking-wider">
            Checkout {'>'} Complete Your Enrollment
          </p>
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#1a4d4a] mt-2">
            Secure Checkout
          </h1>
          <p className="text-sm sm:text-base text-gray-500 mt-1">
            Complete your purchase and start learning today
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          
          <div className="lg:col-span-2 space-y-8 order-1">
            <section className="transition-all">
               <CourseCard />
            </section>
            
            <section className="transition-all">
               <StudentForm />
            </section>
            
            <section className="transition-all">
               <PaymentMethod />
            </section>
          </div>

          <div className="lg:col-span-1 lg:sticky lg:top-8 order-2">
            <OrderSummary />
          </div>
        </div>

        <div className="w-full space-y-6 lg:space-y-10 mt-4">
          <TrustSignals />
          <CourseInclusions />
        </div>
        
      </div>
    </div>
  );
}