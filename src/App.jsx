import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

/* Layouts */
import MainLayout from "./layouts/MainLayout";
import AdminLayout from "./layouts/AdminLayout";
import TeacherLayout from "./layouts/TeacherLayout";

/* Initial & Public Pages */
import SplashScreen from "./pages/public/SplashScreen";
import Choose from "./pages/public/Choose";
import Landing from "./pages/public/Landing/Landing";
import SignUp from "./pages/public/SignUp";
import Login from "./pages/public/Login";

/* Static Pages */
import Contact from "./pages/public/Static/Contact";
import FAQ from "./pages/public/Static/FAQ";
import PrivacyPolicy from "./pages/public/Static/PrivacyPolicy";
import AboutUs from "./pages/public/Static/AboutUs";
import TechnicalSupport from "./pages/public/Static/TechnicalSupport";
import CourseForm from "./pages/teacher/create-newcourse/cousreForm";

/* Dashboard Pages */
import StudentLayout from "./layouts/StudentLayout";
import StudentDashboard from "./pages/student/Dashboard";
import StudentPaymentMethod from "./pages/student/profile/PaymentMethod";
import StudentPaymentInfo from "./pages/student/profile/PaymentInfo";
import StudentProfileLayout from "./pages/student/profile/ProfileLayout";
import TeacherDashboard from "./pages/teacher/Dashboard";
import AdminDashboard from "./pages/admin/Dashboard";
import NotFound from "./pages/public/NotFound";

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
        <Route path="/teacher/create-new-course" element={<CourseForm />} />
        <Route path="/signup" element={<SignUp />} />

        {/* 2. PUBLIC & STUDENT ROUTES (Navbar/Footer Layout) */}
        <Route element={<MainLayout />}>
          <Route path="/landing" element={<Landing />} />
          <Route path="/login" element={<Login />} />

          {/* Static Pages */}
          <Route path="/contact" element={<Contact />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/privacy" element={<PrivacyPolicy />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/support" element={<TechnicalSupport />} />
          <Route path="/teacher/create-new-course" element={<CourseForm />} />
        </Route>

        <Route path="/student" element={<StudentLayout />}>
          <Route index element={<StudentDashboard />} />
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
        </Route>

        {/* 4. ADMIN PANEL (Sidebar Layout) */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<AdminDashboard />} />
        </Route>

        {/* 5. 404 CATCH-ALL */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
