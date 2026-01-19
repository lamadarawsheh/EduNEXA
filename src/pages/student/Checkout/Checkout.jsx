import CourseCard from "./CourseCard";
import StudentForm from "./StudentForm";
import PaymentMethod from "./PaymentMethod";
import OrderSummary from "./OrderSummary";

export default function Checkout() {
  return (
    <div className="min-h-screen bg-black text-white px-6 py-10">
      <div className="max-w-7xl mx-auto grid lg:grid-cols-3 gap-8">
        
        <div className="lg:col-span-2 space-y-6">
          <CourseCard />
          <StudentForm />
          <PaymentMethod />
        </div>

        <OrderSummary />
      </div>
    </div>
  );
}
