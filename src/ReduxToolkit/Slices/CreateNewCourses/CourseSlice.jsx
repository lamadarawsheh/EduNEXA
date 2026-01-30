import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const BaseURL = "http://edunexa.runasp.net";


const getAuthHeader = () => ({
  headers: {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
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
        formData.append('thumbnail', courseData.thumbnail[0]);
      }
      if (courseData.trailer && courseData.trailer.length > 0) {
        formData.append('trailer', courseData.trailer[0]);
      }
      
      // Description
      formData.append('description', courseData.description || '');
      
      // Arrays - convert to JSON strings
      formData.append('learnItems', JSON.stringify(courseData.learningObjectives || []));
      formData.append('audience', JSON.stringify(courseData.targetAudience || []));
      formData.append('requirements', JSON.stringify(courseData.requirements || []));
      formData.append('curriculum', JSON.stringify(courseData.curriculum || []));
      formData.append('whatYouWillTeach', JSON.stringify(courseData.whatYouWillTeach[0] || []));

      // Publish info
      if (courseData.publish) {
        formData.append('welcomeMessage', courseData.publish.welcomeMessage || '');
        formData.append('congratsMessage', courseData.publish.congratsMessage || '');
        formData.append('instructors', JSON.stringify(courseData.publish.instructors || []));
      }
      const response = await axios.post(
        `${BaseURL}/api/courses`,formData,
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
  async (courseId, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${BaseURL}/api/courses/courses/${courseId}/preview`,
        getAuthHeader(),
          
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  },
);

// const extractUniqueValues = (courses, field) => {
//   const values = courses
//     .map(course => course[field])
//     .filter(value => value !== null && value !== undefined);
  
//   return [...new Set(values)];
// };



const CourseSlice = createSlice({
    name :"Course",
    initialState:{
        courses:[],
        loading:false,
        error:null,
           successMessage: null,
        currentCourse: null,
        level:[],
        duration:[],
        language:[],
        price:[],
        
        thumbnailUrl:[],
        trailerVideoUrl:[],
        prerequisites:[],
        learningObjectives:[],
        whatYouWillTeach:[],
        courseTopic:[],
        targetAudience:[],
        welcomeMessage:"",
        publishedAt:"",
        congratulationsMessage:"",
        description:[],

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
    setLevel:(state , action)=>{
      state.level= action.payload
    },
     setPrice:(state , action)=>{
      state.price= action.payload
    },
     setLanguage:(state , action)=>{
      state.language= action.payload
    },
     setDuration:(state , action)=>{
      state.duration = action.payload
    },
      setThumbnailUrl:(state , action)=>{
      state.thumbnailUrl = action.payload
    },
      setTrailerVideoUrl:(state , action)=>{
      state.trailerVideoUrl = action.payload
    },
      setPrerequisites:(state , action)=>{
      state.prerequisites = action.payload
    },
      setLearningObjectives:(state , action)=>{
      state.learningObjectives = action.payload
    },
      setWhatYouWillTeach:(state , action)=>{
      state.whatYouWillTeach = action.payload
    },
      setCourseTopic:(state , action)=>{
      state.courseTopic = action.payload
    },
      setTargetAudience:(state , action)=>{
      state.targetAudience = action.payload
    },
      setWelcomeMessage:(state , action)=>{
      state.welcomeMessage = action.payload
    },
      setPublishedAt:(state , action)=>{
      state.publishedAt = action.payload
    },
      setCongratulationsMessage:(state , action)=>{
      state.congratulationsMessage = action.payload
    },
      setCourseTopi:(state , action)=>{
      state.courseTopic = action.payload
    },
    setDescription : (state,action)=>{
      state.description = action.payload
    }
     
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
        state.level = action.payload.level;
        state.price = action.payload.price;
        state.duration = action.payload.duration;
        state.language = action.payload.language;
        state.congratulationsMessage = action.payload.congratulationsMessage;
        state.courseTopic = action.payload.courseTopic;
        state.learningObjectives= action.payload.learningObjectives;
        state.prerequisites= action.payload.prerequisites;
        state.whatYouWillTeach= action.payload.whatYouWillTeach;
        state.welcomeMessage= action.payload.welcomeMessage;
        state.targetAudience= action.payload.targetAudience;
        state.thumbnailUrl = action.payload.thumbnailUrl;
        state.trailerVideoUrl =  action.payload.trailerVideoUrl;
        state.publishedAt = action.payload.publishedAt;
        state.description= action.payload.description

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
  clearCurrentCourse,
  language,
  duration,
  level,
  price,
  description,thumbnailUrl,trailerVideoUrl,welcomeMessage,targetAudience,publishedAt,learningObjectives,whatYouWillTeach,
  courseTopic,congratulationsMessage,

}= CourseSlice.actions;

export default CourseSlice.reducer;