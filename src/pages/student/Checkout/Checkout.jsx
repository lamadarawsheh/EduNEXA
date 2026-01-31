import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { fetchCoursePreview } from "../../../ReduxToolkit/Slices/Checkout/CheckoutSlice";
import { initiatePayment, confirmPayment, enrollInCourse } from "../../../ReduxToolkit/Slices/Checkout/paymentSlice";
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
  const { courseId } = useParams();
  const navigate = useNavigate();
  const { course, loading, error } = useSelector((state) => state.checkout);

  const [isFormValid, setIsFormValid] = React.useState(false);
  const [paymentMethod, setPaymentMethod] = React.useState("card");
  const [paymentDetails, setPaymentDetails] = React.useState({});

  useEffect(() => {
    if (courseId) {
      console.log("💳 INITIALIZING CHECKOUT FOR COURSE:", courseId);
      dispatch(fetchCoursePreview(courseId));
    }
  }, [dispatch, courseId]);


  const handlePurchase = async () => {
    // 1. Get Student ID
    const user = JSON.parse(localStorage.getItem("user"));
    const studentId = user?.id || user?.studentId;

    if (!studentId) {
      Swal.fire({ icon: 'error', title: 'Login Required', text: 'You must be logged in to purchase a course.' });
      return;
    }

    // 2. Validate Student Form
    if (!isFormValid) {
      Swal.fire({
        icon: 'warning',
        title: 'Missing Information',
        text: 'Please fill in all required student identification fields correctly.',
        confirmButtonColor: '#1a5a56'
      });
      return;
    }

    // 3. Validate Payment Details
    if (paymentMethod === "card") {
      if (!paymentDetails.cardNumber || !paymentDetails.expiryDate || !paymentDetails.cvc) {
        Swal.fire({ icon: 'warning', title: 'Payment Details Missing', text: 'Please fill in all card information.', confirmButtonColor: '#1a5a56' });
        return;
      }
    } else if (paymentMethod === "vodafone") {
      if (!paymentDetails.walletNumber) {
        Swal.fire({ icon: 'warning', title: 'Wallet Missing', text: 'Please enter your Vodafone Cash wallet number.', confirmButtonColor: '#1a5a56' });
        return;
      }
    } else if (paymentMethod === "bank") {
      if (!paymentDetails.referenceNumber) {
        Swal.fire({ icon: 'warning', title: 'Reference Missing', text: 'Please enter the bank transfer reference number.', confirmButtonColor: '#1a5a56' });
        return;
      }
    }

    Swal.fire({
      title: 'Processing Transaction...',
      text: 'Please do not close this window',
      didOpen: () => { Swal.showLoading(); },
      allowOutsideClick: false,
    });

    try {
      // Step A: Initiate Payment
      console.log(`🚀 STEP 1: INITIATING PAYMENT via ${paymentMethod}`);
      const paymentResult = await dispatch(initiatePayment({ studentId, courseId, method: paymentMethod, details: paymentDetails })).unwrap();

      const paymentIntentId = (paymentResult.clientSecret ? paymentResult.clientSecret.split('_secret_')[0] : null) ||
        paymentResult.paymentId ||
        paymentResult.id;

      if (!paymentIntentId) throw new Error("Could not retrieve Payment Intent ID");

      // Step B: Confirm Payment
      console.log("💳 STEP 2: CONFIRMING PAYMENT STATE:", paymentIntentId);
      await dispatch(confirmPayment(paymentIntentId)).unwrap();

      // Step C: Final Enrollment
      console.log("🎓 STEP 3: EXECUTING ENROLLMENT");
      await dispatch(enrollInCourse(courseId)).unwrap();

      Swal.fire({
        title: 'Enrollment Successful!',
        text: 'Welcome to your new course! You are now enrolled.',
        icon: 'success',
        confirmButtonColor: '#1a5a56',
      }).then(() => {
        navigate('/student/my-courses');
      });

    } catch (err) {
      console.error("❌ CHECKOUT FLOW ERROR:", err);
      Swal.fire({
        title: 'Transaction Failed',
        text: typeof err === 'string' ? err : 'We encountered an error during enrollment. Please check your card balance and try again.',
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
            <CourseCard data={course} isLoading={loading} />

            <StudentForm onValidationChange={setIsFormValid} />
            <PaymentMethod
              selectedMethod={paymentMethod}
              setSelectedMethod={setPaymentMethod}
              onDetailsChange={setPaymentDetails}
            />
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