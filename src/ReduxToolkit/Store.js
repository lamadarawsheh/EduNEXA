import { configureStore } from "@reduxjs/toolkit";

// Slices
import teacherSettingReducer from "./Slices/TeacherSettingSlice";
import subCategoryReducer from './Slices/CreateNewCourses/SubCategorySlice';
import categoryReducer from './Slices/CreateNewCourses/CategorySlice';
import sectionReducer from './Slices/CreateNewCourses/SectionSlice'; // صح الاسم
import lectureReducer from './Slices/CreateNewCourses/LectureSlice';
import checkoutReducer from './Slices/Checkout/CheckoutSlice';
import adminDashboardSlice from "./Slices/AdminDashboard";
import adminStudentSlice from "./Slices/AdminStudents";
import adminProfileSlice from "./Slices/AdminProfile";
import walletReducer from "./Slices/walletSlice/walletSlice";
import courseReducer from "./Slices/courseSlice/courseSlice";

// noop reducer
const noopReducer = (state = {}) => state;

// Configure store
export const Store = configureStore({
  reducer: {
    teacherSetting: teacherSettingReducer,
    Course: courseReducer,          // صح الاسم
    subCategory: subCategoryReducer,
    category: categoryReducer,
    section: sectionReducer,        // صح الاسم
    lecture: lectureReducer,
    app: noopReducer,
    checkout: checkoutReducer,
    adminDashboard: adminDashboardSlice,
    adminStudents: adminStudentSlice,
    adminProfile: adminProfileSlice,
    wallet: walletReducer,
    course: courseReducer,
  },
});

export default Store;
