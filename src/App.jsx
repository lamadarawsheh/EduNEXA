import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

/* Layouts */
import MainLayout from "./layouts/MainLayout";
import AdminLayout from "./layouts/AdminLayout";
import TeacherLayout from "./layouts/TeacherLayout";
import TeacherPublicLayout from "./layouts/TeacherPublicLayout";

/* Initial & Public Pages */
import SplashScreen from "./pages/public/SplashScreen";
import Choose from "./pages/public/Choose";
import Landing from "./pages/public/Landing/Landing";
import SignUp from "./pages/public/SignUp";
import Login from "./pages/public/Login";
import Forgetpassword from "./pages/public/Forgetpassword";
import Info from "./pages/public/Info";
import Resetpassword from "./pages/public/Resetpassword";
import Success from "./pages/public/Success";
import VerifyCode from "./pages/public/VerifyCode";

/* Static Pages */
import Contact from "./pages/public/Static/Contact";
import Courses from "./pages/public/Static/Courses";
import Favourite from "./pages/student/Favourite";
import FAQ from "./pages/public/Static/FAQ";
import PrivacyPolicy from "./pages/public/Static/PrivacyPolicy";
import AboutUs from "./pages/public/Static/AboutUs";
import TechnicalSupport from "./pages/public/Static/TechnicalSupport";
import TeacherLanding from "./pages/public/Landing/TeacherLanding";
/* Teacher Course Form */
import CourseForm from "./pages/teacher/create-newcourse/cousreForm";

/* Dashboard Pages */
import StudentLayout from "./layouts/StudentLayout";
import StudentDashboard from "./pages/student/Dashboard";
import StudentPaymentMethod from "./pages/student/profile/PaymentMethod";
import StudentPaymentInfo from "./pages/student/profile/PaymentInfo";
import StudentProfileLayout from "./pages/student/profile/ProfileLayout";
import TeacherDashboard from "./pages/teacher/Dashboard";
import TeacherSettings from "./pages/teacher/setting/teacherSetting";
import AdminDashboard from "./pages/admin/Dashboard";
import AdminStudents from "./pages/admin/AdminStudents";
import AdminTeachers from "./pages/admin/AdminTeachers";
import AdminCourses from "./pages/admin/AdminCourses";
import AdminSettings from "./pages/admin/AdminSettings";
import NotFound from "./pages/public/NotFound";
import AvailableCourses from "./pages/student/AvailableCourses";
import Checkout from "./pages/student/Checkout/Checkout";

/* Student Profile Pages */
import PersonalInformation from "./pages/student/profile/PersonalInformation";
import Settings from "./pages/student/profile/Settings";
import ChangePassword from "./pages/student/profile/ChangePassword";
import LanguageSelector from "./pages/student/profile/LanguageSelector";
import ScrollToTop from "./components/common/ScrollToTop";

function App() {
  return (
    <Router>
      <ScrollToTop />
      <Routes>
        {/* 1. INITIAL SCREENS (No Layout) */}
        <Route path="/" element={<SplashScreen />} />
        <Route path="/choose" element={<Choose />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/forgot-password" element={<Forgetpassword />} />
        <Route path="/reset-password" element={<Resetpassword />} />
        <Route path="/verify-code" element={<VerifyCode />} />
        <Route path="/success" element={<Success />} />
        <Route path="/info" element={<Info />} />

        {/* 2. PUBLIC & STUDENT ROUTES (Navbar/Footer Layout) */}
        <Route element={<MainLayout />}>
          <Route path="/landing" element={<Landing />} />
          {/* Static Pages */}
          <Route path="/contact" element={<Contact />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/privacy" element={<PrivacyPolicy />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/support" element={<TechnicalSupport />} />
          <Route path="/courses" element={<Courses />} />
          <Route path="/favourite" element={<Favourite />} />
        </Route>

        {/* 2.5 TEACHER PUBLIC ROUTES (TeacherNavbar/Footer Layout - BEFORE LOGIN) */}
        <Route element={<TeacherPublicLayout />}>
          <Route path="/teacher-landing" element={<TeacherLanding />} />
          {/* Shared Static Pages */}
          <Route path="/teach/faq" element={<FAQ />} />
          <Route path="/teach/about" element={<AboutUs />} />
          <Route path="/teach/contact" element={<Contact />} />
        </Route>

        <Route path="/student" element={<StudentLayout />}>
          <Route index element={<StudentDashboard />} />
          <Route path="available-courses" element={<AvailableCourses />} />
          <Route path="favourite" element={<Favourite />} />
          <Route path="checkout" element={<Checkout />} />
          <Route path="profile" element={<StudentProfileLayout />}>
            <Route index element={<Navigate to="personal" replace />} />
            <Route path="personal" element={<PersonalInformation />} />
            <Route path="settings" element={<Settings />} />
            <Route path="password" element={<ChangePassword />} />
            <Route path="language" element={<LanguageSelector />} />
            <Route path="payment" element={<StudentPaymentMethod />} />
            <Route path="payment/info" element={<StudentPaymentInfo />} />
          </Route>
        </Route>

        {/* 3. TEACHER DASHBOARD (Sidebar Layout) */}
        <Route path="/teacher" element={<TeacherLayout />}>
          <Route index element={<TeacherDashboard />} />
          <Route path="create-new-course" element={<CourseForm />} />
          <Route path="teacher-settings" element={<TeacherSettings />} />
        </Route>

        {/* 4. ADMIN PANEL (Sidebar Layout) */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<AdminDashboard />} />
          <Route path="students" element={<AdminStudents />} />
          <Route path="teachers" element={<AdminTeachers />} />
          <Route path="courses" element={<AdminCourses />} />
          <Route path="settings" element={<AdminSettings />} />
        </Route>

        {/* 5. 404 CATCH-ALL */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
