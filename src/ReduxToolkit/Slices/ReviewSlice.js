import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import * as reviewService from '../../services/reviewService';
import axios from 'axios';

export const fetchCourseReviews = createAsyncThunk(
    'reviews/fetchByCourse',
    async (courseId, { rejectWithValue }) => {
        try {
            return await reviewService.getCourseReviews(courseId);
        } catch (error) {
            return rejectWithValue(error.response?.data || "Failed to fetch reviews");
        }
    }
);

export const submitNewReview = createAsyncThunk(
    'reviews/submit',
    async (reviewData, { dispatch, rejectWithValue }) => {
        try {
            const result = await reviewService.submitReview(reviewData);
            dispatch(fetchCourseReviews(reviewData.courseId));
            return result;
        } catch (error) {
            return rejectWithValue(error.response?.data || "Something went wrong");
        }
    }
);

// ReduxToolkit/Slices/ReviewSlice.js

// تأكدي من وجود الـ export هنا
export const removeReview = createAsyncThunk(
  "review/removeReview",
  async (reviewId, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token"); 
      await axios.delete(`http://edunexa.runasp.net/api/Review/DeleteReview/${reviewId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      return reviewId; // نرجع الـ ID عشان نشيله من الـ state
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// داخل الـ extraReducers تأكدي من إضافة الحالة ليتحدث الـ UI فوراً
// [removeReview.fulfilled]: (state, action) => {
//    state.reviews = state.reviews.filter(r => r.id !== action.payload);
// }

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
            .addCase(fetchCourseReviews.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(fetchCourseReviews.fulfilled, (state, action) => {
                state.isLoading = false;
                state.items = action.payload; // البيانات القادمة من الـ API
            })
            .addCase(submitNewReview.fulfilled, (state, action) => {
    state.isLoading = false;
    // action.meta.arg يحتوي على البيانات التي أرسلتها أنت (courseId, reviewText, etc.)
    // سنضيفها يدوياً في بداية المصفوفة ليراها المستخدم فوراً
    const newReview = {
        ...action.meta.arg,
        id: Date.now(), // معرف مؤقت
        studentName: "You", // أو جلب الاسم من الـ Auth state
        createdAt: new Date().toISOString()
    };
    state.items = [newReview, ...state.items]; 
})
            .addCase(fetchCourseReviews.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            });
    },
});

export default reviewSlice.reducer;