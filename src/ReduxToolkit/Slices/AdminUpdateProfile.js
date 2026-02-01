import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../services/api";

export const putUpdateProfile = createAsyncThunk("dashboard/updateProfile", async (payload,{rejectWithValue})=>{
    try{
    const fd = new FormData();
    fd.append("fullName", payload.fullName);
    fd.append("email", payload.email);
    fd.append("phoneNumber", payload.phoneNumber);
    const res= await api.put("/admin/profile", fd);
    return res.data;
    }
    catch(err){
    return rejectWithValue(err.response?.data || err.message);
    }
})

    const updateProfileSlice = createSlice({
        name: "updateProfile",
        initialState: {loading: false, error: null, data: null, success: false},
        reducers: {
        resetUpdateProfileState: (state) => {
        state.loading = false;
        state.error = null;
        state.success = false;
        },
        },
        extraReducers: (builder) => {
        builder.addCase(putUpdateProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
        })
        builder.addCase(putUpdateProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
        state.success = true;
        })
        builder.addCase(putUpdateProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Update failed";
        state.success = false;
        });
    },    
}) 
export const { resetUpdateProfileState } = updateProfileSlice.actions;
export default updateProfileSlice.reducer;
