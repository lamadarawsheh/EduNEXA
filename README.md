# <img src="public/favicon-removebg-preview.png" width="200" alt="EduNEXA Logo" />

**EduNEXA** is a state-of-the-art, premium Learning Management System (LMS) designed to bridge the gap between world-class instructors and ambitious learners. Built with a focus on seamless user experience, responsive design, and robust architectural principles, EduNEXA provides an all-in-one ecosystem for digital education.

---

## 🌟 Vision
To provide a platform where education is not just consumed, but experienced. EduNEXA empowers teachers to monetize their expertise and students to achieve their career milestones through a refined, interactive, and high-performance digital classroom.

---

## 🚀 Key Features

### 🎓 For Students
- **Course Discovery**: Advanced search and filtering to find the perfect learning path.
- **Interactive Video Classroom**: A dedicated "Watch Lesson" interface with dynamic content loading, lesson notes, and downloadable resources.
- **Course Enrollment**: Enroll in courses and access them from your dashboard.
- **Personalized Profile**: Manage settings, payment methods, and language preferences.


### 👨‍🏫 For Instructors
- **Comprehensive Dashboard**: Real-time insights into student enrollment, active courses, and ratings.
- **Course Creator Pro**: A multi-step, intuitive curriculum builder supporting video lectures and attachments.
- **Earnings & Analytics**: Track your revenue, manage withdrawals, and view detailed course performance metrics.
- **Responsive Management**: Full control over your educational content from any device.

### 🛡️ For Administrators
- **Global Oversight**: Monitor platform-wide stats (total students, active teachers, courses).
- **Course Quality Control**: Review and approve pending courses to ensure high educational standards.
- **Analytics Hub**: Leverage custom-built charts to understand platform growth and performance.

---

## 🛠️ Tech Stack

- **Frontend Core**: [React.js](https://reactjs.org/) (Vite)
- **State Management**: [Redux Toolkit](https://redux-toolkit.js.org/)
- **Styling**: Vanilla CSS & [Tailwind CSS](https://tailwindcss.com/)
- **Icons**: [Lucide React](https://lucide.dev/) & [React Icons](https://react-icons.github.io/react-icons/)
- **Charts**: [Recharts](https://recharts.org/)
- **HTTP Client**: [Axios](https://axios-http.com/)
- **Routing**: [React Router v6](https://reactrouter.com/)

---

## 🏗️ Architecture: Traditional Layered Design

EduNEXA follows a clean, role-based layered architecture to ensure scalability and maintainability.

| Folder | Purpose |
| :--- | :--- |
| `src/pages/` | Unique views for Public, Student, Teacher, and Admin routes. |
| `src/components/` | Reusable UI components categorized by role and global utility. |
| `src/layouts/` | Specialized wrappers (Main, Admin, Teacher) for consistent navigation. |
| `src/ReduxToolkit/` | Centralized state management using Slices and modern Thunks. |
| `src/services/` | Abstracted API logic and data fetching layers. |
| `src/utils/` | Common helper functions (formatting, validation, spinners). |

---

## � Getting Started

### Prerequisites
- Node.js (v16+)
- npm or yarn

### Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/lamadarawsheh/EduNEXA.git
   ```
2. Navigate to the project directory:
   ```bash
   cd EduNEXA
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Launch the application:
   ```bash
   npm run dev
   ```

---

## 🤝 Contribution Guidelines
We follow an Agile development process. To contribute:
1. **Branching**: Use feature-specific branches (e.g., `feature/student-dashboard`).
2. **Pull Requests**: Ensure your code is linted and tested before submitting a PR to `develop`.
3. **Roles**: Respect the modularity between Student, Teacher, and Admin namespaces.

---

*Built with ❤️ by the EduNEXA Team*
