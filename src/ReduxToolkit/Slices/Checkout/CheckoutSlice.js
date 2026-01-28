import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../../services/api"; // المسار حسب صورتك لتقسيم الملفات

export const fetchCoursePreview = createAsyncThunk(
  "checkout/fetchCoursePreview",
  async (courseId, { rejectWithValue }) => {
    try {
      const response = await api.get(`/courses/${courseId}/preview`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Error");
    }
  }
);



const checkoutSlice = createSlice({
  name: "checkout",
  initialState: {
    course: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCoursePreview.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCoursePreview.fulfilled, (state, action) => {
        state.loading = false;
        state.course = action.payload;
      })
      .addCase(fetchCoursePreview.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default checkoutSlice.reducer;