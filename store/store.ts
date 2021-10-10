import { configureStore } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import authMiddleware from "./auth-middleware";
import authSlice from "./auth-slice";
import userSlice from "./user-slice";

const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    user: userSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(authMiddleware),
});

export type AuthDispatch = typeof store.dispatch;
export type UserDispatch = typeof store.dispatch;
export const useAuthDispatch = () => useDispatch<AuthDispatch>();
export const useUserDispatch = () => useDispatch<UserDispatch>();
export type RootState = ReturnType<typeof store.getState>;
export default store;
