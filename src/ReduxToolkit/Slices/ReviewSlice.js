import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import * as reviewService from '../../services/reviewService';

export const submitNewReview = createAsyncThunk(
    'reviews/submit',
    async (reviewData, { rejectWithValue }) => {
        try {
            return await reviewService.submitReview(reviewData);
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || "Connection Error");
        }
    }
);

export const fetchCourseReviews = createAsyncThunk(
    'reviews/fetchByCourse',
    async (courseId) => {
        return await reviewService.getCourseReviews(courseId);
    }
);

const reviewSlice = createSlice({
    name: 'reviews',
    initialState: {
        items: [],
        isLoading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchCourseReviews.pending, (state) => { state.isLoading = true; })
            .addCase(fetchCourseReviews.fulfilled, (state, action) => {
                state.isLoading = false;
                state.items = action.payload; 
            })
            .addCase(submitNewReview.fulfilled, (state) => {
                state.isLoading = false;
            });
    },
});

export default reviewSlice.reducer;