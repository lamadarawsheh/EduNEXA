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
        const c = action.payload;
        // Normalize data to ensure all UI components get what they need
        state.course = {
          ...c,
          id: c.id || c.courseId,
          title: c.title || 'Untitled Course',
          description: c.description || c.shortDescription || c.details || "No description available.",
          shortDescription: c.shortDescription || c.description || "",
          instructorName: c.instructorName || c.instructorFullName || c.instructor?.fullName || c.instructor?.name || 'Expert Mentor',
          rating: c.rating || 0,
          reviewCount: c.reviewCount || 0,
          enrollmentCount: c.enrollmentCount || c.studentCount || 0,
          price: typeof c.price === 'number' ? c.price : parseFloat(c.price) || 0,
          estimatedDuration: c.estimatedDuration || "Self-paced",
          level: c.level || "Beginner",
          categoryName: c.categoryName || c.category?.name || "Premium Course",
          subCategoryName: c.subCategoryName || c.subCategory?.name || "",
          thumbnailUrl: c.thumbnailUrl || c.imagePath || c.imageUrl || c.image
        };
      })
      .addCase(fetchCoursePreview.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default checkoutSlice.reducer;