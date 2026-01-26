import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const BaseURL = "http://edunexa.runasp.net";


const getAuthHeader = () => ({
  headers: {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
        'Content-Type': 'application/json',
},
});



//get lectures to section

export const fetchLectures = createAsyncThunk(
  "section/fetchLectures",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${BaseURL}/api/courses/sections/2135e0c6-aa66-4c6a-4fca-08de4dcde9bb/lectures`,
        getAuthHeader(),
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  },
);

export const fetchLecturesByCourseId = createAsyncThunk(
  "section/fetchBySectionId",
  async (sectionId, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${BaseURL}/api/courses/sections/${sectionId}/lectures`,
        getAuthHeader(),
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  },
);

export const addLecture = createAsyncThunk(
  "section/addLecture",
  async ({sectionId,lectureData}, { rejectWithValue }) => {
    try {
        const formData = new FormData();
      
      if (lectureData.video && lectureData.video.length > 0) {
        formData.append('video', lectureData.video[0]);
      }
      if (lectureData.attachment && lectureData.attachment.length > 0) {
        formData.append('attachment', lectureData.attachment[0]);
      }
      
      formData.append('caption', lectureData.caption || '');
      formData.append('description', lectureData.description || '');
      formData.append('notes', lectureData.notes || '');
      const response = await axios.post(
        `${BaseURL}/api/courses/sections/${sectionId}/lectures`,
        getAuthHeader(),
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  },
);

const lectureSlice = createSlice({
  name:"lecture",
  initialState:{
    lectures:[],
    loading:false,
    error:null,

  },
  reducers:{
        clearLectureError: (state) => {
          state.error=null;
        }

  },
  extraReducers:(builder)=>{
    builder
    .addCase(fetchLectures.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchLectures.fulfilled, (state, action) => {
        state.loading = false;
        state.lectures = action.payload;
      })
      .addCase(fetchLectures.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Fetch Lectures by Section ID
      .addCase(fetchLecturesByCourseId.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchLecturesByCourseId.fulfilled, (state, action) => {
        state.loading = false;
        state.lectures = action.payload;
      })
      .addCase(fetchLecturesByCourseId.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(addLecture.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addLecture.fulfilled, (state, action) => {
        state.loading = false;
        state.lectures = action.payload;
      })
      .addCase(addLecture.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
     
     
  }
})

export const { clearLectureError } = lectureSlice.actions;
export default lectureSlice.reducer;