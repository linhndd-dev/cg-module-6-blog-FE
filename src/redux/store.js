import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./slices/authSlice";
import postReducer from "./slices/postSlice"


export const store = configureStore({
    reducer: {
        auth: authSlice,
        post: postReducer
    },
});