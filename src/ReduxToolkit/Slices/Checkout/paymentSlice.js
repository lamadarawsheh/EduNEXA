import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../../services/api";

// 1. Initiate Payment - Returns PaymentIntentId
export const initiatePayment = createAsyncThunk(
  "payment/initiate",
  async ({ studentId, courseId, method }, { rejectWithValue }) => {
    try {
      const response = await api.post("/payment", {
        studentId,
        courseId,
        method: method || "Card"
      });
      console.log("💳 PAYMENT INITIATED:", response.data);
      return response.data;
    } catch (error) {
      console.error("❌ PAYMENT INITIATION FAILED:", error.response?.data || error);
      return rejectWithValue(error.response?.data || "Payment Initiation Error");
    }
  }
);

// 2. Confirm Payment via Card
export const confirmPayment = createAsyncThunk(
  "payment/confirm",
  async (paymentIntentId, { rejectWithValue }) => {
    try {
      // Trying POST as many 'confirm' actions require it, while keeping the query param
      const response = await api.post(`/payment/confirm-card?paymentIntentId=${paymentIntentId}`);
      console.log("✅ PAYMENT CONFIRMED:", response.data);
      return response.data;
    } catch (error) {
      console.error("❌ PAYMENT CONFIRMATION FAILED:", error.response?.data || error);
      return rejectWithValue(error.response?.data || "Payment Confirmation Error");
    }
  }
);

// 3. Final Enrollment
export const enrollInCourse = createAsyncThunk(
  "payment/enroll",
  async (courseId, { rejectWithValue }) => {
    try {
      // Endpoint: /api/Enrollment/{courseId}
      const response = await api.post(`/Enrollment/${courseId}`);
      console.log("🎓 ENROLLMENT SUCCESSFUL:", response.data);
      return response.data;
    } catch (error) {
      console.error("❌ ENROLLMENT FAILED:", error.response?.data || error);
      return rejectWithValue(error.response?.data || "Enrollment Error");
    }
  }
);