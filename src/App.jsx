import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import AdminLayout from './layouts/AdminLayout';
import TeacherLayout from './layouts/TeacherLayout';

// Traditional Page Imports (Placeholders for now)
const Home = () => <div>Public Landing Page (Landing + Courses before login)</div>;
const Login = () => <div>Login / Signup Page</div>;

const StudentDashboard = () => <div>Student Dashboard (My Courses, Favs)</div>;
const AdminDashboard = () => <div>Admin Dashboard (Management, Approvals)</div>;
const TeacherDashboard = () => <div>Teacher Dashboard (Course Creator, Analytics)</div>;

function App() {
  return (
    <Router>
      <Routes>
        {/* PUBLIC ROUTES - Everyone */}
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
        </Route>

        {/* STUDENT ROUTES */}
        <Route path="/student" element={<MainLayout />}>
          <Route index element={<StudentDashboard />} />
          {/* Add paths like /student/profile, /student/my-courses aqui */}
        </Route>

        {/* TEACHER ROUTES */}
        <Route path="/teacher" element={<TeacherLayout />}>
          <Route index element={<TeacherDashboard />} />
          {/* Add paths like /teacher/create-course, /teacher/earnings aqui */}
        </Route>

        {/* ADMIN ROUTES */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<AdminDashboard />} />
          {/* Add paths like /admin/users, /admin/approvals aqui */}
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
