import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../services/api";

export const fetchAdminDashboard = createAsyncThunk("dashboard/fetchAdminDashboard", async (_, { rejectWithValue }) => {
    try {
    const res = await api.get("/Admin/dashboard");
    return res.data;
    } catch (err) {
    return rejectWithValue(err.response?.data || err.message);
    }
    })

    const adminDashboardSlice=  createSlice({
    name: "dashboardData",
    initialState: { dashboardData:{}, isLoading:false, error:null},
    extraReducers:(builder)=>{
        builder.addCase(fetchAdminDashboard.fulfilled, (state,action)=>{
            state.isLoading = false;
            state.dashboardData= action.payload
        })
        builder.addCase(fetchAdminDashboard.pending, (state)=>{
            state.isLoading= true
            state.error = null;
        })
        builder.addCase(fetchAdminDashboard.rejected, (state,action)=>{
            state.isLoading = false;
            state.error = action.payload;
        })
    }
})

export default adminDashboardSlice.reducer