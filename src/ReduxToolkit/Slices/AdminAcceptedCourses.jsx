import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../services/api";

export const fetchAcceptedCourses = createAsyncThunk("dashboard/fetchAcceptedCourses", async(_,{rejectWithValue})=>{
    try{
        const res = await api.get("Admin/courses/accepted");
        return res.data?.data ?? res.data;
    }
    catch(err){
    return rejectWithValue(err.response?.data || err.message);
    }
})

const acceptedCoursesSlice = createSlice({
    name: "acceptedCoursesData",
    initialState: {acceptedCoursesData:[], isLoading: false, error: null},
    extraReducers: (builder)=>{
            builder.addCase(fetchAcceptedCourses.fulfilled, (state,action)=>{
                state.isLoading = false;
                state.acceptedCoursesData = action.payload;
            })
            builder.addCase(fetchAcceptedCourses.pending, (state)=>{
                state.isLoading = true;
                state.error = null;
            })
            builder.addCase(fetchAcceptedCourses.rejected, (state,action)=>{
                state.isLoading = false;
                state.error = action.payload;
            })
    }
})

export default acceptedCoursesSlice.reducer