import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const BaseURL = "http://edunexa.runasp.net";


const getAuthHeader = () => ({
  headers: {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
        'Content-Type': 'application/json',
},
});


// Add sections to course
export const AddSection = createAsyncThunk(
  "section/Add",
  async (formData, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${BaseURL}/api/courses/88582b42-c8c6-444a-805e-08de4dcd3b53/sections`,
        formData,
        getAuthHeader(),
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  },
);

export const fetchSectionsByCourseId = createAsyncThunk(
  "section/fetchSectionsByCourseId",
  async (cousreId, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${BaseURL}/api/courses/${cousreId}/sections`,
       
        getAuthHeader(),
      );
      return response.data;
    } catch (error) {
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
