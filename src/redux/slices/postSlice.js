import { createSlice } from "@reduxjs/toolkit"
import { createMyPost, getAllMyPost } from "../apis"

const initialState ={ 
    posts: [
    ],
}

const postSlice = createSlice({
    name: "case6",
    initialState,
    reducers: { 
    },
    extraReducers: (builder) => {
        builder
        .addCase(getAllMyPost.fulfilled, (state, action) => {
            state.posts = action.payload
        })
        .addCase(createMyPost.fulfilled, (state, action) => {
            return [...state.posts, action.payload]
        })
    }
})

export default postSlice.reducer;

export const { LoginGG, logout } = postSlice.actions