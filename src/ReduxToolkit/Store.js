import { configureStore } from "@reduxjs/toolkit";

const noopReducer = (state = {}) => state;

export const Store = configureStore({
  reducer: {
    app: noopReducer,
  },
});
