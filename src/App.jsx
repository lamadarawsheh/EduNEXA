import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

/* Layouts */
import MainLayout from './layouts/MainLayout';
import AdminLayout from './layouts/AdminLayout';
import TeacherLayout from './layouts/TeacherLayout';

/* Initial & Public Pages */
import SplashScreen from './pages/public/SplashScreen';
import Choose from './pages/public/Choose';
import Landing from './pages/public/Landing';
import Login from './pages/public/Login';
import CourseForm from './pages/teacher/create-newcourse/cousreForm';
/* Dashboard Pages */
import StudentDashboard from './pages/student/Dashboard';
import TeacherDashboard from './pages/teacher/Dashboard';
import AdminDashboard from './pages/admin/Dashboard';
import NotFound from './pages/public/NotFound';

function App() {
  return (
    <Router>
      <Routes>
        {/* 1. INITIAL SCREENS (No Layout) */}
        <Route path="/" element={<SplashScreen />} />
        <Route path="/choose" element={<Choose />} />
        <Route path="/teacher/create-new-course" element={<CourseForm />} />

        {/* 2. PUBLIC & STUDENT ROUTES (Navbar/Footer Layout) */}
        <Route element={<MainLayout />}>
          <Route path="/landing" element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/student" element={<StudentDashboard />} />
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
