import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../services/api";

export const fetchAdminTeachers = createAsyncThunk("dashboard/fatchAdminTeachers", async (_,{rejectWithValue})=>{
try{
    const res = await api.get("Admin/instructors")
    return res.data
}
catch(err){
    return rejectWithValue(err.response?.data || err.message)
}
})

const adminTeachersSlice = createSlice({
    name: "teachersData",
    initialState: {teachersData: [], isLoading: false, error: null},
    extraReducers: (builder)=>{
        builder.addCase(fetchAdminTeachers.fulfilled, (state, action)=>{
            state.isLoading= false;
            state.teachersData = action.payload;
        })
        builder.addCase(fetchAdminTeachers.pending, (state)=>{
            state.isLoading = true;
            state.error = null;
        })
        builder.addCase(fetchAdminTeachers.rejected, (state,action)=>{
            state.isLoading = false;
            state.err= action.payload || "Failed to fetch instructors";
        })
    }
})

export default adminTeachersSlice.reducer