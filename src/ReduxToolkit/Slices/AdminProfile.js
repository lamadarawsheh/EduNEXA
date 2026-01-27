import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../services/api";

export const fetchAdminProfile = createAsyncThunk("dashboard/fetchAdminProfile", async (_, { rejectWithValue })=>{
    try{
        const res = await api.get("/Admin/profile")
        return res.data?.data ?? res.data;
    }
    catch{
        return rejectWithValue(err.response?.data || err.message);
    }
})

const adminProfileSlice= createSlice({
    name:"adminProfile",
    initialState: { profileData:{}, isLoading:false, error:null},
    extraReducers:(builder)=>{
        builder.addCase(fetchAdminProfile.fulfilled, (state,action)=>{
                    state.isLoading = false;
                    state.profileData= action.payload
                })
                builder.addCase(fetchAdminProfile.pending, (state)=>{
                    state.isLoading= true
                    state.error = null;
                })
                builder.addCase(fetchAdminProfile.rejected, (state,action)=>{
                    state.isLoading = false;
                    state.error = action.payload;
                })
    }
})
    export default adminProfileSlice.reducer