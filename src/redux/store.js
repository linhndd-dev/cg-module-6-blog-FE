import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./slices/authSlice";
import postReducer from "./slices/postSlice";
import userReducer from "./slices/userSlice";

export const store = configureStore({
  reducer: {
    auth: authSlice,
    post: postReducer,
    user: userReducer,
  },
});
