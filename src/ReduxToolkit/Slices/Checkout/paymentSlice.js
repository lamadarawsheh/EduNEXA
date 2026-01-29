import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const createPayment = createAsyncThunk(
  "payment/createIntent",
  async (paymentData, { rejectWithValue }) => {
    try {
const response = await axios.post("http://edunexa.runasp.net/api/payment", {
  studentId: "786ca252-1481-4ebc-9958-08de5c0bf92a",
  courseId: "22222222-2222-2222-2222-222222222222",
  method: "Card"
});
      return response.data; 
    } catch (error) {
      return rejectWithValue(error.response?.data || "Payment Error");
    }
  }
);