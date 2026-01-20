import CourseCard from "./CourseCard";
import StudentForm from "./StudentForm";
import PaymentMethod from "./PaymentMethod";
import OrderSummary from "./OrderSummary";
import CourseInclusions from "./CourseInclusions";
import TrustSignals from "./TrustSignals";
import { ArrowRight } from "lucide-react";

export default function Checkout() {
  return (
    <div className="w-[1400px] h-[2572px] min-h-screen bg-white text-black px-4 sm:px-6 py-6 lg:py-10 font-sans">
      <div className="max-w-[1280px] h-[2246px] mx-auto flex flex-col gap-6 lg:gap-10">
        
       <header className="w-full max-w-[1280px] h-[150px] mx-auto py-8 px-4 sm:px-6">
      <nav className="flex items-center gap-2 text-gray-500 text-sm mb-4">
        <span className="hover:text-[#1a4d4a] cursor-pointer transition-colors">Checkout</span>
        <ArrowRight className="w-4 h-4"/>
        <span className="text-[#1a4d4a] font-medium">Complete Your Enrollment</span>
      </nav>

      <h1 className="text-3xl md:text-5xl font-bold text-[#093332] tracking-tight">
        Secure Checkout
      </h1>

      <p className="text-gray-500 text-lg mt-3 font-normal">
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