import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const BaseURL = "http://edunexa.runasp.net";


const getAuthHeader = () => ({
  headers: {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
},
});

// get all categories
export const fetchAllCategories = createAsyncThunk(
  "category/fetchAllCategories",
  async (categoryId, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${BaseURL}/api/Category/${categoryId}`,
        getAuthHeader(),
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  },
);

// add category
export const fetchCategory = createAsyncThunk(
  "category/fetchCategory",
  async (catogeryData, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${BaseURL}/api/Category`,
         catogeryData,
        getAuthHeader(),
       
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  },
);

// fetch courses by category
export const fetchCoursesByCategory = createAsyncThunk(
  "category/fetchCoursesByCategory",
  async (categoryId, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${BaseURL}/api/SubCategory/CoursesByCategory/${categoryId}`,
        getAuthHeader(),
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  },
);


const categorySlice = createSlice({
  name: 'category',
  initialState: {
    categories: [],
    subcategories: [],
      coursesByCategory: [],
    loading: false,
    error: null,
  },
  reducers: {
    clearCategoryError: (state) => {
      state.error = null;
    },
    clearSubcategories: (state) => {
      state.subcategories = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllCategories.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllCategories.fulfilled, (state, action) => {
        state.loading = false;
        state.categories = action.payload;
        state.subcategories = action.payload.subCategories; // populate step 2

      })
      .addCase(fetchAllCategories.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchCategory.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCategory.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(fetchCategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchCoursesByCategory.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCoursesByCategory.fulfilled, (state, action) => {
        state.loading = false;
        state.coursesByCategory = action.payload;
      })
      .addCase(fetchCoursesByCategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearCategoryError ,clearSubcategories} = categorySlice.actions;
export default categorySlice.reducer;