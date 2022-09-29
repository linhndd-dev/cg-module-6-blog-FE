import { createSlice } from "@reduxjs/toolkit"
import { createPostByUser, getAllPostByUser } from "../apis"

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
        .addCase(getAllPostByUser.fulfilled, (state, action) => {
            console.log(action.payload);
            state.posts = action.payload
        })
        .addCase(createPostByUser.fulfilled, (state, action) => {
            console.log(action.payload);
            return [...state.posts, action.payload]
        })
    }
})

export default postSlice.reducer;

export const { LoginGG, logout } = postSlice.actions