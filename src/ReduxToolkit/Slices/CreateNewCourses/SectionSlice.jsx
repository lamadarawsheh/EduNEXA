import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../../services/api";

// Add sections to course
export const AddSection = createAsyncThunk(
  "section/Add",
  async ({ courseId, sectionData }, { rejectWithValue }) => {
    try {
      console.log("📡 POSTING SECTION TO BACKEND (API SERVICE):", {
        url: `/courses/${courseId}/sections`,
        data: sectionData
      });

      const response = await api.post(`/courses/${courseId}/sections`, sectionData);

      console.log("✅ SECTION API SUCCESS:", response.data);
      return response.data;
    } catch (error) {
      console.error("❌ SECTION API FAILURE:", error.response?.data || error.message);
      return rejectWithValue(error.response?.data || error.message);
    }
  },
);

export const fetchSectionsByCourseId = createAsyncThunk(
  "section/fetchSectionsByCourseId",
  async (courseId, { rejectWithValue }) => {
    try {
      console.log("📡 FETCHING SECTIONS FOR COURSE (SYNC):", courseId);
      const response = await api.get(`/courses/${courseId}/sections`);
      console.log("✅ FETCH SECTIONS SUCCESS:", response.data);
      return response.data;
    } catch (error) {
      console.error("❌ FETCH SECTIONS FAILURE:", error.response?.data || error.message);
      return rejectWithValue(error.response?.data || error.message);
    }
  },
);


// Section Slice
const sectionSlice = createSlice({
  name: 'section',
  initialState: {
    sections: [],
    loading: false,
    error: null,
  },
  reducers: {
    clearSectionError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch Sections by Course ID
      .addCase(fetchSectionsByCourseId.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSectionsByCourseId.fulfilled, (state, action) => {
        state.loading = false;
        state.sections = action.payload;
      })
      .addCase(fetchSectionsByCourseId.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Add Section
      .addCase(AddSection.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(AddSection.fulfilled, (state, action) => {
        state.loading = false;
        state.sections.push(action.payload);
      })
      .addCase(AddSection.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearSectionError } = sectionSlice.actions;

export default sectionSlice.reducer;
