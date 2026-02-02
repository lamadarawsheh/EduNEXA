import { configureStore } from "@reduxjs/toolkit";
import teacherSettingReducer from "./Slices/TeacherSettingSlice";
import CourseReducer from './Slices/CreateNewCourses/CourseSlice'
import subCategoryReducer from './Slices/CreateNewCourses/SubCategorySlice'
import categoryReducer from './Slices/CreateNewCourses/CategorySlice'
import sectionReucer from './Slices/CreateNewCourses/SectionSlice'
import lectureReducer from './Slices/CreateNewCourses/LectureSlice'
import checkoutReducer from './Slices/Checkout/CheckoutSlice'
import adminDashboardSlice from "./slices/AdminDashboard"
import adminStudentSlice from "./slices/AdminStudents"
import adminProfileSlice from "./slices/AdminProfile";
import profileReducer from "../ReduxToolkit/Profile/ProfileSlice";
import walletReducer from './walletSlice'
import reviewReducer from './Slices/ReviewSlice'
import adminTeachersSlice from "./slices/AdminTeachers";
import acceptedCoursesSlice from "./slices/AdminAcceptedCourses";
import pendingCoursesSlice from "./slices/AdminPendingCourses";
import reviewCourseReducer from "./slices/AdminCourseReview";
import courseActionReducer from "./slices/AdminCoursesActions";

const noopReducer = (state = {}) => state;

export const Store = configureStore({
  reducer: {
    teacherSetting: teacherSettingReducer,
    Course: CourseReducer,
    subCategory: subCategoryReducer,
    category: categoryReducer,
    section: sectionReucer,
    lecture: lectureReducer,
    app: noopReducer,
    checkout: checkoutReducer,
    reviews: reviewReducer,


    app: noopReducer,
    checkout: checkoutReducer,
    profile: profileReducer,
    adminDashboard: adminDashboardSlice,
    adminStudents: adminStudentSlice,
    adminProfile: adminProfileSlice,
    wallet: walletReducer,
    adminTeachers: adminTeachersSlice,
    acceptedCoursesData: acceptedCoursesSlice,
    pendingCoursesData: pendingCoursesSlice,
    courseReview: reviewCourseReducer,
    courseAction: courseActionReducer,
  },
});