import { configureStore } from "@reduxjs/toolkit";
import teacherSettingReducer from "./Slices/TeacherSettingSlice";
import CourseReducer from './Slices/CreateNewCourses/CourseSlice'
import subCategoryReducer from './Slices/CreateNewCourses/SubCategorySlice'
import categoryReducer from './Slices/CreateNewCourses/CategorySlice'
import sectionReucer from './Slices/CreateNewCourses/SectionSlice'
import lectureReducer from './Slices/CreateNewCourses/LectureSlice'



export const Store = configureStore({
  reducer: {
    teacherSetting: teacherSettingReducer,
    Course: CourseReducer,
    subCategory: subCategoryReducer,
    category:categoryReducer,
    section:sectionReucer,
    lecture:lectureReducer,
  },
}); 
