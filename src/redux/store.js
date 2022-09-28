import {configureStore} from "@reduxjs/toolkit";
import postReducer from "./slice"

export const store = configureStore({
    reducer: {
        posts: postReducer
    }
})