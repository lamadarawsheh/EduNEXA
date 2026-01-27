import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import api from "../../services/api";


export const fetchAdminStudents = createAsyncThunk("dashboard/fetchAdminStudents",async (_, { rejectWithValue })=>{
    try{
        const res = await api.get("/Admin/students")
        return res.data?.data ?? res.data;
    }
    catch(err){
    return rejectWithValue(err.response?.data || err.message);
    }
});

const adminStudentSlice =createSlice({
    name: "adminStudent",
    initialState: { studentsData:[], isLoading:false, error:null},
        extraReducers:(builder)=>{
            builder.addCase(fetchAdminStudents.fulfilled, (state,action)=>{
                state.isLoading = false;
                state.studentsData= action.payload
            })
            builder.addCase(fetchAdminStudents.pending, (state)=>{
                state.isLoading= true
                state.error = null;
            })
            builder.addCase(fetchAdminStudents.rejected, (state,action)=>{
                state.isLoading = false;
                state.error = action.payload;
            })
        }
})

export default adminStudentSlice.reducer