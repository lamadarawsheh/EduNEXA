import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../services/api";

export const fetchPendingCourses = createAsyncThunk("dashboard/fetchPendingCourses", async(_,{rejectWithValue})=>{
    try{
        const res = await api.get("Admin/courses/pending");
        return res.data?.data ?? res.data;
    }
    catch(err){
    return rejectWithValue(err.response?.data || err.message);
    }
})

const pendingCoursesSlice = createSlice({
    name: "pendingCoursesData",
    initialState: {pendingCoursesData:[], isLoading: false, error: null},
    extraReducers: (builder)=>{
            builder.addCase(fetchPendingCourses.fulfilled, (state,action)=>{
                state.isLoading = false;
                state.pendingCoursesData = action.payload;
            })
            builder.addCase(fetchPendingCourses.pending, (state)=>{
                state.isLoading = true;
                state.error = null;
            })
            builder.addCase(fetchPendingCourses.rejected, (state,action)=>{
                state.isLoading = false;
                state.error = action.payload;
            })
    }
})

export default pendingCoursesSlice.reducer