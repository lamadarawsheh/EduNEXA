import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../services/api"; 

export const fetchWalletData = createAsyncThunk(
  "wallet/fetchWalletData",
  async (_, { rejectWithValue }) => {
    try {
      const res = await api.get("/Earnings"); 
      return res.data; 
    } catch (error) {
      return rejectWithValue(error.response?.data || "Error fetching earnings");
    }
  }
);

export const withdrawMoney = createAsyncThunk(
  "wallet/withdrawMoney",
  async (amount, { rejectWithValue, dispatch }) => {
    try {
      const res = await api.post("/Earnings/withdraw", { amount });
      
      dispatch(fetchWalletData());
      
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Withdrawal failed");
    }
  }
);

const walletSlice = createSlice({
  name: "wallet",
  initialState: {
    totalRevenue: 0,
    todayRevenue: 0,
    totalWithdrawals: 0,
    balance: 0,
    withdrawals: [],
    status: "idle",
    error: null
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchWalletData.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchWalletData.fulfilled, (state, action) => {
        state.status = "succeeded";
        const data = action.payload || {};
        
        state.totalRevenue = data.totalRevenue ?? data.TotalRevenue ?? 0;
        state.todayRevenue = data.todayRevenue ?? data.TodayRevenue ?? 0;
        state.totalWithdrawals = data.totalWithdrawals ?? data.TotalWithdrawals ?? 0;
        state.balance = data.balance ?? data.Balance ?? 0;
        state.withdrawals = data.withdrawals ?? data.Withdrawals ?? [];
      })
      .addCase(fetchWalletData.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || action.error.message;
      })
      
      .addCase(withdrawMoney.pending, (state) => {
        state.status = "loading";
      })
      .addCase(withdrawMoney.fulfilled, (state) => {
        state.status = "succeeded";
      })
      .addCase(withdrawMoney.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || "Withdrawal request failed";
      });
  }
});

export default walletSlice.reducer;