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
<<<<<<< HEAD
import profileReducer from "../ReduxToolkit/Profile/ProfileSlice";
=======
import walletReducer from './walletSlice'
>>>>>>> 01c317d0cf458ea2729b1f39ae7a163e7b0ac99f

const noopReducer = (state = {}) => state;

export const Store = configureStore({
  reducer: {
    teacherSetting: teacherSettingReducer,
    Course: CourseReducer,
    subCategory: subCategoryReducer,
    category:categoryReducer,
    section:sectionReucer,
    lecture:lectureReducer,
        app: noopReducer,
        checkout: checkoutReducer,
 

    adminDashboard: adminDashboardSlice,
    adminStudents: adminStudentSlice,
    adminProfile: adminProfileSlice,
<<<<<<< HEAD
    profile: profileReducer,
=======



    wallet: walletReducer
>>>>>>> 01c317d0cf458ea2729b1f39ae7a163e7b0ac99f
  },
});
