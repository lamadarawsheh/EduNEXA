import CourseCard from "./CourseCard";
import StudentForm from "./StudentForm";
import PaymentMethod from "./PaymentMethod";
import OrderSummary from "./OrderSummary";
import CourseInclusions from "./CourseInclusions";
import TrustSignals from "./TrustSignals";
import { ArrowRight } from "lucide-react";

export default function Checkout() {
  return (
    <div className="min-h-screen bg-white text-black px-4 sm:px-6 py-2 lg:py-2 font-sans overflow-hidden">
      <div className="max-w-[1280px] mx-auto flex flex-col gap-8 lg:gap-12 overflow-hidden">

        {/* Header */}
        <header className="py-6 max-w-[1280px] h-[100px]">
          <nav className="flex items-center gap-2 text-smallText text-sm mb-2">
            <span className="hover:text-primetext cursor-pointer transition-colors">
              Checkout
            </span>
            <ArrowRight className="w-4 h-4" />
            <span className="text-primetext font-medium">
              Complete Your Enrollment
            </span>
          </nav>

          <h1 className="text-xl md:text-3xl  text-primetext tracking-tight">
            Secure Checkout
          </h1>

          <p className="text-smallText text-sm md:text-sm mt-3">
            Complete your purchase and start learning today
          </p>
        </header>

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">

          {/* Left */}
          <div className="lg:col-span-2 space-y-8">
            <CourseCard />
            <StudentForm />
            <PaymentMethod />
          </div>

          {/* Right */}
          <div className="lg:col-span-1 lg:sticky lg:top-8">
            <OrderSummary />
          </div>
        </div>

        {/* Bottom */}
        <div className="space-y-8">
          <TrustSignals />
          <CourseInclusions />
        </div>
      </div>
    </div>
  );
}
