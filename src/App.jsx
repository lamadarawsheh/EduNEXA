import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

/* Layouts */
import MainLayout from "./layouts/MainLayout";
import AdminLayout from "./layouts/AdminLayout";
import TeacherLayout from "./layouts/TeacherLayout";

/* Initial & Public Pages */
import SplashScreen from "./pages/public/SplashScreen";
import Choose from "./pages/public/Choose";
import Landing from "./pages/public/Landing";
import Login from "./pages/public/Login";

/* Dashboard Pages */
import StudentDashboard from "./pages/student/Dashboard";
import TeacherDashboard from "./pages/teacher/Dashboard";
import AdminDashboard from "./pages/admin/Dashboard";
import NotFound from "./pages/public/NotFound";

/* Profile Components */
import PersonalInformation from "./components/Profile/PersonalInformation";
import Settings from "./components/Profile/Settings";
import LanguageSelector from "./components/Profile/LanguageSelector";
import AdminStudents from './pages/admin/AdminStudents';
import AdminTeachers from './pages/admin/AdminTeachers';
import AdminCourses from './pages/admin/AdminCourses';
import AdminSettings from './pages/admin/AdminSettings';

function App() {
  return (
    <Router>
      <Routes>
        {/* 1. INITIAL SCREENS (No Layout) */}
        <Route path="/" element={<SplashScreen />} />
        <Route path="/choose" element={<Choose />} />

        {/* 2. PUBLIC & STUDENT ROUTES (Navbar/Footer Layout) */}
        <Route element={<MainLayout />}>
          <Route path="/landing" element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/student" element={<StudentDashboard />} />

          {/* Profile Routes */}
          <Route path="/profile" element={<PersonalInformation />} />
          <Route path="/profile/personal" element={<PersonalInformation />} />
          <Route path="/profile/settings" element={<Settings />} />
          <Route path="/profile/language" element={<LanguageSelector />} />
        </Route>

        {/* 3. TEACHER DASHBOARD (Sidebar Layout) */}
        <Route path="/teacher" element={<TeacherLayout />}>
          <Route index element={<TeacherDashboard />} />

          {/* Teacher Profile Routes */}
          <Route path="profile" element={<PersonalInformation />} />
          <Route path="profile/personal" element={<PersonalInformation />} />
          <Route path="profile/settings" element={<Settings />} />
          <Route path="profile/language" element={<LanguageSelector />} />
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
