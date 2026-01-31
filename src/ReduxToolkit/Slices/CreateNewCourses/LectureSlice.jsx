import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../../services/api";

// get lectures for section
export const fetchLectures = createAsyncThunk(
  "section/fetchLectures",
  async (sectionId, { rejectWithValue }) => {
    try {
      const response = await api.get(`/courses/sections/${sectionId}/lectures`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  },
);

// get lecture by section id
export const fetchLecturesBySectionId = createAsyncThunk(
  "section/fetchBySectionId",
  async (sectionId, { rejectWithValue }) => {
    try {
      console.log("📡 FETCHING LECTURES FOR SECTION:", sectionId);
      const response = await api.get(`/courses/sections/${sectionId}/lectures`);
      console.log("✅ FETCH LECTURES SUCCESS:", response.data);
      return response.data;
    } catch (error) {
      console.error("❌ FETCH LECTURES FAILURE:", error.response?.data || error.message);
      return rejectWithValue(error.response?.data || error.message);
    }
  },
);

// add lecture resource to section
export const addLecture = createAsyncThunk(
  "section/addLecture",
  async ({ sectionId, lectureData }, { rejectWithValue }) => {
    try {
      const formData = new FormData();

      // Precisely matching the requested keys for the backend model
      if (lectureData.video && lectureData.video[0]) {
        formData.append('videoFile', lectureData.video[0]);
      } else if (lectureData.attachment && lectureData.attachment[0]) {
        formData.append('videoFile', lectureData.attachment[0]);
      }

      formData.append('Title', lectureData.title || 'Untitled Lecture');
      formData.append('description', lectureData.description || '');

      // User specified type must be "video"
      const typeValue = "video";
      formData.append('type', typeValue);

      formData.append('orderIndex', parseInt(lectureData.orderIndex) || 1);

      console.log("🎬 UPLOADING RESOURCE TO LECTURE SYSTEM:", { sectionId, type: typeValue });
      for (let pair of formData.entries()) {
        console.log(`   ${pair[0]}:`, pair[1] instanceof File ? `File [${pair[1].name}]` : pair[1]);
      }

      // Backend endpoint for adding lectures to a section
      const response = await api.post(`/courses/sections/${sectionId}/lectures`, formData);
      console.log("✅ LECTURE RESOURCE UPLOAD SUCCESS:", response.data);
      return response.data;
    } catch (error) {
      console.error("❌ ADD LECTURE FAILURE:", error.response?.data || error.message);
      if (error.response?.data?.errors) {
        console.table(error.response.data.errors);
      }
      return rejectWithValue(error.response?.data || error.message);
    }
  },
);

// Lecture Slice
const lectureSlice = createSlice({
  name: "lecture",
  initialState: {
    lectures: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchLectures.pending, (state) => {
        state.loading = true;
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
      .addCase(fetchLecturesBySectionId.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchLecturesBySectionId.fulfilled, (state, action) => {
        state.loading = false;
        state.lectures = action.payload;
      })
      .addCase(fetchLecturesBySectionId.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(addLecture.pending, (state) => {
        state.loading = true;
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