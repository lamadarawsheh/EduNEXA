import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCoursePreview } from "../../../ReduxToolkit/Slices/Checkout/CheckoutSlice";
import CourseCard from "./CourseCard";
import StudentForm from "./StudentForm";
import PaymentMethod from "./PaymentMethod";
import OrderSummary from "./OrderSummary";
import { ArrowRight } from "lucide-react";
import Swal from 'sweetalert2';
import TrustSignals from './TrustSignals';
import CourseInclusions from './CourseInclusions';

export default function Checkout() {
  const dispatch = useDispatch();
  const { course, loading, error } = useSelector((state) => state.checkout);

  useEffect(() => {
    const courseId = "22222222-2222-2222-2222-222222222222"; 
    dispatch(fetchCoursePreview(courseId));
  }, [dispatch]);


const handlePurchase = async () => {
  Swal.fire({
    title: 'Processing Your Order...',
    didOpen: () => { Swal.showLoading(); },
    allowOutsideClick: false, 
  });

  try {
    Swal.fire({
      title: 'Success!',
      text: 'Enrollment successful, welcome to the course!',
      icon: 'success',
      timer: 2000, 
      timerProgressBar: true, 
      showConfirmButton: false, 
    });

  } catch  {
    Swal.fire({
      title: 'Error',
      text: 'Payment failed, please try again.',
      icon: 'error',
      confirmButtonColor: '#1a5a56',
    });
  }
};
   
 


  return (
    <div className="min-h-screen bg-white text-black px-4 sm:px-6 py-1 lg:py-1 font-sans overflow-hidden">
      <div className="max-w-[1280px] mx-auto flex flex-col gap-8 lg:gap-12 overflow-hidden">
        
        <header className="py-2 h-[40px]">
          <nav className="flex items-center gap-2 text-[#71717A] text-sm ">
            <span>Checkout</span>
            <ArrowRight className="w-4 h-4" />
            <span className="text-black font-medium">Complete Your Enrollment</span>
          </nav>
          <h1 className="text-xl md:text-3xl text-[#18181B] tracking-tight">Secure Checkout</h1>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        
          <div className="lg:col-span-2 space-y-8">
            {error && (
  <div className="flex items-center p-4 mb-8 bg-orange-50 border-l-4 border-orange-400 rounded-r-xl shadow-sm animate-fade-in">
    <div className="flex-shrink-0">
      <svg className="w-6 h-6 text-orange-400" fill="currentColor" viewBox="0 0 20 20">
        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
      </svg>
    </div>
    <div className="ml-3">
      <p className="text-sm font-medium text-orange-800">
        Oops! لم نتمكن من العثور على هذا الكورس حالياً. 
        <span className="block text-xs text-orange-600 opacity-80 mt-0.5">
          يرجى اعادة التسجيل اولاً
        </span>
      </p>
    </div>
  </div>
)}
            {loading ? (
               <div className="h-64 flex items-center justify-center border rounded-xl">جاري تحميل بيانات الكورس...</div>
            ) : (
               <CourseCard data={course} />
            )}
            
            <StudentForm />
            <PaymentMethod />
          </div>
          <div className="lg:col-span-1 lg:sticky lg:top-8">
            <OrderSummary data={course} onComplete={handlePurchase} />
          </div>

        </div>
         <div className="space-y-8 mb-8">
          <TrustSignals />
          <CourseInclusions />
        </div>
      </div>
    </div>
  );
}