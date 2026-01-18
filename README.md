# EduNEXA - Traditional Layered Architecture

EduNEXA is organized using a traditional layered folder structure, making it clear where UI components, logic, and pages live.

## 🏗️ Folder Structure

### `src/pages/`
The entries for every URL. Organized by user role to keep the 46+ pages tidy:
- `public/`: Splash, Landing, Login, Signup.
- `student/`: Profile, Favorites, My Courses, Checkout.
- `teacher/`: Dashboard, Course Creation, Earnings.
- `admin/`: Management, Approvals, Analytics.

### `src/components/`
Reusable UI parts.
- `ui/`: Global generic components (Buttons, Inputs, Modals).
- `student/`, `teacher/`, `admin/`: Role-specific UI components.
- `layout/`: Global elements like Navbar and Footer.

### `src/layouts/`
Layout wrappers for different views:
- `MainLayout.jsx`: Used for Public and Student pages (Top Navbar).
- `AdminLayout.jsx`: Used for Admin dashboard (Sidebar).
- `TeacherLayout.jsx`: Used for Teacher tools.

### `src/services/`
All API logic (Axios calls) goes here (e.g., `authService.js`, `courseService.js`).

### `src/context/`
Global state management using React Context (e.g., `AuthContext.jsx`).

---

## 🚀 Getting Started

1. **Install dependencies**: `npm install`
2. **Start development server**: `npm run dev`

---

## 🤝 Team Contribution
1. **Routing**: Add your page to `src/App.jsx`.
2. **Pages**: Create your page in the appropriate `src/pages/[role]/` folder.
3. **Components**: If a component is reusable, put it in `src/components/`.
4. **API**: Add server connections to `src/services/`.

---
*EduNEXA Team*
