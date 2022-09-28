import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./slices/authSlice";
import postReducer from "./slice"


export const store = configureStore({
    reducer: {
        auth: authSlice,
        posts: postReducer

    },
});