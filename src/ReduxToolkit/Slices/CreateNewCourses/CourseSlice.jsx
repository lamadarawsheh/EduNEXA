import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const BaseURL = "http://edunexa.runasp.net";


const getAuthHeader = () => ({
  headers: {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
        'Content-Type': 'application/json',
},
});

// get all courses
  export const fetchAllCourses = createAsyncThunk(
  "courses/fetchAllCourses",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${BaseURL}/api/courses`,
        getAuthHeader(),
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  },
);

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
      formData.append('topic', courseData.courseTopic);
      formData.append('language', courseData.language);
      formData.append('price', courseData.price);
      formData.append('level', courseData.level);
      formData.append('duration', courseData.estimatedDuration);
      
      // Files
      if (courseData.thumbnail && courseData.thumbnail.length > 0) {
        formData.append('thumbnail', courseData.thumbnailUrl[0]);
      }
      if (courseData.trailer && courseData.trailer.length > 0) {
        formData.append('trailer', courseData.trailerVideoUrl[0]);
      }
      
      // Description
      formData.append('description', courseData.description || '');
      
      // Arrays - convert to JSON strings
      formData.append('learnItems', JSON.stringify(courseData.learningObjectives || []));
      formData.append('audience', JSON.stringify(courseData.targetAudience || []));
      formData.append('requirements', JSON.stringify(courseData.requirements || []));
      formData.append('curriculum', JSON.stringify(courseData.curriculum || []));
      formData.append('what you will teach', JSON.stringify(courseData.whatYouWillTeach[0] || []));

      // Publish info
      if (courseData.publish) {
        formData.append('welcomeMessage', courseData.publish.welcomeMessage || '');
        formData.append('congratsMessage', courseData.publish.congratsMessage || '');
        formData.append('instructors', JSON.stringify(courseData.publish.instructors || []));
      }
      const response = await axios.post(
        `${BaseURL}/api/courses`,
        getAuthHeader(),
       'Content-Type: multipart/form-data'
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

const extractUniqueValues = (courses, field) => {
  const values = courses
    .map(course => course[field])
    .filter(value => value !== null && value !== undefined);
  
  return [...new Set(values)];
};



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
      .addCase(fetchAllCourses.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
       .addCase(fetchAllCourses.fulfilled, (state, action) => {
        state.loading = false;
        state.courses = action.payload;
          state.levels = extractUniqueValues(action.payload, 'level');
        state.priceTiers = extractUniqueValues(action.payload, 'price');
        state.durations = extractUniqueValues(action.payload, 'estimatedDuration');
         const languageMap = {
          0: 'English',
          1: 'Arabic',
          2: 'French',
          3: 'Spanish',
          4: 'German'
        };
         const uniqueLanguageCodes = extractUniqueValues(action.payload, 'language');
        state.languages = uniqueLanguageCodes.map(code => ({
          id: code,
          code: code,
          name: languageMap[code] || `Language ${code}`
        }));
       })
       .addCase(fetchAllCourses.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

     .addCase(addCourse.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addCourse.fulfilled, (state, action) => {
        state.loading = false;
        state.courses = action.payload;
         state.successMessage = "Course added successfully";
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