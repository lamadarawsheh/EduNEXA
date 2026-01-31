import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../../services/api";

// get all subcategories
export const fetchAllSubCategories = createAsyncThunk(
  "subCategory/fetchAllSubCategories",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get("/SubCategory");
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  },
);

// ADD subcategory
export const addSubCategory = createAsyncThunk(
  "subCategory/add",
  async (subCategoryData, { rejectWithValue }) => {
    try {
      const response = await api.post("/SubCategory", subCategoryData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  },
);

// delete subcategory
export const deleteSubCategory = createAsyncThunk(
  "subCategory/delete",
  async (subCategoryId, { rejectWithValue }) => {
    try {
      const response = await api.delete(`/SubCategory/${subCategoryId}`);
      return response;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  },
);


const subcategorySlice = createSlice({
  name: 'subcategory',
  initialState: {
    subcategories: [],
    loading: false,
    error: null,
    name: "",
    catName: "",
    categoryId: null,
  },
  reducers: {
    clearSubcategoryError: (state) => {
      state.error = null;
    },
    setName: (state, action) => {
      state.name = action.payload
    },
    setCatName: (state, action) => {
      state.catName = action.payload
    },
    setCategoryId: (state, action) => {
      state.categoryId = action.payload
    }
  },
  extraReducers: (builder) => {
    builder
      // Fetch All Subcategories
      .addCase(fetchAllSubCategories.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllSubCategories.fulfilled, (state, action) => {
        state.loading = false;
        state.subcategories = action.payload;
      })
      .addCase(fetchAllSubCategories.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Add Subcategory
      .addCase(addSubCategory.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addSubCategory.fulfilled, (state, action) => {
        state.loading = false;
        state.subcategories.push(action.payload);
      })
      .addCase(addSubCategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Delete Subcategory
      .addCase(deleteSubCategory.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteSubCategory.fulfilled, (state, action) => {
        state.loading = false;
        state.subcategories = state.subcategories.filter(
          (sub) => sub.id !== action.payload
        );
      })
      .addCase(deleteSubCategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearSubcategoryError, setCatName, setName, setCategoryId } = subcategorySlice.actions
export default subcategorySlice.reducer;