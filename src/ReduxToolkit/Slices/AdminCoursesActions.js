import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../services/api";

export const putApproveCourse= createAsyncThunk("dashboard/approveCourse",async ({id, approvalReason},{rejectWithValue})=>{
    try{
            const res = await api.put(`/admin/courses/${id}/approve`,{ approvalReason })
            return res.data
        }
    catch(err){
    return rejectWithValue(err.response?.data || err.message);
    }
})
export const putRejectCourse = createAsyncThunk("dashboard/rejectCourse", async ({ id, rejectionReason }, { rejectWithValue }) => {
    try {
        const res = await api.put(`/admin/courses/${id}/reject`, {rejectionReason});
        return res.data?.data ?? res.data;
    } catch (err) {
        return rejectWithValue(err.response?.data || err.message);
    }
    }
);

    const courseActionSlice = createSlice({
    name: "courseAction",
    initialState: {
        approve: {loading: false, error: null, data: null,},
        reject: {loading: false, error: null, data: null,}
    },
    extraReducers: (builder) => {
        builder
            .addCase(putApproveCourse.pending, (state) => {
                state.approve.loading = true;
                state.approve.error = null;
                state.approve.data = null;
            })
            .addCase(putApproveCourse.fulfilled, (state, action) => {
                state.approve.loading = false;
                state.approve.data = action.payload;
            })
            .addCase(putApproveCourse.rejected, (state, action) => {
                state.approve.loading = false;
                state.approve.error = action.payload || action.error?.message;
            })
            .addCase(putRejectCourse.pending, (state) => {
                state.reject.loading = true;
                state.reject.error = null;
                state.reject.data = null;
            })
            .addCase(putRejectCourse.fulfilled, (state, action) => {
                state.reject.loading = false;
                state.reject.data = action.payload;
            })
            .addCase(putRejectCourse.rejected, (state, action) => {
                state.reject.loading = false;
                state.reject.error = action.payload || action.error?.message;
            });
        }
})

export default courseActionSlice.reducer;
