import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const BaseURL = "http://edunexa.runasp.net";


const getAuthHeader = () => ({
  headers: {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
        'Content-Type': 'application/json',
},
});


//add course
export const addCourse = createAsyncThunk(
  "course/addCourse",
  async (courseData, { rejectWithValue }) => {
    try {
       const formData = new FormData();
      
      // Basic Info
      formData.append('title', courseData.title);
      formData.append('subtitle', courseData.subtitle || '');
      formData.append('category', courseData.category);
      formData.append('subCategory', courseData.subCategory);
      formData.append('topic', courseData.topic);
      formData.append('language', courseData.language);
      formData.append('price', courseData.price);
      formData.append('level', courseData.level);
      formData.append('duration', courseData.duration);
      
      // Files
      if (courseData.thumbnail && courseData.thumbnail.length > 0) {
        formData.append('thumbnail', courseData.thumbnail[0]);
      }
      if (courseData.trailer && courseData.trailer.length > 0) {
        formData.append('trailer', courseData.trailer[0]);
      }
      
      // Description
      formData.append('description', courseData.description || '');
      
      // Arrays - convert to JSON strings
      formData.append('learnItems', JSON.stringify(courseData.learnItems || []));
      formData.append('audience', JSON.stringify(courseData.audience || []));
      formData.append('requirements', JSON.stringify(courseData.requirements || []));
      formData.append('curriculum', JSON.stringify(courseData.curriculum || []));
      
      // Publish info
      if (courseData.publish) {
        formData.append('welcomeMessage', courseData.publish.welcomeMessage || '');
        formData.append('congratsMessage', courseData.publish.congratsMessage || '');
        formData.append('instructors', JSON.stringify(courseData.publish.instructors || []));
      }
      const response = await axios.post(
        `${BaseURL}/api/courses`,
        getAuthHeader(),
        courseData
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  },
);
//course preview
export const fetchCoursePreview = createAsyncThunk(
  "course/fetchCoursePreview",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${BaseURL}/api/courses/courses/2135e0c6-aa66-4c6a-4fca-08de4dcde9bb/preview`,
        getAuthHeader(),
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  },
);




const CourseSlice = createSlice({
    name :"Course",
    initialState:{
        courses:[],
        loading:false,
        error:null,
           successMessage: null,
        currentCourse: null,
    },
      reducers:{
     clearCourseError: (state) => {
      state.error = null;
    },
    clearCurrentCourse: (state) => {
      state.currentCourse = null;
    },
    clearSuccessMessage: (state) => {
      state.successMessage = null;
    },
     
    },
    extraReducers:(builder)=>
    builder
     .addCase(addCourse.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addCourse.fulfilled, (state, action) => {
        state.loading = false;
        state.courses = action.payload;
      })
      .addCase(addCourse.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
          .addCase(fetchCoursePreview.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCoursePreview.fulfilled, (state, action) => {
        state.loading = false;
        state.courses = action.payload;
      })
      .addCase(fetchCoursePreview.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

})

export const {
  clearCourseError,
  clearSuccessMessage,
  clearCurrentCourse

}= CourseSlice.actions;

export default CourseSlice.reducer;