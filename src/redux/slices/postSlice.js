import { createSlice } from "@reduxjs/toolkit"
import { createMyPost, editPost, getAllMyPost, getDetailPost } from "../apis"

const initialState ={ 
    posts: [
    ],
    post: {}
}

const postSlice = createSlice({
    name: "case6",
    initialState,
    reducers: { 
    },
    extraReducers: (builder) => {
        builder
        .addCase(getAllMyPost.fulfilled, (state, action) => {
            state.posts = action.payload;
        })
        .addCase(createMyPost.fulfilled, (state, action) => {
            return [...state.posts, action.payload];
        })
        .addCase(editPost.fulfilled, (state, action) => {
            state.posts.map((item) => {
                if(item._id == action.payload.id){
                    item = action.payload.values;
                    item._id = action.payload.id;
                }
            })
        })
        .addCase(getDetailPost.fulfilled, (state, action) => {
            state.post = action.payload;
        })
    }
})

export default postSlice.reducer;

export const { LoginGG, logout } = postSlice.actions