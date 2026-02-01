import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../services/api";

export const fetchCourseReview = createAsyncThunk("dashboard/fetchCourseReview", async (id,{rejectWithValue})=>{
    try{
        const res = await api.get(`admin/courses/${id}/review`)
        return res.data?.data ?? res.data;
    }
    catch(err){
    return rejectWithValue(err.response?.data || err.message);
    }

})

const reviewCourseSlice = createSlice({
    name: "courseData",
    initialState: {courseData: {}, isLoading: false, error:null},
    extraReducers: (builder)=>{
        builder.addCase(fetchCourseReview.fulfilled,(state,action)=>{
            state.isLoading =false;
            state.courseData =action.payload; 
        })
        builder.addCase(fetchCourseReview.pending, (state)=>{
            state.isLoading= true;
            state.error= null;
        })
        builder.addCase(fetchCourseReview.rejected, (state,action)=>{
            state.isLoading = false;
            state.error = action.payload || "Error";

        })
    }

})
export default reviewCourseSlice.reducer;