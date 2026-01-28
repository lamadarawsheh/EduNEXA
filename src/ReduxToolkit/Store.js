import { configureStore } from "@reduxjs/toolkit";
import walletReducer from './walletSlice'

export const Store = configureStore({
  reducer: {
    wallet: walletReducer
  },
});
