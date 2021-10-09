import { configureStore } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import authMiddleware from "./auth-middleware";
import authSlice from "./auth-slice";

const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(authMiddleware),
});

export type AuthDispatch = typeof store.dispatch;
export const useAuthDispatch = () => useDispatch<AuthDispatch>();
export type RootState = ReturnType<typeof store.getState>;
export default store;
